import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { Row, Col, Table, Form } from "react-bootstrap";
import { CardWrapper, CustomButton, CustomTd } from "./CourseCard.styles";
import { addCourseRegistration, removeCourseRegistration, updateCourse, deleteCourse } from "../../util/api/api";
import { getFormattedDateToDB, getFormattedHoursFromDB, getFormattedHoursToDB } from "../../util/general-functions/generalFunctions";

const CourseCard = ({
  courseData,
  disableaddCourseButton,
  addCourseButtonHidden,
  removeCourseButtonHidden,
  deleteCourseButtonHidden,
  authenticatedUser,
}) => {
  const [courseInformation, setCourseInformation] = useState(courseData);
  const [editCourseData, setEditCourseData] = useState({});
  const [authenticatedUserData, setAuthenticatedUserData] = useState(authenticatedUser);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [startDateFormatted, setStartDateFormatted] = useState("");
  const [startDateFormattedEdited, setStartDateFormattedEdited] = useState("");
  const [initialTime, setInitialTime] = useState("");
  const [endDateFormatted, setEndDateFormatted] = useState("");
  const [endDateFormattedEdited, setEndDateFormattedEdited] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedCourseForDeletion, setSelectedCourseForDeletion] = useState(null);

  useEffect(() => {
    const startDateFormattedData = getFormattedDateToDB(courseInformation.StartDate);
    const endDateFormattedData = getFormattedDateToDB(courseInformation.EndDate);
    const hoursFormatted = getFormattedHoursFromDB(courseInformation.Hours);

    setStartDateFormatted(startDateFormattedData);
    setStartDateFormattedEdited(startDateFormattedData);

    setEndDateFormatted(endDateFormattedData);
    setEndDateFormattedEdited(endDateFormattedData);

    setInitialTime(hoursFormatted.initialTime || "");
    setEndTime(hoursFormatted.endTime || "");
  }, [courseInformation.StartDate, courseInformation.EndDate, courseInformation.Hours]);

  if (!courseData) {
    return null;
  }

  const {
    CourseCode,
    Section,
    ProgramID,
    Name,
    Description,
    TermID,
    Term,
    Year,
    Days,
    Hours,
    StartDate,
    EndDate,
    CampusID,
    CampusName,
    Room,
    DomesticFees,
    InternationalFees,
    SeatsAvailable,
    ClassSize,
    DeliveryMode,
    ProgramType,
  } = courseInformation;

  const handleButtonClickAddCourse = async () => {
    const courseInformation = {
      StudentID: authenticatedUserData.StudentID,
      CourseCode: CourseCode,
      Section: Section,
      TermID: TermID,
      Year: Year,
    };

    const courseRegistration = await addCourseRegistration(courseInformation);
    if (courseRegistration.isAlreadyRegistered) {
      setConfirmationMessage("This course is already registered.");
      setShowConfirmationModal(true);
    } else {
      setConfirmationMessage("The course has been added successfully.");
      setShowConfirmationModal(true);
    }
  };

  const handleButtonClickRemoveCourse = async () => {
    const courseInformation = {
      StudentID: authenticatedUserData.StudentID,
      CourseCode: CourseCode,
      Section: Section,
      TermID: TermID,
      Year: Year,
    };

    await removeCourseRegistration(courseInformation);

    setConfirmationMessage("Course removed.");
    setShowConfirmationModal(true);
  };

  const handleButtonClickDeleteCourse = (course) => {
    setSelectedCourseForDeletion(course);
    setConfirmationMessage("Are you sure you want to delete the course?");
    setShowDeleteConfirmationModal(true);
  };

  const deleteSelectedCourse = async () => {
    if (selectedCourseForDeletion) {
      const courseInformation = {
        StudentID: authenticatedUserData.StudentID,
        CourseCode: selectedCourseForDeletion.CourseCode,
        Section: selectedCourseForDeletion.Section,
        TermID: selectedCourseForDeletion.TermID,
        Year: selectedCourseForDeletion.Year,
      };

      await deleteCourse(courseInformation);
      setShowDeleteConfirmationModal(false);
      setConfirmationMessage("Course deleted.");
      setShowConfirmationModal(true);
    }
  };

  const handleButtonClickEditCourse = () => {
    setEditCourseData(courseInformation);
    setShowEditModal(true);
  };

  const handleEditCourse = async () => {
    const updatedHoursFormatted = getFormattedHoursToDB(initialTime, endTime);
    const updatedCourseData = {
      ...editCourseData,
      Hours: `${updatedHoursFormatted.initialTime} - ${updatedHoursFormatted.endTime}`,
      StartDate: startDateFormattedEdited,
      EndDate: endDateFormattedEdited,

      OldCourseCode: courseInformation.CourseCode,
      OldSection: courseInformation.Section,
      OldProgramID: courseInformation.ProgramID,
      OldTermID: courseInformation.TermID,
      OldYear: courseInformation.Year,
    };

    await updateCourse(updatedCourseData);
    setShowEditModal(false);

    window.location.reload();
  };

  return (
    <>
      <CardWrapper>
        <Row>
          <Col>
            <div className="text-center">
              <Card.Title style={{ color: "var(--color_font2)" }}>
                <strong>{Name}</strong>
              </Card.Title>
            </div>
          </Col>
        </Row>

        <Card.Body>
          <Row>
            <Col xs="auto">
              <Card.Title style={{ color: "var(--color_font2)" }}>
                <strong>
                  Term: {Term}/{Year}
                </strong>
              </Card.Title>
            </Col>

            <Col xs="auto">
              <Card.Title style={{ color: "var(--color_font2)" }}>
                <strong>Code: {CourseCode}</strong>
              </Card.Title>
            </Col>
            <Col xs="auto">
              <Card.Title style={{ color: "var(--color_font2)" }}>
                <strong>Section: {Section}</strong>
              </Card.Title>
            </Col>
          </Row>
          <Row>
            <Col md={12} xl={6}>
              <Card.Title className="mt-3" style={{ color: "var(--color_font2)" }}>
                <strong>Description: </strong>
              </Card.Title>
              <Card.Text style={{ color: "var(--color_font3)" }}>{Description}</Card.Text>
            </Col>
            <Col md={12} xl={6}>
              <div className="text-center">
                <Card.Title className="mt-3" style={{ color: "var(--color_font1)" }}>
                  <strong>
                    <em>{Days}</em>
                  </strong>
                </Card.Title>
                <Card.Title style={{ color: "var(--color_font1)" }}>
                  <strong>
                    <em>{Hours}</em>
                  </strong>
                </Card.Title>
              </div>

              <Table hover>
                <tbody>
                  <tr>
                    <CustomTd>
                      <strong>Start date:</strong>
                    </CustomTd>
                    <CustomTd>{startDateFormatted}</CustomTd>
                  </tr>
                  <tr>
                    <CustomTd>
                      <strong>End date:</strong>
                    </CustomTd>
                    <CustomTd>{endDateFormatted}</CustomTd>
                  </tr>
                  <tr>
                    <CustomTd>
                      <strong>Campus:</strong>
                    </CustomTd>
                    <CustomTd>{CampusName}</CustomTd>
                  </tr>
                  <tr>
                    <CustomTd>
                      <strong>Delivery mode:</strong>
                    </CustomTd>
                    <CustomTd>{DeliveryMode}</CustomTd>
                  </tr>
                  <tr>
                    <CustomTd>
                      <strong>Seats available:</strong>
                    </CustomTd>
                    <CustomTd>{SeatsAvailable}</CustomTd>
                  </tr>
                  <tr>
                    <CustomTd>
                      <strong>Class size:</strong>
                    </CustomTd>
                    <CustomTd>{ClassSize}</CustomTd>
                  </tr>
                </tbody>
              </Table>

              <div className="d-flex justify-content-end">
                <CustomButton disabled={disableaddCourseButton} hidden={addCourseButtonHidden} onClick={handleButtonClickAddCourse}>
                  Add Course
                </CustomButton>
              </div>

              <div className="d-flex justify-content-end">
                <CustomButton hidden={removeCourseButtonHidden} onClick={handleButtonClickRemoveCourse}>
                  Remove Course
                </CustomButton>
              </div>

              <div className="d-flex justify-content-end">
                <CustomButton hidden={deleteCourseButtonHidden} onClick={handleButtonClickEditCourse}>
                  Edit Course
                </CustomButton>

                <CustomButton hidden={deleteCourseButtonHidden} onClick={() => handleButtonClickDeleteCourse(courseInformation)}>
                  Delete Course
                </CustomButton>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </CardWrapper>

      <Modal
        show={showConfirmationModal}
        onHide={() => {
          setShowConfirmationModal(false);
          window.location.reload();
        }}>
        <Modal.Header
          closeButton
          className={
            confirmationMessage === "The course has been added successfully."
              ? "bg-success text-white"
              : confirmationMessage === "Course removed."
              ? "bg-warning"
              : confirmationMessage === "Course deleted."
              ? "bg-danger text-white"
              : "bg-warning"
          }>
          <Modal.Title>Confirmation message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{confirmationMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <CustomButton
            onClick={() => {
              setShowConfirmationModal(false);
              window.location.reload();
            }}>
            Close
          </CustomButton>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showDeleteConfirmationModal}
        onHide={() => {
          setShowDeleteConfirmationModal(false);
          setSelectedCourseForDeletion(null);
        }}>
        <Modal.Header
          closeButton
          className={
            confirmationMessage === "The course has been added successfully."
              ? "bg-success text-white"
              : confirmationMessage === "Course removed."
              ? "bg-warning"
              : confirmationMessage === "Course deleted."
              ? "bg-danger text-white"
              : "bg-warning"
          }>
          <Modal.Title>Confirmation message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the course?</p>
        </Modal.Body>
        <Modal.Footer>
          <CustomButton onClick={deleteSelectedCourse}>Yes</CustomButton>
          <CustomButton
            onClick={() => {
              setShowDeleteConfirmationModal(false);
              setSelectedCourseForDeletion(null);
            }}>
            No
          </CustomButton>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="title">
              <Form.Label>Course</Form.Label>
              <Form.Control
                type="text"
                value={editCourseData.Name}
                onChange={(e) =>
                  setEditCourseData({
                    ...editCourseData,
                    Name: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mt-3" controlId="code">
                  <Form.Label>Code</Form.Label>
                  <Form.Control
                    disabled
                    type="text"
                    value={editCourseData.CourseCode}
                    onChange={(e) =>
                      setEditCourseData({
                        ...editCourseData,
                        CourseCode: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mt-3" controlId="season">
                  <Form.Label>Term</Form.Label>
                  <Form.Control
                    disabled
                    as="select"
                    value={editCourseData.Term}
                    onChange={(e) =>
                      setEditCourseData({
                        ...editCourseData,
                        Term: e.target.value,
                      })
                    }>
                    <option value="Spring">Spring</option>
                    <option value="Summer">Summer</option>
                    <option value="Fall">Fall</option>
                    <option value="Winter">Winter</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mt-3" controlId="code">
                  <Form.Label>Section</Form.Label>
                  <Form.Control
                    disabled
                    type="text"
                    value={editCourseData.Section}
                    onChange={(e) =>
                      setEditCourseData({
                        ...editCourseData,
                        Section: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mt-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={editCourseData.Description}
                onChange={(e) =>
                  setEditCourseData({
                    ...editCourseData,
                    Description: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="startDate">
                  <Form.Label style={{ color: "var(--color_font2)" }}>
                    <strong>Start Date:</strong>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    min={`${startDateFormattedEdited.substring(0, 4)}-01-01`}
                    max={`${startDateFormattedEdited.substring(0, 4)}-12-31`}
                    required
                    value={startDateFormattedEdited}
                    onChange={(e) => setStartDateFormattedEdited(e.target.value)}
                    onKeyDown={(e) => {
                      // Prevent the default behavior for the DEL key (key code 46) and Backspace key (key code 8)
                      if (e.keyCode === 46 || e.keyCode === 8) {
                        e.preventDefault();
                      }
                    }}
                  />
                  <Form.Control.Feedback type="invalid">Please enter start date.</Form.Control.Feedback>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="endDate">
                  <Form.Label style={{ color: "var(--color_font2)" }}>
                    <strong>End Date:</strong>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    min={`${endDateFormattedEdited.substring(0, 4)}-01-01`}
                    max={`${endDateFormattedEdited.substring(0, 4)}-12-31`}
                    required
                    value={endDateFormattedEdited}
                    onChange={(e) => setEndDateFormattedEdited(e.target.value)}
                    onKeyDown={(e) => {
                      // Prevent the default behavior for the DEL key (key code 46) and Backspace key (key code 8)
                      if (e.keyCode === 46 || e.keyCode === 8) {
                        e.preventDefault();
                      }
                    }}
                  />
                  <Form.Control.Feedback type="invalid">Please enter start date.</Form.Control.Feedback>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="startTime">
                  <Form.Label style={{ color: "var(--color_font2)" }}>
                    <strong>Start Time:</strong>
                  </Form.Label>
                  <Form.Control
                    type="time"
                    required
                    value={initialTime}
                    onChange={(e) => {
                      setInitialTime(e.target.value);
                    }}
                  />
                  <Form.Control.Feedback type="invalid">Please enter a start time.</Form.Control.Feedback>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="endTime">
                  <Form.Label style={{ color: "var(--color_font2)" }}>
                    <strong>End Time:</strong>
                  </Form.Label>
                  <Form.Control
                    type="time"
                    required
                    value={endTime}
                    onChange={(e) => {
                      setEndTime(e.target.value);
                    }}
                  />
                  <Form.Control.Feedback type="invalid">Please enter a start time.</Form.Control.Feedback>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="week_day">
              <Form.Label style={{ color: "var(--color_font2)" }}>
                <strong>Week Day:</strong>
              </Form.Label>
              <Form.Select
                required
                value={editCourseData.Days}
                onChange={(e) =>
                  setEditCourseData({
                    ...editCourseData,
                    Days: e.target.value,
                  })
                }>
                <option value="" disabled>
                  Select a Week Day
                </option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Friday</option>
                <option value="Sunday">Friday</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">Please select a week day.</Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="campus">
              <Form.Label style={{ color: "var(--color_font2)" }}>
                <strong>Campus:</strong>
              </Form.Label>
              <Form.Select
                required
                value={`${editCourseData.CampusID}-${editCourseData.CampusName}`}
                onChange={(e) => {
                  const [campusID, campus] = e.target.value.split("-");
                  setEditCourseData({
                    ...editCourseData,
                    CampusID: campusID,
                    CampusName: campus,
                  });
                }}>
                <option value="" disabled>
                  Select a Delivery Mode
                </option>
                <option value="1-Calgary">Calgary</option>
                <option value="2-Airdrie">Airdrie</option>
                <option value="3-Banff">Banff</option>
                <option value="4-Okotoks">Okotoks</option>
                <option value="5-Cochrane">Cochrane</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">Please select a campus.</Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="delivery_mode">
              <Form.Label style={{ color: "var(--color_font2)" }}>
                <strong>Delivery Mode:</strong>
              </Form.Label>
              <Form.Select
                required
                value={editCourseData.DeliveryMode}
                onChange={(e) =>
                  setEditCourseData({
                    ...editCourseData,
                    DeliveryMode: e.target.value,
                  })
                }>
                <option value="" disabled>
                  Select a Delivery Mode
                </option>
                <option value="In-Class">In-Class</option>
                <option value="Hybrid">Hybrid</option>
                <option value="ATOL">ATOL</option>
                <option value="RTOL">RTOL</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">Please select a delivery mode.</Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="class_size">
              <Form.Label style={{ color: "var(--color_font2)" }}>
                <strong>Class Size:</strong>
              </Form.Label>
              <Form.Control
                type="number"
                min="1"
                max="40"
                value={editCourseData.ClassSize}
                onChange={(e) =>
                  setEditCourseData({
                    ...editCourseData,
                    ClassSize: e.target.value,
                  })
                }
                placeholder="Class Size (1 ~ 40)"
                required
              />
              <Form.Control.Feedback type="invalid">Please enter class size between 1 and 40.</Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <CustomButton className="mt-3" onClick={handleEditCourse}>
              Save Changes
            </CustomButton>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CourseCard;

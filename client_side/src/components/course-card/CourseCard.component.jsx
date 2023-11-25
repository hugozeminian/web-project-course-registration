import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { Row, Col, Table, Form } from "react-bootstrap";
import { CardWrapper, CustomButton, CustomTd } from "./CourseCard.styles";
import {
  addCourseRegistration,
  admDeleteCourse,
  removeCourseRegistration,
  getAuthenticatedUser,
  updateCourse,
  getStudentAddedCourses,
  getStudentID,
} from "../../util/api/api";
import { CustomRadioGroup, CustomGroupFormCheck } from "../../route/adm-new-course-form/AdmNewCourseForm.styles";
import { getFormattedDateFromDB } from "../../util/general-functions/generalFunctions";

const CourseCard = ({
  courseData,
  disableaddCourseButton,
  addCourseButtonHidden,
  removeCourseButtonHidden,
  deleteCourseButtonHidden,
  authenticatedUser,
}) => {
  const [courseInformation, setCourseInformation] = useState(courseData);
  const [authenticatedUserData, setAuthenticatedUserData] = useState(authenticatedUser)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  if (!courseData) {
    return null;
  }

  const {
    Username,
    ProgramName,
    CourseMin,
    CourseMax,
    CourseCode,
    Section,
    Name,
    Description,
    Year,
    TermID,
    Term,
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
  } = courseInformation;

  const startDateformatted = getFormattedDateFromDB(StartDate)
  const endDateformatted = getFormattedDateFromDB(EndDate)

  
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

  const handleButtonClickDeleteCourse = () => {
    const courseInformation = {
      StudentID: authenticatedUserData.StudentID,
      CourseCode: CourseCode,
      Section: Section,
      TermID: TermID,
      Year: Year,
    };
    
    //ToDo
    admDeleteCourse(courseInformation);

    setConfirmationMessage("Course Deleted.");
    setShowConfirmationModal(true);
  };

  const handleButtonClickEditCourse = () => {
    setShowEditModal(true);
  };

  const handleEditCourse = () => {
    updateCourse(courseInformation);
    setShowEditModal(false);
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
                    <CustomTd>{startDateformatted}</CustomTd>
                  </tr>
                  <tr>
                    <CustomTd>
                      <strong>End date:</strong>
                    </CustomTd>
                    <CustomTd>{endDateformatted}</CustomTd>
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

                <CustomButton hidden={deleteCourseButtonHidden} onClick={handleButtonClickDeleteCourse}>
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
              : "bg-danger text-white"
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
                value={courseInformation.title}
                onChange={(e) =>
                  setCourseInformation({
                    ...courseInformation,
                    title: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mt-3" controlId="code">
                  <Form.Label>Code</Form.Label>
                  <Form.Control
                    type="text"
                    value={courseInformation.course_number}
                    onChange={(e) =>
                      setCourseInformation({
                        ...courseInformation,
                        course_number: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mt-3" controlId="season">
                  <Form.Label>Term</Form.Label>
                  <Form.Control
                    as="select"
                    value={courseInformation.season}
                    onChange={(e) =>
                      setCourseInformation({
                        ...courseInformation,
                        season: e.target.value,
                      })
                    }>
                    <option value="1">Spring</option>
                    <option value="2">Summer</option>
                    <option value="3">Fall</option>
                    <option value="4">Winter</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mt-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={courseInformation.description}
                onChange={(e) =>
                  setCourseInformation({
                    ...courseInformation,
                    description: e.target.value,
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
                    required
                    value={courseInformation.startDate}
                    onChange={(e) =>
                      setCourseInformation({
                        ...courseInformation,
                        startDate: e.target.value,
                      })
                    }
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
                    required
                    value={courseInformation.endDate}
                    onChange={(e) =>
                      setCourseInformation({
                        ...courseInformation,
                        endDate: e.target.value,
                      })
                    }
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
                    value={courseInformation.startTime}
                    onChange={(e) =>
                      setCourseInformation({
                        ...courseInformation,
                        startTime: e.target.value,
                      })
                    }
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
                    value={courseInformation.endTime}
                    onChange={(e) =>
                      setCourseInformation({
                        ...courseInformation,
                        endTime: e.target.value,
                      })
                    }
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
                value={courseInformation.week_day}
                onChange={(e) =>
                  setCourseInformation({
                    ...courseInformation,
                    week_day: e.target.value,
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
                value={courseInformation.campus}
                onChange={(e) =>
                  setCourseInformation({
                    ...courseInformation,
                    campus: e.target.value,
                  })
                }>
                <option value="" disabled>
                  Select a Campus
                </option>
                <option value="Calgary">Calgary</option>
                <option value="Airdrie">Airdrie</option>
                <option value="Banff">Banff</option>
                <option value="Okotoks">Okotoks</option>
                <option value="Cochrane">Cochrane</option>
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
                value={courseInformation.delivery_mode}
                onChange={(e) =>
                  setCourseInformation({
                    ...courseInformation,
                    delivery_mode: e.target.value,
                  })
                }>
                <option value="" disabled>
                  Select a Delivery Mode
                </option>
                <option value="In Class">In Class</option>
                <option value="Real-time Online">Real-time Online</option>
                <option value="Any-time Online">Any-time Online</option>
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
                value={courseInformation.class_size}
                onChange={(e) =>
                  setCourseInformation({
                    ...courseInformation,
                    class_size: e.target.value,
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

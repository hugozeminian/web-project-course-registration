import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { Row, Col, Table } from "react-bootstrap";
import { CardWrapper, CustomButton, CustomTd } from "./CourseCard.styles";
import {
  addCourseRegistration,
  admDeleteCourse,
  removeCourseRegistration,
  getAuthenticatedUser,
} from "../../util/api/api";

function CourseCard({
  courseData,
  addCourseButtonHidden,
  removeCourseButtonHidden,
  deleteCourseButtonHidden,
}) {
  const [courseInformation, setCourseInformation] = useState(courseData);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  if (!courseData) {
    return null;
  }

  const authenticatedUser = getAuthenticatedUser();

  const {
    courseId,
    season,
    course_number,
    title,
    description,
    week_day,
    hour,
    start_date,
    end_date,
    campus,
    delivery_mode,
    seats_available,
    class_size,
  } = courseInformation;

  const handleButtonClickAddCourse = () => {
    const courseInformation = {
      id: "",
      studentId: authenticatedUser.userId,
      courseId: courseId,
      season: season,
      course_number: course_number,
      title: title,
      description: description,
      week_day: week_day,
      hour: hour,
      start_date: start_date,
      end_date: end_date,
      campus: campus,
      delivery_mode: delivery_mode,
      seats_available: seats_available,
      class_size: class_size,
    };
    const isAlreadyRegistered = addCourseRegistration(courseInformation);
    if (isAlreadyRegistered) {
      setConfirmationMessage("This course is already registered.");
      setShowConfirmationModal(true);
    } else {
      setConfirmationMessage("The course has been added successfully.");
      setShowConfirmationModal(true);
    }
  };

  const handleButtonClickRemoveCourse = () => {
    const courseInformation = {
      id: "",
      courseId: courseId,
      studentId: authenticatedUser.userId,
    };

    removeCourseRegistration(courseInformation);

    setConfirmationMessage("Course removed.");
    setShowConfirmationModal(true);
  };

  const handleButtonClickDeleteCourse = () => {
    const courseInformation = {
      id: "",
      courseId: courseId,
    };

    admDeleteCourse(courseInformation);

    setConfirmationMessage("Course Deleted.");
    setShowConfirmationModal(true);
  };

  return (
    <>
      <CardWrapper>
        <Row>
          <Col>
            <div className="text-center">
              <Card.Title style={{ color: "var(--color_font2)" }}>
                <strong>{title}</strong>
              </Card.Title>
            </div>
          </Col>
        </Row>

        <Card.Body>
          <Row>
            <Col xs="auto">
              <Card.Title style={{ color: "var(--color_font2)" }}>
                <strong>Season: {season}</strong>
              </Card.Title>
            </Col>

            <Col xs="auto">
              <Card.Title style={{ color: "var(--color_font2)" }}>
                <strong>Code: {course_number}</strong>
              </Card.Title>
            </Col>
          </Row>
          <Row>
            <Col md={12} xl={6}>
              <Card.Title
                className="mt-3"
                style={{ color: "var(--color_font2)" }}>
                <strong>Description: </strong>
              </Card.Title>
              <Card.Text style={{ color: "var(--color_font3)" }}>
                {description}
              </Card.Text>
            </Col>
            <Col md={12} xl={6}>
              <div className="text-center">
                <Card.Title
                  className="mt-3"
                  style={{ color: "var(--color_font1)" }}>
                  <strong>
                    <em>{week_day}</em>
                  </strong>
                </Card.Title>
                <Card.Title style={{ color: "var(--color_font1)" }}>
                  <strong>
                    <em>{hour}</em>
                  </strong>
                </Card.Title>
              </div>

              <Table hover>
                <tbody>
                  <tr>
                    <CustomTd>
                      <strong>Start date:</strong>
                    </CustomTd>
                    <CustomTd>{start_date}</CustomTd>
                  </tr>
                  <tr>
                    <CustomTd>
                      <strong>End date:</strong>
                    </CustomTd>
                    <CustomTd>{end_date}</CustomTd>
                  </tr>
                  <tr>
                    <CustomTd>
                      <strong>Campus:</strong>
                    </CustomTd>
                    <CustomTd>{campus}</CustomTd>
                  </tr>
                  <tr>
                    <CustomTd>
                      <strong>Delivery mode:</strong>
                    </CustomTd>
                    <CustomTd>{delivery_mode}</CustomTd>
                  </tr>
                  <tr>
                    <CustomTd>
                      <strong>Seats available:</strong>
                    </CustomTd>
                    <CustomTd>{seats_available}</CustomTd>
                  </tr>
                  <tr>
                    <CustomTd>
                      <strong>Class size:</strong>
                    </CustomTd>
                    <CustomTd>{class_size}</CustomTd>
                  </tr>
                </tbody>
              </Table>

              <div className="d-flex justify-content-end">
                <CustomButton
                  hidden={addCourseButtonHidden}
                  onClick={handleButtonClickAddCourse}>
                  Add Course
                </CustomButton>
              </div>

              <div className="d-flex justify-content-end">
                <CustomButton
                  hidden={removeCourseButtonHidden}
                  onClick={handleButtonClickRemoveCourse}>
                  Remove Course
                </CustomButton>
              </div>

              <div className="d-flex justify-content-end">
                <CustomButton
                  hidden={deleteCourseButtonHidden}
                  onClick={handleButtonClickDeleteCourse}>
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
    </>
  );
}

export default CourseCard;

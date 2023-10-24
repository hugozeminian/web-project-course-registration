import Card from "react-bootstrap/Card";
import { Row, Col, Table } from "react-bootstrap";
import { CardWrapper, CustomButton, CustomTd } from "./CourseCard.styled";

function CourseCard({courseData}) {
  const {
    term,
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
  } = courseData;

  return (
    <CardWrapper>
      <Row>
        <Col xs={12} md={3} className="ms-2">
          <Card.Title style={{ color: "var(--color_font2)" }}>
            <strong>Term: {term}</strong>
          </Card.Title>
        </Col>
        <Col xs={12} md={6}>
          <div className="text-center">
            <Card.Title style={{ color: "var(--color_font2)" }}>
              <strong>{title} - {course_number}</strong>
            </Card.Title>
          </div>
        </Col>
      </Row>
      <Card.Body>
        <Row>
          <Col md={12} xl={6}>
            <Card.Title className="mt-3" style={{ color: "var(--color_font2)" }}>
              <strong>Description: </strong>
            </Card.Title>
            <Card.Text style={{ color: "var(--color_font3)" }}>
              {description}
            </Card.Text>
          </Col>
          <Col md={12} xl={6}>
            <div className="text-center">
              <Card.Title className="mt-3" style={{ color: "var(--color_font1)" }}>
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
              <CustomButton>Add Course</CustomButton>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </CardWrapper>
  );
}

export default CourseCard;

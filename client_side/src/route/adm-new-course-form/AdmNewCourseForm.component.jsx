import React, { useState } from "react";

import { FormWrapper, CustomButton, CustomRadioGroup, CustomGroupFormCheck } from "./AdmNewCourseForm.styles";
import { Form, Col, Row } from "react-bootstrap";
import { createCourse } from "../../util/api/api";
import { capitalizeEachWord, convertToAMPM, getFormatDate, getFormattedDateToDB } from "../../util/general-functions/generalFunctions";

const AdmNewCourseForm = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      const startTime = convertToAMPM(form.startTime.value);
      const endTime = convertToAMPM(form.endTime.value);

      const newCourseData = {
        CourseCode: form.code.value.toUpperCase(),
        Section: form.section.value,
        ProgramID: form.program.value, // Verify logic if is correct
        Name: capitalizeEachWord(form.name.value),
        Description: form.description.value,
        Term: form.term.value,
        Year: getFormattedDateToDB(form.startDate.value).substring(0, 4),
        Days: form.weekDay.value,
        Hours: startTime + " - " + endTime,
        StartDate: getFormattedDateToDB(form.startDate.value),
        EndDate: getFormattedDateToDB(form.endDate.value),
        CampusID: form.campus.value,
        Room: 'N101', //ToDo
        DomesticFees: 500.00, //ToDo
        InternationalFees: 1500.00, //ToDo
        SeatsAvailable: form.classSize.value,
        ClassSize: form.classSize.value,
        DeliveryMode: form.deliveryMode.value,
      };

      createCourse(newCourseData);
    }
  };

  return (
    <>
      <FormWrapper noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Col sm={12}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label style={{ color: "var(--color_font2)" }}>
                <strong>Course Name:</strong>
              </Form.Label>
              <Form.Control type="text" placeholder="Course Name" required />
              <Form.Control.Feedback type="invalid">Please enter your name.</Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col xs={6} md={3}>
            <Form.Group className="mb-3" controlId="code">
              <Form.Label style={{ color: "var(--color_font2)" }}>
                <strong>Code:</strong>
              </Form.Label>
              <Form.Control type="text" placeholder="Code" required pattern="[A-Za-z]{2}\d{4}" />
              <Form.Control.Feedback type="invalid">Please enter course code (ex: SD0000).</Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xs={6} md={3}>
            <Form.Group className="mb-3" controlId="section">
              <Form.Label style={{ color: "var(--color_font2)" }}>
                <strong>Section:</strong>
              </Form.Label>
              <Form.Control type="number" placeholder="Section" min="1" required />
              <Form.Control.Feedback type="invalid">Please enter course code (ex: SD0000).</Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xs={6} md={3}>
            <Form.Group className="mb-3" controlId="program">
              <Form.Label style={{ color: "var(--color_font2)" }}>
                <strong>Program:</strong>
              </Form.Label>
              <Form.Select required>
                <option value="" disabled selected>
                  Select a Program
                </option>
                <option value="100">Diploma</option>
                <option value="101">Post-Diploma</option>
                <option value="102">Certificate</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">Please select a program.</Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xs={6} md={3}>
            <Form.Group className="mb-3" controlId="term">
              <Form.Label style={{ color: "var(--color_font2)" }}>
                <strong>Term:</strong>
              </Form.Label>
              <Form.Select required>
                <option value="" disabled selected>
                  Select a Term
                </option>
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
                <option value="Fall">Fall</option>
                <option value="Winter">Winter</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">Please select a term.</Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label style={{ color: "var(--color_font2)" }}>
            <strong>Description:</strong>
          </Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Course Description" required />
          <Form.Control.Feedback type="invalid">Please enter a course description.</Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="startDate">
              <Form.Label style={{ color: "var(--color_font2)" }}>
                <strong>Start Date:</strong>
              </Form.Label>
              <Form.Control type="date" required />
              <Form.Control.Feedback type="invalid">Please enter start date.</Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3" controlId="endDate">
              <Form.Label style={{ color: "var(--color_font2)" }}>
                <strong>End Date:</strong>
              </Form.Label>
              <Form.Control type="date" required />
              <Form.Control.Feedback type="invalid">Please enter end date.</Form.Control.Feedback>
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
              <Form.Control type="time" required />
              <Form.Control.Feedback type="invalid">Please enter a start time.</Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3" controlId="endTime">
              <Form.Label style={{ color: "var(--color_font2)" }}>
                <strong>End Time:</strong>
              </Form.Label>
              <Form.Control type="time" required />
              <Form.Control.Feedback type="invalid">Please enter an end time.</Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="weekDay">
          <Form.Label style={{ color: "var(--color_font2)" }}>
            <strong>Week Day:</strong>
          </Form.Label>
          <CustomRadioGroup className="d-flex">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
              <CustomGroupFormCheck key={`inline-${day}`}>
                <Form.Check inline label={day} name="weekDay" type="radio" id={`inline-weekDay-${index}`} value={day} required={index === 1} />
              </CustomGroupFormCheck>
            ))}
          </CustomRadioGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="campus">
          <Form.Label style={{ color: "var(--color_font2)" }}>
            <strong>Campus:</strong>
          </Form.Label>
          <Form.Select required>
            <option value="" disabled selected>
              Select a Campus
            </option>
            <option value="1">Calgary</option>
            <option value="2">Airdrie</option>
            <option value="3">Banff</option>
            <option value="4">Okotoks</option>
            <option value="5">Cochrane</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">Please select a campus.</Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="deliveryMode">
          <Form.Label style={{ color: "var(--color_font2)" }}>
            <strong>Delivery Mode:</strong>
          </Form.Label>
          <Form.Select required>
            <option value="" disabled selected>
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

        <Form.Group className="mb-3" controlId="classSize">
          <Form.Label style={{ color: "var(--color_font2)" }}>
            <strong>Class Size:</strong>
          </Form.Label>
          <Form.Control type="number" min="1" max="40" placeholder="Class Size (1 ~ 40)" required />
          <Form.Control.Feedback type="invalid">Please enter class size between 1 and 40.</Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <CustomButton type="submit">Submit </CustomButton>
      </FormWrapper>
    </>
  );
};

export default AdmNewCourseForm;

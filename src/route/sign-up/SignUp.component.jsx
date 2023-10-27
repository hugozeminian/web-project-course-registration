import React, { useState } from "react";
import TitlePage from "../../components/title-page/TitlePage.component";

import { FormWrapper, CustomButton } from "./SignUp.styles";

import { Form, Col, Row } from "react-bootstrap";

const SignUp = () => {
  const [validated, setValidated] = useState(false);
  const [countryCode, setCountryCode] = useState("+1"); // State variable for country code

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      // const startTime = convertToAMPM(form.startTime.value);
      // const endTime = convertToAMPM(form.endTime.value);

      // const newCourseData = {
      //   courseId: "",
      //   term: Number(form.term.value),
      //   course_number: form.code.value.toUpperCase(),
      //   title: capitalizeEachWord(form.name.value),
      //   description: form.description.value,
      //   week_day: form.weekDay.value,
      //   hour: startTime + " - " + endTime,
      //   start_date: getFormatDate(form.startDate.value),
      //   end_date: getFormatDate(form.endDate.value),
      //   campus: form.campus.value,
      //   delivery_mode: form.deliveryMode.value,
      //   seats_available: form.classSize.value,
      //   class_size: form.classSize.value,
      // };

      // admAddNewCourse(newCourseData);

      const numericPhoneNumber = form.phone.value.replace(/\D/g, "");
      const formattedPhoneNumber = `${countryCode} (${numericPhoneNumber.slice(
        0,
        3
      )}) ${numericPhoneNumber.slice(3, 6)}-${numericPhoneNumber.slice(6)}`;
    }
  };

  return (
    <>
      <TitlePage title="Registration form" />

      <FormWrapper noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="fname">
          <Form.Label style={{ color: "var(--color_font2)" }}>
            <strong>First Name:</strong>
          </Form.Label>
          <Form.Control type="text" placeholder="First Name" required />
          <Form.Control.Feedback type="invalid">
            Please enter your first name.
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="lname">
          <Form.Label style={{ color: "var(--color_font2)" }}>
            <strong>Last Name:</strong>
          </Form.Label>
          <Form.Control type="text" placeholder="Last Name" required />
          <Form.Control.Feedback type="invalid">
            Please enter your last name.
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Row>
          <Col lg={3}>
            <Form.Group className="mb-3" controlId="countryCode">
              <Form.Label style={{ color: "var(--color_font2)" }}>
                <strong>Country Code:</strong>
              </Form.Label>
              <Form.Control
                as="select"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}>
                <option value="+1">+1 (United States)</option>
                <option value="+44">+44 (United Kingdom)</option>
                <option value="+55">+55 (Brazil)</option>
                {/* Add more country code options as needed */}
              </Form.Control>
            </Form.Group>
          </Col>

          <Col lg={9}>
            <Form.Group className="mb-3" controlId="phone">
              <Form.Label style={{ color: "var(--color_font2)" }}>
                <strong>Phone:</strong>
              </Form.Label>
              <Form.Control
                type="tel"
                placeholder="10 digit phone XXXXXXXXXX"
                pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter your phone number 10 digits.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="birthday">
          <Form.Label style={{ color: "var(--color_font2)" }}>
            <strong>Date of Birthday:</strong>
          </Form.Label>
          <Form.Control type="date" required />
          <Form.Control.Feedback type="invalid">
            Please enter your birthday date.
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="department">
          <Form.Label style={{ color: "var(--color_font2)" }}>
            <strong>Department:</strong>
          </Form.Label>
          <Form.Select disabled>
            <option value="Software Development" selected>
              Software Development
            </option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please select a department.
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="program">
          <Form.Label style={{ color: "var(--color_font2)" }}>
            <strong>Program:</strong>
          </Form.Label>
          <Form.Select required>
            <option value="" disabled selected>
              Select a program
            </option>
            <option value="Diploma (2 years)">Diploma (2 years)</option>
            <option value="Post Diploma (1 year)">Post Diploma (1 year)</option>
            <option value="Certificate (3 months and 6 months)">
              Certificate (3 months and 6 months)
            </option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please select a program.
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="username">
          <Form.Label style={{ color: "var(--color_font2)" }}>
            <strong>Username:</strong>
          </Form.Label>
          <Form.Control type="text" placeholder="Username" required />
          <Form.Control.Feedback type="invalid">
            Please enter your username.
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label style={{ color: "var(--color_font2)" }}>
            <strong>Password:</strong>
          </Form.Label>
          <Form.Control type="password" placeholder="Password" required />
          <Form.Control.Feedback type="invalid">
            Please enter your password.
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <CustomButton type="submit">Submit </CustomButton>
      </FormWrapper>
    </>
  );
};

export default SignUp;

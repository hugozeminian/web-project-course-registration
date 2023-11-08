import React, { useState } from "react";

import { FormWrapper, CustomButton } from "./SignUp.styles";

import { Form, Col, Row } from "react-bootstrap";
import {
  getFormattedPhoneNumber,
  capitalizeEachWord,
} from "../../util/general-functions/generalFunctions";
import {
  addStudentRegistration,
  signUpToLoginToDashboard,
} from "../../util/api/api";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [validated, setValidated] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      const numericPhoneNumber = form.phone.value.replace(/\D/g, "");
      const formattedPhoneNumber = getFormattedPhoneNumber(
        countryCode,
        numericPhoneNumber
      );

      const course_min = (form.program.value === "Certificate (3 months and 6 months)" ? 1 : 2)
      const course_max = (form.program.value === "Certificate (3 months and 6 months)" ? 1 : 5)

      const newStudentData = {
        studentId: "",
        first_name: capitalizeEachWord(form.first_name.value),
        last_name: capitalizeEachWord(form.last_name.value),
        email: form.email.value,
        phone: formattedPhoneNumber,
        date_of_birth: form.date_of_birth.value,
        department: "Software Development",
        program: form.program.value,
        username: form.username.value,
        current_password: form.current_password.value,
        course_min: course_min,
        course_max: course_max
      };

      addStudentRegistration(newStudentData);

      const userLoginData = {
        username: newStudentData.username,
        current_password: newStudentData.current_password,
      };

      const signWithLoginCompleted = signUpToLoginToDashboard(userLoginData);
      if (signWithLoginCompleted) {
        navigate("/user-dashboard");
        window.location.reload();
      }
    }
  };

  return (
    <>
      <FormWrapper noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="first_name">
          <Form.Label style={{ color: "var(--color_font2)" }}>
            <strong>First Name:</strong>
          </Form.Label>
          <Form.Control type="text" placeholder="First Name" required />
          <Form.Control.Feedback type="invalid">
            Please enter your first name.
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="last_name">
          <Form.Label style={{ color: "var(--color_font2)" }}>
            <strong>Last Name:</strong>
          </Form.Label>
          <Form.Control type="text" placeholder="Last Name" required />
          <Form.Control.Feedback type="invalid">
            Please enter your last name.
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label style={{ color: "var(--color_font2)" }}>
            <strong>Email address:</strong>
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            aria-describedby="inputGroupPrepend"
            required
            pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
          />
          <Form.Control.Feedback type="invalid">
            Please enter your name.
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
                placeholder="10 digits phone"
                pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter your phone number 10 digits.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="date_of_birth">
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
            <option value="Software Development">Software Development</option>
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

        <Form.Group className="mb-3" controlId="current_password">
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

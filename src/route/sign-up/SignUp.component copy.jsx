import React, { useState } from "react";
import TitlePage from "../../components/title-page/TitlePage.component";

import { FormWrapper, CustomButton } from "./SignUp.styles";

import { Form, Col, Row } from "react-bootstrap";
import { admAddNewCourse } from "../../util/api/api";
import {
  capitalizeEachWord,
  convertToAMPM,
  getFormatDate,
} from "../../util/general-functions/generalFunctions";

const SignUp = () => {
  const [validated, setValidated] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(""); // State variable to store the phone number

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

      // Format the phone number as needed before sending it to the server
      const formattedPhoneNumber = `+1 (${phoneNumber.slice(
        0,
        3
      )}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;

      // Now you can send the formattedPhoneNumber to the server or perform other actions
      console.log(formattedPhoneNumber);

      // admAddNewCourse(newCourseData);
    }
  };

  return (
    <>
      <TitlePage title="Registration form" />

      <FormWrapper noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label style={{ color: "var(--color_font2)" }}>
            <strong>First Name:</strong>
          </Form.Label>
          <Form.Control type="text" placeholder="First Name" required />
          <Form.Control.Feedback type="invalid">
            Please enter your first name.
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="name">
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
            <strong>Email:</strong>
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Phone"
            required
            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
          />
          <Form.Control.Feedback type="invalid">
            Please enter your phone.
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="phone">
          <Form.Label style={{ color: "var(--color_font2)" }}>
            <strong>Phone:</strong>
          </Form.Label>
          <Form.Control
            type="tel"
            placeholder="Phone +1 (XXX) XXX-XXXX"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))} // Allow only digits
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter your phone: +1 (XXX) XXX-XXXX.
          </Form.Control.Feedback>
        </Form.Group>

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
          <Form.Control type="text" placeholder="Password" required />
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

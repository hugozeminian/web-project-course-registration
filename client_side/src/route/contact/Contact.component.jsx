import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { FormWrapper, CustomButton } from "./Contact.styles";
import { capitalizeEachWord, getCurrentFormattedDateAndTime, getFormattedDateToDB } from "../../util/general-functions/generalFunctions";
import { sendMessageContact } from "../../util/api/api";

const Contact = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      const timestamp = Date.now();
      const formattedDate = getFormattedDateToDB(timestamp);
      const nameForm = form.name.value;
      const formattedName = capitalizeEachWord(nameForm);
      const messageStudentsData = {
        Name: formattedName,
        Email: form.email.value,
        Date: formattedDate,
        Message: form.message.value,
      };

      sendMessageContact(messageStudentsData);
    }
  };

  return (
    <>
      <FormWrapper noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label style={{ color: "var(--color_font2)" }}>
            <strong>Name:</strong>
          </Form.Label>
          <Form.Control type="text" placeholder="First name" required />
          <Form.Control.Feedback type="invalid">Please enter your name.</Form.Control.Feedback>
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
          <Form.Control.Feedback type="invalid">Please enter your name.</Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="message">
          <Form.Label style={{ color: "var(--color_font2)" }}>
            <strong>Message:</strong>
          </Form.Label>
          <Form.Control type="text" placeholder="Message" as="textarea" rows={6} required />
          <Form.Control.Feedback type="invalid">Please inform your message.</Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <CustomButton type="submit">Submit</CustomButton>
      </FormWrapper>
    </>
  );
};

export default Contact;

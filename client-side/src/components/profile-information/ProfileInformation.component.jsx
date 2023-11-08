import React from "react";

import { FormWrapper } from "./ProfileInformation.styles";
import { Form } from "react-bootstrap";
import { getAdminList, getStudentList, getUserInformation } from "../../util/api/api";

const ProfileInformation = ({ authenticatedUser }) => {
  let profileInformation;

  if (authenticatedUser.isAdmin) {
    const adminProfileList = getAdminList();
    profileInformation = getUserInformation(authenticatedUser, adminProfileList)
  } else {
    const studentProfileList = getStudentList();
    profileInformation = getUserInformation(authenticatedUser, studentProfileList)
  }

  const {
    adminId,
    studentId,
    first_name,
    last_name,
    email,
    phone,
    date_of_birth,
    username,
    department,
    program,
    current_password,
  } = profileInformation || {};
  return (
    <>
      {authenticatedUser.isAdmin ? (
        <FormWrapper noValidate>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--color_font2)" }}>
              <strong>First Name:</strong>
            </Form.Label>
            <Form.Control value={first_name} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--color_font2)" }}>
              <strong>Last Name:</strong>
            </Form.Label>
            <Form.Control value={last_name} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--color_font2)" }}>
              <strong>Email:</strong>
            </Form.Label>
            <Form.Control value={email} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--color_font2)" }}>
              <strong>Phone:</strong>
            </Form.Label>
            <Form.Control value={phone} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--color_font2)" }}>
              <strong>Date of Birth:</strong>
            </Form.Label>
            <Form.Control value={date_of_birth} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--color_font2)" }}>
              <strong>Username:</strong>
            </Form.Label>
            <Form.Control value={username} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--color_font2)" }}>
              <strong>Password:</strong>
            </Form.Label>
            <Form.Control type="password" value={current_password} disabled />
          </Form.Group>

        </FormWrapper>
      ) : (
        <FormWrapper noValidate>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--color_font2)" }}>
              <strong>First Name:</strong>
            </Form.Label>
            <Form.Control value={first_name} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--color_font2)" }}>
              <strong>Last Name:</strong>
            </Form.Label>
            <Form.Control value={last_name} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--color_font2)" }}>
              <strong>Email:</strong>
            </Form.Label>
            <Form.Control value={email} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--color_font2)" }}>
              <strong>Phone:</strong>
            </Form.Label>
            <Form.Control value={phone} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--color_font2)" }}>
              <strong>Date of Birth:</strong>
            </Form.Label>
            <Form.Control value={date_of_birth} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--color_font2)" }}>
              <strong>Department:</strong>
            </Form.Label>
            <Form.Control value={department} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--color_font2)" }}>
              <strong>Program:</strong>
            </Form.Label>
            <Form.Control value={program} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--color_font2)" }}>
              <strong>Username:</strong>
            </Form.Label>
            <Form.Control value={username} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--color_font2)" }}>
              <strong>Password:</strong>
            </Form.Label>
            <Form.Control type="password" value={current_password} disabled />
          </Form.Group>
        </FormWrapper>
      )}
    </>
  );
};

export default ProfileInformation;

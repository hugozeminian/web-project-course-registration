import React, { useEffect, useState } from "react";
import { FormWrapper } from "./ProfileInformation.styles";
import { Form } from "react-bootstrap";
import { getProfileInformation } from "../../util/api/api";

const ProfileInformation = ({ authenticatedUser }) => {
  const [profileInformation, setProfileInformation] = useState(null);

  useEffect(() => {
    const fetchProfileInformation = async () => {
      const profileInformation = await getProfileInformation(authenticatedUser);
      setProfileInformation(profileInformation)
    };

    if (authenticatedUser) {
      fetchProfileInformation();
    }
  }, [authenticatedUser]);

  if (!profileInformation) {
    return <p>Loading...</p>; 
  }

  const {
    Username, 
    FirstName,
    LastName,
    Phone, 
    Email,
    DateOfBirth,
    ProgramName,
    DepartmentName,
  } = profileInformation[0] ;

  return (
    <>
      {authenticatedUser.isAdmin ? (
        <FormWrapper noValidate>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--color_font2)" }}>
              <strong>First Name:</strong>
            </Form.Label>
            <Form.Control value={FirstName} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--color_font2)" }}>
              <strong>Last Name:</strong>
            </Form.Label>
            <Form.Control value={LastName} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--color_font2)" }}>
              <strong>Email:</strong>
            </Form.Label>
            <Form.Control value={Email} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--color_font2)" }}>
              <strong>Phone:</strong>
            </Form.Label>
            <Form.Control value={Phone} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--color_font2)" }}>
              <strong>Date of Birth:</strong>
            </Form.Label>
            <Form.Control value={DateOfBirth} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--color_font2)" }}>
              <strong>Username:</strong>
            </Form.Label>
            <Form.Control value={Username} disabled />
          </Form.Group>

          {/* <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--color_font2)" }}>
              <strong>Password:</strong>
            </Form.Label>
            <Form.Control type="password" value={current_password} disabled />
          </Form.Group> */}

        </FormWrapper>
      ) : (
        <FormWrapper noValidate>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--color_font2)" }}>
              <strong>First Name:</strong>
            </Form.Label>
            <Form.Control value={FirstName} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--color_font2)" }}>
              <strong>Last Name:</strong>
            </Form.Label>
            <Form.Control value={LastName} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--color_font2)" }}>
              <strong>Email:</strong>
            </Form.Label>
            <Form.Control value={Email} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--color_font2)" }}>
              <strong>Phone:</strong>
            </Form.Label>
            <Form.Control value={Phone} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--color_font2)" }}>
              <strong>Date of Birth:</strong>
            </Form.Label>
            <Form.Control value={DateOfBirth} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--color_font2)" }}>
              <strong>Department:</strong>
            </Form.Label>
            <Form.Control value={DepartmentName} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--color_font2)" }}>
              <strong>Program:</strong>
            </Form.Label>
            <Form.Control value={ProgramName} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--color_font2)" }}>
              <strong>Username:</strong>
            </Form.Label>
            <Form.Control value={Username} disabled />
          </Form.Group>

          {/* <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--color_font2)" }}>
              <strong>Password:</strong>
            </Form.Label>
            <Form.Control type="password" value={current_password} disabled />
          </Form.Group> */}
        </FormWrapper>
      )}
    </>
  );
};

export default ProfileInformation;

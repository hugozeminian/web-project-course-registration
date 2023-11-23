import React, { useEffect, useState } from "react";
import { CardWrapper } from "./UserDashboard.styles";
import Card from "react-bootstrap/Card";
import { getAuthenticatedUser, getProfileInformation } from "../../util/api/api";

const UserDashboard = () => {
  const [profileInformation, setProfileInformation] = useState(null);
  const [authenticatedUser, setAuthenticatedUser] = useState(null)
  
  useEffect(() => {
    const authenticatedUser = getAuthenticatedUser() || {};
    setAuthenticatedUser(authenticatedUser)
  }, [])

  useEffect(() => {
    const fetchProfileInformation = async () => {
      try {
        const profileInfo = await getProfileInformation(authenticatedUser);
        setProfileInformation(profileInfo);
      } catch (error) {
        console.error("Error fetching User Dashboard:", error);
      }
    };

    if (authenticatedUser) {
      fetchProfileInformation();
    }
  }, [authenticatedUser]);

  if (!profileInformation) {
    return <p>Loading...</p>;
  }

  const {
    StudentID,
    FirstName,
    ProgramName,
  } = profileInformation[0];

  return (
    <>
      {authenticatedUser.isAdmin ? (
        <CardWrapper>
          <Card.Body>
            <Card.Title style={{ color: "var(--color_font2)" }}>
              Hello, <strong>{FirstName}</strong>
            </Card.Title>
          </Card.Body>

          <Card.Body>
            <Card.Title style={{ color: "var(--color_font2)" }}>
              You are an <strong>ADMIN</strong> user.
            </Card.Title>
          </Card.Body>
        </CardWrapper>
      ) : (
        <CardWrapper>
          <Card.Body>
            <Card.Title style={{ color: "var(--color_font2)" }}>
              Hello, <strong>{FirstName}</strong>
            </Card.Title>
          </Card.Body>

          <Card.Body>
            <Card.Title style={{ color: "var(--color_font2)" }}>
              You are a <strong>STUDENT</strong> user.
            </Card.Title>
          </Card.Body>

          <Card.Body>
            <Card.Title style={{ color: "var(--color_font2)" }}>
              Student ID: <strong>{StudentID}</strong>.
            </Card.Title>
          </Card.Body>

          <Card.Body>
            <Card.Title style={{ color: "var(--color_font2)" }}>
              Department: <strong>Software Development</strong>
            </Card.Title>
          </Card.Body>

          <Card.Body>
            <Card.Title style={{ color: "var(--color_font2)" }}>
              Program: <strong>{ProgramName}</strong>
            </Card.Title>
          </Card.Body>
        </CardWrapper>
      )}
    </>
  );
};

export default UserDashboard;

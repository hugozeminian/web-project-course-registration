import React, { useEffect, useState } from "react";
import { CardWrapper } from "./UserDashboard.styles";
import Card from "react-bootstrap/Card";
import { getAuthenticatedUser, getProfileInformation } from "../../util/api/api";

const UserDashboard = () => {
  const [profileInformation, setProfileInformation] = useState(null);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  useEffect(() => {
    const authenticatedUser = getAuthenticatedUser() || {};
    setAuthenticatedUser(authenticatedUser);
  }, []);

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
    CourseMax,
    CourseMin,
    CoursesRegistered,
    DateOfBirth,
    DepartmentName,
    Email,
    FirstName,
    LastName,
    Phone,
    ProgramName,
    StudentID,
    Username,
  } = profileInformation[0];
  // console.log("🚀 ~ file: UserDashboard.component.jsx:39 ~ UserDashboard ~ profileInformation[0]:", profileInformation[0]);

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

          {/* <Card.Body>
            <Card.Title style={{ color: "var(--color_font2)" }}>
              Department: <strong>{DepartmentName}</strong>
            </Card.Title>
          </Card.Body> */}

          <Card.Body>
            <Card.Title style={{ color: "var(--color_font2)" }}>
              Program: <strong>{ProgramName}</strong>
            </Card.Title>
          </Card.Body>

          <Card.Body>
            <Card.Title style={{ color: "var(--color_font2)" }}>
              Courses registred: <strong>{CoursesRegistered}</strong>
            </Card.Title>
          </Card.Body>
        </CardWrapper>
      )}
    </>
  );
};

export default UserDashboard;

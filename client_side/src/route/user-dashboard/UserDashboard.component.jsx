import { CardWrapper } from "./UserDashboard.styles";
import Card from "react-bootstrap/Card";
import {
  getAdminList,
  getStudentList,
  getAuthenticatedUser,
} from "../../util/api/api";

const UserDashboard = () => {
  const authenticatedUser = getAuthenticatedUser() || {};
  const isAdmin = authenticatedUser.isAdmin;
  const userInformationList = isAdmin ? getAdminList() : getStudentList();
  const matchingUser = userInformationList.find((user) => {
    return user.username === authenticatedUser.username;
  });
  const userInformation = matchingUser;
  const { first_name, program, studentId } = userInformation || {}
  console.log("🚀 ~ file: UserDashboard.component.jsx:18 ~ UserDashboard ~ userInformation:", userInformation)

  return (
    <>
      {isAdmin ? (
        <CardWrapper>
          <Card.Body>
            <Card.Title style={{ color: "var(--color_font2)" }}>
              Hello, <strong>{first_name}</strong>
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
              Hello, <strong>{first_name}</strong>
            </Card.Title>
          </Card.Body>

          <Card.Body>
            <Card.Title style={{ color: "var(--color_font2)" }}>
              You are a <strong>STUDENT</strong> user.
            </Card.Title>
          </Card.Body>

          <Card.Body>
            <Card.Title style={{ color: "var(--color_font2)" }}>
              Student ID: <strong>{studentId}</strong>.
            </Card.Title>
          </Card.Body>

          <Card.Body>
            <Card.Title style={{ color: "var(--color_font2)" }}>
              Department: <strong>Software Development</strong>
            </Card.Title>
          </Card.Body>

          <Card.Body>
            <Card.Title style={{ color: "var(--color_font2)" }}>
              Program: <strong>{program}</strong>
            </Card.Title>
          </Card.Body>
        </CardWrapper>
      )}
    </>
  );
};

export default UserDashboard;

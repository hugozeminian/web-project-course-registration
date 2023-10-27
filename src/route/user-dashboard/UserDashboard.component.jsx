import { CardWrapper } from "./UserDashboard.styles";
import Card from "react-bootstrap/Card";
import { getAdminList, getStudentList } from "../../util/api/api";

const UserDashboard = () => {
  const isAdmin = true;

  // const userInformationList = getStudentList()
  const userInformationList = getAdminList();
  const userInformation = userInformationList[0];
  const { first_name, program } = userInformation;

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
            You are an <strong>STUDENT</strong> user.
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

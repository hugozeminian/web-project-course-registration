import {
  NavBarWrapper,
  Icon,
  NavTitlePage,
  UserName,
} from "./Navigation.styles";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import {
  faBars,
  faGraduationCap,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ title, userName }) => {
  
  title = "This is a title6789";
  userName = "User name!012";
  
  const maxCharTitle = 15;
  const maxCharUserName = 10

  const truncatedCharTitle = title.length > maxCharTitle ? title.slice(0, maxCharTitle) : title
  const truncatedUserName = userName.length > maxCharUserName ? userName.slice(0, maxCharUserName) : userName

  return (
    <>
      <NavBarWrapper
        expand="lg"
        className="bg-body-tertiary nav-bar"
        sticky="top">
        <Container fluid className="d-flex flex-nowrap">
          <div className="d-flex align-items-center">
            <Navbar.Brand href="#" className="me-4">
              <Icon icon={faBars} className="menu-icon fa-lg" />
            </Navbar.Brand>
            <Navbar.Collapse>
              <Navbar.Brand href="/" className="me-4">
                <Icon icon={faGraduationCap} className="menu-icon fa-lg" />
              </Navbar.Brand>
            </Navbar.Collapse>
            <Navbar.Text>
              <NavTitlePage>{truncatedCharTitle}</NavTitlePage>
            </Navbar.Text>
          </div>
          <div className="d-flex">
            <Navbar.Brand href="#" className="me-0">
              <div className="d-flex flex-column">
                <Icon icon={faUser} className="menu-icon fa-lg" />
                <UserName>{truncatedUserName}</UserName>
              </div>
            </Navbar.Brand>
          </div>
        </Container>
      </NavBarWrapper>
    </>
  );
};

export default Navigation;

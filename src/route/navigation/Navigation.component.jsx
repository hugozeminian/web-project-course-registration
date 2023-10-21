import React from "react";
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
  title = "Title page";
  userName = "User name";

  return (
    <>
      <NavBarWrapper
        expand="lg"
        className="bg-body-tertiary nav-bar"
        sticky="top">
        <Container fluid className="d-flex align-items-center">
          <Navbar.Brand href="#" className="me-4">
            <Icon icon={faBars} className="menu-icon" />
          </Navbar.Brand>
          <Navbar.Brand className="me-4">
            <Icon icon={faGraduationCap} className="menu-icon" />
          </Navbar.Brand>
          <Navbar.Brand>
            <NavTitlePage>{title}</NavTitlePage>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Brand href="#">
              <div className="d-flex flex-column">
                <Icon icon={faUser} className="menu-icon" />
                <UserName>{userName}</UserName>
              </div>
            </Navbar.Brand>
          </Navbar.Collapse>
        </Container>
      </NavBarWrapper>
    </>
  );
};

export default Navigation;

import React, { useState, useEffect } from "react";
import NavigationLeftMenu from "../../components/navigation-left-menu/NavigationLeftMenu.component";
import NavigationRightMenu from "../../components/navigation-right-menu/NavigationRightMenu.component";
import { getAuthenticatedUser } from "../../util/api/api";
import { useNavigate } from "react-router-dom";

import {
  NavBarWrapper,
  Icon,
  NavTitlePage,
  UserName,
  AccessLevel,
} from "./Navigation.styles";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import {
  faBars,
  faGraduationCap,
  faUser,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ navPageTitle }) => {
  const navigate = useNavigate();
  const [menuLeftOpen, setMenuLeftOpen] = useState(false);
  const [menuRightOpen, setMenuRightOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState();
  const [userNameNav, setUserNameNav] = useState();
  const [userAccessLevel, setUserAccessLevel] = useState();
  const maxCharUserName = 10;

  const authenticatedUser = getAuthenticatedUser() || {};
  const isAuthenticated = authenticatedUser.isAuthenticated;

  const toggleMenuLeft = () => {
    setMenuLeftOpen(!menuLeftOpen);
    setMenuRightOpen(false);
  };

  const toggleMenuRight = () => {
    if (isAuthenticated) {
      setMenuRightOpen(!menuRightOpen);
      setMenuLeftOpen(false);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    setPageTitle(navPageTitle);
  }, [navPageTitle]);

  useEffect(() => {
    const userData = getAuthenticatedUser();

    if (userData) {
      setUserNameNav(userData.first_name || "");
      setUserAccessLevel(userData.isAdmin ? "Admin" : "");

      if (userNameNav && userNameNav.length > maxCharUserName) {
        setUserNameNav(userNameNav.slice(0, maxCharUserName));
      }
    }
  }, [menuRightOpen, menuLeftOpen]);

  return (
    <>
      <NavBarWrapper
        expand="lg"
        className="bg-body-tertiary nav-bar"
        sticky="top">
        <Container fluid className="d-flex flex-nowrap">
          <div className="d-flex align-items-center">
            <Navbar.Brand
              className="me-4"
              onClick={toggleMenuLeft}
              style={{ cursor: "pointer" }}>
              <Icon icon={faBars} className="menu-icon fa-lg ms-4"></Icon>
            </Navbar.Brand>
            <Navbar.Collapse>
              <Navbar.Brand className="me-4">
                <Icon icon={faGraduationCap} className="menu-icon fa-lg" />
              </Navbar.Brand>
            </Navbar.Collapse>
            <Navbar.Text>
              <NavTitlePage>{pageTitle}</NavTitlePage>
            </Navbar.Text>
          </div>

          <div className="d-flex">
            <Navbar.Brand
              className="me-0"
              onClick={toggleMenuRight}
              style={{ cursor: "pointer" }}>
              <div className="d-flex flex-column me-4">
                {isAuthenticated ? (
                  <Icon icon={faUser} className="menu-icon fa-lg" />
                ) : (
                  <Icon
                    icon={faArrowRightToBracket}
                    className="menu-icon fa-lg"
                  />
                )}
                <UserName>{userNameNav}</UserName>
                <AccessLevel>{userAccessLevel}</AccessLevel>
              </div>
              
            </Navbar.Brand>
          </div>
        </Container>
      </NavBarWrapper>
      <NavigationLeftMenu open={menuLeftOpen} toggleMenu={toggleMenuLeft} />
      <NavigationRightMenu open={menuRightOpen} toggleMenu={toggleMenuRight} />
    </>
  );
};

export default Navigation;

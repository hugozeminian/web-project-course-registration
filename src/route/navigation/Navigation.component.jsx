import React, { useState, useEffect} from "react";
import NavigationLeftMenu from "../../components/navigation-left-menu/NavigationLeftMenu.component";
import NavigationRightMenu from "../../components/navigation-right-menu/NavigationRightMenu.component";

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

const Navigation = ({ userName }) => {

  const [menuLeftOpen, setMenuLeftOpen] = useState(false);
  const [menuRightOpen, setMenuRightOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState('HOME');
  const [userNameNav, setUserNameNav] = useState(userName);
  const maxCharTitle = 16;
  const maxCharUserName = 10;

  const toggleMenuLeft = () => {
    setMenuLeftOpen(!menuLeftOpen);
    setMenuRightOpen(false);
  };

  const toggleMenuRight = () => {
    setMenuRightOpen(!menuRightOpen);
    setMenuLeftOpen(false);
  };

  const handlePageChange = (newTitle) => {
    setPageTitle(newTitle);
  };
  

  useEffect(() => {
    if (pageTitle.length > maxCharTitle) {
      setPageTitle(pageTitle.slice(0, maxCharTitle));
    }
  }, [pageTitle]);

  useEffect(() => {
    if (userNameNav.length > maxCharUserName) {
      setUserNameNav(userNameNav.slice(0, maxCharUserName));
    }
  }, []);


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
              <Icon icon={faBars} className="menu-icon fa-lg"></Icon>
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
              <div className="d-flex flex-column">
                <Icon icon={faUser} className="menu-icon fa-lg" />
                <UserName>{userNameNav}</UserName>
              </div>
            </Navbar.Brand>
          </div>
        </Container>
      </NavBarWrapper>
      <NavigationLeftMenu
        open={menuLeftOpen}
        toggleMenu={toggleMenuLeft}
        setTitle={handlePageChange}
      />
      <NavigationRightMenu
        open={menuRightOpen}
        toggleMenu={toggleMenuRight}
        setTitle={handlePageChange}
      />
    </>
  );
};

export default Navigation;

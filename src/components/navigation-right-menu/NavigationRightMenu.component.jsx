import React from "react";
import {CurtainMenuContainerBackground, CurtainMenuContainer, MenuItems, MenuItem, MenuLink, Icon} from "./NavigationRightMenu.styles"
import { faAddressCard, faFileLines, faPen, faCircleQuestion, faTable, faRectangleList} from "@fortawesome/free-solid-svg-icons";

const NavigationRightMenu = ({ open, toggleMenu, setTitle }) => {

  const changePageName = (newPageTitle) => {
    setTitle(newPageTitle);
    toggleMenu()
  };

  //accessLevel -> TODO user or admin 
  const isAdmin = true

  return (
    <>
      <CurtainMenuContainerBackground open={open} onClick={toggleMenu}>
        <CurtainMenuContainer open={open}>
          {isAdmin ? (
            <MenuItems>
            <MenuItem> <MenuLink to='/adm-profile' onClick={() => changePageName("ADM-PROFILE")}> <Icon icon={faAddressCard} className="fa-lg"/> PROFILE </MenuLink></MenuItem>
            <MenuItem> <MenuLink to='/adm-add-courses' onClick={() => changePageName("ADM-COURSES")}> <Icon icon={faFileLines} className="fa-lg"/> COURSES </MenuLink> </MenuItem>
            <MenuItem> <MenuLink to='/adm-new-course-form' onClick={() => changePageName("ADM-ADD COURSES")}> <Icon icon={faPen} className="fa-lg"/> ADD COURSES </MenuLink> </MenuItem>
            <MenuItem> <MenuLink to='/adm-student-list' onClick={() => changePageName("ADM-STUDENT LIST")}> <Icon icon={faRectangleList} className="fa-lg"/> STUDENT LIST </MenuLink> </MenuItem>
            <MenuItem> <MenuLink to='/adm-forms' onClick={() => changePageName("ADM-FORMS")}> <Icon icon={faTable} className="fa-lg"/> FORMS </MenuLink> </MenuItem>
          </MenuItems>
          ) : (
          <MenuItems>
            <MenuItem> <MenuLink to='/profile' onClick={() => changePageName("PROFILE")}> <Icon icon={faAddressCard} className="fa-lg"/> PROFILE </MenuLink></MenuItem>
            <MenuItem> <MenuLink to='/add-courses' onClick={() => changePageName("ADD COURSES")}> <Icon icon={faPen} className="fa-lg"/> ADD COURSES </MenuLink> </MenuItem>
            <MenuItem> <MenuLink to='/my-courses' onClick={() => changePageName("MY COURSES")}> <Icon icon={faFileLines} className="fa-lg"/> MY COURSES </MenuLink> </MenuItem>
            <MenuItem> <MenuLink to='/contact' onClick={() => changePageName("CONTACT")}> <Icon icon={faCircleQuestion} className="fa-lg"/> CONTACT </MenuLink> </MenuItem>
          </MenuItems>
          )}
        </CurtainMenuContainer>
      </CurtainMenuContainerBackground>
    </>
  );
};

export default NavigationRightMenu;
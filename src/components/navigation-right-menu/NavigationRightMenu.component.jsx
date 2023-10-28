import React from "react";
import {CurtainMenuContainerBackground, CurtainMenuContainer, MenuItems, MenuItem, MenuLink, Icon} from "./NavigationRightMenu.styles"
import { faAddressCard, faFileLines, faPen, faCircleQuestion, faTable, faRectangleList, faLaptop} from "@fortawesome/free-solid-svg-icons";
import { getAuthenticatedUser } from "../../util/api/api";

const NavigationRightMenu = ({ open, toggleMenu }) => {

  const authenticatedUser = getAuthenticatedUser() || {}
  const isAdmin = authenticatedUser.isAdmin

  return (
    <>
      <CurtainMenuContainerBackground open={open} onClick={toggleMenu}>
        <CurtainMenuContainer open={open}>
          {isAdmin ? (
            <MenuItems>
            <MenuItem> <MenuLink to='/user-dashboard'> <Icon icon={faLaptop} className="fa-lg"/> DASHBOARD </MenuLink></MenuItem>
            <MenuItem> <MenuLink to='/adm-profile'> <Icon icon={faAddressCard} className="fa-lg"/> PROFILE </MenuLink></MenuItem>
            <MenuItem> <MenuLink to='/adm-add-courses'> <Icon icon={faFileLines} className="fa-lg"/> COURSES </MenuLink> </MenuItem>
            <MenuItem> <MenuLink to='/adm-new-course-form'> <Icon icon={faPen} className="fa-lg"/> ADD COURSES </MenuLink> </MenuItem>
            <MenuItem> <MenuLink to='/adm-student-list'> <Icon icon={faRectangleList} className="fa-lg"/> STUDENT LIST </MenuLink> </MenuItem>
            <MenuItem> <MenuLink to='/adm-forms'> <Icon icon={faTable} className="fa-lg"/> FORMS </MenuLink> </MenuItem>
          </MenuItems>
          ) : (
          <MenuItems>
            <MenuItem> <MenuLink to='/user-dashboard'> <Icon icon={faLaptop} className="fa-lg"/> DASHBOARD </MenuLink></MenuItem>
            <MenuItem> <MenuLink to='/profile'> <Icon icon={faAddressCard} className="fa-lg"/> PROFILE </MenuLink></MenuItem>
            <MenuItem> <MenuLink to='/add-courses'> <Icon icon={faPen} className="fa-lg"/> ADD COURSES </MenuLink> </MenuItem>
            <MenuItem> <MenuLink to='/my-courses'> <Icon icon={faFileLines} className="fa-lg"/> MY COURSES </MenuLink> </MenuItem>
            <MenuItem> <MenuLink to='/contact'> <Icon icon={faCircleQuestion} className="fa-lg"/> CONTACT </MenuLink> </MenuItem>
          </MenuItems>
          )}
        </CurtainMenuContainer>
      </CurtainMenuContainerBackground>
    </>
  );
};

export default NavigationRightMenu;
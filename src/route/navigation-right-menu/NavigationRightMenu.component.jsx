import React from "react";
import {CurtainMenuContainerBackground, CurtainMenuContainer, MenuItems, MenuItem, MenuLink, Icon} from "./NavigationRightMenu.styles"
import { faAddressCard, faFileLines, faPen, faCircleQuestion} from "@fortawesome/free-solid-svg-icons";

const NavigationRightMenu = ({ open, toggleMenu, setTitle }) => {

  const changePage = (newPageTitle) => {
    setTitle(newPageTitle);
    toggleMenu()
  };

  return (
    <>
      <CurtainMenuContainerBackground open={open} onClick={toggleMenu}>
        <CurtainMenuContainer open={open}>
          <MenuItems>
            <MenuItem> <MenuLink to='/profile' onClick={() => changePage("PROFILE")}> <Icon icon={faAddressCard} className="fa-lg"/> PROFILE </MenuLink></MenuItem>
            <MenuItem> <MenuLink to='/add-courses' onClick={() => changePage("ADD COURSES")}> <Icon icon={faPen} className="fa-lg"/> ADD COURSES </MenuLink> </MenuItem>
            <MenuItem> <MenuLink to='/my-courses' onClick={() => changePage("MY COURSES")}> <Icon icon={faFileLines} className="fa-lg"/> MY COURSES </MenuLink> </MenuItem>
            <MenuItem> <MenuLink to='/contact' onClick={() => changePage("CONTACT")}> <Icon icon={faCircleQuestion} className="fa-lg"/> CONTACT </MenuLink> </MenuItem>
          </MenuItems>
        </CurtainMenuContainer>
      </CurtainMenuContainerBackground>
    </>
  );
};

export default NavigationRightMenu;
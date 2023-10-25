import React from "react";
import {CurtainMenuContainerBackground, CurtainMenuContainer, MenuItems, MenuItem, MenuLink, Icon} from "./NavigationLeftMenu.styles"
import { faFileLines, faArrowRightToBracket, faCubes, faPen, faInfo} from "@fortawesome/free-solid-svg-icons";

const NavigationLeftMenu = ({ open, toggleMenu, setTitle }) => {

  const changePageName = (newPageTitle) => {
    setTitle(newPageTitle);
    toggleMenu()
  };

  return (
    <>
      <CurtainMenuContainerBackground open={open} onClick={toggleMenu}>
        <CurtainMenuContainer open={open}>
          <MenuItems>
            <MenuItem> <MenuLink to='/' onClick={() => changePageName("HOME")}> <Icon icon={faFileLines} className="fa-lg" /> HOME </MenuLink></MenuItem>
            <MenuItem> <MenuLink to='/login' onClick={() => changePageName("LOGIN")}> <Icon icon={faArrowRightToBracket} className="fa-lg" /> LOGIN </MenuLink> </MenuItem>
            <MenuItem> <MenuLink to='/programs' onClick={() => changePageName("PROGRAMS")}> <Icon icon={faCubes} className="fa-lg" /> PROGRAMS </MenuLink> </MenuItem>
            <MenuItem> <MenuLink to='/courses' onClick={() => changePageName("COURSES")}> <Icon icon={faPen} className="fa-lg" /> COURSES </MenuLink> </MenuItem>
            <MenuItem> <MenuLink to='/about' onClick={() => changePageName("ABOUT")}> <Icon icon={faInfo} className="fa-lg" /> ABOUT </MenuLink> </MenuItem>
          </MenuItems>
        </CurtainMenuContainer>
      </CurtainMenuContainerBackground>
    </>
  );
};

export default NavigationLeftMenu;
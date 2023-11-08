import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const CurtainMenuContainerBackground = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 90px;
  left: ${({ open }) => (open ? "0" : "-100%")};
  background-color: var(--color_main4);
  transition: left 0.3s;
  z-index: 2;
`;

export const CurtainMenuContainer = styled.div`
  width: 300px;
  height: 100%;
  position: fixed;
  top: 90px;
  left: ${({ open }) => (open ? "0" : "-300px")};
  background-color: var(--color_main1);
  transition: left 0.3s;
  z-index: 2;
`;

export const MenuItems = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: var(--color_main3);
`;

export const MenuItem = styled.li`
  padding: 0px;
  color: var(--color_font5);
  border-bottom: solid var(--color_font6);
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: var(--color_font5);
    color: var(--color_main3);
  }
`;

export const MenuLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  padding: 15px;
  width: 100%;
  height: 100%;
`;

export const Icon = styled(FontAwesomeIcon)`
  color: inherit;
  margin: 0 10px;
  width: 30px;
`;

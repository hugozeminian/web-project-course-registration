import styled from "styled-components";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const NavBarWrapper = styled(Navbar)`
  background-color: var(--color_main2) !important;
  height: 90px;
`;

export const Icon = styled(FontAwesomeIcon)`
  color: var(--color_font4);
  margin: 0;
`;

export const NavTitlePage = styled.h3`
  color: var(--color_main1) !important;
  margin: 0;
`;

export const UserName = styled.p`
  color: var(--color_main1) !important;
  margin: 0;
  font-size: large;
  text-align: center;
`;

export const AccessLevel = styled.p`
  color: var(--color_main1) !important;
  margin: 0;
  font-size: small;
  text-align: center;
`;
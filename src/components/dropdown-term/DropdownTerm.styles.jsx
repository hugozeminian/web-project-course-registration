import styled from "styled-components";
import Dropdown from "react-bootstrap/Dropdown";

export const CustomDropdownToggle = styled(Dropdown.Toggle)`
  background-color: var(--color_font2);
  border: var(--color_font2);
  color: var(--color_font4);
  width: 150px;

  &:hover,
  &.show {
    background-color: var(--color_font3);
    border: var(--color_font3);
    color: var(--color_font4);
  }

  @media (max-width: 576px) {
    width: 70vw;
  }
`;

export const CustomDropdownItem = styled(Dropdown.Item)`
  &:active {
    background-color: var(--color_font3);
  }
`;

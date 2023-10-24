import styled from "styled-components";
import Dropdown from "react-bootstrap/Dropdown";

export const CustomDropdownToggle = styled(Dropdown.Toggle)`
  background-color: var(--color_font4);
  border: var(--color_font2);
  color: var(--color_font2);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  width: 150px;
  font-weight: bold;

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

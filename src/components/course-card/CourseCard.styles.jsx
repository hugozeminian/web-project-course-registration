import styled from "styled-components";
import { Card, Button } from "react-bootstrap";

export const CardWrapper = styled(Card)`
  background-color: var(--color_main3) !important;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  width: 75%;
  margin: 0 auto;
  padding: 10px 20px;
  margin-bottom: 40px;

  &:last-child {
    margin-bottom: 0px;
  }
`;

export const CustomButton = styled(Button)`
  background-color: var(--color_main2);
  margin-right: 10px;
`;

export const CustomTd = styled.td`
  background-color: var(--color_main3) !important;
  border: "none";
`;

import styled from "styled-components";
import { Form, Button } from "react-bootstrap";

export const FormWrapper = styled(Form)`
  background-color: var(--color_main3) !important;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  width: 75%;
  border-radius: 10px;
  padding: 20px;
`;

export const CustomButton = styled(Button)`
  background-color: var(--color_main2)

`
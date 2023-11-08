import styled from "styled-components";
import { Form, Button } from "react-bootstrap";

export const FormWrapper = styled(Form)`
  background-color: var(--color_main3) !important;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  width: 75%;
  border-radius: 10px;
  padding: 20px;
`;

export const CustomRadioGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;
export const CustomGroupFormCheck = styled(Form.Check)`
  margin-bottom: 0.75rem;

  @media (max-width: 1401px) {
    flex: 0 0 calc(33.33% - 1rem);
  }

  @media (max-width: 768px) {
    flex: 0 0 calc(50% - 1rem);
  }
  
  @media (max-width: 415px) {
    flex: 0 0 calc(100% - 1rem);
  }
`;

export const CustomButton = styled(Button)`
  background-color: var(--color_main2);
`;

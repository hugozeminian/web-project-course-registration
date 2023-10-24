import styled from "styled-components";
import { MDBCol } from "mdbreact";

export const CustomMDBCol = styled(MDBCol)`
  @media (max-width: 576px) {
    width: 70vw;
    padding-top: 20px;
  }
`;

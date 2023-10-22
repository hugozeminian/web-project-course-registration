import styled from "styled-components";

export const FooterContainer = styled.div`
  height: 100px;
  background-color: var(--color_main2);
  text-align: center;

  @media (max-width: 576px) {
    display: flex;
    flex-direction: column;
  }
`;

export const FooterInfo = styled.p`
  color: var(--color_font4);
  margin: 0;
`;

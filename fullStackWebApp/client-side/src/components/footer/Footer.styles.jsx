import styled from "styled-components";

export const FooterContainer = styled.div`
  height: 60px;
  background-color: var(--color_main2);
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  position: fixed;
  bottom: 0;

  @media (max-width: 576px) {
    display: flex;
    flex-direction: column;
    height: 80px;
  }
`;

export const FooterInfo = styled.p`
  color: var(--color_font4);
  margin: 0;
`;

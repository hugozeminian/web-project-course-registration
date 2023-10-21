import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  height: 100px;
  background-color: var(--color_main2);
  text-align: center;
`;

const FooterInfo = styled.p`
  color: var(--color_font4);
  margin: 0;
`;

const Footer = () => {
  return (
    <>
      <FooterContainer className="d-flex justify-content-around align-items-center">
        <div>
          <FooterInfo>
            <strong>&reg; Bow Courses Institute</strong>
          </FooterInfo>
          <FooterInfo><em>All rights reserved.</em></FooterInfo>
        </div>
        <div>
          <FooterInfo><strong>345 6 Ave SE, Calgary, AB T2G 4V1</strong></FooterInfo>
        </div>
      </FooterContainer>
    </>
  );
};

export default Footer;

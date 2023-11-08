import React from "react";
import {FooterContainer, FooterInfo} from "./Footer.styles"

const Footer = () => {
  return (
    <>
      <FooterContainer className="footer-container">
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

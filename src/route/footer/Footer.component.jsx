import React from "react";
import {FooterContainer, FooterInfo} from "./Footer.styled"

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

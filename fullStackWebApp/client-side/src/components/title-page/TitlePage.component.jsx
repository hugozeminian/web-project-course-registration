import React from "react";

const TitlePage = ({ title }) => {
  return (
    <>
      <h2 style={{color: "var(--color_font2)", marginBottom: "20px"}}><strong>{title}</strong></h2>
    </>
  );
};

export default TitlePage;

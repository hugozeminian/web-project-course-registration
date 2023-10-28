import React, { useEffect, useState } from "react";
import TitlePage from "../../components/title-page/TitlePage.component";
import ProgramsCardList from "../../components/programs-card-list/ProgramsCardList.components";

const Programs = () => {

    const programsData = JSON.parse(localStorage.getItem("programsData") || "[]");

    return (
        <>
            <TitlePage title="Software Development Programs" />
            <ProgramsCardList programsData={programsData} />
        </>
    );
};

export default Programs;

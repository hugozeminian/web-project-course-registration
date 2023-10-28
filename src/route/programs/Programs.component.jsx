import React from "react";
import ProgramsCardList from "../../components/programs-card-list/ProgramsCardList.components";
import { getProgramsList } from "../../util/api/api";

const Programs = () => {
  const programsData = getProgramsList();
  return (
    <>
      <ProgramsCardList programsData={programsData} />
    </>
  );
};

export default Programs;

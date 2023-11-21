import React, { useState, useEffect } from "react";
import ProgramsCardList from "../../components/programs-card-list/ProgramsCardList.components";
import { getProgramsList } from "../../util/api/api";

const Programs = () => {
  const [programsData, setProgramsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProgramsList();
        setProgramsData(data);
      } catch (error) {
        console.error("Error fetching data on the component:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {programsData ? (
        <ProgramsCardList programsData={programsData} />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Programs;

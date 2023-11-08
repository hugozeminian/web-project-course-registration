import React from "react";
import ProgramCard from "../program-card/ProgramCard.component";

const ProgramsCardList = ({ programsData }) => {
    return (
        <div>
            {programsData.map((program, index) => (
                <ProgramCard key={index} programData={program} />
            ))}
        </div>
    );
};

export default ProgramsCardList;

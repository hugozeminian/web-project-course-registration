import React from "react";
import ProgramCard from "../program-card/ProgramCard.component";
import {getProgramsList} from "../../util/api/api";
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

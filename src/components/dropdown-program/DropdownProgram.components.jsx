import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { CustomDropdownToggle, CustomDropdownItem } from "./DropdownProgram.styles";

const DropdownProgram = ({ onProgramSelect }) => {
  const [selectedProgram, setSelectedProgram] = useState("Select Program");

  const handleSelect = (eventKey) => {
    setSelectedProgram(eventKey);

    if(eventKey == "Diploma (2 years)"){
      setSelectedProgram("Diploma");
    } else {
      setSelectedProgram(eventKey);
    }


    onProgramSelect(eventKey);
  };

  return (
    <>
      <Dropdown onSelect={handleSelect}>
        <CustomDropdownToggle variant="none">{selectedProgram}</CustomDropdownToggle>
        <Dropdown.Menu>
          <CustomDropdownItem eventKey="All">All</CustomDropdownItem>
          <CustomDropdownItem eventKey="Diploma (2 years)">Diploma (2 years)</CustomDropdownItem>
          <CustomDropdownItem eventKey="Post Diploma">Post Diploma (1 year)</CustomDropdownItem>
          <CustomDropdownItem eventKey="Certificate">Certificate (3 months and 6 months)</CustomDropdownItem>
          <CustomDropdownItem eventKey="Select Program">Cancel</CustomDropdownItem>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default DropdownProgram;

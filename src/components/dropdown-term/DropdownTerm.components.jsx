import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { CustomDropdownToggle, CustomDropdownItem } from "./DropdownTerm.styles";

function DropdownTerm({ onTermSelect }) {
  const [selectedTerm, setSelectedTerm] = useState("Select season");

  const handleSelect = (eventKey) => {
    setSelectedTerm(eventKey);
    onTermSelect(eventKey);
  };

  return (
    <>
      <Dropdown onSelect={handleSelect}>
        <CustomDropdownToggle variant="none">{selectedTerm}</CustomDropdownToggle>
        <Dropdown.Menu>
          <CustomDropdownItem eventKey="Spring">Spring</CustomDropdownItem>
          <CustomDropdownItem eventKey="Summer">Summer</CustomDropdownItem>
          <CustomDropdownItem eventKey="Fall">Fall</CustomDropdownItem>
          <CustomDropdownItem eventKey="Winter">Winter</CustomDropdownItem>
          <CustomDropdownItem eventKey="Select season">Cancel</CustomDropdownItem>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default DropdownTerm;

import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { CustomDropdownToggle, CustomDropdownItem} from "./DropdownTerm.styles";

function DropdownTerm({ onTermSelect }) {
  const [selectedTerm, setSelectedTerm] = useState("Select term");

  const handleSelect = (eventKey) => {
    setSelectedTerm(eventKey == 0 ? "Select term" : "Term: " + eventKey);
    onTermSelect(eventKey);
  };

  return (
    <>
      <Dropdown onSelect={handleSelect}>
        <CustomDropdownToggle variant="none" >{selectedTerm}</CustomDropdownToggle>
        <Dropdown.Menu>
          <Dropdown.ItemText>Select term</Dropdown.ItemText>
          <CustomDropdownItem eventKey="1">Term 1</CustomDropdownItem>
          <CustomDropdownItem eventKey="2">Term 2</CustomDropdownItem>
          <CustomDropdownItem eventKey="3">Term 3</CustomDropdownItem>
          <CustomDropdownItem eventKey="4">Term 4</CustomDropdownItem>
          <CustomDropdownItem eventKey="0">Cancel</CustomDropdownItem>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default DropdownTerm;

import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
// import {CustomDropdownButton} from "./DropdownTerm.styles"

function DropdownTerm({ onTermSelect }) {
  const [selectedTerm, setSelectedTerm] = useState("Select term");

  const handleSelect = (eventKey) => {
    setSelectedTerm(eventKey == 0 ? "Select term" : "Term: " + eventKey);
    onTermSelect(eventKey); 
  };

  return (
    <DropdownButton
      title={selectedTerm}
      id="dropdown-menu-align-end"
      onSelect={handleSelect}
      className="mt-2"
      data-bs-theme="dark"
      >
      <Dropdown.ItemText>Select term</Dropdown.ItemText>
      <Dropdown.Item eventKey="1">Term 1</Dropdown.Item>
      <Dropdown.Item eventKey="2">Term 2</Dropdown.Item>
      <Dropdown.Item eventKey="3">Term 3</Dropdown.Item>
      <Dropdown.Item eventKey="4">Term 4</Dropdown.Item>
      <Dropdown.Item eventKey="0">Cancel</Dropdown.Item>
    </DropdownButton>
  );
}

export default DropdownTerm;

import React, { useState } from "react";
import CourseCardList from "../../components/courses-card-list/CoursesCardList.components";
import DropdownTerm from "../../components/dropdown-term/DropdownTerm.components";
import SearchBar from "../../components/search-bar/SearchBar.component";
import { FiltersContainer } from "./AddCourses.styles";
import { getCoursesList } from "../../util/api/api";

const AddCourses = () => {
  const coursesData = getCoursesList();

  const [selectedTerm, setSelectedTerm] = useState(0);
  const [filteredCourseData, setFilteredCourseData] = useState(coursesData);
  const [searchText, setSearchText] = useState("");

  const handleTermSelect = (selectedTerm) => {
    setSelectedTerm(selectedTerm);
    if (selectedTerm == 0) {
      setFilteredCourseData(coursesData);
    } else {
      const filteredData = coursesData.filter(
        (course) => course.term === parseInt(selectedTerm)
      );
      setFilteredCourseData(filteredData);
    }
    setSearchText("");
  };

  const handleSearch = (searchText) => {
    const filteredData = coursesData.filter((course) => {
      const termMatch =
        selectedTerm == 0 || course.term === parseInt(selectedTerm);
      const searchMatch =
        course.title.toLowerCase().includes(searchText.toLowerCase()) ||
        course.course_number.toLowerCase().includes(searchText.toLowerCase());
      return termMatch && searchMatch;
    });
    setFilteredCourseData(filteredData);
    setSearchText(searchText);
  };

  return (
    <>
      <FiltersContainer>
        <DropdownTerm onTermSelect={handleTermSelect} />
        <SearchBar onSearch={handleSearch} searchText={searchText} />
      </FiltersContainer>
      <CourseCardList
        coursesData={filteredCourseData}
        addCourseButtonHidden={false}
        removeCourseButtonHidden={true}
        deleteCourseButtonHidden={true}
      />
    </>
  );
};

export default AddCourses;

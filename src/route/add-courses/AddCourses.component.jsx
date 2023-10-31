import React, { useEffect, useState } from "react";
import CourseCardList from "../../components/courses-card-list/CoursesCardList.components";
import DropdownTerm from "../../components/dropdown-term/DropdownTerm.components";
import SearchBar from "../../components/search-bar/SearchBar.component";
import { FiltersContainer } from "./AddCourses.styles";
import { getCoursesList, getStudentInformation } from "../../util/api/api";
import { getCourseRegistrationList } from "../../util/api/api";
import { Row, Col } from "react-bootstrap";
import DropdownProgram from "../../components/dropdown-program/DropdownProgram.components";

const AddCourses = () => {
  const coursesData = getCoursesList();

  const [selectedProgram, setSelectedProgram] = useState("Select Program");
  const [selectedTerm, setSelectedTerm] = useState("Select Term");
  const [filteredCourseByProgram, setFilteredCourseByProgram] = useState([]);
  const [filteredCourseData, setFilteredCourseData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [reachedMaximumCourses, setReachedMaximumCourses] = useState();

  const handleProgramSelect = (selectedProgram) => {
    setSelectedProgram(selectedProgram);
    if (selectedProgram === "Select Program") {
      setFilteredCourseByProgram([]);
    } else if (selectedProgram === "All") {
      setFilteredCourseByProgram(coursesData);
    } else {
      const filteredCourses = coursesData.filter((course) =>
        course.program.includes(String(selectedProgram))
      );
      setFilteredCourseByProgram(filteredCourses);
    }
    setSearchText("");
  };

  const handleTermSelect = (selectedTerm) => {
    setSelectedTerm(selectedTerm);
    if (selectedTerm === "Select Term" || undefined) {
      setFilteredCourseData(filteredCourseByProgram);
    } else if (selectedTerm === "All") {
      setFilteredCourseData(filteredCourseByProgram);
    } else {
      const filteredData = filteredCourseByProgram.filter(
        (course) => course.season === selectedTerm
        );
      setFilteredCourseData(filteredData);
    }
    setSearchText("");
  };

  const handleSearch = (searchText) => {
    const filteredData = coursesData.filter((course) => {
      const termMatch =
        selectedTerm === "Select Term" || course.season === selectedTerm;
      const searchMatch =
        course.title.toLowerCase().includes(searchText.toLowerCase()) ||
        course.course_number.toLowerCase().includes(searchText.toLowerCase());
      return termMatch && searchMatch;
    });
    setFilteredCourseData(filteredData);
    setSearchText(searchText);
  };

  const courseRegistration = getCourseRegistrationList();
  const studentInformation = getStudentInformation();
  const { program, course_max, course_min } = studentInformation || {};

  useEffect(() => {
    if (courseRegistration && courseRegistration.length >= course_max) {
      setReachedMaximumCourses(true);
    } else {
      setReachedMaximumCourses(false);
    }
  }, []);

  // useEffect(() => {
  //   setSelectedTerm("All")
  //   handleTermSelect(selectedTerm)
  // }, [selectedProgram]);

  return (
    <>
      <Row style={{ width: "75%" }}>
        <Col className="mb-0" xl={12}>
          Based in your Program of <strong>{program}</strong>:
        </Col>
        <Col className="mb-0" xl={12}>
          The number of courses you can register is: minimum of{" "}
          <strong>{course_min}</strong> and maximum of{" "}
          <strong>{course_max}</strong>.
        </Col>
        <Col className="mb-4">
          You have added <strong>{courseRegistration.length}</strong>.
        </Col>
      </Row>

      <FiltersContainer>
        <DropdownProgram onProgramSelect={handleProgramSelect} />
        <DropdownTerm onTermSelect={handleTermSelect} />
        <SearchBar onSearch={handleSearch} searchText={searchText} />
      </FiltersContainer>

      <CourseCardList
        coursesData={filteredCourseData}
        disableaddCourseButton={reachedMaximumCourses}
        addCourseButtonHidden={false}
        removeCourseButtonHidden={true}
        deleteCourseButtonHidden={true}
      />
    </>
  );
};

export default AddCourses;

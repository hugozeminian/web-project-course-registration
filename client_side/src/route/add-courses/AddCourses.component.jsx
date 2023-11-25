import React, { useEffect, useState } from "react";
import CourseCardList from "../../components/courses-card-list/CoursesCardList.components";
import DropdownTerm from "../../components/dropdown-term/DropdownTerm.components";
import SearchBar from "../../components/search-bar/SearchBar.component";
import { FiltersContainer } from "./AddCourses.styles";
import { getCoursesList, getStudentAddedCourses, getProfileInformation } from "../../util/api/api";
import { getAuthenticatedUser } from "../../util/api/api";
import { Row, Col } from "react-bootstrap";
import DropdownProgram from "../../components/dropdown-program/DropdownProgram.components";

const AddCourses = () => {
  const [selectedProgram, setSelectedProgram] = useState("Select Program");
  const [selectedTerm, setSelectedTerm] = useState("Select Term");
  const [filteredCourseByProgram, setFilteredCourseByProgram] = useState([]);
  const [filteredCourseData, setFilteredCourseData] = useState([]);
  const [filteredSearchBarCourseData, setFilteredSearchBarCourseData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [reachedMaximumCourses, setReachedMaximumCourses] = useState();
  const [coursesData, setcoursesData] = useState(null);

  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [studentProfileInformation, setStudentProfileInformation] = useState(null);

  const [programName, setProgramName] = useState(null);
  const [courseMax, setCourseMax] = useState(null);
  const [courseMin, setCourseMin] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataCoursesList = await getCoursesList();
        setcoursesData(dataCoursesList);

        if (!authenticatedUser) {
          const dataAuthenticatedUser = await getAuthenticatedUser();
          setAuthenticatedUser(dataAuthenticatedUser);
          
          const dataStudentProfile = await getProfileInformation(dataAuthenticatedUser);
          setStudentProfileInformation(dataStudentProfile)
        }
      } catch (error) {
        console.error("Error fetching data on the component:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (studentProfileInformation && studentProfileInformation.length > 0) {
      setProgramName(studentProfileInformation[0].ProgramName);
      setCourseMax(studentProfileInformation[0].CourseMax);
      setCourseMin(studentProfileInformation[0].CourseMin);

      if (studentProfileInformation[0].CoursesRegistered >= courseMax) {
        setReachedMaximumCourses(true);
      } else {
        setReachedMaximumCourses(false);
      }
    }
  }, [studentProfileInformation, courseMax]);

  const handleProgramSelect = (selectedProgram) => {
    setSelectedProgram(selectedProgram);
    if (selectedProgram === "Select Program") {
      setFilteredCourseByProgram([]);
      setFilteredCourseData([]);
    } else if (selectedProgram === "All") {
      setFilteredCourseByProgram(coursesData);
    } else {
      const filteredCourses = coursesData.filter((course) => course.ProgramType.includes(String(selectedProgram)));
      setFilteredCourseByProgram(filteredCourses);
    }
    setSelectedTerm("Select Term");
    setFilteredCourseData([]);
    setSearchText("");
  };
  const handleTermSelect = (selectedTerm) => {
    setSelectedTerm(selectedTerm);
    if (selectedTerm === "Select Term" || undefined) {
      setFilteredCourseData([]);
    } else if (selectedTerm === "All") {
      setFilteredCourseData(filteredCourseByProgram);
    } else {
      const filteredData = filteredCourseByProgram.filter((course) => course.Term === selectedTerm);
      setFilteredCourseData(filteredData);
    }
    setSearchText("");
  };

  const handleSearch = (searchText) => {
    const filteredData = filteredCourseData.filter((course) => {
      const searchMatch =
        course.Name.toLowerCase().includes(searchText.toLowerCase()) || course.CourseCode.toLowerCase().includes(searchText.toLowerCase());
      return searchMatch;
    });
    if (searchText === "") {
      setFilteredSearchBarCourseData(filteredCourseData);
    } else {
      setFilteredSearchBarCourseData(filteredData);
    }
    setSearchText(searchText);
  };

  return (
    <>
      <Row style={{ width: "75%" }}>
        <Col className="mb-0" xl={12}>
          Based in your Program of <strong>{programName}</strong>:
        </Col>
        <Col className="mb-0" xl={12}>
          The number of courses you can register is: minimum of <strong>{courseMin}</strong> and maximum of <strong>{courseMax}</strong>.
        </Col>
        <Col className="mb-4">
        You have added <strong>{studentProfileInformation && studentProfileInformation.length > 0 ? studentProfileInformation[0].CoursesRegistered : 0}</strong>.
        </Col>
      </Row>

      <FiltersContainer>
        <DropdownProgram onProgramSelect={handleProgramSelect} />
        <DropdownTerm onTermSelect={handleTermSelect} disabled={selectedProgram === "Select Program"} initialSelectTerm={selectedTerm} />

        <SearchBar onSearch={handleSearch} searchText={searchText} disabled={selectedProgram === "Select Program"} />
      </FiltersContainer>

      <CourseCardList
        coursesData={searchText ? filteredSearchBarCourseData : filteredCourseData}
        disableaddCourseButton={reachedMaximumCourses}
        addCourseButtonHidden={false}
        removeCourseButtonHidden={true}
        deleteCourseButtonHidden={true}
        authenticatedUser={authenticatedUser}
      />
    </>
  );
};

export default AddCourses;

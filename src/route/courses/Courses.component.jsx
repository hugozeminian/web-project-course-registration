import React from "react";
import TitlePage from "../../components/title-page/TitlePage.component";
import CourseCardList from "../../components/courses-card-list/CoursesCardList.components";

const Courses = ({ coursesData, addCourseButtonHidden }) => {
  
  return (
    <>
      <TitlePage title="Software Development Department" />
      <CourseCardList coursesData={coursesData} addCourseButtonHidden={addCourseButtonHidden}/>
    </>
  );
};

export default Courses;

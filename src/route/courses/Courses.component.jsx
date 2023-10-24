import React from "react";
import TitlePage from "../../components/title-page/TitlePage.component";
import CourseCardList from "../../components/courses-card-list/CoursesCardList.components";

const Courses = ({ coursesData }) => {
  
  return (
    <>
      <TitlePage title="Software Development Department" />
      <CourseCardList coursesData={coursesData} addCourseButtonHidden={false}/>
    </>
  );
};

export default Courses;

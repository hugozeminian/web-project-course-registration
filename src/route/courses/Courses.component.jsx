import React from "react";
import TitlePage from "../../components/title-page/TitlePage.component";
import CourseCardList from "../../components/courses-card-list/CoursesCardList.components";
import { getCoursesList } from "../../util/api/api";

const Courses = () => {
  
  const coursesData = getCoursesList()

  return (
    <>
      <TitlePage title="Software Development Department" />
      <CourseCardList coursesData={coursesData} addCourseButtonHidden={true} removeCourseButtonHidden={true} deleteCourseButtonHidden={true}/>
    </>
  );
};

export default Courses;

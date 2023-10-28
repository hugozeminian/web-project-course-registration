import React from "react";
import CourseCardList from "../../components/courses-card-list/CoursesCardList.components";
import { getCoursesList } from "../../util/api/api";

const Courses = () => {
  
  const coursesData = getCoursesList()

  return (
    <>
      <CourseCardList coursesData={coursesData} addCourseButtonHidden={true} removeCourseButtonHidden={true} deleteCourseButtonHidden={true}/>
    </>
  );
};

export default Courses;

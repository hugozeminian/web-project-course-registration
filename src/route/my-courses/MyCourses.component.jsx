import React, { useState } from "react";
import CourseCardList from "../../components/courses-card-list/CoursesCardList.components";
import { getCourseRegistrationList } from "../../util/api/api";

const MyCourses = () => {
  const [myCourseList, setMyCourseList] = useState(getCourseRegistrationList());
  
  return (
    <>
    <CourseCardList coursesData={myCourseList} addCourseButtonHidden={true} removeCourseButtonHidden={false} deleteCourseButtonHidden={true}/>
    </>
  )
};

export default MyCourses;

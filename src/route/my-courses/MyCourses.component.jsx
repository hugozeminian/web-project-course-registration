import React, { useState } from "react";
import TitlePage from "../../components/title-page/TitlePage.component";
import CourseCardList from "../../components/courses-card-list/CoursesCardList.components";
import { getCourseRegistrationList } from "../../util/api/api";

const MyCourses = () => {
  const [myCourseList, setMyCourseList] = useState(getCourseRegistrationList());
  
  return (
    <>
    <TitlePage title="Software Development Department" />
    <CourseCardList coursesData={myCourseList} addCourseButtonHidden={true} removeCourseButtonHidden={false} deleteCourseButtonHidden={true}/>
    </>
  )
};

export default MyCourses;

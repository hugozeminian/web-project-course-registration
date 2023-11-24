import React, { useEffect, useState } from "react";
import CourseCardList from "../../components/courses-card-list/CoursesCardList.components";
import { getStudentAddedCourses, getAuthenticatedUser } from "../../util/api/api";

const MyCourses = () => {
  const [myCourseList, setMyCourseList] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataAuthenticatedUser = await getAuthenticatedUser();
        const data = await getStudentAddedCourses(dataAuthenticatedUser);
        setMyCourseList(data);
      } catch (error) {
        console.error("Error fetching data on the component:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <CourseCardList coursesData={myCourseList} addCourseButtonHidden={true} removeCourseButtonHidden={false} deleteCourseButtonHidden={true}/>
    </>
  )
};

export default MyCourses;

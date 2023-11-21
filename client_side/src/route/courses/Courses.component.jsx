import React, { useEffect, useState } from "react";
import CourseCardList from "../../components/courses-card-list/CoursesCardList.components";
import { getCoursesList } from "../../util/api/api";

const Courses = () => {
  const [coursesData, setCoursesData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCoursesList();
        setCoursesData(data);
      } catch (error) {
        console.error("Error fetching data on the component:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {coursesData ? (
        <CourseCardList coursesData={coursesData} addCourseButtonHidden={true} removeCourseButtonHidden={true} deleteCourseButtonHidden={true} />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Courses;

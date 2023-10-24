import React from "react";
import CourseCard from "../course-card/CourseCard.component";

const CourseCardList = ({ coursesData, addCourseButtonHidden, removeCourseButtonHidden }) => {
  return (
    <>
      <div>
        {coursesData.length === 0 ? (
          <p>No courses available</p>
        ) : (
          coursesData.map((courseData) => (
            <CourseCard
              key={courseData.courseId}
              courseData={courseData}
              addCourseButtonHidden={addCourseButtonHidden}
              removeCourseButtonHidden={removeCourseButtonHidden}
            />
          ))
        )}
      </div>
    </>
  );
};

export default CourseCardList;

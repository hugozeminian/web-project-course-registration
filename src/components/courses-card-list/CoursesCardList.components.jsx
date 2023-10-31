import React from "react";
import CourseCard from "../course-card/CourseCard.component";

const CourseCardList = ({ coursesData, disableaddCourseButton, addCourseButtonHidden, removeCourseButtonHidden, deleteCourseButtonHidden }) => {

  return (
    <>
      <div>
        {coursesData.length === 0 ? (
          <p>No courses available, select term.</p>
        ) : (
          coursesData.map((courseData) => (
            <CourseCard
              key={courseData.courseId}
              courseData={courseData}
              disableaddCourseButton={disableaddCourseButton}
              addCourseButtonHidden={addCourseButtonHidden}
              removeCourseButtonHidden={removeCourseButtonHidden}
              deleteCourseButtonHidden={deleteCourseButtonHidden}
            />
          ))
        )}
      </div>
    </>
  );
};

export default CourseCardList;

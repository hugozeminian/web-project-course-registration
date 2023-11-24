import React from "react";
import CourseCard from "../course-card/CourseCard.component";

const CourseCardList = ({ coursesData, disableaddCourseButton, addCourseButtonHidden, removeCourseButtonHidden, deleteCourseButtonHidden, authenticatedUser }) => {

  return (
    <>
      <div>
        {coursesData.length === 0 ? (
          <p>No courses available, select program and term first.</p>
        ) : (
          coursesData.map((courseData) => (
            <CourseCard
              key={`${courseData.CourseCode}-${courseData.Section}-${courseData.TermID}-${courseData.Year}`}
              courseData={courseData}
              disableaddCourseButton={disableaddCourseButton}
              addCourseButtonHidden={addCourseButtonHidden}
              removeCourseButtonHidden={removeCourseButtonHidden}
              deleteCourseButtonHidden={deleteCourseButtonHidden}
              authenticatedUser={authenticatedUser}
            />
          ))
        )}
      </div>
    </>
  );
};

export default CourseCardList;

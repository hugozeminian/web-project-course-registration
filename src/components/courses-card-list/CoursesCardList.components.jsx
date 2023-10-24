import CourseCard from "../course-card/CourseCard.component";

const CourseCardList = ({ coursesData, addCourseButtonHidden }) => {

  return (
    <>
      <div>
        {coursesData.map((courseData) => {
          return (
            <CourseCard
              key={courseData.id}
              courseData={courseData}
              addCourseButtonHidden={addCourseButtonHidden}
            />
          );
        })}
      </div>
    </>
  );
};

export default CourseCardList;

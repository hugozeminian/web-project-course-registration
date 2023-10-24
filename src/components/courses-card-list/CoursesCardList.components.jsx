import CourseCard from "../course-card/CourseCard.component";

const CourseCardList = (courses) => {
  const { coursesData } = courses;

  return (
    <>
        <div>
          {coursesData.map((courseData) => {
            return <CourseCard key={courseData.id} courseData={courseData} />;
          })}
        </div>
    </>
  );
};

export default CourseCardList;

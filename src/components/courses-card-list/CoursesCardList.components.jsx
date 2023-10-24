import CourseCard from "../course-card/CourseCard.component";

const CourseCardList = ({ coursesData }) => {

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

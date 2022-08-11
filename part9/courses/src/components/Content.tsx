import { Course } from "../types";

const Content = ({ courseParts }: { courseParts: Course[] }) => {
  return (
    <div>
      {courseParts.map(course => {
        return (
          <p key={course.name}>
            {course.name} {course.exerciseCount}
          </p>
        );
      })}
    </div>
  );
};

export default Content;
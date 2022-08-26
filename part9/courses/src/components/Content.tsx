import { CoursePart } from "../types";

const Part = ({ part }: { part: CoursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (part.type) {
    case "normal":
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <i>{part.description}</i>
        </div>
      );
    case "groupProject":
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          project exercises {part.groupProjectCount}
        </div>
      );
    case "submission":
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <i>{part.description}</i><br />
          submit to {part.exerciseSubmissionLink}
        </div>
      );
    case "special":
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <i>{part.description}</i><br />
          required skills {part.requirements.join(", ")}
        </div>
      );
    default:
      return assertNever(part);
  }
};

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map(course => {
        return (
          <Part part={course} key={course.name} />
        );
      })}
    </div>
  );
};

export default Content;
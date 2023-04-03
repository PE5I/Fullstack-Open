import { CoursePart } from "./Part";

const Total = (props: { courseParts: CoursePart[] }) => {
  return (
    <div>
      Number of exercises{" "}
      {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </div>
  )
}

export default Total;
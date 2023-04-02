import { CourseData, CourseParts } from "./Content";

const Total = (props: CourseParts) => {
  return (
    <div>
      Number of exercises{" "}
      {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </div>
  )
}

export default Total;
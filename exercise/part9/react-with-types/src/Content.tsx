import Part, { CoursePart } from "./Part"

// const ContentLine = (props: CourseData) => {
//   return (
//     <p>
//       {props.name} {props.exerciseCount}
//     </p>
//   )
// }

const Content = (props: { courseParts: CoursePart[] }) => {
  // console.log(props.courseParts);
  return (
    <div>
      {props.courseParts.map(part => <Part key={part.name} part={part} />)}
    </div>
  )

  // return (
  //   <div>
  //     {props.map((c: CoursePart) => <Part key={c.name} part={c} />)}
  //   </div>
  // )
}

export default Content;
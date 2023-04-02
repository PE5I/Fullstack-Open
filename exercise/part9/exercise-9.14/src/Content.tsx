

export interface CourseData {
  name: string,
  exerciseCount: number
}

const ContentLine = (props: CourseData) => {
  return (
    <p>
      {props.name} {props.exerciseCount}
    </p>
  )
}

export interface CourseParts {
  courseParts: {
    name: string,
    exerciseCount: number
  }[]
}

const Content = (props: CourseParts) => {
  return (
    <div>
      {props.courseParts.map((c: CourseData) => <ContentLine key={c.name} name={c.name} exerciseCount={c.exerciseCount} />)}
    </div>
  )
}

export default Content;
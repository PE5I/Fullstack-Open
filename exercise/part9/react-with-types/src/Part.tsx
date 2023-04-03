

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CourseDescription extends CoursePartBase {
  description: string
}

interface CoursePartBasic extends CourseDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CourseDescription {
  backgroundMaterial: string;
  kind: "background"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;



const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};



const Part = (props: { part: CoursePart }) => {
  const partName = (
    <b>{props.part.name} {props.part.exerciseCount}</b>
  )
  switch(props.part.kind) {
    case "basic":
      return (
        <p>
          {partName}
          <br/>
          <i>{props.part.description}</i>
        </p>
      )
    case "group":
      return (
        <p>
          {partName}
          <br/>
          {props.part.groupProjectCount}
        </p>
      )
    case "background":
      return (
        <p>
          {partName}
          <br/>
          <i>{props.part.description}</i>
          <br/>
          submit to {props.part.backgroundMaterial}
        </p>
      )
    default:
      return assertNever(props.part);
  }
}

export default Part;
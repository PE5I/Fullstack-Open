const Header = ({ name }) => {
    return (
        <h1>{name}</h1>
    )
}

const Part = (props) => {
    return (
        <p>{props.part} {props.exercise}</p>
    )
}

const Content = ({ partName, exercise }) => {
    return (
        <div>
            <Part part={partName} exercise={exercise} />
        </div>
    )
}

const Total = (props) => {
    return (
        <p><b>total of {props.totalExercises} exercises</b></p>
    )
}

const Course = ({ course }) => {
    const total = course.parts.reduce((acc,b) => acc + b.exercises,0)
    // const total = 0

    return (
        <div>
            <Header name={course.name} />
            {course.parts.map(
                part => <Content key={part.id} partName={part.name} exercise={part.exercises} /> 
            )}
            <Total totalExercises={total} />
        </div>
    )
}

const Courses = ({ courses }) => {
    return (
        <div>
        {courses.map(course => <Course key={course.id} course={course} />)}
        </div>
    )
}

export default Courses
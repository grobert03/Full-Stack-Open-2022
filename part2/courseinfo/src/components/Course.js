const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name}/>
      <Content course={course}/>
    </div>
  )
}

const Header = ({name}) => {
  return (
    <>
    <h1>{name}</h1>
    </>

  );
}

const Content = ({course}) => {
  return(
    <div>
      {course.parts.map(element =>
        <Part key={element.id} part={element.name} exercises={element.exercises}/>
      )}
      <Total parts={course.parts}/>
    </div>
  );
}

const Total = ({parts}) => {
  let exercises = parts.map(element => element.exercises);
  let sum = exercises.reduce((ac, cv) => ac + cv);
  return (
    <div>
      <h4>total of {sum} exercises</h4>
    </div>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.part} {props.exercises}</p>
    </>
  );
}

export default Course;

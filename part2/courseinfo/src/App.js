const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

const Course = ({course}) => {
  return (
    <>
      <Header name={course.name}/>
      <Content course={course}/>
    </>
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


export default App;

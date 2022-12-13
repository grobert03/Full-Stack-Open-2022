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
    </div>
  );
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
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

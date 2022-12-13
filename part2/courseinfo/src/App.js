const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(element => <Course key={element.id} course={element}/>)}
    </div>
  )
}

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


export default App;

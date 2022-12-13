import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header value="Give feedback"/>

      <Button handleClick={() => setGood(good + 1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="netural"/>
      <Button handleClick={() => setBad(bad + 1)} text="bad"/>

      <Header value="Statistics"/>

      <Display value={good} text="good"/>
      <Display value={neutral} text="neutral"/>
      <Display value={bad} text="bad"/>
    </div>
  )
}

const Header = ({value}) => {
  return <h2>{value}</h2>;
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Display = ({value, text}) => {
  return (
    <p>{text} {value}</p>
  )
}

export default App;

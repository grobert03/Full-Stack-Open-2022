import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [clicks, setClicks] = useState(0);

  const goodClicked = () => {
    setGood(good + 1);
    setClicks(clicks + 1);
  }

  const neutralClicked = () => {
    setNeutral(neutral + 1);
    setClicks(clicks + 1);
  }

  const badClicked = () => {
    setBad(bad + 1);
    setClicks(clicks + 1);
  }

  return (
    <div>
      <Header value="Give feedback"/>

      <Button handleClick={goodClicked} text="good"/>
      <Button handleClick={neutralClicked} text="netural"/>
      <Button handleClick={badClicked} text="bad"/>

      <Header value="Statistics"/>

      <Statistics good={good} bad={bad} neutral={neutral} clicks={clicks}/>
    </div>
  )
}

const Statistics = ({good, bad, neutral, clicks}) => {
  if (clicks == 0) {
    return <p>No feedback given</p>
  } else {
    return (
      <div>
        <Display value={good} text="good"/>
        <Display value={neutral} text="neutral"/>
        <Display value={bad} text="bad"/>
        <Display value={clicks} text="all"/>

        <Average good={good} bad={bad} clicks={clicks}/>

        <Positive good={good} clicks={clicks}/>
      </div>
    )
  }
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

const Average = ({good, bad, clicks}) => {
  return (
    <p>average {(good - bad) / clicks}</p>
  )
}

const Positive = ({good, clicks}) => {
  return (
    <p>positive {(good / clicks) * 100} %</p>
  )
}

export default App;

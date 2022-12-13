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
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="all" value={clicks}/>
        <StatisticLine text="average" value={(good - bad) / clicks}/>
        <StatisticLine text="positive" value={good / clicks * 100}/>
      </div>
    )
  }
}

const StatisticLine = ({text, value}) => {
  if (text === "positive") {
    value = value + " %";
  }
  return (
    <p>{text} {value}</p>
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

export default App;

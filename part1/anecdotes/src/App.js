import { useState } from "react"

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(7).fill(0));

  const generateNumber = () => {
    let number = Math.floor(Math.random() * anecdotes.length);
    setSelected(number);
  }

  const vote = (selected) => {
    let copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  }

  const returnMostVotes = () => {
    let highestNumber = votes[0];
    let index = 0;
    for (let i = 1; i < votes.length; i++) {
      console.log(votes);
      if (votes[i] > highestNumber) {
        highestNumber = votes[i];
        index = i;
      }
    }
    return index;
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote selected={selected} text={anecdotes}/>
      <Votes selected={selected} array={votes}/>
      <Button clickHandler={() => vote(selected)} text="vote"/>
      <Button clickHandler={generateNumber} text="next anecdote"/>
      <h2>Anecdote with most votes</h2>
      <Anecdote selected={returnMostVotes()} text={anecdotes}/>
    </div>
  )
}

const Button = ({clickHandler, text}) => {
  return <button onClick={clickHandler}>{text}</button>
}

const Anecdote = ({selected, text}) => {
  return <p>{text[selected]}</p>
}

const Votes = ({selected, array}) => {
  return <p>has {array[selected]} votes</p>
}

export default App;

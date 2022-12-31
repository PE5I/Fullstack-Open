

import { useState } from 'react'

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value} {props.optional}</td>
    </tr>
  )
}

const Statistics = ({good, bad, neutral, all, average, positive}) => {
  if (good == 0 && bad == 0 && neutral == 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={all} />
          <StatisticsLine text="average" value={average} />
          <StatisticsLine text="positive" value={positive} optional={"%"}/>
        </tbody>
      </table>
    </div>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  let all = good + neutral + bad
  let average = (good - bad) / all
  let positive = (good / all) * 100

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text={"good"} />
      <Button onClick={handleNeutralClick} text={"neutral"} />
      <Button onClick={handleBadClick} text={"bad"} />

      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} average={average} positive={positive} all={all}/>
    </div>
  )

}

export default App;

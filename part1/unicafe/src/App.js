import { useState } from 'react'

const Title = ({ text }) => <h1>{text}</h1>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = ({ title, value, unit }) => (
<tr>
  <td>{title}</td>
  <td>{value} {unit}</td>
</tr>
)

const Statistics = ({ good, neutral, bad }) => {
  if ((good + neutral + bad) !== 0) {
    return (
      <table>
        <tbody>
          <StatisticLine title="good" value={good} />
          <StatisticLine title="neutral" value={neutral} />
          <StatisticLine title="bad" value={bad} />
          <StatisticLine title="all" value={good + neutral + bad} />
          <StatisticLine title="average" value={(good + -1 * bad) / (good + neutral + bad)} />
          <StatisticLine title="positive" value={good / (good + neutral + bad) * 100} unit="%" />
        </tbody>
      </table>
    )
  }
  return (
    <div>
      No feedback given
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const rate = (method, value) => () => method(value + 1)

  return (
    <div>
      <Title text="give feedback" />
      <Button handleClick={rate(setGood, good)} text ="good" />
      <Button handleClick={rate(setNeutral, neutral)} text ="neutral" />
      <Button handleClick={rate(setBad, bad)} text ="bad" />

      <Title text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App

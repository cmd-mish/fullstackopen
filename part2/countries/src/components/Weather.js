import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ city }) => {
  const [weatherInfo, setWeatherInfo] = useState([])

  const api_key = process.env.REACT_APP_API_KEY
  const api_call = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`


  useEffect(() => {
    axios
      .get(api_call)
      .then(response => {
        setWeatherInfo(response.data)
      })
  }, [])
  

  if (weatherInfo.length !== 0) {
    return(
    <div>
      temperature {weatherInfo.main.temp} Celsius<br />
      <img src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`} /><br />
      wind {weatherInfo.wind.speed} m/s
    </div>
  )
  } else {
    return(
      <div>loading...</div>
    )
  }
  
}

export default Weather
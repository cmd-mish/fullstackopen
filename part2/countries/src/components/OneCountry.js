import React from 'react'

const OneCountry = ({ title, capital, area, languages, flag }) => {
  const langArray = Object.values(languages)
  return(
    <div>
      <h2>{title}</h2>
      <p>
        capital {capital[0]} <br />
        area {area}
      </p>
      <h3>Languages</h3>
      <ul>
        {langArray.map(language =>
          <li key={language}>{language}</li>
        )}
      </ul>
      <img src={flag.png} />
    </div>
  )
}

export default OneCountry
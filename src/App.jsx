import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
// ===================================================
import { BASE_URL, API_KEY } from './services'

// COMPONENTS
import Datetime from './components/datetime'
import Search from './components/search'
import Weather from './components/weather'
import Errormessage from './components/errormessage'

export default function App() {
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState({ city: 'Athens', country: 'GR', latitude: 37.98, longitude: 23.72 })
  const [currentWeather, setCurrentWeather] = useState({})
  const [localDateTime, setLocalDateTime] = useState()
  const [bg, setBg] = useState()
  const [errorMsg, setErrorMsg] = useState()

  // SEARCH

  const handleSubmit = (e) => {
    e.preventDefault()
    if (search) {
      fetchCity()
      setSearch('')
      setErrorMsg(null)
    } else {
      console.log('not a city')
      setErrorMsg('Please enter a city name')
      setCurrentWeather(null)
    }
  }

  // CITY

  const fetchCity = async () => {

    const geoUrl = `${BASE_URL}/geo/1.0/direct?q=${search}&limit=1&appid=${API_KEY}`

    try {
      const response = await axios(geoUrl)
      const data = response.data
      // console.log(data)

      const locationData = {
        city: data[0].name,
        country: data[0].country,
        latitude: data[0].lat,
        longitude: data[0].lon
      }
      setLocation(locationData)

    } catch (error) {
      console.error(error)
      setErrorMsg('Please enter a city name')
    }

  }

  // WEATHER

  const fetchWeather = async () => {

    const weatherUrl = `${BASE_URL}/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${API_KEY}&units=metric`

    try {
      const response = await axios(weatherUrl)
      const data = response.data
      // console.log(data)

      const weatherData = {
        timestamp: data.timezone,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        min: Math.round(data.main.temp_min),
        max: Math.round(data.main.temp_max)
      }
      setCurrentWeather(weatherData)

    } catch (error) {
      console.error(error)
      setErrorMsg('Something went wrong')
      setCurrentWeather(null)
    }

  }

  useEffect(() => {
    fetchWeather()

  }, [location])

  // TIME & BG

  const displayDateTime = () => {
    if (currentWeather) {
      const timezoneInMinutes = currentWeather.timestamp / 60
      const currentDateTime = moment().utcOffset(timezoneInMinutes)

      const hrs = currentDateTime.hours()

      let bgColor

      switch (true) {
        case hrs >= 6 && hrs <= 13:
          bgColor = 'from-cyan-500 to-blue-500';
          break;
        case hrs > 13 && hrs <= 18:
          bgColor = 'from-cyan-500 to-amber-500';
          break;
        case hrs > 18 && hrs <= 21:
          bgColor = 'from-cyan-600 to-rose-300';
          break;
        default:
          bgColor = 'from-sky-800 to-sky-950';
      }

      // console.log(hrs)

      setBg(bgColor)

      setLocalDateTime(currentDateTime.format('MMMM Do YYYY, h:mm:ss a'))

    }
  }

  useEffect(() => {
    displayDateTime()
    const interval = setInterval(() => {
      displayDateTime()
    }, 1000)

    return () => clearInterval(interval)
  }, [currentWeather])


  // FINAL RENDER

  return (
    <div className={`bg-gradient-to-t ${bg}`}>
      <div className="min-h-screen p-2">
        <div className="max-w-md m-auto text-center">

          {currentWeather && <Datetime localDateTime={localDateTime} />}

          <Search
            value={search}
            handleSearch={(e) => setSearch(e.target.value)}
            handleSubmit={handleSubmit}
          />

          {errorMsg && <Errormessage error={errorMsg} />}

          {currentWeather &&
            <Weather
              city={`${location.city}(${location.country})`}
              temperature={currentWeather.temperature}
              weatherText={currentWeather.description}
              icon={currentWeather.icon}
              min={currentWeather.min}
              max={currentWeather.max}
            />}

        </div>
      </div>
    </div>
  )

}

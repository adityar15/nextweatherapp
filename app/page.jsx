"use client"

import React, { useCallback, useState } from "react"
import DailyResults from "./components/DailyResults"
import HourlyResults from "./components/HourlyResults"
import SearchBox from "./components/SearchBox"

// https://api.open-meteo.com/v1/forecast?latitude=51.51&longitude=-0.13&hourly=temperature_2m,rain,showers,snowfall,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Europe%2FLondon
export default function Home() {
  // const [data, setData] = useState({})
  const [dailyData, setDailyData] = useState([])
  const [hourlyData, setHourlyData] = useState([])

  const handleClick = useCallback((city) => {
    const { latitude, longitude, timezone } = city
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,rain,showers,snowfall,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=${timezone}`
    )
      .then((res) => res.json())
      .then((data) => {
        // setData(data)
        // console.log(data)
        const { hourly, daily } = data
        let hourlyDataSet = []
        for(let i=0; i<hourly?.time.length; i++)
        {
            if(i<7)
            {
                setDailyData(dailyData => {
                    return [
                        ...dailyData,
                        {
                            time: daily?.time[i],
                            temperature_2m_max: daily?.temperature_2m_max[i],
                            temperature_2m_min: daily?.temperature_2m_min[i],
                            weathercode: daily?.weathercode[i],
                            sunrise: daily?.sunrise[i],
                            sunset: daily?.sunset[i],
                        }
                    ]
                })
            }

            hourlyDataSet.push({
                time: hourly?.time[i],
                temperature_2m: hourly?.temperature_2m[i],
                rain: hourly?.rain[i],
                showers: hourly?.showers[i],
                snowfall: hourly?.snowfall[i],
                weathercode: hourly?.weathercode[i],
                windspeed_10m: hourly?.windspeed_10m[i],
            })
        }
       
        setHourlyData(hourlyDataSet)
       
      })
  }, [])

  return (
    <div className="w-full px-4 overflow-x-hidden overflow-y-auto">
      <SearchBox handleClick={handleClick} />
      <HourlyResults data={hourlyData} /> 
      <DailyResults data={dailyData} />
    </div>
  )
}

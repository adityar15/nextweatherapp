"use client"

import React from "react"
import { WiCelsius } from "weather-icons-react"
import moment from "moment"
import { weatherCodeComponentMap, weatherLabelMap } from "../assets/js/maps"


function DayWeather({ Icon, label, temperature, date }) {
  
  return (
    <div className="flex flex-col item-center space-y-3 flex-none">
      {Icon && <Icon size={48} color="#ffffff" />}
      <span className="text-sm text-gray-50">{label}</span>
      <span className="text-sm text-gray-50 flex space-x-1 items-center">
        <span>
        {temperature}
        </span> 
        <WiCelsius size={24} color="#ffffff" />
      </span>
      <span className="text-sm text-gray-50">{moment(date).format("DD-MM-YYYY")}</span>
      <span className="text-sm text-gray-50">{moment(date).format("HH:mm")}</span>
    </div>
  )
}

export default function HourlyResults({ data }) {
  return(
  <div className="flex space-x-4 mt-12 overflow-auto w-full flex-nowrap flex-row">
    {data.map((day) => (
      <DayWeather key={day.time} date={day.time} Icon={weatherCodeComponentMap[day.weathercode]} label={weatherLabelMap[day.weathercode]} temperature={day.temperature_2m}/>
    ))}
  </div>
  )
}

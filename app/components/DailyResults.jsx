"use client"

import React from "react"
import moment from "moment"
import { WiCelsius, WiSunrise, WiSunset } from "weather-icons-react"
import { weatherCodeComponentMap, weatherLabelMap } from "../assets/js/maps"

function Layout({ children }) {
  return <span className="flex items-center space-x-1 text-gray-50">{children}</span>
}

function DayWeather({ Icon, label, payload }) {
  return (
    <div className="flex flex-row items-center space-x-4 py-4 px-1">
      <span className="text-lg text-gray-50">{moment(payload.time).format("DD-MM-YYYY")}</span>
      <span className="flex flex-col">
        <Layout>
          <WiSunrise size={24} color="#ffffff" />
          <span>{moment(payload.sunrise).format("HH:mm")}</span>
        </Layout>

        <Layout>
          <WiSunset size={24} color="#ffffff" />
          <span>{moment(payload.sunrise).format("HH:mm")}</span>
        </Layout>
      </span>

      <span className="flex flex-col">
        <Layout>
          <span>{payload.temperature_2m_min}</span>
          <WiCelsius size={24} color="#ffffff" />
        </Layout>
        <Layout>
          <span>{payload.temperature_2m_max}</span>
          <WiCelsius size={24} color="#ffffff" />
        </Layout>
      </span>

      <span className="flex flex-col">
        <Layout>
           {Icon && <Icon size={24} color="#ffffff" />}
            <span>{label}</span>
        </Layout>
      </span>

    </div>
  )
}

export default function DailyResults({ data }) {
  return (
    <div className="flex flex-col space-y-3 mt-12 divide-y divide-gray-300">
      {data.map((day) => (
        <DayWeather key={day.time} label={weatherLabelMap[day.weathercode]} Icon={weatherCodeComponentMap[day.weathercode]} payload={day} />
      ))}
    </div>
  )
}

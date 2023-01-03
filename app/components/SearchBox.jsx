"use client"
import React, { useEffect, useState } from "react"
import useDebounce from "../hooks/useDebounce"

export default function SearchBox({ className, handleClick, ...other }) {
  const [value, setValue] = useState("")
  const [show, setShow] = useState(false)
  const debouncedValue = useDebounce(value, 500)
  const [cities, setCities] = useState([])
  const [city, setCity] = useState("")
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    if (debouncedValue == "") {
      setShow(false)
      return
    }

    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${debouncedValue}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.results.length == 0) {
          setShow(false)
          setCities([])
          return
        }

        setCities(data.results)
        setShow(true)
      })
  }, [debouncedValue])

  function handleClickEvent(city) {
    handleClick(city)
    setCity(city.name)
    setShow(false)
    setToggle(true)
  }

  return (
    <div className="w-full">
      {!toggle ? (
        <input
          className="p-3 w-full rounded-md bg-transparent border border-gray-400 focus:border-gray-200 outline-none shadow shadow-gray-300 text-gray-50 placeholder:text-gray-400"
          placeholder="Search for city"
          onInput={(e) => setValue(e.target.value)}
          value={value}
        />
      ) : (
        <div onClick={()=>setToggle(false)} className="p-3 w-full rounded-md bg-transparent border border-gray-400 focus:border-gray-200 outline-none shadow shadow-gray-300 text-gray-50 placeholder:text-gray-400">
          {city}
        </div>
      )}
      <ul className="bg-gray-800 divide-y divide-gray-500 rounded-md">
        {show &&
          cities.map((city) => (
            <li onClick={() => handleClickEvent(city)} className="p-3 hover:bg-black transition-all ease-in-out duration-100 text-gray-50" key={city.id}>
              {city.name}, {city.country}
            </li>
          ))}
      </ul>
    </div>
  )
}

import { useState } from 'react'
import './output.css'
import { Outlet, useLoaderData } from 'react-router-dom'


function App() {
const [user, setUser] =  useState(useLoaderData())
console.log("App rendered")
console.log("user in app.jsx rendered with:" , user)

  return (
    <>
      <Outlet context={ 
        {
          user,
          setUser
        } }/>
    </>
  )
}

export default App

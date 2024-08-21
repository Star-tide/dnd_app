import { useState } from 'react'
import './output.css'
import { Outlet, useLoaderData } from 'react-router-dom'


function App() {
const [user, setUser] =  useState(useLoaderData())
const [ viewState, setViewState ] = useState("characters")
console.log("App rendered")
console.log("user in app.jsx rendered with:" , user)

  return (
    <>
      <Outlet context={ 
        {
          user,
          setUser,
          viewState,
          setViewState
        } }/>
    </>
  )
}

export default App

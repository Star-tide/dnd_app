import { useState, React } from 'react'
import './output.css'
import { Outlet } from 'react-router-dom'


function App() {
const [userAuthenticated, setUserAuth] = useState(false);
console.log("App rendered")

  return (
    <>
      <Outlet context={ 
        {
          userAuthenticated,
          setUserAuth
        } }/>
    </>
  )
}

export default App

import './App.css'
import MainToDo from './Components/MainToDo/MainToDo'
import React, { useState } from 'react'

export const Context = React.createContext()

function App() {

  const [ isLightTheme, setIsLightTheme ] = useState("false")

  return (
    <>
      <Context.Provider value={[isLightTheme, setIsLightTheme]}>
        <div className="background-main" data-theme={isLightTheme}>
          <MainToDo/>
        </div>
      </Context.Provider>
    </>
  )
}

export default App

import './App.css'
import MainToDo from './Components/MainToDo/MainToDo'
import React, { useState } from 'react'
import ToDoProvider from './Model/ToDoProvider'
import Presenter from './Presenter/Presenter'
import Model from './Model/Model'

export const Context = React.createContext()

function App() {
  const API_URL = 'http://localhost:3000/v1/todos'
  const provider = new ToDoProvider(API_URL)
  const model = new Model()
  const presenter = new Presenter(model, provider)

  const [ isLightTheme, setIsLightTheme ] = useState("false")

  return (
    <>
      <Context.Provider value={[isLightTheme, setIsLightTheme]}>
        <div className="background-main" data-theme={isLightTheme}>
          <MainToDo presenter={presenter}/>
        </div>
      </Context.Provider>
    </>
  )
}

export default App

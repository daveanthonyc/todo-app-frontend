import './App.css'
import MainToDo from './Components/MainToDo/MainToDo'
import React, { useState } from 'react'
import ToDoProvider from './Model/ToDoProvider'
import Presenter from './Presenter/Presenter'
import Model from './Model/Model'

export const Context = React.createContext()

function App() {
  const API_URL = 'http://localhost:3000/v1/todos'

  // provides all fetch methods to interact with server -> passed as dependency to presenter
  const provider = new ToDoProvider(API_URL)
  
  // pure data no functions
  const model = new Model()

  // passed into MainToDo View to provide all business logic methods for todo app
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

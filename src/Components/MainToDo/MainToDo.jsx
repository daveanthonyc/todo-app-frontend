import { useContext, useState } from "react"
import ToggleTheme from "./ToggleTheme"
import ToDoEntry from "./ToDoEntry"
import ToDo from "./ToDo"
import { useEffect } from "react"
import { Context } from "../../App"

function MainToDo() {
    const [islightTheme] = useContext(Context)
    const [itemsLeft, setItemsLeft] = useState(0)
    const [filterState, setFilterState ] = useState("All")
    const [ todos, setTodos ] = useState([
        {
            id: "tadsfasdfasdfasdf",
            body: "Take out the trash",
            completed: false
        },
        {
            id: "kasdjklfjkkakd",
            body: "Do the dishes",
            completed: false
        }
    ])

    useEffect(() => {
        const newCount = todos.filter((todo) => {
            return todo.completed === false
        }).length
        setItemsLeft(newCount)
    }, [todos])

    const createNewToDo = (newBody) => {
        const newArray = [...todos]
        newArray.push({
            id: Math.random(),
            body: newBody,
            completed: false
        })
        setTodos(newArray)
    }

    const updateToggle = (id) => {
        // given id of entry to change, toggle its completed field 
        const newArray = todos.map((todo) => {
            if (todo.id === id) {
                const newTodo = todo
                newTodo.completed = !newTodo.completed
                return newTodo
            }
            return todo
        })
        setTodos(newArray)
    }

    const deleteToDo = (id) => {
        // delete
        const updatedTodos = todos.filter((todo) => {
            return todo.id !== id;
        })
        setTodos(updatedTodos)
    }

    const handleClearCompleted = () => {
        // filter
        const newArray = todos.filter((todo) => {
            return todo.completed === false;
        })
        setTodos(newArray)
    }

    const handleFilterChange = (filterChoice) => {
        setFilterState(filterChoice)
        console.log(filterChoice)
    }

    return <div className="main-todo">
        <header className="main-header">
            <h1>TODO</h1>
            <ToggleTheme></ToggleTheme>
        </header>

        <ToDoEntry createNewEntry={createNewToDo}/>
        
        <div className="apply-theme">
        <div className="todo-container" data-theme="false">
            {filterState === "All" && todos.map((todo, index) => (
                <ToDo key={todo.id} done={todo.completed} toDoBody={todo.body} deleteToDo={deleteToDo} index={index} id={todo.id} updateToggle={updateToggle}/>
            ))}

            {filterState === "Active" && todos.map((todo, index) => (
                !todo.completed && (<ToDo key={todo.id} done={todo.completed} toDoBody={todo.body} deleteToDo={deleteToDo} index={index} id={todo.id} updateToggle={updateToggle}/>)
            ))}

             {filterState === "Completed" && todos.map((todo, index) => (
                todo.completed && (<ToDo key={todo.id} done={todo.completed} toDoBody={todo.body} deleteToDo={deleteToDo} index={index} id={todo.id} updateToggle={updateToggle}/>)
            ))}
            <div className="todo-footer" data-theme={islightTheme}>
                <p>{itemsLeft} items left</p>
                <button onClick={handleClearCompleted}>Clear Completed</button>
            </div>
        </div>

            <div className="filters" data-theme={islightTheme}>
                <button className={filterState === "All" ? 'active' : ""} onClick={() => handleFilterChange("All")}>All</button>
                <button className={filterState === "Active" ? 'active' : ""} onClick={() => handleFilterChange("Active")}>Active</button>
                <button className={filterState === "Completed" ? 'active' : ""} onClick={() => handleFilterChange("Completed")}>Completed</button>
            </div>
        </div>
    </div>
}

export default MainToDo
import { useContext, useState } from "react"
import ToggleTheme from "./ToggleTheme"
import ToDoEntry from "./ToDoEntry"
import ToDo from "./ToDo"
import { useEffect } from "react"
import { Context } from "../../App"

function MainToDo(props) {
    const [ islightTheme ] = useContext(Context)
    const [ itemsLeft, setItemsLeft ] = useState(0)
    const [ filterState, setFilterState ] = useState("All")
    const [ todos, setTodos ] = useState([])

    // initialise list of todos
    useEffect(() => {
        async function getData() {
            const res = await props.presenter.getAllData();
            setTodos(res)
        }
        getData()
    }, [])

    // re-render how many uncompleted items are left
    useEffect(() => {
        setItemsLeft(props.presenter.calcIncompleteItemsLeft())
    }, [todos])

    // event handlers to perform CRUD operations with presenter methods
    const createNewToDo = async (newBody) => {
        await props.presenter.createNewEntry(newBody);
        setTodos(props.presenter.getToDos())
    }

    const updateToggle = async (id) => {
        await props.presenter.updateById(id)
        setTodos(props.presenter.getToDos())
    }

    const deleteToDo = async (id) => {
        await props.presenter.deleteDataByID(id)
        setTodos(props.presenter.getToDos())
    }

    const handleClearCompleted = async () => {
        await props.presenter.deleteCompleted()
        setTodos(props.presenter.getToDos())
    }

    const handleFilterChange = (filterChoice) => {
        setFilterState(filterChoice)
    }


    return <div className="main-todo">
        <header className="main-header">
            <h1>TODO</h1>
            <ToggleTheme />
        </header>

        <ToDoEntry createNewEntry={createNewToDo}/>
        
        <div className="apply-theme">
            <div className="todo-container" data-theme="false">
                
                {filterState === "All" && todos.map((todo) => (
                    <ToDo key={todo._id} done={todo.completed} toDoBody={todo.body} deleteToDo={deleteToDo} id={todo._id} updateToggle={updateToggle}/>
                ))}
                
                {filterState === "Active" && todos.map((todo) => (
                    !todo.completed && (<ToDo key={todo._id} done={todo.completed} toDoBody={todo.body} deleteToDo={deleteToDo} id={todo._id} updateToggle={updateToggle}/>)
                ))}
                
                {filterState === "Completed" && todos.map((todo) => (
                    todo.completed && (<ToDo key={todo._id} done={todo.completed} toDoBody={todo.body} deleteToDo={deleteToDo} id={todo._id} updateToggle={updateToggle}/>)
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
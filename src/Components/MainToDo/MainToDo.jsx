import { useContext, useState } from "react"
import ToggleTheme from "./ToggleTheme"
import ToDoEntry from "./ToDoEntry"
import ToDo from "./ToDo"
import { useEffect } from "react"
import { Context } from "../../App"

function MainToDo(props) {
    const [islightTheme] = useContext(Context)
    const [itemsLeft, setItemsLeft] = useState(0)
    const [filterState, setFilterState ] = useState("All")
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

    // replace with presenter methods
    const createNewToDo = (newBody) => {
        async function createData() {
            const res = await props.presenter.createNewEntry(newBody);
            setTodos(res)
        }
        createData()
    }

    const updateToggle = (id) => {
        // given id of entry to change, toggle its completed field 
        async function toggle() {
            const newData = await props.presenter.updateById(id)
            console.log(newData)
            setTodos(newData)
        }
        toggle();
    }

    const deleteToDo = (id) => {
        // delete
        async function deleteId() {
            await props.presenter.deleteDataByID(id)
            const newData = props.presenter.getAllData()
            setTodos(newData)
        }
        deleteId()
    }

    const handleClearCompleted = () => {
        // filter
        async function clearCompleted() {
            const newArray = await props.presenter.deleteCompleted()
            setTodos(newArray)
        }
        clearCompleted()
    }

    const handleFilterChange = (filterChoice) => {
        setFilterState(filterChoice)
    }

    return <div className="main-todo">
        <header className="main-header">
            <h1>TODO</h1>
            <ToggleTheme></ToggleTheme>
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
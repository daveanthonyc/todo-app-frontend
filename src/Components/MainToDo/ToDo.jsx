import { useContext, useState } from "react"
import { Context } from "../../App";

function ToDo(props) {
    const [ isLightTheme ] = useContext(Context)
    const [isCompleted, setIsCompleted ] = useState(props.done)

    // when user ticks off todo
    function handleToggle() {
        setIsCompleted(!isCompleted)
        props.updateToggle(props.id) // presenter method in MainToDo.jsx
    }

    return <div className="todo-card" data-theme={isLightTheme}>
        <button className={isCompleted ? "todo-button-active" : "todo-button"}  onClick={handleToggle} data-theme={isLightTheme}>
            {isCompleted && <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6"/></svg>}
        </button>
        <p className={isCompleted ? "strike-through" : ""}>
            {props.toDoBody}
        </p>
        <button className="todo-delete-button" onClick={() => props.deleteToDo(props.id)} />
    </div>
}

export default ToDo
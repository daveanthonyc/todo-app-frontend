import { useContext, useState } from "react"
import { Context } from "../../App";

function ToDo(done, toDoBody, deleteToDo, id, updateToggle) {

    const [ isLightTheme ] = useContext(Context)
    const [isCompleted, setIsCompleted ] = useState(done.done)

    function handleToggle() {
        setIsCompleted(!isCompleted)
        done.updateToggle(done.id)
    }

    return <div className="todo-card" data-theme={isLightTheme}>
        <button className={isCompleted ? "todo-button-active" : "todo-button"}  onClick={handleToggle} data-theme={isLightTheme}>
        {isCompleted && <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6"/></svg>}
        </button>
        {<p className={isCompleted ? "strike-through" : ""}>{done.toDoBody}</p>}
        <button className="todo-delete-button" onClick={() => done.deleteToDo(done.id)}></button>
    </div>
}

export default ToDo
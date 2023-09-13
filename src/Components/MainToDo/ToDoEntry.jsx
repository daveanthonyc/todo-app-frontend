import { useContext, useState } from "react";
import { Context } from "../../App";

function ToDoEntry(createNewEntry) {
    const [ formText, setFormText ] = useState("");
    const [isLightTheme ] = useContext(Context)

    function createNewToDo(e) {
        e.preventDefault();
        e.target.reset();
        
        // create new to do
        createNewEntry.createNewEntry(formText)
        // reset 
    }

    function handleInputChange(e) {
        setFormText(e.target.value);
    }


    return <div className="todo-entry" data-theme={isLightTheme}>
        <button className="todo-button" data-theme={isLightTheme}></button>
        <form action="www.example.com/v1/todos" method="POST" onSubmit={createNewToDo}>
            <input type="text" className="form-input-entry" onChange={handleInputChange} placeholder="Create a new todo..."/>
        </form>
    </div>
}

export default ToDoEntry
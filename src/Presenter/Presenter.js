// passed as a prop to the MainToDo.jsx view
// methods use provider methods and edit the model

class Presenter {
    constructor(model, provider) {
        this.model = model
        this.provider = provider
    }

    getToDos() {
        return this.model.todos
    }

    async getAllData() { // [todos]
        try {
            const allToDos = await this.provider.fetchData()
            this.model.todos = allToDos
            return this.model.todos
        } catch (error) { 
            console.log("error fetching data") 
        }
    }

    async createNewEntry(newBody) { // void
        try {
            const res = await this.provider.createData(newBody);
            // instead of pushing the new todo on the existing list of todos in the model, 
            // the entire list of todos is fetched and the response is used to update the model
            const allToDos = await this.provider.fetchData();
            this.model.todos = allToDos;
        } catch (error) {
            console.log("error creating new Entry")
        }
    }

    async updateById(idToChange) { // void
        try {
            // transform model by finding todo to update and reversing the completed boolean
            this.model.todos = this.model.todos.map((todo) => {
                if (todo._id === idToChange) {
                    const newCompleted = !todo.completed;
                    const updatedEntry = { _id: todo._id, body: todo.body, completed: newCompleted}
                    const res = this.provider.updateDataById(idToChange, updatedEntry)
                    return updatedEntry
                }
                return todo
            })
        } catch (error) {
            console.log(error)
        }
    }

    async deleteDataByID(idToDelete) { // void
        try {
            const res = await this.provider.deleteDataById(idToDelete);
            this.model.todos = this.model.todos.filter((todo) => {
                return todo._id !== idToDelete
            })
        } catch (error) {
            console.log('couldnt delete entry')
        }
    }

    async deleteCompleted() { // void
        this.model.todos = this.model.todos.filter((todo) => {
            if (todo.completed === true) {
                // delete completed todos from db
                this.deleteDataByID(todo._id)
                // do not include completed todos in model when filtering
                return false
            } 
            return true
        })
    }

    calcIncompleteItemsLeft() {
        // return number of array elements that are incomplete
        const newCount = this.model.todos.filter((todo) => {
            return todo.completed === false
        }).length
        
        return newCount
    }
}

export default Presenter;
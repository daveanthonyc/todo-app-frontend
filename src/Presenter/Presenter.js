class Presenter {
    constructor(model, provider) {
        this.model = model; // any alternative to using an object?
        this.provider = provider;
    }

    async getAllData() {
        try {
            // fetch using the provider methods
            const allToDos = await this.provider.fetchData()
    
            // with result of fetch -> update model
            this.model.todos = allToDos;

            // update view 
            return this.model.todos;
        } catch (error) {
            console.log("error fetching data")
        }
    }

    async createNewEntry(newBody) {
        try {
            // create new todo in DB using provider method
            const res = this.provider.createData(newBody);

            // edit model to include all entries in DB, and reutrn it
            return this.getAllData()
        } catch (error) {
            console.log("error creating new Entry")
        }
    }

    async updateById(idToChange) {
        try {
            // find entry in list, edit completed state of it, pass it as body to fetch req
            this.model.todos = this.model.todos.map((todo) => {
                if (todo._id === idToChange) {
                    // const newCompleted = todo.completed === true ? false : true;
                    const newCompleted = !todo.completed;
                    const updatedEntry = { _id: todo._id, body: todo.body, completed: newCompleted}
                    const res = this.provider.updateDataById(idToChange, updatedEntry)
                    return updatedEntry
                }
                return todo
            })
            return this.model.todos;
        } catch (error) {
            console.log(error)
        }
    }

    async deleteDataByID(idToDelete) {
        try {
            const res = await this.provider.deleteDataById(idToDelete);
        } catch (error) {
            console.log('couldnt delete entry')
        }
    }

    async deleteCompleted() {
        for (let todo of this.model.todos) {
            if (todo.completed === true)
                this.deleteDataByID(todo._id)
        }

        return this.getAllData();
    }

    calcIncompleteItemsLeft() {
        const newCount = this.model.todos.filter((todo) => {
            return todo.completed === false
        }).length
        
        return newCount
    }
}

export default Presenter;
class Model {
    todos
    constructor(dataProvider) {
        this.dataProvider = dataProvider
    }

    async initialiseData(endpoint) {
        this.todos = await this.dataProvider.fetchData(endpoint)
    }

    getToDos() {
        return this.todos
    }

    // create to do
    createNewToDo() {
        this.dataProvider.createData();
    }
}

export default Model;
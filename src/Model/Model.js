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
}

export default Model;
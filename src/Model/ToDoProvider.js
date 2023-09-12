class ToDoProvider {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    // get all data
    async fetchData(endpoint) {
        const res = await fetch(`${this.baseURL}${endpoint}`)
        if (!res) {
            throw new Error('unable to fetch from URL')
        }

        const data = await res.json();
        return data
    }

    // get data by id
    async fetchDataById(endpoint, id) {
        const res = await fetch(`${this.baseURL}${endpoint}/${id}`)
        if (!res) {
            throw new Error('unable to fetch from URL')
        }

        const data = await res.json();
        return data
    }

    // create new data
    async createData(endpoint, newBody) {
        const newData = {body: newBody}
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        }

        const res = await fetch(`${this.baseURL}${endpoint}`, requestOptions)
        const parse = await res.json()
        return parse
    }

    // update data by id
    async updateDataById(endpoint, id, updatedEntry) {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedEntry)
        }
        const res = await fetch(`${this.baseURL}${endpoint}${id}`, requestOptions)
        if (!res) {
            throw new Error('unable to update by id')
        }
        return data = await res.json();
    }

    // delete data by id
    async deleteDataById(endpoint, id) {
        const requestOptions = { method: 'DELETE' }
        const res = await fetch(`${this.baseURL}${endpoint}${id}`, requestOptions)
        if (!res) {
            throw new Error('failed to delete entry')
        }
        const data = res.json()
        return data
    }
}

export default ToDoProvider

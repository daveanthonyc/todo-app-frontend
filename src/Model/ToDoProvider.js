class ToDoProvider {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async fetchData() {
        const res = await fetch(`${this.baseURL}`)
        if (!res) {
            throw new Error('unable to fetch from URL')
        }
        const data = await res.json();
        return data
    }

    async createData(newBody) {
        const newData = {body: newBody}
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        }

        const res = await fetch(`${this.baseURL}`, requestOptions)
        return await res.json()
    }

    async updateDataById(id, updatedEntry) {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedEntry)
        }

        const res = await fetch(`${this.baseURL}/${id}`, requestOptions)

        if (!res) {
            throw new Error('unable to update by id')
        }
        
        return await res.json();
    }

    async deleteDataById(id) {
        const requestOptions = { method: 'DELETE' }
        const res = await fetch(`${this.baseURL}/${id}`, requestOptions)

        if (!res) {
            throw new Error('failed to delete entry')
        }

        const data = res.json()
        return data
    }
}

export default ToDoProvider

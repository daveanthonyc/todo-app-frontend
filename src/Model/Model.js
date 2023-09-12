class ToDoProvider {
    constructor(baseAPIURL) {
        this.baseAPIURL = baseAPIURL
    }

    async fetchData(endPoint) {
        try {
            const res = await fetch(`${this.baseAPIURL}/${endPoint}`)
            if (!res) {
                throw new Error('Failed to fetch Data from endpoint')
            }
        } catch (error) {
            throw new Error('Server error')
        }
    }
}
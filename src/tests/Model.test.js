import { expect, test, describe } from 'vitest'
import ToDoProvider from '../Model/ToDoProvider'
import Model from '../Model/Model'

describe('Model works together', () => {
    // test('provider fetch all data', async () => {
    //     return new Promise((resolve) => {
    //         const test = new ToDoProvider('http://localhost:3000')
    //         const result = test.fetchData('/v1/todos')
    //         resolve()
    //         expect(result).toEqual([{"_id":"64f73ebba235c8942acbf34d","body":"Do dishes","completed":false}])
    
    //     })
    // })

    // test('provider fetch by Id', async () => {
    //     return new Promise((resolve) => {
    //         const test = new ToDoProvider('http://localhost:3000')
    //         const result = test.fetchDataById('/v1/todos', '64f73ebba235c8942acbf34d')
    //         resolve()
    //         expect(result).toEqual([{"_id":"64f73ebba235c8942acbf34d","body":"Do dishes","completed":false}])
    
    //     })
    // })

    // test('provider creates new entry', async () => {
    //     async function createData(endpoint, newBody) {
    //         const newData = {body: newBody}
    //         const requestOptions = {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(newData)
    //         }
    
    //         const res = await fetch(`http://localhost:3000${endpoint}`, requestOptions)
    //         const parse = await res.json()
    //         return parse
    //     }

    //     return new Promise((resolve) => {
    //         const provider = new ToDoProvider('http://localhost:3000')
    //         const test = provider.createData('/v1/todos', "should be perf with class");
    //         resolve()
    //         expect(test).toEqual('test3')
    //     })
    // })

    // test('provider deletes entry by id', async () => {
    //     return new Promise((resolve) => {
    //         const provider = new ToDoProvider('http://localhost:3000')
    //         const res = provider.deleteDataById('/v1/todos/', '6500906f3b261bc3314ee5fc')
    //         resolve();
    //         expect(res).toBe('testing')
    //     })
    // })

    // test('provider updates by id', async () => {
    //     return new Promise((resolve) => {
    //         const provider = new ToDoProvider('http://localhost:3000')
    //         const res = provider.updateDataById('/v1/todos/', '64f73ebba235c8942acbf34d', {body:"full complete",completed: false} )
    //         resolve();
    //         expect(res).toEqual('thing')
    //     })
        
    // })
    
    test('model takes in provider as dependency and can fetch data', () => {
        const provider = new ToDoProvider('http://localhost:3000')
        const model = new Model(provider)
    
        return new Promise((resolve) => {
            model.initialiseData('/v1/todos')
            resolve()
            expect(model.getToDos()).toEqual([{"_id":"64f73ebba235c8942acbf34d","body":"Do dishes","completed":false}])
        })
    })
})

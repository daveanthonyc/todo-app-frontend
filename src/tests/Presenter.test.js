import { expect, test, describe } from 'vitest'
import ToDoProvider from '../Model/ToDoProvider'
import Model from '../Model/Model'
import Presenter from '../Presenter/Presenter'

describe('Presenter methods work', () => {
    const model = new Model()
    const provider = new ToDoProvider('http://localhost:3000/v1/todos')
    const presenter = new Presenter(model, provider)

    test('getAllData works', async () => {
        const res = await presenter.getAllData()
        expect(res).toEqual([{"_id":"64f73ebba235c8942acbf34d","body":"full complete","completed":false}])
    })

    
})
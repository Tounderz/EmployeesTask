import { makeAutoObservable } from 'mobx'

export default class EmployeeStore {
    constructor() {
        this._employees = []
        this._selectedEmployee = {}

        makeAutoObservable(this)
    }

    setEmployees(employees) {
        this._employees = employees
    }
    
    get employees() {
        return this._employees
    }

    setSelectedEmployee(employee) {
        this._selectedEmployee = employee
    }

    get selectedEmployee() {
        return this._selectedEmployee
    }
}
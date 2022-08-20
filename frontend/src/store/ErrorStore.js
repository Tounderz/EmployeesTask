import { makeAutoObservable } from 'mobx'

export default class ErrorStore {
    constructor() {
        this._messageError = ''

        makeAutoObservable(this)
    }

    setMessageError(message) {
        this._messageError = message
    }
    
    get messageError() {
        return this._messageError
    }
}
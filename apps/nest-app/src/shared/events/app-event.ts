// create an abstarct class for app events
export abstract class AppEvent<T = any> {
    constructor(public payload: T) { }
}
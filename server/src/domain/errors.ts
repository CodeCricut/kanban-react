export class EntityNotInParentError extends Error {
    constructor(msg: string = "Entity not in parent.") {
        super(msg);
        this.name = "EntityNotInParentError";
    }
}

export class InvalidColumnIndexError extends Error {
    constructor(msg: string = "Invalid column index.") {
        super(msg);
        this.name = "InvalidColumnIndexError";
    }
}

export class EntityNotInParentError extends Error {
    constructor(msg: string = "Entity not in parent.") {
        super(msg);
        this.name = "EntityNotInParentError";
    }
}

export class IndexOutOfBoundsError extends Error {
    constructor(msg: string = "Index out of bounds.") {
        super(msg);
        this.name = "IndexOutOfBoundsError";
    }
}

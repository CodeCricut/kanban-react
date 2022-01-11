export class EntityNotInParentError extends Error {
    constructor(msg: string = "Entity not in parent.") {
        super(msg);
        this.name = "EntityNotInParentError";
    }
}

export class NotFoundError extends Error {
    constructor(msg: string = "Not found.") {
        super(msg);
        this.name = "NotFoundError";
    }
}

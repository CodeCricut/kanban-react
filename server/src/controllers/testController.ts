import { Request, Response } from "express";

export class TestController {
    public testHandler(req: Request, res: Response) {
        res.send("Hello world :)");
    }
}

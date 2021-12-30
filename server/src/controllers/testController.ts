import { get } from "mongoose";
import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Query,
    Route,
    SuccessResponse,
} from "tsoa";

@Route("test")
export class TestController extends Controller {
    @Get("{id}")
    public async test(@Path() id: number): Promise<string> {
        return Promise.resolve(`you queried the api with ${id}`);
    }
}

import { ICommandHandler } from "../commandHandler";

export type TestCommand = {
    prop: string;
};

export class TestCommandHandler
    implements ICommandHandler<TestCommand, string>
{
    private _dep: string;
    constructor(dependency: string) {
        this._dep = dependency;
    }

    handle(command: TestCommand): Promise<string> {
        console.log(command.prop);
        console.log(this._dep);
        return Promise.resolve("hello");
    }
}

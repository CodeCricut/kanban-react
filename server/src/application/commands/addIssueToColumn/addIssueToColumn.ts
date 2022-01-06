import { ICommandHandler } from "../../commandHandler";
import { GetColumnDto, IColumnRepository } from "../../contracts/column";
import {
    GetIssueDto,
    IIssueRepository,
    PostIssueDto,
} from "../../contracts/issue";

export type AddIssueToColumnCommand = {
    columnId: string;
    issueIndex: number;
    name: string;
    description?: string;
    createdAt: string;
};

export class AddIssueToColumnHandler
    implements ICommandHandler<AddIssueToColumnCommand, GetColumnDto>
{
    constructor(
        private columnRepo: IColumnRepository,
        private issueRepo: IIssueRepository
    ) {}

    async handle(command: AddIssueToColumnCommand): Promise<GetColumnDto> {
        const parentColumn = await this.columnRepo.read(command.columnId);
        if (
            command.issueIndex > parentColumn.issues.length ||
            command.issueIndex < 0
        )
            throw new Error("Tried inserting issue at invalid index");

        const postDto: PostIssueDto = command;

        // Create the issue
        const created = await this.issueRepo.create(postDto);

        // Add the issue to the column at the correct index
        parentColumn.issues.splice(command.issueIndex, 0, created.id);

        return await this.columnRepo.update(parentColumn.id, parentColumn);
    }
}

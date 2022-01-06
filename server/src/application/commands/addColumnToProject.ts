import { ICommandHandler } from "../commandHandler";
import {
    GetColumnDto,
    IColumnRepository,
    PostColumnDto,
} from "../contracts/column";
import { GetProjectDto, IProjectRepository } from "../contracts/project";

export type AddColumnToProjectCommand = {
    projectId: string;
    columnIndex: number;
    name: string;
    description?: string;
    createdAt: string;
};

export class AddColumnToProjectHandler
    implements ICommandHandler<AddColumnToProjectCommand, GetProjectDto>
{
    constructor(
        private projectRepo: IProjectRepository,
        private columnRepo: IColumnRepository
    ) {}

    async handle(command: AddColumnToProjectCommand): Promise<GetProjectDto> {
        const parentProject = await this.projectRepo.read(command.projectId);
        if (
            command.columnIndex > parentProject.columns.length ||
            command.columnIndex < 0
        )
            throw new Error("Tried inserting column at invalid index");

        const postDto: PostColumnDto = command;
        const created = await this.columnRepo.create(postDto);

        parentProject.columns.splice(command.columnIndex, 0, created.id);

        return await this.projectRepo.update(parentProject.id, parentProject);
    }
}

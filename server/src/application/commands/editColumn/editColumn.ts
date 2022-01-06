import { ICommandHandler } from "../../commandHandler";
import {
    GetColumnDto,
    IColumnRepository,
    UpdateColumnDto,
} from "../../contracts/column";

export type EditColumnCommand = {
    id: string;
    name: string;
    description: string;
};

export class EditColumnHandler
    implements ICommandHandler<EditColumnCommand, GetColumnDto>
{
    constructor(private columnRepository: IColumnRepository) {}

    async handle(command: EditColumnCommand): Promise<GetColumnDto> {
        const existingColumn = await this.columnRepository.read(command.id);

        const updateDto: UpdateColumnDto = {
            name: command.name,
            description: command.description,
            issues: existingColumn.issues, // TODO: I don't think this even needs to be a property on the update dto
        };

        return await this.columnRepository.update(command.id, updateDto);
    }
}

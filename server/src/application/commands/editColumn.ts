import {
    readColumn,
    updateColumn,
} from "../../persistence/column/ColumnRepository";
import { UpdateColumnDto } from "../contracts/column";

type EditColumnCommand = {
    id: string;
    name: string;
    description: string;
};

export async function editColumn(command: EditColumnCommand) {
    const existingColumn = await readColumn(command.id);

    const updateDto: UpdateColumnDto = {
        name: command.name,
        description: command.description,
        issues: existingColumn.issues,
    };

    return await updateColumn(command.id, updateDto);
}

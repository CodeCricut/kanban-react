import {
    readIssue,
    updateIssue,
} from "../../persistence/issues/IssueRepository";
import { UpdateIssueDto } from "../contracts/issue";

type EditIssueCommand = {
    id: string;
    name: string;
    description: string;
};

export async function handleEditIssueCommand(command: EditIssueCommand) {
    const existingIssue = await readIssue(command.id);
    if (!existingIssue) throw new Error("Tried updating non-existant issue.");

    const updateDto: UpdateIssueDto = {
        name: command.name,
        description: command.description,
    };
    return await updateIssue(command.id, updateDto);
}

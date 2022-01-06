import { Issue } from "../../domain/issue";
import { IColumnsApiService } from "../contracts/columnsApiService";

type Dependencies = {
    columnsApiService: IColumnsApiService;
};

export async function getColumnIssues(
    columnId: string,
    { columnsApiService }: Dependencies
): Promise<Issue[]> {
    return await columnsApiService.getColumnIssues(columnId);
}

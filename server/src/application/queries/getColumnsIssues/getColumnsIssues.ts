import { IColumnRepository } from "../../contracts/column";
import { GetIssueDto, IIssueRepository } from "../../contracts/issue";
import { IQueryHandler } from "../../queryHandler";

export type GetColumnsIssuesQuery = {
    columnId: string;
};

export class GetColumnsIssuesHandler
    implements IQueryHandler<GetColumnsIssuesQuery, GetIssueDto[]>
{
    constructor(
        private columnRepo: IColumnRepository,
        private issueRepo: IIssueRepository
    ) {}

    async handle(query: GetColumnsIssuesQuery): Promise<GetIssueDto[]> {
        const column = await this.columnRepo.read(query.columnId);
        return await this.issueRepo.readArray(column.issues);
    }
}

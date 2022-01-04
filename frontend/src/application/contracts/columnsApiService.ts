import { Column } from "../../domain/column";

export interface IColumnsApiService {
    editColumn(id: string, name: string, description: string): Promise<Column>;
    deleteColumn(columnId: string, projectId: string): Promise<void>;
}

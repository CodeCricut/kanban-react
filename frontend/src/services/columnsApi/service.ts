import axios from "axios";
import { IColumnsApiService } from "../../application/contracts/columnsApiService";
import { AppConfig } from "../../config";
import { Column } from "../../domain/column";

export class ColumnsApiService implements IColumnsApiService {
    constructor(private _config: AppConfig) {}

    editColumn = async (
        id: string,
        name: string,
        description: string
    ): Promise<Column> => {
        const requestBody = {
            name,
            description,
        };
        const response = await axios.put(
            this._config.editColumnRoute(id),
            requestBody
        );
        const returnedColumn: Column = response.data;
        return returnedColumn;
    };
}

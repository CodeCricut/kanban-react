import { IColumnsApiService } from "../../application/contracts/columnsApiService";
import { appConfig } from "../../config";
import { ColumnsApiService } from "./service";

const service = new ColumnsApiService(appConfig); // TODO: should be a hook so we can inject app config

export function useColumnsApiService(): IColumnsApiService {
    return service;
}

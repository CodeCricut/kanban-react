import { IIssuesApiService } from "../../application/contracts/issuesApiService";
import { appConfig } from "../../config";
import { IssuesApiService } from "./service";

const service = new IssuesApiService(appConfig);

export function useIssuesApiService(): IIssuesApiService {
    return service;
}

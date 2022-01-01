import { useContext } from "react";
import { ISelectedProjectService } from "../../application/contracts/selectedProjectService";
import { SelectedProjectContext } from "./contextService";

export function useSelectedProjectService(): ISelectedProjectService {
    return useContext(SelectedProjectContext);
}

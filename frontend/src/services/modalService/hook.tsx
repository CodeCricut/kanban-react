import { useContext } from "react";
import { IModalService } from "../../application/contracts/modalService";
import { ModalContext } from "./contextService";

export function useModalService(): IModalService {
    return useContext(ModalContext);
}

import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    ReactNode,
} from "react";
import { IModalService } from "../../application/contracts/modalService";

export const ModalContext = createContext<IModalService>({} as IModalService);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [modal, setModal] = useState<ReactNode | null>(null);
    const unsetModal = useCallback(() => {
        setModal(null);
    }, [setModal]);

    return (
        <ModalContext.Provider
            value={{
                setModal,
                unsetModal,
            }}
        >
            {children}
            {modal}
        </ModalContext.Provider>
    );
};

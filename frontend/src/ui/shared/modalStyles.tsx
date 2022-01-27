import { SxProps } from "@mui/system";
type ModalStylesType = {
    modalContent: SxProps;
};

const modalStyles: ModalStylesType = {
    modalContent: {
        minWidth: {
            xs: "50vw",
            md: "30vw",
        },
    },
};

export default modalStyles;

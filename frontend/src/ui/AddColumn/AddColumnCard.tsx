import React from "react";
import { Card, Typography, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { SxProps } from "@mui/system";
import { columnStyles } from "../shared/columnStyles";

type StylesType = {
    container: SxProps;
    content: SxProps;
};

const styles: StylesType = {
    container: {
        ...columnStyles,
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
    },
    content: {
        display: "flex",
        alignSelf: "center",
        "&:hover": {
            textDecoration: "underline",
            cursor: "pointer",
        },
    },
};

type AddColumnProps = {
    handleAdd: () => void;
};

export const AddColumnCard = (props: AddColumnProps) => {
    return (
        <Card sx={styles.container} variant="outlined">
            <Box sx={styles.content}>
                <AddIcon />
                <Typography onClick={props.handleAdd}>Add column</Typography>
            </Box>
        </Card>
    );
};

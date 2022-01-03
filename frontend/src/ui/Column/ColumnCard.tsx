import React from "react";
import { Card, Typography, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { SxProps } from "@mui/system";
import { columnStyles } from "../shared/columnStyles";
import { Column as ColumnModel } from "../../domain/column";

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

type ColumnProps = {
    column: ColumnModel;
};

export const ColumnCard = ({ column }: ColumnProps) => {
    return (
        <Card sx={styles.container} variant="outlined">
            <Box sx={styles.content}>{column.name}</Box>
        </Card>
    );
};

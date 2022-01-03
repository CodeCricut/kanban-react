import React from "react";
import { Card, Typography, Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { SxProps } from "@mui/system";
import { columnStyles } from "../shared/columnStyles";
import { Column as ColumnModel } from "../../domain/column";

type StylesType = {
    container: SxProps;
    header: SxProps & {
        info: SxProps;
    };
    content: SxProps;
};

const styles: StylesType = {
    container: {
        ...columnStyles,
        display: "flex",
        flexDirection: "column",
        padding: 1,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        info: {
            display: "flex",
            "& > *": {
                fontSize: "1.25rem",
                marginRight: 1,
            },
        },
    },
    content: {
        backgroundColor: "red",
    },
};

type ColumnProps = {
    column: ColumnModel;
};

export const ColumnCard = ({ column }: ColumnProps) => {
    const handleAddIssue = () => {
        console.log("add issue");
    };

    return (
        <Card sx={styles.container} variant="outlined">
            <Box sx={styles.header}>
                <Box sx={styles.header.info}>
                    <Typography>{column.issues?.length ?? 0}</Typography>
                    <Typography>{column.name}</Typography>
                </Box>
                <Box>
                    <IconButton onClick={handleAddIssue}>
                        <AddIcon />
                    </IconButton>
                </Box>
            </Box>
            <Box sx={styles.content}>content</Box>
        </Card>
    );
};

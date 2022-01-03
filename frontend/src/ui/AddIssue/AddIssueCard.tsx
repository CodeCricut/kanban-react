import React from "react";
import { Card, Typography, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { SxProps } from "@mui/system";
import { issueCardStyles } from "../shared/issueCardStyles";

type StylesType = {
    container: SxProps;
    content: SxProps;
};

const styles: StylesType = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        ...issueCardStyles,
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

type AddIssueProps = {
    handleAdd: () => void;
};

export const AddIssueCard = (props: AddIssueProps) => (
    <Card sx={styles.container} variant="outlined">
        <Box sx={styles.content}>
            <AddIcon />
            <Typography onClick={props.handleAdd}>Add issue</Typography>
        </Box>
    </Card>
);

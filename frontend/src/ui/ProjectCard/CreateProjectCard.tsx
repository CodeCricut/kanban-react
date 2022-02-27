import React from "react";
import { Card, Typography, Box } from "@mui/material";
import { SxProps } from "@mui/system";
import { Project } from "../../domain/project";
import { useNavigate, Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

type StylesType = {
    container: SxProps;
    content: SxProps;
};
const styles: StylesType = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        maxHeight: 100,
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

type Props = {
    handleAdd: () => void;
};
export const CreateProjectCard = ({ handleAdd }: Props) => {
    return (
        <Card variant="outlined" sx={styles.container}>
            <Box sx={styles.content}>
                <AddIcon />
                <Typography onClick={() => handleAdd()}>
                    Create project
                </Typography>
            </Box>
        </Card>
    );
};

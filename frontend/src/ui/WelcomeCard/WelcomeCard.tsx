import React from "react";
import { Card, Typography, Box, IconButton, CardMedia } from "@mui/material";
import { SxProps } from "@mui/system";

type StylesType = {
    container: SxProps;
    gutter: SxProps;
    content: SxProps & {
        header: SxProps;
        description: SxProps;
    };
};

const styles: StylesType = {
    container: {
        display: "flex",
        alignItems: "stretch",
        padding: 2,
        maxWidth: 600
    },
    gutter: {
        backgroundColor: "info.dark",
        width: 75,
        margin: -2,
        marginRight: 2,
    },
    content: {
        display: "flex",
        flexDirection: "column",
        header: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            height: "fit-content",
            fontSize: "1.5rem",
        },
        description: {
            fontSize: ".9rem",
            color: "text.secondary",
        },
    },
};

export const WelcomeCard = () => {
    return (
        <Card sx={{ ...styles.container } as SxProps} elevation={2}>
            <Box sx={styles.gutter} />
            <Box sx={styles.content}>
                <Box sx={styles.content.header}>
                    <Typography sx={styles.content.header}>Welcome</Typography>
                </Box>
                <Typography sx={styles.content.description}>
                    Kanban-React is an Kanban board implemented in React. To get started,
                    create a new project or select an existing one. 
                </Typography>
            </Box>
        </Card>
    );
};

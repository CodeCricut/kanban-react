import React from "react";
import { SxProps } from "@mui/system";
import { AppBarHeader } from "./AppBarHeader";
import { AuthButton } from "./AuthButton";
import { ProfileButton } from "./ProfileButton";
import { useNavigate } from "react-router-dom";
import { Toolbar, AppBar, Box } from "@mui/material";

type StylesType = {
    toolbar: SxProps;
    toolbarHeader: SxProps;
    centerContainer: SxProps;
    rightContainer: SxProps;
};
const styles: StylesType = {
    toolbar: {
        display: "grid",
        gridTemplateColumns: {
            xs: "1fr 11fr auto",
            sm: "1fr 2fr 1fr auto",
        },
    },
    toolbarHeader: {
        display: "flex",
        flexGrow: 1,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    centerContainer: {
        display: "flex",
    },
    rightContainer: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row-reverse",
        marginLeft: {
            xs: 2,
        },
        "& > *": {
            marginLeft: 2,
        },
    },
};

export const KanbanAppBar = () => {
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Toolbar sx={styles.toolbar}>
                <Box sx={styles.toolbarHeader}>
                    <AppBarHeader title={"kanban-react"} />
                </Box>
                <Box sx={styles.centerContainer}></Box>
                <Box sx={styles.rightContainer}>
                    <ProfileButton />
                    <AuthButton />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

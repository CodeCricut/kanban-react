import React from 'react'
import {
    Toolbar,
    Typography,
    InputBase,
    IconButton,
    AppBar,
    Box,
} from "@mui/material";
import { SxProps } from "@mui/system";
import { AppBarHeader } from './AppBarHeader';
import { AuthButton } from './AuthButton';

type StylesType ={
    toolbar: SxProps;
    toolbarHeader: SxProps;
    centerContainer: SxProps;
    rightContainer: SxProps;
}
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
        flexDirection: "row-reverse",
        marginLeft: {
            xs: 2,
        },
    },
};

export const KanbanAppBar = () => {
    return (
        <AppBar position="static">
            <Toolbar sx={styles.toolbar}>
                <Box sx={styles.toolbarHeader}>
                    <AppBarHeader
                        title={"kanban-react"}
                    />
                </Box>
                <Box sx={styles.centerContainer}>
                </Box>
                <Box sx={styles.rightContainer}>
                    <AuthButton/>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

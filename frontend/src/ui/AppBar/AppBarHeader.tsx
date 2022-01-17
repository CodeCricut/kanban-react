import React from "react";

import { IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { SxProps } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";

type StylesType = {
    menuButton: SxProps;
    title: SxProps;
};
const styles: StylesType = {
    menuButton: {
        marginRight: 2,
    },
    title: {
        display: {
            xs: "none",
            sm: "block",
        },
    },
};
type AppBarHeaderProps = {
    handleOpenDrawer: () => void;
    title: string;
};
export const AppBarHeader = ({
    handleOpenDrawer,
    title,
}: AppBarHeaderProps) => {
    return (
        <React.Fragment>
            <IconButton
                edge="start"
                sx={styles.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={handleOpenDrawer}
            >
                <MenuIcon />
            </IconButton>
            <Typography sx={styles.title} variant="h6" noWrap>
                <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                    {title}
                </Link>
            </Typography>
        </React.Fragment>
    );
};

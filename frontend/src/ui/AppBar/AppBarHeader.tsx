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
    title: string;
};
export const AppBarHeader = ({
    title,
}: AppBarHeaderProps) => {
    return (
        <React.Fragment>
            <Typography sx={styles.title} variant="h6" noWrap>
                <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                    {title}
                </Link>
            </Typography>
        </React.Fragment>
    );
};

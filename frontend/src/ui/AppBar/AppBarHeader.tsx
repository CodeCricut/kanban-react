import React from "react";

import { Typography, Box } from "@mui/material";
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
        fontSize: 30,
        display: {
            xs: "none",
            sm: "block",
        },
    },
};
type AppBarHeaderProps = {
    title: string;
};
export const AppBarHeader = ({ title }: AppBarHeaderProps) => {
    const navigate = useNavigate();

    return (
        <React.Fragment>
            <Box
                component="img"
                sx={{
                    height: 45,
                    width: 45,
                    objectFit: "cover",
                    "&:hover": {
                        cursor: "pointer",
                    },
                }}
                alt="Kanban React Logo"
                src="/KR_Logo.svg"
                onClick={() => navigate("/")}
            />
            <Typography sx={styles.title} variant="h2" noWrap>
                <Link
                    to="/"
                    style={{
                        color: "inherit",
                        textDecoration: "none",
                        verticalAlign: "center",
                    }}
                >
                    {title}
                </Link>
            </Typography>
        </React.Fragment>
    );
};

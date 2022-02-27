import React, { useEffect, useState } from "react";
import { SxProps } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useIsLoggedIn } from "../../application/isLoggedIn/hook";
import { IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const styles: SxProps = {
    color: "primary.contrastText",
    padding: -1,
    fontSize: 30,
};
export const ProfileButton = () => {
    const isLoggedIn = useIsLoggedIn();
    const navigate = useNavigate();

    console.log(isLoggedIn);

    return (
        <IconButton
            onClick={() => navigate("/me")}
            sx={{ ...styles, display: isLoggedIn ? "block" : "none" }}
        >
            <AccountCircleIcon fontSize="inherit" />
        </IconButton>
    );
};

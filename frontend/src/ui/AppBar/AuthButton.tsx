import React from 'react'
import {Button} from "@mui/material"
import {SxProps} from "@mui/system"

const styles:SxProps = {
    color: "primary.contrastText"
}
export const AuthButton = () => {
    return (
        <Button sx={styles} variant="outlined" color="inherit" onClick={() => console.log("auth")}>Register</Button>
    )
}

import React, { useEffect, useState } from 'react'
import {Button} from "@mui/material"
import {SxProps} from "@mui/system"
import { useGetLoggedInUser } from '../../application/getLoggedInUser/hook'
import { useNavigate } from 'react-router-dom'
import { useLogOut } from '../../application/logOut/hook'

const styles:SxProps = {
    color: "primary.contrastText"
}
export const AuthButton = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean|undefined>()

    const getLoggedInUser = useGetLoggedInUser()
    const logOut = useLogOut();
    const navigate = useNavigate();
    useEffect(() => {
        getLoggedInUser().then(result => setIsLoggedIn(!!result))
    }, [getLoggedInUser])

    const handleClick = () => {
        if (isLoggedIn){
            logOut();
            navigate("/login")
        } else {
            navigate("/login")
        }
    }
    
    return (
        <Button sx={styles} variant="outlined" color="inherit" onClick={handleClick}>
            {isLoggedIn ? <>Logout</> : <>Login</>}
        </Button>
    )
}

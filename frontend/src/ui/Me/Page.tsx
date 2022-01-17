import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import {SxProps} from "@mui/system"
import moment from "moment";
import { Link, useNavigate } from 'react-router-dom'
import { useGetLoggedInUser, useLoggedInUser } from '../../application/getLoggedInUser/hook'
import { PrivateUser } from '../../domain/privateUser';


type StylesType = {
    container: SxProps,
    username: SxProps,
    joined: SxProps
}
const styles: StylesType = {
    container: {
        padding: 2
    },
    username: {
        fontSize: 24
    },
    joined: {
        color: "grey.700"
    }
}
export const MePage = () => {
    const [user, setUser] = useState<PrivateUser|undefined>();

    const navigate = useNavigate()
    const getLoggedInUser = useGetLoggedInUser()

    useEffect(() => {
        getLoggedInUser().then(loaded => {
            if (loaded) setUser(loaded);
            else navigate("/register")
        })
    }, [getLoggedInUser])

    return (
        <Box sx={styles.container}>
            <Typography variant='h3' sx={styles.username}>{user?.username}</Typography> 
            <Typography variant="subtitle2" sx={styles.joined}>Joined {moment(new Date(user?.createdAt ?? new Date())).format()}</Typography>
            <Link to="/me/projects">{user?.projects?.length} projects</Link>
        </Box>
    )
}

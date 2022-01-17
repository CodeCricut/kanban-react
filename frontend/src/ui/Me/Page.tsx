import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoggedInUser } from '../../application/getLoggedInUser/hook'

export const MePage = () => {
    const navigate = useNavigate()
    const user = useLoggedInUser()

    if (!user){
        navigate("/")
    }

    return (
        <div>
            {user?.id}
            {user?.username}
            {user?.email}
            {user?.createdAt}
            {user?.projects?.map((projId, index) => <React.Fragment key={index}>{projId}</React.Fragment>)}
        </div>
    )
}

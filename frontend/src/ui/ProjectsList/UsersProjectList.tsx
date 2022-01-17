import React from 'react'
import { useUsersProjects } from '../../application/getUsersProjects/hook'
import { Project } from '../../domain/project'
import { ProjectsList } from './ProjectsList'

export const UsersProjectList = () => {
    const usersProjects = useUsersProjects()
    
    const handleSelect = (project: Project) => {
        console.log("handle proj select")
    }
    return (
        <ProjectsList projects={usersProjects} handleSelect={handleSelect}/>
    )
}

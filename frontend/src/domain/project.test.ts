import { Project, removeProject, updateProject } from "./project";

const originalProjects: Project[] = [
    {
        id: "ID_1",
        name: "PROJECT 1",
        description: "DESCRIPTION 1",
        columns: [],
        createdAt: "NOW",
    },
    {
        id: "ID_2",
        name: "PROJECT 2",
        description: "DESCRIPTION 2",
        columns: [],
        createdAt: "NOW",
    },
];

describe("updateProject", () => {
    it("updates the project with the matching id", () => {
        const projectToUpdate = originalProjects[0];
        const projectUpdateRef: Project = {
            ...projectToUpdate,
            name: "UPDATED NAME",
            description: "UPDATED DESCRIPTION",
        };

        // Get the updated projects (doesn't modify original projectes)
        const updatedProjects = updateProject(
            projectUpdateRef,
            originalProjects
        );

        // Assert updated projects contains updated ref at same index
        const updatedProject = updatedProjects[0];

        expect(updatedProject.id).toEqual(projectToUpdate.id);
        expect(updatedProject.name).toEqual(projectUpdateRef.name);
        expect(updatedProject.description).toEqual(
            projectUpdateRef.description
        );
        expect(updatedProject.columns).toEqual(projectUpdateRef.columns);
        expect(updatedProject.createdAt).toEqual(projectUpdateRef.createdAt);
    });

    it("throws if no project with matching", () => {
        expect(() => {
            updateProject(originalProjects[0], []);
        }).toThrow(Error);
    });
});

describe("removeProject", () => {
    it("does not modify original projects", () => {
        const originalProjectsCopy = [...originalProjects];
        const projectToDelete = originalProjects[0];

        // Remove the project
        removeProject(projectToDelete.id ?? "", originalProjects);

        // Assert original projects not modified
        expect(originalProjects).toEqual(originalProjectsCopy);
    });

    it("removes the project with the matching id", () => {
        const projectToDelete = originalProjects[0];
        expect(originalProjects).toContain(projectToDelete);

        // Remove the project
        const updatedProjects = removeProject(
            projectToDelete.id ?? "",
            originalProjects
        );

        // Assert updated projects does not contain the project
        expect(updatedProjects).not.toContain(projectToDelete);
    });

    it("throws if no project with matching id", () => {
        expect(() => {
            removeProject("ID", []);
        }).toThrow(Error);
    });
});

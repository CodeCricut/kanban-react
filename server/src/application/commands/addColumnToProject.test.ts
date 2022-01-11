import * as columnRepository from "../../persistence/project/ColumnRepository";
import * as projectRepository from "../../persistence/repository/ProjectRepository";
import { handleAddColumnToProjectCommand } from "./addColumnToProject";
import {
    createValidPostColumnDto,
    createValidGetColumnDto,
} from "../../test-helpers/columnFixtures";
import { GetProjectDto } from "../contracts/project";
import { createValidGetProjectDto } from "../../test-helpers/projectFixtures";

test("should throw if invalid project id", async () => {
    const invalidProjId = "INVALID ID";
    const errorMsg = "Invalid project id";
    jest.spyOn(projectRepository, "readProject").mockRejectedValueOnce(
        new Error(errorMsg)
    );

    const postColumnDto = createValidPostColumnDto();
    await expect(async () => {
        await handleAddColumnToProjectCommand({
            columnIndex: 0,
            ...postColumnDto,
            projectId: invalidProjId,
        });
    }).rejects.toThrowError(errorMsg);
});

test("should throw if index below range", async () => {
    const parentProject = createValidGetProjectDto([]);
    jest.spyOn(projectRepository, "readProject").mockReturnValueOnce(
        Promise.resolve(parentProject)
    );
    const indexBelowRange = -1;

    const postColumnDto = createValidPostColumnDto();
    await expect(async () => {
        await handleAddColumnToProjectCommand({
            columnIndex: indexBelowRange,
            ...postColumnDto,
            projectId: parentProject.id,
        });
    }).rejects.toThrowError("Tried inserting column at invalid index");
});

test("should throw if index above range", async () => {
    const parentProject = createValidGetProjectDto([]);
    jest.spyOn(projectRepository, "readProject").mockReturnValueOnce(
        Promise.resolve(parentProject)
    );
    const indexAboveRange = parentProject.columns.length + 1;

    const postColumnDto = createValidPostColumnDto();
    await expect(async () => {
        await handleAddColumnToProjectCommand({
            columnIndex: indexAboveRange,
            ...postColumnDto,
            projectId: parentProject.id,
        });
    }).rejects.toThrowError("Tried inserting column at invalid index");
});

test("should create column and update the parent project", async () => {
    // Mock parent project
    const parentProject = createValidGetProjectDto([]);
    const readProjectSpy = jest
        .spyOn(projectRepository, "readProject")
        .mockResolvedValueOnce(parentProject);

    // Mock created column
    const getColumnDto = createValidGetColumnDto();
    const createColumnSpy = jest
        .spyOn(columnRepository, "createColumn")
        .mockResolvedValueOnce(getColumnDto);

    // Mock update function
    const updateProjectSpy = jest
        .spyOn(projectRepository, "updateProject")
        .mockResolvedValueOnce(parentProject);

    // Act
    const postColumnDto = createValidPostColumnDto();
    await handleAddColumnToProjectCommand({
        columnIndex: 0,
        ...postColumnDto,
        projectId: parentProject.id,
    });

    // Expect project read
    expect(readProjectSpy).toHaveBeenCalled();

    // Expect column created
    expect(createColumnSpy).toHaveBeenCalled();

    // Expect project updated
    expect(updateProjectSpy).toHaveBeenCalled();
});

test("should returned updated parent project", async () => {
    // Mock parent project
    const parentProject = createValidGetProjectDto([]);
    jest.spyOn(projectRepository, "readProject").mockResolvedValueOnce(
        parentProject
    );

    // Mock created column
    const getColumnDto = createValidGetColumnDto();
    jest.spyOn(columnRepository, "createColumn").mockResolvedValueOnce(
        getColumnDto
    );

    // Mock update function
    const mockUpdatedProject = createValidGetProjectDto([getColumnDto.id]);
    jest.spyOn(projectRepository, "updateProject").mockResolvedValueOnce(
        mockUpdatedProject
    );

    // Act
    const postColumnDto = createValidPostColumnDto();
    const returnedProject = await handleAddColumnToProjectCommand({
        columnIndex: 0,
        ...postColumnDto,
        projectId: parentProject.id,
    });

    // Expect updated project to be returned
    expect(returnedProject).toEqual(mockUpdatedProject);
});

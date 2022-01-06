import { Router } from "express";
import { Config } from "../config";
import { CreateProjectHandler } from "./application/commands/createProject/createProject";
import { ProjectController } from "./controllers/projectController";
import { makeApiRouter } from "./routers/api";
import { makeDocsRouter } from "./routers/docsRouter";
import { makeFrontendRouter } from "./routers/frontend";
import { makeProjectRouter } from "./routers/api/projectRouter";
import { ProjectRepository } from "./persistence/project/ProjectRepository";
import { IDatabase } from "./application/contracts/database";
import { MongoDatabase } from "./persistence/MongoDatabase";
import { IProjectRepository } from "./application/contracts/project";
import { GetAllProjectsHandler } from "./application/queries/getAllProjects/getAllProjects";
import { EditProjectHandler } from "./application/commands/editProject/editProject";
import { DeleteProjectHandler } from "./application/commands/deleteProject/deleteProject";
import { AddColumnToProjectHandler } from "./application/commands/addColumnToProject/addColumnToProject";
import { ColumnRepository } from "./persistence/column/ColumnRepository";
import { GetProjectsColumnsHandler } from "./application/queries/getProjectsColumns/getProjectsColumns";
import { makeColumnRouter } from "./routers/api/columnRouter";
import { ColumnController } from "./controllers/columnController";
import { EditColumnHandler } from "./application/commands/editColumn/editColumn";
import { DeleteColumnHandler } from "./application/commands/deleteColumn/deleteColumn";
import { ReorderColumnHandler } from "./application/commands/reorderColumn/reorderColumn";
import { AddIssueToColumnHandler } from "./application/commands/addIssueToColumn/addIssueToColumn";
import { IssueRepository } from "./persistence/issues/IssueRepository";
import { GetColumnsIssuesHandler } from "./application/queries/getColumnsIssues/getColumnsIssues";

export type AppDependencies = {
    database: IDatabase;
    projectRepository: IProjectRepository;
    createProjectHandler: CreateProjectHandler;
    projectController: ProjectController;
    projectRouter: Router;
    docRouter: Router;
    apiRouter: Router;
    frontendRouter: Router;
};

export function getAppDependencies(config: Config): AppDependencies {
    const database = new MongoDatabase();

    const projectRepository = new ProjectRepository();
    const columnRepository = new ColumnRepository();
    const issueRepository = new IssueRepository();

    // TODO: pack these handlers into a mediator object
    const createProjectHandler = new CreateProjectHandler(projectRepository);
    const getAllProjectsHandler = new GetAllProjectsHandler(projectRepository);
    const editProjectHandler = new EditProjectHandler(projectRepository);
    const deleteProjectHandler = new DeleteProjectHandler(projectRepository);
    const addColumnToProjectHandler = new AddColumnToProjectHandler(
        projectRepository,
        columnRepository
    );
    const getProjectColumnsHandler = new GetProjectsColumnsHandler(
        projectRepository,
        columnRepository
    );
    const reorderColumnRightHandler = new ReorderColumnHandler(
        projectRepository
    );

    const projectController = new ProjectController(
        createProjectHandler,
        getAllProjectsHandler,
        editProjectHandler,
        deleteProjectHandler,
        addColumnToProjectHandler,
        getProjectColumnsHandler,
        reorderColumnRightHandler
    );

    const projectRouter = makeProjectRouter(projectController);

    const editColumnHandler = new EditColumnHandler(columnRepository);
    const deleteColumnHandler = new DeleteColumnHandler(
        columnRepository,
        projectRepository
    );
    const addIssueToColumnHandler = new AddIssueToColumnHandler(
        columnRepository,
        issueRepository
    );
    const getColumnIssuesHandler = new GetColumnsIssuesHandler(
        columnRepository,
        issueRepository
    );

    const columnController = new ColumnController(
        editColumnHandler,
        deleteColumnHandler,
        addIssueToColumnHandler,
        getColumnIssuesHandler
    );
    const columnRouter = makeColumnRouter(columnController);
    const docRouter = makeDocsRouter();

    const frontendRouter = makeFrontendRouter(config);

    const apiRouter: Router = makeApiRouter(projectRouter, columnRouter);

    return {
        database,
        projectRepository,
        createProjectHandler,
        projectController,
        projectRouter,
        docRouter,
        apiRouter,
        frontendRouter,
    };
}

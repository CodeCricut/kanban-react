import { Router } from "express";
import { Config } from "../config";
import { CreateProjectHandler } from "./application/commands/createProject";
import { ProjectController } from "./controllers/projectController";
import { makeApiRouter } from "./routers/api";
import { makeDocsRouter } from "./routers/docsRouter";
import { makeFrontendRouter } from "./routers/frontend";
import { makeProjectRouter } from "./routers/api/projectRouter";
import { ProjectRepository } from "./persistence/project/ProjectRepository";
import { IDatabase } from "./application/contracts/database";
import { MongoDatabase } from "./persistence/MongoDatabase";
import { IProjectRepository } from "./application/contracts/project";
import { GetAllProjectsHandler } from "./application/queries/getAllProjects";
import { EditProjectHandler } from "./application/commands/editProject";

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

    // TODO: pack these handlers into a mediator object
    const createProjectHandler = new CreateProjectHandler(projectRepository);
    const getAllProjectsHandler = new GetAllProjectsHandler(projectRepository);
    const editProjectHandler = new EditProjectHandler(projectRepository);

    const projectController = new ProjectController(
        createProjectHandler,
        getAllProjectsHandler,
        editProjectHandler
    );

    const projectRouter = makeProjectRouter(projectController);
    const docRouter = makeDocsRouter();
    const frontendRouter = makeFrontendRouter(config);

    const apiRouter: Router = makeApiRouter(projectRouter);

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

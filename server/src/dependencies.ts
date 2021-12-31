import { Router } from "express";
import { Config } from "../config";
import { CreateProjectHandler } from "./application/commands/createProject";
import { ProjectController } from "./controllers/projectController";
import { ProjectRepository } from "./domain/repository";
import { makeApiRouter } from "./routers/api";
import { makeDocsRouter } from "./routers/docsRouter";
import { makeFrontendRouter } from "./routers/frontend";
import { makeProjectRouter } from "./routers/api/projectRouter";
import { TestProjectRepository } from "./services/testProjectRepository";

export type AppDependencies = {
    projectRepository: ProjectRepository;
    createProjectHandler: CreateProjectHandler;
    projectController: ProjectController;
    projectRouter: Router;
    docRouter: Router;
    apiRouter: Router;
    frontendRouter: Router;
};

export function getAppDependencies(config: Config): AppDependencies {
    const projectRepository = new TestProjectRepository();
    const createProjectHandler = new CreateProjectHandler(projectRepository);
    const projectController = new ProjectController(createProjectHandler);

    const projectRouter = makeProjectRouter(projectController);
    const docRouter = makeDocsRouter();
    const frontendRouter = makeFrontendRouter(config);

    const apiRouter: Router = makeApiRouter(projectRouter);

    return {
        projectRepository,
        createProjectHandler,
        projectController,
        projectRouter,
        docRouter,
        apiRouter,
        frontendRouter,
    };
}

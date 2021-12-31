import { Router } from "express";
import { CreateProjectHandler } from "./application/commands/createProject";
import { ProjectController } from "./controllers/projectController";
import { ProjectRepository } from "./domain/repository";
import { makeApiRouter } from "./routers";
import { makeDocsRouter } from "./routers/docsRouter";
import { makeProjectRouter } from "./routers/projectRouter";
import { TestProjectRepository } from "./services/testProjectRepository";

export type AppDependencies = {
    projectRepository: ProjectRepository;
    createProjectHandler: CreateProjectHandler;
    projectController: ProjectController;
    projectRouter: Router;
    docRouter: Router;
    apiRouter: Router;
};

export function getAppDependencies(): AppDependencies {
    const projectRepository = new TestProjectRepository();
    const createProjectHandler = new CreateProjectHandler(projectRepository);
    const projectController = new ProjectController(createProjectHandler);

    const projectRouter = makeProjectRouter(projectController);
    const docRouter = makeDocsRouter();

    const apiRouter: Router = makeApiRouter(projectRouter, docRouter);

    return {
        projectRepository,
        createProjectHandler,
        projectController,
        projectRouter,
        docRouter,
        apiRouter,
    };
}

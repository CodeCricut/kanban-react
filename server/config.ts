import { frontendBuildPath, frontendIndexPath } from "./src/util/paths";

export type Config = {
    frontendBuildPath: string;
    frontendIndexPath: string;
};

export const config: Config = {
    frontendBuildPath,
    frontendIndexPath,
};

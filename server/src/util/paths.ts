import path from "path";

export const baseDirectory = path.resolve();

export const frontendBuildPath = getClientBuildPath();
export const frontendIndexPath = path.join(frontendBuildPath, "index.html");

function getClientBuildPath() {
    const clientBuildPath = path.join(baseDirectory, "../frontend/build");
    if (!clientBuildPath) {
        throw new Error(
            `Could not resolve client build path.\tBase directory:${baseDirectory}`
        );
    }
    return clientBuildPath;
}

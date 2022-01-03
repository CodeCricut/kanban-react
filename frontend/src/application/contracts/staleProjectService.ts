/** Service for maintaining the "stale" projects, which are projects which have
 * been modified and need to be reloaded. When a project is stale, things like
 * its columns and issues should be reloaded.
 */
export interface IStaleProjectService {
    addStaleProject: (projectId: string) => void;
    removeStaleProject: (projectId: string) => void;
    staleProjectIds: string[];
}

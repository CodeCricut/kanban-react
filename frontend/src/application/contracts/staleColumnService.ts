/** Service for maintaining the "stale" columns, which are columns which have
 * been modified and need to be reloaded. When a column is stale, things like
 * its issues should be reloaded.
 */
export interface IStaleColumnService {
    addStaleColumn: (columnId: string) => void;
    removeStaleColumn: (columnId: string) => void;
    staleColumnIds: string[];
}

export interface IDatabase {
    initDatabase: () => Promise<void>;
    stopDatabase: () => Promise<void>;
}

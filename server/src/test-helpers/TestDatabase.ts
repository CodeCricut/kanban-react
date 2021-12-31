import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

import { IDatabase } from "../application/contracts/database";

export class TestDatabase implements IDatabase {
    private _mongoDb: MongoMemoryServer | undefined;

    async initDatabase(): Promise<void> {
        this._mongoDb = await MongoMemoryServer.create();

        const uri = this._mongoDb.getUri();
        const mongooseOpts = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        };
        await mongoose.connect(uri, mongooseOpts);
    }

    async stopDatabase(): Promise<void> {
        await mongoose.connection.close();
        await this._mongoDb?.stop();
    }

    async resetDatabase(): Promise<void> {
        await mongoose.connection.dropDatabase();
    }
}

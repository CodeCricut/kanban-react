import mongoose from "mongoose";

import { IDatabase } from "../application/contracts/database";

export class MongoDatabase implements IDatabase {
    async initDatabase(): Promise<void> {
        await mongoose.connect(getMongoConnection(), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
}

function getMongoConnection() {
    const connection = process.env.MONGODB_URI;
    if (!connection) {
        throw new Error(
            "Tried to start app without Mongo DB connection string defined. Please define a MONGODB_URI environment variable in the .env file."
        );
    }
    return connection;
}

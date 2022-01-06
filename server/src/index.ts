import { app, startApp } from "./app";
import { MongoDatabase } from "./persistence/MongoDatabase";

const database = new MongoDatabase();

database
    .initDatabase()
    .then(() => {
        startApp(app);
    })
    .catch((e) => {
        if (e instanceof Error) {
            console.error(`Couldn't start database. ${e.message}`);
        } else {
            console.error("Critical error: couldn't start database");
        }
    });

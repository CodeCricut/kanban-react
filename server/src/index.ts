import { app } from "./app";

const port = process.env.PORT || process.env.TEST_PORT;
if (!port)
    throw new Error(
        "Tried starting app without defining PORT or TEST_PORT environment variable."
    );

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

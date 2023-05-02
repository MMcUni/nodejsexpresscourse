import express from "express";
import chalk from "chalk";
import debugModule from "debug";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import sessionsRouter from './src/routers/sessionsRouter.js';
import adminRouter from './src/routers/adminRouter.js';


const debug = debugModule("app");

// Get the __dirname equivalent in an ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Set up morgan middleware for request logging
app.use(morgan("tiny"));

// Set up express.static middleware for serving static files
app.use(express.static(path.join(__dirname, "/public/")));

app.set("views", "./src/views");
app.set("view engine", "ejs");

// Mount the sessionsRouter at the /sessions path
app.use("/sessions", sessionsRouter);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
    res.render("index", { title: "HealthFitness site", data: ["a", "b", "c"] });
});

app.listen(3000, () => {
    debug(`listening to port ${chalk.green(3000)}`);
});

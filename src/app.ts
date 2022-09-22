import express from "express";
import * as path from "path";
import "couch-extensions";
import * as router from "couch-routes";
const bodyparser = require('body-parser')
import { controllers } from "./controllers";

const port = process.env.port || 8000;

const app = express();

app.use(bodyparser.json({extended: true}));
app.use(bodyparser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, "public")));

router.initialize(app, controllers);

app.listen(port, () => console.log(`web api running on port ${port}`));
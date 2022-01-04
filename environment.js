const path = require("path");

const ENV = process.env.NODE_ENV || "development";
const PATH = path.resolve(__dirname, `./.env.${ENV}`);
process.env.ENV = ENV;
require("dotenv").config({ path: PATH });

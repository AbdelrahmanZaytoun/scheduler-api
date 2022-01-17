const fs = require("fs");
const path = require("path");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const db = require("./db");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

function read(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(
      file,
      {
        encoding: "utf-8",
      },
      (error, data) => {
        if (error) return reject(error);
        resolve(data);
      }
    );
  });
}

const controllers = fs.readdirSync("./src/controllers");
module.exports = function application(
  actions = { updateAppointment: () => {} }
) {
  for (const controller of controllers) {
    const name = controller.split(".")[0];
    console.log(`/api/${name}`);
    app.use(
      `/api/${name}`,
      require(`./src/controllers/${name}`)(express.Router(), db, {
        updateAppointment: actions.updateAppointment,
      })
    );
  }
  const { ENV } = process.env;
  if (ENV === "development" || ENV === "test") {
    Promise.all([
      read(path.resolve(__dirname, `src/db/create.sql`)),
      read(path.resolve(__dirname, `src/db/${ENV}.sql`)),
    ])
      .then(([create, seed]) => {
        app.get("/api/debug/reset", (request, response) => {
          db.query(create)
            .then(() => db.query(seed))
            .then(() => {
              console.log("Database Reset");
              response.status(200).send("Database Reset");
            });
        });
      })
      .catch((error) => {
        console.log(`Error setting up the reset route: ${error}`);
      });
  }

  app.close = function () {
    return db.end();
  };
  return app;
};

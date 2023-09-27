require("dotenv").config();
const cors = require("cors");
const log4js = require("log4js");
const databaseConnect = require("./database/database");
const userRouter = require("./routes/userRouter");
const transactionRouter = require("./routes/transactionRoutes");

const express = require("express"),
  bodyParser = require("body-parser"),
  swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "in4matic",
      version: "0.1.0",
      description: "Welcome to project of group in4matic!",
      contact: {
        email: "szymonslebodawork1@gmail.com",
      },
    },
    servers: [
      {
        url: "https://in4matic-4c2abd694526.herokuapp.com/",
      },
    ],
  },
  apis: ["./routes/transactionRoutes.js", "userRouter.js"],
};

const app = express();

const specs = swaggerJsdoc(options);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

log4js.configure({
  appenders: {
    console: { type: "console" },
    file: {
      type: "file",
      filename: "logs.log",
      maxLogSize: 3 * 1024 * 1024,
      backups: 3,
    },
  },
  categories: {
    default: { appenders: ["console", "file"], level: "info" },
  },
});

const logger = log4js.getLogger();

app.use((req, res, next) => {
  const startTime = new Date();
  const separator = "----------------------------------------\n";
  logger.info(separator);
  logger.info(`Request: ${req.method} ${req.url}`);
  logger.info(`Request Body: ${JSON.stringify(req.body)}`);

  res.on("finish", () => {
    const responseTime = new Date() - startTime;
    logger.info(`Response Status: ${res.statusCode}`);
    logger.info(`Response Time: ${responseTime} ms`);
  });

  next();
});

app.use("/users", userRouter);
app.use("/transactions", transactionRouter);

const PORT = process.env.PORT || 4000;

const appStart = async () => {
  try {
    await databaseConnect();
    logger.info("MongoDB connected successfully");

    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to connect to the database:", error);
  }
};

appStart();

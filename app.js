require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const log4js = require("log4js");
const databaseConnect = require("./database/database");

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

// Routing zostanie dodany potem
app.use("/api/");

const PORT = process.env.PORT || 3000;

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

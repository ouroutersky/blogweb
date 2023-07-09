const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const tokenRouter = require("./routes/tokenRoutes");
const blogRouter = require("./routes/blogRoutes");
const rateLimit = require("express-rate-limit");
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
require("dotenv").config();

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: "what u doin, stop spamming",
});

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(express.json(), express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(limiter);

app.use("/token", tokenRouter);
app.use("/blog", blogRouter);

app.use(Sentry.Handlers.errorHandler());

module.exports = app;
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

require("dotenv").config();

const port = process.env.PORT || 5000;

const app = express();

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 60,
});

app.use(limiter);

app.set("trust proxy", 1);

const corsOptions = {
    origin: "https://rturner1989.github.io",
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/weather", require("./Routes"));

app.listen(port, () => {
    console.log(`server is running on port - ${port}`);
});

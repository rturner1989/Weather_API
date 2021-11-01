const express = require("express");
const needle = require("needle");
const router = express.Router();
const apicache = require("apicache");

const API_CURRENT_URL = process.env.API_CURRENT_URL;
const API_FORECAST_URL = process.env.API_FORECAST_URL;
const API_KEYNAME = process.env.API_KEYNAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

let cache = apicache.middleware;

const request = async (baseURL, parameters) => {
    const params = new URLSearchParams({
        [API_KEYNAME]: API_KEY_VALUE,
        ...parameters,
    });
    const response = await needle("get", `${baseURL}?${params}`);
    const data = response.body;
    if (process.env.NODE_ENV !== "production") {
        console.log(`REQUEST: ${baseURL}?${params}`);
    }
    return data;
};

// Routes
router.get("/current", cache("15 minutes"), async (req, res) => {
    try {
        const data = await request(API_CURRENT_URL, req.query);
        res.status(200).json({ success: true, results: data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;

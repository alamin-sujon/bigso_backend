"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    db_url: process.env.DB_URL,
    port: process.env.PORT,
    ebay_client_id: process.env.EBAY_CLIENT_ID,
    ebay_dev_id: process.env.EBAY_DEV_ID,
    ebay_client_secret: process.env.EBAY_CLIENT_SECRET,
    ebay_oauth_token: process.env.SANDBOX_OAUTH_TOKEN,
    redis_host: process.env.REDIS_HOST,
    redis_port: process.env.REDIS_PORT,
};

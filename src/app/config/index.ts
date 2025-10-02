import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  db_url: process.env.DB_URL,
  port: process.env.PORT,
  ebay_client_id: process.env.EBAY_CLIENT_ID,
  ebay_dev_id: process.env.EBAY_DEV_ID,
  ebay_client_secret: process.env.EBAY_CLIENT_SECRET,
  ebay_oauth_token: process.env.SANDBOX_OAUTH_TOKEN,
  redis_host: process.env.REDIS_HOST,
  redis_port: process.env.REDIS_PORT,
};

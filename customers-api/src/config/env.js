import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  SERVICE_TOKEN: process.env.SERVICE_TOKEN ||  "1234"
};
import dotenv from "dotenv";
dotenv.config();

export default {
  apps: [
    {
      name: "elitecoins-backend",
      script: "./server.js",
      env: {
        PORT: process.env.PORT,
        JWT_SECRET: process.env.JWT_SECRET,
        DATABASE_URL: process.env.DATABASE_URL,
        API_KEY: process.env.API_KEY,
        EMAIL: process.env.EMAIL,
      },
    },
  ],
};

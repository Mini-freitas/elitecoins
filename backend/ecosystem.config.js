require('dotenv').config();

module.exports = {
  apps: [
    {
      name: "elitecoins-backend",
      script: "./server.js", // mesmo caminho do seu backend
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: process.env.PORT,
        DATABASE_URL: process.env.DATABASE_URL,
        JWT_SECRET: process.env.JWT_SECRET,
       
      }
    }
  ]
};

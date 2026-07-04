/** PM2 部署：在项目根目录执行 `pm2 start ecosystem.config.cjs && pm2 save` */
const path = require("path");

module.exports = {
  apps: [
    {
      name: "rulehub",
      cwd: __dirname,
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3001",
      env: {
        NODE_ENV: "production",
        PORT: "3001",
      },
      autorestart: true,
      max_restarts: 10,
      restart_delay: 3000,
    },
  ],
};

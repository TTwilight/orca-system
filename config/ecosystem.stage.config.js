module.exports = {
  apps: [
    {
      name: "app-server",
      script: "./scripts/start-app.sh",
      watch: false,
      autorestart: true,
      env: {
        NODE_ENV: "stage",
        PORT: 8080,
      },
      error_file: "./logs/error.log",
      out_file: "./logs/out.log",
      merge_logs: true,
    },
  ],
};

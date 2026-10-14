// Em produção (Neon/Render) basta definir DATABASE_URL e DATABASE_SSL=true.
// Sem essas variáveis, mantém a configuração local do docker-compose.
module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "guest",
  password: process.env.DB_PASS || "guest",
  database: process.env.DB_NAME || "database",
  ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
  timezone: "UTC",
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  entities: ["./src/modules/**/entities/*.ts"],
  cli: {
    migrationsDir: "./src/shared/infra/typeorm/migrations",
  },
};

export default {
  // So, this will help us with Database Connection, and Schema Management
  dialect: "postgresql",
  schema: "./utils/db/schema.ts",
  out: "./drizzle",

  // This is going to be an object, that contains the Credentials & Connection Details from our "Database"
  dbCredentials: {
    url: process.env.DATABASE_URL,
    connectionString: process.env.DATABASE_URL,
  },
};
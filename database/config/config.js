export const dbDetails = {
    HOST: process.env.SINGLESTORE_HOST,
    USER: process.env.SINGLESTORE_USER,
    PASSWORD: process.env.SINGLESTORE_PASS,
    DB: process.env.SINGLESTORE_DB,
    dialect: process.env.SINGLESTORE_DRIVER || "mysql",
};
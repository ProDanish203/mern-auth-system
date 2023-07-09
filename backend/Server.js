import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnDb from "./Config/Conn.js";
import AuthRoute from "./Routes/AuthRoute.js";

dotenv.config();

ConnDb()


const app = express();


app.use(express());
app.use(express.json())
app.use(cors())


app.use("/api/v1", AuthRoute)

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is listening live on port:${port}`)
})

export default app;
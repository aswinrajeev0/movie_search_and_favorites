import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan"
import movieRouter from "./routes/movieRouter";

dotenv.config()


const app = express();
const port = process.env.PORT || 5000

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "").split(',').map(o => o.trim()).filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if(!origin || allowedOrigins.includes(origin)){
            callback(null, true);
        }else{
            callback(new Error("Not allowed by cors"))
        }
    }
}))
app.use(morgan("dev"))
app.use(express.json());
app.use("/movies", movieRouter)


app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})
import express from "express";
import cors from "cors";
import db from "./config/db";
import authRoutes from "./routes/authRoutes";
import threadsRoutes from "./routes/threadsRoutes";
import adminRoutes from "./routes/adminRoutes";

const app = express();
app.use(cors());
app.use(express.json());
const port = 7777;

app.get("/", (req, res) => {
    res.send("backend dziala!!!!");
});

app.use("/auth", authRoutes);
app.use("/threads", threadsRoutes);
app.use("/admin", adminRoutes);

db.getConnection()
    .then(() => {
        console.log("polaczono z bd");
    })
    .catch((err) => {
        console.error("blad laczenia z bd" + err);
        process.exit(1);
    });

app.listen(port, () => {
    console.log('serwer dziala na porcie: ' + port);
})
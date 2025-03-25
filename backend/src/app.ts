import express from "express";
import db from "./config/db";

const app = express();
app.use(express.json());
const port = 7777;

app.get("/", (req, res) => {
    res.send("backend dziala!!!!");
});

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
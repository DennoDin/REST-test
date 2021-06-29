const express = require("express")

const app = express();
app.use(express.json())

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.send("Hi There").status(200);
})

app.post("/signup", (req, res) => {
    console.log(req.body);
})

app.get("/users/{user_id}", (req, res) =>{
    console.log("TODO: Please Implement")
})

app.patch("/users/{user_id}", (req, res) => {
    console.log("TODO: Please Implement")
})

app.post("/close", (req, res) => {
    console.log("TODO: Please Implement")
})

app.listen(process.env.PORT || 3000, () => console.log("Server running!"))
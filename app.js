const express = require("express")

const tempDatabase = {
    "accounts": [], //{user_id: string, password: string}
};

const app = express();
app.use(express.json())

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.status(404).send("Hi There");
})

app.post("/signup", (req, res) => {
    if(!req.body.user_id || !req.body.password){
        res.status(400).send({
            "message": "Account creation failed",
            "cause": "required user_id and password"
        });
    }
    let duplicateFound = false;
    
    tempDatabase.accounts.forEach(account => {
        if(account.user_id === req.body.user_id){
            duplicateFound = true;
        }
    })
    if(duplicateFound){
        res.status(400).send({
            "message": "Account creation failed",
            "cause": "already same user_id is used"
        });
    } else {
        tempDatabase.accounts.push(
        {
            "user_id": req.body.user_id, 
            "password": req.body.password
        })
    }

    res.status(200).send({
        "message": "Account successfully created",
        "user": {
            "user_id": req.body.user_id,
            "nickname": req.body.user_id,
        }
    })
})

app.get("/users/:user_id", (req, res) =>{
    const id = req.params.user_id;
    const pass = tempDatabase.accounts.find(x => x.user_id === id).password;

    const authString = Buffer.from(`${id}:${pass}`).toString('base64')
    
    if(req.headers.authorization === `Basic ${authString}`){
        res.sendStatus(200);
    } else {
        res.send(401);
    }
})

app.patch("/users/:user_id", (req, res) => {
    console.log("TODO: Please Implement")
    res.send(404)
})

app.post("/close", (req, res) => {
    console.log("TODO: Please Implement")
    res.send(404);
})

app.listen(process.env.PORT || 3000, () => console.log("Server running!"))
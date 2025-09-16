const express = require("express");
require("dotenv").config();
const cors = require('cors')
const recipeRouter = require("./routes/recipe.router.js")
const userRouter = require("./routes/user.router.js")
const connectDB = require("./config/connectDB.js")

connectDB()

const app = express();
const port = process.env.PORT | 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/recipes", recipeRouter)
app.use("/users", userRouter)

app.get('/a', (req, res) => {
	res.send("hello world")
})

app.listen(port, () => console.log("working successfully"));

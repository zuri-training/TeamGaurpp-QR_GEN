const express = require("express");
const dotenv = require("dotenv");
dotenv.config()

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());;

app.get("/", (req, res) =>{
  res.status(200).json({message:"QRROUTE Testing"});
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

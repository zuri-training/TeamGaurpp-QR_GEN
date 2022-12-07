const express = require("express");
const {json} = require("express");
const qrcontroller = require("./controllers/qrController");
const qrroute = require("./routes/qrRoute");

const app = express();

app.use(json());

app.use("/qrroute", qrroute);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) =>{
  res.send("QRROUTE Testing");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

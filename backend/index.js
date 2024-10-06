require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");


////////////////////////////////////////////////////////////////
const authRoute = require("./routes/AuthRoute");

const { HoldingsModel } = require("./model/HoldingsModel");

const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

// app.use(cors());


app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], // Allow access from both ports
  credentials: true, // Allow cookies to be sent
}));

// app.use(cors({
//   origin: true, // Allow all origins
//   credentials: true, // Allow cookies to be sent
// }));



app.use(bodyParser.json());


///////////////////////////////////////////////////////////////////////////////////
app.use("/", authRoute);

// app.get("/addHoldings", async (req, res) => {
//   let tempHoldings = [
//     {
//       name: "BHARTIARTL",
//       qty: 2,
//       avg: 538.05,
//       price: 541.15,
//       net: "+0.58%",
//       day: "+2.99%",
//     },
//     {
//       name: "HDFCBANK",
//       qty: 2,
//       avg: 1383.4,
//       price: 1522.35,
//       net: "+10.04%",
//       day: "+0.11%",
//     },
//     {
//       name: "HINDUNILVR",
//       qty: 1,
//       avg: 2335.85,
//       price: 2417.4,
//       net: "+3.49%",
//       day: "+0.21%",
//     },
//     {
//       name: "INFY",
//       qty: 1,
//       avg: 1350.5,
//       price: 1555.45,
//       net: "+15.18%",
//       day: "-1.60%",
//       isLoss: true,
//     },
//     {
//       name: "ITC",
//       qty: 5,
//       avg: 202.0,
//       price: 207.9,
//       net: "+2.92%",
//       day: "+0.80%",
//     },
//     {
//       name: "KPITTECH",
//       qty: 5,
//       avg: 250.3,
//       price: 266.45,
//       net: "+6.45%",
//       day: "+3.54%",
//     },
//     {
//       name: "M&M",
//       qty: 2,
//       avg: 809.9,
//       price: 779.8,
//       net: "-3.72%",
//       day: "-0.01%",
//       isLoss: true,
//     },
//     {
//       name: "RELIANCE",
//       qty: 1,
//       avg: 2193.7,
//       price: 2112.4,
//       net: "-3.71%",
//       day: "+1.44%",
//     },
//     {
//       name: "SBIN",
//       qty: 4,
//       avg: 324.35,
//       price: 430.2,
//       net: "+32.63%",
//       day: "-0.34%",
//       isLoss: true,
//     },
//     {
//       name: "SGBMAY29",
//       qty: 2,
//       avg: 4727.0,
//       price: 4719.0,
//       net: "-0.17%",
//       day: "+0.15%",
//     },
//     {
//       name: "TATAPOWER",
//       qty: 5,
//       avg: 104.2,
//       price: 124.15,
//       net: "+19.15%",
//       day: "-0.24%",
//       isLoss: true,
//     },
//     {
//       name: "TCS",
//       qty: 1,
//       avg: 3041.7,
//       price: 3194.8,
//       net: "+5.03%",
//       day: "-0.25%",
//       isLoss: true,
//     },
//     {
//       name: "WIPRO",
//       qty: 4,
//       avg: 489.3,
//       price: 577.75,
//       net: "+18.08%",
//       day: "+0.32%",
//     },
//   ];

//   tempHoldings.forEach((item) => {
//     let newHolding = new HoldingsModel({
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.day,
//       day: item.day,
//     });

//     newHolding.save();
//   });
//   res.send("Done!");
// });

// app.get("/addPositions", async (req, res) => {
//   let tempPositions = [
//     {
//       product: "CNC",
//       name: "EVEREADY",
//       qty: 2,
//       avg: 316.27,
//       price: 312.35,
//       net: "+0.58%",
//       day: "-1.24%",
//       isLoss: true,
//     },
//     {
//       product: "CNC",
//       name: "JUBLFOOD",
//       qty: 1,
//       avg: 3124.75,
//       price: 3082.65,
//       net: "+10.04%",
//       day: "-1.35%",
//       isLoss: true,
//     },
//   ];

//   tempPositions.forEach((item) => {
//     let newPosition = new PositionsModel({
//       product: item.product,
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//       isLoss: item.isLoss,
//     });

//     newPosition.save();
//   });
//   res.send("Done!");
// });

app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

// app.post("/newOrder",async(req,res)=>{
//   let newOrder = new OrdersModel({
//     name:req.body.name,
//     qty:req.body.qty,
//     price:req.body.price,
//     mode:req.body.mode,
//   });
//   newOrder.save();
//   res.send("order saved");
// })

app.post("/newOrder", async (req, res) => {
  try {
    // Create a new order object
    let newOrder = new OrdersModel({
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });

    // Save the new order to the database
    await newOrder.save();

    // Assuming you have a way to calculate or fetch avg, net, and day values
    // Here, we use placeholders for avg, net, and day.
    // Replace these with actual calculations or database queries as needed.
    const avg = newOrder.price; // Example: setting avg to the order price
    const net = "+0.00%"; // Example placeholder for net percentage change
    const day = "+0.00%"; // Example placeholder for daily change

    // Send back the response with the required information
    res.status(201).json({
      message: "Order saved",
      avg,
      net,
      day,
    });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ message: "Error saving order", error });
  }
});


app.post("/newHolding",async(req,res)=>{
  let newHolding = new HoldingsModel({
    name:req.body.name,
    qty:req.body.qty,
    avg:req.body.avg,
    price:req.body.price,
    net:req.body.net,
    day:req.body.day,
});
newHolding.save();
res.send("Holding saved");
});

app.put('/updateHolding/:id', async (req, res) => {
  const { qty, avg, price, net, day } = req.body;
  try {
    const updatedHolding = await HoldingsModel.findByIdAndUpdate(
      req.params.id,
      { qty, avg, price, net, day },
      { new: true }
    );
    res.status(200).json(updatedHolding);
  } catch (error) {
    res.status(500).json({ message: "Error updating holding", error });
  }
});

app.delete("/deleteHolding/:id", async (req, res) => {
  const holdingId = req.params.id; // Get the holding ID from the request parameters

  try {
    // Find the holding by ID and delete it
    const deletedHolding = await HoldingsModel.findByIdAndDelete(holdingId);

    if (deletedHolding) {
      return res.status(200).json({ message: "Holding deleted successfully" });
    } else {
      return res.status(404).json({ message: "Holding not found" });
    }
  } catch (error) {
    // Handle errors that occur during the deletion process
    console.error("Error deleting holding:", error);
    return res.status(500).json({ message: "Server error", error });
  }
});


app.listen(PORT, () => {
  console.log("App started!");
  mongoose.connect(uri);
  console.log("DB started!");
});
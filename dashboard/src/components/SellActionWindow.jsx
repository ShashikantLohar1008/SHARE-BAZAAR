import React, { useState,useContext } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  const {closeSellWindow}=useContext(GeneralContext);

 
  const handleCancelClick = () => {
    closeSellWindow();
  };

  

  const handleSellClick = async () => {
    try {
      // First, create a new sell order
      const response = await axios.post("http://localhost:3002/newOrder", {
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: "SELL",
      });
  
      // Assuming the response contains the average price, net, and day change
      const { avg, net, day } = response.data; // Make sure your backend sends this data
      console.log(avg);
  
      // Fetch current holdings to update quantity
      const holdingsResponse = await axios.get(`http://localhost:3002/allHoldings`);
  
      const currentHolding = holdingsResponse.data.find(holding => holding.name === uid);
      console.log(currentHolding);
  
      if (currentHolding) {
        // Update the quantity for the stock in holdings
        const updatedQty = currentHolding.qty - stockQuantity; // Subtract the quantity being sold
  
        if (updatedQty > 0) {
          // If quantity is still greater than zero, update the holding
          await axios.put(`http://localhost:3002/updateHolding/${currentHolding._id}`, {
            qty: updatedQty,
            avg, // Adjust how you calculate avg price for selling
            price: stockPrice,
            net,
            day,
          });
        } else {
          // If quantity goes to zero, delete the holding
          await axios.delete(`http://localhost:3002/deleteHolding/${currentHolding._id}`);
        }
      } else {
        console.warn("No holdings found for this stock.");
      }
  
      console.log("Sell order and holdings updated successfully");
    } catch (error) {
      console.error("Error processing sell order:", error);
    }
  
    // Close the sell window instead of the buy window
    closeSellWindow();
  };
  
  
  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <Link className="btn btn-blue" onClick={handleSellClick}>
            Sell
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;





// const handleBuyClick = () => {
//   axios
//     .post("http://localhost:3002/newOrder", {
//       name: uid,
//       qty: stockQuantity,
//       price: stockPrice,
//       mode: "BUY",
//     })
//     .then(() => {
//       axios.post("http://localhost:3002/newOrder", {
//         name: uid,
//         qty: ,
//         avg: req.body.avg,
//         price: req.body.price,
//         net: req.body.net,
//         day: req.body.day,
//       });
//     });

//   GeneralContext.closeBuyWindow();
// };









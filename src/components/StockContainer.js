import React from "react";
import Stock from "./Stock";

function StockContainer({stocksArray, onStockClick}) {
  
  const stocksInContainer = stocksArray.map((stock) => (
      <Stock key={stock.id} stock={stock} onStockClick={onStockClick}/>
  ))
  
  return (
    <div>
      <h2>Stocks</h2>
      {stocksInContainer}
    </div>
  );
}

export default StockContainer;

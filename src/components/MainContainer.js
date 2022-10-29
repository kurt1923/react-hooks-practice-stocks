import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";


function MainContainer() {

  const [stocksArray, setStocksArray] = useState([])
  const [portfolio, setPortfolio] = useState([])
  const [sortBy, setSortBy] = useState("Alphabetically");
  const [filterBy, setFilterBy] = useState("Tech")

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((res) => res.json())
      .then(setStocksArray)
  }, [])

  console.log(stocksArray)

  const sortedStocks = [...stocksArray].sort((stock1, stock2) => {
    if (sortBy === "Alphabetically") {
      return stock1.name.localeCompare(stock2.name);
    } else {
      return stock1.price - stock2.price; //reverse it to go highest to lowest
    }
  });

  function putInPortfolio(addedStock) {
    const stockInPortfolio = portfolio.find(
      (stock) => stock.id === addedStock.id
    )
    if (!stockInPortfolio) {
      setPortfolio([...portfolio, addedStock])
    }
  }

  function deletePortStock(portStock) {
    setPortfolio((portfolio) => 
    portfolio.filter((stock) => stock.id !== portStock.id))
  }

  const filteredStocks = sortedStocks.filter(
    (stock) => stock.type === filterBy
  )
  return (
    <div>
      <SearchBar 
      sortBy={sortBy}
      setSortBy={setSortBy}
      filterBy={filterBy}
      setFilterBy={setFilterBy}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer stocksArray={filteredStocks} onStockClick={putInPortfolio} />
        </div>
        <div className="col-4">
          <PortfolioContainer stocks={portfolio} onRemoveStock={deletePortStock} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;

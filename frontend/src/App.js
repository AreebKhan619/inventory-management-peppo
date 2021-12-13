import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomLayout from './layout/layout';

import productsData from "./data/products.json"
import batchesData from "./data/batches.json"
import categoriesData from "./data/categories.json"
import companyData from "./data/company.json"
import outletsData from "./data/outlets.json"
import stockData from "./data/stock.json"
import { createContext, useState } from 'react';


export const AppContext = createContext()

function App() {

  const [products, setProducts] = useState(productsData)
  const [batches, setBatches] = useState(productsData)
  const [categories, setCategories] = useState(categoriesData)
  const [outlets, setOutlets] = useState(outletsData)
  const [stock, setStock] = useState(stockData)

  return (
    <AppContext.Provider value={{
      products,
      setProducts,
      batches,
      setBatches,
      categories,
      setCategories,
      outlets,
      setOutlets,
      stock,
      setStock
    }}>
      <div className="App">
        <BrowserRouter>
          <CustomLayout />
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
}

export default App;

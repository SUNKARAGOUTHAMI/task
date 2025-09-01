import React from "react";
import "./App.css"; // Ensure this is linked

import ProductPage from "./components/ProductPage";
import NestedCheckbox from "./components/NestedCheckbox";
import Nav from "./components/Nav";


const App = () => {
  return (
    <>
       <Nav/>
      <ProductPage />
      <NestedCheckbox />
    </>
  );
};

export default App;

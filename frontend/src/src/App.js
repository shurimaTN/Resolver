import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Add from "./Add/Add";
import Search from "./Search/Search";

import Home from "./Home/Home";
function App() {
  return (
    <BrowserRouter>
      <Navbar
        class="navbar navbar-expand-lg navbar-light bg-light"
        bg="primary"
        variant="dark"
      >
        <Navbar.Brand href="/"> resolver </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/add"> Add product</Nav.Link>

          <Nav.Link href="/tablesearch">Show product</Nav.Link>
          
        </Nav>
      </Navbar>

      <div className="main-route-place">
        <Route exact path="/" component={Home} />
        <Route path="/add" component={Add} />
        <Route path="/tablesearch" component={Search} />
      </div>
    </BrowserRouter>
  );
}

export default App;

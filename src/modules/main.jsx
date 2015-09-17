"use strict";

var React = require("react");
var BeerList = require("./beer-list-simple.jsx");

var Main = React.createClass({

  render: function() {
    return (
      <div>
        <h1>Öl-lista</h1>
        <BeerList />
      </div>
    );
  }
});

module.exports = Main;

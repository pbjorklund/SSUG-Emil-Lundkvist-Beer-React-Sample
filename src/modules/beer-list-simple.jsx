"use strict";

var React = require("react");
var Promise = require("promise");

var BeerList = React.createClass({

  getInitialState: function() {
    return {
      beerList: []
    };
  },

  componentDidMount: function() {
    Promise.resolve($.ajax({
      url: "/ssug/_api/web/lists/GetByTitle('Beer')/items",
      headers: {
        "Accept": "application/json;odata=verbose"
      }
    })).then(function(result) {
      this.setState({
        beerList: result.d.results
      });
    }.bind(this));
  },

  render: function() {

    var displayList = this.state.beerList.map(function(beer) {
      return <div>{beer.Title}</div>;
    });

    return (
      <div>
        {displayList}
      </div>
    );
  }

});

module.exports = BeerList;

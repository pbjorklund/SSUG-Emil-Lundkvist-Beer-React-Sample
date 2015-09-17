"use strict";

var React = require("react");
var Promise = require("promise");
var Panel = require("react-bootstrap").Panel;
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;
var Table = require("react-bootstrap").Table;

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
      return (
        <tr>
          <td>{beer.Id}</td>
          <td>{beer.Title}</td>
          <td>{beer.God}</td>
        </tr>
      );
    });

    return (
      <Row>
        <Col md={6}>
          <Panel header="En panel">
            <Table bordered condensed hover striped>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Namn</th>
                  <th>God</th>
                </tr>
              </thead>
              <tbody>
                {displayList}
              </tbody>
            </Table>
          </Panel>
        </Col>
        <Col md={6}>
          <Panel header="En till panel">
            Öl är en dryck (i huvudsak med visst innehåll av alkohol) som har producerats i uppskattningsvis 7 000 år. Det första ölet skapades troligtvis då stärkelse- och sockerrika bröd blöttes och jäste i kontakt med vilda jästsvampar. Den moderna bryggeritekniken utvecklades i huvudsak i kloster under medeltiden och de största tekniska framstegen i industrialiserandet av bryggprocessen skedde under 1700- och 1800-talen. Bryggeriindustrin är idag en multinationell miljardindustri med Kina som största producentland. Öl bestod ursprungligen av jäst, vatten och stärkelsebaserade ingredienser, i huvudsak malt men även vete, ris och majs. Humlens angenäma effekter upptäcktes under slutet av det första millenniet efter vår tideräkning och idag är humle en av huvudingredienserna i de allra flesta ölsorterna. Andra ingredienser kan vara potatis, kryddor och socker. Det finns flera olika öltyper, såsom spontanjäst öl, ale, lager och veteöl. Vissa öltyper är även regionspecifika och produceras utifrån de förutsättningar som finns i regionen. Processen kallas för bryggning. Idag produceras även ekologiskt öl och alkoholfritt öl.
          </Panel>
        </Col>
      </Row>
    );
  }

});

module.exports = BeerList;

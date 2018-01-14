//Credit to Aleksi Lassila

class Navbar extends React.Component {
  render(){
    return(
      <div id="Menu" className="bg">
        <h1 id="Menu-Header">Temperature App</h1>
        <div id="MenuIcon" className="holdable">
          <div id="Navigation" className="holdable">
          <h3 id="Nav-Label">Navigation</h3>
            <ul id="Navigation-List">
              <li className="Navigation-Item-Box holdable"><a className="Navigation-Item Navigation-Item-First" id="Sensor1" href="#">Device</a></li>
              <li className="line holdable"></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const getTemperature = async () => {
  const temperature = await fetch(`/get`);
  return await temperature.json();
};

class Chart extends React.Component {
  constructor(){
    super();
    this.state = {temperature: "fetching..."};
  }

  async componentWillMount() {

    var data = {
      x: [],
      y: [],
      type: "scatter"
    };

    const response = await getTemperature()

    response.forEach(element => {
      data.x.push(element["date"]);
      data.y.push(element["temperature"]);
    });
    
    this.setState({temperature: data.y[data.y.length - 1]});
    Plotly.plot(graphDiv, [data])
};

render(){
  return(
    <div id="Data" className="Data">
        <h2 className="Data-Heading">Temperature: +{this.state.temperature}°C</h2>
        <div id="graphDiv"></div>
    </div>
  )};
};

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Chart/>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);



import React from 'react';
import ReactDOM from 'react-dom';
import initData from './initData.json';

function getRandomInt(min, max) {
  const min1 = Math.ceil(min);
  const max1 = Math.floor(max);
  return Math.floor(Math.random() * (max1 - min1)) + min1;
}

const Row = props => (
  <tr>
    <td className="code">{props.value.code}</td>
    <td className="company">{props.value.company}</td>
    <td>{props.value.price}</td>
    <td>{(props.value.volume * props.value.price).toLocaleString()}</td>
    <td className={props.value.change < 0 ? 'red' : 'green'}>{props.value.change.toLocaleString()}</td>
    <td className={props.value.change < 0 ? 'red' : 'green'}>{props.value.percentChange}%</td>
  </tr>
);

function Table(props) {
  const values = props.values.map(value => <Row key={value.code} value={value}/>);
  return (
    <table className="bordered-table">
      <thead>
      <tr className="header">
        <th>Code</th>
        <th>Company</th>
        <th>Price</th>
        <th>Value</th>
        <th>Change</th>
        <th>%Change</th>
      </tr>
    </thead>
    <tbody>{values}</tbody>
  </table>
  );
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      values: initData,
    };
    this.gainers = this.gainers.bind(this);
    this.losers = this.losers.bind(this);
    this.updateValues = this.updateValues.bind(this);
  }
  componentDidMount() {
    // this.loadData();
    this.interval = setInterval(this.updateValues, 5000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  // loadData() {
  //   this.setState({
  //     values: initData,
  //   });
  // }

  updateValues() {
    let newPrice;
    let absNewPrice;
    let absCurrPrice;
    let compare;
    let absCompare;
    let percent;
    let absPercent;

    const { values } = this.state;
    values.map((value) => {
      // +- 5%
      const num = getRandomInt(-5, 5);
      if (num > 0) {
        newPrice = parseFloat(parseFloat(value.price) + (parseFloat(value.price) * 0.05))
          .toFixed(2);
        absNewPrice = Math.abs(newPrice);
        absCurrPrice = Math.abs(parseFloat(value.price));
        compare = parseFloat(absCurrPrice - absNewPrice).toFixed(2);
        absCompare = Math.abs(compare);
        percent = parseFloat((absCompare / absCurrPrice) * 100).toFixed(2);
        absPercent = Math.abs(percent);

        value.change = absCompare;
        value.percentChange = absPercent;

        value.price = newPrice;
      } else {
        newPrice = parseFloat(parseFloat(value.price) - (parseFloat(value.price) * 0.05))
          .toFixed(2);
        absNewPrice = Math.abs(newPrice);
        absCurrPrice = Math.abs(parseFloat(value.price));
        compare = parseFloat(absCurrPrice - absNewPrice).toFixed(2);
        absCompare = Math.abs(compare);
        percent = parseFloat((absCompare / absCurrPrice) * 100).toFixed(2);
        absPercent = Math.abs(percent);

        value.change = -absCompare;
        value.percentChange = -absPercent;

        value.price = newPrice;
      }

      // volume
      const num2 = getRandomInt(10, 30);
      value.volume = parseInt(value.volume, 10) + num2;
      return true;
    });
    this.setState({ values });
  }
  gainers() {
    this.state.values.sort((a, b) => (b.price * b.volume) - (a.price * a.volume));

    this.state.values.splice(20, 10);
    clearInterval(this.interval);
    this.setState(this.state);
  }
  losers() {
    this.state.values.sort((a, b) => (a.price * a.volume) - (b.price * b.volume));

    this.state.values.splice(20, 10);
    clearInterval(this.interval);
    this.setState(this.state);
  }
  render() {
    return (
      <div>
        <div className="tabBar">
          <p className="name">S&P/ASX</p>
          <p className="tabs" onClick={this.gainers}>TOP GAINERS</p>
          <p className="tabs" onClick={this.losers}>TOP LOSERS</p>
        </div>
        <div><Table values={this.state.values}/></div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

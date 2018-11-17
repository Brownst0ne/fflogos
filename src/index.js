import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import data from './data.json';
import combos from './combos.json';
import Tooltip from 'react-simple-tooltip';
const images = importAll(require.context('./img', false, /\.(png|jpe?g|svg)$/));

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}
      onMouseOut={props.onMouseOut}
      onMouseOver={props.onMouseOver}
    >
      <img src={props.image} alt=""/>
    </button>
  )
}

function Mneme(props) {
  let v = props.check ? "-on" : "-off";
  return (
    <>
    <tr style={{width: "100%"}} className={data[props.value].logogram + v}>

        <td style={{width: "100%"}}>
        <Tooltip
          placement="right" style={{width: "100%"}}
          content={
            <div>
              <p style={{width:"200px"}}>{data[props.value].logogram}</p>
              <p>Obtained from:</p>
              <p>{data[props.value].source}</p>
            </div>
          }
        >
          <img src= {images[data[props.value].type + "_mneme.png"]} alt=""/>
          {data[props.value].name}
          </Tooltip>
        </td>
        <td >{props.totals}</td>
    </tr>
    <tr>
      <td>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <button className="btn btn-dark btn-sm" onClick={props.decrement}><i className="fa fa-minus"></i></button>
        </div>
        <input type="text" className="form-control form-control-sm" value={props.owned}  min="0" readOnly="readonly"/>
        <div className="input-group-prepend">
          <button className="btn btn-dark btn-sm" onClick={props.increment}><i className="fa fa-plus"></i></button>
        </div>
      </div>
      </td>
    </tr>
    </>
  )
}

function Logo(props) {
  let v = props.check ? "-on" : "-off";
  return (
    <tr className={data[props.value].logogram + v}>

      <td>
      <Tooltip
                  placement="right" style={{width: "100%"}}
                  content={
                    <div>
                      <p style={{width:"200px"}}>{data[props.value].logogram}</p>
                      <p>Obtained from:</p>
                      <p>{data[props.value].source}</p>
                    </div>
                  }
                >
        <img src= {images[data[props.value].logogram + ".png"]} alt=""/>
        {data[props.value].logogram}
        </Tooltip>
      </td>

    </tr>
  )
}

const label = flipped => {
	if (flipped === null) {
    	return <h4>Hover over an action to see details.</h4>;
  }
  let mnem = [];
  let c = "";
  for(let i = 0; i < combos[flipped].amount; i++){
    if(i%2===0){
      c = "mo";
    } else {c = "me";}
    mnem.push(
      <>
      <div className={"col-4 " + c}>
      <p>{combos[flipped].mneme1[i]}</p>
      </div>
      <div className={"col-4 " + c}>
      <p>{combos[flipped].mneme2[i]}</p>
      </div>
      <div className={"col-4 " + c}>
      <p>{combos[flipped].mneme3[i]}</p>
      </div>
      </>
    );
  }

    return (
        <div className=" info-box row">
          <div className="col-6">
            <p className="title">Name: {combos[flipped].name}</p>
          </div>
          <div className="col-3">
            <p className="title">Type: {combos[flipped].type}</p>
          </div>
          <div className="col-3">
            <p className="title">Uses: {combos[flipped].use}</p>
          </div>
          <div className="col-12">
          <p className="title">{combos[flipped].description}</p>
          </div>
          <div className="col-12">
          <p className="title">Jobs: {combos[flipped].jobs}</p>
          </div>
          <div className="col-4 me">
          <p>Mneme 1</p>
          </div>
          <div className="col-4 me">
          <p>Mneme 2</p>
          </div>
          <div className="col-4 me">
          <p>Mneme 3</p>
          </div>
          {mnem}

        </div>
    );
}



class Logogram extends React.Component {
  renderGram() {
    let row = [];
    for(let j = 0; j < 24; j++) {
      if(j === 0 ||( j > 0 && (data[j].logogram !== data[j-1].logogram))){
        row.push(<Logo
                    value={j}
                    check={this.props.checkLogo[j]}
                    key={j}
                  />);
    }
    }
    return <table className="logos-table"><tbody>{row}</tbody></table>;
  }
  render() {
    return (
      <div>
        <div className="logo-row">

          {this.renderGram()}
        </div>
      </div>
    );
  }
}

class Mnemes extends React.Component {
  renderMneme() {
    let row = [];
    for(let j = 0; j < 24; j++){
      row.push(<Mneme value={j}
                  totals={this.props.totals[data[j].name]}
                  owned={this.props.owned[j]}
                  increment={() => this.props.increment(j)}
                  decrement={() => this.props.decrement(j)}
                  check={this.props.checkMneme[j]}
                  key={j}/>);
    }
    return <table className="menme-table"><tbody>{row}</tbody></table>;
  }

  render() {
    return (
      <div>
        <div className="mneme-row">
          {this.renderMneme()}
        </div>
      </div>
    );
  }
}

class Board extends React.Component {



  renderRow(i) {
    let row = [];
    for(let j = i; j < i+10; j++){
      row.push(<td key={j}><Square
        value={this.props.squares[j]}
        key={j}
        onClick={() => this.props.onClick(j)}
        image={this.props.image[j]}
        onMouseOut={() => this.props.onMouseOut(j)}
        onMouseOver={() => this.props.onMouseOver(j)}
      /></td>);
    }
    return row;
  }

  render() {
    return (
      <table>
        <tbody>
            <tr className="board-row">
              {this.renderRow(0)}
            </tr>
            <tr className="board-row">
              {this.renderRow(10)}
            </tr>
            <tr className="board-row">
              {this.renderRow(20)}
            </tr>
            <tr className="board-row">
              {this.renderRow(30)}
            </tr>
            <tr className="board-row">
              {this.renderRow(40)}
            </tr>
        </tbody>
      </table>

    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      width: window.innerWidth,
      squares: Array(50).fill(null),
      mnemes: data.map(function(movie){
        return movie.name;
      }),
      image: Array(50).fill(null),
      logograms: data.map(function(d){
        return d.logogram;
      }),
      checkMneme:Array(24).fill(1),
      checkLogo:Array(24).fill(1),
      count: 0,
      totals: Array(50).fill(null),
      flipped: null,
      owned: Array(50).fill(0),
      possible: Array(50).fill(0),
    };
  }

  checkPossible(amount, totals, image) {

    let diff = new Map();
    for(let i = 0; i < 24; i++) {
      if(totals[data[i].name]) {
        diff.set(data[i].name, amount[i]);
      }
    }

    for(let i = 0; i < 50; i++) {

      for(let j = 0; j < combos[i].amount; j++) {
        let cnt = 0;
        let amounts = new Map(diff);
        if(amounts.get(combos[i].mneme1[j])) {
          cnt++;
          amounts.set(combos[i].mneme1[j], amounts.get(combos[i].mneme1[j])-1);
        }
        if(amounts.get(combos[i].mneme2[j]) || combos[i].mneme2[j] === "") {
          amounts.set(combos[i].mneme2[j], amounts.get(combos[i].mneme2[j])-1);
          cnt++;
        }
        if(amounts.get(combos[i].mneme3[j]) || combos[i].mneme3[j] === "") {
          cnt++;
        }
        if(cnt === 3){
          if(image[i] === images['empty.png']) {
            image[i] = images['empty-inverse.png'];
          }
          break;
        } else {
          if(image[i] === images['empty-inverse.png']) {
            image[i] = images['empty.png'];
          }
        }
      }
    }
    return image;
  }

  saveState() {
    for (let key in this.state) {

      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  loadState() {
    for (let key in this.state) {
      if(key === 'image') {
        if(localStorage.hasOwnProperty(key)) {
          localStorage.removeItem(key);
        }
        continue;
      }
      if(localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key);

        try {
          value = JSON.parse(value);
          this.setState({[key]: value})
        } catch (e) {
          this.setState({[key]: value})
        }
      }

    }
    try {
      let owned = JSON.parse(localStorage.getItem('owned'));
      let squares = JSON.parse(localStorage.getItem('squares'));
      let image = Array(50).fill(images['empty.png']);
      let totals = JSON.parse(localStorage.getItem('totals'));
      for(let i = 0; i < 50; i++) {
        if(squares[i]) {
          image[i] = images[squares[i] + '.png'];
        }
      }
      image = this.checkPossible(owned, totals, image);
      this.setState({image: image})
    } catch (e) {
      this.setState({image: Array(50).fill(images['empty.png'])})
    }

  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveState.bind(this)
    );

    // saves if component has a chance to unmount
    this.saveState();
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  componentDidMount() {
    this.loadState();

    window.addEventListener(
      "beforeunload",
      this.saveState.bind(this)
    );

  }


  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  onMouseOut(i) {
    this.setState({flipped: i});
  }

  onMouseOver(i) {
    this.setState({flipped: i});
  }

  increment(i) {
    const owned = this.state.owned.slice();
    const checkMneme = this.state.checkMneme.slice();
    const totals = this.state.totals;
    const squares = this.state.squares.slice();
    var image = this.state.image.slice();

    owned[i] += 1;
    if(totals[data[i].name] - owned[i] <= 0){
      checkMneme[i] = null;
    }
    var [checkLogo, mneme] = calculateMnemes(squares, checkMneme, owned);
    image = this.checkPossible(owned, totals, image);
    this.setState({
      owned: owned,
      checkMneme: mneme,
      image: image,
      checkLogo: checkLogo});

  }

  decrement(i) {
    const owned = this.state.owned.slice();
    const checkMneme = this.state.checkMneme.slice();
    const totals = this.state.totals;
    const squares = this.state.squares.slice();
    var image = this.state.image.slice();
    owned[i] -= 1;
    if(this.state.totals[data[i].name] - owned[i] > 0){
      checkMneme[i] = 1;
    }
    if(owned[i] < 0) {
      owned[i] = 0;
    }
    var [checkLogo, mneme] = calculateMnemes(squares, checkMneme, owned);

    image = this.checkPossible(owned, totals, image);
    this.setState({
      owned: owned,
      checkMneme: mneme,
      image: image,
      checkLogo: checkLogo});
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    const image = this.state.image.slice();
    const owned = this.state.owned.slice();
    const checkMneme = this.state.checkMneme.slice();

    if(squares[i]) {
      squares[i] = null;
      image[i] = images["empty.png"];
    } else{
      squares[i] = combos[i].name;
      image[i] = images[combos[i].name + ".png"];
    }

    var totals = calculcateTotal(squares);
    var [checkLogo, mneme] = calculateMnemes(squares, checkMneme, owned);
    console.log(mneme);
    image[i] = this.checkPossible(owned, totals, image)[i];

    this.setState({
      squares: squares,
      image: image,
      count: squares.filter(Boolean).length,
      checkMneme: mneme,
      checkLogo: checkLogo,
      totals: totals,
    });
  }

  render() {

    const numbers1 = [];
    const numbers2 = [];
    const numbers3 = [];
    const { width } = this.state;
    const isMobile = width <= 768;

    for(let i = 1; i <=20;i++){
      if(i <= this.state.count){
        if(i === 10 || i === 20){
          numbers1.push(<li className="dotspon" key={i}>{i}</li>);
          continue;
        }
        numbers1.push(<li className="doton text-primary" key={i}>{i}</li>);
      } else {
        if(i === 10 || i === 20){
          numbers1.push(<li className="dotspoff" key={i}>{i}</li>);
          continue;
        }
        numbers1.push(<li className = "dotoff" key={i}>{i}</li>);
      }
    }

    for(let i = 21; i <=40;i++){
      if(i <= this.state.count){
        if(i === 30 || i === 40){
          numbers2.push(<li className="dotspon" key={i}>{i}</li>);
          continue;
        }
        numbers2.push(<li className="doton text-primary" key={i}>{i}</li>);
      } else {
        if(i === 30 || i === 40){
          numbers2.push(<li className="dotspoff" key={i}>{i}</li>);
          continue;
        }
        numbers2.push(<li className = "dotoff" key={i}>{i}</li>);
      }
    }
    for(let i = 41; i <=50;i++){
      if(i <= this.state.count){
        if(i === 50){
          numbers3.push(<li className="dotspon" key={i}>{i}</li>);
          continue;
        }
        numbers3.push(<li className="doton text-primary" key={i}>{i}</li>);
      } else {
        if(i === 50){
          numbers3.push(<li className="dotspoff" key={i}>{i}</li>);
          continue;
        }
        numbers3.push(<li  className = "dotoff" key={i}>{i}</li>);
      }
    }

    return (
      <>
      <div className="row">
        <div>
          <img src={require('./img/banner1.png')} className={"img-fluid"} alt="" style={{marginBottom:"25px"}}/>
        </div>
      </div>
        <div className="row">
          <div className="col-md-2">
          <Logogram
            logograms={this.state.logograms}
            checkLogo={this.state.checkLogo}
          />
          <br/>
          <p>Enter how many of each you have to the right using the +/- buttons. The number to the right of each name shows how many remaining.</p>
          <p><img src = {images['empty.png']} alt=""/> = You can't obtain this yet.</p>
          <p><img src = {images['empty-inverse.png']} alt=""/> = You can obtain this using some combination.</p>
          </div>
          <div className="col-md-3">
          <Mnemes
            mnemes={this.state.mnemes}
            checkMneme={this.state.checkMneme}
            totals={this.state.totals}
            owned={this.state.owned}
            increment={(i) => this.increment(i)}
            decrement={(i) => this.decrement(i)}
          />
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-12">
                    <div className="tabletitle">
                      <h2>Logos Action Log</h2>
                      <h4>ACTIONS</h4>
                      <Board
                        squares={this.state.squares}
                        image={this.state.image}
                        onClick={(i) => this.handleClick(i)}
                        onMouseOut={(i) => this.onMouseOut(i)}
                        onMouseOver={(i) => this.onMouseOver(i)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                <div className="col-12">
                  <h3>Collected</h3>
                  <ul className="list-inline">
                    {numbers1}
                  </ul>
                </div>
                </div>
                <div className="row">
                <div className="col-12">
                  <ul className="list-inline">
                    {numbers2}
                  </ul>
                </div>
                </div>
                <div className="row">
                <div className="col-12">
                  <ul className="list-inline">
                    {numbers3}
                  </ul>
                </div>
                </div>
                {label(this.state.flipped)}
              </div>
            </div>
          </div>
        </div>
        </>
    );




  }
}


// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateRemaining(squares) {
  var remaining = new Set();

  for(let i = 0; i < squares.length; i++){
    if(squares[i]) {

    } else {
      remaining.add(combos[i].mneme1[0]);
      remaining.add(combos[i].mneme2[0]);
      remaining.add(combos[i].mneme3[0]);
    }
  }

  return Array.from(remaining);
}

function calculcateTotal(squares) {
  var total = [];
  for(let i = 0; i < squares.length; i++){
    if(squares[i]) {

    } else {
      total.push(combos[i].mneme1[0]);
      total.push(combos[i].mneme2[0]);
      total.push(combos[i].mneme3[0]);
    }
  }
  return counts(total);
}

function calculcateLogos(l) {
  let ret = null;
  for(let i = 0; i < 24; i++){
    if(data[i].name === l) {
      ret = data[i].logogram;
    }
  }
  return ret;
}

function calculateMnemes(squares, checkMneme, owned) {
  var left = calculateRemaining(squares);
  var totals = calculcateTotal(squares);
  var total = [];
  for(let i = 0; i < 24; i++) {
    if(totals[data[i].name] - owned[i] > 0) {
      checkMneme[i] = 1;
    } else {
      checkMneme[i] = 0;
    }
  }

  var checkLogo = Array(50).fill(0);
  for(let i = 0; i < 7; i++) {
    if(checkMneme[i]) {
      checkLogo[0] = 1;
      break;
    }
    checkLogo[i] = checkMneme[i];
  }
  for(let i = 7; i < 12; i++) {
    if(checkMneme[i]) {
      checkLogo[7] = 1;
      break;
    }
    checkLogo[i] = checkMneme[i];
  }
  for(let i = 12; i < 14; i++) {
    if(checkMneme[i]) {
      checkLogo[12] = 1;
      break;
    }
    checkLogo[i] = checkMneme[i];
  }
  for(let i = 14; i < 16; i++) {
    if(checkMneme[i]) {
      checkLogo[14] = 1;
      break;
    }
    checkLogo[i] = checkMneme[i];
  }
  for(let i = 16; i < 18; i++) {
    if(checkMneme[i]) {
      checkLogo[16] = 1;
      break;
    }
    checkLogo[i] = checkMneme[i];
  }
  for(let i = 18; i < 20; i++) {
    if(checkMneme[i]) {
      checkLogo[18] = 1;
      break;
    }
    checkLogo[i] = checkMneme[i];
  }
  for(let i = 20; i < 22; i++) {
    if(checkMneme[i]) {
      checkLogo[20] = 1;
      break;
    }
    checkLogo[i] = checkMneme[i];
  }
  for(let i = 22; i < 24; i++) {
    if(checkMneme[i]) {
      checkLogo[22] = 1;
      break;
    }
    checkLogo[i] = checkMneme[i];
  }


  return [checkLogo, checkMneme];
}

function counts(arr) {
  var c = {};

  for (var i = 0; i < arr.length; i++) {
    var num = arr[i];
    c[num] = c[num] ? c[num] + 1 : 1;
  }
  return c;
}

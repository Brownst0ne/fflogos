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
      <img src={[props.image]} alt=""/>
    </button>
  )
}

function Mneme(props) {
  let v = props.check ? "-on" : "-off";
  return (
    <tr className={data[props.value].logogram + v}>
      <td style={{width: "100%"}}>
        <img src= {images[data[props.value].type + "_mneme.png"]} alt=""/>
        {data[props.value].name}
      </td>
      <td className={"nums"}>{props.totals}</td>
    </tr>
  )
}

function Logo(props) {
  let v = props.check ? "-on" : "-off";
  return (
    <tr className={data[props.value].logogram + v}>
      <td>
        <img src= {images[data[props.value].logogram + ".png"]} alt=""/>
        {data[props.value].logogram}
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
        row.push(<Tooltip
                    placement="right" style={{width: "100%"}}
                    content={
                      <div>
                        <p style={{width:"200px"}}>{data[j].logogram}</p>
                        <p>Obtained from:</p>
                        <p>{data[j].source}</p>
                      </div>
                    }
                  >
                  <Logo
                    value={j}
                    check={this.props.checkLogo[j]}
                    key={j}
                  />
                </Tooltip>);
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
      row.push(<Tooltip
                placement="right"
                radius="10"
                padding="15"
                style={{width: "100%"}}
                content={
                  <div>
                    <p style={{width:"200px"}}>{data[j].logogram}</p>
                    <p>Obtained from:</p>
                    <p>{data[j].source}</p>
                  </div>
                }

               >
                <Mneme value={j}
                  totals={this.props.totals[data[j].name]}
                  check={this.props.checkMneme[j]}
                  key={j}/></Tooltip>);
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
      image: combos.map(function(movie){
        return images["empty.png"];
      }),
      logograms: data.map(function(d){
        return d.logogram;
      }),
      checkMneme:Array(24).fill(1),
      checkLogo:Array(24).fill(1),
      count: 0,
      totals: calculcateTotal(Array(50).fill(null)),
      flipped: null,
    };
  }

  saveState() {
    for (let key in this.state) {

      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  loadState() {
    for (let key in this.state) {
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

  handleClick(i) {
    const squares = this.state.squares.slice();
    const image = this.state.image.slice();
    const checkMneme = this.state.checkMneme.slice();
    const checkLogo = this.state.checkLogo.slice();
    let con = null;
    let fun = null;
    let off = null;
    let pro = null;
    let cur = null;
    let tac = null;
    let ini = null;
    let mit = null;

    if(squares[i]) {
      squares[i] = null;
      image[i] = images["empty.png"];
    } else{
      squares[i] = combos[i].name;
      image[i] = images[combos[i].name + ".png"];
    }

    var left = calculateRemaining(squares);
    var totals = calculcateTotal(squares);

    labeled:
    for(let j = 0; j < 24; j++){
      for(let k = 0; k < left.length; k++){
        if(this.state.mnemes[j] === left[k]){
          checkMneme[j] = 1;
          switch(calculcateLogos(left[k])) {
            case "Conceptual":
              con = 7;
              break;
            case "Fundamental":
              fun = 5;
              break;
            case "Offensive":
              off = 2;
              break;
            case "Protective":
              pro = 2;
              break;
            case "Curative":
              cur = 2;
              break;
            case "Tactical":
              tac = 2;
              break;
            case "Inimical":
              ini = 2;
              break;
            case "Mitigative":
              mit = 2;
              break;
            default:

          }
          continue labeled;
        }
      }
      checkMneme[j] = null;
    }

    for(let j = 0;j < 7; j++){
      if(con) {
        checkLogo[j] = 1;
      } else {
        checkLogo[j] = null;
      }
    }
    for(let j = 7;j < 12; j++){
      if(fun) {
        checkLogo[j] = 1;
      } else {
        checkLogo[j] = null;
      }
    }
    for(let j = 12;j < 14; j++){
      if(off) {
        checkLogo[j] = 1;
      } else {
        checkLogo[j] = null;
      }
    }
    for(let j = 14;j < 16; j++){
      if(pro) {
        checkLogo[j] = 1;
      } else {
        checkLogo[j] = null;
      }
    }
    for(let j = 16;j < 18; j++){
      if(cur) {
        checkLogo[j] = 1;
      } else {
        checkLogo[j] = null;
      }
    }
    for(let j = 18;j < 20; j++){
      if(tac) {
        checkLogo[j] = 1;
      } else {
        checkLogo[j] = null;
      }
    }
    for(let j = 20;j < 22; j++){
      if(ini) {
        checkLogo[j] = 1;
      } else {
        checkLogo[j] = null;
      }
    }
    for(let j = 22;j < 24; j++){
      if(mit) {
        checkLogo[j] = 1;
      } else {
        checkLogo[j] = null;
      }
    }

    this.setState({
      squares: squares,
      image: image,
      count: squares.filter(Boolean).length,
      checkMneme: checkMneme,
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

    if(isMobile) {
      return (
        <div className="container-fluid">
          <div className="row" id="header-content" style={ {backgroundImage: "url(" + images['banner.png'] + ")"}}>
            <div >
              <img src={require('./img/logo.png')} className={"img-fluid"} alt=""/>
            </div>
          </div>
          <div className="row">
              <div className="col-2">
              <Logogram
                logograms={this.state.logograms}
                checkLogo={this.state.checkLogo}
              />
              </div>
              <div className="col-2">
              <Mnemes
                mnemes={this.state.mnemes}
                checkMneme={this.state.checkMneme}
                totals={this.state.totals}
              />
              </div>
            <div className="game-board col-8">
              <div className="row">
                <div className="col-12">
                  <div className="table">
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
      );
    } else {
    return (

      <div className="container-fluid">
        <div className="row" id="header-content" style={ {backgroundImage: "url(" + images['banner.png'] + ")"}}>
          <div >
            <img src={require('./img/logo.png')} className={"img-fluid"} alt=""/>
          </div>
        </div>
        <div className="row">
            <div className="col-2">
            <Logogram
              logograms={this.state.logograms}
              checkLogo={this.state.checkLogo}
            />
            </div>
            <div className="col-2">
            <Mnemes
              mnemes={this.state.mnemes}
              checkMneme={this.state.checkMneme}
              totals={this.state.totals}
            />
            </div>
          <div className="game-board col-8">
            <div className="row">
              <div className="col-12">
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
    );



}
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

function counts(arr) {
  var c = {};

  for (var i = 0; i < arr.length; i++) {
    var num = arr[i];
    c[num] = c[num] ? c[num] + 1 : 1;
  }
  return c;
}

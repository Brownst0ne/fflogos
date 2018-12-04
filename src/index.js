import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import data from './data.json';
import id from './id.json';
import combos from './combos.json';
import weather from './weather.json';
import Tooltip from 'react-simple-tooltip';
import Collapsible from 'react-collapsible';
const images = importAll(require.context('./img', false, /\.(png|jpe?g|svg)$/));
var lang = 0;

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
      style={{filter:props.opacity}}
    >
      <img src={props.image} alt=""/>
    </button>
  )
}

function Language(props) {
  return (
    <button type="button" className="btn btn-secondary lng" onClick={props.onClick}>{props.value}</button>
  )
}

function Job(props) {
  return (
    <button type="button" className="btn btn-secondary lng" onClick={props.onClick}>{props.value}</button>
  )
}

function Mneme(props) {
  let v = props.check ? "-on" : "-off";
  return (
    <>
    <tr className={id[data[props.value].logogram][0] + v}>

        <td style={{width:"68%"}}>
        <Tooltip
          placement="right"
          content={
            <div>
              <p style={{width:"200px"}}>{id[data[props.value].logogram][lang]}</p>
              <p>Obtained from:</p>
              <p>{data[props.value].source}</p>
            </div>
          }
        >


              <img src= {images[data[props.value].type + "_mneme.png"]} alt=""/>



                <span>{id[data[props.value].name][lang]}</span>


          </Tooltip>
        </td>
        <td style={{width:"7%"}}>{props.totals}</td>


      <td style={{width:"25%"}}>
      <div className="input-group mb-3 spinner">

        <input type="text" className="form-control form-control" value={props.owned}  min="0" readOnly="readonly"/>
        <div className="input-group-btn-vertical">
          <button class="btn btn-default" onClick={props.increment} type="button"><i class="fa fa-caret-up"></i></button>
          <button class="btn btn-default" onClick={props.decrement} type="button"><i class="fa fa-caret-down"></i></button>
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
    <tr className={id[data[props.value].logogram][0] + v}>

      <td>
      <Tooltip
                  placement="right" style={{width: "100%"}}
                  content={
                    <div>
                      <p style={{width:"200px"}}>{id[data[props.value].logogram][lang]}</p>
                      <p>Obtained from:</p>
                      <p>{data[props.value].source}</p>
                    </div>
                  }
                >
        <img src= {images[id[data[props.value].logogram][0] + ".png"]} alt=""/>
        {id[data[props.value].logogram][lang]}
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
  for(let i = 0; i < combos[flipped].mneme1.length; i++){
    if(i%2===0){
      c = "mo";
    } else {c = "me";}
    mnem.push(
      <>
      <div className={"col-4 " + c}>
      <p>{id[combos[flipped].mneme1[i]][lang]}</p>
      </div>
      <div className={"col-4 " + c}>
      <p>{id[combos[flipped].mneme2[i]][lang]}</p>
      </div>
      <div className={"col-4 " + c}>
      <p>{id[combos[flipped].mneme3[i]][lang]}</p>
      </div>
      </>
    );
  }

    return (
        <div className="row info-box">
          <div className="col-6">
            <p className="title">Name: {id[combos[flipped].name][lang]}</p>
          </div>
          <div className="col-3">
            <p className="title">Type: {combos[flipped].type}</p>
          </div>
          <div className="col-3">
            <p className="title">Uses: {combos[flipped].use}</p>
          </div>
          <div className="col-12">
          <p className="title">{id[combos[flipped].description][lang]}</p>
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

class Popup extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          {this.props.text}
          <button className="col-6 btn btn-success" onClick={this.props.updateBoard}>{this.props.activate}</button>
          <button className="col-6 btn btn-danger"onClick={this.props.closePopup}>close</button>
        </div>
      </div>
    );
  }
}

class Languages extends React.Component {
  renderLang() {
    let row = [];
    row.push(<Language
                onClick={() => this.props.lang(0)}
                value={"English"}
                key={0}
              />);
    row.push(<Language
                onClick={() => this.props.lang(1)}
                value={"Francais"}
                key={1}
              />);
    row.push(<Language
                onClick={() => this.props.lang(2)}
                value={"Deutsch"}
                key={2}
              />);
    row.push(<Language
                onClick={() => this.props.lang(3)}
                value={"日本語"}
                key={3}
              />);

    return row;
  }
  render() {
    return (
      <>
        {this.renderLang()}

      </>
    );
  }
}

class Jobs extends React.Component {
  renderJob() {
    let row = [];
    row.push(<Job
                onClick={() => this.props.job("jobs")}
                value={"All"}
                key={1}
              />);
    row.push(<Job
                onClick={() => this.props.job("tank")}
                value={"Tank"}
                key={2}
              />);
    row.push(<Job
                onClick={() => this.props.job("heal")}
                value={"Heal"}
                key={3}
              />);
    row.push(<Job
                onClick={() => this.props.job("dps")}
                value={"DPS"}
                key={4}
              />);
    row.push(<Job
                onClick={() => this.props.job("rngdps")}
                value={"Ranged DPS"}
                key={5}
              />);
    row.push(<Job
                onClick={() => this.props.job("mgcdps")}
                value={"Magic DPS"}
                key={6}
              />);

    return row;
  }
  render() {
    return (
      <>
        {this.renderJob()}

      </>
    );
  }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: clock(new Date())};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: clock(new Date())
    });
  }

  getEorzeaHour(time) {
      var seconds = parseInt(time / 1000);
      var bell = (seconds / 175) % 24;
      return Math.floor(bell);
  }

  getEorzeaMinute(time) {
    var seconds = parseInt(time / 1000);
    var bell = (seconds / (2+(11/12))) % 60;
    return Math.floor(bell);
  }

  getWeatherTimes(i) {
    var num = []
    var times = [];
    for(let j = -1; j < i-1; j++) {
      var chance = new Date();

      var bells = 175 * 8 * 1000;
      var eorzeaTime = clock(chance);

      var eorzeaHour = this.getEorzeaHour(chance);
      eorzeaHour =  eorzeaHour - (Math.floor(eorzeaHour / 8) * 8);

      var eorzeaMinute = this.getEorzeaMinute(chance);
      var subTime = (eorzeaHour*bells / 8) + (eorzeaMinute*(2 +(11/12))*1000)
      var time = new Date(chance.getTime() - subTime + (j*bells));

      time.setSeconds(time.getSeconds()-(time.getSeconds()%10));
      times.push(time);
      chance = calculateForecastTarget(new Date(chance.getTime() + (j*bells)));
      for(let k = 0; k < weather.pyros.length; k++) {
        if(chance < weather.pyros[k].chance) {
          num.push(weather.index[k]);
          break;
        }
      }
    }
    return [num, times];
  }

  renderWeather() {
    var row = [];
    var [wthr, times] = this.getWeatherTimes(5);
    for(let i = 0; i < wthr.length; i++) {
      row.push(
        <li>
          <img src={images[wthr[i] + '.png']} alt="" />
          {times[i].toLocaleTimeString(navigator.language)}
        </li>
      );
    }

    return <ol>{row}</ol>
  }

  render() {
    return (
      <div>
        <h1>Time: </h1>
        <p>ET: {this.state.date}</p>
        {this.renderWeather()}
      </div>
    )
  }
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
      if((this.props.mod === 3) || (j%2 === this.props.mod)) {
        row.push(<Mneme value={j}
                    totals={this.props.totals[id[data[j].name][0]]}
                    owned={this.props.owned[j]}
                    increment={() => this.props.increment(j)}
                    decrement={() => this.props.decrement(j)}
                    check={this.props.checkMneme[j]}
                    key={j}/>);
      }
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
        opacity={"opacity(" + this.props.opacity[j] +")"}
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
      image: Array(50).fill(null),
      checkMneme:Array(24).fill(1),
      checkLogo:Array(24).fill(1),
      count: 0,
      totals: Array(50).fill(null),
      flipped: null,
      owned: Array(50).fill(0),
      possible: Array(50).fill(0),
      showPopup: false,
      clicked: 0,
      opacity: Array(50).fill(1),
    };
  }

  togglePopup(i) {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  checkPossible(amount, totals, image) {

    let diff = new Map();
    for(let i = 0; i < 24; i++) {
      if(totals[id[data[i].name][0]]) {
        diff.set(id[data[i].name][0], amount[i]);
      }
    }

    for(let i = 0; i < 50; i++) {

      for(let j = 0; j < combos[i].amount; j++) {
        let cnt = 0;
        let amounts = new Map(diff);
        if(amounts.get(id[combos[i].mneme1[j]][0])) {
          cnt++;
          amounts.set(id[combos[i].mneme1[j]][0], amounts.get(id[combos[i].mneme1[j]][0])-1);
        }
        if(amounts.get(id[combos[i].mneme2[j]][0]) || id[combos[i].mneme2[j]][0] === "") {
          amounts.set(id[combos[i].mneme2[j]][0], amounts.get(id[combos[i].mneme2[j]][0])-1);
          cnt++;
        }
        if(amounts.get(id[combos[i].mneme3[j]][0]) || id[combos[i].mneme3[j]][0] === "") {
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
      if(key === 'opacity') {
        continue;
      }
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
    if(totals[id[data[i].name][0]] - owned[i] <= 0){
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
    if(this.state.totals[id[data[i].name][0]] - owned[i] > 0){
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

  lang(i) {
    lang = i;
    this.setState({lang: i});
  }

  job(i) {
    const opacity = this.state.opacity.slice();
    for(let j = 0; j < opacity.length; j++) {
      if(combos[j][i]) {
        opacity[j] = 1;
      } else {
        opacity[j] = 0.2;
      }
    }
    this.setState({opacity: opacity});
  }

  updateBoard(i) {
    const squares = this.state.squares.slice();
    const image = this.state.image.slice();
    const owned = this.state.owned.slice();
    const checkMneme = this.state.checkMneme.slice();

    if(squares[i]) {
      squares[i] = null;
      image[i] = images["empty.png"];
    } else{
      squares[i] = id[combos[i].name][0];
      image[i] = images[id[combos[i].name][0]+ ".png"];
    }


    var totals = calculcateTotal(squares);
    var [checkLogo, mneme] = calculateMnemes(squares, checkMneme, owned);
    image[i] = this.checkPossible(owned, totals, image)[i];

    this.setState({
      squares: squares,
      image: image,
      count: squares.filter(Boolean).length,
      checkMneme: mneme,
      checkLogo: checkLogo,
      totals: totals,
    });
    this.togglePopup();
  }

  handleClick(i) {
    const { width } = this.state;
    const isMobile = width <= 768;
    const squares = this.state.squares.slice();
    const image = this.state.image.slice();
    const owned = this.state.owned.slice();
    const checkMneme = this.state.checkMneme.slice();

    if(isMobile) {
          this.togglePopup();
          this.setState({clicked: i});
    } else {
      if(squares[i]) {
        squares[i] = null;
        image[i] = images["empty.png"];
      } else{
        squares[i] = id[combos[i].name][0];
        image[i] = images[id[combos[i].name][0]+ ".png"];
      }


      var totals = calculcateTotal(squares);
      var [checkLogo, mneme] = calculateMnemes(squares, checkMneme, owned);
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

    if (isMobile) {
      return (
        <>
        <div className="row">
          <div>
            <img src={require('./img/banner1.png')} className={"img-fluid"} alt="" style={{marginBottom:"25px"}}/>
          </div>
        </div>
        <div className="row btn-group">
            <Languages
              lang={(i) => this.lang(i)}
            />
        </div>
        <br/>
        <div className="row">
        <Collapsible trigger={id[109][lang]}>
          <div className="Row">
          <div className="col-12">
          <Jobs
            job={(i) => this.job(i)}
          />
          </div>
          <div className="tabletitle_m">
            <h2>{id[111][lang]}</h2>
            <h4>{id[112][lang]}</h4>
            <Board
              squares={this.state.squares}
              image={this.state.image}
              onClick={(i) => this.handleClick(i)}
              onMouseOut={(i) => this.onMouseOut(i)}
              onMouseOver={(i) => this.onMouseOver(i)}
              opacity={this.state.opacity}
            />
            <div className="row">
            <div className="col-12">
              <h3>{id[113][lang]}</h3>
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
          </div>
          </div>
          </Collapsible>
        </div>
        <div className="row">
        <Collapsible trigger="MNEMES">
        <br/>
        <p>{id[116][lang]}</p>
        <p><img src = {images['empty.png']} alt=""/> = {id[114][lang]}</p>
        <p><img src = {images['empty-inverse.png']} alt=""/> = {id[115][lang]}</p>
          <Mnemes
            mod={3}
            checkMneme={this.state.checkMneme}
            totals={this.state.totals}
            owned={this.state.owned}
            increment={(i) => this.increment(i)}
            decrement={(i) => this.decrement(i)}
          />
          </Collapsible>
        </div>
        <div className="row">
          <Collapsible trigger={id[110][lang]}>
            <Logogram
              checkLogo={this.state.checkLogo}
              />
          </Collapsible>
        </div>
        {this.state.showPopup ?
          <Popup
            closePopup={this.togglePopup.bind(this)}
            updateBoard={() => this.updateBoard(this.state.clicked)}
            text={label(this.state.flipped)}
            activate={this.state.squares[this.state.clicked] ? "Deactivate" : "Activate"}
          />
          : null
        }
        </>
      );
    } else {

    return (
      <div className="row">
        <div className="col-6">
          <div className="row">
            <div className="col-12">
              <img src={require('./img/banner1.png')} className={"img-fluid"} alt="" style={{marginBottom:"25px"}}/>
            </div>
            <div className="col-12">
              <p>{id[116][lang]}</p>
            </div>
            <div className="row">
              <div className="col-6">
                <Mnemes
                  mod={0}
                  checkMneme={this.state.checkMneme}
                  totals={this.state.totals}
                  owned={this.state.owned}
                  increment={(i) => this.increment(i)}
                  decrement={(i) => this.decrement(i)}
                />
              </div>
              <div className="col-6">
                <Mnemes
                  mod={1}
                  checkMneme={this.state.checkMneme}
                  totals={this.state.totals}
                  owned={this.state.owned}
                  increment={(i) => this.increment(i)}
                  decrement={(i) => this.decrement(i)}
                />
              </div>
            </div>
            <div class="row">
              <div className="col-12">
                <h2>{id[110][lang]}</h2>
              </div>
              <div className="col-12">
                <Logogram
                  checkLogo={this.state.checkLogo}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="row">
            <div className="col-12">
              <div className="btn-group">
                <Languages
                  lang={(i) => this.lang(i)}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <p><img src = {images['empty.png']} alt=""/> = {id[114][lang]}</p>
            </div>
            <div className="col-6">
              <p><img src = {images['empty-inverse.png']} alt=""/> = {id[115][lang]}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-2">
              <p>Filter:  -   </p>
            </div>
            <div className="col-10 btn-group">
              <Jobs
                job={(i) => this.job(i)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="tabletitle">
                <h2>{id[111][lang]}</h2>
                <h4>{id[112][lang]}</h4>
                <Board
                  squares={this.state.squares}
                  image={this.state.image}
                  onClick={(i) => this.handleClick(i)}
                  onMouseOut={(i) => this.onMouseOut(i)}
                  onMouseOver={(i) => this.onMouseOver(i)}
                  opacity={this.state.opacity}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <h3>{id[113][lang]}</h3>
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
      remaining.add(id[combos[i].mneme1[0]][lang]);
      remaining.add(id[combos[i].mneme2[0]][lang]);
      remaining.add(id[combos[i].mneme3[0]][lang]);
    }
  }

  return Array.from(remaining);
}

function calculcateTotal(squares) {
  var total = [];
  for(let i = 0; i < squares.length; i++){
    if(squares[i]) {

    } else {
      total.push(id[combos[i].mneme1[0]][0]);
      total.push(id[combos[i].mneme2[0]][0]);
      total.push(id[combos[i].mneme3[0]][0]);
    }
  }
  return counts(total);
}

function calculcateLogos(l) {
  let ret = null;
  for(let i = 0; i < 24; i++){
    if(id[data[i].name][0] === l) {
      ret = id[data[i].logogram][0];
    }
  }
  return ret;
}

function calculateMnemes(squares, checkMneme, owned) {
  var left = calculateRemaining(squares);
  var totals = calculcateTotal(squares);
  var total = [];
  for(let i = 0; i < 24; i++) {
    if(totals[id[data[i].name][0]] - owned[i] > 0) {
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

function calculateForecastTarget(lDate) {
        // Thanks to Rogueadyn's SaintCoinach library for this calculation.

        var unixSeconds = parseInt(lDate.getTime() / 1000);
        // Get Eorzea hour for weather start
        var bell = unixSeconds / 175;

        // Do the magic 'cause for calculations 16:00 is 0, 00:00 is 8 and 08:00 is 16
        var increment = (bell + 8 - (bell % 8)) % 24;

        // Take Eorzea days since unix epoch
        var totalDays = unixSeconds / 4200;
        totalDays = (totalDays << 32) >>> 0; // uint

        // 0x64 = 100
        var calcBase = totalDays * 100 + increment;

        // 0xB = 11
        var step1 = ((calcBase << 11) ^ calcBase) >>> 0; // uint
        var step2 = ((step1 >>> 8) ^ step1) >>> 0; // uint

        // 0x64 = 100
        return step2 % 100;
    }


function clock(time) {
  var epoch = (60 * 24) / 70;

  return new Date((time * epoch) - (60*60*1000)).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
}

import React, { Component } from 'react';
import { createContainer } from 'react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Challenges } from '../../api/challenges/challenges';
import { Link } from 'react-router';
import Moment from 'react-moment';

const defaultArrangements = ["custom", "AAABDEFGHJKLLMNN   VOTRE TEX*E ICI   OPPQQRSSSUUWYZ?:", "pause"];

// height of all letters
const letterHeight = 2.4;

// leave extra space for errors
const defaultErrorMargin = 0.15;

// default width for space character
const defaultSpaceWidth = 0.7;

// meters to pixels
const visualisationScale = 10;

// width 
let letterWidth = {
  "A": 1.485,
  "B": 1.485,
  "C": 1.485,
  "D": 1.485,
  "E": 1.485,
  "F": 1.485,
  "G": 1.485,
  "H": 1.485,
  "I": 1.485,
  "J": 1.485,
  "K": 1.485,
  "L": 1.485,
  "M": 1.8,
  "N": 1.485,
  "O": 1.485,
  "P": 1.485,
  "Q": 1.485,
  "R": 1.485,
  "S": 1.485,
  "T": 1.485,
  "U": 1.485,
  "V": 1.485,
  "W": 1.8,
  "X": 1.485,
  "Y": 1.485,
  "Z": 1.485,
  "?": 1.485,
  ":": 1.485,
  "*": 1.485,
}

// additional spacing left and right
const letterSpacing = {
  " ": -0.08, // here we give negative spacing to remove space given from the other letters
  "A": 0.035,
  "B": 0.035,
  "C": 0.035,
  "D": 0.035,
  "E": -0.08, // here we give negative spacing to remove space given from the other letters
  "F": -0.08, // here we give negative spacing to remove space given from the other letters
  "G": 0.035,
  "H": 0.035,
  "I": -0.08, // here we give negative spacing to remove space given from the other letters
  "J": -0.08,
  "K": 0.035,
  "L": -0.08,
  "M": 0.035,
  "N": 0.035,
  "O": 0.035,
  "P": 0.035,
  "Q": 0.035,
  "R": 0.035,
  "S": 0.035,
  "T": -0.08, // here we give negative spacing to remove space given from the other letters
  "U": 0.035,
  "V": 0.035,
  "W": 0.035,
  "X": 0.035,
  "Y": -0.08, // here we give negative spacing to remove space given from the other letters
  "Z": 0.035,
  "?": 0.035,
  ":": -0.08, // here we give negative spacing to remove space given from the other letters
  "*": -0.08, // here we give negative spacing to remove space given from the other letters
}

class SpacerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromText: "",
      toText: "",
      width: 0,
      errorMargin: defaultErrorMargin,
      spaceWidth: defaultSpaceWidth
    }
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.renderInstructions = this.renderInstructions.bind(this);
    this.assembleToArray = this.assembleToArray.bind(this);
    this.calculatePosition = this.calculatePosition.bind(this);
    this.getWidth = this.getWidth.bind(this);
    this.renderVisualisation = this.renderVisualisation.bind(this);
    this.handleErrorChange = this.handleErrorChange.bind(this);
    this.handleSpaceChange = this.handleSpaceChange.bind(this);
    this.checkForCollision = this.checkForCollision.bind(this);
  }

  handleInputChange(event) {
    if(event.target.name == "from") {
      this.setState({fromText: event.target.value});  
      this.setState({fromWidth: this.getWidth(event.target.value)});
    } else {
      this.setState({toText: event.target.value});  
      this.setState({width: this.getWidth(event.target.value)});
    }
  }

  handleSelectChange(event) {
    let text = event.target.value;
    if(text == "custom") {
      text = "";
    }
    console.log(text);
    if(event.target.name == "from") {
      this.setState({fromText: text});  
    } else {
      this.setState({toText: text});  
      this.setState({width: this.getWidth(text)});
    }
  }

  assembleToArray(text) {
    let array = text.split("");
    let toArray = [];
    let letterCounter = 1;
    for(let i = 0; i < array.length; i++) {
      toArray.push({
        letter: array[i].toUpperCase(),
        resolved: false,
        letterIndex: letterCounter
      });
      if(array[i] != " ") {
        letterCounter++;
      }
    }
    return toArray;
  }

  getLetterWidth(letter) {
    return letter == " " ? this.state.spaceWidth : letterWidth[letter];
  }

  // todo: update using calculate position!
  getWidth(text) {
    let toArray = this.assembleToArray(text);
    if(toArray.length == 0) {
      return 0;
    }
    return this.calculatePosition(toArray, toArray.length - 1) + this.getLetterWidth(toArray[toArray.length - 1].letter);
  }

  handleSpaceChange(event) {
    event.preventDefault();
    console.log(this.spaceInput.value);
    this.setState({spaceWidth: parseFloat(this.spaceInput.value)});
  }

  handleErrorChange(event) {
    event.preventDefault();
    console.log(this.errorInput.value);
    this.setState({errorMargin: parseFloat(this.errorInput.value)});
  }

  // give an array of letters, calculates the position of index
  calculatePosition(toArray, index) {
    let pos = 0;
    let lastSpacingRight = 0;
    let width = 0;

    for(let i = 0; i <= index; i++) {
      let spacing = letterSpacing[toArray[i].letter];
      let spacingLeft = spacing;
      let spacingRight = spacing;

      if(lastSpacingRight + spacingLeft < 0) { // make sure we never have negative spacing for real!
        lastSpacingRight = this.state.errorMargin; // always leave wiggleSpace
        spacingLeft = 0;
      }
      if(i == 0) {
        spacingLeft = 0; // ignore first left spacing
      }

      width = this.getLetterWidth(toArray[i].letter);

      pos += lastSpacingRight + spacingLeft + width; 
      lastSpacingRight = spacingRight + this.state.errorMargin; // save this for next iteration (only relevant if there is a next letter)
    }

    return pos - width; // give back left side of letter base    
  }

  // warning: this assumes positions in fromArray have been calculated and state.fromWidth is set
  checkForCollision(toArray, index, fromArray) {
    let offset = this.getWidth(this.state.toText) / 2;
    let fromOffset = this.getWidth(this.state.fromText) / 2;

    // get position of index in toArray
    let targetPosition = this.calculatePosition(toArray, index) - offset;
    
    // go over fromArray and see if something is there
    let warningString = ""
    fromArray.forEach((item)=>{
      let comparePosition = item.position - fromOffset;
      if(item.letter != " " && Math.abs(comparePosition - targetPosition) < 1.4 && item.letter != toArray[index].letter && !item.willBeRemoved) {
        warningString += (warningString ? ", " : "") + "collision: " + item.letter;
      }
    });

    if(warningString) {
      warningString = "(" + warningString + ")";
    }

    return warningString;
  }

  renderInstructions() {
    let fromArray = this.assembleToArray(this.state.fromText);
    let toArray = this.assembleToArray(this.state.toText);

    getUnresolvedIndex = function(array, letter) {
      for(let i = 0; i < array.length; i++) {
        if(array[i].letter == letter && !array[i].resolved) {
          return i;
        }
      }
      return -1;
    }

    let instructions = [];
    let keep = [];
    let bring = [];
    let remove = [];

    // go over fromArray and see if letter should get removed or we can keep it
    for(let i = 0; i < fromArray.length; i++) {
      let item = fromArray[i];
      item.position = this.calculatePosition(fromArray, i);
      if(item.letter != " ") {
        let index = getUnresolvedIndex(toArray, item.letter);
        if(index > -1) {
          keep.push({letter: item.letter, index: index, letterIndex: toArray[index].letterIndex});
          toArray[index].resolved = true; // mark as used
        } else {
          remove.push(item);
          fromArray[i].willBeRemoved = true;
        }  
      }
    } 

    // go over remaining toArray and get the rest of the letters
    toArray.forEach((item, index) => {
      if(item.letter != " " && !item.resolved) {        
        bring.push({letter: item.letter, index: index, letterIndex: item.letterIndex});
      }
    });

    let offset = this.getWidth(this.state.toText) / 2;
    let fromOffset = this.getWidth(this.state.fromText) / 2;
    console.log(offset);
    console.log(fromOffset);

    return (
      <div>
        <h3>REMOVE</h3>
        <ul>{remove.map((l, i)=><li key={i}>{l.letter} from {(l.position - fromOffset).toFixed(1)}</li>)}</ul>
        <h3>KEEP</h3>
        <ul>{keep.map((l, i)=><li key={i}><b>{l.letter}</b> ({l.letterIndex}) align at <b>{(this.calculatePosition(toArray, l.index) - offset).toFixed(1)}</b> {this.checkForCollision(toArray, l.index, fromArray)}</li>)}</ul>
        <h3>BRING</h3>
        <ul>{bring.map((l, i)=><li key={i}><b>{l.letter}</b> ({l.letterIndex}) align at <b>{(this.calculatePosition(toArray, l.index) - offset).toFixed(1)}</b></li>)}</ul>
      </div>
    );
  }

  renderVisualisation() {
    let toArray = this.assembleToArray(this.state.toText);
    let offset = this.state.width / 2;
    let letterSpans = toArray.map((l, i)=>
      <span key={i} style={{
        position: "absolute", 
        border: l.letter == " " ? "" : "1px solid #ddd", 
        width: visualisationScale * this.getLetterWidth(l.letter),
        left: visualisationScale * this.calculatePosition(toArray, i),
        height: visualisationScale * letterHeight,
        textAlign: "center",
        lineHeight: (visualisationScale * letterHeight) + "px",
        fontFamily: 'Impact',
        fontSize: visualisationScale * letterHeight / 1.2
      }}>{l.letter}</span>
    );
    return (
      <div style={{position: "relative", height: 50, marginTop: 20}}>{letterSpans}</div>
    )
  }

  render() {
    let arrangements = [];
    defaultArrangements.forEach((d)=>{
      arrangements.push({label: "sepcial: " + d, content: d});
    });
    console.log(arrangements);
    console.log(this.props.challenges);
    this.props.challenges.forEach((c)=>{
      if(c.winningProposal) {
        arrangements.push({label: "winner " + c.title.fr + ": " + c.winningProposal.text, content: c.winningProposal.text});
      }
    });
    console.log(arrangements);
    const arrangementOptions = arrangements.map((arrangement, index)=><option label={arrangement.label} key={index}>{arrangement.content}</option>);
    const instructions = this.renderInstructions();
    const visualisation = this.renderVisualisation();
    return (
      <form autoComplete="off">
        <h1>SPACER</h1>
        <h2>FROM</h2>
        <select name="from" onChange={this.handleSelectChange}>{arrangementOptions}</select>
        <input name="from" type="text" onChange={this.handleInputChange} value={this.state.fromText}/>
        <h2>TO</h2>
        <select name="to" onChange={this.handleSelectChange}>{arrangementOptions}</select>
        <input name="to" type="text" onChange={this.handleInputChange} value={this.state.toText}/>
        {visualisation}
        <h3>WIDTH: {this.state.width.toFixed(2)} M</h3>
        {instructions}
        <div>Margin of error: <input ref={(input) => { this.errorInput = input; }} name="error" type="text" defaultValue={defaultErrorMargin}/><button onClick={this.handleErrorChange}>Update</button></div>
        <div>Space width: <input ref={(input) => { this.spaceInput = input; }} name="space" type="text" defaultValue={defaultSpaceWidth}/><button onClick={this.handleSpaceChange}>Update</button></div>

      </form>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('get.challenges');
  return {
    challenges: Challenges.find({}, { sort: { start_date: 1 } }).fetch(),
  };
}, SpacerPage);
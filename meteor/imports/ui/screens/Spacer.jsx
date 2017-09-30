import React, { Component } from 'react';
import { createContainer } from 'react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import Moment from 'react-moment';

const defaultArrangements = ["custom", "votre tex*e ici", "pause"];

// height of all letters
const letterHeight = 2.4;

// leave extra space for errors
const defaultErrorMargin = 0.1;

// meters to pixels
const visualisationScale = 20;

// width 
const letterWidth = {
  " ": 0.6,
  "A": 0.8,
  "B": 0.8,
  "C": 0.8,
  "D": 0.8,
  "E": 0.8,
  "F": 0.8,
  "G": 0.8,
  "H": 0.8,
  "I": 0.8,
  "J": 0.8,
  "K": 0.8,
  "L": 0.8,
  "M": 1.2,
  "N": 0.8,
  "O": 0.8,
  "P": 0.8,
  "Q": 0.8,
  "R": 0.8,
  "S": 0.8,
  "T": 0.8,
  "U": 0.8,
  "V": 0.8,
  "W": 1.2,
  "X": 0.8,
  "Y": 0.8,
  "Z": 0.8,
  "?": 0.8,
  ":": 0.8,
  "*": 0.8,
}

// additional spacing left and right
const letterSpacing = {
  " ": -0.07, // here we give negative spacing to remove space given from the other letters
  "A": 0.07,
  "B": 0.07,
  "C": 0.07,
  "D": 0.07,
  "E": 0.07,
  "F": 0.07,
  "G": 0.07,
  "H": 0.07,
  "I": -0.07, // here we give negative spacing to remove space given from the other letters
  "J": 0.07,
  "K": 0.07,
  "L": 0.07,
  "M": 0.07,
  "N": 0.07,
  "O": 0.07,
  "P": 0.07,
  "Q": 0.07,
  "R": 0.07,
  "S": 0.07,
  "T": 0.07,
  "U": 0.07,
  "V": -0.07, // here we give negative spacing to remove space given from the other letters
  "W": 0.07,
  "X": 0.07,
  "Y": 0.07,
  "Z": 0.07,
  "?": 0.07,
  ":": -0.07, // here we give negative spacing to remove space given from the other letters
  "*": -0.07, // here we give negative spacing to remove space given from the other letters
}

class SpacerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromText: "",
      toText: "",
      width: 0,
      errorMargin: defaultErrorMargin
    }
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.renderInstructions = this.renderInstructions.bind(this);
    this.assembleToArray = this.assembleToArray.bind(this);
    this.calculatePosition = this.calculatePosition.bind(this);
    this.getWidth = this.getWidth.bind(this);
    this.renderVisualisation = this.renderVisualisation.bind(this);
    this.handleErrorChange = this.handleErrorChange.bind(this);
  }

  handleInputChange(event) {
    if(event.target.name == "from") {
      this.setState({fromText: event.target.value});  
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
    if(event.target.name == "from") {
      this.setState({fromText: text});  
    } else {
      this.setState({toText: text});  
      this.setState({width: this.getWidth(text)});
    }
  }

  assembleToArray(text) {
    return text.split("").map((l)=>{return {letter: l.toUpperCase(), resolved: false}});
  }

  // todo: update using calculate position!
  getWidth(text) {
    let toArray = this.assembleToArray(text);
    return this.calculatePosition(toArray, toArray.length - 1) + letterWidth[toArray[toArray.length - 1].letter] / 2
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
      pos += lastSpacingRight + spacingLeft + letterWidth[toArray[i].letter]
      lastSpacingRight = spacingRight + this.state.errorMargin; // save this for next iteration (only relevant if there is a next letter)
    }

    return pos - (letterWidth[toArray[index].letter] / 2) // give back center of letter base    
  }

  renderInstructions() {
    let fromArray = this.state.fromText.split("").map((l)=>l.toUpperCase());
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
    fromArray.forEach((letter) => {
      if(letter != " ") {
        let index = getUnresolvedIndex(toArray, letter);
        if(index > -1) {
          keep.push({letter: letter, index: index});
          toArray[index].resolved = true; // mark as used
        } else {
          remove.push(letter);
        }  
      }
    }) 

    // go over remaining toArray and get the rest of the letters
    toArray.forEach((item, index) => {
      if(item.letter != " " && !item.resolved) {        
        bring.push({letter: item.letter, index: index});
      }
    });

    let offset = this.state.width / 2

    return (
      <div>
        <h3>REMOVE</h3>
        <ul>{remove.map((l, i)=><li key={i}>{l}</li>)}</ul>
        <h3>KEEP</h3>
        <ul>{keep.map((l, i)=><li key={i}>{l.letter} {l.index + 1} {(this.calculatePosition(toArray, l.index) - offset).toFixed(2)}</li>)}</ul>
        <h3>BRING</h3>
        <ul>{bring.map((l, i)=><li key={i}>{l.letter} {l.index + 1} {(this.calculatePosition(toArray, l.index) - offset).toFixed(2)}</li>)}</ul>
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
        width: visualisationScale * letterWidth[toArray[i].letter],
        left: visualisationScale * this.calculatePosition(toArray, i) - (visualisationScale * letterWidth[toArray[i].letter] / 2),
        height: visualisationScale * letterHeight,
        textAlign: "center",
        lineHeight: (visualisationScale * letterHeight) + "px",
        fontFamily: 'Impact',
        fontSize: visualisationScale * letterHeight / 2
      }}>{l.letter}</span>
    );
    return (
      <div style={{position: "relative", height: 50, marginTop: 20}}>{letterSpans}</div>
    )
  }

  render() {
    const defaultArrangementOptions = defaultArrangements.map((arrangement, index)=><option key={index}>{arrangement}</option>);
    const instructions = this.renderInstructions();
    const visualisation = this.renderVisualisation();
    return (
      <form autoComplete="off">
        <h1>SPACER</h1>
        <h2>FROM</h2>
        <select name="from" onChange={this.handleSelectChange}>{defaultArrangementOptions}</select>
        <input name="from" type="text" onChange={this.handleInputChange} value={this.state.fromText}/>
        <h2>TO</h2>
        <select name="to" onChange={this.handleSelectChange}>{defaultArrangementOptions}</select>
        <input name="to" type="text" onChange={this.handleInputChange} value={this.state.toText}/>
        {visualisation}
        <h3>WIDTH: {this.state.width.toFixed(2)} M</h3>
        {instructions}
        <div>Margin of error: <input ref={(input) => { this.errorInput = input; }} name="error" type="text" defaultValue={defaultErrorMargin}/><button onClick={this.handleErrorChange}>Update</button></div>

      </form>
    );
  }
}

export default createContainer(() => {
  return {
    
  };
}, SpacerPage);

import React, { Component } from 'react';
import { Session } from 'meteor/session';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
        filter: Session.get(this.props.sessionVarName)
    };
    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  handleFilterChange (event) {
    const target = event.target;
    this.setState((prevState, props) => {
        let newState = { filter: prevState.filter }
        newState.filter[target.name] = target.value;
        newState.formChanged = true;
        return newState;
    },()=> {
        if (target.name == "sortField" || target.name == "sortOrder") {
            this.applyChanges()
        }
    });
  } 

  applyChanges() {
    Session.set(this.props.sessionVarName, this.state.filter)
    this.setState(()=> ( {formChanged: false}))
  }

  sortFieldOptions() {
    console.log(this.props.schema._schema)
    return Object.entries( this.props.schema._schema).map((entry)=>{
        const key = entry[0]
        const field = entry[1]
        const type = field.type.definitions[0].type.name
        const label = field.label || key
        return <option key={key} value={key}>{label}</option>
    })
  }

  searchFieldOptions() {
    console.log(this.props.schema._schema)
    return Object.entries( this.props.schema._schema).map((entry)=>{
        const key = entry[0]
        const field = entry[1]
        const type = field.type.definitions[0].type.name
        const label = field.label || key
        return <option value={key}>{label}</option>
    })
  }

  render() {
    return (
    <div>
        <form onSubmit={this.handleSubmit}>
            <h4>Sort</h4>
            <select value={this.state.filter.sortField} name="sortField" onChange={this.handleFilterChange}>
                {this.sortFieldOptions()}
            </select>
            <select value={this.state.filter.sortOrder} name="sortOrder" onChange={this.handleFilterChange}>
                <option value="asc">asc</option>
                <option value="desc">desc</option>
            </select>
            { this.state.formChanged && <input type="submit" value="Apply" /> }
        </form>
      </div>
    )
  }
}

export default Filter

/*
        <form>
            <select name="searchField" onChange={this.handleFilterChange}>
                {this.searchFieldOptions()}
            </select>     
            <input name="searchQuery" type="text" onChange={this.handleFilterChange}/> 
            <input name="searchSubmit" type="submit" value="Search" onChange={this.handleFilterChange}/> 
            <input name="searchReset" type="reset" value="Reset" onChange={this.handleFilterChange}/> 
        </form>
        */
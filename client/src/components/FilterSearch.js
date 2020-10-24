import React, { Component } from "react";
import SelectSearch from 'react-select-search'
import './filterSearch.css';

class FilterSearch extends Component {
  render() {
    var key = this.props.name + "." + this.props.identifier

    return (
       <SelectSearch
                    name={this.props.name}
                    options={this.props.options}
                    placeholder={this.props.name.replace("_", " ")}
                    onChange={change => this.props.change({[key]: isNaN(change) ? change : parseInt(change)})}
                    search={true}
                />
    );
  }
}

export default FilterSearch;

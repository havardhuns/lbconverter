import React, { Component } from "react";
import lbIcon from "../static/letterboxd-icon.png";
import MaterialIcon from "material-icons-react";
import Checkbox from 'react-simple-checkbox';





class LbFilter extends Component {
  render() {
    return (
        <div
          style={{
            width: "150px",
            height: "60px",
            borderRadius: '20px',
            border: '5px solid #0c3653',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0px 10px'
          }}
        >
            <img
          src={lbIcon}
          alt="letterboxdIcon"
          width={"100px"}
          height={"37px"}
          style={{pointer: 'cursor'}}
          onClick={() => this.props.fun(true)}
        />
        {!this.props.file ? (
            <div style={{marginTop: '3px', cursor: "pointer"}}>
                <MaterialIcon icon="note_add" color="white" size="medium" onClick={() => this.props.fun(true)}/>
            </div> 
            ):(
              <div style={{position: 'absolute', right: 25, top: 18}}>
                <Checkbox
                    checked={this.props.checked}
                    color="#00e154"
                    size="3"
                    onChange={isChecked => this.props.onChecked(isChecked)}
                    />
                </div>
            )}
        </div>
    );
  }
}

export default LbFilter;

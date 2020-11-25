
import React, { Component } from "react";

/**
 * class addspec to display	SPECIFY GS1 DATA ATTRIBUTES
 * @param {list} List list of all  SPECIFY GS1 DATA ATTRIBUTES : AI name or numerical value
 * change placeholder

 */
class AddspecAtt extends Component {
    state = {
        open: false,

    }


    render() {


        return (

            <div className="form-group">
                <label htmlFor="message">{this.props.label}({this.props.placeholder}) </label>
                <input type="text" placeholder={this.props.placeholder}
                    className={`form-control ${this.props.nameError ? 'is-invalid' : ''}`}
                    disabled={this.props.disabled}
                    onChange={this.props.brand} />
				<div className='invalid-feedback'>{this.props.nameError}</div>

            </div>
        )

    }
}

export default AddspecAtt
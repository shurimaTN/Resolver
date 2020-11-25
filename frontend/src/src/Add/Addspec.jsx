
import React , {Component} from "react";

/**
 * class addspec
 */
 class AddspecAtt extends Component{
    state={ 
        open:false,
       
       }


    render(){


        return( 

<div className="form-group">
        <label htmlFor="message">{this.props.label}({this.props.placeholder}) </label>
         <input type="text" placeholder={this.props.placeholder}  className="form-control"  onChange={this.props.brand} />
         </div>
        )
  
       }
}

export default AddspecAtt
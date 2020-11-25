import React from "react";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ResponsiveContainer from "react-responsive-widget";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { CSVLink } from "react-csv";
import {Button} from '@material-ui/core'

import axios from "axios";
import CreateQRcode from "./Qrcodecreate";
const API_URL = require("../../const/api")() + "/get_product";

const expandRow = {

  renderer: (row, rowIndex) => (
    <div>
      <p >
       <span  style={{ color: "black", fontWeight: 'bold', textAlign: "center" }}>  {`DIGITAL LINK URI `}{"     :"} </span> {row.DL} </p>
       <p>    <span  style={{ color: "black", fontWeight: 'bold', textAlign: "center" }}>  {`DIGITAL LINK compressed `}{" "} </span> {row.DLcompressed} </p>

    
  
    
      <p>
        Description produit: {row.Description}
      </p>

      <CreateQRcode url={row.DLcompressed}> </CreateQRcode>
    </div>
  ),
  onlyOneExpanding: true,
};
const columns = [

  {
    dataField: "GTIN",
    text: "GTIN",
    filter: textFilter(),
  },
  {
    dataField: "cpv",
    text: "cpv",
    filter: textFilter(),
  },
  {
    dataField: "ser",
    text: "ser",
    filter: textFilter(),
  },
  {
    dataField: "lot",
    text: "lot",
    filter: textFilter(),
    events: {
      /**
 
* @param filter {string}  data-with list of product
* @returns list of product with Search param

*/
      onClick: (e, column, columnIndex) => {
      },
    },
  },
  {
    dataField: "LinkType",
    text: "LinkType",
    style: { textAlign: "center" },
    filter: textFilter(),

  },
 
  {
    dataField: "Description",
    text: "Description",
    style: { textAlign: "center" },
    filter: textFilter(),
   
  },

];

/**
 * Show product table with option search
 * @param tableshow {state}  data-with list of product
 * @param CSVLink {methode } print file csv or excel with list of all product
 * @param paginationFactory {methode} pagination table list 
 * @param filterFactory {filtre} Search product with gtin cpv ....
 * 

 */
class Search extends React.Component {
  state = {
    tableshow: [],
  };
  /**
 * Set state table "tableshow" with data url 
 * @param API_URL {string}  data-with list of product
 * @returns tableshow {list} data- state

 */
  componentDidMount() {
    const url = `${API_URL}`;
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        this.setState({ tableshow: data });
        //console.log(data);
      });
  }

  /**
 * function render: return virtual dom
 * @param props {string } include the list of props if that change 

 */
  render() {
    return (
      <ResponsiveContainer>
        <div className="app-row">
          <div className="app-col-xs-12 app-col-md-12">
            <BootstrapTable
              striped
              bordered
              hover
              variant="dark"
              expandRow={expandRow}
              bootstrap4={true}
              keyField="DL"
              data={this.state.tableshow}
              columns={columns}
              pagination={paginationFactory({
                sizePerPage: 15,
                sizePerPageList: [5, 10, 15, 20, 25],
              })}
              filter={filterFactory()}
            ></BootstrapTable>

          <CSVLink data={this.state.tableshow }><Button
          color="primary"
          variant="contained"
         
        >
          download csv
        </Button>
        
        </CSVLink>
            
            
          </div>
        </div>
      </ResponsiveContainer>
    );
  }
}
export default Search;
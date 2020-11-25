import React, { useState ,useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import axios from 'axios';
var urlusers = require('../../../const/api')() +"/allusers"



const classes={
  root: {
    minHeight: '100%',
  }
};
class CustomerListView extends React.Component {
  state = {
    customers: [],
  };
 
  componentDidMount() {
    axios
      .get(urlusers)
      .then((response) => response.data)
      .then((data) => {
        this.setState({ customers: data });
      });
  }

 render(){
  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results customers={this.state.customers} />
        </Box>
      </Container>
    </Page>
  );

 }
};

export default CustomerListView;




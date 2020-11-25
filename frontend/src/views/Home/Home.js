import React from 'react';
import logo from './logo.svg';
/**
 * class Home page : display simple Logo
 * @param  image {path}  path srco=logo
 */

function Home() {
    return ( 
<div class="center">

<img height="850px" width="1600px" src={logo} className="App-logo" alt="logo" />

</div>


    )}
    export default Home;
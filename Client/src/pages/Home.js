import React from "react";

import HomeHero from "../components/HomeHero";
import HomeContent from "../components/HomeContent";



class Home extends React.Component {
  render() {

    // Finally, render it!
    return (
      <div>
        <HomeHero/>
        <HomeContent/>
      </div>
    );
  }
}

export default Home;






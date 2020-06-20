import React from "react";
import Hero from "../../components/Hero/Hero";
import About from "../../components/About/About";
import AskUs from "../../components/AskUs/AskUs";
import Footer from "../../components/Footer/Footer";
class Landing extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <Hero />
        <About />
        <AskUs />
        <Footer />
      </div>
    );
  }
}

export default Landing;

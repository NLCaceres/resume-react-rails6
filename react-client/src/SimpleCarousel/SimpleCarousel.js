import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel';
import CarouselCss from "./Carousel.module.css";
import cnames from "classnames";

/* Bootstrap Carousel with defaults set - no control arrows or interval */
class SimpleCarousel extends Component {
  //@params: 2 Required Props - images and viewWidth
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      forceHoverClass: false,
    };
  }

  goToIndex = (newIndex, e) => {
    this.setState({ activeIndex: newIndex });
  }

  //* Goal: Let user know that carousel indicators are there onHover
  simulateHover = () => {
    let iterations = 0;
    this.fadeEffectInterval = setInterval(() => {
      iterations++; //* 6 runs! On 6th we clear THEN hide by class removal
      //* 1st iteration = Show, 2nd = hide, so on and so forth
      if (iterations > 5) clearInterval(this.fadeEffectInterval);
      this.setState((state) => ({ forceHoverClass: !state.forceHoverClass }));
    }, 750)
  }

  componentDidMount() {
    if (this.props.viewWidth >= 768) this.simulateHover();
  }
  componentWillUnmount() {
    if (this.props.viewWidth >= 768) clearInterval(this.fadeEffectInterval);
  }

  render() {
    return (
      <Carousel activeIndex={ this.state.activeIndex } onSelect={ this.goToIndex } controls={false}
        interval={null} data-testid="simple-carousel" className={ cnames(CarouselCss.full, "px-4 mt-3", 
        {"hovered-indicators": this.state.forceHoverClass}) }>
          { //? React-bootstrap expects 'Carousel.Item's so abstracting this block to a Func component DOESN'T work
            this.props.images.map(image => { //* Create an array of Carousel.Items to display
              return (
                <Carousel.Item key={ image.image_url }>
                  <img className={ cnames("img-fluid", this.props.viewWidth >= 768 ? CarouselCss.slide : CarouselCss.mobileSlide) }
                    src={ image.image_url } alt={ image.alt_text } />
                  { image.caption &&  
                    <Carousel.Caption> <h3>{image.caption}</h3> </Carousel.Caption>
                  }
                </Carousel.Item>
              )}
            )
          }
      </Carousel>
    );
  }
}

export default SimpleCarousel;

import React from 'react';
import Slider from 'react-slick';

import config from '../../config';
import getUniqueID from '../../utils/getUniqueID';

import './Gallery.less';

class Gallery extends React.Component {
  handlerClick(e) {
    e.stopPropagation();
  }

  renderSlider() {
    if (this.props.images.length) {
      const projectSliderSettings = {
        draggable: false,
        infinite: (this.props.images.length > 1),
        arrows: (this.props.images.length > 1),
        dots: false,
        fade: true,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false
      };

      return (
        <Slider {...projectSliderSettings}>
          {
            this.props.images.map(image =>
              <div key={getUniqueID()}>
                <span className="image-helper" />
                <img src={`${config.api.path.projectsImgs}/${image}`} alt={image} />
              </div>
            )
          }
        </Slider>
      );
    }

    return null;
  }

  render() {
    console.log('slider', this.props);
    return (
      <div className="project-slider">
        {this.renderSlider.bind(this)()}
      </div>
    );
  }
}

const CustomPrevArrow = props => (
  <button type="button" className="slick-prev" {...props} />
);

const CustomNextArrow = props => (
  <button type="button" className="slick-next" {...props} />
);

Gallery.propTypes = {
  images: React.PropTypes.array.isRequired
};

export default Gallery;

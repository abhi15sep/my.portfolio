import React from 'react';
import './Mask.less';

const Mask = props => (
  <div className={`mask ${(props.isMaskVisible) ? 'mask--show' : ''}`}>
    <button
      className="mask__close"
      onClick={props.handlerMaskClose}
    />
    {props.children}
  </div>
);

Mask.propTypes = {
  isMaskVisible: React.PropTypes.bool.isRequired,
  handlerMaskClose: React.PropTypes.func.isRequired
};

export default Mask;

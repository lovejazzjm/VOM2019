import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules, tagPropType } from '../util';

const Container = forwardRef((props, ref) => {
  let { className, fluid, cssModule, tag: Tag, ...other } = props;
  const classes = mapToCssModules(
    classNames(className, fluid ? 'container-fluid' : 'container'),
    cssModule,
  );
  return <Tag className={classes} ref={ref} {...other} />;
});

Container.defaultProps = {
  tag: 'div',
};

Container.propTypes = {
  className: PropTypes.string,
  fluid: PropTypes.bool,
  cssModule: PropTypes.object,
  tag: tagPropType,
};

export default Container;

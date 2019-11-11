import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules, tagPropType } from '../util';

const Badge = forwardRef((props, ref) => {
  let { className, color, pill, cssModule, tag: Tag, ...other } = props;

  const classes = mapToCssModules(
    classNames(
      className,
      'badge',
      'badge-' + color,
      pill ? 'badge-pill' : false,
    ),
    cssModule,
  );

  if (other.href && Tag === 'span') {
    Tag = 'a';
  }

  return <Tag className={classes} ref={ref} {...other} />;
});

Badge.defaultProps = {
  color: 'secondary',
  pill: false,
  tag: 'span',
};

Badge.propTypes = {
  color: PropTypes.string,
  pill: PropTypes.bool,
  tag: tagPropType,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
};

export default Badge;

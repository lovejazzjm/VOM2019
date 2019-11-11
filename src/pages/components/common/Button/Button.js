import React, { forwardRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { mapToCssModules, tagPropType } from '../util';

const Button = forwardRef((props, ref) => {
  let {
    className,
    color,
    size,
    outline,
    block,
    close,
    active,
    cssModule,
    tag: Tag,
    startIcon: startIconProp,
    endIcon: endIconProp,
    ...other
  } = props;

  if (close && typeof other.children === 'undefined') {
    other.children = <span aria-hidden>x</span>;
  }

  if (other.href && Tag === 'button') {
    Tag = 'a';
  }

  const classes = mapToCssModules(
    classNames(
      className,
      { close },
      close || 'btn',
      close || `btn${outline ? '-outline-color' : '-color'}-${color}`,
      close || (size ? `btn-size-${size}` : false),
      block ? 'btn-block' : false,
      { active: active && !props.disabled },
      { disabled: props.disabled },
    ),
    cssModule,
  );

  return (
    <Tag
      type={Tag === 'button' ? 'button' : undefined}
      className={classes}
      ref={ref}
      {...other}
    />
  );
});

Button.defaultProps = {
  color: 'default',
  size: 'default',
  tag: 'button',
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  color: PropTypes.string,
  size: PropTypes.string,
  outline: PropTypes.bool,
  block: PropTypes.bool,
  close: PropTypes.bool,
  active: PropTypes.bool,
  tag: tagPropType,
};

export default Button;

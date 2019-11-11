import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules, tagPropType } from '../util';

const Spinner = forwardRef((props, ref) => {
  let {
    className,
    cssModule,
    type,
    size,
    color,
    children,
    tag: Tag,
    ...other
  } = props;

  const classes = mapToCssModules(
    classNames(
      className,
      size ? `spinner-${type}-${size}` : false,
      `spinner-${type}`,
      color ? `text-${color}` : false,
    ),
    cssModule,
  );

  return (
    <Tag role="status" className={classes} ref={ref} {...other}>
      {children && (
        <span className={mapToCssModules('blind', cssModule)}>{children}</span>
      )}
    </Tag>
  );
});

Spinner.defaultProps = { tag: 'div', type: 'border', children: 'Loading...' };

Spinner.propTypes = {
  tag: tagPropType,
  type: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  children: PropTypes.string,
};

export default Spinner;

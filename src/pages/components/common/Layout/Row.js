import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules, tagPropType } from '../util';

const Row = forwardRef((props, ref) => {
  let { className, noGutters, form, cssModule, tag: Tag, ...other } = props;
  const classes = mapToCssModules(
    classNames(
      className,
      noGutters ? 'no-gutters' : null,
      form ? 'form-row' : 'row',
    ),
    cssModule,
  );
  return <Tag className={classes} ref={ref} {...other} />;
});

Row.defaultProps = {
  tag: 'div',
};

Row.propTypes = {
  className: PropTypes.string,
  noGutters: PropTypes.bool,
  cssModule: PropTypes.object,
  form: PropTypes.bool,
  tag: tagPropType,
};

export default Row;

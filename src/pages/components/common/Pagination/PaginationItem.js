import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules, tagPropType } from '../util';

const PaginationItem = forwardRef((props, ref) => {
  let { active, className, cssModule, disabled, tag: Tag, ...other } = props;

  const classes = mapToCssModules(
    classNames(className, 'page-item', {
      active,
      disabled,
    }),
    cssModule,
  );

  return <Tag className={classes} ref={ref} {...other} />;
});

PaginationItem.defaultProps = { tag: 'li' };

PaginationItem.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  disabled: PropTypes.bool,
  tag: tagPropType,
};

export default PaginationItem;

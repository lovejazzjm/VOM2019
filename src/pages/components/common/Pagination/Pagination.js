import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules, tagPropType } from '../util';

const Pagination = forwardRef((props, ref) => {
  let {
    className,
    listClassName,
    cssModule,
    size,
    tag: Tag,
    listTag: ListTag,
    'aria-label': label,
    ...other
  } = props;

  const classes = mapToCssModules(classNames(className), cssModule);

  const listClasses = mapToCssModules(
    classNames(listClassName, 'pagination', {
      [`pagination-${size}`]: !!size,
    }),
    cssModule,
  );

  return (
    <Tag className={classes} aria-label={label}>
      <ListTag className={listClasses} ref={ref} {...other} />
    </Tag>
  );
});

Pagination.defaultProps = {
  tag: 'nav',
  listTag: 'ul',
  'aria-label': 'pagination',
};

Pagination.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  listClassName: PropTypes.string,
  cssModule: PropTypes.object,
  size: PropTypes.string,
  tag: tagPropType,
  listTag: tagPropType,
  'aria-label': PropTypes.string,
};

export default Pagination;

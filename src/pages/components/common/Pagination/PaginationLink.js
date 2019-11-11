import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules, tagPropType } from '../util';

const PaginationLink = forwardRef((props, ref) => {
  let {
    className,
    cssModule,
    next,
    previous,
    first,
    last,
    tag: Tag,
    ...other
  } = props;

  const classes = mapToCssModules(
    classNames(className, 'page-link'),
    cssModule,
  );

  let defaultAriaLabel;
  if (previous) {
    defaultAriaLabel = 'Previous';
  } else if (next) {
    defaultAriaLabel = 'Next';
  } else if (first) {
    defaultAriaLabel = 'First';
  } else if (last) {
    defaultAriaLabel = 'Last';
  }

  const ariaLabel = props['aria-label'] || defaultAriaLabel;

  let defaultCaret;
  if (previous) {
    defaultCaret = '\u2039';
  } else if (next) {
    defaultCaret = '\u203A';
  } else if (first) {
    defaultCaret = '\u00ab';
  } else if (last) {
    defaultCaret = '\u00bb';
  }

  let children = props.children;
  if (children && Array.isArray(children) && children.length === 0) {
    children = null;
  }

  if (!other.href && Tag === 'a') {
    Tag = 'button';
  }

  if (previous || next || first || last) {
    children = [
      <span aria-hidden="true" key="caret">
        {children || defaultCaret}
      </span>,
      <span className="blind" key="sr">
        {ariaLabel}
      </span>,
    ];
  }

  return (
    <Tag className={classes} aria-label={ariaLabel} ref={ref} {...other}>
      {children}
    </Tag>
  );
});

PaginationLink.defaultProps = { tag: 'a' };

PaginationLink.propTypes = {
  'aria-label': PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  next: PropTypes.bool,
  previous: PropTypes.bool,
  first: PropTypes.bool,
  last: PropTypes.bool,
  tag: tagPropType,
};

export default PaginationLink;

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules, tagPropType } from '../util';

const ButtonGroup = forwardRef((props, ref) => {
  let {
    className,
    role,
    vertical,
    align,
    cssModule,
    tag: Tag,
    ...other
  } = props;

  const classes = mapToCssModules(
    classNames(
      className,
      vertical ? 'btn-group-vertical' : 'btn-gourp',
      align ? 'align-' + align : null,
    ),
    cssModule,
  );

  return <Tag role={role} className={classes} ref={ref} {...other} />;
});

ButtonGroup.defaultProps = {
  tag: 'div',
  role: 'group',
  align: 'center',
};

ButtonGroup.propTypes = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  role: PropTypes.string,
  vertical: PropTypes.bool,
};

export default ButtonGroup;

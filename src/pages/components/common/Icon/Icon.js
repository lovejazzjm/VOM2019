import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules, tagPropType } from '../util';

const Icon = forwardRef((props, ref) => {
  let {
    className,
    iconName,
    blind,
    cssModule,
    children,
    tag: Tag,
    ...other
  } = props;

  const classes = mapToCssModules(
    classNames(className, 'icon', iconName ? 'icon_' + iconName : null),
    cssModule,
  );

  return (
    <Tag className={classes} ref={ref} {...other}>
      {blind ? <span className="blind">{blind}</span> : null}
    </Tag>
  );
});

Icon.defaultProps = { tag: 'i' };

Icon.propTypes = {
  iconName: PropTypes.string.isRequired,
  blind: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  tag: tagPropType,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
};

export default Icon;

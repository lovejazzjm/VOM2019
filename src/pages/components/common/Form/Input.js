/* eslint react/prefer-stateless-function: 0 */

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules, warnOnce, tagPropType } from '../util';

const Input = forwardRef((props, ref) => {
  let {
    className,
    cssModule,
    type,
    bsSize,
    valid,
    invalid,
    tag,
    addon,
    plaintext,
    ...other
  } = props;

  const checkInput = ['radio', 'checkbox'].indexOf(type) > -1;
  console.log(['radio', 'checkbox'].indexOf(type) > -1);
  const isNotaNumber = new RegExp('\\D', 'g');

  const fileInput = type === 'file';
  const textareaInput = type === 'textarea';
  const selectInput = type === 'select';
  let Tag = tag || (selectInput || textareaInput ? type : 'input');

  let formControlClass = 'form-control';

  if (plaintext) {
    formControlClass = `${formControlClass}-plaintext`;
    Tag = tag || 'input';
  } else if (fileInput) {
    formControlClass = `${formControlClass}-file`;
  } else if (checkInput) {
    if (addon) {
      formControlClass = null;
    } else {
      formControlClass = 'form-check-input';
    }
  }

  if (other.size && isNotaNumber.test(other.size)) {
    warnOnce(
      'Please use the prop "bsSize" instead of the "size" to bootstrap\'s input sizing.',
    );
    bsSize = other.size;
    delete other.size;
  }

  const classes = mapToCssModules(
    classNames(
      className,
      invalid && 'is-invalid',
      valid && 'is-valid',
      bsSize ? `form-control-${bsSize}` : false,
      formControlClass,
    ),
    cssModule,
  );

  if (Tag === 'input' || (tag && typeof tag === 'function')) {
    other.type = type;
  }

  if (
    other.children &&
    !(
      plaintext ||
      type === 'select' ||
      typeof Tag !== 'string' ||
      Tag === 'select'
    )
  ) {
    warnOnce(
      `Input with a type of "${type}" cannot have children. Please use "value"/"defaultValue" instead.`,
    );
    delete other.children;
  }

  return <Tag {...other} ref={ref} className={classes} />;
});

Input.defaultProps = { type: 'text' };

Input.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  size: PropTypes.string,
  bsSize: PropTypes.string,
  valid: PropTypes.bool,
  invalid: PropTypes.bool,
  tag: tagPropType,
  plaintext: PropTypes.bool,
  addon: PropTypes.bool,
  className: PropTypes.string,
  cssModule: PropTypes.object,
};

export default Input;

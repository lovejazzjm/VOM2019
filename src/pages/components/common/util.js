import PropTypes from 'prop-types';

let globalCssModule;

export function setGlobalCssModule(cssModule) {
  globalCssModule = cssModule;
}

export function mapToCssModules(className = '', cssModule = globalCssModule) {
  if (!cssModule) return className;
  return className
    .split(' ')
    .map((c) => cssModule[c] || c)
    .join(' ');
}

export const tagPropType = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.string,
  PropTypes.shape({ $$typeof: PropTypes.symbol, render: PropTypes.func }),
  PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
      PropTypes.shape({
        $$typeof: PropTypes.symbol,
        render: PropTypes.func,
      }),
    ]),
  ),
]);

export function isObject(value) {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}

let warned = {};

export function warnOnce(message) {
  if (!warned[message]) {
    /* istanbul ignore else */
    if (typeof console !== 'undefined') {
      console.error(message); // eslint-disable-line no-console
    }
    warned[message] = true;
  }
}

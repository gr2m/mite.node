/*!
 *
 * meta.js is a collection of functions used for
 * metaprogramming stuff
 *
 * @author pfleidi
 *
 */

/**
 *
 * takes two objects and merges their attributes
 *
 * @param {Object} an object with default values
 * @param {Object} an object with custom values
 *
 * @return {Object} merged object
 * @api public
 */

exports.mergeAttributes = function (defaults, custom) {
  if (!custom) {
    return defaults;
  }

  Object.keys(custom).forEach(function (key) {
    defaults[key] = custom[key]; 
  });

  return defaults;
};

exports.mergeAttributes = function (defaults, custom) {
  if (!custom) {
    return defaults;
  }

  Object.keys(custom).forEach(function (key) {
    defaults[key] = custom[key]; 
  });

  return defaults;
};

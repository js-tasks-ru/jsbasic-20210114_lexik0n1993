/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
  const substrings = str.split('-');
  const transformedSubstrings = substrings.map((substr, index) => {
    if (index > 0) {
      return `${substr[0].toUpperCase()}${substr.slice(1)}`;
    }

    return substr;
  });
  return transformedSubstrings.join('');
}

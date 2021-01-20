/**
 * ucFirst
 * @param {string} str
 * @returns {string}
 */
function ucFirst(str) {
  if (str.length <= 1) {
    return str.toUpperCase();
  }

  return `${str[0].toUpperCase()}${str.slice(1)}`;
}

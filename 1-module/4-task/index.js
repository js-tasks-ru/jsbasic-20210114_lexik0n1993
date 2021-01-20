/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {
  const lowerStr = str.toLowerCase();
  return (lowerStr.includes('1xbet') || lowerStr.includes('xxx'));
}

/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
  const numbers = str
    .split(',')
    .join(' ')
    .split(' ')
    .map(el => parseFloat(el))
    .filter(el => !isNaN(el));

  return {
    min: Math.min(...numbers),
    max: Math.max(...numbers),
  }
}

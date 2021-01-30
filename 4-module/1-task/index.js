/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {
  const list = document.createElement('ul');
  
  friends.forEach(({firstName, lastName}) => list.insertAdjacentHTML(
    `beforeend`,
    `<li>${firstName} ${lastName}</li>`
  ));

  return list;
}

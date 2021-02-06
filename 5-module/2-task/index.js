function toggleText() {
  const btn = document.querySelector('.toggle-text-button');
  const text = document.querySelector('#text');

  btn.addEventListener('click', () => {
    const isTextVisible = text.getAttribute('hidden') || false;

    if (isTextVisible) {
      text.removeAttribute('hidden');
    } else {
      text.setAttribute('hidden', true);
    }
  });
}

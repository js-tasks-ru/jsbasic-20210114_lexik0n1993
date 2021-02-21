import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.createModal();
    this.addModalHanlders();
  }

  createModal() {
    const modalHtml = `
      <div class="modal">
        <div class="modal__overlay"></div>

        <div class="modal__inner">

          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title"></h3>
          </div>

          <div class="modal__body"></div>

        </div>

      </div>
    `;

    this.elem = createElement(modalHtml);

    this.closeButton = this.elem.querySelector('.modal__close');
    this.modalTitle = this.elem.querySelector('.modal__title');
    this.modalBody = this.elem.querySelector('.modal__body');
  }

  open() {
    document.body.classList.add('is-modal-open');
    document.body.insertAdjacentElement('afterbegin', this.elem);
  }

  close() {
    this.elem.remove();
    document.body.classList.remove('is-modal-open');
  }

  setTitle(title) {
    this.modalTitle.innerText = title;
  }

  setBody(bodyElement) {
    this.modalBody.innerHTML = ``;
    this.modalBody.insertAdjacentElement('beforeend', bodyElement);
  }

  addModalHanlders() {
    this.closeButton.addEventListener('click', () => this.close());

    document.addEventListener('keydown', evt => {
      if (evt.code === 'Escape') {
        this.close();
      }
    });
  }
}

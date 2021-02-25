import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({
    steps,
    value = 0
  }) {
    this.steps = steps;
    this.value = value;

    this.createSliderBody();
    this.addSliderSteps();

    this.changeSliderPosition(this.value);

    this.sliderThumb.ondragstart = () => false;

    this.startDrag = this.startDrag.bind(this);
    this.moveThumb = this.moveThumb.bind(this);
    this.endDrag = this.endDrag.bind(this);
    this.changeSliderValue = this.changeSliderValue.bind(this);

    this.elem.addEventListener('click', this.changeSliderValue);
    this.sliderThumb.addEventListener('pointerdown', this.startDrag);
  }

  createSliderEvent() {
    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));
  }

  createSliderBody() {
    const sliderHtml = `
      <div class="slider">

        <div class="slider__thumb">
          <span class="slider__value">${this.value}</span>
        </div>

        <div class="slider__progress"></div>

      </div>
    `;

    this.elem = createElement(sliderHtml);
    this.sliderThumb = this.elem.querySelector(`.slider__thumb`);
    this.sliderValue = this.elem.querySelector(`.slider__value`);
    this.sliderProgress = this.elem.querySelector(`.slider__progress`);
  }

  addSliderSteps() {
    let sliderStepsHtml = ``;

    for (let i = 0; i < this.steps; i++) {
      const className = i === this.value ? `slider__step-active` : ``;
      sliderStepsHtml += `<span class="${className}"></span>`;
    }

    this.elem.insertAdjacentHTML(`beforeend`, `
      <div class="slider__steps">
        ${sliderStepsHtml}
      </div>
    `);

    this.sliderSteps = Array.from(this.elem.querySelectorAll(`.slider__steps span`));
  }

  changeSliderValue(evt) {
    let newSliderValue = this.getNewSliderValue(evt);

    if (this.value !== newSliderValue) {
      this.changeSliderValueText(newSliderValue);

      if (!this.elem.classList.contains(`slider_dragging`)) {
        this.changeSliderPosition(newSliderValue);
      }

      this.value = newSliderValue;
    }

    this.createSliderEvent();
  }

  changeSliderValueText(newValue) {
    this.sliderValue.innerText = newValue;
  }

  getSliderPosition(evt) {
    const {left: sliderLeft} = this.elem.getBoundingClientRect();
    let sliderPosition = (evt.clientX - sliderLeft) / this.elem.offsetWidth;

    if (sliderPosition < 0) {
      sliderPosition = 0;
    }

    if (sliderPosition > 1) {
      sliderPosition = 1;
    }

    return sliderPosition;
  }

  getNewSliderValue(evt) {
    const sliderPosition = this.getSliderPosition(evt);
    return Math.round(sliderPosition * (this.steps - 1))
  }

  changeSliderPosition(value) {
    const valueInPercents = value / (this.steps - 1) * 100;

    this.changeSliderActiveStep(value);

    this.sliderThumb.style.left = `${valueInPercents}%`;
    this.sliderProgress.style.width = `${valueInPercents}%`;
  }

  changeSliderActiveStep(value) {
    this.sliderSteps[this.value].classList.remove(`slider__step-active`);
    this.sliderSteps[value].classList.add(`slider__step-active`);
  }

  startDrag() {
    this.elem.classList.add(`slider_dragging`);

    document.addEventListener('pointermove', this.moveThumb);
    document.addEventListener('pointerup', this.endDrag);
  }

  moveThumb(evt) {
    let sliderPosition = this.getSliderPosition(evt);

    this.sliderThumb.style.left = `${sliderPosition * 100}%`;
    this.sliderProgress.style.width = `${sliderPosition * 100}%`;

    const newSliderValue = this.getNewSliderValue(evt);
    this.changeSliderActiveStep(newSliderValue);
    this.changeSliderValueText(newSliderValue);
    this.value = newSliderValue;
  }

  endDrag(evt) {
    this.elem.classList.remove(`slider_dragging`);

    document.removeEventListener('pointermove', this.moveThumb);
    document.removeEventListener('pointerup', this.endDrag);

    const newSliderPosition = this.getNewSliderValue(evt);
    this.changeSliderPosition(newSliderPosition);
    this.createSliderEvent();
  }

}

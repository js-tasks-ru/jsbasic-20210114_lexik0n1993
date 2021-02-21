import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.createSliderBody();
    this.addSliderSteps();

    this.changeSliderPosition(this.value);
    this.elem.addEventListener('click', evt => this.changeSliderValue(evt));
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
    const newSliderValue = this.getNewSliderValue(evt);

    if (this.value !== newSliderValue) {
      this.sliderValue.innerText = newSliderValue;
      this.changeSliderPosition(newSliderValue);
      this.value = newSliderValue;
  
      this.createSliderEvent();
    }
  }

  getNewSliderValue(evt) {
    const clickPosition = evt.clientX - this.elem.getBoundingClientRect().left;
    const newValue = clickPosition * (this.steps - 1) / this.elem.offsetWidth;

    return Math.round(newValue);
  }

  changeSliderPosition(value) {
    const valueInPercents = value / (this.steps - 1) * 100;

    this.sliderSteps[this.value].classList.remove(`slider__step-active`);
    this.sliderSteps[value].classList.add(`slider__step-active`);

    this.sliderThumb.style.left = `${valueInPercents}%`;
    this.sliderProgress.style.width = `${valueInPercents}%`;
  }

  createSliderEvent() {
    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));
  }
}

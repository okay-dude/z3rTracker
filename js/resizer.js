'use strict';

class Resizer {
  #startX = 0;
  #startY = 0;
  #x = 0;
  #y = 0;
  #resizeEl = null;
  #dims = {};

  constructor() {
    $('body').on('mousedown', (e) => this.onMouseDown(e));
	this.movFunc = e => this.onMouseMove(e);
    this.upFunc = e => this.onMouseUp(e);
  }
  
  onMouseDown(e) {
    const jEl = $(e.target);
    if (!jEl.hasClass('resizer')) {
	  return;
	}
    this.#resizeEl = $(e.target).closest('.resizer-container');
	if (!this.#resizeEl) {
	  return;
	}
	
	const rect = this.#resizeEl[0].getBoundingClientRect();
	this.#x = rect.width;
	this.#y = rect.height;
	this.#startX = e.pageX;
    this.#startY = e.pageY;
	this.#resizeEl.css('z-index', '1');
	this.#resizeEl.addClass('resizing');
	$('body').on('mousemove', this.movFunc);
	$('body').on('mouseup', this.upFunc);
  }
  
  onMouseUp(e) {
	this.updatePosition(e.pageX, e.pageY);
	this.#resizeEl.css('z-index', '0');
	this.#resizeEl.removeClass('resizing');
	$('body').off('mousemove', this.movFunc);
	$('body').off('mouseup', this.upFunc);
  }
  
  onMouseMove(e) {
    this.updatePosition(e.pageX, e.pageY);
  }
  
  updatePosition(x, y) {
    const width = this.#x + (x - this.#startX);
	const height = this.#y + (y - this.#startY);
	
	this.#setDims(Math.round(width), Math.round(height));
  }
  
  #setDims(width, height) {
    this.#resizeEl.css('width', width + 'px');
    this.#resizeEl.css('height', height + 'px');
	const id = this.#resizeEl.attr('id');
	if (id) {
	  this.#dims[id] = { width, height };
	}
  }
  
  save() {
    return JSON.parse(JSON.stringify(this.#dims));
  }
  
  load(data) {
    for (const id of Object.keys(data)) {
	  const jEl = $('#' + id);
	  if (jEl && jEl[0]) {
	    this.#resizeEl = jEl;
	    this.#setDims(data[id].width, data[id].height);
	  }
	}
  }
}
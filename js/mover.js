'use strict';

class Mover {
  #movingEl = null;
  #x = 0;
  #y = 0;
  #startX = 0;
  #startY = 0;
  #positions = {};
  
  constructor() {
    $('body').on('mousedown', (e) => this.onMouseDown(e));
	this.movFunc = this.onMouseMove.bind(this);
    this.upFunc = this.onMouseUp.bind(this);
  }
  
  onMouseDown(e) {
    const jEl = $(e.target);
    if (!jEl.hasClass('drag')) {
	  return;
	}
    this.#movingEl = $(e.target).closest('.drag-container');
	if (!this.#movingEl) {
	  return;
	}
	
    const rect = this.#movingEl[0].getBoundingClientRect();
	this.#x = rect.left;
	this.#y = rect.top;
	this.#startX = e.pageX;
    this.#startY = e.pageY;
	this.#movingEl.css('z-index', '1');
	$('body').on('mousemove', this.movFunc);
	$('body').on('mouseup', this.upFunc);
  }
  
  onMouseUp(e) {
	this.updatePosition(e.pageX, e.pageY);
	this.#movingEl.css('z-index', '0');
	$('body').off('mousemove', this.movFunc);
	$('body').off('mouseup', this.upFunc);
  }
  
  onMouseMove(e) {
    this.updatePosition(e.pageX, e.pageY);
  }
  
  updatePosition(x, y) {
    const top = this.#y + (y - this.#startY);
	const left = this.#x + (x - this.#startX);
	this.#setPosition(Math.round(top), Math.round(left));
  }
  
  #setPosition(top, left) {
	this.#movingEl.css('top', top + 'px');
	this.#movingEl.css('left', left + 'px');
	const id = this.#movingEl.attr('id');
	if (id) {
	  this.#positions[id] = { top, left };
	}
  }
  
  save() {
    return JSON.parse(JSON.stringify(this.#positions));
  }
  
  load(data) {
    for (const id of Object.keys(data)) {
	  const jEl = $('#' + id);
	  if (jEl && jEl[0]) {
	    this.#movingEl = jEl;
	    this.#setPosition(data[id].top, data[id].left);
	  }
	}
  }
}
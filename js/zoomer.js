'use strict';

class Zoomer {
  #zoomerEl = null;
  #zoom = {};

  constructor() {
    $('body').on('click', (e) => this.click(e));
  }
  
  click(e) {
    const jEl = $(e.target);
    if (!jEl.hasClass('zoom-in') && !jEl.hasClass('zoom-out')) {
	  return;
	}
    this.#zoomerEl = $(e.target).closest('.zoomer-container');
	if (!this.#zoomerEl) {
	  return;
	}
	const zoomerId = this.#zoomerEl.attr('id');
	if (!zoomerId) {
	  return;
	}
	
	let zoom = this.#zoom[zoomerId] || 100;
	const zoomIn = jEl.hasClass('zoom-in');
	zoom = (zoom + (zoomIn ? 5 : -5));
	this.#setZoom(zoom);
  }
  
  #setZoom(zoom) {
    this.#zoomerEl.css('zoom', zoom + '%');
	const zoomerId = this.#zoomerEl.attr('id');
	if (zoomerId) {
	  this.#zoom[zoomerId] = zoom;
	}
  }
  
  getZoom(el) {
    const container = el.closest('.zoomer-container');
	
	if (!container) {
	  return;
	}
	
	return parseFloat($(container).css('zoom')) || 1;
  }
  
  save() {
    return JSON.parse(JSON.stringify(this.#zoom));
  }
  
  load(data) {
    for (const id of Object.keys(data)) {
	  const jEl = $('#' + id);
	  if (jEl && jEl[0]) {
	    this.#zoomerEl = jEl;
	    this.#setZoom(data[id]);
	  }
	}
  }
}
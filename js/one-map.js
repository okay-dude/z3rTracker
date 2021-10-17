'use strict';

class OneMap {
  
  #settings = null;
  #isLightWorld = true;
  
  constructor(settings) {
    this.#settings = settings;
    $('#load-button').on('click', () => this.onLoad());
  }
  
  onLoad() {
    const settings = this.#settings.getSettings();
	if (!settings.oneMap) {
	  $('#one-map').css('display', 'none');
	  return;
	}
	
	$(document).on('keydown', (e) => this.onKeyDown(e));
	$('#dark-world').css('display', 'none').appendTo('#one-map');
	$('#light-world').css('display', 'block').appendTo('#one-map');
	$('#light-world-container').css('display', 'none');
	$('#dark-world-container').css('display', 'none');
  }
  
  onKeyDown(e) {
    if (e.keyCode !== 9) {
	  return;
	}
	const lw = this.#isLightWorld = !this.#isLightWorld;
	$('#dark-world').css('display', lw ? 'none' : 'block');
	$('#light-world').css('display', lw ? 'block' : 'none');
	e.preventDefault();
	e.stopPropagation();
  }
}
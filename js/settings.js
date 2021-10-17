'use strict';

class Settings {

  #settings = {
	oneMap: 0,
	multi: 1,
	single: 1,
	dropDown: 1,
	visible: 1,
	overworld: 1,
	connectors: 1,
	autoTracking: 0,
	autoTrackingPort: 8080
  };
  
  getSettings() {
    return {
	  oneMap: $('#enable-one-map').is(':checked') ? 1 : 0,
	  multi: $('#enable-multi').is(':checked') ? 1 : 0,
	  single: $('#enable-single').is(':checked') ? 1 : 0,
	  dropDown: $('#enable-drop-down').is(':checked') ? 1 : 0,
	  visible: $('#enable-visible').is(':checked') ? 1 : 0,
	  overworld: $('#enable-overworld').is(':checked') ? 1 : 0,
	  connectors: $('#enable-connectors').is(':checked') ? 1 : 0,
	  autoTracking: $('#enable-auto-tracking').is(':checked') ? 1 : 0,
	  autoTrackingPort: $('#auto-tracking-port').val()
	};
  }
  
  save() {
    return JSON.parse(JSON.stringify(this.getSettings()));
  }
  
  load(config) {
    Object.assign(this.#settings, config);
	$('#enable-one-map').prop('checked', !!this.#settings.oneMap);
	$('#enable-drop-down').prop('checked', !!this.#settings.dropDown);
	$('#enable-multi').prop('checked', !!this.#settings.multi);
	$('#enable-single').prop('checked', !!this.#settings.single);
	$('#enable-visible').prop('checked', !!this.#settings.visible);
	$('#enable-overworld').prop('checked', !!this.#settings.overworld);
	$('#enable-connectors').prop('checked', !!this.#settings.connectors);
	$('#enable-auto-tracking').prop('checked', !!this.#settings.autoTracking);
	$('#auto-tracking-port').val(this.#settings.autoTrackingPort);
  }
}
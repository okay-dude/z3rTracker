'use strict';

$(function() {
	if (location.search === '') {
		window.open('./index.html?load','Berserker\'s Tracker by GGW','directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no');
		return;
	}
	$('body').css('display', 'block');
	const configurable = {};
	
	const zoomer = new Zoomer();
    const mover = new Mover();
	const resizer = new Resizer();
	
	const menuEl = $('.menu-container')[0];
	
	for (const trackerEl of $('.map-tracker')) {
	  trackerEl.appendChild(menuEl.cloneNode(true));
	  const tracker = new MapTracker(trackerEl, zoomer);
	  const id = trackerEl.id;
	  configurable[id] = tracker;
	}
	const connectors = $('#connectors')[0];
	for (const icon of $(menuEl).find('.icon[data-connector="true"]')) {
	  connectors.appendChild(icon.cloneNode(true));
	}
	
	menuEl.remove();
	
	const settings = new Settings();
	const oneMap = new OneMap(settings);
	const textTracker = new TextTracker(settings);
	const autoTracker = new AutoTracker(settings, textTracker);
	Object.assign(configurable, { settings, mover, resizer, zoomer });
	
	const config = new Config(configurable);
	window.download = () => config.download();
});

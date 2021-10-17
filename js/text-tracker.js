'use strict';

class TextTracker {
	
	#textElState = new Map();
	#textElIds = new Map();
	
	#saha = [12, 25];
	#hs = [21, 22];
	
	#items = {};
	#chests = {};
	
	#settings = null;
	
	constructor(settings) {
		this.#settings = settings;
		for (const location of $('.text-location')) {
			const id = $(location).data('chest');
			if (id) {
				this.#textElIds.set(parseInt(id), location);
				this.#textElState.set(location, 'blue');
			}
		}
		
		$('.text-location').on('click', e => {
			const jEl = $(e.target);
			const state = this.#textElState.get(e.target) || 'blue';
			const type = jEl.data('chesttype');
			
			if (state === 'blue' || state === 'green') {
				if (type === 'visible') {
					this.#textElState.set(e.target, 'yellow');
				} else if (type === 'multi') {
					this.#textElState.set(e.target, 'pink');
				} else {
					this.#textElState.set(e.target, 'gray');
				}
			}
			if (state === 'yellow' || state === 'pink') {
				this.#textElState.set(e.target, 'gray');
			}
			if (state === 'gray') {
				this.#textElState.set(e.target, 'blue');
			}
			
			jEl.removeClass(state);
			jEl.addClass(this.#textElState.get(e.target));
		});
		
		$('#load-button').on('click', () => {
		  this.loadSettings();
		});
	}
	
	#getStuff(id) {
		const el = this.#textElIds.get(id);
		if (!el) {
			return [null, null, null];
		}
		const state = this.#textElState.get(el);
		const jEl = $(el);
		
		return [el, state, jEl];
	}
	
	#chestUnion(id, group) {
		const [el, state, jEl] = this.#getStuff(id);
		if (!el) {
			return;
		}
		if (group.every(chestId => this.#chests[chestId])) {
			jEl.removeClass(state);
			jEl.addClass('gray');
			this.#textElState.set(el, 'gray');
		} else if (group.some(chestId => this.#chests[chestId])) {
			jEl.removeClass(state);
			jEl.addClass('pink');
			this.#textElState.set(el, 'pink');
		}
	}
	
	#updateItem(id) {
		const [el, state, jEl] = this.#getStuff(id);
		
		if (state !== 'gray' && (this.#items[id] === true || this.#items[id] > 0)) {
			jEl.removeClass(state);
			jEl.addClass('green');
			this.#textElState.set(el, 'green');
		}
	}
	
	setItem(item, value) {
		let id;
		switch(item) {
			case 'mushroom': {
				id = 35;
				break;
			}
			case 'shovel': {
				id = 54;
				break;
			}
			case 'bottle': {
				id = 27;
				break;
			}
			case 'powder': {
				id = 59;
				break;
			}
			default: {
				return;
			}
		}
		
		this.#items[id] = value;
		this.#updateItem(id);
	};
	
	setLocation(id_) {
		const visited = this.#chests[id_] = !this.#chests[id_];
		const id = parseInt(id_);
		const saha = [12, 25];
		const hs = [21, 22];
		
		if (saha.indexOf(id) >= 0) {
			this.#chestUnion(70, saha);
		} else if (hs.indexOf(id) >= 0) {
			this.#chestUnion(71, hs);
		} else {
			const [el, state, jEl] = this.#getStuff(id);
			if (jEl && state !== 'gray') {
				jEl.removeClass(state);
				jEl.addClass('gray');
				this.#textElState.set(el, 'gray');
			}
		}
	};
	
	loadSettings() {
	  const settings = this.#settings.getSettings();
	  
	  $('#drop-down').css('display', !!settings.dropDown ? '' : 'none');
	  $('#multi-chest').css('display', !!settings.multi ? '' : 'none');
	  $('#single-chest').css('display', !!settings.single ? '' : 'none');
	  $('#visible-items').css('display', !!settings.visible ? '' : 'none');
	  $('#overworld').css('display', !!settings.overworld ? '' : 'none');
	  $('#connectors').css('display', !!settings.connectors ? '' : 'none');
	}
	
}
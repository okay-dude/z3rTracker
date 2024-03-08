class Menu {

	#el = null;
	#marker = null;
	#open = false;
	#tracker = null;
	#x = 0;
	#y = 0;
	#search = false;
	#zoomer = null;
	#toRemove = null;

	constructor(el, onChoose, removeIcon, zoomer) {
		this.#el = el;
		this.#zoomer = zoomer;
		this.#tracker = el.closest('.map-tracker');
		$('body').on('click', '.menu-container, .icon.placed', e => {
			const target = e.target;
			if (this.#search) {
				return;
			}
			if (this.#tracker !== target.closest('.map-tracker')) {
				return;
			}
			if (!this.#open) {
				$('.find-item').css('display', 'none');
				this.openMenu();
				let x = e.offsetX, y = e.offsetY;
				const icon = target.closest('.icon.placed');
				let adjustZoom = true;
				if (icon) {
					if ($(icon).find('.icon-image.entrance').length === 1) {
						this.#toRemove = icon;
						x = icon.offsetLeft + 8;
						y = icon.offsetTop + 10;
					} else {
						x += icon.offsetLeft;
						y += icon.offsetTop;
					}
					adjustZoom = false;
				}
				this.placeMarker(x, y, adjustZoom);
			} else {
				$('.find-item').css('display', 'block');
				if (target.closest('.icon') && !target.closest('.placed')) {
					const icon = e.target.closest('.icon');
					onChoose(icon, this.#x, this.#y);
					if (this.#toRemove) {
						removeIcon(this.#toRemove);
					}
				}
				this.#toRemove = null;
				this.removeMarker();
				this.closeMenu();
			}
		});

		$('body').on('click', '.find-item, .menu-container, .icon.placed', e => {
			const target = e.target;
			if (this.#tracker !== target.closest('.map-tracker')) {
				return;
			}
			if (this.#open && !this.#search || !this.#open && !target.closest('.find-item')) {
				return;
			}

			if (!this.#open) {
				this.#search = true;
				this.toggleIconSearch();
				this.openMenu();
			} else {
				this.#search = false;
				if (target.closest('.icon') && !target.closest('.placed')) {
					const icon = e.target.closest('.icon');
					this.highlight(icon);
				}
				this.toggleIconSearch();
				this.closeMenu();
			}

		});

	}

	toggleIconSearch() {
		const icons = $(this.#el).find('.icon');
		for (const icon of icons) {
			if (!$(`.map-container .icon.placed[data-key="${$(icon).data('key')}"]`)[0]) {
				$(icon).css('opacity', this.#search ? '.3' : '');
			} else {
				$(icon).css('opacity', this.#search ? '1' : '');
			}
		}
	}

	openMenu() {
		if (this.#open){
			return;
		}
		$(this.#el).find('.location-menu').addClass('open');
		this.#open = true;
	}

	closeMenu() {
		if (!this.#open) {
			return;
		}
		$(this.#el).find('.location-menu').removeClass('open');
		this.#open = false;
	}

	placeMarker(x, y, adjustZoom = true) {
		x -= 8;
		y -= 12;
		if (adjustZoom) {
			const zoom = this.#zoomer.getZoom(this.#el);
			x = x / zoom;
			y = y / zoom;
		}
		const div = document.createElement('div');
		$(div).addClass('marker').css({left: x, top: y}).text('X');
		this.#el.appendChild(div);
		this.#x = x;
		this.#y = y;
		this.#marker = div;
	}

	removeMarker() {
		this.#x = 0;
		this.#y = 0;
		if (this.#marker) {
			this.#marker.remove();
		}
	}

	highlight(icon) {
		const key = $(icon).data('key');
		const icons = [];
		for (const icon of $(`.map-container .icon.placed[data-key=${key}]`)) {
			const jq = $(icon);
			const x = parseInt(jq.css('left'));
			const y = parseInt(jq.css('top'));
			icons.push({ jq, x, y });
			$(icon).css({
				zoom: '300%',
				left: x / 3 - 8,
				top: y / 3 - 8,
				'z-index': 3,
			});
		}

		setTimeout(() => {
			icons.forEach(icon => {
				icon.jq.css({
					zoom: '',
					left: icon.x,
					top: icon.y,
					'z-index': '',
				});
			});
		}, 5000);
	}

}
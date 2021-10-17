class Menu {

  #el = null;
  #marker = null;
  #open = false;
  #tracker = null;
  #x = 0;
  #y = 0;

  constructor(el, onChoose) {
    this.#el = el;
	this.#tracker = el.closest('.map-tracker');
    $('body').on('click', '.menu-container, .icon.placed', e => {
	  const target = e.target;
	  if (this.#tracker !== target.closest('.map-tracker')) {
	    return;
	  }
	  if (!this.#open) {
	  	this.openMenu();
		let x = e.offsetX, y = e.offsetY;
		const icon = target.closest('.icon.placed');
		if (icon) {
		  x += icon.offsetLeft;
		  y += icon.offsetTop;
		}
	    this.placeMarker(x, y);
	  } else {
	    if (target.closest('.icon') && !target.closest('.placed')) {
   	      const icon = e.target.closest('.icon');
	      onChoose(icon, this.#x, this.#y);
		}
	    this.removeMarker();
	    this.closeMenu();
	  }
	});
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
  
  placeMarker(x, y) {
	x -= 8;
	y -= 12;
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

}
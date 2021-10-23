class MapTracker {
  #el = null;
  #menu = null;
  
  #icons = new Map();
  
  constructor(el, zoomer) {
    this.#el = el;
	this.#menu = new Menu(
      $(el).find('.menu-container')[0],
	  (icon, x, y) => this.addIcon(icon, x, y),
	  zoomer,
	);
	
	$(el).on('contextmenu', e => {
	  e.preventDefault();
	});
	
	$(el).on('contextmenu', '.icon.placed', e => {
	  const icon = e.target.closest('.icon');
	  this.removeIcon(icon);
	});
  }
  
  addIcon(icon, x, y, adjust = true) {
    if (adjust) {
      x -= 3;
      y += 1;
	}
    const clone = icon.cloneNode(true);
	const cloneJq = $(clone);
	cloneJq.removeClass('used');
	if (adjust && cloneJq.find('.icon-image')[0]) {
	  y += 2;
	}
	cloneJq.addClass('placed').css({ left: x, top: y });
	const key = cloneJq.data('key');
	if (!key) {
	  console.error('Icon is missing data-key property');
	  return;
	}
	for (const menuIcon of $('body').find(`.location-menu .icon[data-key='${key}'], #connectors .icon[data-key='${key}']`)) {
	  if ($(menuIcon).data('amount') !== 'unlimited') {
        $(menuIcon).addClass('used');
	  }
	}
	
	this.#el.appendChild(clone);
	const icons = this.#icons.get(key) || [];
	icons.push({ x, y, clone });
	this.#icons.set(key, icons);
  }
  
  removeIcon(icon) {
    if (!icon) {
	  return;
	}
	const key = $(icon).data('key');
	
	if (this.#icons.has(key)) {
	  const icons = this.#icons.get(key).filter(item => item.clone !== icon);
	  if (icons.length) {
	    this.#icons.set(key, icons);
	  } else {
	    this.#icons.delete(key);
	  }
	}
	icon.remove();
	
    if ($(icon).data('amount') !== 'unlimited') {
	  const placed = $(`.icon[data-key='${key}'].placed`);
	  if (placed.length === 0) {
	    for (const menuIcon of $(`.icon[data-key='${key}'].used`)) {
		  $(menuIcon).removeClass('used');
		}
	  }
	}
  }
  
  unload() {
    for (const icon of $(this.#el).find('> .icon')) {
	  icon.remove();
	}
	this.#icons = new Map();
  }
  
  save() {
    const output = [];
	for (const [key, icons] of this.#icons.entries()) {
	  for (const icon of icons) {
	    output.push([ key, icon.x, icon.y]);
	  }
	}
    return JSON.parse(JSON.stringify(output));
  }
  
  load(data) {
    this.unload();
    for (const [key, x, y] of data) {
	  const icon = $(this.#el).find(`.menu-container .icon[data-key='${key}']`)[0];
	  this.addIcon(icon, x, y, false);
	}
  }
}
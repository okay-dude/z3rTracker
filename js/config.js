'use strict';

class Config {
  #configurable = null;
  
  constructor(configurable) {
    this.#configurable = configurable;
	
	$('.save').on('click', () => {
	  this.download();
	});
	$('body').on('change', '#config-file', e => {
	  if (e.target.files[0]) {
	    this.loadConfig(e.target.files[0]);
	  }
	});
	$('body').on('click', '#load-button', e => {
	  $('#options').css('display', 'none');
	  $('#tracker').css('display', 'block');
	});
	
	const bk = sessionStorage.getItem('backup');
	if (bk) {
	  try {
	    this.open(JSON.parse(bk));
		$('#load-button').click();
	  } catch (e) {
	    console.log('error loading backup from session storage', bk);
	  }
	}
	
	$('#load-button').on('click', () => {
	  setInterval(() => this.backup(), 5000);
	});
  }
  
  loadConfig(file) {
	if (!file) {
	  return;
	}

    const fileReader = new FileReader();
    fileReader.onload = e => {
	  const text = e.target.result;
	  try {
	    const json = JSON.parse(text);
		this.open(json);
	  } catch (e) {
	    console.error('invalid config');
	  }
    };

    fileReader.readAsText(file, "UTF-8");
  }
  
  download() {
    const exportConfig = {};
	
    for (const toExport of Object.keys(this.#configurable)) {
	  exportConfig[toExport] = this.#configurable[toExport].save();
	}
	
	this.#startDownload(JSON.stringify(exportConfig));
  }
  
  backup() {
    const exportConfig = {};
	
    for (const toExport of Object.keys(this.#configurable)) {
	  exportConfig[toExport] = this.#configurable[toExport].save();
	}
	
	sessionStorage.setItem('backup', JSON.stringify(exportConfig));
  }
  
  #startDownload(text) {
    const el = document.createElement('a');
    el.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    el.setAttribute('download', 'config.json');
    el.style.display = 'none';
	
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
  }
  
  open(config) {
    for (const key of Object.keys(config)) {
	  if (this.#configurable[key]) {
	    this.#configurable[key].load(config[key]);
	  }
	}
  }
}

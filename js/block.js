$(function(){
    /*
     * this swallows backspace keys on any non-input element.
     * stops backspace -> back
     */
    var rx = /INPUT|SELECT|TEXTAREA/i;

    $(document).bind("keydown keypress", function(e){
        if( e.which == 8 ){ // 8 == backspace
            if(!rx.test(e.target.tagName) || e.target.disabled || e.target.readOnly ){
                e.preventDefault();
            }
        }
    });
	
	var _hash = "!";
    var noBackPlease = function () {
        window.location.href += "#";

        // Making sure we have the fruit available for juice (^__^)
        window.setTimeout(function () {
            window.location.href += "!";
        }, 50);
    };

    window.onhashchange = function () {
        if (window.location.hash !== _hash) {
            window.location.hash = _hash;
        }
    };
	
	noBackPlease();
});
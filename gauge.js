//========================================================
//      guage plugin
//      fweaver
//      
//========================================================
(function($){
	$.fn.gauge=function(opts){

        // merge with default setting
		var cfg = $.extend({
			scoreColor: '#fc9fb6',
			totalColor: '#e1e9fa',
			score: 0,
			width: this.width(),
			lineWidth: 20,
			openAngle: 0,
			id: 'gauge-'+Math.random().toString(36).substr(2, 4)
		}, opts);
        
        // insert canvas after div container
		$('<canvas>'+ cfg.score +'</canvas>').attr({
			id: cfg.id,
			width: cfg.width,
			height: cfg.height || cfg.width,
		}).css({ margin: '0 auto', display: 'block' }).appendTo(this);
      
      // convert degrees to radians
      var radians_of = function(degrees) {
        return degrees * Math.PI / 180;
      };
      
      // prepare for canvas drawing
      var canvas = document.getElementById(cfg.id);
          context = canvas.getContext('2d');
          x = canvas.width / 2;
          y = canvas.height / 2;
          radius = cfg.width / 2 - cfg.lineWidth;
          openAngle = cfg.openAngle;
          rangeAngle = cfg.score / 100 * ( 360 - 2 * cfg.openAngle ); // 240
      
      // score range
      var scoreArc = {
        startAngle: 90 + openAngle, 
        endAngle: (90 + openAngle + rangeAngle)%360 
      }
      
      // remained range
      var remainArc = {
        startAngle: scoreArc.endAngle, 
        endAngle: 90 - openAngle
      }
      
      // draw score
      context.lineWidth = cfg.lineWidth;
      context.beginPath();
      context.arc(x, y, radius, radians_of(scoreArc.startAngle), radians_of(scoreArc.endAngle), false);

      context.strokeStyle = cfg.scoreColor;
      context.stroke();
      
      // draw remaining
      context.beginPath();
      context.arc(x, y, radius, radians_of(remainArc.startAngle), radians_of(remainArc.endAngle),false);

      context.strokeStyle = cfg.totalColor;
      context.stroke();

      // todo draw text
      return this;
	}
}(jQuery));
define([
	'underscore',
	'backbone',
	'text!template/TankTemplate.html'
], function(_, Backbone, TankTemplate) {

	var TankView = Backbone.View.extend({

		initialize: function( opts ) {

			this.img = new Image();
			this.img.src = '/img/'+ this.model.get('variant') + '.png';

			this.setElement();
			this.ctx = opts.ctx;
		},
		
		render: function() {

			var x = this.model.get('x')
			, y = this.model.get('y')
			, w = this.model.get('w') / 2
			, h = this.model.get('h') / 2
			, heat = this.model.get('heat')
			, kill = this.model.get('kill');
			
			this.ctx.save();

			this.ctx.translate(x, y);

			this.ctx.translate(w, h);
			this.ctx.rotate(this.model.get('a') * Math.PI/180);
			this.ctx.drawImage(this.img, -w, -h);
			this.ctx.restore();

			this.ctx.fillStyle = "black";
			this.ctx.font="8px arial";
			this.ctx.fillText("K:"+ kill, x, y - 12);			
			this.ctx.fillStyle = "lightgreen";
			this.ctx.fillRect(x, y - 10, this.model.get('life') / 2, 3);
			this.ctx.fillStyle = (heat > 0 ) ? "#f89406" : "red";
			this.ctx.fillRect(x, y - 4, heat, 3);
		}
	});
  
	return TankView;

});
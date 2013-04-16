var Backbone = require('backbone'),
	_ = require('underscore'),
	define = require('amdefine')(module);

define(function(require) {

	var BulletModel = Backbone.Model.extend({

		initialize: function( atts, opts ) {
			opts.events.on('frame:advance', this.frame, this);

			var radians = this.get('a') * (Math.PI / 180),
				cos = Math.cos(radians),
				sin = Math.sin(radians);

			this.set('xv', this.get('v') * cos); //horizontal (x) velocity
			this.set('yv', this.get('v') * sin); //vertical (y) velocity
		},
		defaults : {
			'v': 4, //velocity
			'a': 0, //angle
			'x': 0, //horizontal
			'y': 0, //vertical
			'h': 3, //height
			'w': 3 //width
		},
		frame: function() {
			var left = this.get('x') - this.get('xv');
			var top = this.get('y') - this.get('yv');
			this.set('x', parseFloat((left).toFixed(2)));
			this.set('y', parseFloat((top).toFixed(2)));
		},
		collide: function() {
			this.unset('id');
			this.destroy();
		}
		
	});
	
	return BulletModel;
});

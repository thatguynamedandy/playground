define([
	'underscore',
	'backbone',
	'model/TankModel',
	'model/BoundsModel',
	'utils/CollisionDetection'
], function(
	_, 
	Backbone,
	TankModel,
	BoundsModel,
	CollisionDetection) {

	describe("Collision Detection", function() {	
	    
	    describe("bounds", function() {
	
		    it('should trigger collide if two elements overlap', function() {
	
				//create a tank
				var tank1 = new TankModel({
					'id':1,
					'x':0,
					'y':0,
					'w':10,
					'h':10
				}, {
					collection: {on:function(){}}
				});
	
				spyOn(tank1, "collide");
	
				//create another tank that overlaps it
				var tank2 = new TankModel({
					'id':2,
					'x':5,
					'y':5,
					'w':10,
					'h':10
				}, {
					collection: {on:function(){}}
				});
	
				spyOn(tank2, "collide");
	
				//collide should be called as the tanks overlap
				var result = CollisionDetection.detect(tank2, [tank1], {
					'callback': 'collide'
				});
				
				expect(result).toBeTruthy();
				expect(tank1.collide).toHaveBeenCalled();
				expect(tank2.collide).toHaveBeenCalled();
			});
			
			
		    it('should not trigger collide if two elements do not overlap', function() {
	
				//create a tank
				var tank1 = new TankModel({
					'id':1,
					'x':0,
					'y':0,
					'w':10,
					'h':10
				}, {
					collection: {on:function(){}}
				});
	
				spyOn(tank1, "collide");
	
				//create another tank that overlaps it
				var tank2 = new TankModel({
					'id':2,
					'x':50,
					'y':5,
					'w':10,
					'h':10
				}, {
					collection: {on:function(){}}
				});
	
				spyOn(tank2, "collide");
	
				//collide should be called as the tanks overlap
				var result = CollisionDetection.detect(tank2, [tank1], {
					'callback': 'collide'
				});
				
				expect(result).toBeFalsy();
				expect(tank1.collide).not.toHaveBeenCalled();
				expect(tank2.collide).not.toHaveBeenCalled();
			});
	
		    it('should not call collide when element is within bounds', function() {
	
				//create a bound model
				var boundsModel = new BoundsModel({
					'id':1,
					'x':0,
					'y':0,
					'w':200,
					'h':200
				});
	
				spyOn(TankModel.prototype, "collide");
	
				//create a tank inside the bounds
				var tankModel = new TankModel({
					'id':2,
					'x':50,
					'y':50,
					'w':10,
					'h':10
				}, {
					collection: {on:function(){}}
				});
				
				//collide should not be called as the tank is inside the bounds
				var result = CollisionDetection.detect(boundsModel, [tankModel], {
					'invert': true,
					'callback': 'collide'				
				});
	
				expect(result).toBeFalsy();			
				expect(tankModel.collide).not.toHaveBeenCalled();			
			});
	
		    it('should call collide when element is out of bounds', function() {
	
				//create a bound model
				var boundsModel = new BoundsModel({
					'id':1,
					'x':0,
					'y':0,
					'w':200,
					'h':200
				});
	
				spyOn(TankModel.prototype, "collide");
	
				//create a tank inside the bounds
				var tankModel = new TankModel({
					'id':2,
					'x':300,
					'y':300,
					'w':10,
					'h':10
				}, {
					collection: {on:function(){}}
				});			
				
				//collide should not be called as the tank is inside the bounds
				var result = CollisionDetection.detect(boundsModel, [tankModel], {
					'invert': true,
					'callback': 'collide'				
				});
	
				expect(result).toBeTruthy();				
				expect(tankModel.collide).toHaveBeenCalled();			
			});
			
		    it('should call collide when element is partially out of bounds', function() {
	
				//create a bound model
				var boundsModel = new BoundsModel({
					'id':1,
					'x':0,
					'y':0,
					'w':200,
					'h':200
				});
	
				spyOn(TankModel.prototype, "collide");
	
				//create a tank inside the bounds
				var tankModel = new TankModel({
					'id':2,
					'x':-5,
					'y':-5,
					'w':10,
					'h':10
				}, {
					collection: {on:function(){}}
				});			
				
				//collide should not be called as the tank is inside the bounds
				var result = CollisionDetection.detect(boundsModel, [tankModel], {
					'invert': true,
					'callback': 'collide'				
				});
	
				expect(result).toBeTruthy();		
				expect(tankModel.collide).toHaveBeenCalled();
			});
			
	    });    
	});
});
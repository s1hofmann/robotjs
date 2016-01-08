var test = require('tape');
var robot = require('..');
var lastKnownPos, currentPos;

//Increase delay to help test reliability.
robot.setMouseDelay(100);

test('Get the initial mouse position.', function(t) 
{
	t.plan(3);
	t.ok(lastKnownPos = robot.getMousePos(), 'successfully retrieved mouse position.');
	t.ok(lastKnownPos.x !== undefined, 'mousepos.x is a valid value.');
	t.ok(lastKnownPos.y !== undefined, 'mousepos.y is a valid value.');
});

test('Move the mouse.', function(t) 
{
	t.plan(3);
	lastKnownPos = robot.moveMouse(0, 0);
	t.ok(robot.moveMouse(100, 100), 'successfully moved the mouse.');
	currentPos = robot.getMousePos();
	t.ok(currentPos.x === 100, 'mousepos.x is correct.');
	t.ok(currentPos.y === 100, 'mousepos.y is correct.');
});

test('Drag the mouse.', function(t) 
{
	t.plan(4);
	
	t.ok(robot.dragMouse(5, 5) === 1, 'successfully dragged the mouse.');
	
	t.throws(function()
	{
		robot.dragMouse(0);
	}, /Invalid number/, 'drag mouse to (0).');
	
	t.throws(function()
	{
		robot.dragMouse(1, 1, "left", 5);
	}, /Invalid number/, 'drag mouse with extra argument.');
	
	t.throws(function()
	{
		robot.dragMouse(2, 2, "party");
	}, /Invalid mouse/, 'drag an incorrect mouse button (party).');
	
});

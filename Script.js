/* Farhan-Azmaara */

function setup () {
	ch = (100 + 2) * 2
	fn()
function fn () {
	my('.clock').html(getTime())
	my('.date').html(getDate())
	my('ul > li')
		.eq(new Date().getDay() - 1)
		.addClass('my-active')
	timeout(1000)
}
function toFixed (e) {
	return e < 10 ? '0' + e : e
}
function toHours (e) {
	return e > 12 ? e - 12 : e
}
function getTime () {
	var n = new Date()
	var hour = toFixed(toHours(n.getHours()))
	var min = toFixed(n.getMinutes())
	var sec = toFixed(n.getSeconds())
	return [hour, min, sec].join(':')
}
function getDate () {
var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	var n = new Date()
	return n.getDate() + ' ' + month[n.getMonth()] + ', ' + n.getFullYear()
}
}
function honkai () {
clear()
var n = new Date;
var h = n.getHours()
h = h > 12 ? h - 12 : h
var min = n.getMinutes()
var s = n.getTime() / 1000
GREY = 'rgb(177, 177, 177)'
RED = 'rgb(255,0,0)'
	for (var i = 0; i < 12; i++) {
		begin()
			lineWidth(3)
			var m = map(i, 0, 12, 0, pi * 2)
			line(
				center.x + 30 * sin(m),
				center.y - 30 * cos(m),
				center.x + 40 * sin(m),
				center.y - 40 * cos(m)
			)
			stroke(h === i ? RED : GREY)
		close()
	}
	for (var i = 0; i < 60; i++) {
		begin()
			lineWidth(2)
			var m = map(i, 0, 60, 0, pi * 2)
			line(
				center.x + 60 * sin(m),
				center.y - 60 * cos(m),
				center.x + 70 * sin(m),
				center.y - 70 * cos(m)
			)
			stroke(i > min ? GREY : RED)
		close()
	}
	begin()
		lineCap('round')
		arc(
			center.x, center.y,
			100,
			0,
			map(s % 60, 0, 60, 0, 360)
		)
		stroke(RED)
	close()
	loop()
}


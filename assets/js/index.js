var buzz = function () {
	var w = document.querySelector('.buzz_wrapper .text');
	var s = document.querySelector('.buzz_wrapper .text span');
	//var h = document.querySelectorAll('.post h1 span');
	//var t = document.querySelectorAll('.post h1');
	for (let i = 0; i < 4; i++) {
		var sCopy = s.cloneNode(true);
		w.appendChild(sCopy);
	}
	/*h.forEach(function(el, j){
		for(let i = 0; i < 4; i++){
			var hCopy = el.cloneNode(true);
			t[j].appendChild(hCopy);
		}
	});*/

}

//
// Mouse Moving 
//

var lFollowX = 0,
	lFollowY = 0,
	x = 0,
	y = 0,
	z = 0,
	friction = 1 / 30,
	cw = document.querySelector('#canvas__wrapper');

function moveBackground() {
	x += (lFollowX - x) * friction;
	y += (lFollowY - y) * friction;
	z += (lFollowX - x) * friction;

	var translate = 'perspective(1000px) translate3D(' + x + 'px, ' + y + 'px, ' + z + 'px) scale(1.1)';

	cw.style.transform = translate;

	window.requestAnimationFrame(moveBackground);
}

document.addEventListener("mousemove", function(e){
	var lMouseX = Math.max(-100, Math.min(100, window.innerWidth / 2 - e.clientX));
	var lMouseY = Math.max(-100, Math.min(100, window.innerHeight / 2 - e.clientY));
	lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
	lFollowY = (10 * lMouseY) / 100;
	console.log(lFollowX, lFollowY);
});


//
// Grid Animations
//

var genArr = function(l, a){
	// Get Random Numbers and Push to Array
	for (var i = 0; i < l.length / 1.2; i++) {
		var rnd = Math.floor(Math.random() * l.length);
		a.push(rnd);
	}
}

var delArr = function(a){
	for (let i = 0; i < a.length; i++) {
		a.pop();
	}
}

var classRemove = function (l) {
	l.forEach(function (el, i) {
		el.classList.remove("black");
	});
}

var classAdd = function(l, a){
	l.forEach(function (el, i) {
		if (a.includes(i)) {
			el.classList.add("black");
		} else {
			el.classList.remove("black");
		}
	});
}

var gridAnimate = function(l, a){
	classRemove(l);
	genArr(l, a);
	classAdd(l, a);
	delArr(a);
}

//
//
// Document Ready
//
//

document.addEventListener("DOMContentLoaded", function () {
	var gridInner = document.querySelectorAll('.bck__sub-grid__item');
	var rndArr = [];

	buzz();
	moveBackground();

	if (gridInner.length !== 0){
		setInterval(function () {
			gridAnimate(gridInner, rndArr);
		}, 1000);
	}
	
});
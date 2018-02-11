document.addEventListener("DOMContentLoaded", function(){

	var images = ['assets/images/l.jpg', 'assets/images/v.jpg', 'assets/images/m.jpg', 'assets/images/r.jpg', 'assets/images/d.jpg', 'assets/images/g.jpg', 'assets/images/e.jpg', 'assets/images/c.jpg'];

	const wrapper = document.querySelector(".image-effect-wrapper");
	var img = new Image();
	var c = document.getElementById('c');
	const ctx = c.getContext('2d');
	ctx.imageSmoothingQuality = 'high';

	var wH = wrapper.getBoundingClientRect().height;
	var wW = wrapper.getBoundingClientRect().width;
	c.width = wW;
	c.height = wH;
	c.style.width = wW + "px";
	c.style.height = wH + "px";
	
	// Generate random numbers and push to array
	var rnd = function (l, arr) {
		while (arr.length < l) {
			var num = Math.ceil(Math.random() * l);
			if (arr.includes(num)) {
				rnd(l, arr);
			} else {
				arr.push(num);
			}
		}
	}

	img.src = images[0];
	var imageCounter = 0;

	var siteIntro = document.querySelector(".site-intro");
	siteIntro.classList.add("visible");
	c.classList.add("visible");

	// Image Functions
	img.addEventListener('load', function () {

		wH = wrapper.getBoundingClientRect().height;
		wW = wrapper.getBoundingClientRect().width;
		c.width = wW;
		c.height = wH;
		c.style.width = wW + "px";
		c.style.height = wH + "px";

		var iH = img.naturalHeight;
		var iW = img.naturalWidth;
		
		var ratio = iH / iW;
		var dH = wW * ratio;

		var rows = 4;
		var cols = 16;

		var sliceWidth = iW / cols;
		var sliceHeight = iH / rows;

		var rowHeight = dH / rows;
		var colWidth = wW / cols;
		var slices = rows * cols;

		var arrX = [];
		var arrY = [];
		var drawPoints = [];
		var sx, sy = 0;
		var dx, dy = 0;

		rnd(cols, arrX);
		rnd(rows, arrY);

		for (var i = 0; i < rows; i++){
			for (var j = 0; j < cols - 1; j++){
				var obj = {x: j, y: i};
				drawPoints.push(obj);
			};
		};

		var draw = function(num) {
			ctx.drawImage(
				img, // Source Image
				sx, // Slice Offset X
				sy, // Slice Offset Y
				sliceWidth, // Slice Width
				sliceHeight, // Slice Height
				dx, // Draw Offset X
				dy, // Draw Offest Y
				colWidth, // Draw Width
				rowHeight // Draw Height
			);
			if (num < slices - cols){
				sx = (sliceWidth * arrX[drawPoints[num].x]) - sliceWidth;
				sy = (sliceHeight * arrY[drawPoints[num].y]) - sliceHeight;
				dx = (colWidth * arrX[drawPoints[num].x]) - colWidth;
				dy = (rowHeight * arrY[drawPoints[num].y]) - rowHeight;
			}
		}

		var counter = 0;
		
		var finish = setInterval(function(){
			draw(counter);
			c.classList.add("move");
			counter++;
			if (counter > slices) {
				clearInterval(finish);
				setTimeout(() => {
					if (imageCounter < images.length - 1){
						imageCounter++;
					} else {
						imageCounter = 0;
					}
					ctx.clearRect(0, 0, wW, wH);
					img.src = images[imageCounter];
					c.classList.remove("move");
				}, 2500);
			}
		}, 10);
	}, false);
	// End of Image Functions
	
	// Text Functions
	var siteIntro = document.querySelector(".site-intro p");
	var introLines = ['Grayscale: a not-for-profit arts collective', 'Promoting the most exciting contemporary music and visual art.', 'Exploring the most beautiful spaces in Dublin.'];
	var gibberish = ["█", "▓", "▒", "░", "█", "▓", "▒", "░", "█", "▓", "▒", "░", "<", ">", "/", "<", ">", "/", "<", ">", "¥", "ℑ", "℘", "◊", "♦", "≅", "∴"];

	var counter = 1;
	var draw = setInterval(function(){
		innerGibberish(counter);
		if (counter < introLines.length - 1){
			counter++;
		} else {
			counter = 0;
		}
	}, 7000);

	var randomString = function(j){
		var strArr = [];
		for (var i = 0; i < 12; i++){
			var rnd = Math.floor(Math.random() * gibberish.length);
			var newStr = gibberish[rnd];
			strArr.push(newStr);
		}
		var str = strArr.join('');
		return str;
	}

	var innerGibberish = function(j){
		var repeat = setInterval(function () {
			siteIntro.innerHTML = randomString(j);
		}, 40);

		setTimeout(() => {
			clearInterval(repeat);
			siteIntro.innerHTML = introLines[j];
		}, 1800);
	}


	// Scrolling Events
	var scrollPos = 0;
	var ctop;
	var content = document.querySelector(".content-wrapper");
	var scrollCheck = setInterval(function(){
		var newScrollPos = window.scrollY;
		if (scrollPos != newScrollPos){
			ctop = content.getBoundingClientRect().top;
			if (ctop < 0) {
				c.classList.add("invisible");
			} else {
				c.classList.remove("invisible");
			}
			scrollPos = newScrollPos;
		}
	}, 500)
	

});


const random = (max,min) => Math.floor((Math.random()*(max-min+1))+min);

function App(){
	let
	canvas = document.getElementById("canvas"),
	w = canvas.width = 1200,
	h = canvas.height = 600,
	r = 250,
	ctx = canvas.getContext("2d"),
	pm = Math.PI/2/90,
	count = random(10,5),
	arr  = [	];
	while( arr.length != count ) arr.push(random(100,1));
	board_line();
	grape();
	function grape(){
		let
		plus = arr.reduce( (acc,v) => acc+v )/100,
		arr2 = arr.map( v => v/plus ),
		max = Math.max.apply(null,arr2);
		arr2.reduce( (acc,v,idx) => {
			let percent = v,
			color = `rgb(${random(255,1)},${random(255,1)},${random(255,1)},1)`;
			v = v * (0.5/25);
			let 
			angular = v *(90/0.5),
			pi = 90*pm - pm*(acc.angular+(angular/2)),
			x1 = Math.cos(pi) * (r),
			y1 = Math.sin(pi) * (r);
			y1 = -y1;

			ctx.beginPath();
			ctx.globalAlpha = "0.3";
			ctx.fillStyle = color;
			if( percent == max ){
				x2 = Math.cos(pi) * 10,
				y2 = Math.sin(pi) * 10;
				y2 = -y2;
				ctx.moveTo(w/2+x2,h/2+y2);
				ctx.arc(w/2+x2,h/2+y2,r,Math.PI*(1.5+acc.result),Math.PI*(1.5+acc.result+v));
			}else{
				ctx.moveTo(w/2,h/2);
				ctx.arc(w/2,h/2,r,Math.PI*(1.5+acc.result),Math.PI*(1.5+acc.result+v));
			}
			ctx.fill();

			ctx.beginPath();
			ctx.globalAlpha = "1";
			ctx.font = "bold 15px 나눔고딕";
			ctx.fillStyle = color;
			ctx.fillText(percent.toFixed(2)+"%",w/2+x1,h/2+y1);

			acc.result += v;
			acc.angular += angular;
			return acc;
		},{result:0,angular:0 });
	}
	function board_line(){
		ctx.beginPath();
		ctx.rect(0,0,w,h);
		ctx.stroke();
	}
}
window.onload = function(){
	App();
}
var can = document.getElementById("game");
var canObj = can.getContext("2d");
canObj.fillStyle = "#000000";

var player, counter, gameOver, row, col, board;

start();

function start() {
	player = 1, counter = 0, gameOver = false, row = 0, col = 0;
	board = [ 
		[-1, -1, -1],
		[-1, -1, -1],
		[-1, -1, -1]
	];

	canObj.clearRect(0, 0, can.width, can.height);
	canObj.fillRect(500/3, 10, 5, 480);
	canObj.fillRect((500/3)*2, 10, 5, 480);
	canObj.fillRect(10, 500/3, 480, 5);
	canObj.fillRect(10, (500/3)*2, 480, 5);
}

function draw1(r, c, offset_x, offset_y) {
	if(gameOver==true) return;
	if(board[r][c]==-1) {
		canObj.lineWidth = 5;
		if(player==1) {
			canObj.beginPath();
			canObj.moveTo(25 + offset_x, 25 + offset_y);
			canObj.lineTo(150 + offset_x, 150 + offset_y);

			canObj.moveTo(150 + offset_x, 25 + offset_y);
			canObj.lineTo(25 + offset_x, 150 + offset_y);
			canObj.stroke();
		}
		else {
			canObj.beginPath();
			canObj.arc(88 + offset_x, 88 + offset_y, 62, 0, 2*Math.PI);
			canObj.stroke();
		}
		canObj.lineWidth = 1;
		board[r][c] = player;
		player = 3 - player;
		++counter;
	}
	else {
		alert("Invalid Move!");
	}
	return;
}

function checkWin() {
	if(gameOver==true) return -1;
	if(counter==9) {
		gameOver = true;
	}
	for(var i=0; i<3; ++i) {
		if(board[i][0]!=-1 && board[i][0]==board[i][1] && board[i][0]==board[i][2]) {
			return board[i][0];
		}
		if(board[0][i]!=-1 && board[0][i]==board[1][i] && board[0][i]==board[2][i]) {
			return board[0][i];
		}
	}
	if(board[0][0]!=-1 && board[0][0]==board[1][1] && board[0][0]==board[2][2]) {
		return board[0][0];
	}
	if(board[0][2]!=-1 && board[0][2]==board[1][1] && board[2][0]==board[0][2]) {
		return board[0][2];
	}

	return -1;
}

function minimax(c, p) {
	let val = 0, temp = 0, ro = -1, co = -1;

	temp = checkWin();
	if(temp==2) return [ro, co, 10];
	else if(temp==1) return [ro, co, -10];
	else if(c==9) return [ro, co, 0];

	if(p==2) {
		val = -10000;
		for(let i=0; i<3; ++i) {
			for(let j=0; j<3; ++j) {
				if(board[i][j]==-1) {
					board[i][j] = p;
					temp = minimax(c+1, 3-p);
					if(temp[2]>val) {
						ro = i;
						co = j;
						val = temp[2];
					}
					board[i][j] = -1;
				}
			}
		}
	}
	else {
		val = 10000;
		for(let i=0; i<3; ++i) {
			for(let j=0; j<3; ++j) {
				if(board[i][j]==-1) {
					board[i][j] = p;
					temp = minimax(c+1, 3-p);
					if(temp[2]<val) {
						ro = i;
						co = j;
						val = temp[2];
					}
					board[i][j] = -1;
				}
			}
		}	
	}
	return [ro, co, val];
}

function aiMove() {
	if(gameOver==true) {
		alert("Game is Over!");
		return;
	}
	else if(player!=2) return 0;

	var temp = checkWin();
	if(temp==1) {
		alert("You Win!");
		gameOver = true;
		return;
	}
	else if(temp==2) {
		alert("You Lose!");
		gameOver = true;
		return;	
	}

	let ans = minimax(counter, 2);
	row = ans[0];
	col = ans[1];
	
	if(row==0 && col==0) draw1(0, 0, 0, 0);
	else if(row==0 && col==1) draw1(0, 1, 165, 0);
	else if(row==0 && col==2) draw1(0, 2, 330, 0);
	else if(row==1 && col==0) draw1(1, 0, 0, 165);
	else if(row==1 && col==1) draw1(1, 1, 165, 165);
	else if(row==1 && col==2) draw1(1, 2, 330, 165);
	else if(row==2 && col==0) draw1(2, 0, 0, 330);
	else if(row==2 && col==1) draw1(2, 1, 165, 330);
	else if(row==2 && col==2) draw1(2, 2, 330, 330);

	temp = checkWin();
	if(temp>0) {
		setTimeout(function() {
			if(temp==1) {
				alert("You Win!");
			}
			else if(temp==2) {
				alert("You Lose!");	
			}
		}, 200);
		gameOver = true;
		return;
	}
	else if(gameOver==true) setTimeout(function() {alert("Draw!");}, 200);
}

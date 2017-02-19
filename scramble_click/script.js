var sentences = [
	"It's a trap!",
	"Get back to work!",
	"This is a Test?",
	"This is not a Test!",
	"Hello World!",
	"God is dead!",
	"Don't panic!",
	"Get to the choppa!",
	"It's alive!",
	"Play it again, Sam!",
	"I'll be back!",
	"You talkin’ to me?",
	"He-e-e-e-re’s Johnny!"
];

var lastr = sentences.length + 1,
		scramble = document.getElementById('scramble'),
		blocked = false;

scramble.onclick = function() {
	if(blocked == false) {
		blocked = true;
		//Gerring a non-repeating random number
		do {
			var r = Math.floor((Math.random() * sentences.length) + 0);
		} while(r == lastr);
		lastr = r;

		//Checking if the string on the page or the new String are longer
		if(sentences[r].length > scramble.innerHTML.length) {
			var max = sentences[r].length;
			var min = max;
		} else {
			var max = scramble.innerHTML.length;
			var min = sentences[r].length;
		}

		//Changing the characters on a timer
		var i = 0;
		var j = 0;
		var speed = 60;
		function mainClock(i, j, max) {
	    setTimeout(function () {
	    	if(j < 3 && i < min) {
	    		scramble.innerHTML = scramble.innerHTML.replaceAt(i, randomLetter());
	    		j++;
	    		mainClock(i, j, max);
	    	} else {
	    		scramble.innerHTML = scramble.innerHTML.replaceAt(i, sentences[r][i]);
		      if(i < min) {
		      	i++
		      } else {
						max--;
					}
					if(i < max) {
						j = 0;
		      	mainClock(i, j, max);
		      } else if(i == max) {
		      	blocked = false;
		      }
	    	}
		  }, speed);
		}
		mainClock(i, j, max);
	}
}

//Replacing the String
String.prototype.replaceAt = function(index, character) {
	if(character) {
	  return this.substr(0, index) + character + this.substr(index + character.length);
	} else {
		return this.slice(0, index) + this.slice(index + 1);
	}
}

//Getting a random character
function randomLetter() {
  var possible = ".,:!§$%/()=?+*#-";
  return possible.charAt(Math.floor(Math.random() * possible.length));
}
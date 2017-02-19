var sentences = [
	"Hello World!",
	"It's a trap!",
	"Get back to work!",
	"This is a Test?",
	"This is not a Test!",
	"God is dead!",
	"Don't panic!",
	"Get to the choppa!",
	"It's alive!",
	"Play it again, Sam!",
	"I'll be back!",
	"You talkin’ to me?",
	"He-e-e-re’s Johnny!"
];

var lipsum = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
var blocked = false;


//Creating the divs
document.addEventListener('DOMContentLoaded', function() {
	for(var i = 0; i < sentences.length; i++) {
		addElements(i);
	}
}, false);

function addElements(i) {
	var subHead = document.createElement('h2'),
			newDiv = document.createElement('div');
	subHead.appendChild(document.createTextNode(sentences[i]));
  newDiv.id = i;
  newDiv.className = 'container';
  newDiv.appendChild(subHead);
  newDiv.appendChild(document.createTextNode(lipsum));
  document.getElementsByTagName('main')[0].appendChild(newDiv);
}

var container =  document.querySelectorAll('container');

//Getting the scroll position of the div elements
var timer = null;
window.addEventListener('scroll', function() {
  if(timer !== null) {
    clearTimeout(timer);        
  }
  timer = setTimeout(function() {
  	var closestId = getDistance(sentences.length);
    if(document.getElementById(closestId).firstChild.innerHTML != document.getElementById('scramble').innerHTML) {
			console.log(closestId);
			scrambleIt(closestId)
		}
  }, 200);
}, false);

function getDistance(max) {
	var values = [];
	for(var i = 0; i < max; i++) {
		var headPos = document.getElementById('scramble').getBoundingClientRect(),
  			elemPos = document.getElementById(i).getBoundingClientRect(),
  			offset = elemPos.top - headPos.bottom;
  	values.push(offset);
  	if(i == max - 1) {
      var curr = values[0];
      var best = 0;
      var diff = Math.abs(curr + 90);
      for (var j = 0; j < values.length; j++) {
        var newdiff = Math.abs(values[j] + 90);
        if (newdiff < diff) {
          diff = newdiff;
          curr = values[j];
          best = j;
        }
      }
      return best;
  	}
	}
}

//Scrambing
var lastr = sentences.length + 1,
		scramble = document.getElementById('scramble');

scramble.onclick = function() {
	scrambleIt(false);
}

function scrambleIt(string) {
	if(blocked == false) {
		blocked = true;
		//Getting a non-repeating random number if required
		if(string === false) {
			do {
				var r = Math.floor((Math.random() * sentences.length) + 0);
			} while(r == lastr);
			lastr = r;
		} else {
			r = string;
		}

		//Checking if the string on the page or the new String are longer
		if(sentences[r].length > scramble.innerHTML.length) {
			var max = sentences[r].length;
			var min = max;
		} else {
			var max = scramble.innerHTML.length;
			var min = sentences[r].length;
		}

		//Changing the characters on a timer
		var i = 0,
				j = 0,
				speed = 60;
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
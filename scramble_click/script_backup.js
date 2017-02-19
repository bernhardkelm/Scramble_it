var sentences = [
	"It's a trap!",
	"Get back to work",
	"This is a Test",
	"Hello World!",
	"God is dead",
	"Don't panic!"
];

var lastr = sentences.length + 1;

$(document).on('click', '#scramble', function() {
	//Generating a non-repeating random number
	do {
		var r = Math.floor((Math.random() * sentences.length) + 0);
	} while(r == lastr);
	lastr = r;

	//Checking if the string on the page or the new String are longer
	if(sentences[r].length > $('#scramble').html().length) {
		var max = sentences[r].length;
		var min = max;
	} else {
		var max = $('#scramble').html().length;
		var min = sentences[r].length;
	}

	//Looping throuch every character and replacing it
	for(var i = 0; i < max; i++) {
		for(var j = 0; j < 4; j++) {
			if(j < 3) {
				$('#scramble').html($('#scramble').html().replaceAt(i, randomLetter()));
			} else {
				$('#scramble').html($('#scramble').html().replaceAt(i, sentences[r][i]));
				if(i >= min) {
					max--;
					i--;
				}
			}
		}
	}
});

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
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!§$%/()=?+*#-";
  return possible.charAt(Math.floor(Math.random() * possible.length));
}

/*Get quote for later
$.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function(a) {
  console.log(a);
});
*/
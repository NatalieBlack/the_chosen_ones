var elements = document.getElementsByTagName('*');
var re = '';
var adjs = ['privileged', 'cis\-?sexual', 'cis\-?het', 'straight', 'white', 'cis\-?', 'het\-?', 'heterosexual', 'hetero\-?', 'cis\-?gender', 'cis\-?gendered', 'caucasian', 'upper\-?class', 'rich', 'wealthy', 'able\-?bodied', 'neuro\-?typical'];
var adjs_spaces = [];

for(var i = 0; i < adjs.length; i++) {
  adjs_spaces.push(adjs[i] + ',? ');
}

var re_str = adjs_spaces.join('|');
re_str = '(' + re_str + ')+';


function matchCasePhrase(text, pattern){
  var finalwords = [];
  var words = text.split(" ");

  for(var i = 0; i < words.length; i++) {
    finalwords.push(matchCase(words[i], pattern));
  }

  return finalwords.join(' ');
}

function matchCase(text, pattern) {
    var result = '';

    for(var i = 0; i < text.length; i++) {
        var c = text.charAt(i);
        var p = pattern.charCodeAt(i);

        if(p >= 65 && p < 65 + 26) {
            result += c.toUpperCase();
        } else {
            result += c.toLowerCase();
        }
    }

    return result;
}


for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            var text = node.nodeValue;

            var re1 = new RegExp('(the )?' + re_str + '(men|guys|males|man people|dudes)', 'gi');
            var re2 = new RegExp('(a | the )?' + re_str + '(man|guy|dude|male)', 'gi');

            var replacedText1 = text.replace(re1, function(match) { return matchCasePhrase('the chosen ones', match) });
            var replacedText2 = replacedText1.replace(re2, function(match) { return matchCasePhrase('one of the chosen ones', match) });

            if (replacedText2 !== text) {
                element.replaceChild(document.createTextNode(replacedText2), node);
            }
        }
    }
}

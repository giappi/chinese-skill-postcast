
/* global lesson_content, lesson_id */

let spans = lesson_content.map((line, lineIndex) => line.Words.map
(
    (word) => 
    {
        var span = document.createElement("a");
        let text = word.SW;
        span.appendChild( document.createTextNode(text));
        for(let attr in word)
        {
            span.setAttribute(attr, word[attr]);
        }
        let _audio      = "postcast-data/1-8969/" + word.WID + ".mp3";
        let _pinyin     = word.PY;
        
        if(text == "A" || text == "B")
        {
            _audio      = "postcast-data/1-8969/" + lesson_id + "-2-" + (lineIndex + 1) + ".mp3";
            _pinyin     = "--";
        }
        
        let elementAttrs = 
        {
            href:       _pinyin != "" ? _audio : "",
            title:      _pinyin
        };
        
        for(let attr in elementAttrs)
        {
            if(elementAttrs[attr] != "")
            {
                span.setAttribute(attr, elementAttrs[attr]);
            }
        }
        
        // convert href to onclick
        span.onclick = function(e)
        {
            new Audio(_audio + "").play();
            return false;
        };
        if(span.href)
        {
            span.href = "#" + _audio;
        }
        
        return span;
    }
));

var postcastElement = document.getElementById("postcast");
var ul              = document.createElement("ul");
postcastElement.appendChild(ul);

for(let sentence of spans)
{
    var li = document.createElement("li");
    ul.appendChild(li);
    for(let word of sentence)
    {
        li.appendChild(word);
    }
}












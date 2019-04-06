

function main(data)
{
    let player          = new Audio();
    let lesson_content  = Object.keys(data.Sents).map(e => data.Sents[e]).filter(e => !!(e.Words));
    let lesson_id       = data.EID;
    console.log(lesson_content);
    let spans = lesson_content.map((line, lineIndex) => Object.keys(line.Words).map(e => line.Words[e]).map
    (
        (word) => 
        {
            var span = document.createElement("span");
            let text = word.SW ? word.SW : "";
            span.appendChild(document.createTextNode(text));
            for(let attr in word)
            {
                span.setAttribute(attr, word[attr]);
            }

            let _pinyin     = word.PY;
            let _meanning   = word.EN;
            let _isWord      = _pinyin != "";
            let _audio      = "words/" + (_pinyin + "").replace("'", "-") + ".m4a";
            
            if(text == "A" || text == "B")
            {
                _audio      = "podcast/" + lesson_id + "/audio/" + lesson_id + "-2-" + (lineIndex + 1) + ".m4a";
                _pinyin     = "";
                _meanning   = line.STRE;
            }
            
            let elementAttrs = 
            {
                "class" :       _isWord ? "word" : "",
                "href"  :       _isWord ? _audio : "",
                "title" :       _pinyin + " / " + _meanning
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
                player.src=_audio + "";
                player.play();
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
    ul.setAttribute("class", "postcast");
    postcastElement.appendChild(ul);
    
    for(let sentence of spans)
    {
        var li = document.createElement("li");
        ul.appendChild(li);
        for(let word of sentence)
        {
            li.appendChild(word);
            li.appendChild(document.createTextNode("  "));
        }
    }
}


function loadData(url, callback)
{
    $.get(url, function(response)
    {
        callback(response);
    });
}


function loadLesson(id, callback)
{
    loadData("podcast/" + id + "/lesson.json", function(data)
    {
        callback(data);
    });
}


function loadPodcastList(callback)
{
    loadData("podcast-list.json", function(data)
    {
        callback(data);
    });
}
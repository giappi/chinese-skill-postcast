

function main(data)
{
    let player          = new Audio();
    console.log(Object.keys(data.Sents));
    let lesson_content  = Object.keys(data.Sents).map(e => data.Sents[e]);
    let lesson_id       = data.EID;
    console.log(lesson_content);
    let spans           = [];
    let title_en        = data.TRE;
    let title_cn        = data.ST;
    for(let lineId in lesson_content)
    {

        if(lineId == "0")
        {
            continue;
        }

        let line            = lesson_content[lineId];
        let sentence_en     = line.STRE;
        let sentenceHTML    = [];
        var playSentButton  = document.createElement("span");
        playSentButton.appendChild(document.createTextNode("[►]"));
        playSentButton.classList = "clickable";
        sentenceHTML.push(playSentButton);
        playSentButton.onclick = function(e)
        {
            player.src = "podcast/" + lesson_id + "/audio/" + lesson_id + "-2-" + (lineId) + ".m4a";
            player.play();
            return false;
        };
        for(let wordId in line.Words)
        {

            if(wordId == "0")
            {
                continue;
            }

            let word        = line.Words[wordId];
            let _pinyin     = word.PY;
            let _meanning   = word.EN;
            let text        = word.SW;

            var span = document.createElement("span");
            span.appendChild(document.createTextNode(text));

            let _isWord     = _pinyin != "";
            
            
            if(_isWord)
            {
                for(let attr in word)
                {
                    span.setAttribute(attr, word[attr]);
                }

                let _audio          = "words/" + (_pinyin + "").replace("'", "-") + ".m4a";
                let elementAttrs    = 
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
            }
            sentenceHTML.push(span);
        }
        
        spans.push(sentenceHTML);
    }
    
    console.log(spans);
    
    var titleElement    = document.getElementById("title");
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

    document.title = title_cn + " / " + title_en;
    titleElement.innerText = document.title;

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
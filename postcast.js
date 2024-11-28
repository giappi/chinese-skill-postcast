

function main(data)
{
    let wordDetailHTML  = document.getElementById("word-detail");
    let wordDetailHead  = document.getElementById("detail-headword");
    let wordDetailPiny  = document.getElementById("detail-pinyin");
    let wordDetailMean  = document.getElementById("detail-meaning");
    let wordDetailClose = document.getElementById("detail-close");
    let player          = new Audio();
    let timeoutDetail   = 0;
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
        let sentence_en     = line.vi ? line.vi : line.STRE;
        let sentenceHTML    = [];
        var playSentButton  = document.createElement("span");
        playSentButton.appendChild(document.createTextNode("[►]"));
        playSentButton.classList = "clickable";
        sentenceHTML.push(playSentButton);
        playSentButton.onclick = function(e)
        {
            showDetail("", "", sentence_en, "podcast/" + lesson_id + "/audio/" + lesson_id + "-2-" + (lineId) + ".m4a");
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

                let _audio          = "audio/chinese_word_m4a/" + (_pinyin + "").replace("'", "-") + ".m4a";
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
                    showDetail(text, _pinyin, _meanning, _audio);
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

    var titleElement    = document.getElementById("title");
    var titleMeaning    = document.getElementById("title-meaning");
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
            li.appendChild(document.createTextNode(" "));
        }
    }

    document.title = title_cn + " / " + title_en;
    titleElement.innerHTML = `<span class="chinese">${title_cn}</span>`;
    titleMeaning.innerHTML = `<span>${title_en}</span>`;

    /**
     * FUNCTION AREA
     */

    function showDetail(headword, pinyin, meaning, audio)
    {
        // Play audio
        if(audio != player.src)
        {
            player.src = audio;
        }
        player.play();

        // Set content for detail
        wordDetailHead.innerText = headword;
        wordDetailPiny.innerText = pinyin;
        wordDetailMean.innerText = meaning;

        // Show detail
        wordDetailHTML.style.display = "block";

        // Set time to hide detail
        clearTimeout(timeoutDetail);

    }
    
    wordDetailClose.onclick = function hideDetail()
    {
        wordDetailHTML.style.display = "none";
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
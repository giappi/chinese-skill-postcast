
var lessonData;
var player = new Audio();

function main(data)
{
    let wordDetailHTML  = document.getElementById("word-detail");
    let wordDetailHead  = document.getElementById("detail-headword");
    let wordDetailPiny  = document.getElementById("detail-pinyin");
    let wordDetailMean  = document.getElementById("detail-meaning");
    let wordDetailClose = document.getElementById("detail-close");
    
    let timeoutDetail   = 0;
    var lesson_content  = Object.keys(data.Sents).map(e => data.Sents[e]);
    let lesson_id       = data.EID;
    let spans           = [];
    let title_en        = data.TRE;
    let title_cn        = data.ST;
    let title_vi        = data.TV;
    lessonData = data;


    for(let lineId in lesson_content)
    {

        if(lineId == "0")
        {
            continue;
        }

        let line            = lesson_content[lineId];
        let sentence_en     = line.vi || line.STRV || line.STRE;
        let sentence_py     = [];
        let sentenceHTML    = [];
        var playSentButton  = document.createElement("span");
        playSentButton.appendChild(document.createTextNode("[►]"));
        playSentButton.classList = "clickable";
        sentenceHTML.push(playSentButton);
        playSentButton.onclick = function(e)
        {
            showDetail("",
                    line.py,
                    sentence_en.replace(/^(A|B)\s*(:|：)\s*/, ''),
                    "podcast/" + lesson_id + "/audio/" + lesson_id + "-2-" + (lineId) + ".m4a");
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

            if (text == '：')
            {
                text = ':';
            }

            sentence_py.push(_pinyin || text.replace(/，|。/, m => ',.'['，。'.indexOf(m)] + ' '));

            let span = document.createElement("span");
            span.appendChild(document.createTextNode(text));
            let ruby = document.createElement("ruby");
            ruby.appendChild(span);

            let _isWord     = _pinyin != "";
            
            
            if(_isWord)
            {
                for(let attr in word)
                {
                    span.setAttribute(attr, word[attr]);
                }

                let _audio          = "audio/chinese_words_m4a/" + (_pinyin + "").replace("'", "-") + ".m4a";
                let elementAttrs    = 
                {
                    "class" :       _isWord ? "word" : "",
                    "href"  :       _isWord ? _audio : "",
                    "title" :       `[${_pinyin}]\n${_meanning}`
                };

                /* show pinyin above word */
                {
                    let rt = document.createElement("rt");
                    rt.appendChild(document.createTextNode(_pinyin));
                    ruby.appendChild(rt);
                }

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

                    let _meanningVi = window.words[text]?.mn
                                            .map(mn => `- [${kindName(mn[0])}] ${mn[1]}`)
                                            .join('\n');
                    showDetail(text, _pinyin, _meanningVi || _meanning, _audio);
                    return false;
                };
                if(span.href)
                {
                    span.href = "#" + _audio;
                }
            }
            sentenceHTML.push(ruby);
        }
        
        spans.push(sentenceHTML);
        line.py = sentence_py.join(' ').replace(/^(A|B)\s*(:|：)\s*/, '');
    }

    var titleElement    = document.getElementById("title");
    var titleMeaning    = document.getElementById("title-meaning");
    var postcastElement = document.getElementById("postcast");
    var playAllButton   = document.getElementById("button-play-all");
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

    document.title = title_cn + " / " + (title_vi || title_en);
    titleElement.innerHTML = `<span class="chinese">${title_cn}</span>`;
    titleMeaning.innerHTML = `<span>${(title_vi || title_en)}</span>`;

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


    function playAll(lines)
    {
        lines = lines === undefined
                    ? Object.keys(lessonData.Sents).map(e => lessonData.Sents[e])
                    : lines;
        let lesson_id = lessonData.EID;

        for(let lineId in lines)
        {
            if(lineId == "0")
            {
                continue;
            }

            // Play audio
            let audio = "podcast/" + lesson_id + "/audio/" + lesson_id + "-2-" + (lineId) + ".m4a";
            if(audio != player.src)
            {
                player.pause();
                player.removeAttribute("src");
                //player.load();
                //player.src = audio;
            }
            //player.play();
            let line        = lines[lineId];
            let sentenceEn  = line.vi || line.STRV || line.STRE;
            showDetail('', line.py, sentenceEn, audio);
            player.onended = (function() 
            {
                delete lines[lineId];
                setTimeout(() => playAll(lines), 300);
                
            });
            player.onerror = (e) => console.log('[E] ' + player.src);
            break;
        }
    }

    playAllButton.onclick = (e) => playAll();

}


function loadData(url, callback, onDone)
{
    return $.get(url, function(response)
    {
        callback(response);
    }).always(onDone);
}


function loadLesson(id, callback)
{
    let merged = {};
    loadData("podcast/" + id + "/lesson.json", function(data)
    {
        merged = data;
        loadData("podcast/" + id + "/lesson.vi.json", function(data2)
        {
            if (data2.Sents)
            {
                merged = mergeDeep(data, data2);
            }
            else
            {
                if (data2["0"])
                {
                    merged.TV = data2["0"];
                    for (let sentId in merged.Sents)
                    {
                        merged.Sents[sentId].STRV = data2[sentId];
                    }
                }
            }
        }, function onDone()
        {
            callback(merged);
        });
    });
    loadData("podcast/" + id + "/words.vi.json", function(data)
    {
        window.words = data;
    });
}


function loadPodcastList(callback)
{
    loadData("podcast-list.json", function(data)
    {
        callback(data);
    });
}


function kindName(k)
{
    return (
    {
            "v":    "động từ",
            "n":    "danh từ",
            "adj":  "tính từ",
            "pro":  "đại từ",
            "prep": "giới từ",
            "av":   "trợ động từ",
            "intj": "thán từ",
            "numb": "số đếm",
            "measure":  "lượng từ",
            "sentence": "cụm từ",
    })[k] || k;
}


/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
function isObject(item)
{
  return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
function mergeDeep(target, ...sources)
{
  if (!sources.length)
    return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source))
  {
    for (const key in source)
    {
      if (isObject(source[key]))
      {
        if (!target[key]) 
          Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      }
      else
      {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}
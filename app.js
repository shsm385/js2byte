'useb stric5t'

const axios = require(`axios`);
const APIKEY = `ee87e39793802c011bb0a765e847125d7c5fea1a3bfc981c76f53c7ef2e246fc`; //API KEY
const BASE_URL = `https://labs.goo.ne.jp/api/hiragana`;
let array = ['アップル','飲み会','一文字','パイナップル','みかん','田中'];
const SENTENCE = array;
//const SENTENCE = process.argv[2];
const OUTPU_TYPE = `katakana`; //or `hiragana`

const options = {
    method: 'post',
    url: BASE_URL,
    headers: {
        'Content-Type': `application/x-www-form-urlencoded`,
        'Content-Type': `application/json`
    },
    data: {
        app_id: APIKEY,
        sentence: SENTENCE,
        output_type: OUTPU_TYPE
    }
};

// 2byte文字のカタカナとひらがなを比較
// https://gist.github.com/kawanet/5553478 より参照
function katakanaToHiragana(src) {
    return src.replace(/[\u30a1-\u30f6]/g, function(match) {
        var chr = match.charCodeAt(0) - 0x60;
        return String.fromCharCode(chr);
    });
}


axios(options)
.then((res) => {
    let str = res.data.converted;
    let arr = str.split(' ');
    //let arr = Object.keys(res.data).map(function () {return obj});
    console.log(
      arr.sort(function(char1,char2){
      char1 = katakanaToHiragana(char1.toString());
      char2 = katakanaToHiragana(char2.toString());
      if(char1 < char2){
        return -1;
      }else if(char1 > char2){
        return 1;
      }
      return 0;
      })
    );
})
.catch((err) => {
    console.log(err);
});

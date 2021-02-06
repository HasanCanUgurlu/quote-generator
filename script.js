const url = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=displayQuote'
 
const colorRandomizer = () => {
  const myColors = ['#3498db', '#2ecc71', '#9b59b6', '#e74c3c', '#f1c40f', '#fb6964', '#342325', '#e84c3b', '#f49c12', '#2c3e4f', '#73a956', '#472e32', '#78b0a9', '#9b59b6', '#15a084'] //array of colors
  const randomNum = Math.floor(Math.random() * myColors.length) //generate random number
  
  const randomColor = myColors[randomNum]
  // modify bg and txt color with my random color
  // get the DOM element
  $("body").css("background-color", randomColor)
  $(".randomColor").css("color", randomColor)
  $(".buttonColor").css("background-color", randomColor)
}

const getQuote = data => {
  // 1) here we are creating the callback function that we will pass to the JSONP request
  const callbackName = 'displayQuote'
  window[callbackName] = function(data) {
    delete window[callbackName]
    document.body.removeChild(script)
    callback(data)
  }

  // 2) we are injecting the script tag into our HTML
  const script = document.createElement('script')
  script.src =
    url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName
  document.body.appendChild(script)
}

const displayQuote = data => {
  const currentQuote = data.quoteText
  const currentAuthor = data.quoteAuthor
  //add them to html
  const text = $('#quoteText')[0]
  text.innerHTML = currentQuote
  const author = $('#quoteAuthor')[0]
  author.innerHTML = currentAuthor ? `- ${currentAuthor}`: '- Anonymous'
  const twitter = $('#twitter-share-button')[0]
  twitter.setAttribute(
    'href',
    'https://twitter.com/intent/tweet?hashtags=quotes,Fcc&related=freecodecamp&text=' +
      encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
  )
}
// on click event
$('#new-quote').on('click', () => {
  colorRandomizer();
  getQuote(displayQuote);
})
// first time load, gives you a quote and color
$(document).ready(() => {
  colorRandomizer();
  getQuote(displayQuote);
})
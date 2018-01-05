// DOM Node Objects
var clockNode = document.querySelector('.clock'),
    hexNode = document.querySelector('.hex-color'),
    hourHand = document.querySelector('#littleHand'),
    minuteHand = document.querySelector('#bigHand'),
    secondHand = document.querySelector('#secondHand'),
    bodyNode = document.querySelector('body')

/************ Clock Animation ************/

var correctHours = function(obj) {
  obj.hours %= 12
  obj.hours = obj.hours ? obj.hours : 12
  return obj
}

var createDateObj = function() {
  return new Date()
}

var injectPadding = function(obj) {
  for (var key in obj) {
    if (obj[key] < 10 || obj[key].length < 2) {
      obj[key] = '0' + obj[key]
    }
  }
  return obj
}

var updateClock = function() {
  var time = getTime()
      time = correctHours(time)
      time = injectPadding(time)
  clockNode.textContent = time.hours + ':' + time.minutes + ':' + time.seconds
}

var getTime = function() {
  var now = createDateObj()
  return {
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds()
  }
}

/************ Logo Animation ************/

var positionHands = function() {
  var time = getTime(),
      time = correctHours(time)
      hours = time.hours * 30 - 180
      minutes = time.minutes * 6,
      seconds = time.seconds * 6,
  hourHand.style.transform = 'rotate(' + hours + 'deg)'
  minuteHand.style.transform = 'rotate(' + minutes + 'deg)'
  secondHand.style.transform = 'rotate(' + seconds + 'deg)'
}

/************ Transitioning Calculated Hex Backgrounds ************/

var toString = function(obj) {
  for (var key in obj) {
    var val = obj[key]
    obj[key] = val.toString(16).toUpperCase()
  }
  return obj
}

var scaleValues = function(obj) {
  obj.hours *= 10
  obj.minutes *= 4
  obj.seconds *= 4
  return obj
}

var toHex = function() {
  var time = getTime(),
      scaledObj = scaleValues(time),
      hexObj = toString(scaledObj),
      hexObj = injectPadding(hexObj),
      hexColor = hexObj.hours + ':' + hexObj.minutes + ':' + hexObj.seconds
  bodyNode.style.backgroundColor = '#' + hexColor.replace(/\:/g, '')
  hexNode.textContent = hexColor
}

/************ Clock Event Listeners ************/

clockNode.addEventListener('mouseenter', function() {
  this.classList.toggle('clock--is-hidden')
})

clockNode.addEventListener('mouseleave', function() {
  this.classList.toggle('clock--is-hidden')
})

clockNode.addEventListener('touchstart', function() {
  this.classList.toggle('clock--is-hidden')
})

/************ Main ************/

var main = function() {
  updateClock()
  positionHands()
  toHex()
}

setInterval(main, 1000)

var css = document.querySelector('h3')
var colour1 = document.querySelector('.color1')
var colour2 = document.querySelector('.color2')
var body = document.getElementById('gradient')

// Add a button for random colours
var randomButton = document.getElementById('random')

// Get hex value for any valid colour (including names) using browser interpretation
function getHexColour (colour) {
  let tempDiv = document.createElement('div')
  tempDiv.style.color = colour
  let colourSet = window.getComputedStyle(document.body.appendChild(tempDiv)).color.match(/\d+/g).map(a => parseInt(a, 10))
  document.body.removeChild(tempDiv)
  let hexColourSet = colourSet.map(a => {
    let hexValue = a.toString(16)
    return hexValue.length === 2 ? hexValue : '0' + hexValue
  })
  return '#' + hexColourSet[0] + hexColourSet[1] + hexColourSet[2]
}

// Set new background gradient if either colour picker changes
function setGradient () {
  body.style.background =
  'linear-gradient(to right, ' +
  colour1.value +
  ', ' +
  colour2.value +
  ')'
  css.textContent = body.style.background + ';'
}

// Set random colours if button clicked
function setRandomColours () {
  function randomNumber0_255 () {
    return Math.floor(Math.random() * 256)
  }
  let randomColour1 = 'rgb(' + randomNumber0_255() + ', ' + randomNumber0_255() + ', ' + randomNumber0_255() + ')'
  let randomColour2 = 'rgb(' + randomNumber0_255() + ', ' + randomNumber0_255() + ', ' + randomNumber0_255() + ')'

  var newStyleString = 'linear-gradient(to right, ' +
  randomColour1 + ', ' + randomColour2 + ')'
  body.style.background = newStyleString
  css.textContent = newStyleString + ';'
  colour1.value = getHexColour(randomColour1)
  colour2.value = getHexColour(randomColour2)
}

// Set colour pickers to match initial background
var bodyStyle = window.getComputedStyle(body)
var bodyBackground = bodyStyle.background.match(/to right[^)]+/)
var bodyBackgroundColours = bodyBackground[0].split(', ')
colour1.value = getHexColour(bodyBackgroundColours[1])
colour2.value = getHexColour(bodyBackgroundColours[2])

// Event listeners
colour1.addEventListener('input', setGradient)
colour2.addEventListener('input', setGradient)
randomButton.addEventListener('click', setRandomColours)

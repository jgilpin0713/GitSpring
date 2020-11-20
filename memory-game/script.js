const gameContainer = document.getElementById("game");
let color1 = null;
let color2 = null; 
let flipped = 0; 
let noClick = false; 

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow", 
  "teal",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow", 
  "teal",
  "orchid",
  "orchid", 
  "yellowgreen",
  "yellowgreen"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {// using this function to flip the card adding the color to match 
  // you can use event.target to see which element was clicked
  if(noClick) return; 
  if(event.target.classList.contains("flipped")) return;

  let currentColor = event.target;
  currentColor.style.backgroundColor = currentColor.classList[0];

  if (!color1 || !color2) {
    currentColor.classList.add("flipped");
    color1 = color1 || currentColor;
    color2 = currentColor === color1 ? null: currentColor;
  }

  if (color1 && color2) {
    noClick = true; 
    let gif1 = color1.className;
    let gif2 = color2.className;
 

  if (gif1 === gif2){
    flipped += 2;
    color1.removeEventListener("click", handleCardClick);
    color2.removeEventListener("click", handleCardClick);
    color1 = null; 
    color2 = null;
    noClick = false; 
  } else {
    setTimeout(function() {
      color1.style.backgroundColor = "";
      color2.style.backgroundColor = "";
      color1.classList.remove("flipped");
      color2.classList.remove("flipped");
      color1 = null; 
      color2 = null;
      noClick = false;
    }, 1000);
  }
}
if (flipped === COLORS.length) alert("You won!!!"); //when it's over, you win!
}
// when the DOM loads
createDivsForColors(shuffledColors);

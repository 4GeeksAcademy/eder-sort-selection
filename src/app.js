/* eslint-disable */
import "bootstrap";
import "./style.css";

//// variables /////

const cardType = ["♥", "♠", "♣", "♦"];
const cardStyle = ["hearts", "spades", "clovers", "diamonds"];
const cardValue = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K"
];
const inputCardsToDraw = document.getElementById("input-cards-to-draw");
const buttonDraw = document.getElementById("button-draw");
const button = document.getElementById("button-event");
const cardBody = document.getElementById("testhtml");
const cardBodyBubble = document.getElementById("testhtml2");
const valuesToSort = [];
const typesToSort = [];
let sortedLogCards = {};
let randomType = 0;
let randomValue = 0;
let cardsToDraw = 0;
let counter = 0;
let logCount = 0;

/* Functions */

function generateRandom() {
  randomType = Math.floor(Math.random() * cardType.length);
  randomValue = Math.floor(Math.random() * cardValue.length);
}

function saveCardSet() {
  valuesToSort.push(randomValue);
  typesToSort.push(randomType);
}
/* Selection SORT */
/* function swap(arr, arr2, xp, yp) {
  [arr[xp], arr[yp]] = [arr[yp], arr[xp]];
} */

// Function to implement selection
function selectionSort(array1, array2) {
  let arr = [...array1];
  let arr2 = [...array2];
  // To get length of array
  let n = arr.length;

  // Variable to store index of smallest value
  let min;

  // variables to iterate the array
  let i, j;

  for (i = 0; i < n - 1; ++i) {
    min = i;
    for (j = i + 1; j < n; j++) {
      if (arr[j] < arr[min]) min = j;
    }

    // Swap if both index are different
    if (min != i) {
      [arr[min], arr[i]] = [arr[i], arr[min]];
      [arr2[min], arr2[i]] = [arr2[i], arr2[min]];
      sortedLogCards = { values: [...arr], types: [...arr2] };
      bubbleLog(sortedLogCards);
      logCount++;
    }
    /* swap(arr,arr2,min,i); */
  }
}

/* Finished Selection Sort */

////Funcion Crear Cartas por Draw///////
function newCardHtml() {
  let fragment = document.createDocumentFragment();
  while (counter < cardsToDraw) {
    generateRandom();
    saveCardSet();
    let newDiv = document.createElement("div");
    newDiv.className =
      "card col-5 col-sm-3 col-md-2 col-lg-2 col-xl-2 col-xxl-1 card-background";
    newDiv.innerHTML = `      
              <div class="col">
                <div class="position-absolute ps-2 top-0 start-0 ">
                  <i class="fa-solid ${cardStyle[randomType]}"> ${cardType[randomType]}</i>
                </div>
              </div>
              <div class="col">
                <div class=" d-flex justify-content-center">
                  <p class="m-0 pt-3 value">${cardValue[randomValue]}</p>
                </div>
              </div>
              <div class="col ">
                <div class="position-absolute px-2 bottom-0 end-0">
                  <i class="fa-solid  fa-flip-vertical  ${cardStyle[randomType]} ">${cardType[randomType]}</i>
                </div>
              </div>`;
    fragment.appendChild(newDiv);
    counter++;
  }
  cardBody.appendChild(fragment);
  counter = 0;
}
////Funcion Crear Cartas pora las iteraciones del Bubble////////
function bubbleLog(obj) {
  let fragment2 = document.createDocumentFragment();
  let newDiv3 = document.createElement("div");
  newDiv3.className =
    "row justify-content-center gap-5 mb-5 border border-dark border-4 py-4";
  newDiv3.innerHTML = `
    <div class="col-auto justify-content-start">
       <p class="display-6 fw-bold">Log #${logCount}</p> 
    </div>  
  `;
  for (let i = 0, l = obj.types.length; i < l; i++) {
    let newDiv2 = document.createElement("div");
    newDiv2.className =
      "card col-5 col-sm-3 col-md-2 col-lg-2 col-xl-2 col-xxl-1 card-background";
    newDiv2.innerHTML = `          
      <div class="col">
        <div class="position-absolute ps-2 top-0 start-0 ">
          <i class="fa-solid ${cardStyle[obj.types[i]]}">${
      cardType[obj.types[i]]
    }
          </i>
        </div>
      </div>
      <div class="col">
        <div class=" d-flex justify-content-center">
          <p class="m-0 pt-3 value">${cardValue[obj.values[i]]}</p>
        </div>
      </div>
      <div class="col ">
        <div class="position-absolute px-2 bottom-0 end-0">
          <i class="fa-solid  fa-flip-vertical  ${cardStyle[obj.types[i]]} ">${
      cardType[obj.types[i]]
    }</i>
        </div>
      </div>`;
    newDiv3.appendChild(newDiv2);
  }
  fragment2.appendChild(newDiv3);
  cardBodyBubble.appendChild(fragment2);
}

/* Event Listenerss */

buttonDraw.addEventListener("click", () => {
  cardBody.replaceChildren();
  valuesToSort.splice(0, valuesToSort.length);
  typesToSort.splice(0, typesToSort.length);
  cardsToDraw = inputCardsToDraw.value;
  newCardHtml();
  inputCardsToDraw.value = "";
});

button.addEventListener("click", function() {
  logCount = 0;
  cardBodyBubble.replaceChildren();
  selectionSort(valuesToSort, typesToSort);
});

let players = [];
let boxes = [];
let interactionLocked = false;

const truths = [
  // Fun & Light-Hearted
  "What's the weirdest thing you've ever eaten?",
  "Who was your first crush?",
  "What's your guilty pleasure movie or song?",
  "If you could be invisible for a day, what would you do?",
  "Have you ever pretended to like something just to fit in?",

  // Bold & Personal
  "Have you ever had a crush on someone here?",
  "What’s your most embarrassing moment?",
  "What secret do you keep from your best friend?",
  "What would you do if you were the opposite gender for a day?",
  "Have you ever sent a message to the wrong person?",

  // Deep & Thought-Provoking
  "What's something you’ve never told anyone?",
  "What’s your biggest fear about the future?",
  "If you could change one thing in your past, what would it be?",
  "Have you ever felt truly heartbroken?",
  "What’s the one thing you want people to understand about you?"
];


const dares = [
  // Funny & Silly
  "Act like a baby until your next turn.",
  "Try to lick your elbow (and keep trying for 30 seconds).",
  "Say the alphabet backward while hopping on one foot.",
  "Do your best celebrity impression.",
  "Speak in a British accent for the next 3 rounds.",

  // Bold & Daring
  "Text your crush 'Hey, I like your vibe.'",
  "Post a weird selfie on your story and keep it for 10 minutes.",
  "Read your last 5 DMs out loud.",
  "Let someone go through your photo gallery for 30 seconds.",
  "Call someone and sing 'Happy Birthday' to them even if it’s not their birthday.",

  // Creative & Unique
  "Write a short poem about someone in the group.",
  "Pretend you're in a dramatic soap opera scene.",
  "Draw a mustache on your face and wear it for the next 10 minutes.",
  "Talk only in rhymes until your next turn.",
  "Balance a book on your head and walk across the room."
];


function generatePlayerInputs() {
  
  const num = document.getElementById("numPlayers").value;
  const container = document.getElementById("playerInputs");  //to store players name
  container.innerHTML = ""; // clears the older data
  for (let i = 1; i <=num; i++) {      // altough on comparsion string is automatically comverted into integer
    const input = document.createElement("input");  //it is being used for making the box in js ...this is diff from html   
   
    input.placeholder = `Player ${i} Name`;
    input.classList.add("player-name");     // assigning all names a classs
    container.appendChild(input);                 //takes input and add it into container..visual where all the names is stored
    container.appendChild(document.createElement("br")); // to make box appear on next line 
    
  }
  document.querySelector(".hiding").classList.remove("hide");
  document.querySelector(".hiding").style.display = "block";

  
  
}

function distributeEvenly(players, count) {    //player= number of players , count= no. of boxes
  const dist = [];                  // to make a new array of all names in the boxes
  let index = 0;
  while (dist.length < count) {
    dist.push(players[index % players.length]);   //to put names in the empty array dist repeatedly 
    index++;
  }
  // for(let i=1;i<=count;i++)
  // {
  //   if(index==players.length){
  //     index=0;
  //   }
  //   dist.push(players[index]);         can be used instead of while
  //   index++;

  // }
  return shuffle(dist);
} 
 
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {  // used backward loop to avoid same swap again and again
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startGame() {
  const inputs = document.querySelectorAll(".player-name");
  players = Array.from(inputs)
    .map(input => input.value.trim())
    .filter(name => name);

  if (players.length === 0) {
    alert("Please enter at least one player name.");
    return;
  }
   if (players.length < 2) {
    alert("Enter at least 2 player names.");
    return;
  }

  const boxCountInput = document.getElementById("numBoxes").value;
  if (!boxCountInput) {
    alert("Please enter the number of boxes.");
    return;
  }

  const boxCount = parseInt(boxCountInput);  // to chnage the string input to integer

 
  if (boxCount < players.length) {
    alert("Number of boxes must be greater than or equal to number of players.");
    return;
  }

  boxes = distributeEvenly(players, boxCount); //contains the final array shuffled and distributed

  document.querySelector(".input-area").style.display = "none";
  document.getElementById("boxContainer").style.display = "flex";
  document.getElementById("resetBtn").style.display = "inline-block";
  renderBoxes();
}

function renderBoxes() {
  const container = document.getElementById("boxContainer");
  container.innerHTML = "";
  boxes.forEach((name, idx) => {
    const div = document.createElement("div");      //div to create the number of boxes 
    div.classList.add("box");             //class name of boxes
    div.dataset.name = name;             //giving the name to eac boxes of div..
    div.addEventListener("click", () => revealBox(div));
    container.appendChild(div);
  });
}

let currentName = "";

function revealBox(div) {
  if (div.classList.contains("revealed") || interactionLocked) return;
  interactionLocked = true;
  currentName = div.dataset.name;
  div.textContent = currentName;
  div.classList.add("revealed");
  document.getElementById("choiceBtns").style.display = "block";
  document.getElementById("boxContainer").classList.add("blur");
  document.getElementById("questionBox").innerHTML = `<span style="color: red;">${currentName}'s </span> turn! Choose Truth or Dare:`; 

}

document.getElementById("truthBtn").addEventListener("click", () => {
  const q = truths[Math.floor(Math.random() * truths.length)];
  document.getElementById("questionBox").innerHTML = `<span style="color: #90e0ef;">${currentName} </span> - Truth: ${q}`;
  document.getElementById("choiceBtns").style.display = "none";
  document.getElementById("boxContainer").classList.remove("blur");
  interactionLocked = false;
});

document.getElementById("dareBtn").addEventListener("click", () => {
  const q = dares[Math.floor(Math.random() * dares.length)];
  document.getElementById("questionBox").innerHTML = `<span style="color: #90e0ef;">${currentName}</span> - Dare: ${q}`;
  document.getElementById("choiceBtns").style.display = "none";
  document.getElementById("boxContainer").classList.remove("blur");
  interactionLocked = false;
});

function resetGame() {
  players = [];
  boxes = [];
  document.getElementById("playerInputs").innerHTML = "";
  document.getElementById("numPlayers").value = "";
  document.getElementById("numBoxes").value = "";
  document.getElementById("boxContainer").innerHTML = "";
  document.getElementById("boxContainer").style.display = "none";
  document.getElementById("choiceBtns").style.display = "none";
  document.getElementById("questionBox").textContent = "";
  document.querySelector(".input-area").style.display = "block";
  document.getElementById("resetBtn").style.display = "none";
  document.querySelector(".hiding").style.display = "none";
  interactionLocked = false;
}
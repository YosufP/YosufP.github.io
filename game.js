let players = 10; // Player count
let episodecount = 0; // Episode Value count
let killer; // Initializes killer variable
let stamina; // Stamina stat for each player 
let speed; // Speed stat for each player 
let strength; // Strength stat for each player 
let suspicion = 0; // Suspicion stat for each player 
let highestPlayer; //Highest stat player
var delayInMilliseconds = 10000; // 1 Second

let castMembers = [
{name:"Sidney Prescott", image: "sidney prescott.jpeg", id: 1},
{name:"Gale Weathers", image: "gale weathers.jpg", id: 2},
{name:"Stu Macher", image: "stu macher.jpg", id: 3},
{name:"Billy Loomis", image: "billy loomis.webp", id: 4},
{name:"Dewey Riley", image: "dewey riley.webp", id: 5},
{name:"Tatum Riley", image: "tatum riley.jpg", id: 6},
{name:"Principal Himbry", image: "principal himbry.webp", id: 7},
{name:"Tatum Riley", image: "tatum riley.jpg", id: 8},
{name:"Casey Becker", image: "casey becker.webp", id: 9},
{name:"Randy Meeks", image: "randy meeks.webp", id: 10}
];

let scenes = [
{name:"Act 3", image: "sidneygun.jpg", num: 2},
{image: "sidneygun.jpg", num: 3},
{image: "group.jpeg", num: 4}

];

let gameStarted = false;
let objects = ["knife", "gun", "shovel", "rope", "candle", "matche", "lighter", "clothesline", "hiding spot", "clue"]; // List of objects 
let events = ["sudden outburst", "false accusation", "heated argument", "suspicious behavior", "mysterious disappearance", "surprising discovery"]; // List of random events
let playAs1996Cast = document.getElementById("buttonp")
let killerSet = false;



// Function to randomly select the Killer 
function chooseKiller(){
	
    let randomNumber = Math.floor(Math.random() * castMembers.length);
    killer = castMembers[randomNumber];
	console.log	("A new killer has been chosen: " + killer.name);
	castMembers = castMembers.filter(x => x!== killer);
	console.log (castMembers);
}

// Function to randomly assign Stamina, Speed and Strength stats to each player
function assignStats() {
    for (let i = 0; i < castMembers; i++) {
        stamina = Math.floor(Math.random() * 101); 
        speed = Math.floor(Math.random() * 101); 
        strength = Math.floor(Math.random() * 101);
        suspicion = 0;
		let totalStats = stamina + speed + strength;	// Create a calculation for total combined stats
		if (totalStats > highestPlayer) { // Compare total combined stats to the highest score and update if needed
			highestPlayer = totalStats;
		}
    }
	return highestPlayer; // Return the highest score
}

// Function to randomly assign objects to each player 
function assignObjects() {
    let numObjects = Math.floor(Math.random() * (objects.length + 1)); // Choose a random number of objects 
    let assignedObjects = []; // Create an array to store objects
    for (let i = 0; i < numObjects; i++) {
        let randomObject = objects[Math.floor(Math.random() * objects.length)]; // Choose a random object from the list  
        assignedObjects.push(randomObject); // Store the object in the array
    }
    return assignedObjects; // Return the array
}

function removeDeadCast() {
    for (let i = 0; i < castMembers.length; i++) {
        if (castMembers[i] == killer && episodecount === 3) {
            castMembers.splice(i, 1); // Removes dead cast member from the game
			console.log("The dead cast member has been removed from the game." + castMembers.name);
			endGame();
        }
    }
}

// Function to eliminate one player based on all 3 stats
function eliminateOne() {
	
	for (let i = 0; i < players; i++) { // Loop through each player 
    let randomNumber = Math.floor(Math.random() * players); // Choose a random player
    let totalStats = stamina + speed + strength; // Calculate total combined stats
    if (totalStats < 150 && suspicion > 2) { // If the combined stats are less than 150 and suspicion is greater than 2, eliminate the player
        console.log(`Player ${randomNumber} has been eliminated due to low combined stats and high suspicion level! Their name is ${castMembers[randomNumber]}`);
		players--; // Decrement player count 
    }
	}
}



// Function to increase suspicion stat of each Survivor randomly 
function increaseSuspicion() {
    for (let i = 0; i < castMembers; i++) {
        if (i !== killer) { // Increases suspicion only for non-killers
            suspicion++; // Increments suspicion stat by 1
        }
    }
}

function openingScene() {
	
let lowestPlayer = 0;

for (let i = 0; i < castMembers; i++) { // Loop through each player 
    let totalStats = stamina + speed + strength; // Calculate total combined stats
    if (totalStats < lowestPlayer) { // Compare total combined stats to the lowest score and update if needed
        lowestPlayer = totalStats;
		
		break;
    }
}

	let lowestPlayerCastMember = castMembers[lowestPlayer];
	assignStats();
	chooseKiller();
	assignObjects();
	
	console.log("how many survivors is there in the game " + castMembers);
	
	document.getElementById("maintext").innerHTML = "Opening Scene";
	document.getElementById("scenebox").style.backgroundImage = "url(./images/s1oc.webp)";	
	document.getElementById("desc").innerHTML = "The Phone Rings... and " + lowestPlayerCastMember.name + " answers the phone";

	eliminateOne();
    increaseSuspicion();	
	
	console.log("Opening Scene ");
	
	episodecount++;

}
	
// Function to play each episode
function playEpisode() {
	
	let lowestPlayer = 0;

	for (let i = 0; i < castMembers; i++) { // Loop through each player 
		let totalStats = stamina + speed + strength; // Calculate total combined stats
		if (totalStats < lowestPlayer) { // Compare total combined stats to the lowest score and update if needed
			lowestPlayer = totalStats;	
			break;
		}
	}
			
	 if (castMembers.length < 4) {
		endGame();
	}
	
	let lowestPlayerCastMember = castMembers[lowestPlayer];
	
	gameStarted = true;
	
	
	let randomScenes = Math.floor(Math.random() * scenes.length);
    scene = scenes[randomScenes].image;
	scenename = scenes[randomScenes].name;
	scenenum = scenes[randomScenes].num;
	console.log(castMembers);
	let HSB = false;

	if (scenenum === 2 || scenenum === 3 && lowestPlayerCastMember.name === "Tatum Riley"){
		document.getElementById("maintext").innerHTML = "Stu's Garage";
		document.getElementById("scenebox").src = "./images/tatumghostface.jpg";
		document.getElementById("scenebox2").src = "./images/garageattack.avif";
		document.getElementById("scenebox3").src = "./images/tatumdead.webp";
		document.getElementById("desc").innerHTML = "The garage door slams and " + lowestPlayerCastMember.name + " turns around and sees Ghostface... in sheer panic " + lowestPlayerCastMember.name + "throws beer bottles at Ghostface and attemps to go through the flap cat door";
		assignObjects();
		eliminateOne();
		document.getElementById("statustext").innerHTML = "Status: Dead";
		increaseSuspicion();	
		episodecount++; // Increment episode count
		console.log("Episode after Opening Scene Count " + episodecount);
		console.log("Tatum Garage Scene");
	} 
	else if (scenenum === 3 && lowestPlayerCastMember.name === "Casey Becker") {
		document.getElementById("maintext").innerHTML = "Casey's Home";
		document.getElementById("scenebox").src = "./images/caseycall2.jpeg";
		document.getElementById("scenebox2").src = "./images/caseycall.jpeg";
		document.getElementById("scenebox3").src = "./images/scream.jpg";
		document.getElementById("desc").innerHTML = "The phone rings and  " + lowestPlayerCastMember.name + " answers the phone. " + lowestPlayerCastMember.name + " is shocked and scared when Ghostface threatens to gut her";
		assignObjects();
		eliminateOne();
		document.getElementById("statustext").innerHTML = "Status: Dead";
		increaseSuspicion();	
		episodecount++; // Increment episode count
		console.log("Episode after Opening Scene Count " + episodecount);	
		console.log("Casey Becker Home Scene");		
	} 
	
	else if (scenenum === 4 && lowestPlayerCastMember.name !== "Tatum Riley" && "Sidney Prescott" && "Stu Macher" && "Billy Loomis" && "Randy Meeks" && HSB === false) {
		let HSB = true;
		document.getElementById("maintext").innerHTML = "High School Benches";
		document.getElementById("scenebox").src = "./images/group.jpeg";
		document.getElementById("desc").innerHTML = "The group discuss the recent murders and who could be behind them";
		assignObjects();
		increaseSuspicion();	
		episodecount++; // Increment episode count
		console.log("Episode after Opening Scene Count " + episodecount);		
	} 
	
	else if (episodecount === 3 && castMembers.id === 1 & 6) {
		document.getElementById("maintext").innerHTML = "filler";
		document.getElementById("scenebox").src = "./images/sidneytatum.jpg";
		document.getElementById("scenebox2").src = "./images/sidneytatum2.jpg";
		document.getElementById("desc").innerHTML = "The phone rings and  " + lowestPlayerCastMember.name + " answers the phone. " + lowestPlayerCastMember.name + " is shocked whilst Tatum is listening";
		assignObjects();
		increaseSuspicion();	
		episodecount++; // Increment episode count
		console.log("Episode after Opening Scene Count " + episodecount);		
	} 
	
	else {
		document.getElementById("maintext").innerHTML = scenename;
		document.getElementById("scenebox").src = "./images/"+ scene;
		document.getElementById("desc").innerHTML = "The Phone Rings at " + lowestPlayerCastMember.name;
		castMembers = castMembers.filter(x => x!== lowestPlayerCastMember);
		console.log("lowestPlayerCastMember");
		console.log(castMembers);
		assignObjects();
		eliminateOne();
		increaseSuspicion();	
		episodecount++; // Increment episode count	
		console.log("Episode after Opening Scene Count " + episodecount);
	}
}

// Function to detect if the game is in play
function detectGamePlay() {

	// Check if game has started
	if (gameStarted===false) {
		
		if (episodecount === 0) {
			openingScene();
			
		}
		
		else {
			playEpisode();
		}
		
	} else {
			playEpisode();

	}
}

// Function to end game
function endGame() {
		gameStarted = false; // Set game status to false
		episodecount = 0;
		let killerimg = killer.image;
		document.getElementById("objecttext").innerHTML = killer.name;
		document.getElementById("objectbox").src = "./images/" + killerimg;
		console.log("End Game:" + killer.name);	
		setTimeout(function(){
		location.reload();
		}, delayInMilliseconds);
}


playAs1996Cast.addEventListener('click', () => {
	document.getElementById("buttonp").innerHTML = "Continue";
	detectGamePlay();
});
	
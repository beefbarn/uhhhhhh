
//if i make a save system, just have it load by assigning a progressor value to resume story.

/*

///GLOBAL VARS
/progressor
/scenicText
/gameText
/scenicInitShutdown
/gameInitShutdown
/scenicMsg
/gameMsg

*/

//initializes the progressor, which controls the story/gameplay by counting each time the Next button is clicked. also text to be written
let progressor = 0;
let tempProgressor = 0
let gameMsg = "";
let scenicMsg = "";
let skipped = false;

//text typewriter effect function. call with the html element, text to append
const textTypeEffect = (element, text, i = 0) => {
    element.textContent += text[i];

    if (i === text.length-1) {
        return;
    }

    setTimeout(() => textTypeEffect(element, text, i + 1), 50);
}

//faster text typwriter effect
const fastTypeEffect = (element, text, i = 0) => {
    
    if (skipped === true) {
        return;
    }
    if (tempProgressor !== progressor) {
        return;
    }

    element.textContent += text[i];

    if (i === text.length-1) {
        return;
    }
    setTimeout(() => fastTypeEffect(element, text, i + 1), 40);
}

//automatically determines the time it takes to write a statement with the fastTypeEffect()
const typeTimer = (message) => {
    const theTime = 40 * message.length;
    return theTime;
}

const scenicText = document.querySelector("#scenic-text");
const gameText = document.querySelector("#game-text");
let scenicInitShutdown = 1;
let gameInitShutdown = 1;

//initializes the scenic text div and span
const scenicInitiation = () => {
    if (scenicInitShutdown === 1) {
        const scenicWriter = document.querySelector("#scenic-writer");
        fastTypeEffect(scenicWriter, `With the door to your cell open, you see a path to freedom...`);
        scenicInitShutdown = 0
    } else {
        return;
    }
}

//initializes the game text div and span
const gameTextInitiation = () => {
    if (gameInitShutdown === 1) {
        const gameWriter = document.querySelector("#game-writer");
        setTimeout(() => {fastTypeEffect(gameWriter, `You wonder what horrors may lurk these prison halls, but you must take your chance...`)}, 3400)
        gameInitShutdown = 0
    } else {
        return;
    }
}

//spawns a new button that says "[display]" after a [timer]
const spawnNewButton = (timer, display) => {
    const buttonCreation = document.createElement("input");
    buttonCreation.type = "button";
    buttonCreation.value = display;
    buttonCreation.id = "progressor";
    buttonCreation.addEventListener('click', nextClick);
    setTimeout(() => {document.getElementById("new-button").appendChild(buttonCreation);}, timer)
}

//make a function for the "next" button to clear both spans and then count up a progressor of some kind to proceed with the dialogue. then removes the "next" button.
const nextClick = () => {
    const scenicWriter = document.getElementById("scenic-writer");
    const gameWriter = document.getElementById("game-writer");
    if (skipped === true) {
        scenicWriter.classList.remove("hidden-element");
        gameWriter.classList.remove("hidden-element");
        const theButton = document.getElementById("new-button");
        theButton.classList.remove("hidden-element");
        const skipScenic = document.getElementById("skip-scenic");
        const skipGame = document.getElementById("skip-game");
        const skippedButton = document.getElementById("skipped-new-button");
        skipScenic.textContent = "";
        skipGame.textContent = "";
        skippedButton.innerHTML = "";
        skipScenic.classList.add("hidden-element");
        skipGame.classList.add("hidden-element");
        skippedButton.classList.add("hidden-element");
        skipped = false;
    }
    gameWriter.textContent = "";
    scenicWriter.textContent = "";
    progressor += 1;
    const buttonCreation = document.getElementById("progressor");
    buttonCreation.remove();
    sceneSelector(progressor);
}

//Selects a scene to play based on the current progressor value.
const sceneSelector = (progressorVal) => {
    if (progressorVal === 1) {
        sceneOne();
    } else if (progressorVal === 2) {
        sceneTwo();
    } else if (progressorVal === 3) {
        sceneThree();
    }
}

//SCENE ONE:
const sceneOne = () => {
    tempProgressor = 1;
    const scenicWriter = document.getElementById("scenic-writer");
    const gameWriter = document.getElementById("game-writer");
    scenicMsg = `You take a few steps forwards before a strange voice cuts through the silence...`;
    gameMsg = `"Come over here or the guards will see you." says the voice from another empty cell...`;
    fastTypeEffect(scenicWriter, scenicMsg);
    setTimeout(() => {fastTypeEffect(gameWriter, gameMsg)}, 3750);
    spawnNewButton(8100, "Go to the Voice");
}

//SCENE TWO:
const sceneTwo = () => {
    tempProgressor = 2
    const scenicWriter = document.getElementById("scenic-writer");
    const gameWriter = document.getElementById("game-writer");
    const narrImg = document.getElementById("narr-img");
    narrImg.src = "images/narrator-1.jpg";
    scenicMsg = `"Hey buddy..."`;
    gameMsg = `"The guards are gonna be on patrol for another few hours. Let's just pass the time here until they leave..."`;
    fastTypeEffect(scenicWriter, scenicMsg);
    setTimeout(() => {fastTypeEffect(gameWriter, gameMsg)}, 2000);
    spawnNewButton(7400, "Uh, Sure")
}

//SCENE THREE:
const sceneThree = () => {
    tempProgressor = 3;
    const scenicWriter = document.getElementById("scenic-writer");
    const gameWriter = document.getElementById("game-writer");
    scenicMsg = `"Oh, really? I didn't think you'd actually want to hang out with me..."`;
    gameMsg = `"Well I honestly don't have much to do...how about some blackjack?"`
    fastTypeEffect(scenicWriter, scenicMsg);
    setTimeout(() => {fastTypeEffect(gameWriter, gameMsg)}, typeTimer(gameMsg) + 1000);
    spawnLoudButton(7300, "Okay, Deal 'Em");
}

//spawns a special button that says "[display]" after a [timer] and has additional events.
const spawnLoudButton = (timer, display) => {
    const buttonCreation = document.createElement("input");
    buttonCreation.type = "button";
    buttonCreation.value = display;
    buttonCreation.id = "progressor";
    buttonCreation.addEventListener('click', nextClick);
    buttonCreation.addEventListener('click', blackout);
    setTimeout(() => {document.getElementById("new-button").appendChild(buttonCreation);}, timer);
}

//blacks out the screen and makes text white.
const blackout = () => {
    const theDiv = document.getElementById("biggest-div")
    theDiv.classList.add("showtime");
}

//skip button. hides the game text and scenic text and displays skip game and skip scenic. (remove and add hidden class)
const displaySkipped = () => {
    skipped = true;
    const scenicWriter = document.getElementById("scenic-writer");
    const gameWriter = document.getElementById("game-writer");
    const skipScenic = document.getElementById("skip-scenic");
    const skipGame = document.getElementById("skip-game");
    const theButton = document.getElementById("new-button");
    const skippedButton = document.getElementById("skipped-new-button");
    theButton.classList.add("hidden-element");
    scenicWriter.classList.add("hidden-element");
    gameWriter.classList.add("hidden-element");
    skipScenic.classList.remove("hidden-element");
    skipGame.classList.remove("hidden-element");
    skippedButton.classList.remove("hidden-element");
    skipScenic.textContent = scenicMsg;
    skipGame.textContent = gameMsg;
    const buttonCreation = document.createElement("input");
    buttonCreation.type = "button";
    buttonCreation.value = "Next";
    buttonCreation.id = "progressor";
    buttonCreation.addEventListener('click', nextClick);
    document.getElementById("skipped-new-button").appendChild(buttonCreation)
    
   
    
}
 //make a timer that doesnt reset until the text is fully displayed (maybe in typwriter reutnr statement) so that the delayed typewriter wont run on skip.
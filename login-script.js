
//text typewriter effect function. call with the html element, text to append
const textTypeEffect = (element, text, i = 0) => {
    element.textContent += text[i];

    if (i === text.length-1) {
        return;
    }

    setTimeout(() => textTypeEffect(element, text, i + 1), 50);
}



const getLogins = () => {
    const username = document.querySelector("#userid").value;
    const password = document.querySelector("#passid").value;
    const header = document.querySelector("#top-header");
    const playHeader = document.querySelector("#playbuttonheader");
    const playButton = document.querySelector("#playbutton");

    const populateButton = () =>{
        playButton.innerHTML = `<a href="gamepage.html"><button>Your Doom</button></a>`
    }

    if (username === 'beef' && password === 'gamer') {
        header.textContent = '';
        textTypeEffect(header, 'Welcome Home.');
        //waits 1.5 seconds before printing below
        setTimeout(() => {
            textTypeEffect(playHeader, 'Venture forth, prisoner...')
        }, 1500)
        setTimeout(() => {
            populateButton();
        }, 4100)
    } else {
        header.textContent = '';
        textTypeEffect(header, 'Nope, try again.')
    }


}
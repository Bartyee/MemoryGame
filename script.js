let gameArea = document.querySelectorAll(".cardImage");
let cardColors = document.querySelectorAll(".cardColor");
let howManyPairs = document.getElementById("howManyPairs");
let clock = document.getElementById("clock");

gameArea = [...gameArea];
cardColors = [...cardColors];

const startTime = new Date().getTime()
let activeCard;
let activeCards = [];
let allPairs = 9;

const images = ['img/1.jpg','img/1.jpg','img/2.jpg','img/2.jpg','img/3.jpg','img/3.jpg','img/4.jpg','img/4.jpg','img/5.jpg','img/5.jpg','img/6.jpg','img/6.jpg','img/7.jpg','img/7.jpg','img/8.jpg','img/8.jpg','img/9.jpg','img/9.jpg',]

const initialize = () => {
    howManyPairs.textContent = `Pozostało ${allPairs} par`;
    for (let i=0; i<gameArea.length;i++) {
        let randomNumber = Math.floor((Math.random() * images.length));
        gameArea[i].style.backgroundImage = `url('${images[randomNumber]}')`
        images.splice(randomNumber,1);
    }
    setTimeout(function(){
        cardColors.forEach(function(element) {
            element.classList.add("notDone");
            element.addEventListener("click", gameEngine);
        })
    },1500);
}

const gameEngine = () => {
    activeCard = event.target;
    activeCard = cardColors.indexOf(activeCard);
    if (activeCards[0] === activeCard || cardColors[activeCard].classList.contains("done"))
        return;
    if (activeCards[0] === undefined) {
        activeCards[0] = activeCard;
        cardColors[activeCard].classList.remove("notDone");
    }
    else {
        cardColors.forEach(function(element) {
            element.removeEventListener("click", gameEngine);
        })
        activeCards[1] = activeCard;
        cardColors[activeCard].classList.remove("notDone");
        setTimeout(function() {
            if (gameArea[activeCards[0]].style.backgroundImage === gameArea[activeCards[1]].style.backgroundImage) {
            allPairs--;
            cardColors[activeCards[0]].classList.add("done");
            cardColors[activeCards[1]].classList.add("done");
            if (allPairs === 0) {
                const endTime = new Date().getTime();
                const gameTime = (endTime - startTime) / 1000
                alert(`Udało się! Twój wynik to: ${gameTime} sekund`)
                location.reload();
            }
            }
            else {
                cardColors[activeCards[0]].classList.add("notDone");
                cardColors[activeCards[1]].classList.add("notDone");
            }
            activeCards.length = 0;
            cardColors.forEach(function(element) {
                element.addEventListener("click", gameEngine);
            });
        },1000);
    }
}

initialize();
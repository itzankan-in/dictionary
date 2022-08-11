let body = document.body;
let alert = document.querySelector(".alert-container");
//remover
const btnCont = document.querySelector(".btn-Cont");
btnCont.addEventListener("click", () => {
    sessionStorage.setItem("isConf", true);
    remove();
})
const isConf = sessionStorage.getItem("isConf")
if (isConf == null) { }
else {
    remove();
}

function remove() {
    let iftH = document.querySelector(".pre-ift");
    body.removeChild(iftH);
    let blur = document.querySelector(".blur-container");
    body.removeChild(blur);
}
//Word searcher and storer . LMAO ik my grammar is shit
let lastWord = localStorage.getItem("lastWord");
if (lastWord != null) {
    searchWord(lastWord)
} else {
    searchWord("hello")
}
function searchWord(word) {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => response.json())
        .then((wordData) => {
            let dict = document.querySelector(".dictionary");
            let mainWord = document.querySelector(".mainWord")
            mainWord.textContent = wordData[0].word.toUpperCase();
            let soundLink;

            let audArr = wordData[0].phonetics;
            for (let i = 0; i < audArr.length; i++) {
                if (audArr[i].audio == "") { }
                else {
                    soundLink = audArr[i].audio;
                }
            }
            let phon = document.querySelector(".phonetics")
            // phon.textContent = wordData[0].phonetics[1];
            let phonO =  wordData[0].phonetics;
            for (let i = 0; i <phonO.length; i++) {
                if (phonO[i].text != undefined) {
                    phon.textContent = phonO[i].text
                    
                 }

            }
            // console.log(wordData[0].phonetics)
            let mainAudio = document.querySelector(".mainAudio");

            mainAudio.setAttribute("src", soundLink);
            document.querySelector(".definitions").innerHTML = "";
            update();
            function update() { 
            let masterOL = document.createElement("ol")
            let defiO = document.querySelector(".definitions")
            defiO.appendChild(masterOL)
            masterOL.setAttribute("class", "master-OL")
            let defi = document.querySelector(".master-OL")
            let defiLi = wordData[0].meanings;
            for (let i = 0; i < defiLi.length; i++) {
                let masterLI = document.createElement("li")
                masterLI.setAttribute("class", "master-LI")
                masterLI.textContent = `Meaning as ${defiLi[i].partOfSpeech}:-`;
                defi.appendChild(masterLI)
                let childUL = document.createElement("ul")
                let a = defiLi[i].definitions;
                masterLI.appendChild(childUL)
                for (let j = 0; j < a.length; j++) {
                    let childLi = document.createElement("li")
                    childUL.appendChild(childLi)
                    childLi.setAttribute("class", "child-LI")
                    childLi.textContent = defiLi[i].definitions[j].definition;
                }
            }
        }
        })
        .catch(() => {
            alert.style.display = "flex";

        })

}
function quit() {
    alert.style.display = "none";
    searchWord("hello");
}



const search = document.getElementById("search");
const searcher = document.querySelector(".btn-Search");
search.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        searche();
    }
})
searcher.addEventListener("click", () => {
    searche();
})

function searche() {
    let wordVal = search.value;
    searchWord(wordVal)
    localStorage.setItem("lastWord", wordVal);
    search.value = "";
}
function playAUD() {
    let mainAud = document.querySelector(".mainAudio");
    mainAud.play();
}

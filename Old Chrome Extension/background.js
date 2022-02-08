var satisfy;
var satisfyRate;
var timeToWait;
var timeToWait429;
var totalCrowns;
var currentQuiz;
var openThisQuiz;
var time;
var interval;
var quizList = ["Adventuring", "Conjuring", "Magical", "Marleybone", "Mystical", "Spellbinding", "Spells", "Valencia", "Wizard City", "Zafaria"];

//When the extension is installed, check if user already has saved data, create a new user
chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason == "install") {
        createUser().then(function () {
            //TODO: When user installs extension and user is created, open crowns.krolpowered to an introduction/how to use page
            //window.open("chrome-extension://aihenldiapgpgknjngnabfnjdjjffljp/options/options.html");
        });
    }
    else if (details.reason == "update") {
        onUpdate();
    }
});

function onUpdate() {
        chrome.storage.sync.set({
            automaticSelection: true
        });
}

//Create a user when they first install the extension, use default values
function createUser() {
    return new Promise(function (resolve, reject) {
        chrome.storage.sync.set({
            playSound: true,
            soundFile: "sonar.wav",
            automaticSelection: true,
            color: "#00b300",
            timeToWaitQuestion: 1,
            satisfy: false,
            satisfyRate: 3,
            timeToWait: 30,
            timeToWait429: 10,
            totalCrowns: 0
        });
        resolve();
    });
}

//If the options are changed, load them here
chrome.storage.onChanged.addListener(function (changes) {
    for (var key in changes) {
        var storageChange = changes[key];
        switch (key) {
            case "satisfy":
                satisfy = storageChange.newValue;
                break;
            case "satisfyRate":
                satisfyRate = storageChange.newValue;
                break;
            case "timeToWait":
                timeToWait = storageChange.newValue;
                break;
            case "timeToWait429":
                timeToWait429 = storageChange.newValue;
                break;
            case "totalCrowns":
                totalCrowns = storageChange.newValue;
        }
    }
});

//Browser icon clicked, open freekigames
chrome.browserAction.onClicked.addListener(function () {
    window.open("https://www.wizard101.com/quiz/trivia/game/wizard101-trivia", "Quiz");
});

function getOptions() {
    chrome.storage.sync.get(['satisfy', 'satisfyRate', 'timeToWait', 'timeToWait429', 'totalCrowns'], function (items) {
        satisfy = items.satisfy;
        satisfyRate = items.satisfyRate;
        timeToWait = items.timeToWait;
        timeToWait429 = items.timeToWait429;
        totalCrowns = items.totalCrowns;
    });
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    switch (message.greeting) {
        case 'startQuiz':
            openThisQuiz = quizList[0];
            openQuiz();
            break;
        case 'setCurrentQuiz':
            currentQuiz = message.currentQuiz;
            break;
        case 'getCurrentQuiz':
            sendResponse({ quizName: currentQuiz });
            break;
        case 'nextQuiz':
            getOptions();
            quizIndex = quizList.indexOf(currentQuiz) + 1;
            openThisQuiz = quizList[quizIndex];
            if (!satisfy || message.when || quizIndex % satisfyRate != 0) {
                openQuiz();
            }
            else {
                window.open("https://www.crowns.krolpowered.com/too-many-requests-satisfaction/#anchor");
                countDown(timeToWait);
            }
            break;
        case "error429":
            window.open("https://www.crowns.krolpowered.com/too-many-requests/#anchor");
            openThisQuiz = currentQuiz;
            countDown(timeToWait429);
            break;
        case "cancelTimer":
            stopCounter();
            break;
    }
});

function countDown(timeWaiting) {
    console.log("Counting Down" + timeWaiting);
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { greeting: "refresh" });
    });
    time = timeWaiting;
    interval = setInterval(() => {
        time -= 1;
        if (time == 0) {
            clearInterval(interval);
            openQuiz();
        }
    }, 1000);
}

function stopCounter() {
    console.log("Stopping counter");
    clearInterval(interval);
    time = 0;
    openQuiz();
}

function openQuiz() {
    console.log("Starting next quiz");
    switch (openThisQuiz) {
        case 'Adventuring':
            window.open("https://www.wizard101.com/quiz/trivia/game/wizard101-adventuring-trivia", "Quiz");
            break;
        case 'Conjuring':
            window.open("https://www.wizard101.com/quiz/trivia/game/wizard101-conjuring-trivia", "Quiz");
            break;
        case 'Magical':
            window.open("https://www.wizard101.com/quiz/trivia/game/wizard101-magical-trivia", "Quiz");
            break;
        case 'Marleybone':
            window.open("https://www.wizard101.com/quiz/trivia/game/wizard101-marleybone-trivia", "Quiz");
            break;
        case 'Mystical':
            window.open("https://www.wizard101.com/quiz/trivia/game/wizard101-mystical-trivia", "Quiz");
            break;
        case 'Spellbinding':
            window.open("https://www.wizard101.com/quiz/trivia/game/wizard101-spellbinding-trivia", "Quiz");
            break;
        case 'Spells':
            window.open("https://www.wizard101.com/quiz/trivia/game/wizard101-spells-trivia", "Quiz");
            break;
        case 'Valencia':
            window.open("https://www.wizard101.com/quiz/trivia/game/pirate101-valencia-trivia", "Quiz");
            break;
        case 'Wizard City':
            window.open("https://www.wizard101.com/quiz/trivia/game/wizard101-wizard-city-trivia", "Quiz");
            break;
        case 'Zafaria':
            window.open("https://www.wizard101.com/quiz/trivia/game/wizard101-zafaria-trivia", "Quiz");
            break;
        default:
            window.open("https://www.wizard101.com/quiz/trivia/game/wizard101-adventuring-trivia", "Quiz");
            break;
    }
}

window.onload = (function () {
    getOptions();
})
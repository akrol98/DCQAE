//Extension updated
chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason == "update") {
        window.open("https://www.crowns.krolpowered.com/forums/topic/tos-violation/?view=all");
    }
});

//Browser icon clicked, open freekigames
chrome.browserAction.onClicked.addListener(function () {
    window.open("https://www.app.crowns.krolpowered.com");
    window.open("https://www.wizard101.com/quiz/trivia/game/kingsisle-trivia");
});
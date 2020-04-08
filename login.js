if (document.getElementById('loginContainer').textContent.slice(-1) == 't') {
    chrome.runtime.sendMessage({ greeting: 'startQuiz' });
}
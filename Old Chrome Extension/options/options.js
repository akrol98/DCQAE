var playSound;
var soundFile;
var automaticSelection;
var color;
var timeToWaitQuestion;
var satisfy;
var satisfyRate;
var timeToWait;
var timeToWait429;

var saveInfo;
var totalCrowns;

function restoreOptions() {
  console.log("Restoring options");
  chrome.storage.sync.get(['playSound', 'soundFile', 'automaticSelection', 'color', 'timeToWaitQuestion', 'satisfy', 'satisfyRate', 'timeToWait', 'timeToWait429', 'totalCrowns'], function (items) {
    document.getElementById('totalCrowns').innerText = items.totalCrowns;

    document.getElementById('sound').checked = items.playSound;
    document.getElementById('soundFile').value = items.soundFile;

    document.getElementById('automaticSelection').checked = items.automaticSelection;
    document.getElementById('color').value = items.color;
    document.getElementById('timeToWaitQuestion').value = items.timeToWaitQuestion;

    document.getElementById('satisfy').checked = items.satisfy;
    document.getElementById('satisfyRate').value = items.satisfyRate;
    document.getElementById('timeToWait').value = items.timeToWait;
    document.getElementById('timeToWait429').value = items.timeToWait429;
  });
  setTimeout(function () {
    document.getElementById('loadingIcon').style.display = "none";
    document.getElementById('optionsPage').style.display = "block";
  }, 1000);
}

function closeWindow() {
  window.close();
}

function setDefaultOptions() {
  console.log("Default options");
  document.getElementById('sound').checked = true;
  document.getElementById('soundFile').value = "windows.wav";

  document.getElementById('automaticSelection').checked = true;
  document.getElementById('color').value = "#00b300";
  document.getElementById('timeToWaitQuestion').value = 2;

  document.getElementById('satisfy').checked = true;
  document.getElementById('satisfyRate').value = 3;
  document.getElementById('timeToWait').value = 30;
  document.getElementById('timeToWait429').value = 60;
  updateStatus('Options reset to default.')
}

function saveOptions() {
    saveInfo = true;
    resetErrors();
    getValues();
    errorCheck();
    if (saveInfo)
      saveInformation();
}

function resetErrors() {
  document.getElementById('timeToWaitQuestion').classList.remove("error");
  document.getElementById('satisfyRate').classList.remove("error");
  document.getElementById('timeToWait').classList.remove("error");
  document.getElementById('timeToWait429').classList.remove("error");
}

function getValues() {
  playSound = document.getElementById('sound').checked;
  soundFile = document.getElementById('soundFile').value;

  automaticSelection = document.getElementById('automaticSelection').checked;
  color = document.getElementById('color').value;
  timeToWaitQuestion = parseInt(document.getElementById('timeToWaitQuestion').value);

  satisfy = document.getElementById('satisfy').checked;
  satisfyRate = parseInt(document.getElementById('satisfyRate').value);
  timeToWait = parseInt(document.getElementById('timeToWait').value);
  timeToWait429 = parseInt(document.getElementById('timeToWait429').value);
}

function errorCheck() {
  if (timeToWaitQuestion < 1 || timeToWaitQuestion > 60) {
    saveInfo = false;
    document.getElementById('timeToWaitQuestion').classList.add("error");
  }

  if (satisfyRate < 1 || satisfyRate > 9) {
    saveInfo = false;
    document.getElementById('satisfyRate').classList.add("error");
  }

  if (timeToWait < 1 || timeToWait > 999) {
    saveInfo = false;
    document.getElementById('timeToWait').classList.add("error");
  }

  if (timeToWait429 < 0 || timeToWait429 > 999) {
    saveInfo = false;
    document.getElementById('timeToWait429').classList.add("error");
  }

  document.getElementById('timeToWaitQuestion').value = timeToWaitQuestion;
  document.getElementById('satisfyRate').value = satisfyRate;
  document.getElementById('timeToWait').value = timeToWait;
  document.getElementById('timeToWait429').value = timeToWait429;
}

function saveInformation() {
  chrome.storage.sync.set({
    playSound: playSound,
    soundFile: soundFile,
    automaticSelection: automaticSelection,
    color: color,
    timeToWaitQuestion: timeToWaitQuestion,
    satisfy: satisfy,
    satisfyRate: satisfyRate,
    timeToWait: timeToWait,
    timeToWait429: timeToWait429
  }, function () {
    updateStatus("Options Saved");
  });
}

function updateStatus(message) {
  var status = document.getElementById('status');
  status.textContent = message;
  setTimeout(function () {
    status.textContent = '';
  }, 2000);
}

function playAudio() {
  new Audio(chrome.runtime.getURL("sounds/" + document.getElementById('soundFile').value)).play();
}

window.onload = function () {
  restoreOptions();
  document.getElementById('close').addEventListener('click', closeWindow);
  document.getElementById('default').addEventListener('click', setDefaultOptions);
  document.getElementById('cancel').addEventListener('click', closeWindow);
  document.getElementById('save').addEventListener('click', saveOptions);
  document.getElementById('audioTest').addEventListener('click', playAudio);
}
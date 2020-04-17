var automaticSelection;
var solveCaptcha;
var highlightColor;
var timeToWaitQuestion;
var totalCrowns;
var quizName;
var captchaTask = null;

function getData() {
    return new Promise(function (resolve, reject) {
        chrome.storage.sync.get(['automaticSelection', 'solveCaptcha', 'color', 'timeToWaitQuestion', 'totalCrowns'], function (items) {
            console.log(items);
            automaticSelection = items.automaticSelection;
            solveCaptcha = items.solveCaptcha;
            highlightColor = items.color;
            timeToWaitQuestion = items.timeToWaitQuestion * 1000;
            totalCrowns = items.totalCrowns;
            resolve();
        })
    });
}

getData().then(function () {
    // Clear captcha task if necessary.
    if (captchaTask) {
        clearInterval(captchaTask);
        captchaTask = null;
    }

    //Handle too many requests error
    if (document.body.children[0].innerText == "Too Many Requests") {
        chrome.runtime.sendMessage({ greeting: 'error429' });
        return;
    }

    //If we have no header, we can't parse the page
    var header = document.getElementsByClassName('h1Header')[0];

    if (!header) {
        return;
    }

    //Query the current quiz name
    quizName = header.innerText.split(' ')[1];
    chrome.runtime.sendMessage({ greeting: 'setCurrentQuiz', currentQuiz: quizName });

    //If question page, answer questions.
    //If not question page, Page is either results page or throttle page.
    if (document.getElementsByClassName('quizQuestion')[0]) {
        setTimeout(answerQuestion, timeToWaitQuestion);
        return;
    }

    //Zafaria is the last quiz, we should play our chime
    //if we've solved all the captchas until now
    var lastQuiz = quizName === "Zafaria";

    if (lastQuiz && solveCaptcha) {
        chrome.runtime.sendMessage({ greeting: 'playSound' });
    }

    //If throttle page, go to the next quiz.
    if (document.getElementsByClassName('quizThrottle')[0]) {
        if (!lastQuiz) {
            chrome.runtime.sendMessage({ greeting: 'nextQuiz', when: "now" });
        }

        return;
    }

    //Results page, open and then solve the captcha or load the next quiz.
    var rewardText = document.getElementsByClassName('rewardText');

    if (rewardText.length > 0 && rewardText[0].innerText[0] == 'Y') {
        document.getElementsByClassName("loginitem")[0].click();
        focusInput();

        if (solveCaptcha) {
            scheduleCaptcha();
        } else {
            //We should play a sound to notify the user about the captcha
            chrome.runtime.sendMessage({ greeting: 'playSound' });
        }
    } else {
        addCrowns();

        if (!lastQuiz) {
            chrome.runtime.sendMessage({ greeting: 'nextQuiz' });
        }
    }
});

function addCrowns() {
    console.log(totalCrowns);
    totalCrowns += 10;
    chrome.storage.sync.set({
        totalCrowns: totalCrowns
    });
}

//If it's a question in a quiz
function answerQuestion() {
    //make the answers and submit button visible
    document.getElementById('nextQuestion').style.visibility = "visible";
    for (let index = 0; index < 4; index++) { document.getElementsByClassName('answer')[index].style.visibility = "visible"; }
    //get the quiz question
    var question = document.getElementsByClassName("quizQuestion")[0].textContent;
    //get the quiz answer
    var answer;
    switch (quizName) {
        case 'Adventuring':
            answer = adventuring(question);
            break;
        case 'Conjuring':
            answer = conjuring(question);
            break;
        case 'Magical':
            answer = magical(question);
            break;
        case 'Marleybone':
            answer = marleybone(question);
            break;
        case 'Mystical':
            answer = mystical(question);
            break;
        case 'Spellbinding':
            answer = spellbinding(question);
            break;
        case 'Spells':
            answer = spells(question);
            break;
        case 'Valencia':
            answer = valencia(question);
            break;
        case 'Wizard':
            answer = wizardCity(question);
            break;
        case 'Zafaria':
            answer = zafaria(question);
            break;
        default:
            alert("Quiz name not recognized, please let the developer know you got this message. Thank you.");
            break;
    }
    //get the quiz choices
    var choices = []
    for (i = 0; i < 4; i++) {
        choices.push(document.getElementsByClassName('answerText')[i].innerText);
    }

    //click on the correct answer, then hit the next quiz button
    for (i = 0; i < 4; i++) {
        if (answer == choices[i]) {
            if (!automaticSelection) {
                document.getElementsByClassName('answerText')[i].style.backgroundColor = highlightColor;
            } else {
                document.getElementsByName('checkboxtag')[i].click();
                document.getElementById('nextQuestion').click();
            }
            break;
        }
    }
}

function focusInput() {
    var id = setInterval(check, 500);
    function check() {
        var captcha = document.getElementById('jPopFrame_content').contentDocument.getElementById('captcha');

        if (captcha) {
            console.log("focusing");
            clearInterval(id);
            captcha.focus();
        }
    }
}

function scheduleCaptcha() {
    //Captcha task is already running.
    if (captchaTask) {
        return;
    }

    captchaTask = setInterval(checkCaptcha, timeToWaitQuestion);

    function checkCaptcha() {
        var captcha = document.getElementById('jPopFrame_content').contentDocument.getElementById('captcha');

        if (captcha) {
            try {
                solveCaptchaOnPage();
            } catch (error) {
                console.log(error);
                chrome.runtime.sendMessage({ greeting: 'playSound' });
            }
        }
    }
}

function adventuring(question) {
    var answer;
    switch (question) {
        case "What is Professor Falmea's favorite food?":
            answer = "Pasta Arrabiata";
            break;
        case "What hand does Lady Oriel hold her wand in?":
            answer = "Trick question, she has a sword.";
            break;
        case "What determines the colors of the manders in Krok?":
            answer = "Where they come from and their school of focus.";
            break;
        case "What school is the spell Dark Nova":
            answer = "Shadow";
            break;
        case "How long do you have to wait to join a new match after fleeing in PVP?":
            answer = "5 minutes";
            break;
        case "Who is in the top level of the Tower of the Helephant?":
            answer = "Lyon Lorestriker";
            break;
        case "What type of rank 8 spell is granted to Death students at level 58?":
            answer = "Damage + DoT";
            break;
        case "Which of these are not a lore spell?":
            answer = "Fire Dragon";
            break;
        case "An unmodified Sun Serpent does what?":
            answer = "900 � 1000 Fire Damage + 300 Fire Damage to entire team";
            break;
        case "Which of these is NOT a Zafaria Anchor Stone?":
            answer = "Rasik Anchor Stone";
            break;
        case "Who is the Bear King of Grizzleheim?":
            answer = "Valgard Goldenblade";
            break;
        case "What is the name of the secret society in Krokotopia":
            answer = "Order of the Fang";
            break;
        case "What is unique about Falmea's Classroom?":
            answer = "There are scorch marks on the ceiling";
            break;
        case "In Grizzleheim, the Ravens want to bring about:":
            answer = "The Everwinter, to cover the world in ice:";
            break;
        case "What is the name of the new dance added with Khrysalis?":
            answer = "The bee dance";
            break;
        case "What is the name of the book stolen from the Royal Museum?":
            answer = "The Krokonomicon";
            break;
        case "Which Aztecan ponders the Great Questions of Life?":
            answer = "Philosoraptor";
            break;
        case "What does the Time Ribbon Protect against?":
            answer = "Time Flux";
            break;
        case "What school is the Gurtok Demon focused on?":
            answer = "Balance";
            break;
        case "Shaka Zebu is known best as:":
            answer = "The Greatest Living Zebra Warrior";
            break;
        default:
            alert("Couldn't find the answer. Please contact the developer about this. Thank you.");
            break;
    }
    return answer;
}

function conjuring(question) {
    var answer;
    switch (question) {
        case "Who is Bill Tanner's sister?":
            answer = "Sarah Tanner";
            break;
        case "What is the shape on the weather vanes in the Shopping District?":
            answer = "Half moon/moon";
            break;
        case "What book was Anna Flameright accused of stealing?":
            answer = "Advanced Flameology";
            break;
        case "What level must you be to wear Dragonspyre crafted clothing?":
            answer = "33";
            break;
        case "What did Abigail Dolittle accuse Wadsworth of stealing?":
            answer = "Genuine Imitation Golden Ruby";
            break;
        case "What was the name of the powerful Grendel Shaman who sealed the runic doors?":
            answer = "Thulinn";
            break;
        case "Who Is NOT a member of the Council of Light?":
            answer = "Cyrus Drake";
            break;
        case "Sir Edward Halley is the Spiral's most famous:":
            answer = "Aztecosaurologist";
            break;
        case "Who is the King of the Burrowers?":
            answer = "Pyat MourningSword";
            break;
        case 'Which Queen is mentioned in the Marleybone book "The Golden Age"?':
            answer = "Ellen";
            break;
        case "How many portal summoning candles are in the Burial Mound?":
            answer = "Three";
            break;
        case "Kirby Longspear was once a student of which school of magic?":
            answer = "Death";
            break;
        case "The Swordsman Destreza was killed by:":
            answer = "A Gorgon";
            break;
        default:
            alert("Couldn't find the answer. Please contact the developer about this. Thank you.");
            break;
    }
    return answer;
}

function magical(question) {
    var answer;
    switch (question) {
        case "Zafaria is home to what cultures?":
            answer = "Gorillas, Zebras, Lions";
            break;
        case "Which of these locations is not in Wizard City?":
            answer = "Digmore Station";
            break;
        case "What book does Professor Drake send you to the library to check out?":
            answer = "Book on the Wumpus";
            break;
        case "What is the title of the book that is floating around the Wizard City Library?":
            answer = "Basic Wizarding & Proper Care of Familiars";
            break;
        case "How many worlds of The Spiral are unlocked as of May 21st, 2014?":
            answer = "12";
            break;
        case "Why are the Gobblers so afraid to go home?":
            answer = "Witches";
            break;
        case "Merle Ambrose is originally from which world?":
            answer = "Avalon";
            break;
        case "Who sells Valentine's Day items in Wizard City?":
            answer = "Valentina Heartsong";
            break;
        case "Who is the Registrar of Pigswick Academy?":
            answer = "Mrs. Dowager";
            break;
        case "Who guards the entrance to Unicorn Way?":
            answer = "Private Stillson";
            break;
        case "What's the name of the balance tree?":
            answer = "Niles";
            break;
        case "What can be used to diminish the Nirini's powers in Krokotopia?":
            answer = "Flame Gems";
            break;
        case "Why are the pixies and faeries on Unicorn Way evil?":
            answer = "Rattlebones corrupted them.";
            break;
        case "Which below are NOT a type of Oni in MooShu?":
            answer = "Ruby";
            break;
        case 'Who prophesizes this? "The mirror will break, The horn will call, From the shadows I strike , And the skies will fall..."':
            answer = "Morganthe";
            break;
        case "Who is the Nameless Knight?":
            answer = "Sir Malory";
            break;
        case "What color is the door inside the boys dormroom?":
            answer = "Red";
            break;
        case "What is the shape of the pink piece in potion motion?":
            answer = "Heart";
            break;
        case "Which one of these are not a symbol on the battle sigil?":
            answer = "Wand";
            break;
        case "What did Prospector Zeke lose track of in MooShu?":
            answer = "Blue Oysters";
            break;
        case "Which is the only school left standing in Dragonspyre?":
            answer = "Fire";
            break;
        default:
            alert("Couldn't find the answer. Please contact the developer about this. Thank you.");
            break;
    }
    return answer;
}

function marleybone(question) {
    var answer;
    switch (question) {
        case "Arthur Wethersfield is A:..":
            answer = "Dog";
            break;
        case "What course did Herold Digmoore study?":
            answer = "Ancient Myths for Parliament";
            break;
        case "What is flying around in Regent's Square?":
            answer = "Newspapers";
            break;
        case "What time of day is it always in Marleybone?":
            answer = "Night";
            break;
        case "What two names are on the Statues in the Marleybone cathedral?":
            answer = "Saint Bernard and Saint Hubert";
            break;
        case "What event is Abigail Doolittle sending out invitations for?":
            answer = "Policeman's Ball";
            break;
        case "What sort of beverage is served in Air Dales Hideaway?":
            answer = "Root Beer";
            break;
        case "What is a very common last name of the cats in Marleybone?":
            answer = "O'Leary";
            break;
        case "Who is not an officer you'll find around Marleybone?":
            answer = "Officer Digmore";
            break;
        case "What style of artifacts are in the Royal Museum?":
            answer = "Krokotopian";
            break;
        case "What initials were on the doctor's glove?":
            answer = "XX";
            break;
        case "Who is the dangerous criminal that is locked up, but escapes from Newgate Prison?":
            answer = "Meowiarty";
            break;
        case "What color are the Marleybone mailboxes?":
            answer = "Red";
            break;
        case "Which of these folks can you find in the Royal Museum?":
            answer = "Clancy Pembroke";
            break;
        case "Which is not a street in Regent's Square?":
            answer = "Fleabitten Ave";
            break;
        case "What is Sgt. Major Talbot's full name?":
            answer = "Sylvester Quimby Talbot III";
            break;
        case "What time does the clock always read in Marleybone?":
            answer = "1:55";
            break;
        case "Which symbol is not on the stained glass window in Regent's Square?":
            answer = "A Tennis Ball";
            break;
        case "What transports you from place to place in Marleybone?":
            answer = "Hot Air Balloons";
            break;
        case "What did Prospector Zeke lose in Marleybone?":
            answer = "The Stray Cats";
            break;
        default:
            alert("Couldn't find the answer. Please contact the developer about this. Thank you.");
            break;
    }
    return answer;
}

function mystical(question) {
    var answer;
    switch (question) {
        case "Who is the Emperor of Mooshu's Royal Guard?":
            answer = "Noboru Akitame";
            break;
        case "In what world would you find the Spider Temple":
            answer = "Zafaria";
            break;
        case "Where is the only pure fire in the Spiral found?":
            answer = "Wizard City";
            break;
        case "King Neza is Zenzen Seven Star's:?":
            answer = "Grandfather";
            break;
        case "What was Ponce de Gibbon looking for in Azteca?":
            answer = "The Water of Life";
            break;
        case "In Reagent's Square, the Professor is standing in front of a:":
            answer = "Telegraph Box";
            break;
        case "Hrundle Fjord is part of what section of Grizzleheim?":
            answer = "Wintertusk";
            break;
        case "King Axaya Knifemoon needs what to unify the people around him?":
            answer = "The Badge of Leadership";
            break;
        case "Which villain terrorizes the fair maidens of Marleybone?":
            answer = "Jaques the Scatcher";
            break;
        case "Who gives you permission to ride the boat to the Krokosphinx?":
            answer = "Sergent Major Talbot";
            break;
        case "Who is the only person who knows how to enter the Tomb of Storms?":
            answer = "Hetch Al'Dim";
            break;
        case "Who was ordered to guard the Sword of Kings?":
            answer = "The Knights of the Silver Rose";
            break;
        case "Who did Falynn Greensleeves fall in love with?":
            answer = "Sir Malick de Logres";
            break;
        case "Who was the greatest Aquilan Gladiator of all time?":
            answer = "Dimachaerus";
            break;
        case "Who haunts the Night Warrens?":
            answer = "Nosferabbit";
            break;
        case "Who tells you how to get to Aquila?":
            answer = "Harold Argleston";
            break;
        case "Who takes you across the River of Souls?":
            answer = "Charon";
            break;
        case "Thaddeus Price is the Pigswick Academy Professor of what school?":
            answer = "Tempest";
            break;
        case "Who asks you to find Khrysanthemums?":
            answer = "Eloise Merryweather";
            break;
        case "What is used to travel to the Isle of Arachnis?":
            answer = "Ice Archway";
            break;
        default:
            alert("Couldn't find the answer. Please contact the developer about this. Thank you.");
            break;
    }
    return answer;
}

function spellbinding(question) {
    var answer;
    switch (question) {
        case "Who makes the harpsicord for Shelus?":
            answer = "Gretta Darkkettle";
            break;
        case "Morganthe got the Horned Crown from the Spriggan:":
            answer = "Gisela";
            break;
        case "Sumner Fieldgold twice asks you to recover what for him?":
            answer = "Shrubberies";
            break;
        case "Who needs the healing potion from Master Yip?":
            answer = "Binh Hoa";
            break;
        case "Who is Haraku Yip's apprentice?":
            answer = "Binh Hoa";
            break;
        case 'Who taunts you with: "Prepare to be broken, kid!"':
            answer = "Clanker";
            break;
        case "What badge do you earn by defeating 100 Samoorai?":
            answer = "Yojimbo";
            break;
        case "Who thinks you are there to take their precious feathers?":
            answer = "Takeda Kanryu";
            break;
        case "The Swallows of Caliburn migrate to Avalon from where each year?":
            answer = "Zafaria and Marleybone";
            break;
        case 'Who tells you: "A shield is just as much a weapon as the sword."':
            answer = "Mavra Flamewing";
            break;
        case 'Who tells you to speak these words only unto your mentor: "Meena Korio Jajuka!"':
            answer = "Priya the Dryad";
            break;
        case "Who tries to raise a Gorgon Army?":
            answer = "Phorcys";
            break;
        case 'Who taunts you with: "Wizard, you will know the meaning of the word pain after we battle!"':
            answer = "Aiuchi";
            break;
        case "What special plant was Barley developing in his Garden?":
            answer = "Cultivated Woodsmen";
            break;
        case "Who helps Morganthe find the Horn of Huracan?":
            answer = "Belloq";
            break;
        case "Who taunts: Why I oughta knock you to the moon, you pesky little creep!":
            answer = "Mugsy";
            break;
        case "What does Silenus name you once you've defeated Hades?":
            answer = "Glorious Golden Archon";
            break;
        case "In Azteca, Morganthe enlisted the help of the:":
            answer = "The Black Sun Necromancers";
            break;
        case "Where has Pharenor been imprisoned?":
            answer = "Skythorn Tower";
            break;
        case "Who grants the first Shadow Magic spell?":
            answer = "Sophia DarkSide";
            break;
        default:
            alert("Couldn't find the answer. Please contact the developer about this. Thank you.");
            break;
    }
    return answer;
}

function spells(question) {
    var answer;
    switch (question) {
        case "Mortis can teach you this.":
            answer = "Tranquilize";
            break;
        case "What term best fits Sun Magic Spells?":
            answer = "Enchantment";
            break;
        case "What type of spells are Ice, Fire, and Storm?":
            answer = "Elemental";
            break;
        case "Who can teach you the Life Shield Spell?":
            answer = "Sabrina Greenstar";
            break;
        case "Mildred Farseer teaches you what kind of spell?":
            answer = "Dispels";
            break;
        case "What term best fits Star Magic Spells?":
            answer = "Auras";
            break;
        case "Who teaches you balance magic?":
            answer = "Alhazred";
            break;
        case "What isn't a shadow magic spell?":
            answer = "Ebon Ribbons";
            break;
        case "Which spell can't be cast while polymorphed as a Gobbler?":
            answer = "Pie in the sky";
            break;
        case "If you can cast Storm Trap, Wild Bolt, Catalan, and the Tempest spell, what are you polymorphed as?":
            answer = "Ptera";
            break;
        case "How many pips does it cost to cast Stormzilla?":
            answer = "5";
            break;
        case "Which spell would not be very effective when going for the elixir vitae Badge?":
            answer = "Entangle";
            break;
        case "Cassie the Ponycorn teaches this kind of spell:":
            answer = "Prism";
            break;
        case "What level of spell does Enya Firemoon Teach?":
            answer = "80";
            break;
        case "If you're a storm wizard with 4 power pips and 3 regular pips, how powerful would your supercharge charm be?":
            answer = "110%";
            break;
        case "How many pips does it cost to cast Dr. Von's Monster?":
            answer = "9";
            break;
        case "What does Forsaken Banshee do?":
            answer = "375 damage plus a hex trap";
            break;
        case "Which Fire spell both damages and heals over time?":
            answer = "Power Link";
            break;
        case "Ether Shield protects against what?":
            answer = "Life and Death attacks";
            break;
        case "Tish'Mah specializes in spells that mostly affect these:":
            answer = "Minions";
            break;
        default:
            alert("Couldn't find the answer. Please contact the developer about this. Thank you.");
            break;
    }
    return answer;
}

function valencia(question) {
    var answer;
    switch (question) {
        case "Historian Gonzago is on a stage, who isn't in the audience?":
            answer = "Giafra";
            break;
        case 'Historian Gonzago sends you on a "Paper Chase," who do you talk to during that quest?':
            answer = "Magdalena";
            break;
        case "How many Mechanical Birds do you collect in Sivella?":
            answer = "5";
            break;
        case "The Mooshu Tower in Sivella is a replica of what?":
            answer = "Tower of Serenity";
            break;
        case "What are Albus and Carbo?":
            answer = "Armada Commanders";
            break;
        case "What color of Windstone do you find in Marco Pollo's Tomb?":
            answer = "Blue";
            break;
        case "What kind of disguise do you wear in Sivella?":
            answer = "Clockwork";
            break;
        case "What shows Steed you're part of the Resistence?":
            answer = "Amulet";
            break;
        case "What type of boat do you use to get from the docks to Sivella?":
            answer = "Gondola";
            break;
        case "What type of item does Prospector Zeke want you to find in Valencia?":
            answer = "Birds";
            break;
        case "What's the name of a librarian in Sivella?":
            answer = "Grassi";
            break;
        case "Where do you find the Tomb of Marco Pollo?":
            answer = "Granchia";
            break;
        case "Which one isn't a Scholar by name?":
            answer = "Caresini";
            break;
        case "Which world doesn't have a pillar in Sivella?":
            answer = "Monquista";
            break;
        case "Who do you find in the Lecture Hall of Sivella?":
            answer = "Ridolfo";
            break;
        case "Who does Steed send you to speak to in Sivella?":
            answer = "Thaddeus";
            break;
        case "Who reads the inscription on Marleybone's Tower?":
            answer = "Ratbeard";
            break;
        case "Why does Steed want you to attack Armada Ships?":
            answer = "Make a Disguise";
            break;
        case "You need a good eye to save these in Granchia...":
            answer = "Art Objects";
            break;
        case "You won't find this kind of Armada Troop in Sivella!":
            answer = "Battle Angel";
            break;
        default:
            alert("Couldn't find the answer. Please contact the developer about this. Thank you.");
            break;
    }
    return answer;
}

function wizardCity(question) {
    var answer;
    switch (question) {
        case "Who is the Fire School professor?":
            answer = "Dalia Falmea";
            break;
        case "What school does Malorn Ashthorn think is the best?":
            answer = "Death";
            break;
        case "What is the name of the bridge in front of the Cave to Nightside?":
            answer = "Rainbow Bridge";
            break;
        case "What does every Rotting Fodder in the Dark Caves carry with them?":
            answer = "A spade";
            break;
        case "Who is the Wizard City mill foreman?":
            answer = "Sohomer Sunblade";
            break;
        case "What is Diego's full name?":
            answer = "Diego Santiago Quariquez Ramirez the Third";
            break;
        case "What is something that the Gobblers are NOT stockpiling in Colossus Way?":
            answer = "Broccoli";
            break;
        case "Where is Sabrina Greenstar?":
            answer = "Fairegrounds";
            break;
        case "Who sang the Dragons, Tritons and Giants into existance?":
            answer = "Bartleby";
            break;
        case "What are the school colors of Balance?":
            answer = "Tan and Maroon";
            break;
        case "What are the main colors for the Myth School?":
            answer = "Blue and Gold";
            break;
        case "What school is all about Creativity?":
            answer = "Storm";
            break;
        case "What is the gemstone for Balance?":
            answer = "Citrine";
            break;
        case "Who resides in the Hedge Maze?":
            answer = "Lady Oriel";
            break;
        case "Who taught Life Magic before Moolinda Wu?":
            answer = "Sylvia Drake";
            break;
        case "Who is the Princess of the Seraphs?":
            answer = "Lady Oriel";
            break;
        case "What is the name of the school newspaper? Boris Tallstaff knows...":
            answer = "Ravenwood Bulletin";
            break;
        case "What is the name of the grandfather tree?":
            answer = "Bartleby";
            break;
        case "What is Mindy's last name (she's on Colossus Blvd)?":
            answer = "Pixiecrown";
            break;
        case "What is the name of the Ice Tree in Ravenwood?":
            answer = "Kelvin";
            break;
        default:
            alert("Couldn't find the answer. Please contact the developer about this. Thank you.");
            break;
    }
    return answer;
}

function zafaria(question) {
    var answer;
    switch (question) {
        case "What does Lethu Blunthoof says about Ghostmanes?":
            answer = "You never can tell with them!";
            break;
        case "Sir Reginal Baxby's cousin is:":
            answer = "Mondli Greenhoof";
            break;
        case "Baobab is governed by:":
            answer = "A Council of three councilors.";
            break;
        case "Who is the missing prince?":
            answer = "Tiziri Silvertusk";
            break;
        case "Umlilo Sunchaser hired who as a local guide?":
            answer = "Msizi Redband";
            break;
        case "Inyanga calls Umlio a:":
            answer = "Fire feather";
            break;
        case "The Fire Lion Ravagers are led by:":
            answer = "Nergal the Burned Lion";
            break;
        case "Unathi Nightrunner is:":
            answer = "A councilor of Baobab.";
            break;
        case "Who is not one of the Zebu Kings:":
            answer = "Zaffe Zoffer";
            break;
        case "Rasik Pridefall is:":
            answer = "An Olyphant from Stone Town.";
            break;
        case "Esop Thornpaw gives you a magic:":
            answer = "Djembe Drum";
            break;
        case "The Inzinzebu Bandits are harassing the good merchants in:":
            answer = "Baobab Market";
            break;
        case "Vir Goodheart is an assistant to:":
            answer = "Rasik Pridefall";
            break;
        case "Belloq is first found in:":
            answer = "The Sook";
            break;
        case "Zebu Blackstripes legendary blade was called:":
            answer = "The Sword of the Duelist";
            break;
        case "Jambo means:":
            answer = "Hello.";
            break;
        case "Zebu Blackstripes legendary blade was forged:":
            answer = "In the halls of Valencia";
            break;
        case "Koyate Ghostmane accuses the player of:":
            answer = "Being a thief";
            break;
        case "Who are Hannibal Onetusk's brother and co-pilot?":
            answer = "Mago and Sobaka";
            break;
        case "Zamunda's great assassin is known as:":
            answer = "Karl the Jackal";
            break;
        default:
            alert("Couldn't find the answer. Please contact the developer about this. Thank you.");
            break;
    }
    return answer;
}
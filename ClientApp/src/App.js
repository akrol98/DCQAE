import React, { Component } from 'react';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    filter() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");

        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    render() {
        return (
            <div className="container">
                <div style={{ textAlign: "center" }}>
                    <a href="https://www.crowns.krolpowered.com/forums/topic/tos-violation/?view=all" target="_blank" rel="noopener noreferrer">Why am I seeing this page instead of the quizzes?</a>
                </div>
                <div style={{ textAlign: "center" }}>
                    <a href="https://www.wizard101.com/quiz/trivia/game/kingsisle-trivia" target="_blank" rel="noopener noreferrer">Link to quizzes</a>
                </div>
                <div style={{ textAlign: "center" }}>This question bank contains question and answer pairs for the 9 Wizard101 quizzes and Pirates101 Valencia</div>
                <br /><br />
                <input type="text" id="myInput" onKeyUp={this.filter} placeholder="Search for a question" />

                <div className="tableContainer">
                <table id="myTable">
                    <thead>
                        <tr className="header">
                            <th style={{ width: "70%" }}>Question</th>
                            <th style={{ width: "30%" }}>Answer</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>What is Professor Falmea's favorite food?</td><td>Pasta Arrabiata</td></tr>
                        <tr><td>What hand does Lady Oriel hold her wand in?</td><td>Trick question, she has a sword.</td></tr>
                        <tr><td>What determines the colors of the manders in Krok?</td><td>Where they come from and their school of focus.</td></tr>
                        <tr><td>What school is the spell Dark Nova</td><td>Shadow</td></tr>
                        <tr><td>How long do you have to wait to join a new match after fleeing in PVP?</td><td>5 minutes</td></tr>
                        <tr><td>Who is in the top level of the Tower of the Helephant?</td><td>Lyon Lorestriker</td></tr>
                        <tr><td>What type of rank 8 spell is granted to Death students at level 58?</td><td>Damage + DoT</td></tr>
                        <tr><td>Which of these are not a lore spell?</td><td>Fire Dragon</td></tr>
                        <tr><td>An unmodified Sun Serpent does what?</td><td>900 - 1000 Fire Damage + 300 Fire Damage to entire team</td></tr>
                        <tr><td>Which of these is NOT a Zafaria Anchor Stone?</td><td>Rasik Anchor Stone</td></tr>
                        <tr><td>Who is the Bear King of Grizzleheim?</td><td>Valgard Goldenblade</td></tr>
                        <tr><td>What is the name of the secret society in Krokotopia</td><td>Order of the Fang</td></tr>
                        <tr><td>What is unique about Falmea's Classroom?</td><td>There are scorch marks on the ceiling</td></tr>
                        <tr><td>In Grizzleheim, the Ravens want to bring about:</td><td>The Everwinter, to cover the world in ice:</td></tr>
                        <tr><td>What is the name of the new dance added with Khrysalis?</td><td>The bee dance</td></tr>
                        <tr><td>What is the name of the book stolen from the Royal Museum?</td><td>The Krokonomicon</td></tr>
                        <tr><td>Which Aztecan ponders the Great Questions of Life?</td><td>Philosoraptor</td></tr>
                        <tr><td>What does the Time Ribbon Protect against?</td><td>Time Flux</td></tr>
                        <tr><td>What school is the Gurtok Demon focused on?</td><td>Balance</td></tr>
                        <tr><td>Shaka Zebu is known best as:</td><td>The Greatest Living Zebra Warrior</td></tr>
                        <tr><td>Who is Bill Tanner's sister?</td><td>Sarah Tanner</td></tr>
                        <tr><td>What is the shape on the weather vanes in the Shopping District?</td><td>Half moon/moon</td></tr>
                        <tr><td>What book was Anna Flameright accused of stealing?</td><td>Advanced Flameology</td></tr>
                        <tr><td>What level must you be to wear Dragonspyre crafted clothing?</td><td>33</td></tr>
                        <tr><td>What did Abigail Dolittle accuse Wadsworth of stealing?</td><td>Genuine Imitation Golden Ruby</td></tr>
                        <tr><td>What was the name of the powerful Grendel Shaman who sealed the runic doors?</td><td>Thulinn</td></tr>
                        <tr><td>Who Is NOT a member of the Council of Light?</td><td>Cyrus Drake</td></tr>
                        <tr><td>Sir Edward Halley is the Spiral's most famous:</td><td>Aztecosaurologist</td></tr>
                        <tr><td>Who is the King of the Burrowers?</td><td>Pyat MourningSword</td></tr>
                        <tr><td>Which Queen is mentioned in the Marleybone book "The Golden Age"?</td><td>Ellen</td></tr>
                        <tr><td>How many portal summoning candles are in the Burial Mound?</td><td>Three</td></tr>
                        <tr><td>Kirby Longspear was once a student of which school of magic?</td><td>Death</td></tr>
                        <tr><td>The Swordsman Destreza was killed by:</td><td>A Gorgon</td></tr>
                        <tr><td>Zafaria is home to what cultures?</td><td>Gorillas, Zebras, Lions</td></tr>
                        <tr><td>Which of these locations is not in Wizard City?</td><td>Digmore Station</td></tr>
                        <tr><td>What book does Professor Drake send you to the library to check out?</td><td>Book on the Wumpus</td></tr>
                        <tr><td>What is the title of the book that is floating around the Wizard City Library?</td><td>Basic Wizarding & Proper Care of Familiars</td></tr>
                        <tr><td>How many worlds of The Spiral are unlocked as of May 21st, 2014?</td><td>12</td></tr>
                        <tr><td>Why are the Gobblers so afraid to go home?</td><td>Witches</td></tr>
                        <tr><td>Merle Ambrose is originally from which world?</td><td>Avalon</td></tr>
                        <tr><td>Who sells Valentine's Day items in Wizard City?</td><td>Valentina Heartsong</td></tr>
                        <tr><td>Who is the Registrar of Pigswick Academy?</td><td>Mrs. Dowager</td></tr>
                        <tr><td>Who guards the entrance to Unicorn Way?</td><td>Private Stillson</td></tr>
                        <tr><td>What's the name of the balance tree?</td><td>Niles</td></tr>
                        <tr><td>What can be used to diminish the Nirini's powers in Krokotopia?</td><td>Flame Gems</td></tr>
                        <tr><td>Why are the pixies and faeries on Unicorn Way evil?</td><td>Rattlebones corrupted them.</td></tr>
                        <tr><td>Which below are NOT a type of Oni in MooShu?</td><td>Ruby</td></tr>
                        <tr><td>Who prophesizes this? "The mirror will break, The horn will call, From the shadows I strike , And the skies will fall..."</td><td>Morganthe</td></tr>
                        <tr><td>Who is the Nameless Knight?</td><td>Sir Malory</td></tr>
                        <tr><td>What color is the door inside the boys dormroom?</td><td>Red</td></tr>
                        <tr><td>What is the shape of the pink piece in potion motion?</td><td>Heart</td></tr>
                        <tr><td>Which one of these are not a symbol on the battle sigil?</td><td>Wand</td></tr>
                        <tr><td>What did Prospector Zeke lose track of in MooShu?</td><td>Blue Oysters</td></tr>
                        <tr><td>Which is the only school left standing in Dragonspyre?</td><td>Fire</td></tr>
                        <tr><td>Arthur Wethersfield is A:..</td><td>Dog</td></tr>
                        <tr><td>What course did Herold Digmoore study?</td><td>Ancient Myths for Parliament</td></tr>
                        <tr><td>What is flying around in Regent's Square?</td><td>Newspapers</td></tr>
                        <tr><td>What time of day is it always in Marleybone?</td><td>Night</td></tr>
                        <tr><td>What two names are on the Statues in the Marleybone cathedral?</td><td>Saint Bernard and Saint Hubert</td></tr>
                        <tr><td>What event is Abigail Doolittle sending out invitations for?</td><td>Policeman's Ball</td></tr>
                        <tr><td>What sort of beverage is served in Air Dales Hideaway?</td><td>Root Beer</td></tr>
                        <tr><td>What is a very common last name of the cats in Marleybone?</td><td>O'Leary</td></tr>
                        <tr><td>Who is not an officer you'll find around Marleybone?</td><td>Officer Digmore</td></tr>
                        <tr><td>What style of artifacts are in the Royal Museum?</td><td>Krokotopian</td></tr>
                        <tr><td>What initials were on the doctor's glove?</td><td>XX</td></tr>
                        <tr><td>Who is the dangerous criminal that is locked up, but escapes from Newgate Prison?</td><td>Meowiarty</td></tr>
                        <tr><td>What color are the Marleybone mailboxes?</td><td>Red</td></tr>
                        <tr><td>Which of these folks can you find in the Royal Museum?</td><td>Clancy Pembroke</td></tr>
                        <tr><td>Which is not a street in Regent's Square?</td><td>Fleabitten Ave</td></tr>
                        <tr><td>What is Sgt. Major Talbot's full name?</td><td>Sylvester Quimby Talbot III</td></tr>
                        <tr><td>What time does the clock always read in Marleybone?</td><td>1:55</td></tr>
                        <tr><td>Which symbol is not on the stained glass window in Regent's Square?</td><td>A Tennis Ball</td></tr>
                        <tr><td>What transports you from place to place in Marleybone?</td><td>Hot Air Balloons</td></tr>
                        <tr><td>What did Prospector Zeke lose in Marleybone?</td><td>The Stray Cats</td></tr>
                        <tr><td>Who is the Emperor of Mooshu's Royal Guard?</td><td>Noboru Akitame</td></tr>
                        <tr><td>In what world would you find the Spider Temple</td><td>Zafaria</td></tr>
                        <tr><td>Where is the only pure fire in the Spiral found?</td><td>Wizard City</td></tr>
                        <tr><td>King Neza is Zenzen Seven Star's:?</td><td>Grandfather</td></tr>
                        <tr><td>What was Ponce de Gibbon looking for in Azteca?</td><td>The Water of Life</td></tr>
                        <tr><td>In Reagent's Square, the Professor is standing in front of a:</td><td>Telegraph Box</td></tr>
                        <tr><td>Hrundle Fjord is part of what section of Grizzleheim?</td><td>Wintertusk</td></tr>
                        <tr><td>King Axaya Knifemoon needs what to unify the people around him?</td><td>The Badge of Leadership</td></tr>
                        <tr><td>Which villain terrorizes the fair maidens of Marleybone?</td><td>Jaques the Scatcher</td></tr>
                        <tr><td>Who gives you permission to ride the boat to the Krokosphinx?</td><td>Sergent Major Talbot</td></tr>
                        <tr><td>Who is the only person who knows how to enter the Tomb of Storms?</td><td>Hetch Al'Dim</td></tr>
                        <tr><td>Who was ordered to guard the Sword of Kings?</td><td>The Knights of the Silver Rose</td></tr>
                        <tr><td>Who did Falynn Greensleeves fall in love with?</td><td>Sir Malick de Logres</td></tr>
                        <tr><td>Who was the greatest Aquilan Gladiator of all time?</td><td>Dimachaerus</td></tr>
                        <tr><td>Who haunts the Night Warrens?</td><td>Nosferabbit</td></tr>
                        <tr><td>Who tells you how to get to Aquila?</td><td>Harold Argleston</td></tr>
                        <tr><td>Who takes you across the River of Souls?</td><td>Charon</td></tr>
                        <tr><td>Thaddeus Price is the Pigswick Academy Professor of what school?</td><td>Tempest</td></tr>
                        <tr><td>Who asks you to find Khrysanthemums?</td><td>Eloise Merryweather</td></tr>
                        <tr><td>What is used to travel to the Isle of Arachnis?</td><td>Ice Archway</td></tr>
                        <tr><td>Who makes the harpsicord for Shelus?</td><td>Gretta Darkkettle</td></tr>
                        <tr><td>Morganthe got the Horned Crown from the Spriggan:</td><td>Gisela</td></tr>
                        <tr><td>Sumner Fieldgold twice asks you to recover what for him?</td><td>Shrubberies</td></tr>
                        <tr><td>Who needs the healing potion from Master Yip?</td><td>Binh Hoa</td></tr>
                        <tr><td>Who is Haraku Yip's apprentice?</td><td>Binh Hoa</td></tr>
                        <tr><td>Who taunts you with: "Prepare to be broken, kid!"</td><td>Clanker</td></tr>
                        <tr><td>What badge do you earn by defeating 100 Samoorai?</td><td>Yojimbo</td></tr>
                        <tr><td>Who thinks you are there to take their precious feathers?</td><td>Takeda Kanryu</td></tr>
                        <tr><td>The Swallows of Caliburn migrate to Avalon from where each year?</td><td>Zafaria and Marleybone</td></tr>
                        <tr><td>Who tells you: "A shield is just as much a weapon as the sword."</td><td>Mavra Flamewing</td></tr>
                        <tr><td>Who tells you to speak these words only unto your mentor: "Meena Korio Jajuka!"</td><td>Priya the Dryad</td></tr>
                        <tr><td>Who tries to raise a Gorgon Army?</td><td>Phorcys</td></tr>
                        <tr><td>Who taunts you with: "Wizard, you will know the meaning of the word pain after we battle!"</td><td>Aiuchi</td></tr>
                        <tr><td>What special plant was Barley developing in his Garden?</td><td>Cultivated Woodsmen</td></tr>
                        <tr><td>Who helps Morganthe find the Horn of Huracan?</td><td>Belloq</td></tr>
                        <tr><td>Who taunts: Why I oughta knock you to the moon, you pesky little creep!</td><td>Mugsy</td></tr>
                        <tr><td>What does Silenus name you once you've defeated Hades?</td><td>Glorious Golden Archon</td></tr>
                        <tr><td>In Azteca, Morganthe enlisted the help of the:</td><td>The Black Sun Necromancers</td></tr>
                        <tr><td>Where has Pharenor been imprisoned?</td><td>Skythorn Tower</td></tr>
                        <tr><td>Who grants the first Shadow Magic spell?</td><td>Sophia DarkSide</td></tr>
                        <tr><td>Mortis can teach you this.</td><td>Tranquilize</td></tr>
                        <tr><td>What term best fits Sun Magic Spells?</td><td>Enchantment</td></tr>
                        <tr><td>What type of spells are Ice, Fire, and Storm?</td><td>Elemental</td></tr>
                        <tr><td>Who can teach you the Life Shield Spell?</td><td>Sabrina Greenstar</td></tr>
                        <tr><td>Mildred Farseer teaches you what kind of spell?</td><td>Dispels</td></tr>
                        <tr><td>What term best fits Star Magic Spells?</td><td>Auras</td></tr>
                        <tr><td>Who teaches you balance magic?</td><td>Alhazred</td></tr>
                        <tr><td>What isn't a shadow magic spell?</td><td>Ebon Ribbons</td></tr>
                        <tr><td>Which spell can't be cast while polymorphed as a Gobbler?</td><td>Pie in the sky</td></tr>
                        <tr><td>If you can cast Storm Trap, Wild Bolt, Catalan, and the Tempest spell, what are you polymorphed as?</td><td>Ptera</td></tr>
                        <tr><td>How many pips does it cost to cast Stormzilla?</td><td>5</td></tr>
                        <tr><td>Which spell would not be very effective when going for the elixir vitae Badge?</td><td>Entangle</td></tr>
                        <tr><td>Cassie the Ponycorn teaches this kind of spell:</td><td>Prism</td></tr>
                        <tr><td>What level of spell does Enya Firemoon Teach?</td><td>80</td></tr>
                        <tr><td>If you're a storm wizard with 4 power pips and 3 regular pips, how powerful would your supercharge charm be?</td><td>110%</td></tr>
                        <tr><td>How many pips does it cost to cast Dr. Von's Monster?</td><td>9</td></tr>
                        <tr><td>What does Forsaken Banshee do?</td><td>375 damage plus a hex trap</td></tr>
                        <tr><td>Which Fire spell both damages and heals over time?</td><td>Power Link</td></tr>
                        <tr><td>Ether Shield protects against what?</td><td>Life and Death attacks</td></tr>
                        <tr><td>Tish'Mah specializes in spells that mostly affect these:</td><td>Minions</td></tr>
                        <tr><td>Historian Gonzago is on a stage, who isn't in the audience?</td><td>Giafra</td></tr>
                        <tr><td>Historian Gonzago sends you on a "Paper Chase," who do you talk to during that quest?</td><td>Magdalena</td></tr>
                        <tr><td>How many Mechanical Birds do you collect in Sivella?</td><td>5</td></tr>
                        <tr><td>The Mooshu Tower in Sivella is a replica of what?</td><td>Tower of Serenity</td></tr>
                        <tr><td>What are Albus and Carbo?</td><td>Armada Commanders</td></tr>
                        <tr><td>What color of Windstone do you find in Marco Pollo's Tomb?</td><td>Blue</td></tr>
                        <tr><td>What kind of disguise do you wear in Sivella?</td><td>Clockwork</td></tr>
                        <tr><td>What shows Steed you're part of the Resistence?</td><td>Amulet</td></tr>
                        <tr><td>What type of boat do you use to get from the docks to Sivella?</td><td>Gondola</td></tr>
                        <tr><td>What type of item does Prospector Zeke want you to find in Valencia?</td><td>Birds</td></tr>
                        <tr><td>What's the name of a librarian in Sivella?</td><td>Grassi</td></tr>
                        <tr><td>Where do you find the Tomb of Marco Pollo?</td><td>Granchia</td></tr>
                        <tr><td>Which one isn't a Scholar by name?</td><td>Caresini</td></tr>
                        <tr><td>Which world doesn't have a pillar in Sivella?</td><td>Monquista</td></tr>
                        <tr><td>Who do you find in the Lecture Hall of Sivella?</td><td>Ridolfo</td></tr>
                        <tr><td>Who does Steed send you to speak to in Sivella?</td><td>Thaddeus</td></tr>
                        <tr><td>Who reads the inscription on Marleybone's Tower?</td><td>Ratbeard</td></tr>
                        <tr><td>Why does Steed want you to attack Armada Ships?</td><td>Make a Disguise</td></tr>
                        <tr><td>You need a good eye to save these in Granchia...</td><td>Art Objects</td></tr>
                        <tr><td>You won't find this kind of Armada Troop in Sivella!</td><td>Battle Angel</td></tr>
                        <tr><td>Who is the Fire School professor?</td><td>Dalia Falmea</td></tr>
                        <tr><td>What school does Malorn Ashthorn think is the best?</td><td>Death</td></tr>
                        <tr><td>What is the name of the bridge in front of the Cave to Nightside?</td><td>Rainbow Bridge</td></tr>
                        <tr><td>What does every Rotting Fodder in the Dark Caves carry with them?</td><td>A spade</td></tr>
                        <tr><td>Who is the Wizard City mill foreman?</td><td>Sohomer Sunblade</td></tr>
                        <tr><td>What is Diego's full name?</td><td>Diego Santiago Quariquez Ramirez the Third</td></tr>
                        <tr><td>What is something that the Gobblers are NOT stockpiling in Colossus Way?</td><td>Broccoli</td></tr>
                        <tr><td>Where is Sabrina Greenstar?</td><td>Fairegrounds</td></tr>
                        <tr><td>Who sang the Dragons, Tritons and Giants into existance?</td><td>Bartleby</td></tr>
                        <tr><td>What are the school colors of Balance?</td><td>Tan and Maroon</td></tr>
                        <tr><td>What are the main colors for the Myth School?</td><td>Blue and Gold</td></tr>
                        <tr><td>What school is all about Creativity?</td><td>Storm</td></tr>
                        <tr><td>What is the gemstone for Balance?</td><td>Citrine</td></tr>
                        <tr><td>Who resides in the Hedge Maze?</td><td>Lady Oriel</td></tr>
                        <tr><td>Who taught Life Magic before Moolinda Wu?</td><td>Sylvia Drake</td></tr>
                        <tr><td>Who is the Princess of the Seraphs?</td><td>Lady Oriel</td></tr>
                        <tr><td>What is the name of the school newspaper? Boris Tallstaff knows...</td><td>Ravenwood Bulletin</td></tr>
                        <tr><td>What is the name of the grandfather tree?</td><td>Bartleby</td></tr>
                        <tr><td>What is Mindy's last name (she's on Colossus Blvd)?</td><td>Pixiecrown</td></tr>
                        <tr><td>What is the name of the Ice Tree in Ravenwood?</td><td>Kelvin</td></tr>
                        <tr><td>What does Lethu Blunthoof says about Ghostmanes?</td><td>You never can tell with them!</td></tr>
                        <tr><td>Sir Reginal Baxby's cousin is:</td><td>Mondli Greenhoof</td></tr>
                        <tr><td>Baobab is governed by:</td><td>A Council of three councilors.</td></tr>
                        <tr><td>Who is the missing prince?</td><td>Tiziri Silvertusk</td></tr>
                        <tr><td>Umlilo Sunchaser hired who as a local guide?</td><td>Msizi Redband</td></tr>
                        <tr><td>Inyanga calls Umlio a:</td><td>Fire feather</td></tr>
                        <tr><td>The Fire Lion Ravagers are led by:</td><td>Nergal the Burned Lion</td></tr>
                        <tr><td>Unathi Nightrunner is:</td><td>A councilor of Baobab.</td></tr>
                        <tr><td>Who is not one of the Zebu Kings:</td><td>Zaffe Zoffer</td></tr>
                        <tr><td>Rasik Pridefall is:</td><td>An Olyphant from Stone Town.</td></tr>
                        <tr><td>Esop Thornpaw gives you a magic:</td><td>Djembe Drum</td></tr>
                        <tr><td>The Inzinzebu Bandits are harassing the good merchants in:</td><td>Baobab Market</td></tr>
                        <tr><td>Vir Goodheart is an assistant to:</td><td>Rasik Pridefall</td></tr>
                        <tr><td>Belloq is first found in:</td><td>The Sook</td></tr>
                        <tr><td>Zebu Blackstripes legendary blade was called:</td><td>The Sword of the Duelist</td></tr>
                        <tr><td>Jambo means:</td><td>Hello.</td></tr>
                        <tr><td>Zebu Blackstripes legendary blade was forged:</td><td>In the halls of Valencia</td></tr>
                        <tr><td>Koyate Ghostmane accuses the player of:</td><td>Being a thief</td></tr>
                        <tr><td>Who are Hannibal Onetusk's brother and co-pilot?</td><td>Mago and Sobaka</td></tr>
                        <tr><td>Zamunda's great assassin is known as:</td><td>Karl the Jacka</td></tr>

                    </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
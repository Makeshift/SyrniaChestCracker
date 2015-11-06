// ==UserScript==
// @name         Syrnia Chest-Opener
// @namespace    http://github.com/Makeshift
// @version      0.7
// @description  Pick the size of the chest and refresh, will automatically enter and submit numbers for chests at random. Resets if you refresh the page!
// @author       PatchworkTiger
// @match        http://www.syrnia.com/game.php
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==
//We require jquery because it's just easier to use jqueries selectors
//Config
var timeBetweenChecks = 1000; //Lower can be laggier but faster checking.

//Globals
var alreadyRunning = false;
var numArray = [];

lookForInput();

//Looks for the input field
function lookForInput() {
    if (document.getElementById("guessCombo")) { //Check if it exists
        if (alreadyRunning == true) {
            console.log("Trying: " + numArray[0] + "; Left: " + numArray.size()); //Debug console

            document.getElementById("guessCombo").value = numArray[0]; //Set value
            $('input[type="submit"][value="Open"]').submit(); //Submit

            var index = numArray.indexOf(numArray[0]); //Find the num in array
            numArray.splice(index, 1); //Delete from array
            numArray.sort(function() { //Pseudo-random sort array
                return .5 - Math.random();
            });
            setTimeout(lookForInput, timeBetweenChecks);
        } else {
            //Array builder
            var str = document.getElementById("LocationContent").innerHTML;
            var re = /between (.*) and (.*)\.\.\.<form/g;
            var m;
            while ((m = re.exec(str)) !== null) {
                if (m.index === re.lastIndex) {
                    re.lastIndex++;
                }
                console.log("Generating array between " + m[1] + " and " + m[2]);
                for (i = m[1]; i <= m[2]; i++) { //Generate the array
                    numArray.push(i);
                }
            }
            alreadyRunning = true;
            setTimeout(lookForInput, timeBetweenChecks);
            //Note: If the use refreshes, we will lose progress
        }
    } else {
        setTimeout(lookForInput, timeBetweenChecks);
    }
}

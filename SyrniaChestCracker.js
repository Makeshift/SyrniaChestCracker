// ==UserScript==
// @name         Syrnia Chest-Opener
// @namespace    http://github.com/Makeshift
// @version      0.1
// @description  Pick the size of the chest and refresh, will automatically enter and submit numbers for chests at random. Resets if you refresh the page!
// @author       PatchworkTiger
// @match        http://www.syrnia.com/game.php
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==
//We require jquery because it's just easier to use jqueries selectors
//Config
var timeBetweenChecks = 100; //Lower can be laggier but faster checking.

//Globals
var alreadyRunning = false;
var numArray = [];

lookForInput();

//Looks for the input field
function lookForInput() {
    if (document.getElementById("guessCombo")) { //Check if it exists
        if (alreadyRunning == true) {
            console.log("Trying: " + numArray[0] + "; Left: " + numArray.length()); //Debug console

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
            var text = document.getElementById("LocationContent");
            var re = /between (\d+) and (\d+)./g;
            var found = text.match(re); //Find th two numbers
            console.log("Generating array between " + found[0] + " and " + found[1]);
            for (i = found[0]; i <= found[1]; i++) { //Generate the array
                numArray.push(i);
            }
            alreadyRunning = true;
            setTimeout(lookForInput, timeBetweenChecks);
            //Note: If the use refreshes, we will lose progress
        }
    } else {
      setTimeout(lookForInput, timeBetweenChecks);
    }
}

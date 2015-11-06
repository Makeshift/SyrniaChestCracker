## WHAT IS
An exceptionally simple script for Syrnia that cracks number chests. When combined with the captcha script, you can crack ALL the chests!

## HOW DO
It's a Greasemonkey/Tampermonkey script. Install it.
* Move to the location the chest is at
* Chill beans while it cracks it for you.

# BOTCHECKS?
This will work with my botcheck script if you modify the botcheck script slightly.
* Find the line `doMainAction();`, at the time of writing, it's line 37.
* Comment it out, like this:
```javascript
...
checkOffline();
checkLogin();
//doMainAction();
  if (unsafeWindow.$('botImage') != null) {
    ...
```

## ISSUE?!
* If you refresh the page, it will reset the array with the numbers in it, so you'll lose your progress.

## FUTURE!?
* Use persistent LocalStorage to save progress between refreshes(For multi-day codebreaking)
* Integrate it with the botcheck bot
* Make a pretty GUI

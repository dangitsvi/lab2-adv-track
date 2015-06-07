'use strict';

// LAB 2: SORTING AND CAMPY SCI-FI

// Welcome to Lab 2 =)

// Be sure to read all the comments!

// All of the instructions are inline with the assignment below.
// Look for the word TODO in comments.  Each TODO will have a
// description of what is required.

// To run this file (in the terminal) use: node lab2.js

//*********************************************************
// SETUP
//*********************************************************

// We're going to use this special assert method again to
// test our code
function assert(expression, failureMessage) {
  if (!expression) {
    console.log('assertion failure: ', failureMessage);
  }
}

//*********************************************************
// PROBLEM 1: The Blob. 20 points
//*********************************************************

/* Dowington, PA had 1000 citizens on the night the blob escaped
 its meteorite. At first, the blob could only find and consume
 Pennsylvanians at a rate of 1/hour. However, each time it digested
 someone, it became faster and stronger: adding to its consumption
 rate by 1 person/hour.

    for the...      | starting rate of | persons consumed |
                    |  consumption     |    that hour     |
--------------------|------------------|------------------|
    first hour      |    1/hour        |        1         |
    second hour     |    2/hour        |        2         |
    third hour      |    3/hour        |        3         |
    fourth hour     |    4/hour        |        4         |

 TODO: First, make a constructor function, called Blob, that makes blobs.

 TODO: Next, create an instance of Blob named blob.

 TODO: Then, use a loop to calculate how long it took the blob to finish
 with Dowington.
*/
//blog constructor
function Blob() {
  this.peopleEaten = 0;
  this.hoursEating = 0;
  this.consumptionRate = 1;
}

//blob instance
var blob = new Blob();

//loop to calculate hours to finish Dowington
var totalPopulation = 1000;

while (blob.peopleEaten < totalPopulation) {
  blob.peopleEaten += blob.consumptionRate;
  blob.consumptionRate++;
  blob.hoursEating++;
}

var hoursSpentInDowington = blob.hoursEating; // TODO: assign me the value of the
                           // above calculation (how long it took
                           // the blob to eat Dowington)

// Now, write a method that takes a population for an arbitrary
// town, and the starting consumption rate, and returns the number
// of hours the blob needs to ooze its way through that town.

Blob.prototype.hoursToOoze = function(population, peoplePerHour) {
  // TODO: implement me based on the instructions above.
  // Be sure to then assign me to the Blob's prototype.
  var peopleEaten = 0;
  var hoursEating = 0;
  while (peopleEaten < population) {
    peopleEaten += peoplePerHour;
    peoplePerHour++;
    hoursEating++;
  }
  return hoursEating;
};

assert(blob.hoursToOoze(0, 1) === 0, 'no people means no time needed.');
assert(blob.hoursToOoze(1000, 1) === hoursSpentInDowington,
  'hoursSpentInDowington should match hoursToOoze\'s result for 1000');
assert(blob.hoursToOoze(1000, 1000) === 1, 'should be able to eat everything in first hour');
assert(blob.hoursToOoze(3, 1) === 2, '1 first hour, then 2 second hour');
assert(blob.hoursToOoze(1000, 0) === hoursSpentInDowington + 1, 'should only set back one hour');
// TODO: write three more assertions like the two above, testing out
// the hoursToOoze method.

//*********************************************************
// PROBLEM 2: Universal Translator. 20 points
//*********************************************************

var hello = {
  klingon: 'nuqneH',  // home planet is Qo'noS
  romulan: 'Jolan\'tru', // home planet is Romulus
  'federation standard': 'hello' // home planet is Earth
};

// TODO: define a constructor that creates objects to represent
// sentient beings. They have a home planet, a language that they
// speak, and method (that you'll place on the prototype) called
// sayHello.

function SentientBeing(homePlanet, homeLanguage) {
  // TODO: specify a home planet and a language
  // you'll need to add parameters to this constructor
  this.homePlanet = homePlanet;
  this.homeLanguage = homeLanguage;
}

// sb is a SentientBeing object
SentientBeing.prototype.sayHello = function(sb) {
    // TODO: say hello prints out (console.log's) hello in the
    // language of the speaker, but returns it in the language
    // of the listener (the sb parameter above).
    // use the 'hello' object at the beginning of this exercise
    // to do the translating

    //TODO: put this on the SentientBeing prototype
    console.log(hello[this.homeLanguage]);
    return hello[sb.homeLanguage];
  };

// TODO: create three subclasses of SentientBeing, one for each
// species above (Klingon, Human, Romulan).

function Klingon() {}
function Human() {}
function Romulan() {}

Klingon.prototype = new SentientBeing('Qo\'noS', 'klingon');
Human.prototype = new SentientBeing('Earth', 'federation standard');
Romulan.prototype = new SentientBeing('Romulus', 'romulan');

assert((new Human()).sayHello(new Klingon()) === 'nuqneH',
  'the klingon should hear nuqneH');
assert((new Human()).sayHello(new Romulan()) === 'Jolan\'tru',
  'the romulan should hear Jolan\'tru');
assert((new Klingon()).sayHello(new Human()) === 'hello',
  'the human should hear hello');
assert((new Klingon()).sayHello(new Romulan()) === 'Jolan\'tru',
  'the romulan should hear Jolan\'tru');
assert((new Romulan()).sayHello(new Human()) === 'hello',
  'the human should hear hello');
assert((new Romulan()).sayHello(new Klingon()) === 'nuqneH',
  'the klingon should hear nuqneH');

// TODO: write five more assertions, to complete all the possible
// greetings between the three types of sentient beings you created above.

//*********************************************************
// PROBLEM 3: Sorting. 20 points.
//
// Implement the following functions. Write at least 2
// assertions for each one (the assertions are how you
// will test your code)
//*********************************************************

function lastLetterSort(stringArray) {
  function byLastLetter(a, b) {
    //TODO: implement me. sort the strings in alphabetical
    // order using their last letter
    // Read this about how the sort function works:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    // this byLastLetter function is a "compare function"
    // And check out the "comparing strings" section  here:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
    return a.charAt(a.length - 1) > b.charAt(b.length - 1);
  }
  stringArray.sort(byLastLetter);
}

var animals = ['cat', 'dog', 'mouse'];
lastLetterSort(animals);

assert (animals[0] === 'mouse', 'the first animal should be mouse');
assert (animals[2] === 'cat', 'the last animal should be cat');

function sumArray(numberArray) {
  var sum = 0;
  // TODO: implement me using forEach
  numberArray.forEach(function(number) {
    sum += number;
  });
  return sum;
}

assert(sumArray([2, 8, 7, 3]) === 20, 'the sum should be 20');
assert(sumArray([1, 9, 2, 8, 3, 7]) === 30, 'the sum should be 30');

function sumSort(arrayOfArrays) {
  arrayOfArrays.sort(function(a, b) {
    // TODO: implement me using sumArray
    //  order the arrays based on the sum of the numbers
    //  inside each array
    var sumA = sumArray(a);
    var sumB = sumArray(b);
    return sumA - sumB;
  });
}

// sums are 20, 10, 6, 30
var arrOfArrs = [[5, 5, 6, 4], [7, 3], [1, 2, 3], [4, 6, 9, 1, 8, 2]];
sumSort(arrOfArrs);

assert(sumArray(arrOfArrs[0]) === 6, 'the first sum should be 6');
assert(sumArray(arrOfArrs[3]) === 30, 'the last sum should be 30');

//*********************************************************
// PROBLEM 4: Cleanup: 10 points
// Makes sure this file passes jshint and jscs
//
// ./node_modules/.bin/grunt jshint
// ./node_modules/.bin/grunt jscs
//*********************************************************

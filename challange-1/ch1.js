const R = require('ramda');
/*
 # What is the advantage of using these kinds of libraries (Ramda) ?
  =======================
  1. Ramda makes it simple for us to build complex logic through functional composition
  2. By default, all Ramda functions support Currying so that save allot of work
  3. Ramda strongly supports Immutable for input parameters and that the some of the core  idea of Functional programming paradigm
  4. Ramda code return a function and that's a very useful benefit because we can combine it with others to operate on whatever sets of data we choose. (reusability)
  5. The code is readable and that is a good thing for me as a developer.


  ## What is the result of the following code?
  =======================
  R.reduce((acc,x) => R.compose(R.flip(R.prepend)(acc), R.sum,R.map(R.add(1)))([x,...acc]), [0])([13, 28]);

    result => [46, 15, 0]
 */

/* 
 ## Explain each of the steps the best you can ?
  =======================
  Reference : https://ramdajs.com/docs
*/
// reduce : give us two iteration (https://ramdajs.com/docs/#reduce)
// First iteration : acc =[0] , x = 13
//  - compose : Performs right-to-left function composition
R.compose(R.flip(R.prepend)([0]), R.sum, R.map(R.add(1)))([13, 0]);

// Debug each step inside iteration 1

// Add 1 to array items value, result = [14, 1]
R.map(R.add(1))([13, 0]);
// Adds together all the elements of a list, result = 15
R.sum()([14, 1]);
// flip will return 15 at the first argument, args = 15, [0] then prepend will Returns a new list with the given element at the front
R.flip(R.prepend)([0])(15); //result = [15, 0]

// Second iteration : acc = [15,0], x = 28
R.compose(R.flip(R.prepend)([15, 0]), R.sum, R.map(R.add(1)))([28, 15, 0]);

// Debug each step inside iteration 2
R.map(R.add(1))([28, 15, 0]); // result = [29, 16, 1];

R.sum()([29, 16, 1]); // result = 46

// flip will return 46 at the first argument, args = 46, [15,0] then prepend will Returns a new list with the given element at the front

R.flip(R.prepend)([15, 0])(46); // result = [46, 15, 0]

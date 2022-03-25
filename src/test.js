// Requiring lodash library
const _ = require('lodash');
  
// Using _.debounce() method
// with its parameters
var debounce_fun = _.debounce(function() {
  console.log('Function debounced after 1000ms!');
  }, 4, 1000, {'leading': false});
  
// Defining loop
var loop = function() {
    setTimeout(loop, 3)
    debounce_fun();
};
  
// Calling loop to start
loop();
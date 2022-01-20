/* Global */

/* Node Getters */
const mainDiv = () => document.getElementById('main')

/* Event Handlers, what happens when something triggers */
const loadHomepage = () => {
  const h1 = document.createElement('h1')
  h1.className = 'center-align';
  h1.innerText = 'Workout Schedule';
  mainDiv().appendChild(h1)
  //<h1 class="center-align">Workout Schedule</h1>
}


/* Startup */

document.addEventListener('DOMContentLoaded', function() {
  //what happens when the page loads
  loadHomepage(); //this will load 'Workout Schedule'
})




/* Event listeners checklist
- created a DomContentLoaded, adds in the title of 'Workout Schedule'
when the page loads, adding in an h1 header.


*/
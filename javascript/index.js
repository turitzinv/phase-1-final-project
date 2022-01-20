/* Global */

/* Node Getters */
const mainDiv = () => document.getElementById('main')
const home = () => document.getElementById('home-page')

/* Event Handlers, what happens when something triggers */
const loadHomepage = () => {
  const h1 = document.createElement('h1')
  h1.className = 'center-align';
  h1.innerText = 'Workout Schedule';
  mainDiv().appendChild(h1)
  //<h1 class="center-align">Workout Schedule</h1>
}

const workoutTemplate = () => {
  return `
  <h1>Wokrout of the Week</h1>
    <table class="centered">
      <thead>
        <tr>
          <th>Day</th>
          <th>Focus</th>
          <th>Exercise 1</th>
          <th>Exercise 2</th>
          <th>Exercise 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Monday</td>
          <td>Focus</td>
          <td>Exercise 1</td>
          <td>Exercise 2</td>
          <td>Exercise 3</td>
        </tr>
      </tbody>
    </table>
  `
}

const homePageLink = () => {
  home().addEventListener('click', (e) => {
    e.preventDefault();
    loadHomepage();
  })
}

/* Startup */

document.addEventListener('DOMContentLoaded', function() {
  //what happens when the page loads
  loadHomepage(); //this will load 'Workout Schedule'
  homePageLink(); //when DOM loads, its going to render the click event that allows to render homepage
})

const renderWorkoutTable = () => {
  mainDiv().innerHTML = workoutTemplate()
}


/* Event listeners checklist
- created a DOMContentLoaded, adds in the title of 'Workout Schedule'
when the page loads, adding in an h1 header.
- Click Home and "Workout Schedule appears" on the main page

*/
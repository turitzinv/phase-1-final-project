/* Global */
let workouts = []

/* Node Getters */
const mainDiv = () => document.getElementById('main');
const home = () => document.getElementById('home-page');
const workoutList = () => document.getElementById('workout-list-page');
const addNewWorkout = () => document.getElementById('Add-New-Workout');

/* Event Handlers, what happens when something triggers */
const loadHomepage = () => {
  mainDiv().innerHTML = ''
  const h1 = document.createElement('h1');
  h1.classList.add('center-align');
  h1.innerText = 'Workout Schedule'
  mainDiv().appendChild(h1);
  const form = document.createElement('form')
  form.innerHTML = `
      <div class="input-field">
        <input id="day" type="text">
        <label for="day">Day</label>
      </div>
      <div class="input-field">
        <input id="focus" type="text">
        <label for="focus">Focus</label>
      </div>
      <div class="input-field">
        <input id="exercise1" type="text">
        <label for="exercise1">Exercise 1</label>
      </div>
      <div class="input-field">
        <input id="exercise2" type="text">
        <label for="exercise2">Exercise 2</label>
      </div>
      <div class="input-field">
        <input id="exercise3" type="text">
        <label for="exercise3">Exercise 3</label>
      </div>
      <input type="submit" value="Create Workout" class="waves-effect waves-teal btn-flat">
  `
  mainDiv().appendChild(form)
}

const loadWorkouts = async () => {
  fetch('http://localhost:3000/workout') //GET our workouts from db.json
    .then(resp => resp.json())
    .then(data => {
      workouts = data //adds our data into the workouts array
    })
}

const workoutTemplate = (workouts) => {
  let schedule = document.createElement('table')
  schedule.className = 'centered'
  schedule.innerHTML = `
       <thead>
         <tr>
           <th>Day</th>
           <th>Focus</th>
           <th>Exercise1</th>
           <th>Exercise2</th>
           <th>Exercise3</th>
         </tr>
         </thead>
  `
  mainDiv().appendChild(schedule)

  workouts.forEach(workout => {
    let rows = document.createElement('tr')
    rows.innerHTML = `
     <td>${workout.day}</td>
     <td>${workout.focus}</td>
     <td>${workout.exercise1}</td>
     <td>${workout.exercise2}</td>
     <td>${workout.exercise3}</td>
    `
    schedule.appendChild(rows)
  })
}

//Below is click event for "Home" on the nav bar
const homePageLink = () => {
  home().addEventListener('click', (e) => {
    e.preventDefault();
    loadHomepage();
  })
}
//Below is click event for "Workout List" on the nav bar
const workoutListLink = () => {
  workoutList().addEventListener('click', (e) => {
    e.preventDefault();
    workoutTemplate(workouts);
  })
}

// const newWorkoutLink = () => {
//   addNewWorkout().addEventListener('click', (e) => {
//     e.preventDefault()
//     document.querySelector(form.type) =''
//   })
// }

/* Startup */

document.addEventListener('DOMContentLoaded', function () {
  //what happens when the page loads
  loadHomepage(); //this will load 'Workout Schedule'
  homePageLink(); //when DOM loads, its going to render the click event that allows to render homepage
  workoutListLink(); //this will load the table
  loadWorkouts(); //fetch db.json
  // newWorkoutLink(); //button to add a new workout
})

/* Event listeners checklist

- created a DOMContentLoaded, adds in the title of 'Workout Schedule'
when the page loads, adding in an h1 header.  Also loads click events.
- Click Home and "Workout Schedule appears" on the main page.
- Click Workout List and "Work out of the week" will appear with a table

*/
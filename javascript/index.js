/* Global */
let workouts = []

/* Node Getters */
const mainDiv = () => document.getElementById('main')
const home = () => document.getElementById('home-page')
const workoutList = () => document.getElementById('workout-list-page')

/* Event Handlers, what happens when something triggers */
const loadHomepage = () => {
  return ' <h1 class="center-align">Workout Schedule</h1> '
}

const loadWorkouts = async () => {
  fetch('http://localhost:3000/workout') //GET our workouts from db.json
    .then(resp => resp.json())
    .then(data => workouts = data) //adds our data into the workouts array
}

const workoutTemplate = () => {
  let schedule = document.createElement('table')
  schedule.className ='centered'
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
  
  // return `
  //   <table class="centered">
  //     <thead>
  //       <tr>
  //         <th>Day</th>
  //         <th>Focus</th>
  //         <th>Exercise1</th>
  //         <th>Exercise2</th>
  //         <th>Exercise3</th>
  //       </tr>
  // `
}

// const schedule = (workout) => {
//   return `
//   <tr>
//     <td>${workout.day}</td>
//     <td>${workout.focus}</td>
//     <td>${workout.exercise1}</td>
//     <td>${workout.exercise2}</td>
//     <td>${workout.exercise3}</td>
// </tr> `
// }

//Below is click event for "Home" on the nav bar
const homePageLink = () => {
  home().addEventListener('click', (e) => {
    e.preventDefault();
    showHomepage();
  })
}
//Below is click event for "Workout List" on the nav bar
const workoutListLink = () => {
  workoutList().addEventListener('click', (e) => {
    e.preventDefault();
    workoutTemplate();
  })
}

/* Startup */

document.addEventListener('DOMContentLoaded', function () {
  //what happens when the page loads
  showHomepage(); //this will load 'Workout Schedule'
  homePageLink(); //when DOM loads, its going to render the click event that allows to render homepage
  workoutListLink(); //this will load the table
  loadWorkouts(); //fetch db.json
})

/* renders to mainDiv */
const showHomepage = () => {
  mainDiv().innerHTML = loadHomepage(); //adds in the h1 Workout Schedule
}

// const workout = () => {
//   mainDiv().innerHTML = workoutTemplate() //adds in the table
// }


/* Event listeners checklist

- created a DOMContentLoaded, adds in the title of 'Workout Schedule'
when the page loads, adding in an h1 header.  Also loads click events.
- Click Home and "Workout Schedule appears" on the main page.
- Click Workout List and "Work out of the week" will appear with a table

*/
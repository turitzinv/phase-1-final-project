/* Global */
let workouts = []

/* Startup */
document.addEventListener('DOMContentLoaded', function () {
  //what happens when the page loads
  loadHomepage(); //this will load 'Workout Schedule'
  homePageLink(); //when DOM loads, its going to render the click event that allows to render homepage
  workoutListLink(); //this will load the table
  loadWorkouts(); //fetch db.json
})

/* Node Getters */
const mainDiv = () => document.getElementById('main');
const home = () => document.getElementById('home-page');
const workoutList = () => document.getElementById('workout-list-page');
const addNewWorkout = () => document.getElementById('Add-New-Workout');
const table = () => document.querySelector('table')
const secondary = () => document.getElementById('secondary')

/* Event Handlers, what happens when something triggers */
const loadHomepage = () => {
  mainDiv().innerHTML = ''
  secondary().innerHTML=''
  const h1 = document.createElement('h1');
  h1.classList.add('center-align');
  h1.innerText = 'Workout Schedule'
  mainDiv().appendChild(h1);
  const form = document.createElement('form')
  form.innerHTML = `
      <div class="input-field">
        <input id="day" name="day" type="text">
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
  form.addEventListener('submit', submitFormEvent)
  mainDiv().appendChild(form)
}

const loadWorkouts = () => {
  fetch('http://localhost:3000/workout') //GET our workouts from db.json
    .then(resp => resp.json())
    .then(data => {
      workouts = data //adds our data into the workouts array
    })
}

const workoutTemplate = (workouts) => {
  secondary().innerHTML=''
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
  secondary().appendChild(schedule)

  workouts.forEach(workout => {
    let rows = document.createElement('tr')
    rows.innerHTML = `
     <td>${workout.day}</td>
     <td>${workout.focus}</td>
     <td>${workout.exercise1}</td>
     <td>${workout.exercise2}</td>
     <td>${workout.exercise3}</td>
     <td><button id="${workout.id}" class="deleteBtn">Delete</button></td>
    `
    schedule.appendChild(rows)
  })
  table().addEventListener('click', onDeleteRow); //Delete eventListener
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

//what ocurs after submitting the form, JSON receives new data
const submitFormEvent = e => {
  e.preventDefault()
  // console.log(day.children)
  // console.log(day.children[0])
  // console.log(day.children[0].value)
  console.log(e.target.day.value)
  fetch('http://localhost:3000/workout', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      day: e.target.day.value,
      focus: e.target.focus.value,
      exercise1: e.target.exercise1.value,
      exercise2: e.target.exercise2.value,
      exercise3: e.target.exercise3.value,
    })
  })
    .then(resp => resp.json())
    .then(workout => {
      workouts.push(workout)
      workoutTemplate(workouts)
      e.target.reset()
    })
}

//Delete button function
function onDeleteRow(e) {
  if (!e.target.classList.contains('deleteBtn')) {
    return;
  }
  const btn = e.target
  btn.closest('tr').remove();
  updateWorkout(e.target.id)
}


//Updating JSON Server to reflect deletion
function updateWorkout(workoutId) {
  fetch(`http://localhost:3000/workout/${workoutId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    })
  })
    .then(resp => resp.json())
    .then(workout => loadWorkouts())
}
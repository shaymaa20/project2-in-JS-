
const readline = require('readline');

//  (constructor)
function Task(description, dueDate, priority) {
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
  this.completed = false;
}

//  (list)
const tasks = [];

//  (interface to input user)
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// (the menu options)
function displayMenu() {
  console.log('***************************');
  console.log('Welcome to JS TODO-APP');
  console.log('***************************');
  console.log('Select an action:');
  console.log('1) Add a new task');
  console.log('2) List all tasks');
  console.log('3) List completed tasks');
  console.log('4) Mark a task as done');
  console.log('5) Delete a task');
  console.log('6) Sort tasks by due date');
  console.log('7) Sort tasks by priority');
  console.log('8) Clear all tasks');
  console.log('***************************');
  console.log('What\'s your choice?');
}

// (code to add a new task)
function addTask() {
  rl.question('Enter task description: ', (description) => {
    rl.question('Enter due date: ', (dueDate) => {
      rl.question('Enter priority: ', (priority) => {
        const task = new Task(description, dueDate, priority);
        tasks.push(task);
        console.log('Task added successfully!');
        displayMenu();
      });
    });
  });
}

//  (list TO Show all tasks)
function listAllTasks() {
  tasks.forEach((task, index) => {
    console.log(`${index + 1}) [${task.completed ? 'X' : ' '}] ${task.description} (Due: ${task.dueDate}, Priority: ${task.priority})`);
  });
  displayMenu();
}

//   (list completed tasks)
function listCompletedTasks() {
  const completedTasks = tasks.filter(task => task.completed);
  if (completedTasks.length > 0) {
    completedTasks.forEach((task, index) => {
      console.log(`${index + 1}) ${task.description} (Due: ${task.dueDate}, Priority: ${task.priority})`);
    });
  } else {
    console.log('No completed tasks found.');
  }
  displayMenu();
}

//  (mark a task its completed)
function markTaskAsCompleted() {
  rl.question('Enter the task number to mark as completed: ', (taskNumber) => {
    const index = parseInt(taskNumber) - 1;
    if (index >= 0 && index < tasks.length) {
      tasks[index].completed = true;
      console.log('Task marked as completed!');
    } else {
      console.log('Invalid task number.');
    }
    displayMenu();
  });
}

//  (delete  task)
function deleteTask() {
  rl.question('Enter the task number to delete: ', (taskNumber) => {
    const index = parseInt(taskNumber) - 1;
    if (index >= 0 && index < tasks.length) {
      tasks.splice(index, 1);
      console.log('Task deleted!');
    } else {
      console.log('Invalid task number.');
    }
    displayMenu();
  });
}

// (Sort tasks by due date)
function sortTasksByDueDate() {
  tasks.sort((task1, task2) => new Date(task1.dueDate) - new Date(task2.dueDate));
  console.log('Tasks sorted by due date!');
  displayMenu();
}

//  (Sort tasks by priority)
function sortTasksByPriority() {
  tasks.sort((task1, task2) => task1.priority - task2.priority);
  console.log('Tasks sorted by priority!');
  displayMenu();
}

//  (Clear all tasks)
function clearAllTasks() {
  tasks.length = 0;
  console.log('All tasks cleared!');
  displayMenu();
}

//  (user input options)
rl.on('line', (input) => {
  const choice = parseInt(input);
  switch (choice) {
    case 1:
      addTask();
      break;
    case 2:
      listAllTasks();
      break;
    case 3:
      listCompletedTasks();
      break;
    case 4:
      markTaskAsCompleted();
      break;
    case 5:
      deleteTask();
      break;
    case 6:
      sortTasksByDueDate();
      break;
    case 7:
      sortTasksByPriority();
      break;
    case 8:
      clearAllTasks();
      break;
    default:
      console.log('Invalid choice.');
      displayMenu();
  }
});

//  (options for The Menu )
displayMenu();

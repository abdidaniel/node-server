const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let tasks = [];

function addTask() {
  rl.question('Ingrese la descripción de la tarea: ', (description) => {
    const task = {
      id: tasks.length + 1,
      description,
      completed: false
    };
    tasks.push(task);
    console.log('Tarea añadida exitosamente.');
    showMenu();
  });
}

function removeTask() {
  rl.question('Ingrese el ID de la tarea que desea eliminar: ', (taskId) => {
    const taskIndex = tasks.findIndex(task => task.id === parseInt(taskId));
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      console.log('Tarea eliminada exitosamente.');
    } else {
      console.log('No se encontró una tarea con ese ID.');
    }
    showMenu();
  });
}

function completeTask() {
  rl.question('Ingrese el ID de la tarea que desea marcar como completada: ', (taskId) => {
    const task = tasks.find(task => task.id === parseInt(taskId));
    if (task) {
      task.completed = true;
      console.log('Tarea marcada como completada.');
    } else {
      console.log('No se encontró una tarea con ese ID.');
    }
    showMenu();
  });
}

function showTasks() {
  console.log('--- Lista de tareas ---');
  if (tasks.length === 0) {
    console.log('No hay tareas registradas.');
  } else {
    tasks.forEach((task) => {
      const status = task.completed ? '[X]' : '[ ]';
      console.log(`${task.id}. ${status} ${task.description}`);
    });
  }
  showMenu();
}

function showMenu() {
  console.log('\n--- Lista de tareas ---');
  console.log('1. Añadir tarea');
  console.log('2. Eliminar tarea');
  console.log('3. Marcar tarea como completada');
  console.log('4. Ver tareas');
  console.log('5. Salir');

  rl.question('Ingrese el número de la opción deseada: ', (choice) => {
    switch (choice) {
      case '1':
        addTask();
        break;
      case '2':
        removeTask();
        break;
      case '3':
        completeTask();
        break;
      case '4':
        showTasks();
        break;
      case '5':
        rl.close();
        break;
      default:
        console.log('Opción inválida. Por favor, seleccione un número del menú.');
        showMenu();
        break;
    }
  });
}
showMenu();

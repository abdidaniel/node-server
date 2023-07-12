const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let tasks = [];

function addTask() {
  return new Promise((resolve, reject) => {
    rl.question('Ingrese la descripción de la tarea: ', (description) => {
      if (description.trim() === '') {
        reject('La descripción de la tarea no puede estar vacía.');
      } else {
        const task = {
          id: tasks.length + 1,
          description,
          completed: false
        };
        tasks.push(task);
        console.log('Tarea añadida exitosamente.');
        resolve();
      }
    });
  });
}

function removeTask() {
  return new Promise((resolve, reject) => {
    rl.question('Ingrese el ID de la tarea que desea eliminar: ', (taskId) => {
      const taskIndex = tasks.findIndex(task => task.id === parseInt(taskId));
      if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        console.log('Tarea eliminada exitosamente.');
        resolve();
      } else {
        reject('No se encontró una tarea con ese ID.');
      }
    });
  });
}

function completeTask() {
  return new Promise((resolve, reject) => {
    rl.question('Ingrese el ID de la tarea que desea marcar como completada: ', (taskId) => {
      const task = tasks.find(task => task.id === parseInt(taskId));
      if (task) {
        task.completed = true;
        console.log('Tarea marcada como completada.');
        resolve();
      } else {
        reject('No se encontró una tarea con ese ID.');
      }
    });
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
}

async function showMenu() {
  console.log('\n--- Lista de tareas ---');
  console.log('1. Añadir tarea');
  console.log('2. Eliminar tarea');
  console.log('3. Marcar tarea como completada');
  console.log('4. Ver tareas');
  console.log('5. Salir');

  try {
    const choice = await new Promise((resolve) => {
      rl.question('Ingrese el número de la opción deseada: ', (choice) => {
        resolve(choice);
      });
    });

    switch (choice) {
      case '1':
        await new Promise((resolve) => setTimeout(resolve, 1800));
        await addTask().catch((error) => { throw new Error(error); });
        break;
      case '2':
        await new Promise((resolve) => setTimeout(resolve, 1800));
        await removeTask().catch((error) => { throw new Error(error); });
        break;
      case '3':
        await new Promise((resolve) => setTimeout(resolve, 1800));
        await completeTask().catch((error) => { throw new Error(error); });
        break;
      case '4':
        await new Promise((resolve) => setTimeout(resolve, 1800));
        showTasks();
        break;
      case '5':
        rl.close();
        break;
      default:
        throw new Error('Opción inválida. Por favor, seleccione un número del menú.');
    }

    showMenu();
  } catch (error) {
    console.log('Error:', error.message);
    showMenu();
  }
}

showMenu();
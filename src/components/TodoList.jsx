import { useState } from 'react';
import { nanoid } from 'nanoid';
import TodoItem from './TodoItem';

function TodoList() {
  const defaultTodo = {
    id: -1,
    task: '',
    isCompleted: false,
  };

  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState(defaultTodo);

  function handleInputChange(event) {
    setNewTodo({
      id: nanoid(),
      task: event.target.value,
      isCompleted: false,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (newTodo.task.trim() != '') {
      addTodo();
    }

    setNewTodo(defaultTodo);
  }

  function addTodo() {
    setTodos((t) => [{ ...newTodo, task: newTodo.task.trim() }, ...t]);
  }

  function deleteTodo(id) {
    return () => {
      const newTodos = todos.filter((todo) => todo.id !== id);

      console.log(newTodos);

      setTodos(newTodos);
    };
  }

  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold p-2">To-do App</h1>

      <form
        onSubmit={handleSubmit}
        className="p-5 m-5 border border-gray-200 w-[600px] grid grid-cols-[1fr_auto] gap-3"
      >
        <input
          type="text"
          placeholder="Write a task"
          value={newTodo.task}
          onChange={handleInputChange}
          className="outline-none focus:border-b border-b-gray-300 transition-all"
        />

        <button type="submit" className="p-1 cursor-pointer">
          Add
        </button>
      </form>

      <ul className="w-[600px]">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} />
        ))}
      </ul>
    </main>
  );
}

export default TodoList;

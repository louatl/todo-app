import PropTypes from 'prop-types';
import { useState } from 'react';

function TodoItem({ todo, todos, setTodos, deleteTodo, handleCheckbox }) {
  const [isEditable, setIsEditable] = useState(false);
  const [todoText, setTodoText] = useState(todo.task);

  function handleEdit() {
    if (todo.isCompleted) return;

    setIsEditable(!isEditable);
    setTodoText(todoText.trim());
    editTodo(todo.id);
  }

  function handleChange(event) {
    setTodoText(event.target.value);
  }

  function editTodo(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, task: todoText.trim() };
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  return (
    <li
      className={` p-5 my-3 w-full grid grid-cols-[auto_1fr_auto_auto] gap-4 ${todo.isCompleted ? 'bg-green-200' : 'bg-slate-100'}`}
      key={todo.id}
    >
      <input type="checkbox" className="cursor-pointer" onClick={handleCheckbox(todo.id)} />
      <input
        type="text"
        readOnly={!isEditable}
        value={todoText}
        className={`${isEditable ? 'outline-1' : 'outline-none'} outline-gray-200 p-2`}
        onChange={handleChange}
      />

      <button
        type="button"
        className={`w-18 ${todo.isCompleted ? 'bg-blue-700/50 hover:bg-blue-700/50 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-700/90 cursor-pointer'} ${isEditable ? 'bg-green-500 hover:bg-green-500/90' : ''} p-2 rounded-md text-center text-white transition-all`}
        onClick={handleEdit}
      >
        {isEditable ? 'Save' : 'Edit'}
      </button>
      <button
        type="button"
        onClick={deleteTodo(todo.id)}
        disabled={isEditable}
        className="w-18 cursor-pointer bg-red-500 p-2 rounded-md text-center text-white hover:bg-red-500/90 disabled:bg-red-500/70 disabled:cursor-not-allowed transition-all"
      >
        Delete
      </button>
    </li>
  );
}

TodoItem.propTypes = {
  todos: PropTypes.array.isRequired,
  setTodos: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    task: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
  }).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
};
export default TodoItem;

import PropTypes from 'prop-types';

function TodoItem({ todo, deleteTodo }) {
  return (
    <li className="bg-slate-100 p-5 my-3 w-full grid grid-cols-[auto_1fr_auto_auto] gap-4" key={todo.id}>
      <input type="checkbox" className="cursor-pointer" />
      <input type="text" readOnly value={todo.task} />

      <button 
      type="button" 
      className='w-20 cursor-pointer bg-blue-700 p-3 rounded-md text-center text-white hover:bg-blue-700/90 transition-all'
      >
        Edit
      </button>
      <button
        type="button"
        onClick={deleteTodo(todo.id)}
        className="w-20 cursor-pointer bg-red-500 p-3 rounded-md text-center text-white hover:bg-red-500/90 transition-all"
      >
        Delete
      </button>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string,
    task: PropTypes.string,
    isCompleted: PropTypes.bool,
  }).isRequired,
  deleteTodo: PropTypes.func,
};
export default TodoItem;

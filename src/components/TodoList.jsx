import { useFilterTodo } from '../contexts/TodoContext';
import CreateTodo from './CreateTodo';
import Todo from './Todo';
import ProgressBar from './common/ProgressBar';
import '../styles/TodoList.css';

function TodoList() {
  const filteredTodos = useFilterTodo();

  return (
    <div className="todo-list">
      <CreateTodo />
      <ul className="todos">
        {
            filteredTodos.map((todo) => <Todo todo={todo} text={todo.text} key={todo.id} />)
        }
      </ul>
      <ProgressBar />
    </div>
  );
}

export default TodoList;

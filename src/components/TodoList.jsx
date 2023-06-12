import { useFilteredTodos } from '../contexts/TodoContext';
import CreateTodo from './CreateTodo';
import Tabs from './common/Tabs';
import Todo from './Todo';
import ProgressBar from './common/ProgressBar';
import '../styles/TodoList.css';

function TodoList() {
  const filteredTodos = useFilteredTodos();

  return (
    <div className="todo-list">
      <Tabs tabs={['All', 'Completed', 'Uncompleted', 'Daily', 'Important']} />
      <CreateTodo />
      <ul className="todos">
        { filteredTodos.map((todo) => <Todo todo={todo} text={todo.text} key={todo.id} />) }
      </ul>
      <ProgressBar />
    </div>
  );
}

export default TodoList;

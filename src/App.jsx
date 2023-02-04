import { TodoProvider } from './contexts/TodoContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './layout/Header';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  return (
    <main id="main" className="app">
      <ThemeProvider>
        <TodoProvider>
          <Header />
          <TodoList />
        </TodoProvider>
      </ThemeProvider>
    </main>
  );
}

export default App;

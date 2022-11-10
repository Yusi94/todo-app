import { TodoProvider } from './components/contexts/TodoContext';
import { ThemeProvider } from './components/contexts/ThemeContext';
import Header from './components/Header';
import Todos from './components/Todos';
import './App.css';

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <TodoProvider>   
            <Header />   
            <Todos />  
        </TodoProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;

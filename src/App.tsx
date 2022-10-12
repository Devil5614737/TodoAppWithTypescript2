import React, { useEffect, useState } from "react";
import { Container } from "./components/Container";
import "./app.css";
import TodoInput from "./components/TodoInput";
import { Todos } from "./components/Todos";
import { toast, Toaster } from "react-hot-toast";
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";


export interface TodosI {
  id: number;
  text: string;
  isCompleted: boolean;
  editing?: boolean;
}

function App() {
  const [todos, setTodos] = useState<TodosI[]>(getTodosFromLocalStorage());

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function getTodosFromLocalStorage() {
    const todos = localStorage.getItem("todos");
    if (todos) {
      return JSON.parse(todos);
    } else {
      return [];
    }
  }

  const handleTheme = () => {
    const themeIsActive = localStorage.getItem("darktheme");
    if (themeIsActive) {
      localStorage.removeItem("darktheme");
      document.body.classList.remove("active");
    } else {
      localStorage.setItem("darktheme", "true");
      document.body.classList.add("active");
    }
  };

  useEffect(() => {
    const darkTheme = localStorage.getItem("darktheme");
    if (darkTheme) {
      document.body.classList.add("active");
    }
  }, []);

  const addTodo = (text: string) => {
    const todo = {
      id: Math.floor(Math.random() * 9999999999999),
      text,
      isCompleted: false,
    };

    if (text.length >= 40)
      return toast.error("todo should not be more than 40 word");
    if (!text) return toast.error("Todo should not be empty");
    setTodos([...todos, todo]);
  };
  const deleteTodo = (id: number) => {
    const remove = todos.filter((todo) => todo.id !== id);
    setTodos(remove);
    localStorage.setItem("todos", JSON.stringify(remove));
  };

  const handleEdit = (id: number, text: string) => {
    let edited = todos.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            editing: !todo.editing,
            text,
          }
        : { ...todo, editing: false, todo }
    );
    setTodos(edited);
    localStorage.setItem("todos", JSON.stringify(edited));
  };

  const handleCompleted = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              isCompleted: !todo.isCompleted,
            }
          : todo
      )
    );
  };

  return (
    <main className="main">
      <Container>
        <div className="wrapper">
          <h1>Todo App</h1>
          <TodoInput addTodo={addTodo} />
          <div className="todos-container">
            {todos?.map((todo) => (
              <Todos
                key={todo.id}
                todo={todo}
                deleteTodo={deleteTodo}
                handleEdit={handleEdit}
                handleCompleted={handleCompleted}
              />
            ))}
          </div>
        </div>
      </Container>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 1500,
          style: { fontSize: "1.5rem" },
        }}
      />
      <div className="theme-btn" onClick={handleTheme}>
        
          <MoonIcon style={{ width: 17, height: 17 }} />
      
      </div>
    </main>
  );
}

export default App;

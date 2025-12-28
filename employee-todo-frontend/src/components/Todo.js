import { useEffect, useState } from "react";
import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api/todos";


function Todo() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  // Get todos from backend
  useEffect(() => {
    axios.get(API_URL).then((res) => {
      setTodos(res.data);
    });
  }, []);

  // Add todo
  const addTodo = async () => {
    if (task === "") return;

    const res = await axios.post(API_URL, { task });
    setTodos([...todos, res.data]);
    setTask("");
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  return (
    <div>
      <h2>Employee Todo App</h2>

      <input
        type="text"
        placeholder="Enter task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.task}
            <button onClick={() => deleteTodo(todo._id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;

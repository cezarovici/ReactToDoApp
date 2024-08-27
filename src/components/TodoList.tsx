import React, { useState } from "react";
import TodoElement from "./TodoElement";

interface TodoElementProps {
  task: string;
  priority: Priority;
  done: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<TodoElementProps[]>([]);  
  const [newTask, setNewTask] = useState("");
  const [newPriority, setNewPriority] = useState<Priority>("Low");

  const handleAddTask = () => {
    if (newTask.trim()) {
      const newTodo: TodoElementProps = {
        task: newTask,
        priority: newPriority,
        done: false,
      };
      setTodos([...todos, newTodo]);
      setNewTask(""); // Clear the task input
    }
  };

  const toggleTaskDone = (index: number , done : boolean) => {
    console.log(index, done)
    
    const updatedTodos = todos.map((todo, i) =>
      (i === index && todo.done === done)? { ...todo, done: !todo.done } : todo
    );
    
    setTodos(updatedTodos);
    console.log(todos, updatedTodos)

  };

  return (
    <div>
      {/* Input Section */}
      <div className="grid grid-flow-col space-x-4">
        <label className="block">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter task"
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          />
        </label>

        <label className="block">
          <select
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value as Priority)}
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>

        <button onClick={handleAddTask} className="px-6 rounded bg-blue-300">
          Add Task
        </button>
      </div>

      <div className="grid grid-flow-col mt-4 space-x-4">
        {/* TO DO */}
        <ul className="w-1/2">
          <h2 className="font-bold text-lg mb-2">Tasks To Do</h2>
          {todos
            .filter((todo) => !todo.done)
            .map((todo, index) => (
              <TodoElement
                key={index}
                task={todo.task + " " + index}
                priority={todo.priority}
                done={todo.done}
                onToggle={() => toggleTaskDone(index , todo.done)}
              />              
            ))}
            
        </ul>

        {/* DONE */}
        <ul className="w-1/2">
          <h2 className="font-bold text-lg mb-2">Tasks Done</h2>
          {todos
            .filter((todo) => todo.done)
            .map((todo, index) => (
              <TodoElement
                key={index}
                task={todo.task}
                priority={todo.priority}
                done={todo.done}
                onToggle={() => toggleTaskDone(index , todo.done)}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}

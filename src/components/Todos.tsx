import {
  PencilSquareIcon,
  TrashIcon,
  CheckIcon,
} from "@heroicons/react/20/solid";
import React, { useState } from "react";
import { TodosI } from "../App";
import { motion } from "framer-motion";

interface PropsI {
  todo: TodosI;
  deleteTodo: (id: number) => void;
  handleEdit: (id: number, text: string) => void;
  handleCompleted: (id: number) => void;
}

export const Todos = ({
  todo,
  deleteTodo,
  handleEdit,
  handleCompleted,
}: PropsI) => {
  const [text, setText] = useState<string>(todo.text);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 ,y:-10}}
      animate={{ opacity: 1, scale: 1 ,y:0}}
      transition={{ duration: 0.4,ease:"anticipate" }}
      className="todos"
    >
      <div className="todos-text">
        <input
          readOnly
          type="checkbox"
          className="checkbox"
          checked={todo.isCompleted}
          onClick={() => {
            handleCompleted(todo.id);
          }}
        />
        {todo.editing ? (
          <input
            autoFocus
            type="text"
            value={text}
            className="edit-input"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setText(e.currentTarget.value)
            }
          />
        ) : todo.isCompleted ? (
          <p className="completed-todo">
            <s>{todo.text}</s>
          </p>
        ) : (
          <p>{todo.text}</p>
        )}
      </div>

      <div className="todos-icons">
        {todo.editing ? (
          <CheckIcon
            onClick={() => handleEdit(todo.id, text)}
            style={{ width: 17, height: 17, cursor: "pointer" }}
          />
        ) : (
          <PencilSquareIcon
            onClick={() => handleEdit(todo.id, text)}
            style={{ width: 17, height: 17, cursor: "pointer" }}
          />
        )}

        <TrashIcon
          style={{ width: 17, height: 17, cursor: "pointer" }}
          onClick={() => deleteTodo(todo.id)}
        />
      </div>
    </motion.div>
  );
};

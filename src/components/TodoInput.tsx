import React, { useState } from "react";
import { PlusSmallIcon, XCircleIcon } from "@heroicons/react/20/solid";

interface PropsI {
  addTodo: ( text: string) => void;
}

const TodoInput = ({ addTodo }: PropsI) => {
  const [text, setText] = useState<string>("");

  return (
    <form   onSubmit={(e) => {
      e.preventDefault()
      addTodo(text)
      setText("")
    }}className="form">
      <div className="input-container">
        <div className="icon" onClick={() =>{ addTodo(text)
        setText('')
        }}>
          <PlusSmallIcon style={{ width: 22, height: 22 }} />
        </div>
        <input
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setText(e.currentTarget.value)
          }
          type="text"
          placeholder="add a todo"
        />
        {text && (
          <XCircleIcon
            color="#4b4b4b"
            onClick={() => setText("")}
            style={{ width: 25, height: 25, cursor: "pointer" }}
          />
        )}
      </div>
    </form>
  );
};

export default TodoInput;

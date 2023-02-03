import { Tooltip } from "@nextui-org/react";
import { useState } from "react";
import {
  FaEllipsisH,
  FaHandPointer,
  FaRecycle,
  FaTrashAlt,
} from "react-icons/fa";

import Link from "next/link";

const Todo = ({ todo, onDeleteTodo, onChangePinstate, onEdit, onChecked }) => {
  const [checked, setChecked] = useState(todo.checked);
  const checkBoxHandler = (e) => {
    setChecked(e.currentTarget.checked);
    onChecked({ ...todo, checked: !checked });
    console.log(checked);
  };

  return (
    <li  key={todo.id} className="flex flex-row justify-between items-center space-y-6 pl-12 pr-8">
      <div className="flex justify-start items-center space-x-2">
        <input
          type="checkbox"
          value={checked}
          checked={checked}
          onChange={checkBoxHandler}
          className="w-6 h-6"
        />

        <p>
          <Link href="/todos/[id]" as={`/todos/${todo.id}`}>
            {todo.title}
          </Link>
        </p>
      </div>
      <div>
        <Tooltip
          trigger="click"
          content={
            <div className="flex flex-col space-y-2 p-2 w-32">
              <div className="flex items-center justify-start space-x-2">
                <FaHandPointer onClick={() => onChangePinstate(todo.id)} />
                <p>Pin on the top</p>
              </div>
              <div className="flex items-center justify-start space-x-2">
                <FaRecycle onClick={() => onEdit(todo)} />
                <p>Update</p>
              </div>
              <div className="flex items-center justify-start space-x-2">
                <FaTrashAlt onClick={() => onDeleteTodo(todo.id)} />
                <p>Delete</p>
              </div>
            </div>
          }
          placement="bottomEnd"
        >
          <FaEllipsisH />
        </Tooltip>
      </div>
    </li>
  );
};

export default Todo;

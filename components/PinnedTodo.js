import { Tooltip } from "@nextui-org/react";
import { useState } from "react";
import {
  FaEllipsisH,
  FaRecycle,
  FaTrashAlt,
  FaHandPointRight,
  FaHandPointDown,
} from "react-icons/fa";
import Link from "next/link";

const PinnedTodo = ({
  pinnedTodo,
  onDeletePinnedTodo,
  onChangePinstate,
  onEdit,
  onChecked,
}) => {
  const [checked, setChecked] = useState(pinnedTodo.checked);
  const checkBoxHandler = (e) => {
    setChecked(e.currentTarget.checked);
    onChecked({ ...pinnedTodo, checked: !checked });
    console.log(pinnedTodo);
  };

  return (
    <div className="flex justify-start items-center">
      <FaHandPointRight className="ml-4" />
      <li
        key={pinnedTodo.id}
        className="flex flex-row justify-between items-center space-y-6 ml-4 mr-8 grow "
      >
        <div className="flex justify-start items-center space-x-2">
          <input
            type="checkbox"
            value={checked}
            checked={checked}
            onChange={checkBoxHandler}
            className="w-6 h-6 "
          />
          <p>
            <Link href="/todos/[id]" as={`/todos/${pinnedTodo.id}`}>
              {pinnedTodo.title}
            </Link>
          </p>
        </div>
        <div>
          <Tooltip
            trigger="click"
            content={
              <div className="flex flex-col space-y-2 p-2 w-32">
                <div className="flex items-center justify-start space-x-2">
                  <FaHandPointDown
                    onClick={() => onChangePinstate(pinnedTodo.id)}
                  />
                  <p>Cancel pin</p>
                </div>
                <div className="flex items-center justify-start space-x-2">
                  <FaRecycle onClick={() => onEdit(pinnedTodo)} />
                  <p>Update</p>
                </div>
                <div className="flex items-center justify-start space-x-2">
                  <FaTrashAlt
                    onClick={() => onDeletePinnedTodo(pinnedTodo.id)}
                  />
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
    </div>
  );
};

export default PinnedTodo;

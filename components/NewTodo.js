
import { FaHandPointDown, FaAlignLeft } from "react-icons/fa";
import { useState } from "react";

const NewTodo = ({ onPostTodo }) => {
  const [todo, setTodo] = useState("");

  const onChangeHandler = (e) => {
    setTodo(e.target.value);
  };

  const onClickHandler = () => {
    if (todo !== "") {
      const newTodo = { title: todo };
      setTodo("");
      onPostTodo(newTodo);
    }
  };

  return (
    <div className="flex items-center justify-between pl-12 pr-8" >
      <div className="w-full relative flex items-center">
        {!todo && <FaAlignLeft className="absolute pl-1 text-[#21A7F9]" />}
        <input
          className="w-full border border-[#999C9F] p-2 pl-8 rounded-[4px]"
          type="text"
          placeholder="Add a task..."
          value={todo}
          onChange={onChangeHandler}
        />
      </div>
      <div>
        <FaHandPointDown
          onClick={onClickHandler}
          className="h-8 w-8 text-[#21A7F9]"
        />
      </div>
    </div>
  );
};

export default NewTodo;

// {/* <Input type='text' labelPlaceholder="Add a task" value={todo} contentLeft={<FaAlignLeft />} width='95%'bordered/> */}

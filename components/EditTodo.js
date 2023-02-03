import { FaCheck, FaAlignLeft, FaUndoAlt } from "react-icons/fa";

const EditTodo = ({ todo, onEditInputChange, onCloseEditing, onEdit }) => {
  return (
    <div className="flex justify-between items-center px-4" >
      <div className="relative flex items-center w-full">
        {<FaAlignLeft className="absolute pl-1 text-[#21A7F9]"/>}
        <input     
          type="text"
          placeholder="Edit todo..."
          value={todo.title}
          onChange={onEditInputChange}
          className='w-[95%] border border-[#999C9F] p-2 pl-8 rounded-[4px]'
        />
      </div>
      <div className="flex items-center justify-between w-12">
        <FaUndoAlt  onClick={onCloseEditing} />
        <FaCheck  onClick={onEdit} />
      </div>
    </div>
  );
};

export default EditTodo;

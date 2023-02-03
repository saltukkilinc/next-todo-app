import Todo from "./Todo";


const TodosList = ({
  todos,
  onDeleteTodo,
  onChangePinstate,
  onEdit,
  onChecked,
}) => {
  return (
    <ul className=" pb-6 mx-auto">
      {todos.map(
        (todo) =>
          !todo.pinned && (
            <Todo
              todo={todo}
              key={todo.id}
              onDeleteTodo={onDeleteTodo}
              onChangePinstate={onChangePinstate}
              onEdit={onEdit}
              onChecked={onChecked}
            />
          )
      )}
    </ul>
  );
};

export default TodosList;

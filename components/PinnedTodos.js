import PinnedTodo from "./PinnedTodo";



const PinnedTodos = ({
  pinnedTodos,
  onDeletePinnedTodo,
  onChangePinstate,
  onEdit,
  onChecked,
}) => {
  return (
    <ul className="  pb-4 ">
      {pinnedTodos &&
        pinnedTodos.map(
          (pinnedTodo) =>
            pinnedTodo.pinned && (
              <PinnedTodo
                onDeletePinnedTodo={onDeletePinnedTodo}
                onChangePinstate={onChangePinstate}
                onEdit={onEdit}
                pinnedTodo={pinnedTodo}
                key={pinnedTodo.id}
                onChecked={onChecked}
              />
            )
        )}
    </ul>
  );
};

export default PinnedTodos;

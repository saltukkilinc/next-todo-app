import EditTodo from "../components/EditTodo";
import PinnedTodos from "../components/PinnedTodos";
import Head from "next/head";
import { useState, useEffect } from "react";
import NewTodo from "../components/NewTodo";
import TodosList from "../components/TodosList";

export default function Home({ fetchStaticTodos }) {
  const [todos, setTodos] = useState(fetchStaticTodos);
  const [pinnedTodos, setPinnedTodos] = useState(fetchStaticTodos);

  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  // 1- Posting Data
  const postTodo = async (newTodo) => {
    const res = await fetch("http://localhost:3000/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    });

    const data = await res.json();

    setTodos((prevState) => {
      return [data, ...prevState];
    });
  };

  // 3a - change Pin State 1 (this Function will use for PinnedTodo Component) (for Pinning)
  const changePinState = async (id_) => {
    // First fetch data with clicked id
    const res = await fetch(`http://localhost:3000/api/todos/${id_}`);
    const data = await res.json();
    // changed pin state
    const changedData = { ...data, pinned: !data.pinned };

    // change at databese
    const resU = await fetch(`http://localhost:3000/api/todos/${id_}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(changedData),
    });

    const dataU = await resU.json();

    // Change pinned state (Take out this data from Pinned state)
    setPinnedTodos(
      pinnedTodos.map((todo) => {
        return todo.id === id_ ? { ...todo, pinned: dataU.pinned } : todo;
      })
    );

    // Add this changed data to unpinned state
    setTodos((prevState) => [dataU, ...prevState]);
  };

  // 3b- Change pin state 2 (this will use for Todo Component)  (for Pinning)
  const changePinState_2 = async (id_) => {
    // First fetch data with clicked id
    const res = await fetch(`http://localhost:3000/api/todos/${id_}`);
    const data = await res.json();
    // changed pin state
    const changedData = { ...data, pinned: !data.pinned };

    // change at databese
    const resU = await fetch(`http://localhost:3000/api/todos/${id_}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(changedData),
    });

    const dataU = await resU.json();

    // Change pinned state (Take out this data from Pinned state)
    setTodos(
      todos.map((todo) => {
        return todo.id === id_ ? { ...todo, pinned: dataU.pinned } : todo;
      })
    );

    // Add this changed data to unpinned state
    setPinnedTodos((prevState) => [dataU, ...prevState]);
  };

  // 4-a-)take value of edit input and add to currentodo state (for EDITING)
  function handleEditInputChange(e) {
    setCurrentTodo({ ...currentTodo, title: e.target.value });
  }

  // 4-b )edit input - open and asign value of todo to currenttodo (for EDITING)
  function handleEditClick(todo) {
    setIsEditing(true);

    setCurrentTodo({ ...todo });
  }

  // 4-d)edit input - close (for EDITING)
  function setIsEditingHandler() {
    setIsEditing(false);
  }

  // 4-c)-updateTodo (for EDITING)
  const updateTodo = async () => {
    const id = currentTodo.id.toString();
    const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: currentTodo.title }),
    });

    const data = await res.json();

    setTodos(
      todos.map((todo) =>
        todo.id === data.id ? { ...todo, title: data.title } : todo
      )
    );

    setPinnedTodos(
      pinnedTodos.map((todo) =>
        todo.id === data.id ? { ...todo, title: data.title } : todo
      )
    );
    setIsEditing(false);
  };

  // 5- Deleting Data
  const deleteTodo = async (deleteId) => {
    await fetch(`http://localhost:3000/api/todos/${deleteId}`, {
      method: "DELETE",
    });

    setTodos(todos.filter((todo) => todo.id !== deleteId));
    setPinnedTodos(todos.filter((todo) => todo.id !== deleteId));
  };

  // 6-) Checked Handler

  const checkedHandler = async (todo) => {
    const res = await fetch(
      `http://localhost:3000/api/todos/${todo.id.toString()}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...todo, checked: todo.checked }),
      }
    );

    const data = await res.json();

    setTodos(
      todos.map((todo) =>
        todo.id === data.id ? { ...todo, checked: data.checked } : todo
      )
    );

    // setPinnedTodos(todos.map( todo => (
    //   todo.id === data.id ? {...todo, checked: data.checked} : todo
    // )))
  };
  
  return (
    <div  className=" flex flex-col justify-start items-stretch bg-white  min-h-[500px] rounded sm:w-5/6 md:w-1/2 mt-32 mx-auto">
      <Head>
        <title>Todo App</title>
      </Head>
      <main>
        <div className="border-b mb-3">
          <h2 className="w-36 font-['Inter']  border-b-4 border-[#FF7964] text-center mx-auto text-[#194591] font-semibold text-[20px] ">To Do List</h2>
        </div>

        {isEditing ? (
          <EditTodo
            todo={currentTodo}
            onEditInputChange={handleEditInputChange}
            onCloseEditing={setIsEditingHandler}
            onEdit={updateTodo}
          />
        ) : (
          <div className="space-y-6 ">
            <NewTodo onPostTodo={postTodo} />
            <PinnedTodos
              pinnedTodos={pinnedTodos}
              onDeletePinnedTodo={deleteTodo}
              onChangePinstate={changePinState}
              onEdit={handleEditClick}
              onChecked={checkedHandler}
            />
            <div className="border ml-12 mr-8"></div>
            <TodosList
              todos={todos}
              onDeleteTodo={deleteTodo}
              onChangePinstate={changePinState_2}
              onEdit={handleEditClick}
              onChecked={checkedHandler}
            />
          </div>
        )}
      </main>
    </div>
  );
}

//2)fetching data get StaticProps

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:3000/api/todos");
  const fetchStaticTodos = await res.json();

  return {
    props: {
      fetchStaticTodos,
    },
  };
};

// // 2-b) Geting Data alternatif (It must be in the component not here)
// useEffect(() => {
//   const fecthTodo = async () => {
//     const res = await fetch('http://localhost:3000/api/todos');
//     const data = await res.json()
//     setTodos(data)
//   }
//   fecthTodo();
// }, [])

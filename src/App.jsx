import { useState } from "react";
import { Navbar } from "./component/Navbar";
import { v4 as uuidv4 } from "uuid";
import { IoMdAdd } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    setTodos(newtodos);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newtodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newtodos);
  };

  const handleDelete = (e, id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (isConfirmed) {
      let newtodos = todos.filter((item) => {
        return item.id !== id;
      });
      setTodos(newtodos);
    }
  };
  return (
    <>
      <Navbar />
      <div className="max-w-[60vw] flex flex-col items-center mx-auto my-5 bg-violet-100 rounded-xl p-5 min-h-[40vh]">
        <div className="addtodo my-5 w-11/12 flex justify-center">
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-1/2 p-2 rounded-full"
          />
          <button
            className="bg-indigo-800 hover:bg-indigo-950 p-4 font-bold text-white rounded-full mx-2"
            type="submit"
            onClick={handleAdd}
          >
            <IoMdAdd />
          </button>
        </div>

        <div className="w-10/12 flex flex-col">
          {todos.length === 0 && (
            <div className="m-5 mx-auto font-bold">No Todo Here</div>
          )}
          {todos.map((item) => {
            return (
              <div
                key={item.id}
                className="flex flex-row px-16 my-2 justify-between"
              >
                <div className="flex gap-4">
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    value={item.isCompleted}
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="button">
                  <button
                    className="bg-indigo-800 hover:bg-indigo-950 px-3 py-2 text-sm font-bold text-white rounded-lg mx-3 w-auto"
                    onClick={(e) => handleEdit(e, item.id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="bg-indigo-800 hover:bg-indigo-950 px-3 py-2 text-sm font-bold text-white rounded-lg mx-3"
                    onClick={(e) => handleDelete(e, item.id)}
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;

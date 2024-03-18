import "./App.css";
import { Todo } from "./components/todo/todo";

function App() {
  return (
    <div
      className="h-screen flex flex-col justify-start p-2 max-sm:p-0 max-sm:pt-6 overflow-y-auto pt-10 truncate"
      style={{
        background: "var(--gradient)",
      }}
    >
      <div className="max-h-[95vh] sm:max-h-[85vh] md:max-h-[80vh] w-screen md:w-[80%] truncate overflow-y-auto mx-auto border-2 border-transparent rounded-md  shadow-3xl  ">
        <Todo></Todo>
      </div>
    </div>
  );
}

export default App;

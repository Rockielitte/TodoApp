import "./App.css";
import { Todo } from "./components/todo/todo";

function App() {
  return (
    <div
      className="h-screen flex flex-col justify-start  max-sm:pt-6 overflow-y-auto pt-10 truncate p-2"
      style={{
        background: "var(--gradient)",
      }}
    >
      <div className="max-h-[95%] sm:max-h-[85%] md:max-h-[80%] w-full md:w-[80%] truncate overflow-y-auto mx-auto border-2 border-transparent rounded-md  shadow-3xl ">
        <Todo></Todo>
      </div>
    </div>
  );
}

export default App;

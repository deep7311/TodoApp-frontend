import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./components/Login";
import Register from "./components/Register";
import TodoList from "./components/TodoList";
import Header from "./components/Header";
import GuestTodo from "./components/GuestTodo";
import { AppContext } from "./context/AppContext";

import { AppProvider } from "./context/AppContext";
import { useContext } from "react";

function AppContent() {

  const { user } = useContext(AppContext);

  return (
    <>
      <Header />

      <main className="flex-1 p-4">
        <Routes>
          <Route
            path="/"
            element={user ? <TodoList /> : <GuestTodo />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

      </main>

      <ToastContainer />
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
      <BrowserRouter>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

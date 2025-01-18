import { RouterProvider } from "react-router-dom";
import Router from "./router/DefaultRouter";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={Router} />
    </ThemeProvider>
  );
}

export default App;

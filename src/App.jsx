import { Suspense } from "react";
import Loading from "./components/loading/Loading";
import { router } from "./routes/Routes/Routes";
import { RouterProvider } from "react-router";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router}></RouterProvider>
    </Suspense>
  );
}

export default App;

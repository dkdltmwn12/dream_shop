import { Outlet } from "react-router-dom";
import Navbar from "./components/header/Navbar";
import { AuthContextProvider } from "./components/context/AuthContext";
import { QueryClient, QueryClientProvider,} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const client = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={client}>
      <AuthContextProvider>
        <Navbar/>
        <Outlet/>
      </AuthContextProvider>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  );
}

export default App;

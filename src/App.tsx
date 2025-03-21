import { useEffect } from "react";
import { DogSearch } from "@/components/integrated/dog-search";
import { Login } from "@/components/integrated/login";
import { useAuth } from "@/context/auth-context";
function App() {
  const { isAuthenticated } = useAuth();
  useEffect(() => {}, [isAuthenticated]);

  return <>{!isAuthenticated ? <Login /> : <DogSearch />}</>;
}

export default App;

import { useAuth } from "../components/context/AuthContext";

const Home = () => {
  const data = useAuth();
  console.log(data);
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;

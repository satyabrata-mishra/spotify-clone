import { useEffect } from 'react';
import './App.css';
import Login from './Components/Login';
import Spotify from './Components/Spotify';
import { reducerCases } from './Utils/Constants';
import { useStateProvider } from './Utils/StateProvider';

function App() {
  const [{ token }, dispatch] = useStateProvider()
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      dispatch({ type: reducerCases.SET_TOKEN, token });
    }
  }, [token, dispatch]);

  return (
    <div>
      {
        token ? <Spotify /> : <Login />
      }
    </div>
  );
}

export default App;

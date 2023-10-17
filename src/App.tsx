import { useEffect, useState, useContext } from 'react';
import { app } from 'firebaseApp';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemeContext from 'context/ThemeContext';

import Router from './components/Router';
import Loader from 'components/Loader';

function App() {
  const context = useContext(ThemeContext);
  const auth = getAuth(app);
  // auth를 체크하기 전에 (initialize 전)에는 loader를 띄워주는 용도
  const [init, setInit] = useState<boolean>(false);
  // auth의 currentuser가 있으면 authenticated로 변경

  // firebase Auth가 인증되었으면 true로 변경해주는 로직 추가
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
    //currentUser => 로그인한 사용자가를 판별할 수 있음
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
    });

    setInit(true);
  }, [auth]);

  return (
    <div className={context.theme === 'light' ? 'white' : 'dark'}>
      <ToastContainer />
      {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
    </div>
  );
}

export default App;

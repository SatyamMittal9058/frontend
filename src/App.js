import './App.css';
import Body from './component/Body';
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div className="App">
      <Toaster position='button-top' toastOptions={{ duration: 5000 }} />
      <Body/>
    </div>
  );
}

export default App;

import { GameContainer } from "./GameContainer";
import "react-square-div/lib/styles.css";
import { StorageProvider } from "storage-provider";

const App: React.FC = () => (
  <StorageProvider>
    <GameContainer />
  </StorageProvider>
);

export default App;

import "react-square-div/lib/styles.css";
import { GameContainer } from "./game-container";
import { StorageProvider } from "storage-provider";

const App: React.FC = () => (
  <StorageProvider>
    <GameContainer />
  </StorageProvider>
);

export default App;

import Button from "./components/Button";
import Alert from "./components/Alert";
import { useState } from "react";

function App() {
  const [alertVisible, setAlertVisible] = useState(false);

  return (
    <div>
      {alertVisible && <Alert onClose={() => setAlertVisible(false)}>Alert something...</Alert>}
      <Button name="点我" onClick={() => setAlertVisible(!alertVisible)} type={"warning"} />
    </div>
  );
}

export default App;

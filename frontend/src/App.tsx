import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserPage } from "./pages/UserPage";
import { SupportPage } from "./pages/SupportPage";
import { Layout } from "./Layout";
import { SocketProvider } from "./providers/SocketProvider";
import { useState } from "react";
import { ConversationsProvider } from "./providers/ConversationProvider";

// import { v4 as uuidV4 } from "uuid";

function App() {
  const [id, setId] = useState("");
  return (
    <BrowserRouter>
      <SocketProvider id={id}>
        <ConversationsProvider id={id}>
          <Layout>
            <Routes>
              <Route path="/" element={<UserPage id={id} setId={setId} />} />
              <Route
                path="/support"
                element={<SupportPage id={id} setId={setId} />}
              />
            </Routes>
          </Layout>
        </ConversationsProvider>
      </SocketProvider>{" "}
    </BrowserRouter>
  );
}

export default App;

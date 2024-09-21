import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#5c98f2",
        },
      }}
    >
      <App />
    </ConfigProvider>
  </BrowserRouter>,
);

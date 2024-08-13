import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { createTamagui, TamaguiProvider } from "tamagui";
import defaultConfig from "@tamagui/config/v3";

const config = createTamagui(defaultConfig);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <TamaguiProvider config={config}>
            <App />
        </TamaguiProvider>
    </StrictMode>,
);

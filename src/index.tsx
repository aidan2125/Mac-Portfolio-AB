import React, { useState } from "react";
import { createRoot } from "react-dom/client";

import Desktop from "~/pages/Desktop";
import Login from "~/pages/Login";
import Boot from "~/pages/Boot";
import IOSHomeScreen from "~/pages/iOSHomeScreen";
import IOSLockScreen from "~/pages/IOSLockScreen";
import { useWindowSize } from "~/hooks";
import type { AppsData } from "~/types";
import "@unocss/reset/tailwind.css";
import "uno.css";
import "katex/dist/katex.min.css";
import "~/styles/index.css";

export default function App() {
  const { winWidth } = useWindowSize();
  const isMobile = winWidth < 1024;

  console.log("winWidth:", winWidth, "isMobile:", isMobile);

  const [login, setLogin] = useState<boolean>(false);
  const [booting, setBooting] = useState<boolean>(false);
  const [restart, setRestart] = useState<boolean>(false);
  const [sleep, setSleep] = useState<boolean>(false);
  const [activeMobileApp, setActiveMobileApp] = useState<AppsData | null>(null);

  const shutMac = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setRestart(false);
    setSleep(false);
    setLogin(false);
    setBooting(true);
  };

  const restartMac = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setRestart(true);
    setSleep(false);
    setLogin(false);
    setBooting(true);
  };

  const sleepMac = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setRestart(false);
    setSleep(true);
    setLogin(false);
    setBooting(true);
  };

  if (booting) {
    return <Boot restart={restart} sleep={sleep} setBooting={setBooting} />;
  }

  const handleMobileAppClick = (app: AppsData) => {
    if (app.id === "launchpad") {
      // launchpad is handled inside IOSHomeScreen
      return;
    }

    if (app.link) {
      window.open(app.link, "_blank");
      return;
    }

    if (app.content || app.desktop) {
      setActiveMobileApp(app);
      return;
    }

    if (app.id) {
      window.open(`https://portfolio.zxh.me/${app.id}`, "_blank");
    }
  };

  if (!login) {
    return isMobile ? (
      <IOSLockScreen onUnlock={() => setLogin(true)} />
    ) : (
      <Login
        setLogin={setLogin}
        shutMac={shutMac}
        sleepMac={sleepMac}
        restartMac={restartMac}
      />
    );
  }

  return isMobile ? (
    <IOSHomeScreen
      onAppClick={handleMobileAppClick}
      activeApp={activeMobileApp}
      closeApp={() => setActiveMobileApp(null)}
    />
  ) : (
    <Desktop
      setLogin={setLogin}
      shutMac={shutMac}
      sleepMac={sleepMac}
      restartMac={restartMac}
    />
  );
}

const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

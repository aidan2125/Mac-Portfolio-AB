import React, { useState, useRef } from "react";
import { apps } from "~/configs";
import type { AppsData } from "~/types";
import Launchpad from "~/components/Launchpad";

interface iOSHomeScreenProps {
  onAppClick: (app: AppsData) => void;
  activeApp: AppsData | null;
  closeApp: () => void;
}

const IOSHomeScreen: React.FC<iOSHomeScreenProps> = ({
  onAppClick,
  activeApp,
  closeApp
}) => {
  console.log("iOSHomeScreen mounted");

  const [pressedId, setPressedId] = useState<string | null>(null);
  const [showLaunchpad, setShowLaunchpad] = useState(false);

  const handleAppClick = (app: AppsData) => {
    if (app.id === "launchpad") {
      setShowLaunchpad(true);
      return;
    }

    if (app.content || app.desktop) {
      onAppClick(app);
      return;
    }

    onAppClick(app);
  };

  // Separate dock apps (last 4) from grid apps
  const gridApps = apps.slice(0, -4);
  const dockApps = apps.slice(-4);

  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });

  return (
    <div className="ios-home-screen">
      {/* STATUS BAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "14px 20px 0",
          paddingTop: "env(safe-area-inset-top, 14px)",
          height: "44px",
          flexShrink: 0,
          zIndex: 10
        }}
      >
        {/* Time */}
        <span
          style={{
            color: "#fff",
            fontSize: "15px",
            fontWeight: "600",
            letterSpacing: "-0.3px"
          }}
        >
          {timeStr}
        </span>

        {/* Dynamic Island placeholder */}
        <div
          style={{
            width: "120px",
            height: "34px",
            background: "#000",
            borderRadius: "20px",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            top: "env(safe-area-inset-top, 10px)"
          }}
        />

        {/* Right icons: signal, wifi, battery */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {/* Signal bars */}
          <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
            <rect x="0" y="7" width="3" height="5" rx="0.5" opacity="0.4" />
            <rect x="4.5" y="5" width="3" height="7" rx="0.5" opacity="0.6" />
            <rect x="9" y="2.5" width="3" height="9.5" rx="0.5" opacity="0.8" />
            <rect x="13.5" y="0" width="3" height="12" rx="0.5" />
          </svg>
          {/* WiFi */}
          <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
            <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
            <path
              d="M3.5 6.5a6.5 6.5 0 0 1 9 0"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d="M0.5 3.5a11 11 0 0 1 15 0"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              opacity="0.4"
            />
          </svg>
          {/* Battery */}
          <div style={{ display: "flex", alignItems: "center", gap: "1px" }}>
            <div
              style={{
                width: "25px",
                height: "12px",
                border: "1.5px solid rgba(255,255,255,0.7)",
                borderRadius: "3px",
                padding: "2px",
                display: "flex",
                alignItems: "center"
              }}
            >
              <div
                style={{
                  width: "75%",
                  height: "100%",
                  background: "#4cd964",
                  borderRadius: "1.5px"
                }}
              />
            </div>
            <div
              style={{
                width: "2px",
                height: "5px",
                background: "rgba(255,255,255,0.5)",
                borderRadius: "0 1px 1px 0"
              }}
            />
          </div>
        </div>
      </div>

      {/* DATE */}
      <div style={{ textAlign: "center", marginTop: "8px", flexShrink: 0 }}>
        <div
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: "16px",
            fontWeight: "400",
            letterSpacing: "0.2px"
          }}
        >
          {now.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric"
          })}
        </div>
      </div>

      {activeApp && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 50,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 16px",
              background: "rgba(255,255,255,0.1)"
            }}
          >
            <button
              onClick={closeApp}
              style={{
                border: "none",
                background: "rgba(255,255,255,0.2)",
                color: "white",
                padding: "8px 12px",
                borderRadius: "12px",
                fontSize: "14px",
                cursor: "pointer"
              }}
            >
              ← Close
            </button>
            <span style={{ fontSize: "16px", color: "white", fontWeight: 600 }}>
              {activeApp.title}
            </span>
            <div style={{ width: "60px" }} />
          </div>
          <div style={{ flex: 1, overflow: "auto", padding: "12px" }}>
            {activeApp.content}
          </div>
        </div>
      )}

      {/* APP GRID */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "24px 20px 0",
          scrollbarWidth: "none"
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px 8px",
            width: "100%"
          }}
        >
          {gridApps.map((app) => (
            <AppIcon
              key={app.id}
              app={app}
              pressed={pressedId === app.id}
              onPress={() => setPressedId(app.id)}
              onRelease={() => {
                setPressedId(null);
                handleAppClick(app);
              }}
            />
          ))}
        </div>
      </div>

      {/* DOCK */}
      <div
        style={{
          padding: "12px 16px",
          paddingBottom: "calc(env(safe-area-inset-bottom, 8px) + 8px)",
          flexShrink: 0
        }}
      >
        <div
          style={{
            background: "rgba(255, 255, 255, 0.18)",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            borderRadius: "26px",
            padding: "12px 16px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            border: "1px solid rgba(255,255,255,0.25)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)"
          }}
        >
          {dockApps.map((app) => (
            <AppIcon
              key={app.id}
              app={app}
              pressed={pressedId === app.id}
              onPress={() => setPressedId(app.id)}
              onRelease={() => {
                setPressedId(null);
                handleAppClick(app);
              }}
              size={60}
            />
          ))}
        </div>

        {/* Home indicator */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
          <div
            style={{
              width: "134px",
              height: "5px",
              background: "rgba(255,255,255,0.5)",
              borderRadius: "3px"
            }}
          />
        </div>
      </div>

      {/* Launchpad overlay from Files icon on mobile */}
      <Launchpad show={showLaunchpad} toggleLaunchpad={setShowLaunchpad} />
    </div>
  );
};

interface AppIconProps {
  app: AppsData;
  pressed: boolean;
  onPress: () => void;
  onRelease: () => void;
  size?: number;
}

const AppIcon: React.FC<AppIconProps> = ({
  app,
  pressed,
  onPress,
  onRelease,
  size = 56
}) => {
  const hasTouch = useRef(false);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    hasTouch.current = true;
    onPress();
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onRelease();

    window.setTimeout(() => {
      hasTouch.current = false;
    }, 500);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (hasTouch.current) return;
    event.preventDefault();
    onPress();
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    if (hasTouch.current) return;
    event.preventDefault();
    onRelease();
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        gap: "6px",
        transform: pressed ? "scale(0.88)" : "scale(1)",
        transition: "transform 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        WebkitTapHighlightColor: "transparent"
      }}
    >
      <img
        src={app.img}
        alt={app.title}
        draggable={false}
        style={{
          width: size,
          height: size,
          borderRadius: "14px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.4), 0 1px 3px rgba(0,0,0,0.2)",
          objectFit: "cover"
        }}
      />
      <span
        style={{
          fontSize: "11px",
          color: "#fff",
          textAlign: "center",
          fontWeight: "400",
          textShadow: "0 1px 3px rgba(0,0,0,0.8)",
          lineHeight: "1.2",
          maxWidth: "72px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          letterSpacing: "0.1px"
        }}
      >
        {app.title}
      </span>
    </div>
  );
};

export default IOSHomeScreen;

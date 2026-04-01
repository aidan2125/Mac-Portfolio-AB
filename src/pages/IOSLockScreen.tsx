import React, { useState, useEffect } from "react";
import { wallpapers } from "~/configs";

interface IOSLockScreenProps {
  onUnlock: () => void;
}

export default function IOSLockScreen({ onUnlock }: IOSLockScreenProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showFaceId, setShowFaceId] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  useEffect(() => {
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000);

    const faceIdTimer = window.setTimeout(() => {
      setShowFaceId(true);
      setShowSwipeHint(false);
      const unlockTimer = window.setTimeout(() => {
        onUnlock();
      }, 1800);
      return () => clearTimeout(unlockTimer);
    }, 1500);

    return () => {
      clearInterval(timeInterval);
      clearTimeout(faceIdTimer);
    };
  }, [onUnlock]);

  const wallpaper = wallpapers.night;
  const timeString = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
  const dateString = currentTime.toLocaleDateString([], {
    weekday: "long",
    day: "numeric",
    month: "long"
  });

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif"
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `url(${wallpaper}) center/cover no-repeat`,
          filter: "brightness(0.8)",
          zIndex: 1
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0.4) 100%)",
          zIndex: 2
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "env(safe-area-inset-top, 12px)",
          left: "50%",
          transform: "translateX(-50%)",
          width: "126px",
          height: "37px",
          background: "#000",
          borderRadius: "20px",
          zIndex: 4
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "env(safe-area-inset-top, 14px)",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
          zIndex: 5,
          height: "37px"
        }}
      >
        <span
          style={{
            fontSize: "15px",
            fontWeight: 600,
            color: "white",
            letterSpacing: "-0.3px"
          }}
        >
          {timeString}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
            <rect x="0" y="7" width="3" height="5" rx="0.5" opacity="0.4" />
            <rect x="4.5" y="5" width="3" height="7" rx="0.5" opacity="0.6" />
            <rect x="9" y="2.5" width="3" height="9.5" rx="0.5" opacity="0.8" />
            <rect x="13.5" y="0" width="3" height="12" rx="0.5" />
          </svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
            <circle cx="8" cy="11" r="1.5" />
            <path
              d="M4.5 7.5a5 5 0 0 1 7 0"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d="M1.5 4.5a9.5 9.5 0 0 1 13 0"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              opacity="0.4"
            />
          </svg>
          <div style={{ display: "flex", alignItems: "center" }}>
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
                borderRadius: "0 1px 1px 0",
                marginLeft: "1px"
              }}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "26%",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          zIndex: 4
        }}
      >
        <div
          style={{
            fontSize: "clamp(76px, 22vw, 100px)",
            fontWeight: 100,
            color: "white",
            letterSpacing: "-4px",
            lineHeight: 1
          }}
        >
          {timeString}
        </div>
        <div
          style={{
            fontSize: "17px",
            fontWeight: 400,
            color: "rgba(255,255,255,0.85)",
            marginTop: "6px"
          }}
        >
          {dateString}
        </div>
        <div
          style={{
            display: "inline-block",
            marginTop: "14px",
            fontSize: "13px",
            color: "white",
            border: "1px solid rgba(255,255,255,0.4)",
            borderRadius: "20px",
            padding: "4px 14px",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            cursor: "default"
          }}
        >
          Customise
        </div>
      </div>

      {showSwipeHint && (
        <div
          className="ios-swipe-hint"
          style={{
            position: "absolute",
            bottom: "calc(env(safe-area-inset-bottom, 16px) + 116px)",
            left: 0,
            right: 0,
            textAlign: "center",
            fontSize: "14px",
            fontWeight: 500,
            color: "rgba(255,255,255,0.55)",
            zIndex: 4
          }}
        >
          Swipe Up to Open
        </div>
      )}

      <div
        style={{
          position: "absolute",
          bottom: "calc(env(safe-area-inset-bottom, 16px) + 52px)",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          padding: "0 36px",
          zIndex: 4
        }}
      >
        <div
          className="ios-widget"
          style={{
            width: "50px",
            height: "50px",
            background: "rgba(255,255,255,0.22)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            border: "1px solid rgba(255,255,255,0.15)"
          }}
        >
          <svg width="20" height="22" viewBox="0 0 20 22" fill="white">
            <path d="M7 2h6l-1 8h4l-8 10 2-8H6L7 2z" />
          </svg>
        </div>
        <div
          className="ios-widget"
          style={{
            width: "50px",
            height: "50px",
            background: "rgba(255,255,255,0.22)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            border: "1px solid rgba(255,255,255,0.15)"
          }}
        >
          <svg width="22" height="20" viewBox="0 0 22 20" fill="white">
            <path
              d="M8 2l-1.5 2H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3.5L14 2H8z"
              opacity="0.9"
            />
            <circle
              cx="11"
              cy="10"
              r="3.2"
              fill="rgba(255,255,255,0.3)"
              stroke="white"
              strokeWidth="1.2"
            />
            <circle cx="11" cy="10" r="1.4" fill="white" opacity="0.6" />
          </svg>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "env(safe-area-inset-bottom, 10px)",
          left: "50%",
          transform: "translateX(-50%)",
          width: "134px",
          height: "5px",
          background: "rgba(255,255,255,0.5)",
          borderRadius: "3px",
          zIndex: 4
        }}
      />

      {showFaceId && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "64px",
            height: "64px",
            marginTop: "-32px",
            marginLeft: "-32px",
            border: "1.5px solid rgba(255,255,255,0.9)",
            borderRadius: "18px",
            zIndex: 6,
            animation: "faceIdPulse 1.3s ease-in-out forwards"
          }}
        />
      )}

      <style>{`
        @keyframes faceIdPulse {
          0%   { opacity: 0; transform: scale(1); }
          20%  { opacity: 1; transform: scale(1); }
          50%  { opacity: 1; transform: scale(1.06); }
          80%  { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1); }
        }
        @keyframes swipeBounce {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        .ios-swipe-hint { animation: swipeBounce 2s ease-in-out infinite; }
        .ios-widget { transition: transform 0.12s ease; }
        .ios-widget:active { transform: scale(0.88); }
      `}</style>
    </div>
  );
}

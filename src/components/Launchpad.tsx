import { useState } from "react";
import { wallpapers, launchpadApps } from "~/configs";
// import { useStore } from "~/store";

interface LaunchpadProps {
  show: boolean;
  toggleLaunchpad: (target: boolean) => void;
}

const placeholderText = "Search";
const ICON_SIZE = 64;

export default function Launchpad({ show, toggleLaunchpad }: LaunchpadProps) {
  const dark = false;

  const [searchText, setSearchText] = useState("");
  const [focus, setFocus] = useState(false);

  const filteredApps = searchText.trim()
    ? launchpadApps.filter((item) => {
        const text = searchText.toLowerCase();
        return (
          item.title.toLowerCase().includes(text) || item.id.toLowerCase().includes(text)
        );
      })
    : launchpadApps;

  const visibilityClass = show
    ? ""
    : "opacity-0 invisible transition-opacity duration-200";

  return (
    <div
      className={`${visibilityClass} fixed inset-0 z-30 overflow-hidden bg-cover bg-center scale-110`}
      id="launchpad"
      style={{
        backgroundImage: `url(${dark ? wallpapers.night : wallpapers.day})`
      }}
      onClick={() => toggleLaunchpad(false)}
    >
      <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-2xl flex flex-col launchpad-shell">
        {/* Search Bar */}
        <div
          className="mx-auto mt-5 flex h-10 w-72 items-center rounded-md border border-gray-200/30 bg-gray-200/10 px-2 transition-all launchpad-search"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={`flex items-center justify-end transition-all ${
              focus ? "w-6 duration-200" : "w-20 delay-150"
            }`}
          >
            <span className="i-bx:search ml-1 text-white" aria-hidden="true" />
          </div>

          <input
            className="min-w-0 flex-1 bg-transparent px-2 text-sm text-white outline-none placeholder:text-white/70"
            placeholder={placeholderText}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            aria-label="Search apps"
          />
        </div>

        {/* Apps Grid */}
        <div className="w-full px-6 pt-8">
          <div
            className="mx-auto grid gap-8 sm:gap-10 launchpad-grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(96px, 1fr))",
              maxWidth: "900px"
            }}
          >
            {filteredApps.map((app) => {
              const isExternal =
                app.link.startsWith("http") || app.link.startsWith("mailto:");

              return (
                <a
                  key={`launchpad-${app.id}`}
                  href={app.link}
                  target={isExternal ? "_blank" : "_self"}
                  rel={isExternal ? "noreferrer" : undefined}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (app.link === "#") e.preventDefault();
                  }}
                  className="group flex flex-col items-center gap-2 transition-transform duration-200 hover:scale-110 active:scale-95 launchpad-item"
                >
                  {/* Icon Container */}
                  <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm transition-colors group-hover:bg-white/10 launchpad-icon-wrap">
                    <img
                      src={app.img}
                      alt={app.title}
                      width={ICON_SIZE}
                      height={ICON_SIZE}
                      className="h-14 w-14 object-contain launchpad-icon"
                      loading="lazy"
                    />
                  </div>

                  {/* Title */}
                  <span className="w-20 text-center text-xs text-white line-clamp-2 launchpad-label">
                    {app.title}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useCallback, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeExternalLinks from "rehype-external-links";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import bear from "~/configs/bear";
import type { BearMdData } from "~/types";
import { useWindowSize } from "~/hooks/useWindowSize";

interface ContentProps {
  contentID: string;
  contentURL: string;
  title?: string | boolean;
  newNoteBody?: string;
}

interface MiddlebarProps {
  items: BearMdData[];
  cur: number;
  search: string;
  onSearch: (v: string) => void;
  onNewNote: () => void;
  setContent: (id: string, url: string, index: number) => void;
  folderTitle: string;
}

interface SidebarProps {
  cur: number;
  setMidBar: (items: BearMdData[], index: number) => void;
  collapsed: boolean;
  onToggle: () => void;
}

interface BearState {
  contentID: string;
  contentURL: string;
  curSidebar: number;
  curMidbar: number;
  midbarList: BearMdData[];
  newNoteBody?: string;
  activeTitle?: string;
}

const Highlighter = () => ({
  code({ inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || "");

    return !inline && match ? (
      <SyntaxHighlighter
        style={oneLight}
        language={match[1]}
        PreTag="div"
        customStyle={{
          borderRadius: "10px",
          border: "1px solid #e8e5dd",
          background: "#f5f4ef",
          fontSize: "13px",
          lineHeight: "1.6",
          margin: "16px 0"
        }}
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code
        style={{
          background: "#f0ede6",
          padding: "2px 6px",
          borderRadius: "4px",
          fontSize: "13px",
          fontFamily: "'SF Mono', 'Fira Code', monospace",
          color: "#5c5c5e"
        }}
      >
        {children}
      </code>
    );
  }
});

const Sidebar = ({ cur, setMidBar, collapsed, onToggle }: SidebarProps) => {
  return (
    <aside
      style={{
        width: collapsed ? 0 : 210,
        minWidth: collapsed ? 0 : 210,
        overflow: "hidden",
        background: "#f0ede6",
        borderRight: "1px solid #dddad2",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.25s ease, min-width 0.25s ease",
        flexShrink: 0
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 14px 10px"
        }}
      >
        <p
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#1c1c1e",
            letterSpacing: "-0.5px",
            margin: 0
          }}
        >
          Notes
        </p>

        <button
          onClick={onToggle}
          title={collapsed ? "Show sidebar" : "Hide sidebar"}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 12,
            color: "#6c6c70",
            padding: 4,
            borderRadius: 6
          }}
        >
          ◀
        </button>
      </div>

      <p
        style={{
          padding: "10px 14px 4px",
          fontSize: 11,
          fontWeight: 600,
          color: "#8e8e93",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          margin: 0
        }}
      >
        iCloud
      </p>

      <nav style={{ flex: 1, overflowY: "auto", padding: "0 6px" }}>
        {bear.map((item, index) => {
          const isActive = cur === index;

          return (
            <button
              key={`sidebar-${item.id}`}
              onClick={() => setMidBar(item.md, index)}
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                padding: "7px 10px",
                borderRadius: 8,
                marginBottom: 1,
                border: "none",
                cursor: "pointer",
                background: isActive ? "#ffd60a" : "transparent",
                color: "#3c3c43",
                fontSize: 13.5,
                fontWeight: isActive ? 600 : 400,
                textAlign: "left",
                transition: "background 0.15s ease"
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "rgba(0,0,0,0.06)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                }
              }}
            >
              <span
                style={{
                  flex: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }}
              >
                {item.title}
              </span>
              <span
                style={{
                  fontSize: 12,
                  color: isActive ? "rgba(0,0,0,0.45)" : "#c7c7cc"
                }}
              >
                {item.md.length}
              </span>
            </button>
          );
        })}
      </nav>

      <div style={{ padding: "10px 14px", borderTop: "1px solid #dddad2" }}>
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 13,
            color: "#8e8e93",
            display: "flex",
            alignItems: "center",
            gap: 6
          }}
        >
          <span>⚙</span> Settings
        </button>
      </div>
    </aside>
  );
};

const Middlebar = ({
  items,
  cur,
  search,
  onSearch,
  onNewNote,
  setContent,
  folderTitle
}: MiddlebarProps) => {
  const filtered = items.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      (item.excerpt || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section
      style={{
        width: 260,
        minWidth: 260,
        background: "#fffef9",
        borderRight: "1px solid #e8e5dd",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0
      }}
    >
      <div
        style={{
          padding: "14px 14px 10px",
          borderBottom: "1px solid #e8e5dd"
        }}
      >
        <p
          style={{
            fontSize: 17,
            fontWeight: 700,
            color: "#1c1c1e",
            marginBottom: 10,
            letterSpacing: "-0.3px"
          }}
        >
          {folderTitle}
        </p>

        <div style={{ position: "relative", marginBottom: 8 }}>
          <span
            style={{
              position: "absolute",
              left: 9,
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: 12,
              color: "#8e8e93",
              pointerEvents: "none"
            }}
          >
            🔍
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search"
            style={{
              width: "100%",
              background: "rgba(142,142,147,0.12)",
              border: "none",
              borderRadius: 8,
              padding: "6px 10px 6px 28px",
              fontSize: 13,
              color: "#3c3c43",
              outline: "none",
              fontFamily: "inherit"
            }}
          />
        </div>

        <button
          onClick={onNewNote}
          style={{
            width: "100%",
            background: "none",
            border: "1px solid #dddad2",
            borderRadius: 8,
            padding: "6px 10px",
            fontSize: 13,
            color: "#8a7200",
            fontWeight: 500,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            fontFamily: "inherit",
            transition: "background 0.15s ease"
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#ffd60a22";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "none";
          }}
        >
          ＋ New Note
        </button>
      </div>

      <ul
        style={{ flex: 1, overflowY: "auto", listStyle: "none", margin: 0, padding: 0 }}
      >
        {filtered.length === 0 && (
          <li
            style={{
              padding: "24px 14px",
              textAlign: "center",
              color: "#8e8e93",
              fontSize: 13
            }}
          >
            No notes found
          </li>
        )}

        {filtered.map((item) => {
          const originalIndex = items.indexOf(item);
          const isActive = cur === originalIndex;

          return (
            <li
              key={`midbar-${item.id}`}
              onClick={() => setContent(item.id, item.file, originalIndex)}
              style={{
                padding: "11px 14px",
                borderBottom: "1px solid #f0ede6",
                borderLeft: isActive ? "3px solid #ffd60a" : "3px solid transparent",
                background: isActive ? "rgba(255,214,10,0.10)" : "transparent",
                cursor: "pointer",
                transition: "background 0.12s ease"
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLLIElement).style.background = "#faf9f4";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLLIElement).style.background = "transparent";
                }
              }}
            >
              <p
                style={{
                  fontSize: 13.5,
                  fontWeight: 600,
                  color: "#1c1c1e",
                  marginBottom: 2,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis"
                }}
              >
                {item.title}
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: "#6c6c70",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis"
                }}
              >
                {item.excerpt || "No additional text"}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

const getRepoURL = (url: string) => url.slice(0, -10) + "/";

const fixImageURL = (text: string, contentURL: string): string => {
  let updatedText = text.replace(/&nbsp;/g, "");

  if (contentURL.includes("raw.githubusercontent.com")) {
    const repoURL = getRepoURL(contentURL);
    const imgReg = /!\[(.*?)\]\((.*?)\)/;
    const imgRegGlobal = /!\[(.*?)\]\((.*?)\)/g;
    const imgList = updatedText.match(imgRegGlobal);

    if (imgList) {
      for (const img of imgList) {
        const imgURL = (img.match(imgReg) as string[])[2];
        if (imgURL.includes("http")) continue;
        updatedText = updatedText.replace(imgURL, repoURL + imgURL);
      }
    }
  }

  return updatedText;
};

const Content = ({ contentID, contentURL, title, newNoteBody }: ContentProps) => {
  const [storeMd, setStoreMd] = useState<{ [key: string]: string }>({});
  const components = Highlighter();

  const fetchMarkdown = useCallback(
    (id: string, url: string) => {
      if (!storeMd[id] && url) {
        fetch(url)
          .then((r) => r.text())
          .then((text) => {
            setStoreMd((prev) => ({ ...prev, [id]: fixImageURL(text, url) }));
          })
          .catch(console.error);
      }
    },
    [storeMd]
  );

  useEffect(() => {
    if (contentID && contentURL) {
      fetchMarkdown(contentID, contentURL);
    }
  }, [contentID, contentURL, fetchMarkdown]);

  const body = newNoteBody !== undefined ? newNoteBody : storeMd[contentID];

  if (!contentID) {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fffef9"
        }}
      >
        <div style={{ textAlign: "center", color: "#8e8e93" }}>
          <p style={{ fontSize: 40, marginBottom: 12 }}>📝</p>
          <p
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#3c3c43",
              marginBottom: 6
            }}
          >
            No Note Selected
          </p>
          <p style={{ fontSize: 13 }}>Select a note from the list or create a new one.</p>
        </div>
      </div>
    );
  }

  const now = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <article
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: "#fffef9",
        overflow: "hidden",
        minWidth: 0
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "10px 16px",
          borderBottom: "1px solid #e8e5dd"
        }}
      >
        {[
          ["✏️", "Edit"],
          ["⬡", "Format"],
          ["⋯", "More"]
        ].map(([icon, label]) => (
          <button
            key={label}
            title={label}
            style={{
              background: "none",
              border: "none",
              width: 30,
              height: 30,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: 14,
              color: "#8e8e93"
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(0,0,0,0.06)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "none";
            }}
          >
            {icon}
          </button>
        ))}

        <div style={{ flex: 1 }} />

        {[
          ["🔗", "Share"],
          ["🖊️", "Draw"]
        ].map(([icon, label]) => (
          <button
            key={label}
            title={label}
            style={{
              background: "none",
              border: "none",
              width: 30,
              height: 30,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: 14,
              color: "#8e8e93"
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(0,0,0,0.06)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "none";
            }}
          >
            {icon}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "28px 36px 60px" }}>
          {title && typeof title === "string" && (
            <>
              <h1
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#1c1c1e",
                  letterSpacing: "-0.5px",
                  marginBottom: 6,
                  lineHeight: 1.3
                }}
              >
                {title}
              </h1>
              <p style={{ fontSize: 12, color: "#8e8e93", marginBottom: 28 }}>{now}</p>
            </>
          )}

          <div
            style={{ fontSize: 15, lineHeight: 1.75, color: "#3c3c43" }}
            className="apple-notes-markdown"
          >
            {body !== undefined ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[
                  rehypeKatex,
                  [rehypeExternalLinks, { target: "_blank", rel: "noopener noreferrer" }]
                ]}
                components={components}
              >
                {body}
              </ReactMarkdown>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  color: "#8e8e93",
                  fontSize: 13
                }}
              >
                <span>Loading…</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

const DesktopNotesLayout = ({
  state,
  setState,
  search,
  setSearch,
  sidebarCollapsed,
  setSidebarCollapsed,
  newNoteCounter,
  setNewNoteCounter
}: {
  state: BearState;
  setState: React.Dispatch<React.SetStateAction<BearState>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  newNoteCounter: number;
  setNewNoteCounter: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const setMidBar = (items: BearMdData[], index: number) => {
    setState({
      curSidebar: index,
      curMidbar: 0,
      midbarList: items,
      contentID: items[0]?.id ?? "",
      contentURL: items[0]?.file ?? "",
      activeTitle: items[0]?.title,
      newNoteBody: undefined
    });
    setSearch("");
  };

  const setContent = (id: string, url: string, index: number) => {
    setState((prev) => ({
      ...prev,
      curMidbar: index,
      contentID: id,
      contentURL: url,
      activeTitle: prev.midbarList[index]?.title,
      newNoteBody: undefined
    }));
  };

  const handleNewNote = () => {
    const count = newNoteCounter + 1;
    setNewNoteCounter(count);

    const newTitle = `New Note ${count}`;
    const tempNote: BearMdData = {
      id: `new-note-${count}`,
      title: newTitle,
      file: "",
      excerpt: "Start writing your note here…",
      icon: "i-ph:note"
    };

    const newList = [tempNote, ...state.midbarList];

    setState((prev) => ({
      ...prev,
      midbarList: newList,
      curMidbar: 0,
      contentID: tempNote.id,
      contentURL: "",
      activeTitle: newTitle,
      newNoteBody: ""
    }));
  };

  const folderTitle = bear[state.curSidebar]?.title ?? "Notes";

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        height: "100%",
        fontFamily: "-apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif",
        background: "#fffef9",
        overflow: "hidden"
      }}
    >
      {sidebarCollapsed && (
        <button
          onClick={() => setSidebarCollapsed(false)}
          title="Show sidebar"
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            zIndex: 100,
            background: "rgba(240,237,230,0.96)",
            border: "1px solid #dddad2",
            borderRadius: 8,
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: 11,
            color: "#6c6c70",
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)"
          }}
        >
          ▶
        </button>
      )}

      <Sidebar
        cur={state.curSidebar}
        setMidBar={setMidBar}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((v) => !v)}
      />

      <Middlebar
        items={state.midbarList}
        cur={state.curMidbar}
        search={search}
        onSearch={setSearch}
        onNewNote={handleNewNote}
        setContent={setContent}
        folderTitle={folderTitle}
      />

      <Content
        contentID={state.contentID}
        contentURL={state.contentURL}
        title={state.activeTitle}
        newNoteBody={state.newNoteBody}
      />
    </div>
  );
};

const MobileNotesLayout = ({
  state,
  setState,
  search,
  setSearch,
  newNoteCounter,
  setNewNoteCounter
}: {
  state: BearState;
  setState: React.Dispatch<React.SetStateAction<BearState>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  newNoteCounter: number;
  setNewNoteCounter: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [view, setView] = useState<"folders" | "notes" | "note">("notes");

  const setMidBar = (items: BearMdData[], index: number) => {
    setState({
      curSidebar: index,
      curMidbar: 0,
      midbarList: items,
      contentID: items[0]?.id ?? "",
      contentURL: items[0]?.file ?? "",
      activeTitle: items[0]?.title,
      newNoteBody: undefined
    });
    setSearch("");
    setView("notes");
  };

  const setContent = (id: string, url: string, index: number) => {
    setState((prev) => ({
      ...prev,
      curMidbar: index,
      contentID: id,
      contentURL: url,
      activeTitle: prev.midbarList[index]?.title,
      newNoteBody: undefined
    }));
    setView("note");
  };

  const handleNewNote = () => {
    const count = newNoteCounter + 1;
    setNewNoteCounter(count);

    const newTitle = `New Note ${count}`;
    const tempNote: BearMdData = {
      id: `new-note-${count}`,
      title: newTitle,
      file: "",
      excerpt: "Start writing your note here…",
      icon: "i-ph:note"
    };

    const newList = [tempNote, ...state.midbarList];

    setState((prev) => ({
      ...prev,
      midbarList: newList,
      curMidbar: 0,
      contentID: tempNote.id,
      contentURL: "",
      activeTitle: newTitle,
      newNoteBody: ""
    }));
  };

  const folderTitle = bear[state.curSidebar]?.title ?? "Notes";

  if (view === "folders") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          fontFamily: "-apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif",
          background: "#f0ede6"
        }}
      >
        <div
          style={{
            padding: "16px",
            borderBottom: "1px solid #dddad2",
            background: "#fffef9"
          }}
        >
          <h1
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#1c1c1e",
              margin: 0,
              letterSpacing: "-0.5px"
            }}
          >
            Notes
          </h1>
        </div>
        <nav style={{ flex: 1, overflowY: "auto", padding: "8px" }}>
          {bear.map((item, index) => {
            const isActive = state.curSidebar === index;
            return (
              <button
                key={`mobile-folder-${item.id}`}
                onClick={() => setMidBar(item.md, index)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: 12,
                  marginBottom: 4,
                  border: "none",
                  cursor: "pointer",
                  background: isActive ? "#ffd60a" : "#fffef9",
                  color: "#3c3c43",
                  fontSize: 16,
                  fontWeight: isActive ? 600 : 400,
                  textAlign: "left",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
                }}
              >
                <span
                  style={{
                    flex: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  }}
                >
                  {item.title}
                </span>
                <span
                  style={{
                    fontSize: 14,
                    color: isActive ? "rgba(0,0,0,0.45)" : "#c7c7cc"
                  }}
                >
                  {item.md.length}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    );
  }

  if (view === "notes") {
    const filtered = state.midbarList.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        (item.excerpt || "").toLowerCase().includes(search.toLowerCase())
    );

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          fontFamily: "-apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif",
          background: "#fffef9"
        }}
      >
        <div
          style={{
            padding: "16px",
            borderBottom: "1px solid #e8e5dd",
            background: "#fffef9"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={() => setView("folders")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 16,
                color: "#007aff",
                padding: 4
              }}
            >
              📁
            </button>
            <h1
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#1c1c1e",
                margin: 0,
                letterSpacing: "-0.3px",
                flex: 1
              }}
            >
              {folderTitle}
            </h1>
            <button
              onClick={handleNewNote}
              style={{
                background: "#ffd60a",
                border: "none",
                borderRadius: 20,
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: 20,
                color: "#1c1c1e"
              }}
            >
              ＋
            </button>
          </div>
          <div style={{ position: "relative", marginTop: 12 }}>
            <span
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: 14,
                color: "#8e8e93",
                pointerEvents: "none"
              }}
            >
              🔍
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              style={{
                width: "100%",
                background: "rgba(142,142,147,0.12)",
                border: "none",
                borderRadius: 10,
                padding: "10px 12px 10px 36px",
                fontSize: 16,
                color: "#3c3c43",
                outline: "none",
                fontFamily: "inherit"
              }}
            />
          </div>
        </div>
        <ul
          style={{ flex: 1, overflowY: "auto", listStyle: "none", margin: 0, padding: 0 }}
        >
          {filtered.length === 0 && (
            <li
              style={{
                padding: "40px 16px",
                textAlign: "center",
                color: "#8e8e93",
                fontSize: 16
              }}
            >
              No notes found
            </li>
          )}
          {filtered.map((item) => {
            const originalIndex = state.midbarList.indexOf(item);
            return (
              <li
                key={`mobile-midbar-${item.id}`}
                onClick={() => setContent(item.id, item.file, originalIndex)}
                style={{
                  padding: "16px",
                  borderBottom: "1px solid #f0ede6",
                  cursor: "pointer",
                  background: "transparent",
                  transition: "background 0.12s ease"
                }}
                onTouchStart={(e) => {
                  (e.currentTarget as HTMLLIElement).style.background = "#faf9f4";
                }}
                onTouchEnd={(e) => {
                  (e.currentTarget as HTMLLIElement).style.background = "transparent";
                }}
              >
                <p
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#1c1c1e",
                    marginBottom: 4,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis"
                  }}
                >
                  {item.title}
                </p>
                <p
                  style={{
                    fontSize: 14,
                    color: "#6c6c70",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis"
                  }}
                >
                  {item.excerpt || "No additional text"}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  if (view === "note") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          fontFamily: "-apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif",
          background: "#fffef9"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "16px",
            borderBottom: "1px solid #e8e5dd",
            background: "#fffef9"
          }}
        >
          <button
            onClick={() => setView("notes")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 16,
              color: "#007aff",
              padding: 4
            }}
          >
            ← Notes
          </button>
          <h1
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "#1c1c1e",
              margin: 0,
              flex: 1,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis"
            }}
          >
            {state.activeTitle}
          </h1>
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}>
          <div style={{ padding: "20px" }}>
            <Content
              contentID={state.contentID}
              contentURL={state.contentURL}
              title={false}
              newNoteBody={state.newNoteBody}
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
};

const Bear = () => {
  const [state, setState] = useState<BearState>({
    curSidebar: 0,
    curMidbar: 0,
    midbarList: bear[0].md,
    contentID: bear[0].md[0]?.id ?? "",
    contentURL: bear[0].md[0]?.file ?? "",
    activeTitle: bear[0].md[0]?.title
  });

  const [search, setSearch] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [newNoteCounter, setNewNoteCounter] = useState(0);

  const { winWidth } = useWindowSize();
  const isMobile = winWidth < 768;

  if (isMobile) {
    return (
      <MobileNotesLayout
        state={state}
        setState={setState}
        search={search}
        setSearch={setSearch}
        newNoteCounter={newNoteCounter}
        setNewNoteCounter={setNewNoteCounter}
      />
    );
  }

  return (
    <DesktopNotesLayout
      state={state}
      setState={setState}
      search={search}
      setSearch={setSearch}
      sidebarCollapsed={sidebarCollapsed}
      setSidebarCollapsed={setSidebarCollapsed}
      newNoteCounter={newNoteCounter}
      setNewNoteCounter={setNewNoteCounter}
    />
  );
};

export default Bear;

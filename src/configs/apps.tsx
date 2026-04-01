import { appBarHeight } from "~/utils";
import type { AppsData } from "~/types";
import Bear from "~/components/apps/Bear";
import LinkedIn from "~/components/apps/LinkedIn";
import Safari from "~/components/apps/Safari";
import VSCode from "~/components/apps/VSCode";
import FaceTime from "~/components/apps/FaceTime";
import Terminal from "~/components/apps/Terminal";

const apps: AppsData[] = [
  {
    id: "launchpad",
    title: "Files",
    desktop: false,
    img: "/img/icons/folder.png"
  },
  {
    id: "Notes",
    title: "Notes",
    desktop: true,
    img: "/img/icons/notes.svg",
    content: <Bear />
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    desktop: true,
    img: "img/icons/linkedin.png",
    content: <LinkedIn />,
    link: "https://www.linkedin.com/in/aidan-botha-68399a191/"
  },
  {
    id: "safari",
    title: "Safari",
    desktop: true,
    width: 1024,
    minWidth: 375,
    minHeight: 200,
    x: -20,
    img: "img/icons/safari.png",
    content: <Safari />,
    link: "https://www.google.com"
  },
  {
    id: "vscode",
    title: "VSCode",
    desktop: true,
    width: 900,
    height: 600,
    x: 80,
    y: -30,
    img: "img/icons/vscode.png",
    content: <VSCode />,
    link: "https://code.visualstudio.com"
  },
  {
    id: "facetime",
    title: "FaceTime",
    desktop: true,
    img: "img/icons/facetime.png",
    width: 500 * 1.7,
    height: 500 + appBarHeight,
    minWidth: 350 * 1.7,
    minHeight: 350 + appBarHeight,
    aspectRatio: 1.7,
    x: -80,
    y: 20,
    content: <FaceTime />
  },
  {
    id: "terminal",
    title: "Terminal",
    desktop: true,
    img: "/img/icons/terminal.png",
    content: <Terminal />
  },
  {
    id: "github",
    title: "Github",
    desktop: false,
    img: "/img/icons/github1.png",
    link: "https://github.com/aidan2125"
  }
];

export default apps;

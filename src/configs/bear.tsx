import type { BearData } from "~/types";

const bear: BearData[] = [
  {
    id: "profile",
    title: "Profile",
    icon: "",
    md: [
      {
        id: "about-me",
        title: "About Me",
        file: "markdown/about-me.md",
        icon: "i-la:dragon",
        excerpt:
          "I'm a motivated and adaptable individual with a growing passion for technology and problem solving..."
      }
    ]
  }

  // {
  //   id: "project",
  //   title: "Projects",
  //   icon: "i-octicon:repo",
  //   md: [
  //     {
  //       id: "travique",
  //       title: "Travique Travel Assistant",
  //       file: "markdown/travique.md",
  //       icon: "i-bx:map-alt",
  //       excerpt: "A smart travel planner using Node.js, Supabase, and Google Maps API...",
  //       link: "https://travique.netlify.app/"
  //     },
  //     {
  //       id: "portfolio",
  //       title: "Portfolio",
  //       file: "markdown/portfolio.md",
  //       icon: "i-octicon:browser",
  //       excerpt: "Portfolio built on the React + Vite framework...",
  //       link: "https://jacobdaniels.netlify.app/projects/"
  //     },
  //     {
  //       id: "resource-hub",
  //       title: "Resource Hub",
  //       file: "markdown/resource-hub.md",
  //       icon: "i-bx:book-open",
  //       excerpt: "A resource hub web app built with React, HTML, JavaScript and CSS...",
  //       link: "https://paul455565.github.io/TheFiveGuys/"
  //     }
  //   ]
  // }
];

export default bear;

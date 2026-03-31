import type { TerminalData } from "~/types";

const terminal: TerminalData[] = [
  {
    id: "about",
    title: "about",
    type: "folder",
    children: [
      {
        id: "about-bio",
        title: "bio.txt",
        type: "file",
        content: (
          <div className="py-1">
            <div>
              Hi, I'm Aidan Botha. I'm a Software Developer & IT Technician based in Cape
              Town, South Africa. I'm currently pursuing a BCOM in Information Technology
              and passionate about building meaningful digital solutions.
            </div>
          </div>
        )
      },
      {
        id: "about-interests",
        title: "interests.txt",
        type: "file",
        content:
          "Exploring new technologies / Gaming & Football / Fitness & gym routines / Learning through practical projects"
      },
      {
        id: "about-qualifications",
        title: "qualifications.txt",
        type: "file",
        content:
          "Higher Certificate in Information Technology | Pursuing BCOM in Information Technology | Grade 12 – The Settlers High School, Bellville"
      },
      {
        id: "about-contact",
        title: "contact.txt",
        type: "file",
        content: (
          <ul className="list-disc ml-6">
            <li>
              Email:{" "}
              <a
                className="text-blue-300"
                href="mailto:aidanbotha15@mail.com"
                target="_blank"
                rel="noreferrer"
              >
                aidanbotha15@mail.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a className="text-blue-300" href="tel:+27839669392">
                083 966 9392
              </a>
            </li>
            <li>
              Github:{" "}
              <a
                className="text-blue-300"
                href="https://github.com/aidan2125"
                target="_blank"
                rel="noreferrer"
              >
                @aidan2125
              </a>
            </li>
            <li>
              LinkedIn:{" "}
              <a
                className="text-blue-300"
                href="https://www.linkedin.com/in/aidan-botha-68399a191/"
                target="_blank"
                rel="noreferrer"
              >
                aidan-botha
              </a>
            </li>
            {/* No personal website, Google Scholar, or 知乎 */}
          </ul>
        )
      }
    ]
  },
  {
    id: "about-dream",
    title: "my-dream.cpp",
    type: "file",
    content: (
      <div className="py-1">
        <div>
          <span className="text-yellow-400">while</span>(
          <span className="text-blue-400">sleeping</span>) <span>{"{"}</span>
        </div>
        <div>
          <span className="text-blue-400 ml-9">money</span>
          <span className="text-yellow-400">++</span>;
        </div>
        <div>
          <span>{"}"}</span>
        </div>
      </div>
    )
  }
];

export default terminal;

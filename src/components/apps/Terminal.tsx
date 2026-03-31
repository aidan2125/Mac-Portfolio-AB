import React from "react";

interface TerminalState {
  content: JSX.Element[];
  prank: boolean;
}

const EMOJIS = ["(¬_¬)", "(^_^)", "(^_~)", "(>_<)", "(•‿•)"];

const getEmoji = () => {
  return EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
};

const HowDare = ({ close }: { close: () => void }) => {
  const [emoji] = React.useState(getEmoji());

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white"
      onClick={close}
    >
      <div className="space-y-4 text-center">
        <div className="text-4xl">{emoji}</div>
        <div className="text-3xl font-semibold">Nice try.</div>
        <div className="text-sm text-white/70">Click anywhere to go back.</div>
      </div>
    </div>
  );
};

export default class Terminal extends React.Component<{}, TerminalState> {
  private history: string[] = [];
  private curHistory = 0;
  private curInputTimes = 0;

  private commands: Record<string, (arg?: string) => void>;

  constructor(props: {}) {
    super(props);

    this.state = {
      content: [],
      prank: false
    };

    this.commands = {
      help: this.help,
      about: this.about,
      skills: this.skills,
      experience: this.experience,
      projects: this.projects,
      contact: this.contact,
      socials: this.socials,
      resume: this.resume,
      clear: this.clear
    };
  }

  componentDidMount() {
    this.reset();
    this.generateInputRow(this.curInputTimes);
  }

  reset = () => {
    const terminal = document.querySelector("#terminal-content") as HTMLElement | null;
    if (terminal) terminal.innerHTML = "";
  };

  addRow = (row: JSX.Element) => {
    this.setState((prev) => ({
      content: [...prev.content, row]
    }));
  };

  getPromptName = () => {
    return "~";
  };

  help = () => {
    const help = (
      <ul className="ml-6 list-disc pb-1.5 space-y-1">
        <li>
          <span className="text-red-400">about</span> - Learn more about me
        </li>
        <li>
          <span className="text-red-400">skills</span> - View my technical skills
        </li>
        <li>
          <span className="text-red-400">experience</span> - View my work experience
        </li>
        <li>
          <span className="text-red-400">projects</span> - See featured projects
        </li>
        <li>
          <span className="text-red-400">contact</span> - Get my contact info
        </li>
        <li>
          <span className="text-red-400">socials</span> - View my links
        </li>
        <li>
          <span className="text-red-400">resume</span> - Quick résumé summary
        </li>
        <li>
          <span className="text-red-400">clear</span> - Clear the terminal
        </li>
        <li>
          Press <span className="text-red-400">↑ / ↓</span> for command history
        </li>
        <li>
          Press <span className="text-red-400">tab</span> for autocomplete
        </li>
      </ul>
    );

    this.generateResultRow(this.curInputTimes, help);
  };

  about = () => {
    this.generateResultRow(
      this.curInputTimes,
      <div className="space-y-2">
        <p>
          I'm Aidan Botha, a motivated and adaptable individual with a growing passion for
          technology, problem solving, and building useful digital experiences.
        </p>
        <p>
          I'm especially interested in frontend development, UX/UI, digital products, and
          creating work that is both visually clean and functional.
        </p>
      </div>
    );
  };

  skills = () => {
    this.generateResultRow(
      this.curInputTimes,
      <div className="grid w-full grid-cols-2 gap-y-1 sm:grid-cols-3">
        {[
          "React",
          "Astro",
          "JavaScript",
          "Tailwind CSS",
          "Node.js",
          "WordPress",
          "WooCommerce",
          "SEO",
          "Supabase",
          "UI/UX Design",
          "CRM / Automation",
          "Web Development"
        ].map((skill) => (
          <span key={`skill-${skill}`} className="text-green-300">
            {skill}
          </span>
        ))}
      </div>
    );
  };

  experience = () => {
    this.generateResultRow(
      this.curInputTimes,
      <div className="space-y-4">
        <div>
          <div className="text-yellow-200">
            Information Technology Intern — Innovo Networks
          </div>
          <div className="text-white/70 text-xs">
            Jul 2025 - Mar 2026 · Cape Town, South Africa
          </div>
          <div>
            WordPress, WooCommerce, SEO, landing pages, CRM setup, workflow automation,
            and client-facing web support.
          </div>
        </div>

        <div>
          <div className="text-yellow-200">Digital Associate — CAPACITI</div>
          <div className="text-white/70 text-xs">
            Dec 2024 - Jul 2025 · Western Cape, South Africa
          </div>
          <div>
            Worked on a job portal platform, contributed to frontend and system design,
            presented solutions, and collaborated in a development team.
          </div>
        </div>

        <div>
          <div className="text-yellow-200">Sales Assistant — Toy Kingdom</div>
          <div className="text-white/70 text-xs">Nov 2023 - Aug 2024</div>
          <div>
            Customer service, pricing updates, stock handling, and daily store operations.
          </div>
        </div>
      </div>
    );
  };

  projects = () => {
    this.generateResultRow(
      this.curInputTimes,
      <div className="space-y-3">
        <div>
          <span className="text-purple-300">Planeview</span> — Digital portfolio and
          agency presence focused on branding, websites, and visual storytelling.
        </div>
        <div>
          <span className="text-purple-300">Travique</span> — Smart travel assistant
          platform with trip planning, maps, and saved trip features.
        </div>
        <div>
          <span className="text-purple-300">Chemcrete</span> — Case study and digital
          identity work for a concrete specialist brand.
        </div>
        <div>
          <span className="text-purple-300">Unexpected Opportunities</span> — NGO-focused
          brand and web direction project.
        </div>
      </div>
    );
  };

  contact = () => {
    this.generateResultRow(
      this.curInputTimes,
      <div className="space-y-1">
        <div>
          Email: <span className="text-green-300">aidanbotha15@mail.com</span>
        </div>
        <div>
          Location: <span className="text-green-300">Cape Town, South Africa</span>
        </div>
      </div>
    );
  };

  socials = () => {
    this.generateResultRow(
      this.curInputTimes,
      <div className="space-y-1">
        <div>
          LinkedIn:{" "}
          <a
            href="https://www.linkedin.com/in/aidan-botha-68399a191/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-300 underline"
          >
            aidan-botha-68399a191
          </a>
        </div>
        <div>
          GitHub:{" "}
          <a
            href="https://github.com/aidan2125"
            target="_blank"
            rel="noreferrer"
            className="text-blue-300 underline"
          >
            aidan2125
          </a>
        </div>
        <div>
          Website:{" "}
          <a
            href="https://planeview.co.za"
            target="_blank"
            rel="noreferrer"
            className="text-blue-300 underline"
          >
            planeview.co.za
          </a>
        </div>
      </div>
    );
  };

  resume = () => {
    this.generateResultRow(
      this.curInputTimes,
      <div className="space-y-2">
        <div>
          <span className="text-yellow-200">Focus:</span> Frontend Development, UX/UI, Web
          Experiences, Product Thinking
        </div>
        <div>
          <span className="text-yellow-200">Education:</span> Higher Certificate in
          Information Technology
        </div>
        <div>
          <span className="text-yellow-200">Current Direction:</span> Building practical
          experience through real projects, client work, and digital products
        </div>
      </div>
    );
  };

  clear = () => {
    this.curInputTimes += 1;
    this.reset();
    this.setState({ content: [] });
  };

  autoComplete = (text: string) => {
    if (text === "") return text;

    const guess = Object.keys(this.commands).find((item) => item.startsWith(text));

    return guess ?? text;
  };

  keyPress = (e: React.KeyboardEvent) => {
    const keyCode = e.key;
    const inputElement = document.querySelector(
      `#terminal-input-${this.curInputTimes}`
    ) as HTMLInputElement | null;

    if (!inputElement) return;

    const inputText = inputElement.value.trim();

    if (keyCode === "Enter") {
      this.history.push(inputText);

      inputElement.setAttribute("readonly", "true");

      if (inputText === "rm -rf /" || inputText.startsWith("sudo rm")) {
        this.setState({ prank: true });
      } else if (inputText && this.commands[inputText]) {
        this.commands[inputText]();
      } else if (inputText !== "") {
        this.generateResultRow(
          this.curInputTimes,
          <span>{`command not found: ${inputText}`}</span>
        );
      }

      this.curHistory = this.history.length;
      this.curInputTimes += 1;
      this.generateInputRow(this.curInputTimes);
    } else if (keyCode === "ArrowUp") {
      if (this.history.length > 0) {
        if (this.curHistory > 0) this.curHistory--;
        inputElement.value = this.history[this.curHistory] ?? "";
      }
    } else if (keyCode === "ArrowDown") {
      if (this.history.length > 0) {
        if (this.curHistory < this.history.length) this.curHistory++;
        inputElement.value =
          this.curHistory === this.history.length
            ? ""
            : this.history[this.curHistory] ?? "";
      }
    } else if (keyCode === "Tab") {
      inputElement.value = this.autoComplete(inputText);
      e.preventDefault();
    }
  };

  focusOnInput = (id: number) => {
    const input = document.querySelector(
      `#terminal-input-${id}`
    ) as HTMLInputElement | null;
    input?.focus();
  };

  generateInputRow = (id: number) => {
    const newRow = (
      <div key={`terminal-input-row-${id}`} className="flex">
        <div className="flex w-max items-center space-x-1.5">
          <span className="text-yellow-200">
            aidan@portfolio <span className="text-green-300">{this.getPromptName()}</span>
          </span>
          <span className="text-red-400">{">"}</span>
        </div>
        <input
          id={`terminal-input-${id}`}
          className="flex-1 bg-transparent px-1 text-white outline-none"
          onKeyDown={this.keyPress}
          autoFocus
        />
      </div>
    );

    this.addRow(newRow);
  };

  generateResultRow = (id: number, result: JSX.Element) => {
    const newRow = (
      <div key={`terminal-result-row-${id}`} className="break-all">
        {result}
      </div>
    );

    this.addRow(newRow);
  };

  render() {
    return (
      <div
        className="terminal relative h-full overflow-y-scroll bg-gray-800/90 font-normal text-sm text-white"
        onClick={() => this.focusOnInput(this.curInputTimes)}
      >
        {this.state.prank && <HowDare close={() => this.setState({ prank: false })} />}

        <div className="px-1.5 py-2">
          <span className="text-green-300">Aidan Terminal</span>: Type{" "}
          <span className="text-yellow-200">help</span> to explore my profile.
        </div>

        <div id="terminal-content" className="px-1.5 pb-2">
          {this.state.content}
        </div>
      </div>
    );
  }
}

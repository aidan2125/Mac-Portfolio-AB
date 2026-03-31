const skills = [
  "React",
  "Astro",
  "JavaScript",
  "Tailwind CSS",
  "Supabase",
  "Node.js",
  "UI/UX Design",
  "Product Thinking"
];

const featuredProjects = [
  {
    title: "Planeview",
    description:
      "A modern digital portfolio and agency presence showcasing branding, web design, and creative execution.",
    link: "https://planeview.co.za"
  },
  {
    title: "Travique",
    description:
      "A smart travel assistant platform focused on trip planning, maps, saved trips, and travel utilities.",
    link: "#"
  },
  {
    title: "Chemcrete",
    description:
      "A full digital presence for a long-standing Cape Town concrete specialist, including identity and website direction.",
    link: "#"
  },
  {
    title: "Unexpected Opportunities",
    description:
      "Brand and web direction for an NGO-focused project with room for future donations, FAQs, and storytelling.",
    link: "#"
  }
];

export default function LinkedIn() {
  return (
    <div className="linkedin-app">
      <div className="linkedin-container">
        <div className="linkedin-card">
          <div className="linkedin-banner" />

          <div className="linkedin-profile">
            <div className="linkedin-avatar">AB</div>

            <h1 className="linkedin-name">Aidan Botha</h1>
            <p className="linkedin-headline">
              Software Trainee • Frontend Developer • UX/UI Builder
            </p>

            <div style={{ marginTop: "1rem", display: "flex", gap: "10px" }}>
              <a className="linkedin-btn-primary">Visit Website</a>
              <a className="linkedin-btn-outline">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

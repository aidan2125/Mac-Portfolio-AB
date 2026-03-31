import React from "react";
import { wallpapers } from "~/configs";
import launchpadApps from "~/configs/launchpad";

export default function MobilePortfolio() {
  const dark = false;

  return (
    <div
      className="h-screen bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url(${dark ? wallpapers.night : wallpapers.day})`
      }}
    >
      <div className="bg-black/20 backdrop-blur-2xl h-full overflow-y-auto">
        {/* Header */}
        <header className="p-6 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Aidan's Portfolio</h1>
          <p className="text-white/80">Information Technology Student & Developer</p>
        </header>

        {/* About Section */}
        <section className="px-6 py-8">
          <h2 className="text-2xl font-semibold text-white mb-4">About Me</h2>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <p className="mb-4">
              I'm a motivated and adaptable individual with a growing passion for
              technology and problem solving. My journey into Information Technology has
              been driven by a natural curiosity about how systems work and a desire to
              use technology to create meaningful solutions.
            </p>
            <p className="mb-4">
              I thrive in environments where I can challenge myself, grow through hands-on
              experience, and collaborate with others who are equally passionate about
              tech.
            </p>
            <p>
              As I continue building my career in IT, I'm especially interested in roles
              that allow me to expand my technical knowledge, contribute to real-world
              impact, and grow into a professional who's not just technically strong, but
              dependable, curious, and forward-thinking.
            </p>
          </div>
        </section>

        {/* Projects Section */}
        <section className="px-6 py-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Projects</h2>
          <div className="grid grid-cols-1 gap-4">
            {launchpadApps.map((app) => (
              <a
                key={app.id}
                href={app.link}
                target={app.link.startsWith("http") ? "_blank" : "_self"}
                rel={app.link.startsWith("http") ? "noreferrer" : undefined}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-4 hover:bg-white/20 transition-colors"
              >
                <img
                  src={app.img}
                  alt={app.title}
                  className="w-12 h-12 object-contain rounded"
                />
                <div>
                  <h3 className="text-white font-medium">{app.title}</h3>
                  <p className="text-white/70 text-sm">
                    {app.link.startsWith("http") ? "External Link" : "View Project"}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="px-6 py-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Skills</h2>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="grid grid-cols-2 gap-4 text-white">
              <div>
                <h3 className="font-medium mb-2">Technical Skills</h3>
                <ul className="text-sm space-y-1">
                  <li>Web Development (HTML, CSS, JavaScript)</li>
                  <li>React / Frontend Development</li>
                  <li>WordPress & WooCommerce</li>
                  <li>SEO & Content Optimization</li>
                  <li>UI/UX Design</li>
                  <li>CRM Systems</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Soft Skills</h3>
                <ul className="text-sm space-y-1">
                  <li>Problem Solving</li>
                  <li>Communication</li>
                  <li>Adaptability</li>
                  <li>Team Collaboration</li>
                  <li>Customer Service</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="px-6 py-8 pb-16">
          <h2 className="text-2xl font-semibold text-white mb-4">Contact</h2>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white text-center">
            <p className="mb-4">Get in touch!</p>
            <a
              href="mailto:your@email.com"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Send Email
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

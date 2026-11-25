"use client";

import ProjectCard from "./ProjectCard";

export default function Projects() {
  const projectsList = [
    {
      title: "Liberty Life",
      tags: "HEALTH INSURANCE • FINTECH • WEB PLATFORM",
      link: "https://libertylifeplus.com",
      image: "/images/libertylife.png",
      description:
        "A health insurance platform serving individuals, families, and corporate teams — built to make coverage feel simple instead of intimidating, for businesses protecting their employees and families protecting each other.",
    },
    {
      title: "Bot Studio (Whisper360)",
      tags: "REACT • AI CUSTOMER SERVICE • WORKFLOW CANVAS",
      link: "https://whisper360.com",
      image: "/images/bot-studio.png",
      description:
        "A visual, drag-and-drop workspace that lets businesses design and manage their AI customer-service bots without writing a line of code — from first setup to billing and website chat.",
      details: {
        role: "Frontend Engineer — I own the Bot Studio module of Whisper360",
        period: "5 weeks · Whisper360 · Team project",
        overview:
          "Whisper360 needed a way for non-technical teams to build and manage AI customer-service bots on their own. Working within the wider Whisper360 team, I own this module on the frontend and built its experience end to end: the guided setup, the plans and billing pages, the website contact tools, and a visual canvas where a bot's whole behavior can be seen and edited at a glance.",
        stats: [
          { value: "5 wks", label: "Idea to launch" },
          { value: "1", label: "Module owned within the team" },
          { value: "10", label: "Releases shipped" },
          { value: "2", label: "Ways to edit, always in sync" },
        ],
        stack: ["React", "Tailwind CSS", "Django", "PostgreSQL", "Vitest"],
        phases: [
          {
            title: "A guided setup anyone can finish",
            period: "Week 1",
            summary:
              "Turned a set of static mockups into a real, working product.",
            points: [
              "Built a 5-step guided setup where a business picks its goal, channels, tone and knowledge, then tests the bot before going live.",
              "Connected every step to the live system, so each answer shapes the bot that gets created.",
              "Fixed a layout problem that made text unreadable on real devices, and checked the fix across many screen sizes.",
            ],
          },
          {
            title: "Plans, billing and website chat",
            period: "Weeks 2–3",
            summary:
              "Built the pieces around the bot that make it a complete product.",
            points: [
              "Designed a clear Plans & billing page with multi-currency pricing.",
              "Added a website contact-form option alongside the chat widget, switchable with no code changes on the customer's site.",
              "Made the form available as a shareable link, so businesses without a website can still capture leads straight into their team inbox.",
            ],
          },
          {
            title: "The Visual Flow canvas",
            period: "Week 3",
            summary:
              "The centerpiece: a pan-and-zoom canvas where teams see their bot's logic as a map and click any step to edit it.",
            points: [
              "Built the canvas from scratch for a smooth, fast feel, rather than relying on an off-the-shelf tool.",
              "Kept it perfectly in sync with the simpler step-by-step form, so teams can use whichever they prefer without anything going out of step.",
              "Made the goal-setting simpler and clearer for new users.",
            ],
          },
          {
            title: "Bringing the canvas to full strength",
            period: "Week 4",
            summary:
              "Made sure the canvas could do everything the form could, and more.",
            points: [
              "Added a searchable block library plus dedicated panels for knowledge, tasks and safety rules.",
              "Organized the bot's tasks and skills so they're easier to find and manage.",
              "Fixed hidden issues so every connection between steps displays correctly.",
            ],
          },
          {
            title: "Refining based on real feedback",
            period: "Week 5",
            summary:
              "Simplified the experience after listening to how the team actually used it.",
            points: [
              "Reorganized the canvas to follow the same logical order as the form, so it feels familiar.",
              "Removed extra layers that made things more complicated than they needed to be.",
              "Let teams add custom tasks that sit alongside the built-in ones.",
              "Added suggested questions to help teams teach their bot faster.",
            ],
          },
        ],
        principles: [
          {
            title: "Quality built in",
            text: "Every feature shipped with automated tests, so new releases didn't break what already worked.",
          },
          {
            title: "One source of truth",
            text: "Both ways of editing a bot always show the same information, so there's never a mismatch.",
          },
          {
            title: "Simple over clever",
            text: "When feedback showed something was more complicated than it needed to be, I removed it rather than patching around it.",
          },
          {
            title: "Product thinking, not just code",
            text: "I worked from user and team feedback to decide what to build, what to fix and what to cut.",
          },
        ],
      },
    },
    {
      title: "LendLock (MDM / Smartlock.io)",
      tags: "NEXT.JS • DEVICE SECURITY • EMBEDDED FINANCE",
      link: "https://getsmartlock.io",
      image: "/images/mdm.png",
      description:
        "Device security and management infrastructure built for lenders. Features remote lock, real-time geolocation, and risk analytics—the tooling that lets embedded credit businesses scale with confidence.",
    },
    {
      title: "Liberty Proof of Funds",
      tags: "FINTECH • VERIFICATION PLATFORM • DUAL-SIDED APP",
      link: "https://pof.libertyng.com/",
      image: "/images/pof.png",
      description:
        "A bank-backed verification platform for visa applicants and property buyers. Features an applicant portal for real-time tracking and an admin system to seamlessly manage and verify every file.",
    },
  ];

  return (
    <section
      id="projects"
      className="py-16 px-6 md:px-16 max-w-6xl mx-auto space-y-12"
    >
      {projectsList.map((project, index) => (
        <ProjectCard
          key={project.title}
          title={project.title}
          tags={project.tags}
          link={project.link}
          image={project.image}
          details={project.details}
          description={project.description}
          index={index}
        />
      ))}
    </section>
  );
}

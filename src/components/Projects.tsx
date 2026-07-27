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
      title: "LendLock (MDM / Smartlock.io)",
      tags: "NEXT.JS • DEVICE SECURITY • EMBEDDED FINANCE",
      link: "https://liberty-mdm-landing.vercel.app/",
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
          description={project.description}
          index={index}
        />
      ))}
    </section>
  );
}

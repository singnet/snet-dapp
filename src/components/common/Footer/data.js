const PrimaryFooterLeft = [
  //{ label: "Contact Us", link: "https://singularitynet.io/#contact" },
  //{ label: "Foundation Main Site", link: "https://singularitynet.io/" },
  { label: "Singularity Studio", link: "https://singularitynet.io/studio/" },
  { label: "White Paper", link: "https://public.singularitynet.io/whitepaper.pdf" },
  { label: "Jobs", link: "https://singularitynet.io/jobs-temp/" },
];

const PrimaryFooterMain = [
  {
    title: "AI Marketplace",
    children: [
      { label: "Free Signup", link: "#", internalLink: true },
      { label: "Get Started", link: "https://dev.singularitynet.io/tutorials/getting-started/" },
      { label: "Core Concepts", link: "https://dev.singularitynet.io/docs/concepts/" },
      { label: "Tutorials", link: "https://dev.singularitynet.io/tutorials/" },
    ],
  },
  {
    title: "Resources",
    children: [
      { label: "Documentation", link: "https://github.com/singnet" },
      //{ label: "Datasets Download", link: "#" },
      //{ label: "API Library ", link: "#" },
      { label: "Telegram", link: "https://telegram.me/singularitynet" },
      { label: "Forum", link: "https://community.singularitynet.io/" },
      { label: "Blog", link: "http://blog.singularitynet.io/" },
    ],
  },
  {
    title: "Developers",
    children: [
      { label: "Developer Portal", link: "https://dev.singularitynet.io" },
      { label: "Github", link: "https://github.com/singnet" },
      //{ label: "Request Dev Account", link: "#" },
      //{ label: "Request AI Services", link: "#" },
      //{ label: "Bounty Rewards", link: "#" },
      //{ label: "Contribute Program", link: "#" },
      //{ label: "Changelog & Status", link: "#" },
    ],
  },
  {
    title: "More",
    children: [
      { label: "MetaMask Plugin", link: "https://metamask.io" },
      //{ label: "Events", link: "#" },
      //{ label: "Workshops", link: "#" },
      //{ label: "Platform Roadmap", link: "#" },
    ],
  },
];

const SecondaryFooter = [
  { title: "Facebook", className: "fab fa-facebook-f", link: "https://www.facebook.com/singularityNET.io" },
  { title: "Linkedin", className: "fab fa-linkedin-in", link: "https://www.linkedin.com/company/singularitynet/" },
  { title: "Github", className: "fab fa-github", link: "https://github.com/singnet" },
  { title: "Twitter", className: "fab fa-twitter", link: "https://twitter.com/singularity_net" },
  { title: "Instagram", className: "fab fa-instagram", link: "https://instagram.com/singularitynet.io" },
  { title: "Youtube", className: "fab fa-youtube", link: "https://www.youtube.com/channel/UCbTE8vfz5zuEK5uRnc2yjrw" },
];

export const FooterData = {
  PrimaryFooterLeft,
  PrimaryFooterMain,
  SecondaryFooter,
};

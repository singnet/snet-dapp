import Logo from "../../../assets/images/Logo.png";

const PrimaryFooterLeft = [
    { label: "SingularityNET", link: "#", image: Logo },
    { label: "Contact Us", link: "#" },
    { label: "Foundation Main Site", link: "#" },
    { label: "Singularity Studio", link: "#" },
    { label: "White Paper", link: "#" },
    { label: "Jobs", link: "#" },
];

const PrimaryFooterMain = [
    {
        title: "Quick Links",
        children: [
            { label: "Getting Started", link: "#" },
            { label: " Beta Marketplace", link: "#" },
            { label: "AGI Faucet", link: "#" },
            { label: "Terminology", link: "#" },
        ],
    },
    {
        title: "Docs",
        children: [
            { label: "Core Concepts", link: "#" },
            { label: "Guides", link: "#" },
            { label: "Platforms", link: "#" },
            { label: "AI Provider", link: "#" },
            { label: "AI Buyer", link: "#" },
            { label: "AI Library", link: "#" },
            { label: "Datasets", link: "#" },
        ],
    },
    {
        title: "Resources",
        children: [{ label: "Datasets", link: "#" }],
    },
    {
        title: "Community",
        children: [
            { label: "Forum", link: "#" },
            { label: "Blog", link: "#" },
            { label: "Request AI", link: "#" },
            { label: "Bounty Rewards", link: "#" },
            { label: "Contribute Program", link: "#" },
            { label: "Datasets", link: "#" },
        ],
    },
    {
        title: "More",
        children: [
            { label: "Changelog", link: "#" },
            { label: "SNET signup", link: "#" },
            { label: "Login", link: "#" },
        ],
    },
];

const SecondaryFooter = [
    { title: "Facebook", className: "fab fa-facebook-f" },
    { title: "Linkedin", className: "fab fa-linkedin-in" },
    { title: "Github", className: "fab fa-github" },
    { title: "Twitter", className: "fab fa-twitter" },
    { title: "Instagram", className: "fab fa-instagram" },
    { title: "Youtube", className: "fab fa-youtube" },
    { title: "Envelope", className: "far fa-envelope" },
];

export const FooterData = {
    PrimaryFooterLeft,
    PrimaryFooterMain,
    SecondaryFooter,
};

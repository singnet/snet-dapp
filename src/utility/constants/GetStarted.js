import SeacrhIcon from "@material-ui/icons/Search";
import DescriptionIcon from "@material-ui/icons/Description";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import ThumbsUpDownIcon from "@material-ui/icons/ThumbsUpDown";
import SettingsIcon from "@material-ui/icons/Settings";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const imgPath = (directory, file, extension = "png") =>
  `${process.env.REACT_APP_SNET_CDN}/assets/images/GetStarted/${directory}/${file}.${extension}`;

export const GetStartedCategoriesData = [
  {
    categoryIcon: SeacrhIcon,
    categoryTitle: "Browsing the marketplace",
    categoryDescription:
      "Exploring AI - The SingularityNET AI Marketplace hosts a wide variety of AI services that range from Text generation to Face detection. You can view all of them by default in “List view” as shown here but also search by category, rating, most recent and favourites.",
    categoryTabs: [
      {
        title: "Card or List Views ",
        media: {
          type: "img",
          content: imgPath("BrowsingTheMarketplace", "CardorListViews"),
        },
      },
      {
        title: "Change Filter Options",
        media: { type: "img", content: imgPath("BrowsingTheMarketplace", "ChangeFilterOptions") },
      },
      {
        title: "Sort Options",
        media: { type: "img", content: imgPath("BrowsingTheMarketplace", "SortOptions") },
      },
      {
        title: "Rating and Rankings",
        media: { type: "img", content: imgPath("BrowsingTheMarketplace", "RatingandRanking") },
      },
      { title: "Search", media: { type: "img", content: imgPath("BrowsingTheMarketplace", "Search") } },
    ],
  },
  {
    categoryIcon: DescriptionIcon,
    categoryTitle: "Choosing your AI",
    categoryDescription:
      "AI Services - Each AI service on this platform is unique. Click on any service you would like to use to find out more about its required input, expected output, cost, usage, developer’s note and much more!",
    categoryTabs: [
      { title: "About Details", media: { type: "img", content: imgPath("ChooseingYourAi", "AboutDetails") } },
      { title: "Pricing", media: { type: "img", content: imgPath("ChooseingYourAi", "Pricing") } },
      { title: "Demo Trial", media: { type: "img", content: imgPath("ChooseingYourAi", "DemoTrial") } },
      { title: "Install & Run", media: { type: "img", content: imgPath("ChooseingYourAi", "Install&Run") } },
      { title: "Tutorials", media: { type: "img", content: imgPath("ChooseingYourAi", "Tutorials") } },
    ],
  },
  {
    categoryIcon: PlayCircleFilledIcon,
    categoryTitle: "Demo AI Services",
    categoryDescription:
      "Try it out yourself! – Majority of services have free demo calls that you can try right away.  Input your parameters and data and let AI process your request instantly.  After your trial demo calls used up, you can still run the demos using MetaMask via AGI tokens. ",
    categoryTabs: [
      {
        title: "Accessing the demo",
        media: { type: "img", content: imgPath("DemoAiServices", "AccessingtheDemo") },
      },
      {
        title: "Configure AI parameters",
        media: { type: "gif", content: imgPath("DemoAiServices", "ConfigureAIParameters") },
      },
      {
        title: "See output results",
        media: { type: "gif", content: imgPath("DemoAiServices", "Seeoutputresults") },
      },
      {
        title: "Metamask (coming soon)",
        media: { type: "gif", content: imgPath("DemoAiServices", "Metamask") },
      },
    ],
  },
  {
    categoryIcon: ThumbsUpDownIcon,
    categoryTitle: "Rate, Review, Improve",
    categoryDescription:
      "Feedback - Democratizing AI requires collaboration, and not just between developers. Ratings and reviews help developers improve their algorithms as well as the design of their AI service. It’s also an opportunity for new teams to be born. ",
    categoryTabs: [
      {
        title: "Rating AI Services",
        media: { type: "img", content: imgPath("RateReviewImprove", "RatingAIServices") },
      },
      {
        title: "Accessing & sorting reviews",
        media: { type: "img", content: imgPath("RateReviewImprove", "AccessingSortingrReviews") },
      },
      { title: "Writing review ", media: { type: "img", content: imgPath("RateReviewImprove", "WritingReview") } },
    ],
  },
  {
    categoryIcon: SettingsIcon,
    categoryTitle: "Make it your AI",
    categoryDescription:
      "Install & run it - It has never been easier to find and integrate AI algorithms. Regardless of your internal tech capabilities, you can now seamlessly integrate a service to your website, app or other product via the SingularityNET AI Marketplace. ",
    categoryTabs: [
      { title: "Install", media: { type: "img", content: imgPath("MakeItYourAI", "Install") } },
      { title: "Run", media: { type: "img", content: imgPath("MakeItYourAI", "Run") } },
      {
        title: "Multiple languages",
        media: { type: "img", content: imgPath("MakeItYourAI", "MultipleChannels") },
      },
      { title: "documentation", media: { type: "img", content: imgPath("MakeItYourAI", "Documentation") } },
    ],
  },
  {
    categoryIcon: SettingsIcon,
    categoryTitle: "Using AGI",
    categoryDescription:
      "Own your funds - Whether you want to use services, delete your account or use your funds outside of the platform, you are the sole controller of your funds. Your wallet, your cryptographic key, your AGI. ",
    categoryTabs: [
      {
        title: "Managing your AGI tokens",
        media: { type: "img", content: imgPath("UsingAgi", "ManagingyourAGItokens") },
      },
      {
        title: "Metamask wallet support",
        media: { type: "img", content: imgPath("UsingAgi", "Metamaskwalletsupport") },
      },
      {
        title: "Using channel balances",
        media: { type: "img", content: imgPath("UsingAgi", "Usingchannelbalances") },
      },
    ],
  },
];

export const GetStartedFeaturesData = [
  {
    featureIcon: CheckCircleIcon,
    featureName: "Feature Name",
    featureDescription: "Access to the RFAI portal to request for a new AI service and incentivize development.",
  },
  {
    featureIcon: CheckCircleIcon,
    featureName: "Feature Name",
    featureDescription: "Access to the RFAI portal to request for a new AI service and incentivize development.",
  },
  {
    featureIcon: CheckCircleIcon,
    featureName: "Feature Name",
    featureDescription: "Access to the RFAI portal to request for a new AI service and incentivize development.",
  },
  {
    featureIcon: CheckCircleIcon,
    featureName: "Feature Name",
    featureDescription: "Access to the RFAI portal to request for a new AI service and incentivize development.",
  },
  {
    featureIcon: CheckCircleIcon,
    featureName: "Feature Name",
    featureDescription: "AI services dashboard.",
  },
  {
    featureIcon: CheckCircleIcon,
    featureName: "Feature Name",
    featureDescription: "AI services dashboard.",
  },
  {
    featureIcon: CheckCircleIcon,
    featureName: "Feature Name",
    featureDescription: "AI services dashboard.",
  },
  {
    featureIcon: CheckCircleIcon,
    featureName: "Feature Name",
    featureDescription: "AI services dashboard.",
  },
  {
    featureIcon: CheckCircleIcon,
    featureName: "Feature Name",
    featureDescription: "Transfer AGI Tokens from multiple wallet anytime.",
  },
  {
    featureIcon: CheckCircleIcon,
    featureName: "Feature Name",
    featureDescription: "Transfer AGI Tokens from multiple wallet anytime.",
  },
  {
    featureIcon: CheckCircleIcon,
    featureName: "Feature Name",
    featureDescription: "Transfer AGI Tokens from multiple wallet anytime.",
  },
  {
    featureIcon: CheckCircleIcon,
    featureName: "Feature Name",
    featureDescription: "Transfer AGI Tokens from multiple wallet anytime.",
  },
  {
    featureIcon: CheckCircleIcon,
    featureName: "Integrate with any language",
    featureDescription: "Integrate AI services using your preferred language such as Python, Java, C++, and many more.",
  },
  {
    featureIcon: CheckCircleIcon,
    featureName: "Integrate with any language",
    featureDescription: "Integrate AI services using your preferred language such as Python, Java, C++, and many more.",
  },
  {
    featureIcon: CheckCircleIcon,
    featureName: "Integrate with any language",
    featureDescription: "Integrate AI services using your preferred language such as Python, Java, C++, and many more.",
  },
  {
    featureIcon: CheckCircleIcon,
    featureName: "Integrate with any language",
    featureDescription: "Integrate AI services using your preferred language such as Python, Java, C++, and many more.",
  },
];

import SeacrhIcon from "@material-ui/icons/Search";
import DescriptionIcon from "@material-ui/icons/Description";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import ThumbsUpDownIcon from "@material-ui/icons/ThumbsUpDown";
import SettingsIcon from "@material-ui/icons/Settings";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import CardorListViews from "../../assets/images/GetStarted/BrowsingTheMarketplace/CardorListViews.png";
import ChangeFilterOptions from "../../assets/images/GetStarted/BrowsingTheMarketplace/ChangeFilterOptions.png";
import SortOptions from "../../assets/images/GetStarted/BrowsingTheMarketplace/SortOptions.png";
import RatingandRanking from "../../assets/images/GetStarted/BrowsingTheMarketplace/RatingandRanking.png";
import Search from "../../assets/images/GetStarted/BrowsingTheMarketplace/Search.png";

import AboutDetails from "../../assets/images/GetStarted/ChooseingYourAi/AboutDetails.png";
import Pricing from "../../assets/images/GetStarted/ChooseingYourAi/Pricing.png";
import DemoTrial from "../../assets/images/GetStarted/ChooseingYourAi/DemoTrial.png";
import InstallRun from "../../assets/images/GetStarted/ChooseingYourAi/Install&Run.png";
import Tutorials from "../../assets/images/GetStarted/ChooseingYourAi/Tutorials.png";

import AccessingtheDemo from "../../assets/images/GetStarted/DemoAiServices/AccessingtheDemo.png";
import ConfigureAIParameters from "../../assets/images/GetStarted/DemoAiServices/ConfigureAIParameters.png";
import Metamask from "../../assets/images/GetStarted/DemoAiServices/Metamask.png";
import Seeoutputresults from "../../assets/images/GetStarted/DemoAiServices/Seeoutputresults.png";

import RatingAIServices from "../../assets/images/GetStarted/RateReviewImprove/RatingAIServices.png";
import AccessingSortingrReviews from "../../assets/images/GetStarted/RateReviewImprove/AccessingSortingrReviews.png";
import WritingReview from "../../assets/images/GetStarted/RateReviewImprove/WritingReview.png";

import Install from "../../assets/images/GetStarted/MakeItYourAI/Install.png";
import Run from "../../assets/images/GetStarted/MakeItYourAI/Run.png";
import MultipleChannels from "../../assets/images/GetStarted/MakeItYourAI/MultipleChannels.png";
import Documentation from "../../assets/images/GetStarted/MakeItYourAI/Documentation.png";

import ManagingyourAGItokens from "../../assets/images/GetStarted/UsingAgi/ManagingyourAGItokens.png";
import Metamaskwalletsupport from "../../assets/images/GetStarted/UsingAgi/Metamaskwalletsupport.png";
import Usingchannelbalances from "../../assets/images/GetStarted/UsingAgi/Usingchannelbalances.png";

export const GetStartedCategoriesData = [
  {
    categoryIcon: SeacrhIcon,
    categoryTitle: "Browsing the marketplace",
    categoryDescription:
      "Exploring AI - The SingularityNET AI Marketplace hosts a wide variety of AI services that range from Text generation to Face detection. You can view all of them by default in “List view” as shown here but also search by category, rating, most recent and favourites.",
    categoryTabs: [
      { title: "Card or List Views ", media: { type: "img", content: CardorListViews } },
      { title: "Change Filter Options", media: { type: "img", content: ChangeFilterOptions } },
      { title: "Sort Options", media: { type: "img", content: SortOptions } },
      { title: "Rating and Rankings", media: { type: "img", content: RatingandRanking } },
      { title: "Search", media: { type: "img", content: Search } },
    ],
  },
  {
    categoryIcon: DescriptionIcon,
    categoryTitle: "Choosing your AI",
    categoryDescription:
      "AI Services - Each AI service on this platform is unique. Click on any service you would like to use to find out more about its required input, expected output, cost, usage, developer’s note and much more!",
    categoryTabs: [
      { title: "About Details", media: { type: "img", content: AboutDetails } },
      { title: "Pricing", media: { type: "img", content: Pricing } },
      { title: "Demo Trial", media: { type: "img", content: DemoTrial } },
      { title: "Install & Run", media: { type: "img", content: InstallRun } },
      { title: "Tutorials", media: { type: "img", content: Tutorials } },
    ],
  },
  {
    categoryIcon: PlayCircleFilledIcon,
    categoryTitle: "Demo AI Services",
    categoryDescription:
      "Try it out yourself! – Majority of services have free demo calls that you can try right away.  Input your parameters and data and let AI process your request instantly.  After your trial demo calls used up, you can still run the demos using MetaMask via AGI tokens. ",
    categoryTabs: [
      { title: "Accessing the demo", media: { type: "img", content: AccessingtheDemo } },
      { title: "Configure AI parameters", media: { type: "gif", content: ConfigureAIParameters } },
      { title: "See output results", media: { type: "gif", content: Seeoutputresults } },
      { title: "Metamask (coming soon)", media: { type: "gif", content: Metamask } },
    ],
  },
  {
    categoryIcon: ThumbsUpDownIcon,
    categoryTitle: "Rate, Review, Improve",
    categoryDescription:
      "Feedback - Democratizing AI requires collaboration, and not just between developers. Ratings and reviews help developers improve their algorithms as well as the design of their AI service. It’s also an opportunity for new teams to be born. ",
    categoryTabs: [
      { title: "Rating AI Services", media: { type: "img", content: RatingAIServices } },
      { title: "Accessing & sorting reviews", media: { type: "img", content: AccessingSortingrReviews } },
      { title: "Writing review ", media: { type: "img", content: WritingReview } },
    ],
  },
  {
    categoryIcon: SettingsIcon,
    categoryTitle: "Make it your AI",
    categoryDescription:
      "Install & run it - It has never been easier to find and integrate AI algorithms. Regardless of your internal tech capabilities, you can now seamlessly integrate a service to your website, app or other product via the SingularityNET AI Marketplace. ",
    categoryTabs: [
      { title: "Install", media: { type: "img", content: Install } },
      { title: "Run", media: { type: "img", content: Run } },
      { title: "Multiple languages", media: { type: "img", content: MultipleChannels } },
      { title: "documentation", media: { type: "img", content: Documentation } },
    ],
  },
  {
    categoryIcon: SettingsIcon,
    categoryTitle: "Using AGI",
    categoryDescription:
      "Own your funds - Whether you want to use services, delete your account or use your funds outside of the platform, you are the sole controller of your funds. Your wallet, your cryptographic key, your AGI. ",
    categoryTabs: [
      { title: "Managing your AGI tokens", media: { type: "img", content: ManagingyourAGItokens } },
      { title: "Metamask wallet support", media: { type: "img", content: Metamaskwalletsupport } },
      { title: "Using channel balances", media: { type: "img", content: Usingchannelbalances } },
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

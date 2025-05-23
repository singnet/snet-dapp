import React, { lazy } from "react";
import AlertBox from "../../components/common/AlertBox";

//EXAMPLE
//const SERVICE_COMPONENT = lazy(() => import("./path/to/service/folder));

const ExampleService = lazy(() => import("./snet/example_service"));
const GLMT = lazy(() => import("./snet/GLMT"));
const LanguageDetection = lazy(() => import("./snet/language_detection"));
const TextGeneratoin = lazy(() => import("./snet/text_generation"));

const BinaryClassification = lazy(() => import("./nunet-org/binary-classification"));
const FakeNewsScoreService = lazy(() => import("./nunet-org/fake_news_score_service"));
const UclnlpService = lazy(() => import("./nunet-org/uclnlp-service"));

const ServNaint7 = lazy(() => import("./Naint1/ServNaint7"));
const ProblemService = lazy(() => import("./Naint1/ProblemService"));

const HateDetection = lazy(() => import("./egor-sing-test/hate-detection"));

class ThirdPartyCustomUIComponents {
  constructor() {
    this.customUIComponents = {};
  }

  addCustomUIComponent = (ordId, serviceId, CustomUIComponent) => {
    const key = this._generateUniqueID(ordId, serviceId);
    this.customUIComponents[key] = CustomUIComponent;
  };

  componentFor = (orgId, serviceId) => {
    const CustomUIComponent = this.customUIComponents[this._generateUniqueID(orgId, serviceId)];
    if (!CustomUIComponent) {
      return () => <AlertBox type="error" message="No Component matched. Please check the orgId and serviceId" />;
    }
    return CustomUIComponent;
  };

  _generateUniqueID = (ordId, serviceId) => `${ordId}__$%^^%$__${serviceId}`;
}

const thirdPartyCustomUIComponents = new ThirdPartyCustomUIComponents();

//EXAMPLE
// thirdPartyCustomUIComponents.addCustomUIComponent(
//   [ORG_ID],
//   [SERVICE_ID],
//   [SERVICE_COMPONENT]
// );

thirdPartyCustomUIComponents.addCustomUIComponent("snet", "example_service", ExampleService);
thirdPartyCustomUIComponents.addCustomUIComponent("snet", "GLMT", GLMT);

thirdPartyCustomUIComponents.addCustomUIComponent("snet", "language_detection", LanguageDetection);

thirdPartyCustomUIComponents.addCustomUIComponent("snet", "text_generation", TextGeneratoin);

thirdPartyCustomUIComponents.addCustomUIComponent("nunet-org", "binary-classification", BinaryClassification);

thirdPartyCustomUIComponents.addCustomUIComponent("nunet-org", "fake_news_score_service", FakeNewsScoreService);

thirdPartyCustomUIComponents.addCustomUIComponent("nunet-org", "uclnlp-service", UclnlpService);

thirdPartyCustomUIComponents.addCustomUIComponent("Naint1", "ServNaint7", ServNaint7);
thirdPartyCustomUIComponents.addCustomUIComponent("Naint1", "ProblemService", ProblemService);

thirdPartyCustomUIComponents.addCustomUIComponent("egor-sing-test", "hate-detection", HateDetection);
export default thirdPartyCustomUIComponents;

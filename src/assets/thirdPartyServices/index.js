import React, { lazy } from "react";

const ExampleService = lazy(() => import("./ExampleService.js"));
const CNTKImageRecognition = lazy(() => import("./CNTKImageRecognition.js"));
const CNTKNextDayTrend = lazy(() => import("./CNTKNextDayTrend.js"));
const CNTKLSTMForecast = lazy(() => import("./CNTKLSTMForecast.js"));
const CNTKLanguageUnderstanding = lazy(() => import("./CNTKLanguageUnderstanding.js"));
const I3DActionRecognition = lazy(() => import("./I3DActionRecognition.js"));
const OpenNMTRomanceTranslator = lazy(() => import("./OpenNMTRomanceTranslator.js"));
const S2VTVideoCaptioning = lazy(() => import("./S2VTVideoCaptioning.js"));
const YOLOv3ObjectDetection = lazy(() => import("./YOLOv3ObjectDetection.js"));
const Zeta36ChessAlphaZero = lazy(() => import("./Zeta36ChessAlphaZero.js"));
const AutomaticSpeechRecognition = lazy(() => import("./AutomaticSpeechRecognition.js"));
const NeuralSpeechSynthesis = lazy(() => import("./NeuralSpeechSynthesis.js"));
const LongQuestionAsnswering = lazy(() => import("./LongQuestionAsnswering.js"));
const ShortQuestionAnswering = lazy(() => import("./ShortQuestionAnswering.js"));
const BinarySemanticSimilarity = lazy(() => import("./BinarySemanticSimilarity.js"));
const NamedEntityRecognitionService = lazy(() => import("./NamedEntityRecognitionService.js"));
const SentimentAnalysisService = lazy(() => import("./SentimentAnalysisService"));
const TimeSeriesAnomalyDiscoveryService = lazy(() => import("./TimeSeriesAnomalyDiscoveryService.js"));
const VisualQAOpencog = lazy(() => import("./VisualQAOpencog.js"));
const MosesService = lazy(() => import("./MosesService"));
const SemanticSegmentationService = lazy(() => import("./SemanticSegmentation.js"));
const FaceDetectService = lazy(() => import("./FaceDetectService"));
const FaceLandmarksService = lazy(() => import("./FaceLandmarksService"));
const FaceAlignService = lazy(() => import("./FaceAlignService"));
const FaceIdentityService = lazy(() => import("./FaceIdentityService"));
const EmotionRecognitionService = lazy(() => import("./EmotionRecognitionService"));
const HolisticEdgeDetectionService = lazy(() => import("./HolisticEdgeDetectionService"));
const ImageRetrievalService = lazy(() => import("./ImageRetrievalService"));
const GeneAnnotationService = lazy(() => import("./GeneAnnotationService"));
const TranslationService = lazy(() => import("./TranslationService"));
const NewsSummaryService = lazy(() => import("./NewsSummaryService"));
const StyleTransfer = lazy(() => import("./StyleTransfer"));
const LanguageDetectionService = lazy(() => import("./LanguageDetectionService"));
const CoreferenceResolutionService = lazy(() => import("./CoreferenceResolutionService"));
const NamedEntityDisambiguation = lazy(() => import("./NamedEntityDisambiguation"));
const NetworkAnalysisBipartite = lazy(() => import("./NetworkAnalysisBipartite"));
const NetworkAnalysisRobustness = lazy(() => import("./NetworkAnalysisRobustness"));
const TopicAnalysis = lazy(() => import("./TopicAnalysisService"));
const Places365SceneRecognition = lazy(() => import("./Places365SceneRecognition"));
const SuperResolution = lazy(() => import("./SuperResolution"));
const SemanticSegmentationAerial = lazy(() => import("./SemanticSegmentationAerial"));
const SiggraphColorization = lazy(() => import("./SiggraphColorization"));
const AlertBox = lazy(() => import("../../components/common/AlertBox"));

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
      return <AlertBox type="error" message="No Component matched" />;
    }

    return CustomUIComponent;
  };

  _generateUniqueID = (ordId, serviceId) => `${ordId}__$%^^%$__${serviceId}`;
}

const thirdPartyCustomUIComponents = new ThirdPartyCustomUIComponents();

const addSnetCustomUI = (serviceId, CustomUIComponent) => {
  thirdPartyCustomUIComponents.addCustomUIComponent("snet", serviceId, CustomUIComponent);
};

addSnetCustomUI("example-service", ExampleService);
addSnetCustomUI("cntk-image-recon", CNTKImageRecognition);
addSnetCustomUI("cntk-next-day-trend", CNTKNextDayTrend);
addSnetCustomUI("cntk-lstm-forecast", CNTKLSTMForecast);
addSnetCustomUI("cntk-language-understanding", CNTKLanguageUnderstanding);
addSnetCustomUI("i3d-video-action-recognition", I3DActionRecognition);
addSnetCustomUI("opennmt-romance-translator", OpenNMTRomanceTranslator);
addSnetCustomUI("s2vt-video-captioning", S2VTVideoCaptioning);
addSnetCustomUI("yolov3-object-detection", YOLOv3ObjectDetection);
addSnetCustomUI("zeta36-chess-alpha-zero", Zeta36ChessAlphaZero);
addSnetCustomUI("speech-recognition", AutomaticSpeechRecognition);
addSnetCustomUI("speech-synthesis", NeuralSpeechSynthesis);
addSnetCustomUI("question-answering-long-seq", LongQuestionAsnswering);
addSnetCustomUI("question-answering-short-seq", ShortQuestionAnswering);
addSnetCustomUI("semantic-similarity-binary", BinarySemanticSimilarity);
addSnetCustomUI("opencog-vqa", VisualQAOpencog);
addSnetCustomUI("named-entity-recognition", NamedEntityRecognitionService);
addSnetCustomUI("sentiment-analysis", SentimentAnalysisService);
addSnetCustomUI("time-series-anomaly-discovery", TimeSeriesAnomalyDiscoveryService);
addSnetCustomUI("moses-service", MosesService);
addSnetCustomUI("semantic-segmentation", SemanticSegmentationService);
addSnetCustomUI("face-detect", FaceDetectService);
addSnetCustomUI("face-landmarks", FaceLandmarksService);
addSnetCustomUI("face-align", FaceAlignService);
addSnetCustomUI("face-identity", FaceIdentityService);
addSnetCustomUI("emotion-recognition-service", EmotionRecognitionService);
addSnetCustomUI("holistic-edge-detection-service", HolisticEdgeDetectionService);
addSnetCustomUI("image-retrieval-service", ImageRetrievalService);
addSnetCustomUI("gene-annotation-service", GeneAnnotationService);
addSnetCustomUI("translation", TranslationService);
addSnetCustomUI("news-summary", NewsSummaryService);
addSnetCustomUI("style-transfer", StyleTransfer);
addSnetCustomUI("language-detection", LanguageDetectionService);
addSnetCustomUI("coreference-resolution-service", CoreferenceResolutionService);
addSnetCustomUI("named-entity-disambiguation", NamedEntityDisambiguation);
addSnetCustomUI("network-analytics-robustness", NetworkAnalysisRobustness);
addSnetCustomUI("network-analytics-bipartite", NetworkAnalysisBipartite);
addSnetCustomUI("topic-analysis", TopicAnalysis);
addSnetCustomUI("places365-scene-recognition", Places365SceneRecognition);
addSnetCustomUI("super-resolution", SuperResolution);
addSnetCustomUI("semantic-segmentation-aerial", SemanticSegmentationAerial);
addSnetCustomUI("siggraph-colorization", SiggraphColorization);

export default thirdPartyCustomUIComponents;

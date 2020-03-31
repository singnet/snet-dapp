import React, { lazy } from "react";
import AlertBox from "../../components/common/AlertBox";

const ExampleService = lazy(() => import("./snet/example_service"));
const CNTKImageRecognition = lazy(() => import("./snet/cntk_image_recon"));
const CNTKNextDayTrend = lazy(() => import("./snet/cntk_next_day_trend"));
const CNTKLSTMForecast = lazy(() => import("./snet/cntk_lstm_forecast"));
const CNTKLanguageUnderstanding = lazy(() => import("./snet/cntk_language_understanding"));
const I3DActionRecognition = lazy(() => import("./snet/i3d_video_action_recognition"));
const OpenNMTRomanceTranslator = lazy(() => import("./snet/openmt_romance_translator"));
const S2VTVideoCaptioning = lazy(() => import("./snet/s2vt_video_captioning"));
const YOLOv3ObjectDetection = lazy(() => import("./snet/yolov3_object_detection"));
const Zeta36ChessAlphaZero = lazy(() => import("./snet/zeta36_chess_alpha_zero"));
const AutomaticSpeechRecognition = lazy(() => import("./snet/speech_recognition"));
const NeuralSpeechSynthesis = lazy(() => import("./snet/speech_synthesis"));
const LongQuestionAsnswering = lazy(() => import("./snet/question_answering_long_seq"));
const ShortQuestionAnswering = lazy(() => import("./snet/question_answering_short_seq"));
const BinarySemanticSimilarity = lazy(() => import("./snet/semantic_similarity_binary"));
const NamedEntityRecognitionService = lazy(() => import("./snet/named_entity_recognition"));
const SentimentAnalysisService = lazy(() => import("./snet/sentiment_analysis"));
const TimeSeriesAnomalyDiscoveryService = lazy(() => import("./snet/time_series_anomaly_discovery"));
const VisualQAOpencog = lazy(() => import("./snet/opencog_vqa"));
const MosesService = lazy(() => import("./snet/moses_service"));
const SemanticSegmentationService = lazy(() => import("./snet/semantic_segmentation"));
const FaceDetectService = lazy(() => import("./snet/face_detect"));
const FaceLandmarksService = lazy(() => import("./snet/face_landmarks"));
const FaceAlignService = lazy(() => import("./snet/face_align"));
const FaceIdentityService = lazy(() => import("./snet/face_identity"));
const EmotionRecognitionService = lazy(() => import("./snet/emotion_recognition_service"));
const HolisticEdgeDetectionService = lazy(() => import("./snet/holistic_edge_detection_service"));
const ImageRetrievalService = lazy(() => import("./snet/image_retrieval_service"));
const GeneAnnotationService = lazy(() => import("./mozi/gene_annotation_service"));
const TranslationService = lazy(() => import("./snet/translation"));
const NewsSummaryService = lazy(() => import("./snet/news_summary"));
const StyleTransfer = lazy(() => import("./snet/style_transfer"));
const LanguageDetectionService = lazy(() => import("./snet/language_detection"));
const CoreferenceResolutionService = lazy(() => import("./snet/coreference_resolution_service"));
const NamedEntityDisambiguation = lazy(() => import("./snet/named_entity_disambiguation"));
const NetworkAnalysisBipartite = lazy(() => import("./snet/network_analytics_bipartite"));
const NetworkAnalysisRobustness = lazy(() => import("./snet/network_analytics_robustness"));
const TopicAnalysis = lazy(() => import("./snet/topic_analysis"));
const Places365SceneRecognition = lazy(() => import("./snet/places365_scene_recognition"));
const SuperResolution = lazy(() => import("./snet/super_resolution"));
const SemanticSegmentationAerial = lazy(() => import("./snet/semantic_segmentation_aerial"));
const TextGeneration = lazy(() => import("./snet/text_generation"));
const PneumoniaDiagnosis = lazy(() => import("./snet/pneumonia_diagnosis"));
const OpenCogMiner = lazy(() => import("./snet/opencog_miner"));
const MinecraftService = lazy(() => import("./snet/minecraftizing_service"));
const MatchingService = lazy(() => import("./snet/match_service"));
const SoundSpleeterService = lazy(() => import("./snet/sound_spleeter"));
const RealTimeVoiceCloningService = lazy(() => import("./snet/real_time_voice_cloning"));
const ColorizationService = lazy(() => import("./snet/deoldify-colorizer"));

//ADD_CONSTANTS_HERE

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

const addSnetCustomUI = (serviceId, CustomUIComponent) => {
  thirdPartyCustomUIComponents.addCustomUIComponent("snet", serviceId, CustomUIComponent);
};

const addMoziCustomUI = (serviceId, CustomUIComponent) => {
  thirdPartyCustomUIComponents.addCustomUIComponent("mozi", serviceId, CustomUIComponent);
};

//TODO remove before deploying to mainnet
const addOrg2CustomUI = (serviceId, CustomUIComponent) => {
  thirdPartyCustomUIComponents.addCustomUIComponent("org2", serviceId, CustomUIComponent);
};

const addAr3CustomUI = (serviceId, CustomUIComponent) => {
  thirdPartyCustomUIComponents.addCustomUIComponent("ar3", serviceId, CustomUIComponent);
};

addSnetCustomUI("example-service", ExampleService);
addSnetCustomUI("freecall", ExampleService);
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
addSnetCustomUI("text-generation", TextGeneration);
addSnetCustomUI("pneumonia-diagnosis", PneumoniaDiagnosis);
addSnetCustomUI("opencog-miner", OpenCogMiner);
addMoziCustomUI("gene-annotation-service", GeneAnnotationService);
addSnetCustomUI("minecraftizing-service", MinecraftService);
addSnetCustomUI("match-service", MatchingService);
addSnetCustomUI("sound-spleeter", SoundSpleeterService);
addSnetCustomUI("real-time-voice-cloning", RealTimeVoiceCloningService);
addSnetCustomUI("deoldify-colorizer", ColorizationService);

//TODO remove before deploying to mainnet
addOrg2CustomUI("freecall", ExampleService);

addAr3CustomUI("freecall", ExampleService);

//ADD_UI_COMPONENTS_HERE

thirdPartyCustomUIComponents.addCustomUIComponent(
  "212a070e8a2244d4857762eaa8cb60df",
  "age_classification",
  ExampleService
);

thirdPartyCustomUIComponents.addCustomUIComponent(
  "212a070e8a2244d4857762eaa8cb60df",
  "age_classification_1",
  ExampleService
);

thirdPartyCustomUIComponents.addCustomUIComponent(
  "212a070e8a2244d4857762eaa8cb60df",
  "age_classification_2",
  ExampleService
);

thirdPartyCustomUIComponents.addCustomUIComponent("org_id_test_praveen", "test_claims", ExampleService);

export default thirdPartyCustomUIComponents;

import React from "react";

import ExampleService from "./ExampleService.js";
import CNTKImageRecognition from "./CNTKImageRecognition.js";
import CNTKNextDayTrend from "./CNTKNextDayTrend.js";
import CNTKLSTMForecast from "./CNTKLSTMForecast.js";
import CNTKLanguageUnderstanding from "./CNTKLanguageUnderstanding.js";
import I3DActionRecognition from "./I3DActionRecognition.js";
import OpenNMTRomanceTranslator from "./OpenNMTRomanceTranslator.js";
import S2VTVideoCaptioning from "./S2VTVideoCaptioning.js";
import YOLOv3ObjectDetection from "./YOLOv3ObjectDetection.js";
import Zeta36ChessAlphaZero from "./Zeta36ChessAlphaZero.js";
import AutomaticSpeechRecognition from "./AutomaticSpeechRecognition.js";
import NeuralSpeechSynthesis from "./NeuralSpeechSynthesis.js";
import LongQuestionAsnswering from "./LongQuestionAsnswering.js";
import ShortQuestionAnswering from "./ShortQuestionAnswering.js";
import BinarySemanticSimilarity from "./BinarySemanticSimilarity.js";
import NamedEntityRecognitionService from "./NamedEntityRecognitionService.js";
import SentimentAnalysisService from "./SentimentAnalysisService";
import TimeSeriesAnomalyDiscoveryService from "./TimeSeriesAnomalyDiscoveryService.js";
import VisualQAOpencog from "./VisualQAOpencog.js";
import MosesService from "./MosesService";
import SemanticSegmentationService from "./SemanticSegmentation.js";
import FaceDetectService from "./FaceDetectService";
import FaceLandmarksService from "./FaceLandmarksService";
import FaceAlignService from "./FaceAlignService";
import FaceIdentityService from "./FaceIdentityService";
import EmotionRecognitionService from "./EmotionRecognitionService";
import HolisticEdgeDetectionService from "./HolisticEdgeDetectionService";
import ImageRetrievalService from "./ImageRetrievalService";
import GeneAnnotationService from "./GeneAnnotationService";
import TranslationService from "./TranslationService";
import NewsSummaryService from "./NewsSummaryService";
import StyleTransfer from "./StyleTransfer";
import LanguageDetectionService from "./LanguageDetectionService";
import CoreferenceResolutionService from "./CoreferenceResolutionService";
import NamedEntityDisambiguation from "./NamedEntityDisambiguation";
import NetworkAnalysisBipartite from "./NetworkAnalysisBipartite";
import NetworkAnalysisRobustness from "./NetworkAnalysisRobustness";
import TopicAnalysis from "./TopicAnalysisService";
import Places365SceneRecognition from "./Places365SceneRecognition";
import SuperResolution from "./SuperResolution";
import SemanticSegmentationAerial from "./SemanticSegmentationAerial";
import SiggraphColorization from "./SiggraphColorization";
import MessageBox from "../../components/common/MessageBox";

const defaultChainId = -1;

export default class SampleServices {
  constructor() {
    this.serviceOrgIDToComponent = {};
    this.serviceOrgIDToComponent[this.generateUniqueID("snet", "example-service", defaultChainId)] = ExampleService;
    this.serviceOrgIDToComponent[
      this.generateUniqueID("snet", "cntk-image-recon", defaultChainId)
    ] = CNTKImageRecognition;
    this.serviceOrgIDToComponent[
      this.generateUniqueID("snet", "cntk-next-day-trend", defaultChainId)
    ] = CNTKNextDayTrend;
    this.serviceOrgIDToComponent[
      this.generateUniqueID("snet", "cntk-lstm-forecast", defaultChainId)
    ] = CNTKLSTMForecast;
    this.serviceOrgIDToComponent[
      this.generateUniqueID("snet", "cntk-language-understanding", defaultChainId)
    ] = CNTKLanguageUnderstanding;
    this.serviceOrgIDToComponent[
      this.generateUniqueID("snet", "i3d-video-action-recognition", defaultChainId)
    ] = I3DActionRecognition;
    this.serviceOrgIDToComponent[
      this.generateUniqueID("snet", "opennmt-romance-translator", defaultChainId)
    ] = OpenNMTRomanceTranslator;
    this.serviceOrgIDToComponent[
      this.generateUniqueID("snet", "s2vt-video-captioning", defaultChainId)
    ] = S2VTVideoCaptioning;
    this.serviceOrgIDToComponent[
      this.generateUniqueID("snet", "yolov3-object-detection", defaultChainId)
    ] = YOLOv3ObjectDetection;
    this.serviceOrgIDToComponent[
      this.generateUniqueID("snet", "zeta36-chess-alpha-zero", defaultChainId)
    ] = Zeta36ChessAlphaZero;
    this.serviceOrgIDToComponent[
      this.generateUniqueID("snet", "speech-recognition", defaultChainId)
    ] = AutomaticSpeechRecognition;
    this.serviceOrgIDToComponent[
      this.generateUniqueID("snet", "speech-synthesis", defaultChainId)
    ] = NeuralSpeechSynthesis;
    this.serviceOrgIDToComponent[
      this.generateUniqueID("snet", "question-answering-long-seq", defaultChainId)
    ] = LongQuestionAsnswering;
    this.serviceOrgIDToComponent[
      this.generateUniqueID("snet", "question-answering-short-seq", defaultChainId)
    ] = ShortQuestionAnswering;
    this.serviceOrgIDToComponent[
      this.generateUniqueID("snet", "semantic-similarity-binary", defaultChainId)
    ] = BinarySemanticSimilarity;
    this.serviceOrgIDToComponent[this.generateUniqueID("snet", "opencog-vqa", defaultChainId)] = VisualQAOpencog;
    this.serviceOrgIDToComponent[
      this.generateUniqueID("snet", "named-entity-recognition", defaultChainId)
    ] = NamedEntityRecognitionService;
    this.serviceOrgIDToComponent[
      this.generateUniqueID("snet", "sentiment-analysis", defaultChainId)
    ] = SentimentAnalysisService;
    this.serviceOrgIDToComponent[
      this.generateUniqueID("snet", "time-series-anomaly-discovery", defaultChainId)
    ] = TimeSeriesAnomalyDiscoveryService;
    this.serviceOrgIDToComponent[this.generateUniqueID("snet", "moses-service", defaultChainId)] = MosesService;
    this.serviceOrgIDToComponent[
      this.generateUniqueID("snet", "semantic-segmentation", defaultChainId)
    ] = SemanticSegmentationService;
    this.serviceOrgIDToComponent[this.generateUniqueID("snet", "face-detect", defaultChainId)] = FaceDetectService;
    this.serviceOrgIDToComponent[
      this.generateUniqueID("snet", "face-landmarks", defaultChainId)
    ] = FaceLandmarksService;
    this.serviceOrgIDToComponent[this.generateUniqueID("snet", "face-align", defaultChainId)] = FaceAlignService;
    this.serviceOrgIDToComponent[this.generateUniqueID("snet", "face-identity", defaultChainId)] = FaceIdentityService;
    this.serviceOrgIDToComponent[
      this.generateUniqueID("snet", "emotion-recognition-service", defaultChainId)
    ] = EmotionRecognitionService;
    this.serviceOrgIDToComponent[
      this.generateUniqueID("snet", "holistic-edge-detection-service", defaultChainId)
    ] = HolisticEdgeDetectionService;
    this.serviceOrgIDToComponent[
      this.generateUniqueID("snet", "image-retrieval-service", defaultChainId)
    ] = ImageRetrievalService;
    this.serviceOrgIDToComponent[
      this.generateUniqueID("snet", "gene-annotation-service", defaultChainId)
    ] = GeneAnnotationService;
    this.serviceOrgIDToComponent[this.generateUniqueID("snet", "translation", defaultChainId)] = TranslationService;
    this.serviceOrgIDToComponent[this.generateUniqueID("snet", "news-summary", defaultChainId)] = NewsSummaryService;
    this.serviceOrgIDToComponent[this.generateUniqueID("snet", "style-transfer", defaultChainId)] = StyleTransfer;
    this.serviceOrgIDToComponent[
      this.generateUniqueID("snet", "language-detection", defaultChainId)
    ] = LanguageDetectionService;
    this.serviceOrgIDToComponent[
      this.generateUniqueID("snet", "coreference-resolution-service", defaultChainId)
    ] = CoreferenceResolutionService;
    this.serviceOrgIDToComponent[
      this.generateUniqueID("snet", "named-entity-disambiguation", defaultChainId)
    ] = NamedEntityDisambiguation;
    this.serviceOrgIDToComponent[
      this.generateUniqueID("snet", "network-analytics-robustness", defaultChainId)
    ] = NetworkAnalysisRobustness;
    this.serviceOrgIDToComponent[
      this.generateUniqueID("snet", "network-analytics-bipartite", defaultChainId)
    ] = NetworkAnalysisBipartite;
    this.serviceOrgIDToComponent[this.generateUniqueID("snet", "topic-analysis", defaultChainId)] = TopicAnalysis;
    this.serviceOrgIDToComponent[
      this.generateUniqueID("snet", "places365-scene-recognition", defaultChainId)
    ] = Places365SceneRecognition;
    this.serviceOrgIDToComponent[this.generateUniqueID("snet", "super-resolution", defaultChainId)] = SuperResolution;
    this.serviceOrgIDToComponent[
      this.generateUniqueID("snet", "semantic-segmentation-aerial", defaultChainId)
    ] = SemanticSegmentationAerial;
    this.serviceOrgIDToComponent[
      this.generateUniqueID("snet", "siggraph-colorization", defaultChainId)
    ] = SiggraphColorization;
  }

  generateUniqueID(orgId, serviceId, chainId) {
    return orgId + "__$%^^%$__" + serviceId + "__$%^^%$__" + chainId;
  }

  getComponent(orgId, serviceId, chainId) {
    let component = this.serviceOrgIDToComponent[this.generateUniqueID(orgId, serviceId, chainId)];
    if (typeof component === "undefined") {
      component = this.serviceOrgIDToComponent[this.generateUniqueID(orgId, serviceId, defaultChainId)];
      if (typeof component === "undefined") {
        component = <MessageBox type="error" errorMsg="No Component matched" />;
      }
    }
    return component;
  }
}

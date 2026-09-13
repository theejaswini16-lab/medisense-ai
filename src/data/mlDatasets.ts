export interface MLFeatureDef {
  name: string;
  type: "numerical" | "categorical" | "boolean" | "image_tensor";
  importance?: number;
  description: string;
}

export interface MLDataset {
  id: string;
  name: string;
  shortName: string;
  category: "Dermatology & Skin Lesions" | "Multi-Symptom Disease Diagnostic" | "Pulmonary Chest Radiography" | "Epidemiological Vector Outbreak" | "Emergency Clinical Triage";
  modality: "Deep Learning (Computer Vision)" | "Machine Learning (Tabular)" | "Deep Learning (Medical Imaging)" | "Time-Series / Forecasting";
  totalSamples: number;
  featuresCount: number;
  targetClassesCount: number;
  classes: string[];
  primaryModel: string;
  accuracy: number;
  f1Score: number;
  rocAuc: number;
  latencyMs: number;
  description: string;
  clinicalRelevance: string;
  paperReference: string;
  features: MLFeatureDef[];
  sampleRecords: any[];
}

export interface ModelBenchmark {
  id: string;
  modelName: string;
  architecture: string;
  parameters: string;
  datasetName: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  aucRoc: number;
  latencyMs: number;
  type: "Deep Learning" | "Machine Learning";
}

// 1. HAM10000 / ISIC Skin Lesion Deep Learning Dataset (Dermatology)
export const HAM10000_DATASET: MLDataset = {
  id: "dermatology-isic",
  name: "ISIC / HAM10000 Dermatology & Skin Lesion Dataset",
  shortName: "Dermatology Lesion Vision",
  category: "Dermatology & Skin Lesions",
  modality: "Deep Learning (Computer Vision)",
  totalSamples: 10015,
  featuresCount: 12,
  targetClassesCount: 7,
  classes: [
    "Melanoma (mel)",
    "Melanocytic Nevi (nv)",
    "Basal Cell Carcinoma (bcc)",
    "Actinic Keratoses (akiec)",
    "Benign Keratosis (bkl)",
    "Dermatofibroma (df)",
    "Vascular Lesions (vasc)"
  ],
  primaryModel: "ResNet-50 / DenseNet-121 CNN + Grad-CAM",
  accuracy: 97.6,
  f1Score: 0.972,
  rocAuc: 0.991,
  latencyMs: 38,
  description: "A benchmark collection of 10,015 dermatoscopic image cases collected across diverse population cohorts with histopathological confirmation, utilized to train deep convolutional neural networks for early melanoma and malignant skin cancer detection.",
  clinicalRelevance: "Enables early non-invasive triage of malignant melanomas versus benign lesions at primary healthcare clinics without immediate biopsy wait times.",
  paperReference: "Tschandl et al., 'The HAM10000 dataset, a large collection of multi-source dermatoscopic images of common pigmented skin lesions', Nature Sci Data 2018.",
  features: [
    { name: "image_id", type: "categorical", description: "Unique dermatoscopic specimen identifier" },
    { name: "lesion_id", type: "categorical", description: "Tracking ID for multi-followup lesion instances" },
    { name: "dx", type: "categorical", description: "Ground truth histopathological diagnosis label" },
    { name: "dx_type", type: "categorical", description: "Confirmation method: histopathology, consensus, confocal" },
    { name: "age", type: "numerical", importance: 0.18, description: "Patient age in years (10 - 85)" },
    { name: "sex", type: "categorical", importance: 0.09, description: "Biological sex (male, female, unknown)" },
    { name: "localization", type: "categorical", importance: 0.22, description: "Anatomical site: back, lower extremity, trunk, face, chest, abdomen" },
    { name: "asymmetry_score", type: "numerical", importance: 0.34, description: "Computed lesion contour asymmetry metric (0.0 - 1.0)" },
    { name: "border_irregularity", type: "numerical", importance: 0.38, description: "Border gradient irregularity and notched margins (0.0 - 1.0)" },
    { name: "color_variegation", type: "numerical", importance: 0.41, description: "Color variance across pigment network (RGB entropy)" },
    { name: "diameter_mm", type: "numerical", importance: 0.29, description: "Maximum lesion diameter measured in millimeters" },
    { name: "dermoscopic_structures", type: "categorical", importance: 0.31, description: "Pigment network, globules, streaks, blue-white veil" }
  ],
  sampleRecords: [
    {
      id: "ISIC_0024306",
      dx: "Melanoma (mel)",
      risk: "High / Malignant",
      age: 58,
      sex: "male",
      localization: "back",
      diameter_mm: 7.2,
      asymmetry_score: 0.82,
      border_irregularity: 0.79,
      color_variegation: 0.88,
      confidence: 96.4,
      gradCamFocus: "Upper-left eccentric border",
      visualColor: "#5c2c16",
      patternType: "Multicomponent with blue-white veil"
    },
    {
      id: "ISIC_0027419",
      dx: "Melanocytic Nevi (nv)",
      risk: "Low / Benign",
      age: 32,
      sex: "female",
      localization: "lower extremity",
      diameter_mm: 4.1,
      asymmetry_score: 0.14,
      border_irregularity: 0.11,
      color_variegation: 0.18,
      confidence: 98.2,
      gradCamFocus: "Uniform central pigment network",
      visualColor: "#8b5a2b",
      patternType: "Reticular regular grid"
    },
    {
      id: "ISIC_0030112",
      dx: "Basal Cell Carcinoma (bcc)",
      risk: "High / Malignant",
      age: 69,
      sex: "male",
      localization: "face",
      diameter_mm: 6.0,
      asymmetry_score: 0.68,
      border_irregularity: 0.72,
      color_variegation: 0.64,
      confidence: 94.8,
      gradCamFocus: "Translucent nodular border with telangiectasia",
      visualColor: "#c27ba0",
      patternType: "Arborizing vessels with ulceration"
    },
    {
      id: "ISIC_0028901",
      dx: "Actinic Keratoses (akiec)",
      risk: "Medium / Pre-cancerous",
      age: 71,
      sex: "female",
      localization: "upper extremity",
      diameter_mm: 5.4,
      asymmetry_score: 0.54,
      border_irregularity: 0.58,
      color_variegation: 0.51,
      confidence: 91.5,
      gradCamFocus: "Erythematous background with scaly keratosis",
      visualColor: "#d5a6bd",
      patternType: "Strawberry pattern with surface scale"
    },
    {
      id: "ISIC_0032445",
      dx: "Benign Keratosis (bkl)",
      risk: "Low / Benign",
      age: 64,
      sex: "male",
      localization: "trunk",
      diameter_mm: 8.5,
      asymmetry_score: 0.32,
      border_irregularity: 0.28,
      color_variegation: 0.44,
      confidence: 95.1,
      gradCamFocus: "Keratin-filled pseudocysts",
      visualColor: "#7f6000",
      patternType: "Crypts, fissures, and milia-like cysts"
    },
    {
      id: "ISIC_0026778",
      dx: "Vascular Lesions (vasc)",
      risk: "Low / Benign",
      age: 44,
      sex: "female",
      localization: "abdomen",
      diameter_mm: 3.2,
      asymmetry_score: 0.12,
      border_irregularity: 0.16,
      color_variegation: 0.35,
      confidence: 97.9,
      gradCamFocus: "Red-purple vascular lacunae",
      visualColor: "#990000",
      patternType: "Sharply demarcated red lacunae"
    }
  ]
};

// 2. MediSense Multi-Symptom Disease Tabular Dataset (Machine Learning)
export const SYMPTOM_TABULAR_DATASET: MLDataset = {
  id: "symptom-tabular-42k",
  name: "MediSense Multi-Symptom Disease Diagnostic Dataset",
  shortName: "Multi-Symptom Tabular",
  category: "Multi-Symptom Disease Diagnostic",
  modality: "Machine Learning (Tabular)",
  totalSamples: 42500,
  featuresCount: 132,
  targetClassesCount: 42,
  classes: [
    "Malaria (Plasmodium Vivax/Falciparum)",
    "Dengue Hemorrhagic Fever",
    "Acute Viral Bronchitis",
    "Typhoid Enteric Fever",
    "Bacterial Pneumonia",
    "Acute Gastroenteritis",
    "Pulmonary Tuberculosis",
    "Type 2 Diabetes Mellitus",
    "Essential Hypertension",
    "Iron-Deficiency Anemia"
  ],
  primaryModel: "Gradient Boosted Trees (XGBoost / LightGBM) & Random Forest",
  accuracy: 98.4,
  f1Score: 0.982,
  rocAuc: 0.996,
  latencyMs: 14,
  description: "A clinically stratified dataset containing 42,500 patient diagnostic sessions across 132 binary and continuous clinical indicators, vital signs, and epidemiological demographics for non-invasive automated disease classification.",
  clinicalRelevance: "Powers the primary symptom checker to compute differential disease probabilities, ICD-10 codings, and clinical emergency triage scores in under 15ms.",
  paperReference: "Rajpurkar et al., 'AI-driven Clinical Differential Diagnosis on Multi-Modal Health Records', Lancet Digital Health.",
  features: [
    { name: "high_fever_temp_f", type: "numerical", importance: 0.44, description: "Body temperature measured in Fahrenheit (>101°F)" },
    { name: "persistent_cough", type: "boolean", importance: 0.36, description: "Cough lasting >5 consecutive days" },
    { name: "shivering_chills", type: "boolean", importance: 0.39, description: "Rigor and shivering episodes" },
    { name: "platelet_count_k", type: "numerical", importance: 0.41, description: "Platelet count (thousands/mcL; thrombocytopenia marker)" },
    { name: "systolic_bp", type: "numerical", importance: 0.28, description: "Systolic blood pressure in mmHg" },
    { name: "diastolic_bp", type: "numerical", importance: 0.24, description: "Diastolic blood pressure in mmHg" },
    { name: "spo2_saturation", type: "numerical", importance: 0.37, description: "Blood oxygen saturation percentage (SpO2)" },
    { name: "headache_severity", type: "numerical", importance: 0.31, description: "Retro-orbital or generalized headache scale (0 - 10)" },
    { name: "abdominal_pain", type: "boolean", importance: 0.29, description: "Colicky or generalized abdominal cramping" },
    { name: "joint_muscle_pain", type: "boolean", importance: 0.35, description: "Severe myalgia and arthralgia (breakbone fever indicator)" },
    { name: "rash_presence", type: "boolean", importance: 0.33, description: "Maculopapular or petechial rash presentation" },
    { name: "urban_vector_exposure", type: "boolean", importance: 0.27, description: "Residence in high-standing water municipal ward" }
  ],
  sampleRecords: [
    {
      id: "REC-41901",
      age: 38,
      sex: "Male",
      temp_f: 103.2,
      spo2: 97,
      bp: "118/78",
      platelets: 68,
      symptoms: ["High Fever", "Severe Retro-Orbital Pain", "Joint Pain", "Petechial Rash"],
      predictedDisease: "Dengue Hemorrhagic Fever",
      riskLevel: "Red (Critical Monitoring)",
      probability: 94.6,
      shapTopFeature: "Platelet drop (<100k) + High Fever"
    },
    {
      id: "REC-41902",
      age: 26,
      sex: "Female",
      temp_f: 102.5,
      spo2: 98,
      bp: "122/80",
      platelets: 190,
      symptoms: ["Cyclic Chills", "High Fever", "Profuse Sweating", "Splenomegaly"],
      predictedDisease: "Malaria (Plasmodium Vivax)",
      riskLevel: "Red (Prompt Antimalarial)",
      probability: 92.1,
      shapTopFeature: "Shivering Chills with 48hr Cyclic Spikes"
    },
    {
      id: "REC-41903",
      age: 54,
      sex: "Male",
      temp_f: 100.8,
      spo2: 93,
      bp: "135/88",
      platelets: 240,
      symptoms: ["Productive Cough", "Chest Wheezing", "Smog Irritation", "Dyspnea"],
      predictedDisease: "Acute Viral Bronchitis / Smog Exacerbation",
      riskLevel: "Yellow (Moderate)",
      probability: 88.7,
      shapTopFeature: "Oxygen SpO2 93% + Wheezing"
    },
    {
      id: "REC-41904",
      age: 22,
      sex: "Female",
      temp_f: 101.9,
      spo2: 99,
      bp: "110/72",
      platelets: 215,
      symptoms: ["Step-ladder Fever", "Abdominal Tenderness", "Bradycardia", "Coated Tongue"],
      predictedDisease: "Typhoid Enteric Fever",
      riskLevel: "Yellow (Antibiotic Protocol)",
      probability: 89.3,
      shapTopFeature: "Step-ladder persistent fever pattern"
    },
    {
      id: "REC-41905",
      age: 67,
      sex: "Male",
      temp_f: 102.8,
      spo2: 89,
      bp: "142/92",
      platelets: 260,
      symptoms: ["Chest Pain on Inhalation", "Rust-colored Sputum", "High Fever", "Tachypnea"],
      predictedDisease: "Bacterial Pneumonia (Lobar)",
      riskLevel: "Red (Immediate Inpatient)",
      probability: 96.2,
      shapTopFeature: "Low SpO2 (89%) + Inhalatory Chest Pain"
    }
  ]
};

// 3. ChestX-ray14 Deep Learning Pulmonary Radiography Dataset
export const CHEST_XRAY_DATASET: MLDataset = {
  id: "chest-xray-14",
  name: "NIH ChestX-ray14 Deep Learning Thoracic Radiography Dataset",
  shortName: "Chest Radiography Vision",
  category: "Pulmonary Chest Radiography",
  modality: "Deep Learning (Medical Imaging)",
  totalSamples: 112120,
  featuresCount: 15,
  targetClassesCount: 14,
  classes: [
    "Atelectasis",
    "Cardiomegaly",
    "Effusion",
    "Infiltration",
    "Mass",
    "Nodule",
    "Pneumonia",
    "Pneumothorax",
    "Consolidation",
    "Edema",
    "Emphysema",
    "Fibrosis",
    "Pleural Thickening",
    "Hernia"
  ],
  primaryModel: "DenseNet-121 Multi-Label CNN + Grad-CAM Saliency",
  accuracy: 94.2,
  f1Score: 0.938,
  rocAuc: 0.978,
  latencyMs: 44,
  description: "Comprises 112,120 frontal-view X-ray images of 30,805 unique patients with text-mined disease labels, utilized globally to benchmark computer vision architectures for automatic thoracic pathology screening.",
  clinicalRelevance: "Assists radiologists in high-workload urban hospitals to immediately flag emergency tension pneumothorax, lobar pneumonia consolidation, and pleural effusion.",
  paperReference: "Wang et al., 'ChestX-ray8: Hospital-scale Chest X-ray Database and Benchmarks on Weakly-Supervised Classification', IEEE CVPR 2017.",
  features: [
    { name: "radiograph_tensor", type: "image_tensor", importance: 0.65, description: "1024x1024 16-bit grayscale DICOM/PNG projection" },
    { name: "view_position", type: "categorical", importance: 0.12, description: "Posteroanterior (PA) or Anteroposterior (AP)" },
    { name: "patient_age", type: "numerical", importance: 0.11, description: "Patient age at exposure time (years)" },
    { name: "patient_gender", type: "categorical", importance: 0.05, description: "Gender identifier (M / F)" },
    { name: "lung_opacity_ratio", type: "numerical", importance: 0.38, description: "Computed density ratio of bilateral pulmonary fields" },
    { name: "costophrenic_angle_blunting", type: "boolean", importance: 0.42, description: "Loss of sharpness indicating fluid accumulation" },
    { name: "cardiothoracic_ratio", type: "numerical", importance: 0.35, description: "Cardiac width / Thoracic width (>0.5 indicates cardiomegaly)" }
  ],
  sampleRecords: [
    {
      id: "CXR_00018241_003",
      findings: "Pneumonia + Infiltration",
      view: "PA",
      age: 49,
      gender: "M",
      opacityScore: 0.74,
      confidence: 94.8,
      gradCamRegion: "Right lower lobe dense alveolar consolidation",
      urgency: "High / Hospital Admission"
    },
    {
      id: "CXR_00004921_001",
      findings: "Cardiomegaly + Pleural Effusion",
      view: "PA",
      age: 68,
      gender: "F",
      opacityScore: 0.69,
      confidence: 93.1,
      gradCamRegion: "Left costophrenic sulcus blunting & enlarged cardiac silhouette",
      urgency: "High / Diuretic Evaluation"
    },
    {
      id: "CXR_00021004_008",
      findings: "Pneumothorax (Left Apical)",
      view: "AP",
      age: 27,
      gender: "M",
      opacityScore: 0.81,
      confidence: 96.5,
      gradCamRegion: "Visceral pleural line with peripheral lucency and absent lung markings",
      urgency: "CRITICAL / Immediate Chest Tube Decompression"
    },
    {
      id: "CXR_00010992_002",
      findings: "Normal / Clear Lung Fields",
      view: "PA",
      age: 34,
      gender: "F",
      opacityScore: 0.05,
      confidence: 98.9,
      gradCamRegion: "Clear bilateral parenchymal lucency and sharp diaphragmatic domes",
      urgency: "Low / Outpatient Clearance"
    }
  ]
};

// 4. Urban Vector & Outbreak Epidemiological Time-Series Dataset
export const OUTBREAK_TIME_SERIES_DATASET: MLDataset = {
  id: "urban-vector-epidemiology",
  name: "Urban Municipal Vector Surveillance & Outbreak Time-Series Dataset",
  shortName: "Vector Outbreak Forecasting",
  category: "Epidemiological Vector Outbreak",
  modality: "Time-Series / Forecasting",
  totalSamples: 8400,
  featuresCount: 18,
  targetClassesCount: 3,
  classes: ["Green (Baseline / Safe)", "Yellow (Vector Warning Spike)", "Red (Active Epidemic Clustered)"],
  primaryModel: "Temporal Fusion Transformer (TFT) & Bidirectional LSTM",
  accuracy: 95.8,
  f1Score: 0.954,
  rocAuc: 0.985,
  latencyMs: 22,
  description: "Weekly multivariate time-series records tracking municipal ward climate (precipitation, ambient humidity, temperature), water quality index, larval Breteau Index, and confirmed vector transmissions for proactive outbreak warning.",
  clinicalRelevance: "Provides 14-day advance notice to municipal health officers to deploy fogging units and distribute mosquito bed nets before hospital ICU saturation.",
  paperReference: "World Health Organization (WHO) Guidelines for Vector-Borne Disease Early Warning Systems.",
  features: [
    { name: "rainfall_weekly_mm", type: "numerical", importance: 0.42, description: "Cumulative weekly precipitation (mm)" },
    { name: "avg_ambient_temp_c", type: "numerical", importance: 0.33, description: "Mean ambient temperature (°C)" },
    { name: "humidity_index", type: "numerical", importance: 0.36, description: "Relative atmospheric humidity percentage" },
    { name: "larval_breteau_index", type: "numerical", importance: 0.48, description: "Positive water containers per 100 inspected dwellings" },
    { name: "water_quality_index", type: "numerical", importance: 0.39, description: "Composite municipal water purity index (0 - 100)" },
    { name: "confirmed_dengue_cases", type: "numerical", importance: 0.45, description: "Confirmed weekly RT-PCR or NS1 antigen positives" }
  ],
  sampleRecords: [
    {
      id: "WARD-SEC4-WK29",
      sector: "Sector 4 Metro Central",
      rainfall_mm: 142.5,
      humidity: 86,
      temp_c: 29.4,
      breteau_index: 48.2,
      wqi: 48,
      activeCases: 42,
      predictedNextWeek: 68,
      alertLevel: "Red (Severe Cluster Alert)",
      primaryVector: "Aedes aegypti (Dengue)"
    },
    {
      id: "WARD-IND-WK29",
      sector: "East Industrial Zone",
      rainfall_mm: 110.0,
      humidity: 82,
      temp_c: 31.0,
      breteau_index: 34.0,
      wqi: 52,
      activeCases: 29,
      predictedNextWeek: 35,
      alertLevel: "Yellow (Accelerating Vector Risk)",
      primaryVector: "Anopheles stephensi (Malaria)"
    },
    {
      id: "WARD-UPT-WK29",
      sector: "West Uptown Hills",
      rainfall_mm: 35.0,
      humidity: 58,
      temp_c: 26.5,
      breteau_index: 6.5,
      wqi: 88,
      activeCases: 3,
      predictedNextWeek: 2,
      alertLevel: "Green (Stable Baseline)",
      primaryVector: "None / Low Vector Count"
    }
  ]
};

// 5. Model Architecture Comparison Benchmarks
export const MODEL_BENCHMARKS: ModelBenchmark[] = [
  {
    id: "bm-xgboost",
    modelName: "MediSense-XGBoost v3.2",
    architecture: "Extreme Gradient Boosting Decision Ensemble (Tree Depth: 8, n_estimators: 450)",
    parameters: "14.2M Nodes",
    datasetName: "Multi-Symptom Tabular (42k)",
    accuracy: 98.4,
    precision: 98.2,
    recall: 98.6,
    f1Score: 0.984,
    aucRoc: 0.996,
    latencyMs: 12,
    type: "Machine Learning"
  },
  {
    id: "bm-resnet50",
    modelName: "DermNet-ResNet50 Vision",
    architecture: "Deep Residual Network (50 Convolutional Layers, Pre-trained ImageNet + ISIC Fine-tune)",
    parameters: "25.6M Params",
    datasetName: "HAM10000 Dermatology (10k)",
    accuracy: 97.6,
    precision: 97.4,
    recall: 97.1,
    f1Score: 0.972,
    aucRoc: 0.991,
    latencyMs: 38,
    type: "Deep Learning"
  },
  {
    id: "bm-densenet121",
    modelName: "PulmoDenseNet-121",
    architecture: "Densely Connected Convolutional Network with Multi-Label Sigmoid Activation & Grad-CAM",
    parameters: "8.1M Params",
    datasetName: "NIH ChestX-ray14 (112k)",
    accuracy: 94.2,
    precision: 93.9,
    recall: 94.5,
    f1Score: 0.938,
    aucRoc: 0.978,
    latencyMs: 44,
    type: "Deep Learning"
  },
  {
    id: "bm-random-forest",
    modelName: "Clinical-RandomForest-100",
    architecture: "Random Forest Classifier (100 Trees, Gini Impurity, Cost-Complexity Pruning)",
    parameters: "8.9M Nodes",
    datasetName: "Multi-Symptom Tabular (42k)",
    accuracy: 97.8,
    precision: 97.5,
    recall: 97.9,
    f1Score: 0.977,
    aucRoc: 0.992,
    latencyMs: 18,
    type: "Machine Learning"
  },
  {
    id: "bm-tft-lstm",
    modelName: "Epidemic-TFT-Temporal",
    architecture: "Temporal Fusion Transformer with Self-Attention & Multi-Horizon Quantile Loss",
    parameters: "4.8M Params",
    datasetName: "Urban Vector Outbreak Time-Series",
    accuracy: 95.8,
    precision: 95.2,
    recall: 96.0,
    f1Score: 0.954,
    aucRoc: 0.985,
    latencyMs: 22,
    type: "Deep Learning"
  }
];

// All Datasets bundle
export const ALL_ML_DATASETS: MLDataset[] = [
  HAM10000_DATASET,
  SYMPTOM_TABULAR_DATASET,
  CHEST_XRAY_DATASET,
  OUTBREAK_TIME_SERIES_DATASET
];

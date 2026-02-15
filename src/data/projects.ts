/**
 * @file 프로젝트 목록 데이터
 * @description
 * 역대 기수의 프로젝트 정보를 관리합니다.
 * 프로젝트 추가 시 `PROJECTS` 배열에 새 항목을 추가하면 됩니다.
 *
 * @note 실제 서비스로 전환 시, 이 데이터를 DB(Supabase 등)로 마이그레이션하고
 * Server Component에서 fetch하는 방식으로 교체할 수 있습니다.
 *
 * @used-by project-grid.tsx (프로젝트 페이지 — 그리드 카드 + 상세 다이얼로그)
 */

/* ─────────────────────────────────────────────
 * Types
 * ───────────────────────────────────────────── */

/** 프로젝트 팀원 */
export interface TeamMember {
  name: string;
  /** 역할 (예: "Frontend", "Backend", "Design/PM") */
  role: string;
}

/** 프로젝트 정보 */
export interface Project {
  /** 고유 식별자 */
  id: number;
  /** 프로젝트명 */
  name: string;
  /** 한 줄 설명 (카드 hover 시 표시) */
  description: string;
  /** 썸네일 경로 */
  thumbnail: string;
  /** 상세 설명 (다이얼로그에서 표시) */
  longDescription: string;
  /** 해당 기수 */
  generation: number;
/** GitHub 저장소 URL (FE/BE 분리) */
  githubUrl?: {
    frontend?: string;
    backend?: string;
    repo?: string; // 단일 레포일 경우를 대비ㄹㄹ
  };
  /** 배포 URL */
  deployUrl?: string;
  /** 팀원 목록 */
  team: TeamMember[];
  /** 수상 경력 */
  awards?: string[];
  /** 사용 기술 스택 */
  techStack: string[];
}

/* ─────────────────────────────────────────────
 * Data
 * ───────────────────────────────────────────── */

export const PROJECTS: Project[] = [
  // ── 13기 프로젝트 ──
  {
    id: 1,
    name: "2025 대동제",
    description: "연세대학교 개교 140주년 무악대동제 Scent of Blue 공식 웹사이트",
    thumbnail: "/images/projects/대동제.png",
    longDescription:
      "연세대학교 개교 140주년 무악대동제 Scent of Blue 공식 웹사이트는 연세의 역사와 정체성을 담은 140주년 무악대동제를 온라인에서 경험할 수 있도록 기획된 행사 안내 플랫폼입니다. 축제의 메인 콘셉트인 Scent of Blue를 시각적으로 풀어내어, 방문자가 축제의 분위기와 메시지를 자연스럽게 느낄 수 있도록 구성했으며, 공연 라인업, 일정, 부스 정보 등 핵심 정보를 직관적으로 확인할 수 있도록 설계되었습니다. 또한 학내 구성원과 외부 방문객 모두가 축제 전·중·후 필요한 정보를 쉽게 접근할 수 있도록 반응형 웹으로 구현하여, 대규모 오프라인 행사의 온라인 허브 역할을 수행했습니다.",
    generation: 13,
    githubUrl: {
      frontend: "https://github.com/Likelion-Yonsei-13th/SCENT-YONSEI-WEB.git",
      backend: "https://github.com/Likelion-Yonsei-13th/SCENT-YONSEI-SERVER.git"
    },
    deployUrl: "https://scent-yonsei.com/",
    team: [
      { name: "구서영", role: "Design/PM" },
      { name: "조윤희", role: "Design/PM" },
      { name: "김나연", role: "Frontend" },
      { name: "김나연", role: "Frontend" },
      { name: "박준열", role: "Frontend" },
      { name: "여민서", role: "Frontend" },
      { name: "윤영준", role: "Frontend" },
      { name: "이지호", role: "Frontend" },
      { name: "조민", role: "Frontend" },
      { name: "고선태", role: "Backend" },
      { name: "변호영", role: "Backend" },
      { name: "이수정", role: "Backend" },
      { name: "이준영", role: "Backend" },
    ],
    awards: ["총 방문자: 10,772명에게 실시간 정보 제공", "사용자 참여도: 방문자당 평균 13.5페이지 조회", "사용자 경험: 16% 이탈률로 높은 사용자 경험 입증", "모바일 최적화: 93% 모바일 사용률로 현장 활용도 극대화"],
    techStack: ["Next.js", "React", "Tailwind CSS", "Spring Boot"],
  },
  {
    id: 2,
    name: "NestOn",
    description: "사회초년생·대학생을 대상으로 매물 탐색부터 계약서 검토, 지역 정착까지 AI로 통합 지원하는 주거 플랫폼",
    thumbnail: "/images/projects/NestOn.webp",
    longDescription:
      "NestOn은 복잡한 부동산 정보와 계약 과정을 AI로 간편하게 해결하는 사회초년생·대학생 대상 주거 플랫폼입니다. 자연어 기반 챗봇을 통해 매물 추천, 계약서 검토, 지역 정착까지 전 과정을 통합 지원합니다.",
    generation: 13,
    githubUrl: {
      frontend: "https://github.com/Likelion-Yonsei-13th/13-HACKATHON-FRONTEND-NestOn.git", 
      backend: "https://github.com/Likelion-Yonsei-13th/13-HACKATHON-BACKEND-Pawsitive.git",
    },
    deployUrl: "",
    team: [
      { name: "이민재", role: "Design/PM" },
      { name: "이수연", role: "Design/PM" },
      { name: "이지호", role: "Frontend" },
      { name: "조민", role: "Frontend" },
      { name: "이동진", role: "Backend" },
      { name: "표영규", role: "Backend" },
    ],
    awards: [""],
    techStack: ["React", "Django"],
  },
  {
    id: 3,
    name: "IDEALAB",
    description: "지도 기반 AI 시뮬레이션을 통해 최적 입지와 예상 성과를 실시간으로 확인할 수 있는 예비 창업자 지원 플랫폼",
    thumbnail: "/images/projects/IDEALAB.webp",
    longDescription:
      "예비 창업자가 지도 기반 AI 시뮬레이션으로 최적 입지와 예상 성과를 실시간 확인하는 플랫폼입니다.",
    generation: 13,
    githubUrl: {
      frontend: "https://github.com/Likelion-Yonsei-13th/13-HACKATHON-FRONTEND-IDEALAB.git",
      backend: "https://github.com/Likelion-Yonsei-13th/13-HACKATHON-BACKEND-IDEALAB.git",
    },
    team: [
      { name: "강서현", role: "Design/PM" },
      { name: "이윤서", role: "Design/PM" },
      { name: "오유진", role: "Frontend" },
      { name: "임기주", role: "Frontend" },
      { name: "우태호", role: "Backend" },
      { name: "이수정", role: "Backend" },
    ],
    awards: [""],
    techStack: ["React", "Django"],
  },
  {
    id: 4,
    name: "픽플",
    description: "신촌 지역 요식업 소상공인을 위해 음식 사진 보정과 레퍼런스 탐색을 지원하는 AI 기반 브랜딩 플랫폼",
    thumbnail: "/images/projects/픽플.webp",
    longDescription:
      "가게 홍보 및 브랜딩을 목적으로 감성적인 음식 사진 제작에 어려움을 겪는 신촌 지역 요식업 소상공인을 위한 AI 기반 음식 이미지 보정 & 레퍼런스 탐색 플랫폼입니다.",
    generation: 13,
    githubUrl: {
      frontend: "https://github.com/Likelion-Yonsei-13th/13-HACKATHON-FRONTEND-YonVoyage.git",
      backend: "https://github.com/Likelion-Yonsei-13th/13-HACKATHON-BACKTEND-YonVoyage.git",
    },
    deployUrl: "",
    team: [
      { name: "김나연", role: "Design/PM" },
      { name: "백하나", role: "Design/PM" },
      { name: "민경준", role: "Frontend" },
      { name: "여민서", role: "Frontend" },
      { name: "고선태", role: "Backend" },
      { name: "백세빈", role: "Backend" },
    ],
    awards: [""],
    techStack: ["React", "Express", "MySQL", "AWS S3"],
  },
  {
    id: 5,
    name: "쇼츠테이블",
    description: "사진·영상만 업로드하면 브랜드 맞춤 SNS 숏폼 홍보 영상을 자동 생성해주는 외식업 소상공인 대상 마케팅 플랫폼",
    thumbnail: "/images/projects/쇼츠테이블.png",
    longDescription:
      "쇼츠테이블은 SNS 마케팅의 필요성은 느끼지만 실행이 어려운 외식업 소상공인을 위해, 사진·영상만으로 브랜드 맞춤 숏폼 콘텐츠를 자동 생성하는 서비스입니다. 신촌 상권의 주요 소비층인 20~30대의 SNS 소비 패턴에 맞춰 효율적인 홍보를 지원합니다.",
    generation: 13,
    githubUrl: {
      frontend: "https://github.com/yyj0917/HT-Front.git",
      backend: "https://github.com/HT-HugeTeam/ShortsTable-Server.git",
    },
    team: [
      { name: "강문정", role: "Design/PM" },
      { name: "구서영", role: "Design/PM" },
      { name: "오은성", role: "Design/PM" },
      { name: "조윤희", role: "Design/PM" },
      { name: "윤영준", role: "Frontend" },
      { name: "박준열", role: "Backend" },
    ],
    awards: ["중앙해커톤 247팀 중 상위 12팀 달성"],
    techStack: [
      "NestJS",
      "Spring",
      "PostgreSQL",
      "Amazon S3",
      "OpenAI GPT",],
  },
  {
    id: 6,
    name: "돌봄온",
    description: "가족 간 간병 일정 조율과 기록 공유를 한 번에 해결하는 가족 간병 지원 플랫폼",
    thumbnail: "/images/projects/돌봄온.webp",
    longDescription:
      "돌봄온은 가족 간 간병 일정 조율과 기록 인수인계를 한 번에 해결하는 가족 간병 지원 서비스입니다. 공유 캘린더와 간편 로그·그래프 기능을 통해 돌봄 공백과 기록 누락을 줄이고, 가족 모두가 같은 정보를 보도록 돕습니다.",
    generation: 13,
    githubUrl: {
      frontend: "https://github.com/STRONG-OE-200/CAREON-FRONTEND.git",
      backend: "https://github.com/STRONG-OE-200/CAREON-BACKEND.git",
    },
    deployUrl: "",
    team: [
      { name: "강문정", role: "Design/PM" },
      { name: "이민재", role: "Design/PM" },
      { name: "오유진", role: "Frontend" },
      { name: "백세빈", role: "Backend" },
      { name: "이수정", role: "Backend" },
    ],
    awards: [""],
    techStack: ["React Native", "Firebase", "Chart.js"],
  },
  {
    id: 7,
    name: "D-TOUR",
    description: "여행자 취향을 기반으로 로컬이 직접 맞춤 여행 일정을 설계해주는 여행 매칭 플랫폼",
    thumbnail: "/images/projects/D-TOUR.webp",
    longDescription:
      "여행자 취향 기반으로 로컬(Local)이 직접 여행 일정을 맞춤 제작해주는 여행 매칭 플랫폼입니다.",
    generation: 13,
    githubUrl: {
      frontend: "",
      backend: "",
    },
    team: [
      { name: "강서현", role: "Design/PM" },
      { name: "백하나", role: "Design/PM" },
      { name: "조민", role: "Frontend" },
      { name: "고선태", role: "Backend" },
      { name: "표영규", role: "Backend" },
    ],
    awards: [""],
    techStack: ["Next.js", "Supabase", "Tailwind CSS"],
  },
  {
    id: 8,
    name: "SAI",
    description: "악의적 반응 없이 질문을 중심으로 생각을 나누고 대화를 아카이빙할 수 있는 콘텐츠 기반 대화 플랫폼",
    thumbnail: "/images/projects/SAI.webp",
    longDescription:
      "SAI는 악의적 반응 없이 생각을 나누고 싶은 사람들을 위한 질문 중심 대화 공간입니다. 콘텐츠 기반 질문과 대화 아카이빙 기능을 통해 깊이 있는 대화를 기록하고 인사이트가 휘발되지 않도록 돕습니다.",
    generation: 13,
    githubUrl: {
      frontend: "https://github.com/Yonsei-Demo3/SAI-FRONT.git",
      backend: "https://github.com/Yonsei-Demo3/BE_API.git",
    },
    deployUrl: "",
    team: [
      { name: "오은성", role: "Design/PM" },
      { name: "이윤서", role: "Design/PM" },
      { name: "변호영", role: "Frontend" },
      { name: "임기주", role: "Frontend" },
      { name: "우태호", role: "Backend" },
      { name: "이석원", role: "Backend" },
    ],
    awards: ["2025 신촌 대학 연합 SW 창업 경진 대회 본선 진출"],
    techStack: ["React", "Spring Boot"],
  },
  {
    id: 9,
    name: "Mind-Window",
    description: "심리 전문가들의 매일 한 마디 위로 메시지를 통해 치료 문턱을 낮추는 심리 상담 유도 플랫폼",
    thumbnail: "/images/projects/Mind-Window.png",
    longDescription:
      "Mind-Window는 정신 질환에 대한 사회적 편견과 비용 부담으로 인해 상담을 주저하는 환자들을 위해 기획되었습니다. 전문가들이 매일 작성하는 '위로의 메시지'를 통해 고객은 상담사의 스타일을 미리 파악하고 정서적 지지를 얻을 수 있습니다. 이를 통해 심리 상담에 대한 진입 장벽을 낮추고, 검증된 전문가와 자연스럽게 연결될 수 있는 기회 비용을 최소화하는 것을 목표로 합니다.",
    generation: 12,
    githubUrl: {
      frontend: "",
      backend: "",
    },
    deployUrl: "",
    team: [
      { name: "김연진", role: "Frontend" },
      { name: "박유정", role: "Frontend" },
      { name: "장서린", role: "Frontend" },
      { name: "손혁제", role: "Frontend" },
      { name: "이석원", role: "Backend" },
    ],
    awards: [""],
    techStack: ["React", "Spring Boot", "Figma"],
  },
  {
    id: 10,
    name: "ASSURE",
    description: "진단서 사진 업로드만으로 진단 기록 관리부터 보험금 청구까지 한번에 해결하는 헬스케어 플랫폼",
    thumbnail: "/images/projects/ASSURE.png",
    longDescription:
      "ASSURE는 '진단기록 관리와 보험금 청구의 일체화'를 목표로 하는 데이터 기반 헬스케어 서비스입니다. 사용자가 병원비 영수증이나 진단서를 촬영하여 업로드하면, OCR(광학 문자 인식)과 NLP(자연어 처리) 기술을 활용해 진료 과목, 금액, 질병 분류 등을 자동으로 데이터화합니다. 이를 통해 개인은 흩어져 있던 과거 진단 내역을 체계적으로 관리할 수 있으며, 복잡한 절차 없이 앱 내에서 바로 보험금을 청구하거나 예상 환급금을 계산할 수 있습니다. 특히 블록체인 기술을 적용하여 민감한 의료 정보의 보안성과 신뢰성을 높인 것이 핵심 경쟁력입니다.",
    generation: 12,
    githubUrl: {
      frontend: "",
      backend: "",
    },
    deployUrl: "",
    team: [
    ],
    awards: [""],
    techStack: ["OCR", "NLP", "Blockchain", "Data Analytics"],
  },
  {
    id: 11,
    name: "파수꾼",
    description: "치매 및 취약노인의 안전을 위해 신발 깔창형 GPS와 충격 감지 센서를 활용한 실시간 보호 서비스",
    thumbnail: "/images/projects/파수꾼.png",
    longDescription:
      "파수꾼은 급격히 증가하는 치매 노인 실종 사고와 기존 위치추적기의 낮은 접근성 문제를 해결하기 위해 기획된 취약노인 안전보호 서비스입니다. 매번 착용해야 하는 번거로움을 없애기 위해 '신발 깔창' 형태의 하드웨어에 GPS와 충격 감지 센서를 탑재했습니다. 이를 통해 보호자는 앱으로 노인의 실시간 위치를 확인할 수 있으며, 낙상 등 일정 수준 이상의 충격이 감지될 경우 자동으로 상황을 분석하여 구급대원에게 위치와 기저질환 정보를 전송하는 자동 신고 시스템을 갖추고 있습니다. 또한 현관 무선 충전 방식을 도입하여 기존의 불편한 충전 문제를 개선한 사후관리에 최적화된 헬스케어 솔루션입니다.",
    generation: 12,
    githubUrl: {
      frontend: "",
      backend: "",
    },
    deployUrl: "",
    team: [
    ],
    awards: [""],
    techStack: ["GPS", "IoT Sensor", "Mobile App", "Wireless Charging"],
  },
  {
    id: 12,
    name: "또밥",
    description: "1인 가구를 위한 AI 기반 식료품 유통기한 관리 및 맞춤형 건강 레시피 추천 플랫폼",
    thumbnail: "/images/projects/또밥.png",
    longDescription:
      "또밥은 급격히 증가하는 1인 가구의 가장 큰 고민인 '건강 관리'와 '식사 해결'을 동시에 공략하는 플랫폼입니다. 사용자가 보유한 식재료의 유통기한을 자동으로 관리하고, 기한이 임박한 재료를 활용한 최적의 레시피를 AI가 추천해줍니다. 단순한 관리를 넘어 영양 균형이 잡힌 식단을 제안하고, 부족한 단백질 등의 식재료를 최저가로 구매할 수 있도록 커머스와 연계하여 1인 가구의 건강하고 간편한 식생활을 돕습니다.",
    generation: 12,
    githubUrl: {
      frontend: "",
      backend: "",
    },
    deployUrl: "",
    team: [
      { name: "정세진", role: "Backend" },
      { name: "이준영", role: "Backend" },
      { name: "최소영", role: "Frontend" },
      { name: "박준형", role: "Frontend" },
    ],
    awards: [""],
    techStack: ["React", "Spring Boot", "AI 추천 엔진"],
  },
  {
    id: 13,
    name: "Zero",
    description: "게임처럼 즐겁게 기록하는 현대인 맞춤형 웰니스 칼로리 밸런스 관리 웹 서비스",
    thumbnail: "/images/projects/Zero.png",
    longDescription:
      "Zero는 바쁜 현대인들의 비만 및 당뇨 등 만성질환 발병률 급증 문제를 해결하기 위해 탄생한 웰니스 서비스입니다. '게임처럼 운동할 수 없을까?'라는 아이디어에서 시작하여, 섭취한 칼로리를 소모하기 위해 필요한 운동 시간을 직관적으로 계산해줌으로써 사용자에게 활력과 균형을 제공합니다. 기존의 복잡한 식단 기록 방식에서 벗어나 유사한 음식 카테고리를 통한 간편 기록 기능을 제공하며, 현재 위치 기반의 건강 식단 지도 서비스를 통해 실생활 밀착형 건강 관리를 돕습니다. 장기적으로는 주간 데이터를 시각화하여 사용자가 자신의 건강 정보를 한눈에 관리하고 개선할 수 있도록 설계되었습니다.",
    generation: 12,
    githubUrl: {
      frontend: "",
      backend: "",
    },
    deployUrl: "",
    team: [
      { name: "푸드바오", role: "Design/PM/Dev" },
    ],
    awards: [""],
    techStack: ["Django", "Python", "React", "JavaScript", "HTML/CSS"],
  },
  {
    id: 14,
    name: "maniaX",
    description: "소셜링과 랭킹 시스템을 통해 확실한 동기부여를 제공하는 친구 공동 휴대폰 사용 시간 관리 솔루션",
    thumbnail: "/images/projects/Maniax.png",
    longDescription:
      "maniaX는 매년 증가하는 현대인의 스마트폰 과의존 문제를 해결하기 위해 기획된 소셜 기반 시간 관리 서비스입니다. 기존의 시간 관리 앱들이 단순히 기능을 제한하거나 개인의 의지에만 의존했던 것과 달리, maniaX는 '함께하는 동기부여'에 집중합니다. 친구들과 그룹을 형성하여 서로의 스크린타임을 공유하고, 실시간 랭킹 시스템을 통해 건강한 경쟁을 유도합니다. 또한 그룹원 간 메시지 기능을 통해 상호 격려와 자극을 주고받을 수 있으며, 공동 목표 달성 시 환급을 해주는 비즈니스 모델을 도입하여 사용시간 관리에 강력하고 실질적인 동기를 제공합니다.",
    generation: 12,
    githubUrl: {
      frontend: "",
      backend: "",
    },
    deployUrl: "",
    team: [
      { name: "박준형", role: "Frontend" },
      { name: "최소영", role: "Frontend" },
      { name: "김준형", role: "Backend" },
      { name: "신예찬", role: "Backend" },
      { name: "정승연", role: "Backend" },
    ],
    awards: [""],
    techStack: ["Django", "Python", "HTML5", "CSS3", "JavaScript"],
  },
  {
    id: 15,
    name: "ForHero",
    description: "감정 분석과 동료 네트워킹을 통해 소방관의 외상 후 스트레스 장애(PTSD)를 예방하고 관리하는 정신건강 지원 플랫폼",
    thumbnail: "/images/projects/ForHero.png",
    longDescription:
      "ForHero는 극심한 스트레스와 트라우마에 노출된 소방관들을 위한 전용 심리 케어 서비스입니다. 기존 치료 서비스의 낮은 접근성과 심리적 거부감을 해결하기 위해 기획되었습니다. 소방관들이 작성한 개인 일기를 AI가 분석하여 현재의 심리 상태를 진단해주며, 직무 특성을 가장 잘 이해하는 동료 소방관 상담사와 1:1 매칭 기능을 제공하여 정서적 유대감을 강화합니다. 또한 시민들이 소방관에게 전하는 응원 메시지를 메인 화면에 배치하여 심리적 지지 기반을 형성하며, 소방청 인증을 통한 폐쇄형 커뮤니티 구조로 신뢰도 높은 마음돌봄 환경을 구축했습니다.",
    generation: 12,
    githubUrl: {
      frontend: "",
      backend: "",
    },
    deployUrl: "",
    team: [
      { name: "김연진", role: "Frontend" },
      { name: "윤영준", role: "Frontend" },
      { name: "김지민", role: "Backend" },
      { name: "변호영", role: "Backend" },
      { name: "이석원", role: "Backend" },
      { name: "정세진", role: "Backend" },
    ],
    awards: [""],
    techStack: ["React", "Django REST framework", "Redux", "AWS", "Node.js"],
  },
];

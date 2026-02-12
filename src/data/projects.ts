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
    repo?: string; // 단일 레포일 경우를 대비
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
    thumbnail: "/images/projects/",
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
    awards: [],
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
    thumbnail: "/images/projects/",
    longDescription:
      "쇼츠테이블은 SNS 마케팅의 필요성은 느끼지만 실행이 어려운 외식업 소상공인을 위해, 사진·영상만으로 브랜드 맞춤 숏폼 콘텐츠를 자동 생성하는 서비스입니다. 신촌 상권의 주요 소비층인 20~30대의 SNS 소비 패턴에 맞춰 효율적인 홍보를 지원합니다.",
    generation: 13,
    githubUrl: {
      frontend: "",
      backend: "",
    },
    team: [
      { name: "강문정", role: "Design/PM" },
      { name: "구서영", role: "Design/PM" },
      { name: "오은성", role: "Design/PM" },
      { name: "조윤희", role: "Design/PM" },
      { name: "윤영준", role: "Frontend" },
      { name: "박준열", role: "Backend" },
    ],
    techStack: [],
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
      frontend: "",
      backend: "",
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
];

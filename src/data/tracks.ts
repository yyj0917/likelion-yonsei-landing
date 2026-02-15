/**
 * @file 트랙(모집 분야) 데이터
 * @description
 * Frontend / Backend / Design-PM 세 트랙에 대한 정보를 단일 소스로 관리합니다.
 * **기존에 3곳(tracks.tsx, tech-stack.tsx, application-form.tsx)에 분산되어 있던 트랙 데이터를 통합**한 파일입니다.
 *
 * 각 사용처에 맞게 세 가지 형태로 내보냅니다:
 * - `TRACKS`         — 홈 페이지 트랙 카드 (간단한 요약)
 * - `TRACK_DETAILS`  — About 페이지 상세 트랙 소개 (커리큘럼, 기술 스택 포함)
 * - `APPLY_TRACKS`   — 지원 페이지 트랙 선택 (이모지 아이콘 + 한 줄 설명)
 *
 * @note 아이콘 처리 방식
 * React 컴포넌트(Lucide 아이콘)를 데이터 파일에 직접 import하지 않고,
 * 문자열 `iconName`으로 저장한 뒤 컴포넌트에서 `ICON_MAP[track.iconName]`으로 매핑합니다.
 * 이렇게 하면 데이터 파일이 React에 의존하지 않아 테스트·재사용이 용이합니다.
 *
 * @used-by tracks.tsx (홈 페이지 트랙 카드)
 * @used-by tech-stack.tsx (About 페이지 상세 트랙)
 * @used-by application-form.tsx (지원 페이지 트랙 선택)
 */

/* ─────────────────────────────────────────────
 * Types
 * ───────────────────────────────────────────── */

/** 트랙 아이콘 이름 (Lucide 아이콘과 1:1 대응) */
type TrackIconName = "layout" | "server" | "pen-tool";

/** 홈 페이지 트랙 카드용 기본 정보 */
export interface Track {
  id: string;
  title: string;
  description: string;
  /** Lucide 아이콘 이름 — 컴포넌트의 ICON_MAP에서 실제 아이콘으로 변환 */
  iconName: TrackIconName;
  /** 기술 키워드 목록 */
  skills: string[];
  /** Tailwind gradient 클래스 (예: "from-blue-500 to-yonsei-light") */
  color: string;
}

/** About 페이지 상세 트랙 정보 */
export interface TrackDetail {
  id: string;
  iconName: TrackIconName;
  title: string;
  /** 영문 부제목 */
  subtitle: string;
  description: string;
  /** "What you'll learn" 항목 */
  highlights: string[];
  /** 기술 스택 태그 (이름 + Tailwind 색상 클래스) */
  techStack: { name: string; color: string }[];
  /** 카드 왼쪽 바 + 아이콘 배경의 gradient 클래스 */
  accentGradient: string;
  /** hover 시 테두리 색상 클래스 */
  accentColor: string;
  /** 아이콘 색상 */
  iconColor: string;
}

/** Apply 페이지 트랙 선택용 (간소화) */
export interface ApplyTrack {
  name: string;
  description: string;
  /** 이모지 아이콘 */
  icon: string;
}

/* ─────────────────────────────────────────────
 * 홈 페이지 — 트랙 카드
 * ───────────────────────────────────────────── */

export const TRACKS: Track[] = [
  {
    id: "frontend",
    title: "Frontend",
    description:
      "사용자가 마주하는 인터페이스를 구현하며 최고의 사용자 경험(UX)을 설계합니다. React를 중심으로 모던 웹 기술을 깊이 있게 학습합니다.",
    iconName: "layout",
    skills: ["HTML/CSS", "JavaScript/TypeScript", "React", "Tailwind CSS"],
    color: "from-blue-500 to-yonsei-light",
  },
  {
    id: "backend",
    title: "Backend",
    description:
      "서비스의 핵심 로직과 데이터를 관리합니다. 서버 아키텍처를 설계하고, 안정적이고 효율적인 API를 구축하는 능력을 기릅니다.",
    iconName: "server",
    skills: ["Python/Django", "Java/Spring", "Database", "AWS/Deploy"],
    color: "from-emerald-400 to-cyan-500",
  },
  {
    id: "design-pm",
    title: "Design / PM",
    description:
      "사용자의 니즈를 파악하여 서비스를 기획하고, 매력적인 UI/UX 디자인을 통해 시각적 가치를 전달합니다.",
    iconName: "pen-tool",
    skills: [
      "Figma",
      "UI/UX Design",
      "Service Planning",
      "Agile Methodology",
    ],
    color: "from-purple-500 to-indigo-500",
  },
];

/* ─────────────────────────────────────────────
 * About 페이지 — 상세 트랙 소개
 * ───────────────────────────────────────────── */

export const TRACK_DETAILS: TrackDetail[] = [
  {
    id: "design-pm",
    iconName: "pen-tool",
    title: "기획 / 디자인",
    subtitle: "Design & Planning",
    description:
      "아이디어를 구조화하고, 사용자 경험을 설계합니다. 단순한 화면 디자인을 넘어, 문제 정의부터 서비스 전략 수립까지 제품을 만들어가는 전 과정을 경험합니다.",
    highlights: [
      "아이디어 발굴부터 서비스 구조 설계",
      "UI/UX 디자인 및 인터랙션 설계",
      "사용자 리서치 및 시장 검증",
      "애자일 기반 프로젝트 리딩",
    ],
    techStack: [
      { name: "Figma", color: "bg-violet-500/15 text-violet-300 border-violet-500/20" },
      { name: "UI/UX", color: "bg-violet-500/15 text-violet-300 border-violet-500/20" },
      { name: "Prototyping", color: "bg-violet-500/15 text-violet-300 border-violet-500/20" },
      { name: "Service Design", color: "bg-violet-500/15 text-violet-300 border-violet-500/20" },
    ],
    accentGradient: "from-purple-500 to-pink-500",
    accentColor: "hover:border-purple-500/30",
    iconColor: "text-purple-400",
  },
  {
    id: "frontend",
    iconName: "layout",
    title: "프론트엔드",
    subtitle: "Frontend Development",
    description:
      "사용자가 직접 마주하는 경험을 설계하고 구현합니다. 기초부터 React, Next.js까지 모던 웹 스택을 기반으로 실제 프로덕트를 완성합니다.",
    highlights: [
      "모던 웹 스택 기반 UI 구현",
      "React & Next.js 프로젝트 실습",
      "반응형 웹 및 UX 최적화",
      "팀 협업 기반 실전 서비스 개발",
    ],
    techStack: [
      { name: "HTML/CSS", color: "bg-blue-500/10 text-blue-300 border-blue-500/20" },
      { name: "JavaScript", color: "bg-blue-500/10 text-blue-300 border-blue-500/20" },
      { name: "React", color: "bg-blue-500/10 text-blue-300 border-blue-500/20" },
      { name: "Next.js", color: "bg-blue-500/10 text-blue-300 border-blue-500/20" },
    ],
    accentGradient: "from-blue-500 to-cyan-500",
    accentColor: "hover:border-blue-500/30",
    iconColor: "text-blue-400",
  },
  {
    id: "backend",
    iconName: "server",
    title: "백엔드",
    subtitle: "Backend Development",
    description:
      "Spring Boot 기반의 견고한 서버 아키텍처를 설계하고 구축합니다. API 설계부터 배포, 운영까지 실제 서비스의 뼈대를 책임지는 백엔드를 경험합니다.",
    highlights: [
      "Spring Boot 기반 서버 개발",
      "RESTful API 설계 및 아키텍처 구성",
      "AWS 배포 및 CI/CD 자동화",
      "DB 설계와 성능 최적화",
    ],
    techStack: [
      { name: "Spring Boot", color: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20" },
      { name: "Java", color: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20" },
      { name: "AWS", color: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20" },
      { name: "CI/CD", color: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20" },
    ],
    accentGradient: "from-emerald-500 to-green-500",
    accentColor: "hover:border-emerald-500/30",
    iconColor: "text-emerald-400",
  },
];

/* ─────────────────────────────────────────────
 * 지원(Apply) 페이지 — 트랙 선택 카드
 * ───────────────────────────────────────────── */

export const APPLY_TRACKS: ApplyTrack[] = [
  {
    name: "Design-PM",
    description: "문제를 정의하고 해결 방식을 설계합니다. UX부터 팀 운영까지, 프로젝트의 방향을 만듭니다.",
    icon: "🎨",
  },
  {
    name: "Frontend",
    description: "아이디어를 화면 위에 구현합니다. React를 기반으로 실제 서비스 UI를 설계하고 개발합니다.",
    icon: "🖥️",
  },
  {
    name: "Backend",
    description: "눈에 보이지 않는 영역을 설계합니다. API부터 서버 구조까지, 서비스의 뼈대를 만듭니다.",
    icon: "⚙️",
  },
];

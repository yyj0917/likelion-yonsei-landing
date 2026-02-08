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
      "자신만의 아이템을 구체화하고, 사용자 중심의 디자인으로 완성합니다. 서비스 기획부터 UI/UX 디자인까지, 아이디어가 제품이 되는 전 과정을 경험합니다.",
    highlights: [
      "자신의 아이디어를 서비스로 디벨롭",
      "UI/UX 디자인 및 프로토타이핑",
      "사용자 리서치 및 시장 분석",
      "애자일 방법론 기반 프로젝트 관리",
    ],
    techStack: [
      { name: "Figma", color: "bg-purple-500/15 text-purple-300 border-purple-500/20" },
      { name: "UI/UX", color: "bg-pink-500/15 text-pink-300 border-pink-500/20" },
      { name: "Prototyping", color: "bg-violet-500/15 text-violet-300 border-violet-500/20" },
      { name: "Service Design", color: "bg-indigo-500/15 text-indigo-300 border-indigo-500/20" },
    ],
    accentGradient: "from-purple-500 to-pink-500",
    accentColor: "hover:border-purple-500/30",
  },
  {
    id: "frontend",
    iconName: "layout",
    title: "프론트엔드",
    subtitle: "Frontend Development",
    description:
      "HTML/CSS/JS 기초부터 React, Next.js까지 모던 웹 기술을 학습하며, 자신의 아이디어를 직접 프론트엔드로 구현합니다. 사용자가 직접 만나는 인터페이스를 만듭니다.",
    highlights: [
      "HTML / CSS / JavaScript 기초 학습",
      "React와 Next.js로 모던 웹 개발",
      "자신의 아이디어를 프론트엔드로 구현",
      "반응형 웹 디자인 및 성능 최적화",
    ],
    techStack: [
      { name: "HTML/CSS", color: "bg-orange-500/15 text-orange-300 border-orange-500/20" },
      { name: "JavaScript", color: "bg-yellow-500/15 text-yellow-300 border-yellow-500/20" },
      { name: "React", color: "bg-cyan-500/15 text-cyan-300 border-cyan-500/20" },
      { name: "Next.js", color: "bg-white/10 text-gray-300 border-white/10" },
    ],
    accentGradient: "from-blue-500 to-cyan-500",
    accentColor: "hover:border-blue-500/30",
  },
  {
    id: "backend",
    iconName: "server",
    title: "백엔드",
    subtitle: "Backend Development",
    description:
      "14기부터 Django가 아닌 Spring Boot로 전환! 개발부터 배포, CI/CD까지 백엔드 전반에 걸쳐 깊이 있게 학습하고 실전 프로젝트를 진행합니다.",
    highlights: [
      "Spring Boot 기반 서버 개발",
      "RESTful API 설계 및 구현",
      "AWS 배포 및 CI/CD 파이프라인 구축",
      "DB 설계부터 운영까지 백엔드 전반 학습",
    ],
    techStack: [
      { name: "Spring Boot", color: "bg-green-500/15 text-green-300 border-green-500/20" },
      { name: "Java", color: "bg-red-500/15 text-red-300 border-red-500/20" },
      { name: "AWS", color: "bg-orange-500/15 text-orange-300 border-orange-500/20" },
      { name: "CI/CD", color: "bg-blue-500/15 text-blue-300 border-blue-500/20" },
    ],
    accentGradient: "from-emerald-500 to-green-500",
    accentColor: "hover:border-emerald-500/30",
  },
];

/* ─────────────────────────────────────────────
 * 지원(Apply) 페이지 — 트랙 선택 카드
 * ───────────────────────────────────────────── */

export const APPLY_TRACKS: ApplyTrack[] = [
  {
    name: "Frontend",
    description: "웹 프론트엔드 개발을 배우고 실습합니다.",
    icon: "🖥️",
  },
  {
    name: "Backend",
    description: "서버 및 백엔드 개발을 배우고 실습합니다.",
    icon: "⚙️",
  },
  {
    name: "Design-PM",
    description: "UI/UX 디자인과 프로젝트 매니징을 경험합니다.",
    icon: "🎨",
  },
];

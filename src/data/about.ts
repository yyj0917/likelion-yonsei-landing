/**
 * @file About(소개) 페이지 전용 데이터
 * @description
 * About 페이지의 Bento Grid에서 사용하는 통계, 핵심 가치, 커리큘럼 타임라인 데이터입니다.
 *
 * @note 아이콘 처리
 * `iconName` 문자열을 사용하여 about-content.tsx의 VALUE_ICON_MAP에서
 * Lucide 아이콘 컴포넌트로 변환합니다.
 *
 * @used-by about-content.tsx (About 페이지 — 미션 카드, 가치 카드, 커리큘럼 타임라인)
 */

/* ─────────────────────────────────────────────
 * Types
 * ───────────────────────────────────────────── */

/** 숫자 통계 항목 (미션 카드 하단에 표시) */
export interface Stat {
  /** 표시할 숫자 */
  number: string;
  /** 숫자 뒤 접미사 (예: "기", "개", "+") */
  suffix: string;
  /** 설명 라벨 (예: "현재 기수") */
  label: string;
}

/** 핵심 가치 카드 항목 */
export interface Value {
  /** Lucide 아이콘 이름 — about-content.tsx의 VALUE_ICON_MAP에서 변환 */
  iconName: "rocket" | "users" | "code-2" | "lightbulb";
  /** 아이콘 배경색 Tailwind 클래스 */
  iconBg: string;
  /** 아이콘 색상 Tailwind 클래스 */
  iconColor: string;
  title: string;
  description: string;
}

/** 1년 커리큘럼 타임라인 항목 */
export interface CurriculumItem {
  /** 시기 (예: "1학기", "5월") */
  phase: string;
  /** 활동명 */
  title: string;
  /** 부가 태그 (예: "멋사 공식", "데모데이") */
  tag?: string;
  /** 타임라인 점 색상 클래스 */
  dotColor: string;
  /** 점과 점 사이 선의 gradient 클래스 (마지막 항목은 빈 문자열) */
  lineColor: string;
}

/* ─────────────────────────────────────────────
 * 숫자 통계 — 미션 카드 하단
 * ───────────────────────────────────────────── */

export const STATS: Stat[] = [
  { number: "14", suffix: "기", label: "현재 기수" },
  { number: "3", suffix: "개", label: "트랙 운영" },
  { number: "50", suffix: "+", label: "누적 프로젝트" },
];

/* ─────────────────────────────────────────────
 * 핵심 가치 — 4개의 작은 카드
 * ───────────────────────────────────────────── */

export const VALUES: Value[] = [
  {
    iconName: "rocket",
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-400",
    title: "실전 프로젝트",
    description:
      "해커톤과 스크럼 프로젝트를 통해 실제 서비스를 기획하고, 개발하고, 배포합니다.",
  },
  {
    iconName: "users",
    iconBg: "bg-purple-500/15",
    iconColor: "text-purple-400",
    title: "네트워킹",
    description:
      "연사 초청, 오피스투어, 연합 해커톤 등 다양한 네트워킹 기회를 제공합니다.",
  },
  {
    iconName: "code-2",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
    title: "체계적 교육",
    description:
      "기수마다 발전하는 커리큘럼으로 기초부터 심화까지 체계적으로 학습합니다.",
  },
  {
    iconName: "lightbulb",
    iconBg: "bg-amber-500/15",
    iconColor: "text-amber-400",
    title: "창업 마인드",
    description:
      "단순 개발을 넘어서, 문제 정의부터 솔루션 도출까지 창업적 사고를 기릅니다.",
  },
];

/* ─────────────────────────────────────────────
 * 1년 커리큘럼 타임라인
 * ───────────────────────────────────────────── */

export const CURRICULUM: CurriculumItem[] = [
  {
    phase: "1학기",
    title: "기초 교육 & 스터디",
    dotColor: "bg-blue-400",
    lineColor: "from-blue-400 to-likelion-orange",
  },
  {
    phase: "5월",
    title: "아이디어톤",
    tag: "멋사 공식",
    dotColor: "bg-likelion-orange",
    lineColor: "from-likelion-orange to-amber-400",
  },
  {
    phase: "여름방학",
    title: "중앙 해커톤",
    tag: "멋사 공식",
    dotColor: "bg-amber-400",
    lineColor: "from-amber-400 to-emerald-400",
  },
  {
    phase: "2학기",
    title: "자유주제 프로젝트 개발",
    dotColor: "bg-emerald-400",
    lineColor: "from-emerald-400 to-purple-400",
  },
  {
    phase: "연말",
    title: "창업 경진 대회",
    tag: "데모데이",
    dotColor: "bg-purple-400",
    lineColor: "",
  },
];

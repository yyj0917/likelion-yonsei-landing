/**
 * @file 활동(Activities) 데이터
 * @description
 * 동아리의 주요 활동/이벤트 데이터를 관리합니다.
 * 두 가지 형태로 내보냅니다:
 *
 * - `ABOUT_EVENTS`     — About 페이지의 주요 이벤트 4개 (아이디어톤, 해커톤, 신촌톤, 데모데이)
 * - `ACTIVITIES_DATA`  — Activities 페이지의 전체 활동 10개 (테트리스 그리드)
 *
 * @note 아이콘 처리
 * `iconName` 문자열을 사용하여 컴포넌트의 ICON_MAP에서 Lucide 아이콘으로 변환합니다.
 * 이렇게 하면 데이터 파일이 React에 의존하지 않습니다.
 *
 * @used-by activities.tsx (About 페이지 — 주요 활동 카드)
 * @used-by activity-grid.tsx (Activities 페이지 — 테트리스 그리드)
 */

/* ─────────────────────────────────────────────
 * About 페이지 — 주요 이벤트 (4개)
 * ───────────────────────────────────────────── */

/** About 페이지 이벤트 카드 데이터 */
export interface AboutEvent {
  /** 고유 식별자 */
  id: string;
  /** Lucide 아이콘 이름 — 컴포넌트의 ICON_MAP에서 실제 아이콘으로 변환 */
  iconName: "lightbulb" | "flame" | "code-2" | "trophy";
  title: string;
  /** 영문 부제목 */
  subtitle: string;
  description: string;
  /** hover 시 배경 glow의 gradient 클래스 */
  accentColor: string;
  /** 아이콘 배경색 클래스 */
  iconBg: string;
  /** hover 시 테두리 색상 클래스 */
  borderAccent: string;
}

export const ABOUT_EVENTS: AboutEvent[] = [
  {
    id: "ideathon",
    iconName: "lightbulb",
    title: "아이디어톤",
    subtitle: "Ideathon",
    description:
      "아이디어톤에 대한 설명을 여기에 작성하세요. 팀을 구성하고 아이디어를 발표하며, 멘토링을 통해 아이디어를 구체화하는 과정입니다.",
    accentColor: "from-amber-500 to-orange-500",
    iconBg: "bg-amber-500/15",
    borderAccent: "group-hover:border-amber-500/30",
  },
  {
    id: "hackathon",
    iconName: "flame",
    title: "중앙 해커톤",
    subtitle: "Central Hackathon",
    description:
      "중앙 해커톤에 대한 설명을 여기에 작성하세요. 멋쟁이사자처럼 전국 대학이 모여 진행하는 대규모 해커톤으로, 제한된 시간 안에 서비스를 완성합니다.",
    accentColor: "from-red-500 to-likelion-orange",
    iconBg: "bg-red-500/15",
    borderAccent: "group-hover:border-red-500/30",
  },
  {
    id: "sinchon-hackathon",
    iconName: "code-2",
    title: "신촌톤",
    subtitle: "Sinchon Hackathon",
    description:
      "신촌톤에 대한 설명을 여기에 작성하세요. 신촌 지역 대학이 연합하여 진행하는 해커톤으로, 가까운 학교 학생들과 함께 협업하는 경험을 쌓습니다.",
    accentColor: "from-blue-500 to-cyan-500",
    iconBg: "bg-blue-500/15",
    borderAccent: "group-hover:border-blue-500/30",
  },
  {
    id: "demo-day",
    iconName: "trophy",
    title: "창업 경진 대회",
    subtitle: "Demo Day",
    description:
      "창업 경진 대회에 대한 설명을 여기에 작성하세요. 한 해 동안 개발한 프로젝트를 발표하고, 심사를 통해 우수 프로젝트를 선정합니다.",
    accentColor: "from-purple-500 to-violet-500",
    iconBg: "bg-purple-500/15",
    borderAccent: "group-hover:border-purple-500/30",
  },
];

/* ─────────────────────────────────────────────
 * Activities 페이지 — 전체 활동 (10개, 테트리스 그리드)
 * ───────────────────────────────────────────── */

/** Activities 페이지 활동 카드 데이터 */
export interface ActivityData {
  id: number;
  title: string;
  /** 영문 또는 한 줄 부제목 */
  subtitle: string;
  /** 카드에 표시되는 요약 설명 */
  description: string;
  /** 다이얼로그에서 표시되는 상세 항목 목록 */
  details: string[];
  /** Lucide 아이콘 이름 — 컴포넌트의 ICON_MAP에서 실제 아이콘으로 변환 */
  iconName: string;
  /** 아이콘/텍스트 색상 클래스 (예: "text-cyan-400") */
  color: string;
  dotColor: string;
  /** 카드 배경색 클래스 */
  bgColor: string;
  /** 카드 테두리 색상 클래스 */
  borderColor: string;
  /** 부제목·링크 텍스트 색상 클래스 */
  textColor: string;
  /** 카드 모양 — 테트리스 그리드에서 시각적 변화를 줌 */
  shape: "square" | "rounded" | "pill" | "notch";
  /** 외부 링크 (있으면 "바로가기" 버튼 표시) */
  href?: string;
}

export const ACTIVITIES_DATA: ActivityData[] = [
  {
    id: 1,
    title: "정기세션",
    subtitle: "매주 진행되는 세션",
    description: `매주 이어지는 체계적인 세션을 통해 실무 역량을 단계적으로 확장합니다.\n단순한 강의가 아닌, 직접 구현하고 토론하며 성장하는 실전 중심 학습 환경입니다.`,
    details: [
      "매주 목요일 오프라인 세션 진행",
      "프론트엔드, 백엔드, 기획/디자인 트랙별 커리큘럼",
      "현업 개발자 초청 특별 세션",
      "세션 후 자유로운 Q&A 시간",
    ],
    iconName: "presentation",
    color: "text-cyan-400",
    dotColor: "bg-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    textColor: "text-cyan-300",
    shape: "rounded",
  },
  {
    id: 2,
    title: "중앙 해커톤",
    subtitle: "전국 규모 개발 대회",
    description:
      "전국 멋쟁이사자처럼이 한자리에 모여, 아이디어를 서비스로 구현하는 대규모 연합 해커톤입니다.",
    details: [
      "전국 멋사 연합 해커톤 참가",
      "24~48시간 집중 개발",
      "기획부터 배포까지 풀 사이클 경험",
      "우수 팀 시상 및 데모 발표",
    ],
    iconName: "code-2",
    color: "text-red-400",
    dotColor: "bg-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    textColor: "text-red-300",
    shape: "notch",
  },
  {
    id: 3,
    title: "블로그",
    subtitle: "기술 블로그 활동",
    description:
      "배움을 기록하고, 기록을 자산으로 만듭니다. 기술적 고민과 해결 과정을 정리하며 개인의 성장 포트폴리오를 구축합니다.",
    details: [
      "프론트엔드, 백엔드, 기획/디자인 카테고리별 글 작성",
      "세션에서 배운 내용 정리 및 공유",
      "기술 트렌드 분석 및 리뷰 게시",
      "부원 간 피드백과 댓글로 소통",
    ],
    iconName: "pencil",
    color: "text-emerald-400",
    dotColor: "bg-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    textColor: "text-emerald-300",
    shape: "pill",
    href: "https://techblog.likelion.net/",
  },
  {
    id: 4,
    title: "멋사만나",
    subtitle: "파트 간 교류",
    description:
      "파트를 넘어 연결됩니다. 다양한 역할의 아기사자들이 교류하며 협업 감각과 팀워크를 자연스럽게 확장합니다.",
    details: [
      "프론트/백엔드/기획 간 크로스 세션",
      "팀 빌딩 활동 및 네트워킹",
      "서로의 프로젝트 피드백",
      "분기별 정기 모임",
    ],
    iconName: "users",
    color: "text-amber-400",
    dotColor: "bg-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    textColor: "text-amber-300",
    shape: "square",
  },
  {
    id: 5,
    title: "OT",
    subtitle: "오리엔테이션",
    description:
      "14기의 첫 만남, 오리엔테이션입니다. 앞으로 함께할 시간들을 소개하고, 새로운 동료들과 편하게 인사를 나누는 자리입니다.",
    details: [
      "14기 운영진 소개",
      "학기 커리큘럼 안내",
      "아이스브레이킹 게임",
      "트랙 배정 및 팀 편성",
    ],
    iconName: "sparkles",
    color: "text-pink-400",
    dotColor: "bg-pink-400",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/30",
    textColor: "text-pink-300",
    shape: "rounded",
  },
  {
    id: 6,
    title: "MT",
    subtitle: "멤버십 트레이닝",
    description:
      "함께 성장할 사람들과 깊이 연결되는 시간. 1박 2일 동안 팀워크를 다지고, 신뢰 기반의 커뮤니티를 형성합니다.",
    details: [
      "학기 초 1박 2일 MT 진행",
      "팀 빌딩 게임 및 레크레이션",
      "바비큐 파티 & 캠프파이어",
      "아기사자 간 유대감 형성",
    ],
    iconName: "mountain",
    color: "text-green-400",
    dotColor: "bg-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    textColor: "text-green-300",
    shape: "notch",
  },
  {
    id: 7,
    title: "아이디어톤",
    subtitle: "아이디어 피칭 대회",
    description:
      "문제 정의에서 시작해 실행 가능한 아이디어로 발전시킵니다.",
    details: [
      "매달 아이디어 피칭 세션",
      "부원 투표로 최종 5개 아이디어 선정",
      "선정된 아이디어 기반 프로젝트 팀 구성",
      "멘토링을 통한 아이디어 고도화",
    ],
    iconName: "lightbulb",
    color: "text-purple-400",
    dotColor: "bg-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    textColor: "text-purple-300",
    shape: "pill",
  },
  {
    id: 8,
    title: "데모데이",
    subtitle: "프로젝트 발표회",
    description:
      "결과로 증명하는 자리. 한 학기 동안의 노력을 무대 위에서 발표하고, 외부 심사를 통해 경쟁력을 평가받습니다.",
    details: [
      "학기 말 전체 프로젝트 발표",
      "외부 심사위원 초청 심사",
      "최우수/우수/장려상 시상",
      "전시 부스 운영 및 네트워킹",
    ],
    iconName: "trophy",
    color: "text-yellow-400",
    dotColor: "bg-yellow-400",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/30",
    textColor: "text-yellow-300",
    shape: "square",
  },
  {
    id: 9,
    title: "네트워킹",
    subtitle: "현업 전문가 교류",
    description:
      "현업과 직접 연결됩니다. 실무 경험을 가진 전문가들과의 교류를 통해 현실적인 커리어 인사이트를 얻습니다.",
    details: [
      "현업 종사자 초청 강연",
      "졸업 기수 선배와의 만남",
      "타 대학 멋사와의 연합 네트워킹",
      "커리어 상담 및 포트폴리오 리뷰",
    ],
    iconName: "megaphone",
    color: "text-blue-400",
    dotColor: "bg-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    textColor: "text-blue-300",
    shape: "rounded",
  },
  {
    id: 10,
    title: "스터디",
    subtitle: "자율 기술 스터디",
    description:
      "같은 관심사를 가진 멤버들끼리 모여 다양한 기술 스터디를 자율적으로 진행합니다.",
    details: [
      "React, Spring, Flutter 등 기술별 스터디",
      "알고리즘 스터디 주 1회",
      "CS 기초 스터디 그룹",
      "스터디 결과 공유 세션",
    ],
    iconName: "book-open",
    color: "text-orange-400",
    dotColor: "bg-orange-400",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
    textColor: "text-orange-300",
    shape: "notch",
  },
];

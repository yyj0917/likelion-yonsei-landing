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
  /** 상세 설명 (다이얼로그에서 표시) */
  longDescription: string;
  /** 해당 기수 */
  generation: number;
  /** 카드 배경 gradient 클래스 (예: "from-emerald-400 to-teal-600") */
  gradient: string;
  /** GitHub 저장소 URL */
  githubUrl?: string;
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
    name: "HaniHome",
    description: "해외 한인을 위한 숙소 매칭 플랫폼",
    longDescription:
      "해외에 거주하는 한인들이 안전하고 편리하게 숙소를 구할 수 있도록 돕는 매칭 플랫폼입니다. 한국어 지원, 한인 커뮤니티 리뷰, 그리고 지역별 생활 정보를 제공하여 해외 정착을 돕습니다.",
    generation: 13,
    gradient: "from-emerald-400 to-teal-600",
    githubUrl: "https://github.com/likelion-yonsei/hanihome",
    deployUrl: "https://hanihome.vercel.app",
    team: [
      { name: "김민수", role: "Frontend" },
      { name: "이지은", role: "Backend" },
      { name: "박서윤", role: "Design/PM" },
      { name: "정하준", role: "Frontend" },
    ],
    awards: ["멋쟁이사자처럼 중앙 해커톤 대상"],
    techStack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
  },
  {
    id: 2,
    name: "StudyMate",
    description: "AI 기반 스터디 그룹 매칭 서비스",
    longDescription:
      "AI가 학습 스타일, 관심 분야, 일정을 분석하여 최적의 스터디 그룹을 매칭해주는 서비스입니다. 실시간 채팅, 공유 노트, 출석 관리 기능을 통해 효율적인 그룹 스터디를 지원합니다.",
    generation: 13,
    gradient: "from-blue-400 to-indigo-600",
    githubUrl: "https://github.com/likelion-yonsei/studymate",
    deployUrl: "https://studymate-demo.vercel.app",
    team: [
      { name: "최유진", role: "Frontend" },
      { name: "한도윤", role: "Backend" },
      { name: "서예린", role: "Backend" },
    ],
    awards: ["교내 SW 경진대회 우수상"],
    techStack: ["React", "Node.js", "MongoDB", "OpenAI API"],
  },
  {
    id: 3,
    name: "CampusEats",
    description: "대학생을 위한 공동 배달 주문 플랫폼",
    longDescription:
      "배달비 부담을 줄이기 위해 같은 건물이나 기숙사 학생들이 함께 배달 주문을 할 수 있는 플랫폼입니다. 실시간 모집, 자동 정산, 픽업 위치 지정 기능을 제공합니다.",
    generation: 13,
    gradient: "from-orange-400 to-red-500",
    githubUrl: "https://github.com/likelion-yonsei/campuseats",
    team: [
      { name: "윤서준", role: "Frontend" },
      { name: "김채원", role: "Backend" },
      { name: "이현우", role: "Design/PM" },
      { name: "장소연", role: "Frontend" },
    ],
    techStack: ["Next.js", "Prisma", "PostgreSQL", "Tailwind CSS"],
  },

  // ── 12기 프로젝트 ──
  {
    id: 4,
    name: "BookBridge",
    description: "중고 전공서적 거래 및 나눔 플랫폼",
    longDescription:
      "학기마다 필요한 전공서적을 선후배 간에 합리적으로 거래하거나 나눌 수 있는 플랫폼입니다. 학과별 교재 추천, 상태 인증 사진, 안전 거래 시스템을 통해 신뢰도 높은 거래를 지원합니다.",
    generation: 12,
    gradient: "from-purple-400 to-pink-500",
    githubUrl: "https://github.com/likelion-yonsei/bookbridge",
    deployUrl: "https://bookbridge.vercel.app",
    team: [
      { name: "박지호", role: "Frontend" },
      { name: "송다은", role: "Backend" },
      { name: "오민석", role: "Frontend" },
    ],
    awards: ["멋쟁이사자처럼 중앙 해커톤 인기상"],
    techStack: ["React", "Express", "MySQL", "AWS S3"],
  },
  {
    id: 5,
    name: "MentoLink",
    description: "선후배 간 멘토링 매칭 서비스",
    longDescription:
      "같은 학과 또는 관심 분야의 선후배를 연결하여 체계적인 멘토링을 지원하는 서비스입니다. 멘토링 일지, 목표 설정, 피드백 시스템을 통해 의미 있는 성장을 돕습니다.",
    generation: 12,
    gradient: "from-cyan-400 to-blue-500",
    githubUrl: "https://github.com/likelion-yonsei/mentolink",
    team: [
      { name: "임수빈", role: "Frontend" },
      { name: "강현석", role: "Backend" },
      { name: "배윤아", role: "Design/PM" },
    ],
    techStack: ["Vue.js", "Django", "PostgreSQL", "Docker"],
  },
  {
    id: 6,
    name: "GreenStep",
    description: "일상 속 탄소 발자국 추적 앱",
    longDescription:
      "일상 활동에서 발생하는 탄소 배출량을 자동으로 추적하고, 친환경 대안을 추천해주는 앱입니다. 걷기, 대중교통, 텀블러 사용 등 활동별 탄소 절감량을 시각화하여 보여줍니다.",
    generation: 12,
    gradient: "from-green-400 to-emerald-600",
    githubUrl: "https://github.com/likelion-yonsei/greenstep",
    deployUrl: "https://greenstep.vercel.app",
    team: [
      { name: "정우진", role: "Frontend" },
      { name: "김나연", role: "Backend" },
      { name: "이태민", role: "Frontend" },
      { name: "황서영", role: "Design/PM" },
    ],
    awards: ["교내 창업 경진대회 장려상"],
    techStack: ["React Native", "Firebase", "Chart.js"],
  },

  // ── 11기 프로젝트 ──
  {
    id: 7,
    name: "TimeBuddy",
    description: "시간표 기반 친구 매칭 서비스",
    longDescription:
      "대학 시간표를 기반으로 공강 시간이 겹치는 친구를 찾아주는 서비스입니다. 관심사 태그, 맛집 추천, 그룹 활동 모집 기능을 통해 캠퍼스 내 새로운 인연을 만들어줍니다.",
    generation: 11,
    gradient: "from-yellow-400 to-orange-500",
    githubUrl: "https://github.com/likelion-yonsei/timebuddy",
    team: [
      { name: "조은서", role: "Frontend" },
      { name: "신재현", role: "Backend" },
      { name: "류하은", role: "Design/PM" },
    ],
    techStack: ["Next.js", "Supabase", "Tailwind CSS"],
  },
  {
    id: 8,
    name: "PetPal",
    description: "반려동물 돌봄 커뮤니티 플랫폼",
    longDescription:
      "반려동물을 키우는 대학생들을 위한 커뮤니티 플랫폼입니다. 돌봄 품앗이, 산책 메이트 매칭, 동물 병원 리뷰, 그리고 반려동물 일상 공유 기능을 제공합니다.",
    generation: 11,
    gradient: "from-pink-400 to-rose-500",
    githubUrl: "https://github.com/likelion-yonsei/petpal",
    deployUrl: "https://petpal-demo.vercel.app",
    team: [
      { name: "문지원", role: "Frontend" },
      { name: "양준혁", role: "Backend" },
      { name: "홍서현", role: "Frontend" },
      { name: "구민정", role: "Design/PM" },
    ],
    awards: ["멋쟁이사자처럼 중앙 해커톤 우수상", "교내 UX 공모전 최우수상"],
    techStack: ["React", "Spring Boot", "MySQL", "AWS"],
  },
  {
    id: 9,
    name: "LocalPick",
    description: "지역 소상공인 추천 큐레이션 서비스",
    longDescription:
      "학교 주변 숨겨진 맛집과 소상공인 가게를 큐레이션하여 추천하는 서비스입니다. 학생 리뷰, 할인 정보, 그리고 사장님과의 소통 채널을 통해 지역 상권 활성화에 기여합니다.",
    generation: 11,
    gradient: "from-violet-400 to-purple-600",
    githubUrl: "https://github.com/likelion-yonsei/localpick",
    team: [
      { name: "차시우", role: "Frontend" },
      { name: "노은채", role: "Backend" },
      { name: "권태양", role: "Backend" },
    ],
    techStack: ["Next.js", "NestJS", "MongoDB", "Kakao Map API"],
  },
];

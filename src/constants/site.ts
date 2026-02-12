/**
 * @file 사이트 전역 설정
 * @description
 * 기수 번호, 사이트 URL, 소셜 링크 등 사이트 전반에 걸쳐 사용되는 상수를 정의합니다.
 *
 * **기수 변경 시 이 파일만 수정하면 됩니다.**
 * `generation` 값을 변경하면 메타데이터, hero, footer, about 등 모든 곳에 자동 반영됩니다.
 *
 * @used-by layout.tsx, page.tsx, navbar.tsx, footer.tsx, hero-section.tsx,
 *           about-hero.tsx, application-form.tsx, activity-grid.tsx
 */

/* ─────────────────────────────────────────────
 * 사이트 기본 정보
 * ───────────────────────────────────────────── */

export const SITE_CONFIG = {
  /** 정식 한국어 명칭 (SEO, 구조화 데이터 등에 사용) */
  name: "연세대학교 멋쟁이사자처럼",
  /** 영문 명칭 (Schema.org alternateName 등) */
  nameEn: "LikeLion Yonsei",
  /** 짧은 영문 표기 (로고 옆 텍스트, 푸터 copyright 등) */
  nameShort: "LIKELION YONSEI",
  /** 현재 기수 — 매 기수 시작 시 이 값만 업데이트 */
  generation: 14,
  /** 배포 URL (canonical, OG, structured data 등) */
  url: "https://likelion-yonsei.vercel.app",
  /** 한 줄 태그라인 */
  tagline: "내 아이디어를 내 손으로 실현하다.",
  /** 조직 소개 문구 (SEO description, structured data 등) */
  description:
    "연세대학교 멋쟁이사자처럼은 기술을 통해 세상을 변화시키고자 하는 열정적인 학생들이 모여 서로 배우고, 나누며, 함께 성장하는 커뮤니티입니다.",
} as const;

/* ─────────────────────────────────────────────
 * 소셜 링크 & 외부 URL
 * ───────────────────────────────────────────── */

export const SOCIAL_LINKS = {
  /** 인스타그램 프로필 URL */
  instagram: "https://www.instagram.com/likelion_yonsei",
  /** 인스타그램 핸들 (텍스트로 표시할 때 사용) */
  instagramHandle: "@likelion_yonsei",
  /** 대표 이메일 주소 */
  email: "yonsei.univ@likelion.org",
  /** 구글 폼 URL — TODO: 실제 모집 폼 URL로 교체 필요 */
  googleForm: "https://forms.gle/YOUR_FORM_ID",
  /** 기술 블로그 URL */
  techBlog: "https://techblog.likelion.net/",
} as const;

/* ─────────────────────────────────────────────
 * 정적 에셋 경로
 * ───────────────────────────────────────────── */

export const ASSETS = {
  /** 로고 이미지 (footer 등에서 사용) */
  logo: "/logo/logo-small.svg",
  /** 파비콘 (navbar 로고, 메타데이터 등에서 사용) */
  favicon: "/favicon.ico",
} as const;

/**
 * @file 네비게이션 링크 정의
 * @description
 * GNB(Global Navigation Bar)에서 사용하는 링크 목록입니다.
 * 페이지를 추가/제거할 때 이 배열만 수정하면 데스크탑·모바일 메뉴에 동시 반영됩니다.
 *
 * @used-by navbar.tsx
 */

/** 네비게이션 링크 항목 */
export interface NavLink {
  /** 화면에 표시될 이름 */
  name: string;
  /** 이동할 경로 (Next.js 라우트) */
  href: string;
}

/** GNB 링크 목록 — 순서대로 렌더링됩니다 */
export const NAV_LINKS: NavLink[] = [
  { name: "소개", href: "/" },
  // { name: '멤버', href: '/members' },  // 추후 멤버 페이지 추가 시 활성화
  { name: "활동", href: "/activities" },
  { name: "프로젝트", href: "/projects" },
  { name: "지원하기", href: "/apply" },
];

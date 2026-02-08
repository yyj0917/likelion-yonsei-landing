/**
 * @file 모집 일정 & 접수 기간
 * @description
 * 서류 접수 시작/종료 시각과 전체 모집 타임라인을 한 곳에서 관리합니다.
 * **기존에 `timeline.tsx`와 `application-form.tsx`에 중복되어 있던 동일한 일정 데이터를 통합**한 파일입니다.
 *
 * 날짜 변경 시 이 파일만 수정하면 홈(타임라인)과 지원(application-form) 페이지에 동시 반영됩니다.
 *
 * @used-by timeline.tsx (홈 페이지 타임라인 섹션)
 * @used-by application-form.tsx (지원하기 페이지 — 접수 상태 판별 + 일정 표시)
 */

import { SITE_CONFIG } from "@/constants/site";

/* ─────────────────────────────────────────────
 * Types
 * ───────────────────────────────────────────── */

/** 모집 타임라인의 개별 항목 */
export interface RecruitmentTimelineItem {
  /** 표시용 날짜 문자열 (예: "02.19 (목) ~ 02.25 (수)") */
  date: string;
  /** 일정 제목 (예: "서류 접수") */
  title: string;
  /** 일정에 대한 부가 설명 */
  description: string;
  /** `true`면 apply 페이지에서 강조 표시 (서류 접수 기간) */
  highlight?: boolean;
}

/* ─────────────────────────────────────────────
 * 서류 접수 기간 (KST)
 *
 * application-form.tsx에서 현재 시각과 비교하여
 * "접수 전 / 접수 중 / 접수 마감" 상태를 판별하는 데 사용됩니다.
 * ───────────────────────────────────────────── */

export const APPLICATION_PERIOD = {
  start: new Date("2026-02-19T00:00:00+09:00"),
  end: new Date("2026-02-25T23:59:59+09:00"),
} as const;

/* ─────────────────────────────────────────────
 * 전체 모집 일정
 *
 * 홈 페이지(timeline.tsx)와 지원 페이지(application-form.tsx) 모두에서 참조합니다.
 * ───────────────────────────────────────────── */

export const RECRUITMENT_TIMELINE: RecruitmentTimelineItem[] = [
  {
    date: "02.19 (목) ~ 02.25 (수)",
    title: "서류 접수",
    description: "구글 폼을 통해 지원서를 제출합니다. 시간을 엄수해주세요.",
    highlight: true,
  },
  {
    date: "03.02 (화)",
    title: "1차 합격자 발표",
    description:
      "서류 심사 합격자에 한해 개별 문자로 면접 일정을 안내드립니다.",
    highlight: false,
  },
  {
    date: "03.05 (목) ~ 03.06 (금)",
    title: "면접 진행",
    description: "연세대학교 신촌캠퍼스에서 대면 면접이 진행됩니다.",
    highlight: false,
  },
  {
    date: "03.09 (월)",
    title: "최종 합격자 발표",
    description: `${SITE_CONFIG.generation}기 아기사자로 함께할 최종 합격자를 발표합니다.`,
    highlight: false,
  },
  {
    date: "03.12 (목)",
    title: `${SITE_CONFIG.generation}기 오리엔테이션`,
    description: "모든 합격자는 필수로 참석해야 합니다.",
    highlight: false,
  },
];

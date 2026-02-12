"use client";

import { useState } from "react";
import {
  BookOpen,
  Code2,
  Lightbulb,
  Megaphone,
  Mountain,
  Pencil,
  Presentation,
  Trophy,
  Users,
  Sparkles,
  ExternalLink,
  LucideIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ACTIVITIES_DATA, type ActivityData } from "@/data/activities";
import { SITE_CONFIG } from "@/constants/site";

/* ───────────── Icon mapping ─────────────
 * 데이터 파일의 iconName(문자열)을 Lucide 아이콘 컴포넌트로 변환합니다.
 * 새로운 활동을 추가할 때 아이콘도 여기에 등록해야 합니다.
 * ───────────────────────────────────────── */

const ICON_MAP: Record<string, LucideIcon> = {
  presentation: Presentation,
  "code-2": Code2,
  pencil: Pencil,
  users: Users,
  sparkles: Sparkles,
  mountain: Mountain,
  lightbulb: Lightbulb,
  trophy: Trophy,
  megaphone: Megaphone,
  "book-open": BookOpen,
};

/* ───────────── Shape helpers ─────────────
 * 테트리스 그리드에서 카드별 다른 모양을 적용하여 시각적 다양성을 줍니다.
 * ───────────────────────────────────────── */

/** shape 문자열 → Tailwind border-radius 클래스 변환 */
function getShapeClass(shape: ActivityData["shape"]) {
  switch (shape) {
    case "square":
      return "rounded-xl";
    case "rounded":
      return "rounded-3xl";
    case "pill":
      return "rounded-[2rem]";
    case "notch":
      return "rounded-xl rounded-tr-[3rem]";
  }
}

/* ───────────── Activity Card ───────────── */

/** 개별 활동 카드 — 아이콘, 제목, 설명, hover 시 "자세히 보기" 표시 */
function ActivityCard({
  activity,
  onSelect,
}: {
  activity: ActivityData;
  onSelect: (a: ActivityData) => void;
}) {
  const {
    title,
    subtitle,
    description,
    iconName,
    color,
    bgColor,
    borderColor,
    textColor,
    shape,
    href,
  } = activity;

  const Icon = ICON_MAP[iconName];
  const icon = <Icon className="w-7 h-7" />;

  return (
    <button
      onClick={() => onSelect(activity)}
      className={`group relative h-full w-full text-left border ${borderColor} ${bgColor} ${getShapeClass(shape)} overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.06)] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-likelion-orange`}
    >
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[repeating-linear-gradient(45deg,white_0px,white_1px,transparent_1px,transparent_12px)]" />

      {/* Large faded icon */}
      <div
        className={`absolute -bottom-4 -right-4 ${color} opacity-[0.06] transition-transform duration-700 group-hover:scale-110 group-hover:opacity-[0.1]`}
      >
        <div className="w-28 h-28 flex items-center justify-center [&>svg]:w-28 [&>svg]:h-28">
          {icon}
        </div>
      </div>

      {/* Content */}
      <div className="relative h-full p-5 md:p-6 flex flex-col justify-between">
        <div>
          <div
            className={`inline-flex items-center justify-center w-11 h-11 ${bgColor} border ${borderColor} rounded-2xl ${color} mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
          >
            {icon}
          </div>
          <h3 className="text-white text-lg md:text-xl font-bold mb-0.5">
            {title}
          </h3>
          <span
            className={`text-[11px] font-medium ${textColor} tracking-wide uppercase`}
          >
            {subtitle}
          </span>
        </div>

        <div>
          <p className="text-gray-400 text-sm leading-relaxed mt-2 line-clamp-3">
            {description}
          </p>
          <div className="mt-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className={`text-xs font-medium ${textColor}`}>
              {href ? "바로가기" : "자세히 보기"}
            </span>
            <ExternalLink className={`w-3 h-3 ${color}`} />
          </div>
        </div>
      </div>
    </button>
  );
}

/* ───────────── Activity Detail Dialog ───────────── */

/** 활동 상세 다이얼로그 — 설명, 주요 활동 내용, 외부 링크 표시 */
function ActivityDetailDialog({
  activity,
  open,
  onOpenChange,
}: {
  activity: ActivityData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!activity) return null;

  const Icon = ICON_MAP[activity.iconName];
  const icon = <Icon className="w-7 h-7" />;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-950 border-white/10 text-white sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div
              className={`inline-flex items-center justify-center w-11 h-11 ${activity.bgColor} border ${activity.borderColor} rounded-xl ${activity.color}`}
            >
              {icon}
            </div>
            <div>
              <DialogTitle className="text-white text-xl">
                {activity.title}
              </DialogTitle>
              <span
                className={`text-xs font-medium ${activity.textColor} tracking-wide uppercase`}
              >
                {activity.subtitle}
              </span>
            </div>
          </div>
          <DialogDescription className="text-gray-400 text-sm leading-relaxed pt-2">
            {activity.description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-3">
          <h4 className={`text-sm font-semibold ${activity.textColor}`}>
            주요 활동 내용
          </h4>
          <ul className="space-y-2.5">
            {activity.details.map((detail, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-sm text-gray-300"
              >
                <span
                  className={`mt-1.5 w-1.5 h-1.5 rounded-full ${activity.color.replace("text-", "bg-")} shrink-0`}
                />
                {detail}
              </li>
            ))}
          </ul>
        </div>

        {activity.href && (
          <a
            href={activity.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-2 inline-flex items-center gap-2 px-4 py-2.5 ${activity.bgColor} border ${activity.borderColor} rounded-xl ${activity.textColor} text-sm font-medium hover:brightness-125 transition-all w-fit`}
          >
            바로가기
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}

        <div className="mt-2 pt-4 border-t border-white/5 flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${activity.color.replace("text-", "bg-")}`}
          />
          <span className="text-xs text-gray-500">
            {SITE_CONFIG.name} {SITE_CONFIG.generation}기
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ───────────────────────────────────────────────────────
 * Grid Layout Map (12 cols × 8 rows, zero gaps)
 *
 *  ┌──────────┬─────────┬───────┐
 *  │  정기세션  │  해커톤   │ 블로그  │  r1-r2
 *  │  (5×3)   │  (4×2)  │ (3×2) │
 *  │          ├─────────┼───────┤
 *  │          │ 멋사만나  │  OT   │  r3-r4
 *  ├──────────┤  (4×2)  │ (3×2) │
 *  │   MT     ├─────────┼───────┤
 *  │  (5×3)   │아이디어톤 │데모데이 │  r5-r6
 *  │          │  (4×2)  │ (3×4) │
 *  ├──────────┼─────────┤       │
 *  │ 네트워킹  │  스터디   │       │  r7-r8
 *  │  (4×2)   │  (5×2)  │       │
 *  └──────────┴─────────┴───────┘
 * ─────────────────────────────────────────────────────── */

/**
 * 활동 테트리스 그리드 (Activities 페이지)
 *
 * 12컬럼 × 8행 CSS Grid로 10개의 활동 카드를 테트리스 형태로 배치합니다.
 * 모바일에서는 1~2열로 자동 폴백됩니다.
 * 카드 클릭 시 상세 다이얼로그가 열립니다.
 *
 * @data ACTIVITIES_DATA (from @/data/activities) — 10개 활동 데이터
 * @data SITE_CONFIG (from @/constants/site) — 다이얼로그 하단 기수 표시
 */
export default function ActivityGrid() {
  const [selectedActivity, setSelectedActivity] = useState<ActivityData | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSelect = (activity: ActivityData) => {
    setSelectedActivity(activity);
    setDialogOpen(true);
  };

  return (
    <>
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-yonsei-light font-semibold text-sm tracking-widest uppercase">
              Activities
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
              활동
            </h2>
            <p className="text-gray-400 text-base max-w-2xl mx-auto">
              멋쟁이 사자처럼에서는 IT 창업과 관련된 다양한 활동을 진행하고
              있습니다.
            </p>
          </div>

          {/* Tetris Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 md:grid-rows-[repeat(8,minmax(85px,1fr))] gap-3">
            {/* 정기세션 — col 1-5, row 1-3 (5×3) */}
            <div
              className="min-h-[200px] md:min-h-0 md:col-start-1 md:col-end-6 md:row-start-1 md:row-end-4 animate-fade-in-up"
              style={{ animationDelay: "0ms", animationFillMode: "both" }}
            >
              <ActivityCard
                activity={ACTIVITIES_DATA[0]}
                onSelect={handleSelect}
              />
            </div>

            {/* 해커톤 — col 6-9, row 1-2 (4×2) */}
            <div
              className="min-h-[200px] md:min-h-0 md:col-start-6 md:col-end-10 md:row-start-1 md:row-end-3 animate-fade-in-up"
              style={{ animationDelay: "70ms", animationFillMode: "both" }}
            >
              <ActivityCard
                activity={ACTIVITIES_DATA[1]}
                onSelect={handleSelect}
              />
            </div>

            {/* 블로그 — col 10-12, row 1-2 (3×2) */}
            <div
              className="min-h-[200px] md:min-h-0 md:col-start-10 md:col-end-13 md:row-start-1 md:row-end-3 animate-fade-in-up"
              style={{ animationDelay: "140ms", animationFillMode: "both" }}
            >
              <ActivityCard
                activity={ACTIVITIES_DATA[2]}
                onSelect={handleSelect}
              />
            </div>

            {/* 멋사만나 — col 6-9, row 3-4 (4×2) */}
            <div
              className="min-h-[200px] md:min-h-0 md:col-start-6 md:col-end-10 md:row-start-3 md:row-end-5 animate-fade-in-up"
              style={{ animationDelay: "210ms", animationFillMode: "both" }}
            >
              <ActivityCard
                activity={ACTIVITIES_DATA[3]}
                onSelect={handleSelect}
              />
            </div>

            {/* OT — col 10-12, row 3-4 (3×2) */}
            <div
              className="min-h-[200px] md:min-h-0 md:col-start-10 md:col-end-13 md:row-start-3 md:row-end-5 animate-fade-in-up"
              style={{ animationDelay: "280ms", animationFillMode: "both" }}
            >
              <ActivityCard
                activity={ACTIVITIES_DATA[4]}
                onSelect={handleSelect}
              />
            </div>

            {/* MT — col 1-5, row 4-6 (5×3) */}
            <div
              className="min-h-[200px] md:min-h-0 md:col-start-1 md:col-end-6 md:row-start-4 md:row-end-7 animate-fade-in-up"
              style={{ animationDelay: "350ms", animationFillMode: "both" }}
            >
              <ActivityCard
                activity={ACTIVITIES_DATA[5]}
                onSelect={handleSelect}
              />
            </div>

            {/* 아이디어톤 — col 6-9, row 5-6 (4×2) */}
            <div
              className="min-h-[200px] md:min-h-0 md:col-start-6 md:col-end-10 md:row-start-5 md:row-end-7 animate-fade-in-up"
              style={{ animationDelay: "420ms", animationFillMode: "both" }}
            >
              <ActivityCard
                activity={ACTIVITIES_DATA[6]}
                onSelect={handleSelect}
              />
            </div>

            {/* 데모데이 — col 10-12, row 5-8 (3×4) */}
            <div
              className="min-h-[200px] md:min-h-0 md:col-start-10 md:col-end-13 md:row-start-5 md:row-end-9 animate-fade-in-up"
              style={{ animationDelay: "490ms", animationFillMode: "both" }}
            >
              <ActivityCard
                activity={ACTIVITIES_DATA[7]}
                onSelect={handleSelect}
              />
            </div>

            {/* 네트워킹 — col 1-4, row 7-8 (4×2) */}
            <div
              className="min-h-[200px] md:min-h-0 md:col-start-1 md:col-end-5 md:row-start-7 md:row-end-9 animate-fade-in-up"
              style={{ animationDelay: "560ms", animationFillMode: "both" }}
            >
              <ActivityCard
                activity={ACTIVITIES_DATA[8]}
                onSelect={handleSelect}
              />
            </div>

            {/* 스터디 — col 5-9, row 7-8 (5×2) */}
            <div
              className="min-h-[200px] md:min-h-0 md:col-start-5 md:col-end-10 md:row-start-7 md:row-end-9 animate-fade-in-up"
              style={{ animationDelay: "630ms", animationFillMode: "both" }}
            >
              <ActivityCard
                activity={ACTIVITIES_DATA[9]}
                onSelect={handleSelect}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Detail Dialog */}
      <ActivityDetailDialog
        activity={selectedActivity}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
}

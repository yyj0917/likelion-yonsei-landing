'use client';

import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SOCIAL_LINKS } from '@/constants/site';
import { APPLICATION_PERIOD, RECRUITMENT_TIMELINE } from '@/data/recruitment';
import { APPLY_TRACKS } from '@/data/tracks';

/**
 * 현재 시각 기준으로 서류 접수 상태를 판별합니다.
 * @returns 접수 전 / 접수 중 / 접수 마감에 따른 UI 상태 객체
 */
function getApplicationStatus(now: Date) {
  if (now < APPLICATION_PERIOD.start) {
    const diff = APPLICATION_PERIOD.start.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return {
      isOpen: false,
      label: `서류 접수까지 ${days}일 남았습니다`,
      buttonText: '아직 접수 기간이 아닙니다',
    };
  }

  if (now > APPLICATION_PERIOD.end) {
    return {
      isOpen: false,
      label: '서류 접수가 마감되었습니다',
      buttonText: '접수가 마감되었습니다',
    };
  }

  return {
    isOpen: true,
    label: '서류 접수가 진행 중입니다!',
    buttonText: '지원하기',
  };
}

/**
 * 지원하기 페이지 — 지원 양식 및 안내
 *
 * 구성:
 * 1. 접수 상태 배너 (접수 전 / 접수 중 / 마감)
 * 2. 모집 트랙 카드 3개
 * 3. 모집 일정 타임라인
 * 4. 지원 안내 사항
 * 5. 구글 폼 CTA 버튼
 *
 * @data SOCIAL_LINKS (from @/constants/site) — 구글 폼 URL, 인스타그램 링크
 * @data APPLICATION_PERIOD (from @/data/recruitment) — 접수 시작/종료 시각
 * @data RECRUITMENT_TIMELINE (from @/data/recruitment) — 전체 모집 일정
 * @data APPLY_TRACKS (from @/data/tracks) — 트랙 선택 카드 데이터
 */
export function ApplicationForm() {
  const status = useMemo(() => getApplicationStatus(new Date()), []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-10">
      {/* 접수 상태 배너 */}
      <div
        className={`rounded-2xl border p-6 text-center ${
          status.isOpen
            ? 'border-likelion-orange/40 bg-likelion-orange/10'
            : 'border-white/10 bg-white/5'
        }`}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <span
            className={`inline-block h-3 w-3 rounded-full ${
              status.isOpen
                ? 'bg-green-400 animate-pulse'
                : 'bg-gray-500'
            }`}
          />
          <span
            className={`text-sm font-semibold tracking-wide ${
              status.isOpen ? 'text-likelion-orange' : 'text-gray-400'
            }`}
          >
            {status.isOpen ? 'NOW OPEN' : 'CLOSED'}
          </span>
        </div>
        <p className="text-white text-lg font-bold">{status.label}</p>
        <p className="text-gray-400 text-sm mt-1">
          접수 기간: 2026.02.19 (목) 00:00 ~ 02.25 (수) 23:59
        </p>
      </div>

      {/* 모집 트랙 */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          모집 트랙
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {APPLY_TRACKS.map((track) => (
            <Card
              key={track.name}
              className="bg-white/5 border-white/10 hover:border-likelion-orange/30 transition-colors"
            >
              <CardHeader className="pb-2">
                <div className="text-3xl mb-2">{track.icon}</div>
                <CardTitle className="text-white text-lg">
                  {track.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm leading-relaxed tracking-normal">{track.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 모집 일정 */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          모집 일정
        </h2>
        <Card className="bg-white/5 border-white/10">
          <CardContent className="pt-6">
            <div className="space-y-4">
              {RECRUITMENT_TIMELINE.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-4 rounded-lg px-4 py-3 ${
                    item.highlight
                      ? 'bg-likelion-orange/10 border border-likelion-orange/20'
                      : ''
                  }`}
                >
                  <span
                    className={`shrink-0 mt-0.5 inline-block h-2.5 w-2.5 rounded-full ${
                      item.highlight ? 'bg-likelion-orange' : 'bg-yonsei-light'
                    }`}
                  />
                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        item.highlight
                          ? 'text-likelion-orange'
                          : 'text-gray-400'
                      }`}
                    >
                      {item.date}
                    </p>
                    <p className="text-white font-medium">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 유의사항 */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          지원 안내
        </h2>
        <Card className="bg-white/5 border-white/10">
          <CardContent className="pt-6">
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-likelion-orange mt-1">•</span>
                <span>
                  지원서는 <strong className="text-white">구글 폼</strong>을
                  통해 접수합니다.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-likelion-orange mt-1">•</span>
                <span>
                  접수 기간 내에만 지원이 가능하며, 기간 종료 후에는 추가 접수를
                  받지 않습니다.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-likelion-orange mt-1">•</span>
                <span>
                  서류 합격자에 한해 개별 문자로 면접 일정을 안내드립니다.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-likelion-orange mt-1">•</span>
                <span>
                  지원 관련 문의는{' '}
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yonsei-light underline underline-offset-2 hover:text-yonsei-blue transition-colors"
                  >
                    {SOCIAL_LINKS.instagramHandle}
                  </a>{' '}
                  인스타그램 DM으로 보내주세요.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* 지원 버튼 */}
      <div className="flex flex-col items-center gap-3 pt-4">
        {status.isOpen ? (
          <a
            href={SOCIAL_LINKS.googleForm}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-md"
          >
            <Button
              className="w-full bg-likelion-orange hover:bg-likelion-light text-white font-bold px-12 py-7 text-lg rounded-xl transition-all transform hover:scale-[1.02] shadow-xl shadow-likelion-orange/20 cursor-pointer"
            >
              지원하기
            </Button>
          </a>
        ) : (
          <Button
            disabled
            className="w-full max-w-md bg-gray-700 text-gray-400 font-bold px-12 py-7 text-lg rounded-xl cursor-not-allowed"
          >
            {status.buttonText}
          </Button>
        )}
        <p className="text-gray-500 text-sm">
          버튼을 누르면 구글 폼으로 이동합니다.
        </p>
      </div>
    </div>
  );
}

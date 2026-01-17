import Link from 'next/link';
import { getApplications } from '@/actions/application';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Application, ApplicationStatus, ApplicationTrack } from '@/types/application';

interface ApplicationListProps {
  searchParams?: {
    search?: string;
    track?: ApplicationTrack;
    status?: ApplicationStatus;
  };
}

export async function ApplicationList({ searchParams }: ApplicationListProps) {
  const applications = await getApplications();

  // 필터링
  let filteredApplications = applications;

  if (searchParams?.search) {
    const search = searchParams.search.toLowerCase();
    filteredApplications = filteredApplications.filter(
      (app) =>
        app.name.toLowerCase().includes(search) ||
        app.email.toLowerCase().includes(search) ||
        app.student_id.includes(search)
    );
  }

  if (searchParams?.track && searchParams.track !== 'all') {
    filteredApplications = filteredApplications.filter(
      (app) => app.track === searchParams.track
    );
  }

  if (searchParams?.status && searchParams.status !== 'all') {
    filteredApplications = filteredApplications.filter(
      (app) => app.status === searchParams.status
    );
  }

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'reviewed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'accepted':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTrackLabel = (track: ApplicationTrack) => {
    switch (track) {
      case 'frontend':
        return 'Frontend';
      case 'backend':
        return 'Backend';
      case 'design-pm':
        return 'Design-PM';
      default:
        return track;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">지원서 목록</h1>
        <div className="text-white">
          총 {filteredApplications.length}건
        </div>
      </div>

      {/* 필터 및 검색 */}
      <Card className="bg-gray-900 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">필터 및 검색</CardTitle>
        </CardHeader>
        <CardContent>
          <form method="get" className="flex flex-col md:flex-row gap-4">
            <Input
              name="search"
              placeholder="이름, 이메일, 학번으로 검색..."
              defaultValue={searchParams?.search}
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 flex-1"
            />
            <Select name="track" defaultValue={searchParams?.track || 'all'}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white w-full md:w-[180px]">
                <SelectValue placeholder="트랙 선택" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-white/10">
                <SelectItem value="all" className="text-white">전체</SelectItem>
                <SelectItem value="frontend" className="text-white">Frontend</SelectItem>
                <SelectItem value="backend" className="text-white">Backend</SelectItem>
                <SelectItem value="design-pm" className="text-white">Design-PM</SelectItem>
              </SelectContent>
            </Select>
            <Select name="status" defaultValue={searchParams?.status || 'all'}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white w-full md:w-[180px]">
                <SelectValue placeholder="상태 선택" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-white/10">
                <SelectItem value="all" className="text-white">전체</SelectItem>
                <SelectItem value="pending" className="text-white">대기</SelectItem>
                <SelectItem value="reviewed" className="text-white">검토 중</SelectItem>
                <SelectItem value="accepted" className="text-white">합격</SelectItem>
                <SelectItem value="rejected" className="text-white">불합격</SelectItem>
              </SelectContent>
            </Select>
            <Button
              type="submit"
              className="bg-likelion-orange hover:bg-likelion-light text-white"
            >
              검색
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* 지원서 목록 */}
      <div className="space-y-4">
        {filteredApplications.length === 0 ? (
          <Card className="bg-gray-900 border-white/10">
            <CardContent className="pt-6">
              <p className="text-gray-400 text-center">지원서가 없습니다.</p>
            </CardContent>
          </Card>
        ) : (
          filteredApplications.map((application) => (
            <Card
              key={application.id}
              className="bg-gray-900 border-white/10 hover:border-likelion-orange/50 transition-colors"
            >
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-semibold text-white">
                        {application.name}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(
                          application.status
                        )}`}
                      >
                        {application.status === 'pending'
                          ? '대기'
                          : application.status === 'reviewed'
                          ? '검토 중'
                          : application.status === 'accepted'
                          ? '합격'
                          : '불합격'}
                      </span>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-likelion-orange/20 text-likelion-orange border border-likelion-orange/30">
                        {getTrackLabel(application.track)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400 space-y-1">
                      <p>이메일: {application.email}</p>
                      <p>전화번호: {application.phone}</p>
                      <p>학번: {application.student_id}</p>
                      {application.major && <p>전공: {application.major}</p>}
                      <p>제출일: {formatDate(application.created_at)}</p>
                    </div>
                  </div>
                  <div>
                    <Link href={`/admin/${application.id}`}>
                      <Button className="bg-likelion-orange hover:bg-likelion-light text-white">
                        상세 보기
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}


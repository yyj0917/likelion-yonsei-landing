import { getApplicationById, updateApplicationStatus } from '@/actions/application';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { StatusUpdateForm } from './status-update-form';
import type { ApplicationStatus, ApplicationTrack } from '@/types/application';
import Link from 'next/link';

interface ApplicationDetailProps {
  id: string;
}

export async function ApplicationDetail({ id }: ApplicationDetailProps) {
  const application = await getApplicationById(id);

  if (!application) {
    return (
      <div className="p-6">
        <Card className="bg-gray-900 border-white/10">
          <CardContent className="pt-6">
            <p className="text-gray-400 text-center">지원서를 찾을 수 없습니다.</p>
            <div className="mt-4 text-center">
              <Link href="/admin">
                <Button className="bg-likelion-orange hover:bg-likelion-light text-white">
                  목록으로 돌아가기
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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

  const getStatusLabel = (status: ApplicationStatus) => {
    switch (status) {
      case 'pending':
        return '대기';
      case 'reviewed':
        return '검토 중';
      case 'accepted':
        return '합격';
      case 'rejected':
        return '불합격';
      default:
        return status;
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

  const interviewQuestions = [
    { id: 'answer_1', label: '자기소개', answer: application.answer_1 },
    { id: 'answer_2', label: '지원동기', answer: application.answer_2 },
    { id: 'answer_3', label: '개발 경험 또는 프로젝트 경험', answer: application.answer_3 },
    { id: 'answer_4', label: '앞으로의 목표 또는 기대하는 것', answer: application.answer_4 },
    { id: 'answer_5', label: '팀워크 또는 협업 경험', answer: application.answer_5 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">지원서 상세</h1>
        <Link href="/admin">
          <Button
            variant="outline"
            className="bg-white/5 border-white/10 text-white hover:bg-white/10"
          >
            목록으로 돌아가기
          </Button>
        </Link>
      </div>

      {/* 기본 정보 */}
      <Card className="bg-gray-900 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">기본 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-400">이름</Label>
              <p className="text-white font-medium">{application.name}</p>
            </div>
            <div>
              <Label className="text-gray-400">이메일</Label>
              <p className="text-white font-medium">{application.email}</p>
            </div>
            <div>
              <Label className="text-gray-400">전화번호</Label>
              <p className="text-white font-medium">{application.phone}</p>
            </div>
            <div>
              <Label className="text-gray-400">학번</Label>
              <p className="text-white font-medium">{application.student_id}</p>
            </div>
            {application.major && (
              <div>
                <Label className="text-gray-400">전공</Label>
                <p className="text-white font-medium">{application.major}</p>
              </div>
            )}
            {application.grade && (
              <div>
                <Label className="text-gray-400">학년</Label>
                <p className="text-white font-medium">{application.grade}</p>
              </div>
            )}
            <div>
              <Label className="text-gray-400">트랙</Label>
              <p className="text-white font-medium">{getTrackLabel(application.track)}</p>
            </div>
            <div>
              <Label className="text-gray-400">상태</Label>
              <p className="text-white font-medium">{getStatusLabel(application.status)}</p>
            </div>
            <div>
              <Label className="text-gray-400">제출일</Label>
              <p className="text-white font-medium">{formatDate(application.created_at)}</p>
            </div>
            <div>
              <Label className="text-gray-400">수정일</Label>
              <p className="text-white font-medium">{formatDate(application.updated_at)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 면접 질문 답변 */}
      <Card className="bg-gray-900 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">면접 질문 답변</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {interviewQuestions.map((question) => (
            <div key={question.id} className="space-y-2">
              <Label className="text-white font-semibold">{question.label}</Label>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <p className="text-gray-300 whitespace-pre-wrap">{question.answer}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 추가 정보 */}
      {(application.portfolio_url || application.github_url || application.additional_info) && (
        <Card className="bg-gray-900 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">추가 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {application.portfolio_url && (
              <div>
                <Label className="text-gray-400">포트폴리오 URL</Label>
                <p className="text-white">
                  <a
                    href={application.portfolio_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-likelion-orange hover:underline"
                  >
                    {application.portfolio_url}
                  </a>
                </p>
              </div>
            )}
            {application.github_url && (
              <div>
                <Label className="text-gray-400">GitHub URL</Label>
                <p className="text-white">
                  <a
                    href={application.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-likelion-orange hover:underline"
                  >
                    {application.github_url}
                  </a>
                </p>
              </div>
            )}
            {application.additional_info && (
              <div>
                <Label className="text-gray-400">추가 정보</Label>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <p className="text-gray-300 whitespace-pre-wrap">
                    {application.additional_info}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* 메모 */}
      {application.notes && (
        <Card className="bg-gray-900 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">관리자 메모</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <p className="text-gray-300 whitespace-pre-wrap">{application.notes}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 상태 업데이트 */}
      <StatusUpdateForm application={application} />
    </div>
  );
}


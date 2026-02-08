import { AuthGuard } from '@/components/admin/auth-guard';
import { ApplicationList } from '@/components/admin/application-list';

export const metadata = {
  title: '어드민 | 멋쟁이사자처럼 연세대학교',
  description: '지원서 관리 페이지',
};

interface AdminPageProps {
  searchParams?: {
    search?: string;
    track?: string;
    status?: string;
  };
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  // 서버 사이드 인증 확인은 클라이언트 컴포넌트에서 처리
  // AuthGuard가 클라이언트 사이드에서 인증을 확인하고 처리합니다.
  
  return (
    <main className="bg-black min-h-screen text-white">
      <AuthGuard>
        <ApplicationList searchParams={searchParams} />
      </AuthGuard>
    </main>
  );
}


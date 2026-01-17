import { AuthGuard } from '@/components/admin/auth-guard';
import { ApplicationDetail } from '@/components/admin/application-detail';

export const metadata = {
  title: '지원서 상세 | 어드민',
  description: '지원서 상세 정보',
};

interface AdminDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminDetailPage({ params }: AdminDetailPageProps) {
  const { id } = await params;

  return (
    <main className="bg-black min-h-screen text-white">
      <AuthGuard>
        <ApplicationDetail id={id} />
      </AuthGuard>
    </main>
  );
}


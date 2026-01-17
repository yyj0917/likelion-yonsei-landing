export type ApplicationTrack = 'frontend' | 'backend' | 'design-pm';

export type ApplicationStatus = 'pending' | 'reviewed' | 'accepted' | 'rejected';

export interface Application {
  id: string;
  created_at: string;
  updated_at: string;
  
  // 기본 정보
  name: string;
  email: string;
  phone: string;
  student_id: string;
  major?: string | null;
  grade?: string | null;
  track: ApplicationTrack;
  
  // 면접 질문 답변
  answer_1: string; // 자기소개
  answer_2: string; // 지원동기
  answer_3: string; // 개발 경험 또는 프로젝트 경험
  answer_4: string; // 앞으로의 목표 또는 기대하는 것
  answer_5: string; // 팀워크 또는 협업 경험
  
  // 추가 정보
  portfolio_url?: string | null;
  github_url?: string | null;
  additional_info?: string | null;
  
  // 상태 관리
  status: ApplicationStatus;
  notes?: string | null;
}


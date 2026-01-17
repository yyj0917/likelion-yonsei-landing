import { z } from 'zod';

export const applicationSchema = z.object({
  name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다'),
  email: z.string().email('올바른 이메일 형식이 아닙니다'),
  phone: z.string().regex(/^010-\d{4}-\d{4}$/, '올바른 전화번호 형식이 아닙니다 (010-XXXX-XXXX)'),
  student_id: z.string().min(1, '학번을 입력해주세요'),
  major: z.string().optional(),
  grade: z.string().optional(),
  track: z.enum(['frontend', 'backend', 'design-pm'], {
    errorMap: () => ({ message: '트랙을 선택해주세요' })
  }),
  answer_1: z.string().min(100, '최소 100자 이상 작성해주세요'),
  answer_2: z.string().min(100, '최소 100자 이상 작성해주세요'),
  answer_3: z.string().min(100, '최소 100자 이상 작성해주세요'),
  answer_4: z.string().min(100, '최소 100자 이상 작성해주세요'),
  answer_5: z.string().min(100, '최소 100자 이상 작성해주세요'),
  portfolio_url: z.string().url('올바른 URL 형식이 아닙니다').optional().or(z.literal('')),
  github_url: z.string().url('올바른 URL 형식이 아닙니다').optional().or(z.literal('')),
  additional_info: z.string().optional(),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;


'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { applicationSchema, type ApplicationFormData } from '@/lib/validations/application';
import { submitApplication } from '@/actions/application';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const TRACK_OPTIONS = [
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'design-pm', label: 'Design-PM' },
] as const;

const INTERVIEW_QUESTIONS = [
  {
    id: 'answer_1',
    label: '자기소개',
    description: '자신을 소개해주세요. (최소 100자)',
  },
  {
    id: 'answer_2',
    label: '지원동기',
    description: '멋쟁이사자처럼 연세대학교에 지원하게 된 동기를 작성해주세요. (최소 100자)',
  },
  {
    id: 'answer_3',
    label: '개발 경험 또는 프로젝트 경험',
    description: '개발 경험이나 프로젝트 경험이 있다면 자세히 설명해주세요. (최소 100자)',
  },
  {
    id: 'answer_4',
    label: '앞으로의 목표 또는 기대하는 것',
    description: '멋쟁이사자처럼에서 이루고 싶은 목표나 기대하는 것을 작성해주세요. (최소 100자)',
  },
  {
    id: 'answer_5',
    label: '팀워크 또는 협업 경험',
    description: '팀워크나 협업 경험이 있다면 자세히 설명해주세요. (최소 100자)',
  },
] as const;

export function ApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      student_id: '',
      major: '',
      grade: '',
      track: undefined,
      answer_1: '',
      answer_2: '',
      answer_3: '',
      answer_4: '',
      answer_5: '',
      portfolio_url: '',
      github_url: '',
      additional_info: '',
    },
  });

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const result = await submitApplication(data);
      
      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: '지원서가 성공적으로 제출되었습니다!',
        });
        form.reset();
        // 성공 메시지 후 스크롤 상단으로
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || '지원서 제출에 실패했습니다.',
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: '예상치 못한 오류가 발생했습니다. 다시 시도해주세요.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* 제출 상태 메시지 */}
          {submitStatus.type && (
            <Card className={submitStatus.type === 'success' ? 'bg-green-950/20 border-green-500' : 'bg-red-950/20 border-red-500'}>
              <CardContent className="pt-6">
                <p className={submitStatus.type === 'success' ? 'text-green-400' : 'text-red-400'}>
                  {submitStatus.message}
                </p>
              </CardContent>
            </Card>
          )}

          {/* 기본 정보 섹션 */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">기본 정보</CardTitle>
              <CardDescription className="text-gray-400">
                지원에 필요한 기본 정보를 입력해주세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">이름 *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="홍길동"
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">이메일 *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="example@yonsei.ac.kr"
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">전화번호 *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="010-1234-5678"
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                        />
                      </FormControl>
                      <FormDescription className="text-gray-500">
                        010-XXXX-XXXX 형식으로 입력해주세요.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="student_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">학번 *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="2024123456"
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="major"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">전공</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="컴퓨터과학과"
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="grade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">학년</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="1학년"
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* 트랙 선택 섹션 */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">트랙 선택</CardTitle>
              <CardDescription className="text-gray-400">
                지원하고자 하는 트랙을 선택해주세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="track"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">트랙 *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue placeholder="트랙을 선택해주세요" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-900 border-white/10">
                        {TRACK_OPTIONS.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            className="text-white focus:bg-white/10"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* 면접 질문 섹션 */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">면접 질문</CardTitle>
              <CardDescription className="text-gray-400">
                아래 질문에 대해 자세히 답변해주세요. (각 질문 최소 100자)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {INTERVIEW_QUESTIONS.map((question) => (
                <FormField
                  key={question.id}
                  control={form.control}
                  name={question.id as keyof ApplicationFormData}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">{question.label} *</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder={question.description}
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 min-h-[120px]"
                        />
                      </FormControl>
                      <FormDescription className="text-gray-500">
                        {field.value?.length || 0}자 / 최소 100자
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </CardContent>
          </Card>

          {/* 추가 정보 섹션 */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">추가 정보</CardTitle>
              <CardDescription className="text-gray-400">
                포트폴리오, GitHub 등 추가 정보를 입력해주세요. (선택사항)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="portfolio_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">포트폴리오 URL</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="url"
                        placeholder="https://portfolio.example.com"
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="github_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">GitHub URL</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="url"
                        placeholder="https://github.com/username"
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="additional_info"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">추가 정보</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="추가로 전달하고 싶은 정보가 있다면 작성해주세요."
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* 제출 버튼 */}
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-likelion-orange hover:bg-likelion-light text-white font-bold px-12 py-6 text-lg rounded-xl transition-all transform hover:scale-105 shadow-xl shadow-likelion-orange/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? '제출 중...' : '지원서 제출하기'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}


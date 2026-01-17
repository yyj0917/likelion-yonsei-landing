'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateApplicationStatus } from '@/actions/application';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Application, ApplicationStatus } from '@/types/application';

interface StatusUpdateFormProps {
  application: Application;
}

export function StatusUpdateForm({ application }: StatusUpdateFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<ApplicationStatus>(application.status);
  const [notes, setNotes] = useState(application.notes || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const result = await updateApplicationStatus(application.id, status, notes);

      if (result.success) {
        setMessage({ type: 'success', text: '상태가 성공적으로 업데이트되었습니다.' });
        router.refresh();
      } else {
        setMessage({ type: 'error', text: result.error || '상태 업데이트에 실패했습니다.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: '예상치 못한 오류가 발생했습니다.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-gray-900 border-white/10">
      <CardHeader>
        <CardTitle className="text-white">상태 업데이트</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="status" className="text-white">
              상태
            </Label>
            <Select value={status} onValueChange={(value) => setStatus(value as ApplicationStatus)}>
              <SelectTrigger
                id="status"
                className="bg-white/5 border-white/10 text-white"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-white/10">
                <SelectItem value="pending" className="text-white">
                  대기
                </SelectItem>
                <SelectItem value="reviewed" className="text-white">
                  검토 중
                </SelectItem>
                <SelectItem value="accepted" className="text-white">
                  합격
                </SelectItem>
                <SelectItem value="rejected" className="text-white">
                  불합격
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-white">
              메모
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="관리자 메모를 입력하세요..."
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 min-h-[100px]"
            />
          </div>

          {message && (
            <div
              className={`p-3 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}
            >
              {message.text}
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-likelion-orange hover:bg-likelion-light text-white"
          >
            {isSubmitting ? '업데이트 중...' : '상태 업데이트'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}


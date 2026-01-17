'use server';

import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { applicationSchema, type ApplicationFormData } from '@/lib/validations/application';
import { revalidatePath } from 'next/cache';
import type { Application, ApplicationStatus } from '@/types/application';

export async function submitApplication(data: ApplicationFormData) {
  try {
    // 검증
    const validated = applicationSchema.parse(data);
    
    // 빈 문자열을 null로 변환
    const cleanedData = {
      ...validated,
      portfolio_url: validated.portfolio_url || null,
      github_url: validated.github_url || null,
      major: validated.major || null,
      grade: validated.grade || null,
      additional_info: validated.additional_info || null,
    };
    
    // Supabase에 저장
    const supabase = await createClient();
    const { data: application, error } = await supabase
      .from('applications')
      .insert(cleanedData)
      .select()
      .single();
    
    if (error) {
      console.error('Application submission error:', error);
      return { success: false, error: error.message };
    }
    
    return { success: true, data: application };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        error: error.errors.map(e => e.message).join(', ') 
      };
    }
    console.error('Unexpected error:', error);
    return { 
      success: false, 
      error: '지원서 제출 중 오류가 발생했습니다.' 
    };
  }
}

export async function getApplications(): Promise<Application[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Get applications error:', error);
      throw new Error(error.message);
    }
    
    return (data as Application[]) || [];
  } catch (error) {
    console.error('Unexpected error:', error);
    throw error;
  }
}

export async function getApplicationById(id: string): Promise<Application | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Get application by id error:', error);
      return null;
    }
    
    return data as Application;
  } catch (error) {
    console.error('Unexpected error:', error);
    return null;
  }
}

export async function updateApplicationStatus(
  id: string,
  status: ApplicationStatus,
  notes?: string
) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('applications')
      .update({
        status,
        notes: notes || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Update application status error:', error);
      return { success: false, error: error.message };
    }
    
    revalidatePath('/admin');
    revalidatePath(`/admin/${id}`);
    
    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { 
      success: false, 
      error: '상태 업데이트 중 오류가 발생했습니다.' 
    };
  }
}


'use server';

import { addMeeting, editMeeting, removeMeeting } from '@/lib/meetings-db';
import { SacramentMeeting } from './types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const MeetingTypeSchema = z.enum(['testimony', 'regular', 'stake', 'general']);

const HymnSchema = z.object({
  number: z.number().int().positive('Hymn number must be positive'),
  title: z.string().min(1, 'Hymn title is required'),
});

const SpeakerItemSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  topic: z.string().min(1, 'Topic or program item is required'),
  type: z.enum(['speaker', 'musical-number']),
});

const WardBusinessItemSchema = z.object({
  description: z.string().min(1, 'Business description is required'),
});

const MeetingFormSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  meetingType: MeetingTypeSchema,
  presiding: z.string().min(2, 'Presiding authority is required'),
  conducting: z.string().min(2, 'Conducting leader is required'),
  announcements: z.array(z.string()).optional(),
  openingHymn: HymnSchema,
  openingPrayer: z.string().min(2, 'Opening prayer name is required'),
  wardBusiness: z.array(WardBusinessItemSchema).optional(),
  stakeBusiness: z.boolean(),
  sacramentHymn: HymnSchema,
  speakers: z.array(SpeakerItemSchema),
  closingHymn: HymnSchema,
  closingPrayer: z.string().min(2, 'Closing prayer name is required'),
});

export async function createMeeting(formData: FormData) {
  const raw = {
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    announcements: formData.get('announcements') 
      ? JSON.parse(formData.get('announcements') as string) 
      : undefined,
    openingHymn: formData.get('openingHymn') 
      ? JSON.parse(formData.get('openingHymn') as string) 
      : undefined,
    openingPrayer: formData.get('openingPrayer'),
    wardBusiness: formData.get('wardBusiness') 
      ? JSON.parse(formData.get('wardBusiness') as string) 
      : undefined,
    stakeBusiness: formData.get('stakeBusiness') === 'true', 
    sacramentHymn: formData.get('sacramentHymn') 
      ? JSON.parse(formData.get('sacramentHymn') as string) 
      : undefined,
    speakers: formData.get('speakers') 
      ? JSON.parse(formData.get('speakers') as string) 
      : undefined,
    closingHymn: formData.get('closingHymn') 
      ? JSON.parse(formData.get('closingHymn') as string) 
      : undefined,
    closingPrayer: formData.get('closingPrayer'),
  };

  const parsed = MeetingFormSchema.safeParse(raw);

  if (!parsed.success) {
    console.error('Validation errors:', parsed.error.format());
    throw new Error('Invalid meeting input.');
  }

  try {
    await addMeeting(parsed.data);
  } catch (error) {
    console.error('Error creating meeting:', error);
    throw new Error('Failed to create meeting. Please try again later.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(id: number, formData: FormData) {
  try {
    const safeJsonParse = (key: string) => {
      const rawValue = formData.get(key);
      if (!rawValue || typeof rawValue !== 'string') return undefined;
      try {
        return JSON.parse(rawValue);
      } catch {
        return undefined;
      }
    };
      
    const updates: Partial<SacramentMeeting> = {};

    if (formData.has('date')) updates.date = formData.get('date') as string;
    if (formData.has('meetingType')) updates.meetingType = formData.get('meetingType') as SacramentMeeting['meetingType'];
    if (formData.has('presiding')) updates.presiding = formData.get('presiding') as string;
    if (formData.has('conducting')) updates.conducting = formData.get('conducting') as string;
    if (formData.has('openingPrayer')) updates.openingPrayer = formData.get('openingPrayer') as string;
    if (formData.has('closingPrayer')) updates.closingPrayer = formData.get('closingPrayer') as string;
    if (formData.has('stakeBusiness')) {
      updates.stakeBusiness = formData.get('stakeBusiness') === 'true';
    }
    if (formData.has('announcements')) updates.announcements = safeJsonParse('announcements');
    if (formData.has('openingHymn')) updates.openingHymn = safeJsonParse('openingHymn');
    if (formData.has('wardBusiness')) updates.wardBusiness = safeJsonParse('wardBusiness');
    if (formData.has('sacramentHymn')) updates.sacramentHymn = safeJsonParse('sacramentHymn');
    if (formData.has('speakers')) updates.speakers = safeJsonParse('speakers');
    if (formData.has('closingHymn')) updates.closingHymn = safeJsonParse('closingHymn');

    await editMeeting(id, updates);
    
  } catch (error) {
    console.error('Error updating meeting:', error);
    throw new Error('Failed to update meeting. Please try again later.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function deleteMeeting(id: number) {
    try {
        await removeMeeting(id);
        revalidatePath('meetings');
    } catch (error) {
    console.error('Error deleting meeting:', error);
    throw new Error('Failed to delete meeting. Please try again later.');
    }
    revalidatePath('/meetings');
    redirect('/meetings');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid email or password.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
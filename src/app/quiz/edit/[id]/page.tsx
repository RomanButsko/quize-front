import type { Metadata } from 'next';
import { use } from 'react';
import { EditorLayout } from '@/widgets/editor-layout';

export const metadata: Metadata = {
  title: 'Edit Quiz',
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function QuizEditByIdPage({ params }: PageProps) {
  const { id } = use(params);

  return <EditorLayout quizId={id} />;
}

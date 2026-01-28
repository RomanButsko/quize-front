import { use } from 'react';
import { EditorLayout } from '@/widgets/editor-layout';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function QuizEditByIdPage({ params }: PageProps) {
  const { id } = use(params);

  return <EditorLayout quizId={id} />;
}

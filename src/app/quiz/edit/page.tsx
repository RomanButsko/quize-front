import type { Metadata } from 'next';
import { EditorLayout } from '@/widgets/editor-layout';

export const metadata: Metadata = {
  title: 'Create Quiz',
};

export default function QuizEditPage() {
  return <EditorLayout />;
}

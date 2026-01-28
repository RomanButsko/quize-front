import { Quiz, QuizItemDto, QuizListItem, QuizListItemDto } from './types';

export const mapQuizListDtoToModel = (dto: QuizListItemDto[]): QuizListItem[] => {
  return dto.map((item) => ({
    id: item.id,
    title: item.title,
    updatedAt: item.updatedAt,
    published: item.published,
  }));
};

export const mapQuizDtoToModel = (dto: QuizItemDto): Quiz => {
  return {
    id: dto.id,
    title: dto.title,
    published: dto.published,
    updatedAt: dto.updatedAt,
    blocks: dto.blocks,
  };
};

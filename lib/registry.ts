import { ContentRepository, BaseEntity } from '@/types/base';
import { LocalContentRepository } from './content-loader';

let activeRepository: ContentRepository = new LocalContentRepository();

export function registerContentRepository(repository: ContentRepository) {
  activeRepository = repository;
}

export function getContentRepository(): ContentRepository {
  return activeRepository;
}

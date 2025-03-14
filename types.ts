import { Tables } from '@/database.types';

export type Word = Tables<'words'>;
export type Category = Tables<'categories'>;
export type WordWithCategory = Word & { category: Category };

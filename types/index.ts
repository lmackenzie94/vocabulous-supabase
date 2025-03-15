import { Tables } from '@/types/db';

export type Word = Tables<'words'>;
export type Category = Tables<'categories'>;
export type WordWithCategory = Word & { category: Category };

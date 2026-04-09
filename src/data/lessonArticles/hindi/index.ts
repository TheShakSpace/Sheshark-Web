import { course1Hindi } from './course1';
import { course2Hindi } from './course2';
import { course3Hindi } from './course3';
import { course4Hindi } from './course4';

export const lessonArticlesHi: Record<string, string> = {
  ...course1Hindi,
  ...course2Hindi,
  ...course3Hindi,
  ...course4Hindi,
};

import type { TFunction } from 'i18next';
import type {
  ActivityItem,
  Course,
  FundingRow,
  MarketplaceProduct,
  OrderRow,
  QuizQuestion,
  WomenBrand,
} from '@/data/appContent';

export function localizedCourse(t: TFunction, course: Course): Course {
  const p = `courses.${course.id}`;
  const lessonsDetail = course.lessonsDetail.map((l) => ({
    ...l,
    title: t(`${p}.lessons.${l.id}.title`),
    duration: t(`${p}.lessons.${l.id}.duration`),
  }));
  const syllabus = course.syllabus.map((_, i) => t(`${p}.syllabus.${i}`));
  const resources = course.resources.map((_, i) => t(`${p}.resources.${i}`));
  return {
    ...course,
    title: t(`${p}.title`),
    description: t(`${p}.description`),
    duration: t(`${p}.duration`),
    category: t(`${p}.category`),
    instructor: t(`${p}.instructor`),
    syllabus,
    lessonsDetail,
    videoAttribution: course.videoAttribution ? t(`${p}.videoAttribution`) : undefined,
    resources,
  };
}

export function localizedQuiz(t: TFunction, courseId: string, questions: QuizQuestion[]): QuizQuestion[] {
  const p = `quizzes.${courseId}`;
  return questions.map((q) => ({
    ...q,
    question: t(`${p}.${q.id}.question`),
    options: (t(`${p}.${q.id}.options`, { returnObjects: true }) as string[]) ?? q.options,
  }));
}

export function localizedProduct(t: TFunction, product: MarketplaceProduct): MarketplaceProduct {
  const p = `products.${product.id}`;
  return {
    ...product,
    name: t(`${p}.name`),
    category: t(`${p}.category`),
    description: t(`${p}.description`),
    warranty: product.warranty ? t(`${p}.warranty`) : undefined,
    shipping: product.shipping ? t(`${p}.shipping`) : undefined,
    offers: product.offers.map((_, i) => ({
      title: t(`${p}.offers.${i}.title`),
      detail: t(`${p}.offers.${i}.detail`),
    })),
    specs: product.specs?.map((_, i) => ({
      label: t(`${p}.specs.${i}.label`),
      value: t(`${p}.specs.${i}.value`),
    })),
  };
}

export function localizedBrand(t: TFunction, brand: WomenBrand): WomenBrand {
  return {
    ...brand,
    description: t(`brands.${brand.id}.description`),
    category: t(`brands.${brand.id}.category`),
  };
}

export function localizedFundingRow(t: TFunction, row: FundingRow): FundingRow {
  const p = `fundingRows.${row.id}`;
  return {
    ...row,
    title: t(`${p}.title`),
    provider: t(`${p}.provider`),
    amount: t(`${p}.amount`),
    deadline: t(`${p}.deadline`),
    description: t(`${p}.description`),
    eligibility: t(`${p}.eligibility`),
  };
}

export function localizedActivity(t: TFunction, item: ActivityItem): ActivityItem {
  const p = `activityFeed.${item.id}`;
  return {
    ...item,
    title: t(`${p}.title`),
    detail: t(`${p}.detail`),
    time: t(`${p}.time`),
  };
}

export function localizeFunnelStage(t: TFunction, stage: string): string {
  return t(`funnel.${stage}` as string);
}

export function localizedOrderRow(t: TFunction, row: OrderRow): OrderRow {
  const p = `ordersPipeline.${row.id}`;
  return {
    ...row,
    product: t(`${p}.product`),
    buyer: t(`${p}.buyer`),
    city: t(`${p}.city`),
    sla: t(`${p}.sla`),
  };
}

/** Category filter: internal value stays English; label is translated. */
export function marketplaceCategoryLabel(t: TFunction, category: string): string {
  return t(`marketplace.cats.${category}` as string);
}

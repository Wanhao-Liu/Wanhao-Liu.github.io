import type { Publication } from '@/types/publication';

export const selectedPublicationOrder = [
  'liu2026crossscope',
  'liu2026acmasac',
  'zhou2026surguniworld',
  'lin2026endowam',
] as const;

export function selectPublications(publications: Publication[]): Publication[] {
  const selectedById = new Map(
    publications.filter((publication) => publication.selected).map((publication) => [publication.id, publication]),
  );
  return selectedPublicationOrder.flatMap((id) => {
    const publication = selectedById.get(id);
    return publication ? [publication] : [];
  });
}


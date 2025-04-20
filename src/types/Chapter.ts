export type Chapter = {
  id: string;
  type: 'chapter';
  attributes: {
    chapter: string | null;
    title: string | null;
    translatedLanguage: string;
    externalUrl: string | null;
    publishAt: string;
    readableAt: string;
    createdAt: string;
    updatedAt: string;
  };
};

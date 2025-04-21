export type ListRelation = {
  id: string;
  attributes: {
    title: {
      [languageCode: string]: string;
    };
  };
  type: "manga" | "user";
}

export type DefaultPageProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export type MetadataProps = {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
};

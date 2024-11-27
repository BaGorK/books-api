export interface BookDto {
  id?: string;

  title: string;
  author: string;
  isbn: string;
  publicationYear: number;

  createdAt?: Date;
  updatedAt?: Date;
}

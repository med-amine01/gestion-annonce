export class Ad {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  createdBy: string;
  createdAt: string;

  toPlainObject(): Record<string, any> {
    return {
      id: this.id,
      title: this.title,
      subtitle: this.subtitle,
      category: this.category,
      description: this.description,
      createdBy: this.createdBy,
      createdAt: this.createdAt,
    };
  }
}

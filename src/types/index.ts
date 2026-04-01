export interface Post {
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  pubDate: Date;
  updatedDate?: Date;
  heroImage?: string;
  tags: string[];
  draft: boolean;
}

export interface Section {
  id: string;
  icon: string;
  label: string;
}

export interface ChecklistItem {
  label: string;
  checked?: boolean;
}

export interface ChecklistSection {
  title: string;
  items: ChecklistItem[];
}

export interface ProjectTab {
  id: string;
  label: string;
  headers: string[];
  rows: string[][];
}

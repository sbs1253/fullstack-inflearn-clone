'use client';

import { CourseCategory } from '@/generated/openapi-client';

export default function SiteHeader({ categories }: { categories: CourseCategory[] }) {
  console.log(categories);
  return (
    <header>
      <nav>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

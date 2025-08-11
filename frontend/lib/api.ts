'use server';
import { categoriesControllerFindAll, coursesControllerFindAll } from '@/generated/openapi-client';

export async function getAllCategories() {
  const { data, error } = await categoriesControllerFindAll();
  return { data, error };
}

export async function getAllInstructorCourses() {
  const { data, error } = await coursesControllerFindAll();
  return { data, error };
}

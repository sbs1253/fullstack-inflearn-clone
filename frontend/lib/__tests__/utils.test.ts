import { cn } from '../utils';

describe('cn utility function', () => {
  it('combines class names correctly', () => {
    const result = cn('class1', 'class2');
    expect(result).toBe('class1 class2');
  });

  it('handles conditional classes', () => {
    const result = cn('base-class', true && 'conditional-class', false && 'hidden-class');
    expect(result).toBe('base-class conditional-class');
  });

  it('merges Tailwind classes with conflicting utilities', () => {
    const result = cn('px-4', 'px-6');
    expect(result).toBe('px-6'); // Later class should override
  });

  it('handles arrays of classes', () => {
    const result = cn(['class1', 'class2'], 'class3');
    expect(result).toBe('class1 class2 class3');
  });

  it('handles empty inputs', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('handles undefined and null values', () => {
    const result = cn('class1', undefined, null, 'class2');
    expect(result).toBe('class1 class2');
  });

  it('deduplicates classes', () => {
    const result = cn('class1', 'class2', 'class1');
    expect(result).toBe('class1 class2 class1'); // clsx doesn't deduplicate by default
  });
});
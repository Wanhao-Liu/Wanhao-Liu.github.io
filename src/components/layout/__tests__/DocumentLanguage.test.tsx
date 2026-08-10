import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import DocumentLanguage from '@/components/layout/DocumentLanguage';

describe('DocumentLanguage', () => {
  it('keeps the document language synchronized with the active locale', () => {
    const { rerender } = render(<DocumentLanguage locale="en" />);
    expect(document.documentElement.lang).toBe('en');

    rerender(<DocumentLanguage locale="zh" />);
    expect(document.documentElement.lang).toBe('zh-CN');
  });
});

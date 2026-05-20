// @ts-ignore
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { OptimizedImage } from './OptimizedImage';

describe('OptimizedImage', () => {
  it('should render with correct attributes', () => {
    render(<OptimizedImage src="/test.jpg" alt="test image" />);
    const img = screen.getByRole('img');
    
    expect(img).toHaveAttribute('src', '/test.jpg');
    expect(img).toHaveAttribute('alt', 'test image');
    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img).toHaveAttribute('decoding', 'async');
  });

  it('should have a skeleton placeholder initially', () => {
    const { container } = render(<OptimizedImage src="/test.jpg" alt="test image" />);
    const skeleton = container.querySelector('.animate-pulse');
    expect(skeleton).toBeInTheDocument();
  });

  it('should have eager loading and high fetch priority when priority is true', () => {
    render(<OptimizedImage src="/test.jpg" alt="test image" priority />);
    const img = screen.getByRole('img');
    
    expect(img).toHaveAttribute('loading', 'eager');
    expect(img).toHaveAttribute('fetchpriority', 'high');
  });

  it('should not show skeleton when priority is true', () => {
    const { container } = render(<OptimizedImage src="/test.jpg" alt="test image" priority />);
    const skeleton = container.querySelector('.animate-pulse');
    expect(skeleton).not.toBeInTheDocument();
  });
});

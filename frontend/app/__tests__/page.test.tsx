import { render, screen } from '@testing-library/react';
import Home from '../page';

// Mock next/image
jest.mock('next/image', () => {
  return function MockImage({ src, alt, width, height, priority, ...props }) {
    return (
      <img 
        src={src} 
        alt={alt} 
        width={width} 
        height={height}
        data-priority={priority}
        {...props}
      />
    );
  };
});

describe('Home Page', () => {
  it('renders the home page', () => {
    render(<Home />);
    
    // Check for key elements - use partial text matching since text is broken up by elements
    expect(screen.getByText('Get started by editing', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('Save and see your changes instantly.')).toBeInTheDocument();
    expect(screen.getByText('Deploy now')).toBeInTheDocument();
    expect(screen.getByText('Read our docs')).toBeInTheDocument();
  });

  it('renders Next.js logo', () => {
    render(<Home />);
    
    const logo = screen.getByAltText('Next.js logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/next.svg');
  });

  it('renders all footer links', () => {
    render(<Home />);
    
    expect(screen.getByText('Learn')).toBeInTheDocument();
    expect(screen.getByText('Examples')).toBeInTheDocument();
    expect(screen.getByText('Go to nextjs.org →')).toBeInTheDocument();
  });

  it('has correct external links', () => {
    render(<Home />);
    
    const deployLink = screen.getByRole('link', { name: /deploy now/i });
    expect(deployLink).toHaveAttribute('href', expect.stringContaining('vercel.com'));
    expect(deployLink).toHaveAttribute('target', '_blank');
    
    const docsLink = screen.getByRole('link', { name: /read our docs/i });
    expect(docsLink).toHaveAttribute('href', expect.stringContaining('nextjs.org/docs'));
    expect(docsLink).toHaveAttribute('target', '_blank');
  });

  it('applies correct CSS classes', () => {
    render(<Home />);
    
    const main = screen.getByRole('main');
    expect(main).toHaveClass('flex', 'flex-col', 'gap-[32px]');
  });
});
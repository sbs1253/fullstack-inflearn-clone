import { renderHook, act } from '@testing-library/react';
import { useIsMobile } from '../use-mobile';

// Mock window.matchMedia
const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

// Mock window.innerWidth
const mockInnerWidth = (width: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
};

describe('useIsMobile', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
  });

  it('should return false for desktop width', () => {
    mockInnerWidth(1024);
    mockMatchMedia(false);

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);
  });

  it('should return true for mobile width', () => {
    mockInnerWidth(600);
    mockMatchMedia(true);

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true);
  });

  it('should return true for width at mobile breakpoint boundary', () => {
    mockInnerWidth(767); // Just below 768px breakpoint
    mockMatchMedia(true);

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true);
  });

  it('should return false for width at desktop breakpoint boundary', () => {
    mockInnerWidth(768); // At 768px breakpoint
    mockMatchMedia(false);

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);
  });

  it('should set up media query listener', () => {
    mockInnerWidth(1024);
    const mockAddEventListener = jest.fn();
    const mockRemoveEventListener = jest.fn();
    
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        matches: false,
        addEventListener: mockAddEventListener,
        removeEventListener: mockRemoveEventListener,
      })),
    });

    const { unmount } = renderHook(() => useIsMobile());

    expect(mockAddEventListener).toHaveBeenCalledWith('change', expect.any(Function));

    unmount();

    expect(mockRemoveEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });
});
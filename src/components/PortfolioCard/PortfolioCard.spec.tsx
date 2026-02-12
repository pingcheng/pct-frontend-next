import { render, fireEvent, act } from "@testing-library/react";
import React from "react";
import PortfolioCard from "@/components/PortfolioCard/PortfolioCard";
import { Portfolio } from "@/models/Portfolio/Portfolio";

describe("test PortfolioCard", () => {
  const portfolio: Portfolio = {
    slug: "test-portfolio",
    name: "Test Portfolio",
    coverImage: "https://sample.jpg",
    url: "https://sample.com",
    shortDescription: "This is test portfolio description",
    longDescription: "This is the long version of portfolio description",
    workplace: "Ping Cheng Dev Space",
    projectRole: "Developer",
    roleDescription: ["Design", "Development", "Test"],
    members: ["Ping Cheng"],
    screenshots: ["https://image1.jpg", "https://image2.jpg"],
    hasScreenshots: true,
    year: "2023",
  };

  beforeEach(() => {
    jest.useFakeTimers();
    // Reset the matchMedia mock for each test
    (window.matchMedia as jest.Mock).mockReturnValue({
      matches: false,
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    });
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("should match the snapshot", () => {
    const { container } = render(<PortfolioCard portfolio={portfolio} />);
    expect(container).toMatchSnapshot();
  });

  it("should handle reduced motion preference", () => {
    // Mock reduced motion preference
    (window.matchMedia as jest.Mock).mockReturnValue({
      matches: true,
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    });

    const { container } = render(<PortfolioCard portfolio={portfolio} />);
    const portfolioCard = container.querySelector('.portfolioCard');
    
    expect(portfolioCard).toHaveStyle('transform: rotateX(0deg) rotateY(0deg)');
  });

  it("should handle mouse move events and update transform", () => {
    const { container } = render(<PortfolioCard portfolio={portfolio} />);
    const portfolioCard = container.querySelector('.portfolioCard');
    
    // Mock getBoundingClientRect
    const mockRect = {
      left: 100,
      top: 100,
      width: 200,
      height: 200,
      right: 300,
      bottom: 300,
      x: 100,
      y: 100,
      toJSON: jest.fn(),
    };
    
    jest.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue(mockRect);
    
    // Simulate mouse move
    act(() => {
      fireEvent(document, new MouseEvent('mousemove', {
        clientX: 250, // right side
        clientY: 150, // slightly below center
      }));
    });
    
    // Fast forward to trigger throttled function
    act(() => {
      jest.advanceTimersByTime(16);
    });
    
    // Check if transform was updated
    expect(portfolioCard).toHaveStyle('transform: rotateX(1.5deg) rotateY(1.5deg)');
  });


  it("should show fallback when image error state is true", () => {
    // We'll test the error state by mocking the useState hook to return true for imageError
    const originalUseState = React.useState;
    let setImageErrorMock: jest.Mock | undefined;

    jest.spyOn(React, 'useState').mockImplementation((() => {
      if (setImageErrorMock === undefined) {
        // This is likely the imageError state
        setImageErrorMock = jest.fn();
        return [true, setImageErrorMock]; // Set imageError to true
      }
      return originalUseState(false);
    }) as typeof React.useState);

    const { container } = render(<PortfolioCard portfolio={portfolio} />);
    
    // Should show fallback when imageError is true
    const fallback = container.querySelector('.imageFallback');
    expect(fallback).toBeInTheDocument();
    expect(fallback).toHaveAttribute('role', 'img');
    expect(fallback).toHaveAttribute('aria-label', 'Cover image for Test Portfolio project (image unavailable)');
    
    // Restore original useState
    jest.restoreAllMocks();
  });

  it("should call setImageError when onError handler is triggered", () => {
    // Mock the useState hook to capture the setImageError function
    const originalUseState = React.useState;
    let setImageErrorMock: jest.Mock | undefined;

    jest.spyOn(React, 'useState').mockImplementation((() => {
      if (setImageErrorMock === undefined) {
        // This is the imageError state
        setImageErrorMock = jest.fn();
        return [false, setImageErrorMock];
      }
      return originalUseState(false);
    }) as typeof React.useState);
    
    const { container } = render(<PortfolioCard portfolio={portfolio} />);
    const portfolioCard = container.querySelector('.portfolioCard');
    
    // Get the React fiber node to access the props directly
    const fiberKey = Object.keys(portfolioCard || {}).find(key => key.startsWith('__reactFiber'));
    
    interface ReactFiberNode {
      memoizedProps?: {
        onError?: () => void;
      };
    }
    
    const reactFiber = fiberKey 
      ? (portfolioCard as unknown as Record<string, ReactFiberNode>)[fiberKey] 
      : null;
    
    if (reactFiber?.memoizedProps?.onError) {
      // Call the onError handler directly
      act(() => {
        reactFiber.memoizedProps?.onError?.();
      });
      
      // Verify setImageError was called with true
      expect(setImageErrorMock!).toHaveBeenCalledWith(true);
    } else {
      // Fallback: trigger error event and check that handler exists
      expect(portfolioCard).toHaveAttribute('onError');
    }
    
    // Restore original useState
    jest.restoreAllMocks();
  });

  it("should cleanup event listeners on unmount", () => {
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
    
    const { unmount } = render(<PortfolioCard portfolio={portfolio} />);
    
    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
  });

});

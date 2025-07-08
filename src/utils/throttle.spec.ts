import { throttle } from './throttle';

describe('throttle', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should call the function immediately on first call', () => {
    const mockFn = jest.fn();
    const throttledFn = throttle(mockFn, 100);

    throttledFn('arg1', 'arg2');
    
    expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should throttle subsequent calls within the time limit', () => {
    const mockFn = jest.fn();
    const throttledFn = throttle(mockFn, 100);

    throttledFn('call1');
    throttledFn('call2');
    throttledFn('call3');
    
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('call1');
  });

  it('should allow function to be called again after time limit', () => {
    const mockFn = jest.fn();
    const throttledFn = throttle(mockFn, 100);

    throttledFn('first');
    expect(mockFn).toHaveBeenCalledTimes(1);

    // Fast-forward time
    jest.advanceTimersByTime(100);

    throttledFn('second');
    expect(mockFn).toHaveBeenCalledTimes(2);
    expect(mockFn).toHaveBeenLastCalledWith('second');
  });

  it('should handle multiple arguments correctly', () => {
    const mockFn = jest.fn();
    const throttledFn = throttle(mockFn, 100);

    throttledFn(1, 2, 3, 'test');
    
    expect(mockFn).toHaveBeenCalledWith(1, 2, 3, 'test');
  });

  it('should maintain correct context when called', () => {
    const mockFn = jest.fn();
    const throttledFn = throttle(mockFn, 100);
    const context = { test: 'value' };

    throttledFn.call(context, 'arg');
    
    expect(mockFn).toHaveBeenCalledWith('arg');
  });
});
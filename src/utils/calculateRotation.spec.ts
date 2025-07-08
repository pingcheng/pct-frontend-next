import { calculateRotation } from './calculateRotation';

describe('calculateRotation', () => {
  const createMockRect = (
    left: number,
    top: number,
    width: number,
    height: number
  ): DOMRect => ({
    left,
    top,
    width,
    height,
    right: left + width,
    bottom: top + height,
    x: left,
    y: top,
    toJSON: () => ({}),
  });

  it('should return zero rotation when mouse is at the center', () => {
    const rect = createMockRect(0, 0, 200, 200);
    const mouseX = 100; // center X
    const mouseY = 100; // center Y

    const result = calculateRotation(mouseX, mouseY, rect);

    expect(result).toBe('rotateX(0deg) rotateY(0deg)');
  });

  it('should calculate positive Y rotation when mouse is to the right of center', () => {
    const rect = createMockRect(0, 0, 200, 200);
    const mouseX = 200; // far right
    const mouseY = 100; // center Y

    const result = calculateRotation(mouseX, mouseY, rect);

    expect(result).toBe('rotateX(0deg) rotateY(3deg)');
  });

  it('should calculate negative Y rotation when mouse is to the left of center', () => {
    const rect = createMockRect(0, 0, 200, 200);
    const mouseX = 0; // far left
    const mouseY = 100; // center Y

    const result = calculateRotation(mouseX, mouseY, rect);

    expect(result).toBe('rotateX(0deg) rotateY(-3deg)');
  });

  it('should calculate negative X rotation when mouse is below center', () => {
    const rect = createMockRect(0, 0, 200, 200);
    const mouseX = 100; // center X
    const mouseY = 200; // bottom

    const result = calculateRotation(mouseX, mouseY, rect);

    expect(result).toBe('rotateX(-3deg) rotateY(0deg)');
  });

  it('should calculate positive X rotation when mouse is above center', () => {
    const rect = createMockRect(0, 0, 200, 200);
    const mouseX = 100; // center X
    const mouseY = 0; // top

    const result = calculateRotation(mouseX, mouseY, rect);

    expect(result).toBe('rotateX(3deg) rotateY(0deg)');
  });

  it('should clamp rotation values to maximum of 5 degrees', () => {
    const rect = createMockRect(0, 0, 100, 100);
    const mouseX = 1000; // way outside the element
    const mouseY = 1000; // way outside the element

    const result = calculateRotation(mouseX, mouseY, rect);

    expect(result).toBe('rotateX(-5deg) rotateY(5deg)');
  });

  it('should clamp rotation values to minimum of -5 degrees', () => {
    const rect = createMockRect(100, 100, 100, 100);
    const mouseX = -1000; // way outside the element
    const mouseY = -1000; // way outside the element

    const result = calculateRotation(mouseX, mouseY, rect);

    expect(result).toBe('rotateX(5deg) rotateY(-5deg)');
  });

  it('should handle different element positions correctly', () => {
    const rect = createMockRect(50, 50, 100, 100); // element at position (50,50)
    const mouseX = 100; // center of element
    const mouseY = 100; // center of element

    const result = calculateRotation(mouseX, mouseY, rect);

    expect(result).toBe('rotateX(0deg) rotateY(0deg)');
  });

  it('should calculate correct rotation for corner positions', () => {
    const rect = createMockRect(0, 0, 200, 200);
    const mouseX = 0; // top-left corner
    const mouseY = 0; // top-left corner

    const result = calculateRotation(mouseX, mouseY, rect);

    expect(result).toBe('rotateX(3deg) rotateY(-3deg)');
  });

  it('should handle fractional values correctly', () => {
    const rect = createMockRect(0, 0, 300, 300);
    const mouseX = 225; // 3/4 to the right
    const mouseY = 75; // 1/4 down

    const result = calculateRotation(mouseX, mouseY, rect);

    expect(result).toBe('rotateX(1.5deg) rotateY(1.5deg)');
  });
});
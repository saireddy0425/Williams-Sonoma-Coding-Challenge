import {
  buildCardData,
  buildCarousel,
  buildCarouselImages,
  buildImageCarouselDots,
} from '../scripts/utilities';

describe('Shopping application', () => {
  it('should return empty when input is empty', () => {
    const result = buildCarouselImages([], 0);
    expect(result).toBe('');
  });
  it('should return empty content when input is corrupted', () => {
    const result = buildCarouselImages([], 0);
    expect(result).toBe('');
  });
  it('should return correct HTML when the data is correct', () => {
    const expectedOutput = `
      <div class="carousel-slides slide-index-1">
        <img src="http://www.google.com" />
      </div>`;
    const output = buildCarouselImages([{ href: 'http://www.google.com' }], 0);
    expect(output).toBe(expectedOutput);
  });

  it('should return empty content when input param is null', () => {
    const result = buildImageCarouselDots(null);
    expect(result).toBe('');
  });
  it('should return empty content when there is no input', () => {
    const result = buildImageCarouselDots(0);
    expect(result).toBe('');
  });
  it('should return correct content when buildImageCarouselDots is supplied with valid data', () => {
    const result = buildImageCarouselDots(2);
    expect(result).toBe('<span class="dot"></span>'.repeat(2));
  });
  it('should return the empty content when the invalid data is supplied', () => {
    const result = buildCarousel([], 0);
    expect(result).toBe('');
  });
  it('should return content when buildCarousel is supplied with valid data', () => {
    const result = buildCarousel([{ href: 'http://www.google.com' }], 0);
    expect(result.includes('slideShowClose')).toBe(true);
  });
  it('should not contain dot when there is single image', () => {
    const result = buildCarousel([{ href: 'http://www.google.com' }], 0);
    expect(result.includes('dot-container')).toBe(false);
  });
  it('should contain dots when there are multiple images', () => {
    const result = buildCarousel(
      [{ href: 'http://www.google.com' }, { href: 'http://www.google.com' }],
      0
    );
    expect(result.includes('dot-container')).toBe(true);
  });
  it('should return empty card content when there is no data', () => {
    const result = buildCardData([]);
    expect(result).toBe('');
  });
  it('should return empty card content when invalid data is supplied', () => {
      const result = buildCardData(null);
      expect(result).toBe('');
  });
  it('should return valid card content when there is data', () => {
    const result = buildCardData([
      { hero: { href: 'http://www.google.com' }, name: 'test' },
    ]);
    expect(result.includes('test')).toBe(true);
    expect(result.includes('card')).toBe(true);
  });
  it('should show special tag on the card when the price type is special ', () => {
    const result = buildCardData([
      {
        hero: { href: 'http://www.google.com' },
        name: 'test',
        price: {
          selling: 1233,
          type: 'special',
        },
      },
    ]);
    expect(result.includes('test')).toBe(true);
    expect(result.includes('special')).toBe(true);
  });
  it('should not show special tag on the card when the price type is not special ', () => {
    const result = buildCardData([
      {
        hero: { href: 'http://www.google.com' },
        name: 'test',
        price: {
          selling: 1233,
        },
      },
    ]);
    expect(result.includes('test')).toBe(true);
    expect(result.includes('special')).toBe(false);
  });
});

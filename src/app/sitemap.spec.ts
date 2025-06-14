import sitemap from './sitemap';
import { Portfolios } from '@/data/portfolios';

describe('sitemap', () => {
  it('should return correct sitemap with base routes and portfolio routes', () => {
    const result = sitemap();
    
    expect(result).toHaveLength(3 + Portfolios.length);
    
    // Check base routes
    expect(result[0]).toEqual({
      url: 'https://www.pingchengtech.com',
      lastModified: expect.any(Date),
      changeFrequency: 'monthly',
      priority: 1,
    });
    
    expect(result[1]).toEqual({
      url: 'https://www.pingchengtech.com/about',
      lastModified: expect.any(Date),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
    
    expect(result[2]).toEqual({
      url: 'https://www.pingchengtech.com/portfolio',
      lastModified: expect.any(Date),
      changeFrequency: 'weekly',
      priority: 0.9,
    });
    
    // Check portfolio routes
    Portfolios.forEach((portfolio, index) => {
      expect(result[3 + index]).toEqual({
        url: `https://www.pingchengtech.com/portfolio/${portfolio.slug}`,
        lastModified: expect.any(Date),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });
});
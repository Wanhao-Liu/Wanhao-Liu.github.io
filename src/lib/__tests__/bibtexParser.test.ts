import { describe, expect, it } from 'vitest';
import { parseBibTeX } from '@/lib/bibtexParser';

describe('parseBibTeX publication resources', () => {
  it('preserves webpage, pdf, arXiv, and video preview fields', () => {
    const [publication] = parseBibTeX(`
      @misc{demo,
        title={Demo Paper},
        author={First Author# and Wanhao Liu# and Senior Author*},
        year={2026},
        webpage={https://example.com/project},
        pdf={https://example.com/paper.pdf},
        arxiv={2608.00001},
        video={https://example.com/demo.mp4},
        poster={demo-poster.png}
        ,keywords={Medical Robotics, World Models}
      }
    `);

    expect(publication.webpage).toBe('https://example.com/project');
    expect(publication.pdfUrl).toBe('https://example.com/paper.pdf');
    expect(publication.arxivId).toBe('2608.00001');
    expect(publication.video).toBe('https://example.com/demo.mp4');
    expect(publication.poster).toBe('demo-poster.png');
    expect(publication.title).toBe('Demo Paper');
    expect(publication.tags).toEqual(['Medical Robotics', 'World Models']);
    expect(publication.authors[0].isCoAuthor).toBe(true);
    expect(publication.authors[2].isCorresponding).toBe(true);
  });
});

import type { Locale } from '@/lib/siteContent';

const labels = {
  en: {
    about: 'About', publications: 'Selected Publications', projects: 'Projects', cv: 'CV',
    researchInterests: 'Research Interests', education: 'Education', experience: 'Experience',
    news: 'Recent News', selectedPublications: 'Selected Publications', viewAll: 'View all publications',
    equal: 'Equal contribution', corresponding: 'Corresponding author', abstract: 'Abstract',
    webpage: 'Webpage', pdf: 'PDF', arxiv: 'arXiv', code: 'Code', doi: 'DOI',
    search: 'Search publications', allYears: 'All years', allTypes: 'All types', allTopics: 'All topics',
    noResults: 'No publications match these filters.', projectCode: 'View code',
    theme: 'Toggle theme', language: 'Switch language', switchToEnglish: 'Switch to English', switchToChinese: 'Switch to Chinese', menu: 'Open navigation', closeMenu: 'Close navigation', updated: 'Last updated',
    primaryNavigation: 'Primary navigation', mobileNavigation: 'Mobile navigation',
  },
  zh: {
    about: '关于', publications: '代表论文', projects: '项目', cv: '简历',
    researchInterests: '研究方向', education: '教育经历', experience: '研究经历',
    news: '最近动态', selectedPublications: '代表论文', viewAll: '查看全部论文',
    equal: '共同第一作者', corresponding: '通讯作者', abstract: '摘要',
    webpage: '主页', pdf: 'PDF', arxiv: 'arXiv', code: '代码', doi: 'DOI',
    search: '搜索论文', allYears: '全部年份', allTypes: '全部类型', allTopics: '全部方向',
    noResults: '没有符合当前筛选条件的论文。', projectCode: '查看代码',
    theme: '切换主题', language: '切换语言', switchToEnglish: 'Switch to English', switchToChinese: '切换到中文', menu: '打开导航', closeMenu: '关闭导航', updated: '更新于',
    primaryNavigation: '主导航', mobileNavigation: '移动端导航',
  },
} as const;

export function getLabels(locale: Locale) {
  return labels[locale];
}

// 도쿄 뉴스 API 서비스 - 모바일 최적화
export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

export interface NewsResponse {
  articles: NewsArticle[];
  totalResults: number;
}

// 도쿄 관련 모의 뉴스 데이터 (실제 API 연동 시 교체)
const mockTokyoNews: NewsArticle[] = [
  {
    title: "도쿄 벚꽃 개화 예상 시기 발표",
    description: "기상청이 올해 도쿄 벚꽃 개화 시기를 3월 말로 예상한다고 발표했습니다.",
    url: "https://example.com/news1",
    urlToImage: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400&h=300&fit=crop",
    publishedAt: new Date().toISOString(),
    source: { name: "도쿄 기상청" }
  },
  {
    title: "시부야 스카이 새로운 전망대 오픈",
    description: "시부야 스카이에 새로운 야외 전망대가 오픈하여 더욱 멋진 도쿄 전경을 감상할 수 있게 되었습니다.",
    url: "https://example.com/news2",
    urlToImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    source: { name: "도쿄 관광청" }
  },
  {
    title: "도쿄 지하철 새로운 노선 계획 발표",
    description: "도쿄 메트로가 2030년까지 새로운 지하철 노선을 건설한다는 계획을 발표했습니다.",
    url: "https://example.com/news3",
    urlToImage: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop",
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    source: { name: "도쿄 메트로" }
  },
  {
    title: "아사쿠사 센소지 복원 공사 완료",
    description: "아사쿠사 센소지의 대대적인 복원 공사가 완료되어 더욱 아름다운 모습으로 관광객을 맞이합니다.",
    url: "https://example.com/news4",
    urlToImage: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=300&fit=crop",
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
    source: { name: "아사쿠사 관광협회" }
  },
  {
    title: "도쿄 올림픽 파크 새로운 이벤트 개최",
    description: "도쿄 올림픽 파크에서 매주 주말마다 다양한 문화 이벤트가 개최됩니다.",
    url: "https://example.com/news5",
    urlToImage: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
    publishedAt: new Date(Date.now() - 14400000).toISOString(),
    source: { name: "도쿄 스포츠 진흥공단" }
  },
  {
    title: "도쿄 한류 열풍 지속",
    description: "도쿄에서 한국 문화에 대한 관심이 지속적으로 높아지고 있으며, 한식당과 한국 상품 매장이 증가하고 있습니다.",
    url: "https://example.com/news6",
    urlToImage: "https://images.unsplash.com/photo-1555992336-03a23b2e5e31?w=400&h=300&fit=crop",
    publishedAt: new Date(Date.now() - 18000000).toISOString(),
    source: { name: "도쿄 문화청" }
  }
];

// 도쿄 뉴스 가져오기
export async function getTokyoNews(): Promise<NewsResponse> {
  try {
    // 실제 환경에서는 NewsAPI나 RSS 피드를 사용
    // 현재는 CORS 문제로 인해 모의 데이터 사용
    
    // 실제 NewsAPI 사용 예시 (API 키 필요):
    // const apiKey = process.env.VITE_NEWS_API_KEY || 'YOUR_NEWS_API_KEY';
    // const response = await fetch(`https://newsapi.org/v2/everything?q=Tokyo&language=en&sortBy=publishedAt&apiKey=${apiKey}`);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          articles: mockTokyoNews,
          totalResults: mockTokyoNews.length
        });
      }, 800); // 모바일에서 빠른 응답을 위해 지연 시간 단축
    });
  } catch (error) {
    console.error('뉴스 정보 가져오기 실패:', error);
    return {
      articles: [],
      totalResults: 0
    };
  }
}

// 뉴스 카테고리별 필터링
export function filterNewsByCategory(articles: NewsArticle[], category: string): NewsArticle[] {
  if (category === 'all') return articles;
  
  const keywords = {
    '관광': ['관광', '여행', '명소', '스카이', '센소지', '올림픽'],
    '교통': ['지하철', '메트로', '노선', '교통'],
    '문화': ['문화', '이벤트', '한류', '축제'],
    '날씨': ['날씨', '기상', '벚꽃', '계절']
  };
  
  const categoryKeywords = keywords[category as keyof typeof keywords] || [];
  
  return articles.filter(article => 
    categoryKeywords.some(keyword => 
      article.title.toLowerCase().includes(keyword.toLowerCase()) ||
      article.description.toLowerCase().includes(keyword.toLowerCase())
    )
  );
}

// 시간 포맷팅 (모바일 친화적)
export function formatTimeAgo(dateString: string): string {
  const now = new Date();
  const publishedDate = new Date(dateString);
  const diffInMinutes = Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) {
    return "방금 전";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours}시간 전`;
  } else {
    const days = Math.floor(diffInMinutes / 1440);
    return `${days}일 전`;
  }
}

// 모바일에서 뉴스 요약 생성
export function getNewsSummary(article: NewsArticle): string {
  const maxLength = 80; // 모바일 화면에 맞춘 길이
  if (article.description.length <= maxLength) {
    return article.description;
  }
  return article.description.substring(0, maxLength) + '...';
}

/**
 * TOVOAI AI Dynamic Self-Expanding Taxonomy Engine
 * src/lib/taxonomy.ts
 *
 * 4계층 구조:
 *   Level 1: 대분류 (root-*)  — 10개
 *   Level 2: 중분류 (mid-*)   — 35개
 *   Level 3: 소분류 (sub-*)   — 25개
 *   Level 4: 에셋             — Supabase posts 테이블과 category_slug로 연결
 */

import { generateTovoaiEmbedding, calculateCosineSimilarity } from './embedding';

export interface CategoryNode {
  id: string;
  parentId: string | null;
  path: string;
  level: 1 | 2 | 3;
  nameEn: string;
  nameKo: string;
  slug: string;
  iconName: string;
  embedding: number[];
  count: number;
  color?: string;
}

// LEVEL 1: 대분류 (10개)
const L1: CategoryNode[] = [
  { id: 'root-politics', parentId: null, path: '/politics', level: 1, nameEn: 'Politics & Diplomacy', nameKo: '정치 · 외교 · 국방', slug: 'politics', iconName: 'Landmark', color: '#dc2626', embedding: generateTovoaiEmbedding('politics government parliament election diplomacy president foreign policy defense national'), count: 0 },
  { id: 'root-economy', parentId: null, path: '/economy', level: 1, nameEn: 'Economy & Finance', nameKo: '경제 · 금융 · 증권', slug: 'economy', iconName: 'TrendingUp', color: '#16a34a', embedding: generateTovoaiEmbedding('economy finance stock market interest rate gdp inflation investment banking wealth'), count: 0 },
  { id: 'root-tech', parentId: null, path: '/tech', level: 1, nameEn: 'IT & Tech', nameKo: 'IT · 테크 · 반도체', slug: 'tech', iconName: 'Cpu', color: '#2563eb', embedding: generateTovoaiEmbedding('technology IT mobile AI semiconductor microchip processor hardware software device platform'), count: 0 },
  { id: 'root-ai-future', parentId: null, path: '/ai-future', level: 1, nameEn: 'AI & Future Tech', nameKo: 'AI · 로봇 · 미래기술', slug: 'ai-future', iconName: 'Zap', color: '#7c3aed', embedding: generateTovoaiEmbedding('artificial intelligence robot automation future machine learning neural deep learning LLM GPT autonomous'), count: 0 },
  { id: 'root-society', parentId: null, path: '/society', level: 1, nameEn: 'Society & Issues', nameKo: '사회 · 이슈 · 사건', slug: 'society', iconName: 'Users', color: '#d97706', embedding: generateTovoaiEmbedding('society issue social crime accident incident community welfare public health education'), count: 0 },
  { id: 'root-culture', parentId: null, path: '/culture', level: 1, nameEn: 'Culture & Lifestyle', nameKo: '문화 · 연예 · 라이프', slug: 'culture', iconName: 'Music', color: '#db2777', embedding: generateTovoaiEmbedding('culture lifestyle kpop drama celebrity entertainment fashion art design museum travel leisure'), count: 0 },
  { id: 'root-sports', parentId: null, path: '/sports', level: 1, nameEn: 'Sports & Leisure', nameKo: '스포츠 · 레저 · 아웃도어', slug: 'sports', iconName: 'Trophy', color: '#059669', embedding: generateTovoaiEmbedding('sports golf soccer baseball basketball athlete championship tournament fitness outdoor leisure'), count: 0 },
  { id: 'root-food', parentId: null, path: '/food', level: 1, nameEn: 'Gourmet & Dining', nameKo: '미식 · 맛집 · 요리', slug: 'food', iconName: 'Utensils', color: '#ea580c', embedding: generateTovoaiEmbedding('food gourmet dining restaurant recipe cuisine dish ingredient cooking chef meal taste delicious'), count: 0 },
  { id: 'root-travel', parentId: null, path: '/travel', level: 1, nameEn: 'Travel & Nature', nameKo: '여행 · 풍경 · 자연', slug: 'travel', iconName: 'Globe', color: '#0891b2', embedding: generateTovoaiEmbedding('travel landscape ocean beach sea mountain nature resort tourism scenery destination holiday adventure'), count: 0 },
  { id: 'root-global', parentId: null, path: '/global', level: 1, nameEn: 'Global & International', nameKo: '국제 · 세계 · 외신', slug: 'global', iconName: 'Globe2', color: '#64748b', embedding: generateTovoaiEmbedding('global international world war conflict ukraine russia usa china europe nato geopolitics foreign'), count: 0 },
];

// LEVEL 2: 중분류 (35개)
const L2: CategoryNode[] = [
  { id: 'mid-domestic-pol', parentId: 'root-politics', path: '/politics/domestic', level: 2, nameEn: 'Domestic Politics', nameKo: '국내 정치 · 국회', slug: 'domestic-pol', iconName: 'Building', color: '#dc2626', embedding: generateTovoaiEmbedding('national assembly korea parliament ruling opposition bill vote president prime minister'), count: 0 },
  { id: 'mid-diplomacy', parentId: 'root-politics', path: '/politics/diplomacy', level: 2, nameEn: 'Diplomacy & Foreign', nameKo: '외교 · 한미일 관계', slug: 'diplomacy', iconName: 'HandshakeIcon', color: '#dc2626', embedding: generateTovoaiEmbedding('diplomacy foreign ministry south korea usa japan bilateral summit alliance treaty'), count: 0 },
  { id: 'mid-defense', parentId: 'root-politics', path: '/politics/defense', level: 2, nameEn: 'Defense & Security', nameKo: '국방 · 안보 · 군사', slug: 'defense', iconName: 'Shield', color: '#dc2626', embedding: generateTovoaiEmbedding('military army navy air force defense weapon nuclear north korea security national'), count: 0 },
  { id: 'mid-stock', parentId: 'root-economy', path: '/economy/stock', level: 2, nameEn: 'Stock & Markets', nameKo: '주식 · 코스피 · 증시', slug: 'stock', iconName: 'BarChart2', color: '#16a34a', embedding: generateTovoaiEmbedding('kospi kosdaq stock index bull bear market trading volatility dividend earnings'), count: 0 },
  { id: 'mid-real-estate', parentId: 'root-economy', path: '/economy/real-estate', level: 2, nameEn: 'Real Estate', nameKo: '부동산 · 아파트 · 건설', slug: 'real-estate', iconName: 'Building2', color: '#16a34a', embedding: generateTovoaiEmbedding('real estate apartment housing price construction buy rent mortgage realestate property'), count: 0 },
  { id: 'mid-crypto', parentId: 'root-economy', path: '/economy/crypto', level: 2, nameEn: 'Crypto & Web3', nameKo: '가상화폐 · 블록체인', slug: 'crypto', iconName: 'Bitcoin', color: '#16a34a', embedding: generateTovoaiEmbedding('bitcoin ethereum crypto blockchain web3 defi nft wallet token coin exchange'), count: 0 },
  { id: 'mid-macro', parentId: 'root-economy', path: '/economy/macro', level: 2, nameEn: 'Macro Economy', nameKo: '거시경제 · 금리 · 환율', slug: 'macro', iconName: 'TrendingUp', color: '#16a34a', embedding: generateTovoaiEmbedding('interest rate inflation gdp growth recession exchange federal reserve central bank monetary policy'), count: 0 },
  { id: 'mid-semiconductor', parentId: 'root-tech', path: '/tech/semiconductor', level: 2, nameEn: 'Semiconductor', nameKo: '반도체 · 파운드리 · 칩', slug: 'semiconductor', iconName: 'Cpu', color: '#2563eb', embedding: generateTovoaiEmbedding('semiconductor chip foundry samsung tsmc nvidia AMD DRAM NAND memory fabless wafer'), count: 0 },
  { id: 'mid-mobile', parentId: 'root-tech', path: '/tech/mobile', level: 2, nameEn: 'Mobile & Devices', nameKo: '모바일 · 스마트폰 · 갤럭시', slug: 'mobile', iconName: 'Smartphone', color: '#2563eb', embedding: generateTovoaiEmbedding('smartphone mobile iphone galaxy pixel device tablet wearable app ios android'), count: 0 },
  { id: 'mid-platform', parentId: 'root-tech', path: '/tech/platform', level: 2, nameEn: 'Platform & Software', nameKo: '플랫폼 · 앱 · 소프트웨어', slug: 'platform', iconName: 'Layers', color: '#2563eb', embedding: generateTovoaiEmbedding('platform software SaaS app service cloud subscription kakao naver google meta microsoft'), count: 0 },
  { id: 'mid-cybersecurity', parentId: 'root-tech', path: '/tech/cybersecurity', level: 2, nameEn: 'Cybersecurity', nameKo: '사이버보안 · 해킹 · 개인정보', slug: 'cybersecurity', iconName: 'Lock', color: '#2563eb', embedding: generateTovoaiEmbedding('cybersecurity hacking ransomware malware phishing data breach privacy protection vulnerability'), count: 0 },
  { id: 'mid-llm', parentId: 'root-ai-future', path: '/ai-future/llm', level: 2, nameEn: 'LLM & Generative AI', nameKo: 'LLM · 생성형 AI · ChatGPT', slug: 'llm', iconName: 'MessageSquare', color: '#7c3aed', embedding: generateTovoaiEmbedding('chatgpt gpt gemini claude llm language model generative AI text image synthesis'), count: 0 },
  { id: 'mid-robot', parentId: 'root-ai-future', path: '/ai-future/robot', level: 2, nameEn: 'Robotics & Automation', nameKo: '로봇 · 자율주행 · 자동화', slug: 'robot', iconName: 'Bot', color: '#7c3aed', embedding: generateTovoaiEmbedding('robot autonomous vehicle self driving automation humanoid drone factory industry 4.0'), count: 0 },
  { id: 'mid-biotech', parentId: 'root-ai-future', path: '/ai-future/biotech', level: 2, nameEn: 'Biotech & Healthcare AI', nameKo: '바이오 · 헬스케어 AI', slug: 'biotech', iconName: 'HeartPulse', color: '#7c3aed', embedding: generateTovoaiEmbedding('biotech healthcare AI drug discovery genomics protein clinical trial FDA digital health'), count: 0 },
  { id: 'mid-crime', parentId: 'root-society', path: '/society/crime', level: 2, nameEn: 'Crime & Safety', nameKo: '범죄 · 사건 · 사고', slug: 'crime', iconName: 'AlertTriangle', color: '#d97706', embedding: generateTovoaiEmbedding('crime murder assault theft fraud scam police investigation arrest prosecution sentence'), count: 0 },
  { id: 'mid-welfare', parentId: 'root-society', path: '/society/welfare', level: 2, nameEn: 'Welfare & Social', nameKo: '복지 · 노동 · 인구', slug: 'welfare', iconName: 'Heart', color: '#d97706', embedding: generateTovoaiEmbedding('welfare labor employment unemployment birth rate elderly pension minimum wage social insurance'), count: 0 },
  { id: 'mid-education', parentId: 'root-society', path: '/society/education', level: 2, nameEn: 'Education', nameKo: '교육 · 입시 · 대학', slug: 'education', iconName: 'BookOpen', color: '#d97706', embedding: generateTovoaiEmbedding('education school university student exam suneung csat curriculum teacher tutor academy'), count: 0 },
  { id: 'mid-kpop', parentId: 'root-culture', path: '/culture/kpop', level: 2, nameEn: 'K-pop & Music', nameKo: 'K-POP · 음악 · 아이돌', slug: 'kpop', iconName: 'Music', color: '#db2777', embedding: generateTovoaiEmbedding('kpop bts blackpink idol music group singer album chart grammy concert'), count: 0 },
  { id: 'mid-kdrama', parentId: 'root-culture', path: '/culture/kdrama', level: 2, nameEn: 'K-Drama & Film', nameKo: 'K-드라마 · 영화 · OTT', slug: 'kdrama', iconName: 'Film', color: '#db2777', embedding: generateTovoaiEmbedding('kdrama korean drama netflix disney ott movie film actor actress director award'), count: 0 },
  { id: 'mid-fashion', parentId: 'root-culture', path: '/culture/fashion', level: 2, nameEn: 'Fashion & Beauty', nameKo: '패션 · 뷰티 · 라이프스타일', slug: 'fashion', iconName: 'Shirt', color: '#db2777', embedding: generateTovoaiEmbedding('fashion beauty cosmetics brand luxury designer trend lifestyle wellness skincare'), count: 0 },
  { id: 'mid-heritage', parentId: 'root-culture', path: '/culture/heritage', level: 2, nameEn: 'Heritage & Art', nameKo: '문화재 · 역사 · 예술', slug: 'heritage', iconName: 'Landmark', color: '#db2777', embedding: generateTovoaiEmbedding('heritage history palace museum exhibition art culture traditional architecture gyeongbokgung'), count: 0 },
  { id: 'mid-golf', parentId: 'root-sports', path: '/sports/golf', level: 2, nameEn: 'Golf & KLPGA', nameKo: '골프 · KLPGA · PGA', slug: 'golf', iconName: 'Flag', color: '#059669', embedding: generateTovoaiEmbedding('golf klpga pga championship swing fairway green course driver birdie eagle'), count: 0 },
  { id: 'mid-soccer', parentId: 'root-sports', path: '/sports/soccer', level: 2, nameEn: 'Soccer & Football', nameKo: '축구 · K리그 · 월드컵', slug: 'soccer', iconName: 'Circle', color: '#059669', embedding: generateTovoaiEmbedding('soccer football kleague world cup premier league champions league striker goalkeeper'), count: 0 },
  { id: 'mid-baseball', parentId: 'root-sports', path: '/sports/baseball', level: 2, nameEn: 'Baseball & KBO', nameKo: '야구 · KBO · MLB', slug: 'baseball', iconName: 'Award', color: '#059669', embedding: generateTovoaiEmbedding('baseball kbo mlb pitcher batter home run stadium league team major minor'), count: 0 },
  { id: 'mid-outdoor', parentId: 'root-sports', path: '/sports/outdoor', level: 2, nameEn: 'Outdoor & Leisure', nameKo: '아웃도어 · 등산 · 레저', slug: 'outdoor', iconName: 'Mountain', color: '#059669', embedding: generateTovoaiEmbedding('outdoor hiking mountain camping climbing cycling marathon triathlon skiing snowboard'), count: 0 },
  { id: 'mid-jfood', parentId: 'root-food', path: '/food/japanese', level: 2, nameEn: 'Japanese Cuisine', nameKo: '일식 · 돈카츠 · 라멘', slug: 'japanese', iconName: 'Fish', color: '#ea580c', embedding: generateTovoaiEmbedding('japanese food tonkatsu ramen sushi tempura sashimi izakaya matcha bento wagyu'), count: 0 },
  { id: 'mid-kfood', parentId: 'root-food', path: '/food/korean', level: 2, nameEn: 'Korean Cuisine', nameKo: '한식 · 제철요리 · 술문화', slug: 'korean', iconName: 'Soup', color: '#ea580c', embedding: generateTovoaiEmbedding('korean food seasonal kimchi bibimbap bulgogi galbi jjigae makgeolli soju hanwoo'), count: 0 },
  { id: 'mid-wfood', parentId: 'root-food', path: '/food/western', level: 2, nameEn: 'Western & Global', nameKo: '양식 · 글로벌 맛집', slug: 'western', iconName: 'Utensils', color: '#ea580c', embedding: generateTovoaiEmbedding('western food pasta pizza steak burger brunch italian french american fusion restaurant'), count: 0 },
  { id: 'mid-cafe', parentId: 'root-food', path: '/food/cafe', level: 2, nameEn: 'Cafe & Dessert', nameKo: '카페 · 디저트 · 베이커리', slug: 'cafe', iconName: 'Coffee', color: '#ea580c', embedding: generateTovoaiEmbedding('cafe dessert bakery coffee specialty croissant cake latte espresso brew specialty'), count: 0 },
  { id: 'mid-ocean', parentId: 'root-travel', path: '/travel/ocean', level: 2, nameEn: 'Beach & Ocean', nameKo: '해변 · 바다 · 섬 여행', slug: 'ocean', iconName: 'Waves', color: '#0891b2', embedding: generateTovoaiEmbedding('ocean beach sea coast island resort haeundae jeju turquoise tropical waves'), count: 0 },
  { id: 'mid-mountain', parentId: 'root-travel', path: '/travel/mountain', level: 2, nameEn: 'Mountain & Forest', nameKo: '산 · 숲 · 국립공원', slug: 'mountain', iconName: 'Mountain', color: '#0891b2', embedding: generateTovoaiEmbedding('mountain forest national park hiking trekking alpine valley waterfall Korea seorak'), count: 0 },
  { id: 'mid-overseas', parentId: 'root-travel', path: '/travel/overseas', level: 2, nameEn: 'Overseas Travel', nameKo: '해외여행 · 유럽 · 동남아', slug: 'overseas', iconName: 'Plane', color: '#0891b2', embedding: generateTovoaiEmbedding('overseas travel europe japan thailand vietnam europe paris tokyo bali hotel resort'), count: 0 },
  { id: 'mid-war', parentId: 'root-global', path: '/global/war', level: 2, nameEn: 'War & Conflict', nameKo: '전쟁 · 분쟁 · 안보', slug: 'war', iconName: 'AlertOctagon', color: '#64748b', embedding: generateTovoaiEmbedding('war conflict ukraine russia military nato missile bombing ceasefire peace treaty'), count: 0 },
  { id: 'mid-usapol', parentId: 'root-global', path: '/global/usa', level: 2, nameEn: 'USA & Americas', nameKo: '미국 · 트럼프 · 바이든', slug: 'usa', iconName: 'Flag', color: '#64748b', embedding: generateTovoaiEmbedding('usa america trump biden president white house congress policy economy tariff'), count: 0 },
  { id: 'mid-china', parentId: 'root-global', path: '/global/china', level: 2, nameEn: 'China & Asia', nameKo: '중국 · 아시아 · 환율전쟁', slug: 'china', iconName: 'Globe2', color: '#64748b', embedding: generateTovoaiEmbedding('china xi jinping beijing economy trade tariff yuan asia geopolitics taiwan strait'), count: 0 },
];

// LEVEL 3: 소분류 (25개)
const L3: CategoryNode[] = [
  { id: 'sub-dram', parentId: 'mid-semiconductor', path: '/tech/semiconductor/dram', level: 3, nameEn: 'DRAM & Memory', nameKo: 'D램 · 낸드 · 메모리칩', slug: 'dram', iconName: 'Layers', color: '#2563eb', embedding: generateTovoaiEmbedding('DRAM NAND HBM memory chip samsung sk hynix micron bandwidth bandwidth'), count: 0 },
  { id: 'sub-ai-chip', parentId: 'mid-semiconductor', path: '/tech/semiconductor/ai-chip', level: 3, nameEn: 'AI Chip & GPU', nameKo: 'AI 가속기 · GPU · NPU', slug: 'ai-chip', iconName: 'Cpu', color: '#2563eb', embedding: generateTovoaiEmbedding('AI chip GPU NPU accelerator nvidia H100 inference training edge computing'), count: 0 },
  { id: 'sub-foundry', parentId: 'mid-semiconductor', path: '/tech/semiconductor/foundry', level: 3, nameEn: 'Foundry & Fab', nameKo: '파운드리 · 공정 · TSMC', slug: 'foundry', iconName: 'Factory', color: '#2563eb', embedding: generateTovoaiEmbedding('foundry tsmc samsung fab 3nm 2nm process node EUV lithography wafer'), count: 0 },
  { id: 'sub-gpt', parentId: 'mid-llm', path: '/ai-future/llm/gpt', level: 3, nameEn: 'GPT & OpenAI', nameKo: 'ChatGPT · OpenAI · GPT-5', slug: 'gpt', iconName: 'MessageSquare', color: '#7c3aed', embedding: generateTovoaiEmbedding('chatgpt openai gpt4 gpt5 sam altman enterprise API dall-e sora'), count: 0 },
  { id: 'sub-google-ai', parentId: 'mid-llm', path: '/ai-future/llm/google-ai', level: 3, nameEn: 'Google AI & Gemini', nameKo: 'Gemini · Google AI · 딥마인드', slug: 'google-ai', iconName: 'Sparkles', color: '#7c3aed', embedding: generateTovoaiEmbedding('gemini google deepmind bard vertex AI palm research model benchmark'), count: 0 },
  { id: 'sub-kospi', parentId: 'mid-stock', path: '/economy/stock/kospi', level: 3, nameEn: 'KOSPI & Korean Market', nameKo: '코스피 · 코스닥 · 한국증시', slug: 'kospi', iconName: 'BarChart', color: '#16a34a', embedding: generateTovoaiEmbedding('kospi kosdaq korea stock exchange market cap institutional foreign trading rally sell'), count: 0 },
  { id: 'sub-nasdaq', parentId: 'mid-stock', path: '/economy/stock/nasdaq', level: 3, nameEn: 'NASDAQ & US Stocks', nameKo: '나스닥 · 미국 주식 · 빅테크', slug: 'nasdaq', iconName: 'TrendingUp', color: '#16a34a', embedding: generateTovoaiEmbedding('nasdaq sp500 dow jones apple microsoft tesla amazon meta nvidia earnings quarter'), count: 0 },
  { id: 'sub-tonkatsu', parentId: 'mid-jfood', path: '/food/japanese/tonkatsu', level: 3, nameEn: 'Tonkatsu & Tempura', nameKo: '돈카츠 · 튀김 · 카츠동', slug: 'tonkatsu', iconName: 'UtensilsCrossed', color: '#ea580c', embedding: generateTovoaiEmbedding('tonkatsu pork cutlet golden crispy fried cabbage salad katsudon tempura'), count: 0 },
  { id: 'sub-ramen', parentId: 'mid-jfood', path: '/food/japanese/ramen', level: 3, nameEn: 'Ramen & Noodles', nameKo: '라멘 · 우동 · 소바', slug: 'ramen', iconName: 'Soup', color: '#ea580c', embedding: generateTovoaiEmbedding('ramen udon soba tonkotsu shoyu miso noodle broth toppings japanese noodle'), count: 0 },
  { id: 'sub-sushi', parentId: 'mid-jfood', path: '/food/japanese/sushi', level: 3, nameEn: 'Sushi & Omakase', nameKo: '스시 · 오마카세 · 사시미', slug: 'sushi', iconName: 'Fish', color: '#ea580c', embedding: generateTovoaiEmbedding('sushi omakase sashimi nigiri toro maguro salmon uni kaiseki japanese premium'), count: 0 },
  { id: 'sub-hansik', parentId: 'mid-kfood', path: '/food/korean/hansik', level: 3, nameEn: 'Traditional Hansik', nameKo: '전통한식 · 한정식 · 비빔밥', slug: 'hansik', iconName: 'Soup', color: '#ea580c', embedding: generateTovoaiEmbedding('hansik bibimbap bulgogi galbi doenjang jjigae kimchi banchan traditional korean feast'), count: 0 },
  { id: 'sub-streetfood', parentId: 'mid-kfood', path: '/food/korean/streetfood', level: 3, nameEn: 'Korean Street Food', nameKo: '분식 · 길거리 음식 · 야시장', slug: 'streetfood', iconName: 'ShoppingBag', color: '#ea580c', embedding: generateTovoaiEmbedding('tteokbokki eomuk gimbap hotteok sundae street food night market snack korean'), count: 0 },
  { id: 'sub-jeju', parentId: 'mid-ocean', path: '/travel/ocean/jeju', level: 3, nameEn: 'Jeju Island', nameKo: '제주도 · 올레길 · 한라산', slug: 'jeju', iconName: 'Island', color: '#0891b2', embedding: generateTovoaiEmbedding('jeju island olle trail hallasan beach resort tangerine haenyeo diving nature'), count: 0 },
  { id: 'sub-busan', parentId: 'mid-ocean', path: '/travel/ocean/busan', level: 3, nameEn: 'Busan & Southeast', nameKo: '부산 · 해운대 · 경남 해안', slug: 'busan', iconName: 'Waves', color: '#0891b2', embedding: generateTovoaiEmbedding('busan haeundae beach gwangalli bridge nampo gamcheon culture village seafood'), count: 0 },
  { id: 'sub-klpga', parentId: 'mid-golf', path: '/sports/golf/klpga', level: 3, nameEn: 'KLPGA Women\'s Tour', nameKo: 'KLPGA · 여자 프로골프', slug: 'klpga', iconName: 'Flag', color: '#059669', embedding: generateTovoaiEmbedding('klpga women golf korea tour championship tee shot birdie eagle player ranking'), count: 0 },
  { id: 'sub-pga', parentId: 'mid-golf', path: '/sports/golf/pga', level: 3, nameEn: 'PGA & World Golf', nameKo: 'PGA 투어 · 메이저 대회', slug: 'pga', iconName: 'Trophy', color: '#059669', embedding: generateTovoaiEmbedding('pga tour masters open championship us open british open tiger rory mcilroy'), count: 0 },
  { id: 'sub-netflix-kr', parentId: 'mid-kdrama', path: '/culture/kdrama/netflix', level: 3, nameEn: 'Netflix K-Content', nameKo: 'Netflix · 오징어게임 · 한류 OTT', slug: 'netflix-kr', iconName: 'Play', color: '#db2777', embedding: generateTovoaiEmbedding('netflix squid game korean content hallyu drama series original k-drama production'), count: 0 },
  { id: 'sub-theater', parentId: 'mid-kdrama', path: '/culture/kdrama/theater', level: 3, nameEn: 'Korean Film & Theater', nameKo: '한국영화 · 칸 · 박스오피스', slug: 'theater', iconName: 'Film', color: '#db2777', embedding: generateTovoaiEmbedding('korean film cannes box office director bong joonho blockbuster indie award cinema'), count: 0 },
  { id: 'sub-ukraine', parentId: 'mid-war', path: '/global/war/ukraine', level: 3, nameEn: 'Ukraine Reconstruction', nameKo: '우크라이나 · 재건 · 전후', slug: 'ukraine', iconName: 'Building2', color: '#64748b', embedding: generateTovoaiEmbedding('ukraine reconstruction zelensky war nato russia ceasefire rebuild infrastructure solar post-war'), count: 0 },
  { id: 'sub-mideast', parentId: 'mid-war', path: '/global/war/mideast', level: 3, nameEn: 'Middle East Conflict', nameKo: '중동 · 가자 · 이스라엘', slug: 'mideast', iconName: 'AlertOctagon', color: '#64748b', embedding: generateTovoaiEmbedding('israel hamas gaza middle east conflict ceasefire hostage aid occupation'), count: 0 },
];

export const DEFAULT_TREE_TAXONOMY: CategoryNode[] = [...L1, ...L2, ...L3];
export const DEFAULT_CATEGORY_NODES: CategoryNode[] = DEFAULT_TREE_TAXONOMY;

export function getNodesByLevel(level: 1 | 2 | 3): CategoryNode[] {
  return DEFAULT_TREE_TAXONOMY.filter(n => n.level === level);
}

export function getChildNodes(parentId: string): CategoryNode[] {
  return DEFAULT_TREE_TAXONOMY.filter(n => n.parentId === parentId);
}

export function getNodeBySlug(slug: string): CategoryNode | undefined {
  return DEFAULT_TREE_TAXONOMY.find(n => n.slug === slug);
}

export function classifyDynamicCategory(
  text: string,
  existingNodes: CategoryNode[] = DEFAULT_TREE_TAXONOMY
): { node: CategoryNode; isNewlyExpanded: boolean; similarityScore: number } {
  const inputVec = generateTovoaiEmbedding(text);
  let bestNode = existingNodes[0];
  let maxScore = -1;

  for (const node of existingNodes) {
    const sim = calculateCosineSimilarity(inputVec, node.embedding);
    if (sim > maxScore) {
      maxScore = sim;
      bestNode = node;
    }
  }

  if (maxScore < 0.40 && text.trim().length > 0) {
    const slug = text.trim().toLowerCase().replace(/[^a-z0-9가-힣]+/g, '-').slice(0, 25);
    const newNode: CategoryNode = {
      id: `dynamic-${Date.now()}`,
      parentId: 'root-global',
      path: `/global/dynamic/${slug}`,
      level: 3,
      nameEn: text.slice(0, 30),
      nameKo: text.slice(0, 30),
      slug,
      iconName: 'Zap',
      color: '#64748b',
      embedding: inputVec,
      count: 1,
    };
    return { node: newNode, isNewlyExpanded: true, similarityScore: maxScore };
  }

  return { node: bestNode, isNewlyExpanded: false, similarityScore: maxScore };
}

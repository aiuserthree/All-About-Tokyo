// OpenAI API 설정
export const OPENAI_CONFIG = {
  // OpenAI API 키를 환경 변수에서 가져오거나 직접 설정
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
  baseURL: 'https://api.openai.com/v1',
  model: 'gpt-3.5-turbo',
  maxTokens: 1000,
  temperature: 0.7,
};

// 도쿄 여행 AI 가이드 시스템 프롬프트
export const TOKYO_TRAVEL_SYSTEM_PROMPT = `당신은 도쿄 여행 전문 AI 가이드입니다. 다음 역할을 수행하세요:

1. **도쿄 여행 전문가**: 맛집, 관광지, 교통편, 숙소, 쇼핑 등 모든 도쿄 여행 정보 제공
2. **한국어 응답**: 모든 답변을 친근하고 도움이 되는 한국어로 제공
3. **실용적 조언**: 구체적이고 실행 가능한 정보 제공 (주소, 가격, 운영시간 등)
4. **개인화된 추천**: 사용자의 관심사와 상황에 맞는 맞춤형 추천
5. **현지 정보**: 최신 정보와 현지인만 아는 숨은 명소 포함

응답 형식:
- 간결하고 명확한 답변
- 필요시 구체적인 주소, 가격, 운영시간 포함
- 실용적인 팁과 주의사항 제공
- 관련 추천 장소나 대안 제시

도쿄 여행에 대한 질문에 친근하고 전문적으로 답변해주세요.`;

// API 호출 함수
export async function callOpenAI(messages: Array<{role: string, content: string}>) {
  try {
    const response = await fetch(`${OPENAI_CONFIG.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_CONFIG.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OPENAI_CONFIG.model,
        messages: [
          { role: 'system', content: TOKYO_TRAVEL_SYSTEM_PROMPT },
          ...messages
        ],
        max_tokens: OPENAI_CONFIG.maxTokens,
        temperature: OPENAI_CONFIG.temperature,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API 오류: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API 호출 실패:', error);
    throw error;
  }
}

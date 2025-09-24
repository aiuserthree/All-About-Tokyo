// 도쿄 교통 정보 API 서비스 - 모바일 최적화
export interface TransportLine {
  id: string;
  name: string;
  status: 'normal' | 'delayed' | 'suspended' | 'maintenance';
  delay: number; // 분 단위
  lastUpdated: string;
  color: string;
}

export interface StationInfo {
  name: string;
  line: string;
  nextTrain: number; // 분 단위
  status: 'normal' | 'delayed' | 'crowded';
}

export interface TransportResponse {
  lines: TransportLine[];
  stations: StationInfo[];
}

// 도쿄 주요 지하철 노선 정보
const tokyoMetroLines: TransportLine[] = [
  { id: 'ginza', name: '긴자선', status: 'normal', delay: 0, lastUpdated: '', color: '#FF9500' },
  { id: 'marunouchi', name: '마루노우치선', status: 'normal', delay: 0, lastUpdated: '', color: '#E60012' },
  { id: 'hibiya', name: '히비야선', status: 'normal', delay: 0, lastUpdated: '', color: '#B5B5AC' },
  { id: 'tozai', name: '도자이선', status: 'normal', delay: 0, lastUpdated: '', color: '#009BBF' },
  { id: 'chiyoda', name: '지요다선', status: 'normal', delay: 0, lastUpdated: '', color: '#00BB85' },
  { id: 'yurakucho', name: '유라쿠초선', status: 'normal', delay: 0, lastUpdated: '', color: '#C1A470' },
  { id: 'hanzomon', name: '한조몬선', status: 'normal', delay: 0, lastUpdated: '', color: '#8F76D6' },
  { id: 'namboku', name: '난보쿠선', status: 'normal', delay: 0, lastUpdated: '', color: '#00AC9B' },
  { id: 'fukutoshin', name: '후쿠토신선', status: 'normal', delay: 0, lastUpdated: '', color: '#9C5E31' }
];

// JR 주요 노선 정보
const jrLines: TransportLine[] = [
  { id: 'yamanote', name: '야마노테선', status: 'normal', delay: 0, lastUpdated: '', color: '#E60012' },
  { id: 'chuo', name: '주오선', status: 'normal', delay: 0, lastUpdated: '', color: '#FF6600' },
  { id: 'sobu', name: '소부선', status: 'normal', delay: 0, lastUpdated: '', color: '#FFCC00' },
  { id: 'keihin', name: '게이힌도호쿠선', status: 'normal', delay: 0, lastUpdated: '', color: '#009BBF' },
  { id: 'saikyo', name: '사이쿄선', status: 'normal', delay: 0, lastUpdated: '', color: '#00BB85' }
];

// 주요 역 정보
const majorStations: StationInfo[] = [
  { name: '시부야', line: '야마노테선', nextTrain: 2, status: 'crowded' },
  { name: '신주쿠', line: '야마노테선', nextTrain: 4, status: 'crowded' },
  { name: '긴자', line: '긴자선', nextTrain: 3, status: 'normal' },
  { name: '아키하바라', line: '야마노테선', nextTrain: 1, status: 'normal' },
  { name: '도쿄', line: '야마노테선', nextTrain: 2, status: 'normal' },
  { name: '하라주쿠', line: '야마노테선', nextTrain: 5, status: 'crowded' },
  { name: '우에노', line: '야마노테선', nextTrain: 3, status: 'normal' },
  { name: '이케부쿠로', line: '야마노테선', nextTrain: 4, status: 'normal' }
];

// 도쿄 교통 정보 가져오기
export async function getTokyoTransportInfo(): Promise<TransportResponse> {
  try {
    // 실제 환경에서는 도쿄 메트로 API나 JR East API 사용
    // 현재는 모의 데이터 사용
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // 랜덤하게 일부 노선에 지연 상황 시뮬레이션
        const allLines = [...tokyoMetroLines, ...jrLines].map(line => {
          const randomDelay = Math.random();
          let status: TransportLine['status'] = 'normal';
          let delay = 0;
          
          if (randomDelay < 0.1) { // 10% 확률로 지연
            status = 'delayed';
            delay = Math.floor(Math.random() * 10) + 1; // 1-10분 지연
          } else if (randomDelay < 0.15) { // 5% 확률로 운행 중단
            status = 'suspended';
          }
          
          return {
            ...line,
            status,
            delay,
            lastUpdated: new Date().toISOString()
          };
        });
        
        // 역 정보도 랜덤하게 업데이트
        const updatedStations = majorStations.map(station => ({
          ...station,
          nextTrain: Math.floor(Math.random() * 8) + 1, // 1-8분
          status: Math.random() < 0.3 ? 'crowded' : 'normal' as StationInfo['status']
        }));
        
        resolve({
          lines: allLines,
          stations: updatedStations
        });
      }, 800);
    });
  } catch (error) {
    console.error('교통 정보 가져오기 실패:', error);
    
    // 오류 시 기본값 반환
    return {
      lines: tokyoMetroLines.slice(0, 5).map(line => ({
        ...line,
        status: 'normal' as TransportLine['status'],
        delay: 0,
        lastUpdated: new Date().toISOString()
      })),
      stations: majorStations.slice(0, 4)
    };
  }
}

// 교통 상태에 따른 메시지 생성
export function getTransportStatusMessage(lines: TransportLine[]): string {
  const delayedLines = lines.filter(line => line.status === 'delayed');
  const suspendedLines = lines.filter(line => line.status === 'suspended');
  
  if (suspendedLines.length > 0) {
    return `⚠️ ${suspendedLines[0].name} 운행 중단 중입니다.`;
  } else if (delayedLines.length > 0) {
    const maxDelay = Math.max(...delayedLines.map(line => line.delay));
    return `🚨 ${delayedLines.length}개 노선 지연 중 (최대 ${maxDelay}분 지연)`;
  } else {
    return "✅ 모든 교통수단 정상 운행 중입니다.";
  }
}

// 혼잡도에 따른 색상 반환
export function getCrowdingColor(status: StationInfo['status']): string {
  switch (status) {
    case 'crowded': return '#FF4444';
    case 'delayed': return '#FF8800';
    default: return '#00AA00';
  }
}

// 교통 요약 정보
export function getTransportSummary(lines: TransportLine[], stations: StationInfo[]): string {
  const normalLines = lines.filter(line => line.status === 'normal').length;
  const totalLines = lines.length;
  const crowdedStations = stations.filter(station => station.status === 'crowded').length;
  
  return `정상 운행: ${normalLines}/${totalLines}개 노선, 혼잡한 역: ${crowdedStations}개`;
}

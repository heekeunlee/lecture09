const lessonGoals = [
  {
    step: '학습목표 1',
    title: '기술 문서를 AI가 읽을 수 있는 입력 구조로 바꾼다',
    body: 'PDF 매뉴얼, 설비 알람 표, 작업 표준서를 그대로 던지는 대신 문서 범위, 질문, 출력 형식, 금지 조건을 나누어 지시합니다.',
  },
  {
    step: '학습목표 2',
    title: '에러 코드에서 조치안까지의 추론 경로를 검증한다',
    body: 'AI가 만든 답이 문서 근거와 맞는지 페이지, 항목명, 조건, 예외 사항을 확인하는 현장형 검증 절차를 익힙니다.',
  },
  {
    step: '학습목표 3',
    title: '반복 문서 업무를 요약 비서 워크플로우로 만든다',
    body: '설비 트러블슈팅, 안전 체크, 보고서 초안 작성에 바로 재사용할 수 있는 프롬프트와 결과 양식을 완성합니다.',
  },
];

const lessonFlow = [
  { time: '3분', label: '01-08강 연결' },
  { time: '6분', label: '문서 요약 원리' },
  { time: '18분', label: '에러 코드 사례' },
  { time: '8분', label: 'AI 작업지시서 실습' },
  { time: '5분', label: '검증 체크' },
];

const previousFlow = [
  { week: '01-02강', theme: 'AI 마인드셋과 지시법', result: '현장 용어를 AI에게 정확히 설명' },
  { week: '03-04강', theme: 'MES 데이터 병합과 정제', result: '분산 로그를 분석 가능한 표로 정리' },
  { week: '05-08강', theme: '히트맵, 관리도, 상관, 파레토', result: '원인 후보를 그래프와 지표로 압축' },
  { week: '09강', theme: '기술 문서 요약 비서', result: '원인 후보를 매뉴얼 조치와 연결' },
];

const documentPipeline = [
  { label: '문서 수집', detail: 'PDF 매뉴얼, SOP, 알람 코드표' },
  { label: '질문 분해', detail: '증상, 설비, 코드, 제약 조건' },
  { label: '근거 추출', detail: '페이지, 표, 조치 항목, 예외' },
  { label: '현장 답변', detail: '우선 조치, 확인 데이터, 보고 문장' },
];

const errorCase = [
  { key: '설비', value: 'OLED 증착 챔버 V-203' },
  { key: '알람', value: 'E-472: Vacuum recovery delay' },
  { key: '관측값', value: 'Base pressure 8.4e-5 Torr, Pump current +18%' },
  { key: '목표', value: '매뉴얼 근거가 있는 1차 조치안만 5분 안에 정리' },
];

const comparisonRows = [
  { item: '입력', weak: '이 PDF 요약해줘', strong: 'E-472 알람과 진공 회복 지연 관련 항목만 찾아줘' },
  { item: '출력', weak: '긴 일반 요약문', strong: '가능 원인, 확인 데이터, 조치 순서, 근거 위치' },
  { item: '검증', weak: 'AI 답변을 그대로 복사', strong: '문서 페이지와 실제 센서 로그가 맞는지 확인' },
];

const caseBreakdown = [
  {
    phase: '1단계',
    title: '증상 고정',
    body: '알람명, 설비명, 발생 시각, 현재 운전 상태를 먼저 고정합니다. 이 단계가 흐리면 AI는 일반적인 진공 문제 설명으로 빠지기 쉽습니다.',
  },
  {
    phase: '2단계',
    title: '센서 로그 대조',
    body: '진공도, 펌프 전류, 밸브 명령, 인터락 상태를 같은 시간축에 놓고 “회복 지연”이 실제로 발생했는지 확인합니다.',
  },
  {
    phase: '3단계',
    title: '매뉴얼 범위 지정',
    body: '알람 코드표, 진공 계통 트러블슈팅, 안전 정지 조건처럼 AI가 찾아야 할 문서 위치를 좁힙니다.',
  },
  {
    phase: '4단계',
    title: '조치안 검증',
    body: 'AI 답변을 바로 실행하지 않고 근거 페이지, 확인 데이터, 작업 중단 조건이 모두 붙어 있는지 점검합니다.',
  },
];

const sensorReadings = [
  { time: '09:10', pressure: '2.1e-5 Torr', current: '4.8 A', valve: 'Open', note: '정상 베이스라인' },
  { time: '09:18', pressure: '4.9e-5 Torr', current: '5.4 A', valve: 'Open', note: '압력 회복 속도 둔화' },
  { time: '09:24', pressure: '8.4e-5 Torr', current: '5.7 A', valve: 'Open', note: 'E-472 발생' },
  { time: '09:30', pressure: '7.8e-5 Torr', current: '5.8 A', valve: 'Hold', note: '자동 재시도 실패' },
];

const manualEvidence = [
  { source: 'Alarm Code Table p.4', evidence: 'E-472는 180초 이내 base pressure 미도달 시 발생', use: '알람 정의 확인' },
  { source: 'Vacuum Troubleshooting p.9', evidence: '펌프 전류 상승 동반 시 배기 저항 또는 필터 막힘 확인', use: '원인 후보 1순위' },
  { source: 'Maintenance SOP p.11', evidence: '챔버 개방 전 N2 purge와 정비 승인 필요', use: '중단 조건 표시' },
];

const actionMatrix = [
  { priority: '1', action: '펌프 전류 추이와 최근 PM 이력 확인', owner: '공정/설비', decision: '전류 상승 지속 시 배기 라인 점검' },
  { priority: '2', action: '밸브 Open 명령과 실제 포지션 로그 비교', owner: '설비', decision: '명령-상태 불일치면 밸브 인터락 확인' },
  { priority: '3', action: '동일 챔버 직전 Lot의 base pressure 비교', owner: '공정', decision: 'Lot 무관 반복이면 설비 원인 가능성 상승' },
  { priority: '4', action: 'SOP 안전 조건 확인 후 정비 요청 문장 작성', owner: '설비/안전', decision: '챔버 개방 전 승인 필요' },
];

const practiceSteps = [
  {
    title: 'Step 1. 문서 범위 고정',
    body: '매뉴얼 전체가 아니라 “알람 코드표 4장, 진공 계통 트러블슈팅 9장”처럼 검색 범위를 먼저 제한합니다.',
  },
  {
    title: 'Step 2. 질문을 현장 언어로 변환',
    body: '“왜 고장났어?” 대신 설비명, 알람명, 계측값, 작업자가 이미 확인한 항목을 함께 제공합니다.',
  },
  {
    title: 'Step 3. 답변 형식을 표준화',
    body: '원인 후보, 확인할 데이터, 즉시 조치, 중단 조건, 보고 문장을 같은 양식으로 요구합니다.',
  },
  {
    title: 'Step 4. 환각 방지 규칙 추가',
    body: '문서에 없는 내용은 “근거 없음”으로 표시하게 하고, 안전/정비 승인 필요 항목은 별도 표시하게 합니다.',
  },
];

const dataCards = [
  { value: '12쪽', label: '실습에 사용할 가상 매뉴얼 범위' },
  { value: '4개', label: 'AI가 반드시 구분해야 할 출력 블록' },
  { value: '5분', label: '현장 1차 대응 요약 목표 시간' },
];

const promptTemplate = `역할: 너는 디스플레이/반도체 설비 엔지니어의 기술 문서 요약 비서다.
입력 문서: [문서명 / 페이지 범위 / 표 또는 장 제목]
상황: [설비명, 알람 코드, 관측값, 작업자가 이미 확인한 내용]
요청: 문서 근거가 있는 조치만 추출한다.
출력 형식:
1. 가능 원인 TOP 3
2. 즉시 확인할 센서/로그
3. 작업 순서와 중단 조건
4. 보고서에 붙일 3문장 요약
검증 규칙: 문서에 없는 추정은 쓰지 말고 "근거 없음"으로 표시한다.`;

function App() {
  return (
    <div className="app-container">
      <header className="main-header">
        <div className="header-top">
          <div className="logo-group">
            <img
              src="/lecture09/logo.png"
              alt="LettUin Edu"
              className="header-logo"
              onError={(event) => {
                event.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <div className="header-tag-container">
            <span className="header-tag">AI를 지휘하는 스마트한 엔지니어의 시작</span>
          </div>
        </div>

        <div className="hero-section">
          <h1>Ch.9 엔지니어용 기술 문서 요약 비서 구축</h1>
          <p className="subtitle">
            PDF 매뉴얼에서 에러 코드의 원인, 확인 데이터, 조치 순서를 근거와 함께 뽑아내는 40분 실습 교안
          </p>
          <div className="lesson-meta" aria-label="lesson summary">
            <span>40분</span>
            <span>문서 요약</span>
            <span>설비 매뉴얼</span>
            <span>에러 코드</span>
            <span>검증 실습</span>
          </div>
        </div>
      </header>

      <main>
        <section className="overview-section">
          <span className="section-label">01. 오프닝 및 학습목표</span>
          <h2>지금까지 만든 분석 결과를 “현장 조치”로 바꾸려면 기술 문서를 읽는 AI 비서가 필요합니다</h2>
          <p className="section-intro">
            01-08강에서는 AI에게 지시하고, 데이터를 정리하고, 불량 원인을 그래프로 좁히는 흐름을 만들었습니다.
            09강은 그 다음 단계입니다. 원인 후보가 나왔을 때 엔지니어가 가장 먼저 찾는 매뉴얼, SOP, 알람 코드표를 AI가
            근거 중심으로 읽게 만들어 실제 대응 속도를 높입니다.
          </p>

          <div className="learning-goals-grid" aria-label="학습목표">
            {lessonGoals.map((item) => (
              <article className="learning-goal-card" key={item.step}>
                <span>{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>

          <div className="lesson-timeline" aria-label="40분 강의 진행표">
            {lessonFlow.map((item) => (
              <div className="timeline-step" key={item.label}>
                <strong>{item.time}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="teaching-section">
          <span className="section-label">02. 01강부터 08강까지의 연결</span>
          <h2>분석 도구에서 끝나지 않고, 조치 근거를 찾는 단계로 이어집니다</h2>
          <p className="section-intro">
            파레토 차트가 “무엇이 가장 큰 문제인지”를 보여준다면, 기술 문서 요약 비서는 “그래서 어떤 순서로 확인하고
            무엇을 보고해야 하는지”를 정리합니다.
          </p>

          <div className="flow-ladder">
            {previousFlow.map((item) => (
              <article className="flow-card" key={item.week}>
                <span>{item.week}</span>
                <h3>{item.theme}</h3>
                <p>{item.result}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="teaching-section">
          <span className="section-label">03. 핵심 개념</span>
          <h2>좋은 문서 요약은 “짧게 줄이기”가 아니라 “질문에 맞는 근거를 찾아 구조화하기”입니다</h2>
          <p className="section-intro">
            기술 문서에는 안전 조건, 설비 모델별 예외, 측정 단위, 선행 작업 조건이 섞여 있습니다. 따라서 AI에게는 문서
            전체 요약보다 검색 범위와 답변 형식을 먼저 줘야 합니다.
          </p>

          <div className="concept-split">
            <div className="visual-panel">
              <img src="/lecture09/doc-assistant-flow.png" alt="기술 문서 요약 비서 흐름도" />
            </div>
            <div className="pipeline-list">
              {documentPipeline.map((item, index) => (
                <div className="pipeline-step" key={item.label}>
                  <strong>{String(index + 1).padStart(2, '0')}</strong>
                  <div>
                    <h3>{item.label}</h3>
                    <p>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="teaching-section">
          <span className="section-label">04. 실무 사례</span>
          <h2>가상 알람 E-472를 단계적으로 분해해 “문서 근거가 있는 1차 조치안”을 만들어봅니다</h2>
          <p className="section-intro">
            이 사례는 09강에서 가장 많은 시간을 쓰는 핵심 실습입니다. 알람 화면을 보고 바로 AI에게 질문하지 않고,
            현장 데이터와 매뉴얼 근거를 차례대로 붙여 답변 품질을 끌어올리는 과정을 따라갑니다.
          </p>

          <div className="case-grid">
            {errorCase.map((item) => (
              <article className="data-box" key={item.key}>
                <span>{item.key}</span>
                <strong>{item.value}</strong>
              </article>
            ))}
          </div>

          <div className="case-hero">
            <figure className="case-image-card">
              <img src="/lecture09/e472-equipment-context.png" alt="E-472 알람이 표시된 가상 설비 상황 이미지" />
              <figcaption>가상 설비 상황: 증착 챔버 V-203에서 진공 회복 지연 알람 발생</figcaption>
            </figure>
            <div className="case-note">
              <strong>사례에서 일부러 남겨둔 애매함</strong>
              <p>
                “진공이 늦게 잡힌다”는 말만으로는 펌프 문제, 밸브 문제, 누설, 레시피 조건 문제를 구분할 수 없습니다.
                AI에게 맡길 일은 결론을 찍는 것이 아니라, 확인해야 할 근거를 빠짐없이 구조화하는 것입니다.
              </p>
            </div>
          </div>

          <div className="case-breakdown">
            {caseBreakdown.map((item) => (
              <article className="breakdown-card" key={item.phase}>
                <span>{item.phase}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>

          <div className="evidence-layout">
            <div>
              <h3 className="subsection-title">센서 로그를 먼저 붙이면 질문이 구체화됩니다</h3>
              <p className="mini-intro">
                같은 알람 코드라도 압력만 높은 경우와 펌프 전류가 함께 상승하는 경우는 조치 방향이 달라집니다.
                아래 표는 AI에게 함께 넣을 최소 로그 예시입니다.
              </p>
              <div className="sensor-table" role="table" aria-label="E-472 센서 로그">
                <div className="sensor-row sensor-head" role="row">
                  <span>시간</span>
                  <span>압력</span>
                  <span>펌프 전류</span>
                  <span>밸브</span>
                  <span>해석 메모</span>
                </div>
                {sensorReadings.map((row) => (
                  <div className="sensor-row" role="row" key={row.time}>
                    <span>{row.time}</span>
                    <span>{row.pressure}</span>
                    <span>{row.current}</span>
                    <span>{row.valve}</span>
                    <span>{row.note}</span>
                  </div>
                ))}
              </div>
            </div>
            <figure className="case-image-card compact">
              <img src="/lecture09/e472-sensor-trend.png" alt="E-472 압력과 펌프 전류 추이 도표" />
              <figcaption>압력 회복 지연과 펌프 전류 상승을 같은 시간축에 배치</figcaption>
            </figure>
          </div>

          <div className="manual-evidence-section">
            <div>
              <h3 className="subsection-title">매뉴얼은 전체 요약이 아니라 “근거 조각”으로 읽힙니다</h3>
              <p className="mini-intro">
                AI 답변에 페이지와 항목명이 붙어야 현장에서 재확인이 가능합니다. 아래처럼 문서별 역할을 나누면
                답변이 긴 설명문이 아니라 조치 가능한 체크리스트로 바뀝니다.
              </p>
            </div>
            <figure className="case-image-card">
              <img src="/lecture09/e472-manual-evidence-map.png" alt="알람 코드표와 트러블슈팅 문서 근거 연결도" />
              <figcaption>알람 정의, 원인 후보, 안전 조건을 분리해 근거화</figcaption>
            </figure>
            <div className="manual-table" role="table" aria-label="문서 근거 정리표">
              <div className="manual-row manual-head" role="row">
                <span>문서 위치</span>
                <span>찾아야 할 근거</span>
                <span>답변에서의 역할</span>
              </div>
              {manualEvidence.map((row) => (
                <div className="manual-row" role="row" key={row.source}>
                  <span>{row.source}</span>
                  <span>{row.evidence}</span>
                  <span>{row.use}</span>
                </div>
              ))}
            </div>
          </div>

          <h3 className="subsection-title">AI 답변은 조치 우선순위 표로 받아야 실행하기 쉽습니다</h3>
          <div className="action-matrix" role="table" aria-label="조치 우선순위 매트릭스">
            <div className="action-row action-head" role="row">
              <span>우선순위</span>
              <span>확인/조치</span>
              <span>담당</span>
              <span>판단 기준</span>
            </div>
            {actionMatrix.map((row) => (
              <div className="action-row" role="row" key={row.priority}>
                <span>{row.priority}</span>
                <span>{row.action}</span>
                <span>{row.owner}</span>
                <span>{row.decision}</span>
              </div>
            ))}
          </div>

          <div className="comparison-table" role="table" aria-label="약한 지시와 좋은 지시 비교">
            <div className="comparison-row comparison-head" role="row">
              <span>구분</span>
              <span>약한 지시</span>
              <span>좋은 지시</span>
            </div>
            {comparisonRows.map((row) => (
              <div className="comparison-row" role="row" key={row.item}>
                <span>{row.item}</span>
                <span>{row.weak}</span>
                <span>{row.strong}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="teaching-section">
          <span className="section-label">05. AI 작업지시서 실습</span>
          <h2>매뉴얼 요약 요청을 현장 대응용 프롬프트로 재작성합니다</h2>
          <p className="section-intro">
            실습의 핵심은 멋진 문장이 아니라 통제 가능한 입력입니다. AI가 모르는 내용을 지어내지 않도록 문서 범위,
            출력 항목, 검증 규칙을 한 번에 묶습니다.
          </p>

          <div className="practice-layout">
            <div className="practice-steps">
              {practiceSteps.map((item) => (
                <article className="practice-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
            <div className="prompt-card">
              <span>수업용 프롬프트 템플릿</span>
              <pre>{promptTemplate}</pre>
            </div>
          </div>
        </section>

        <section className="teaching-section">
          <span className="section-label">06. 검증 및 마무리</span>
          <h2>AI 답변은 “문서 근거, 현장 데이터, 안전 조건” 세 가지가 맞을 때만 사용할 수 있습니다</h2>
          <p className="section-intro">
            09강의 산출물은 단순 요약문이 아니라 검증 가능한 조치 초안입니다. 다음 10강의 보고서 자동 생성에서는 이
            조치 초안을 주간/월간 보고서 형식으로 연결합니다.
          </p>

          <div className="metric-grid">
            {dataCards.map((item) => (
              <article className="metric-card" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>

          <div className="check-panel">
            <strong>수업 종료 전 확인 질문</strong>
            <ul>
              <li>AI가 답한 조치 항목마다 문서 페이지 또는 장 제목이 붙어 있는가?</li>
              <li>센서값, 알람 코드, 설비 모델명이 실제 상황과 일치하는가?</li>
              <li>안전 승인, 장비 정지, 정비팀 호출이 필요한 조건을 별도로 표시했는가?</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

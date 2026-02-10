# 최저가 견적 산출 챗봇 Spec v1 (Web / TypeScript)

## 0. 문서 목적
- 신차 판매 플랫폼의 **상품(차량) 상세 페이지**에 이식할 “최저가 견적 산출 챗봇”의 기능/UX/데이터/로직을 정의한다.
- 이 문서 하나를 Claude Code에 전달하면 **초기 화면(UI) + 대화 흐름 + 결과 탭/카드 + 슬롯 수집 + API 연동 구조**까지 구현 가능한 수준을 목표로 한다.

---

## 1. 제품 목표
1) 사용자가 선택한 차량에 대해 **구매방식별 최저가 견적**을 제공한다.
2) 대화로 필요한 정보를 점진적으로 수집하여 **정확한 금액**만 제시한다. (추정치 금지)
3) 언제든 **[계약금 결제하기] / [상담받기]**로 전환시킨다. (항상 고정 CTA)

---

## 2. 핵심 원칙 (필수 준수)
- (P1) **추정 금액 제공 금지**: 데이터/슬롯이 부족하면 “모른다/추가 질문”으로 해결한다.
- (P2) **정확한 금액만 노출**: 결과 카드에 표시되는 KPI/금액은 DB 또는 계산식 기반으로 확정 가능한 값만.
- (P3) 유저 미입력 레버가 남아있으면 결과 화면에 유도 토글 제공:
  - “추가 정보를 알려주시면 더 저렴한 가격의 견적이 있을 수도 있어요”
- (P4) 차량 컨텍스트는 상품 페이지에서 주입되는 **확정값**이며 단일 진실 소스(SSOT)로 사용한다.
- (P5) 결과 화면에는 항상 2개 CTA 고정 노출:
  - **계약금 결제하기** / **상담받기**

---

## 3. 최저가 기준 정의 (구매방식별)

### 3.1 일시불 (오토캐시백 기반)
- 최저가 기준: **오토캐시백 금액 최대** (실질 할인 최대)
- 계산식(확정):
  - `autoCashbackAmount = (msrp - discountOrTaxExemption) * autoCashbackRate`
- 주의:
  - `msrp`: **옵션 포함 확정 차량가**
  - `discountOrTaxExemption`: 할인/면세 (있다면 차감)
  - **세금/취등록/등록비/채권 비용 등은 미포함**

표시 KPI:
- 캐시백율(%), 캐시백 금액(원)
- (가능하면) 실질 차량가 = (msrp - discountOrTaxExemption) - cashbackAmount

---

### 3.2 할부 (카드/캐피탈)
- 시장 특성: 신용도에 따라 가능한 금리/한도 달라짐
- 최저가 기준(기본): **금리(APR) 최저**
- 보조표시: **월 납입액**, (가능하면) 총이자, 가능 한도

정렬 옵션:
- 기본: 금리 최저
- 옵션: 월 납입 최저 (유저가 탭/토글로 변경 가능)

표시 KPI:
- 금리(%), 월 납입액, (optional) 총이자, (optional) 한도/조건

---

### 3.3 리스/렌트
- 사용자 목적에 따라 **2가지 탭** 제공:
  1) **만기 반납**: 최저가 기준 = `monthlyFee` 최저
  2) **만기 인수**: 최저가 기준 = `totalCost` 최저  
     - `totalCost = termMonths * monthlyFee + buyoutPrice(잔가)`

표시 KPI:
- 반납 탭: 월 대여료(원) 중심
- 인수 탭: 총비용(원) 강조 + 월 대여료 + 잔가(인수금)

리스/렌트 레버(MVP부터 포함):
- 주행거리
- 정비 포함 여부
- 보험 포함 여부
- 개인/법인

---

## 4. 데이터 소스/운영 전제
- 견적 시스템은 다양할 수 있음:
  - 웹사이트 확인(스크래핑/크롤링)
  - 월별 엑셀 계산기 제공
  - (가능하면) API
- 운영 구조는 **둘 다 가능**해야 함:
  1) 자동 수집(스크래핑/크롤링/ETL)
  2) 관리자 업로드(엑셀/CSV 등)
- 프로모션은 보통 **월별 변동 가능** → 모든 견적 데이터는 적용기간을 가져야 함.

---

## 5. 대화 UX 개요 (MVP)

### 5.1 시작 전제
- 상품페이지에서 차량/트림/옵션/확정 msrp가 주입됨.
- 챗봇은 시작부터 `vehicleId`, `msrp`를 알고 있다.

### 5.2 첫 1턴(최소 부담 질문)
- Q1. “지금 바로 투입 가능한 예산(현금)은 대략 얼마인가요?” (모르겠어요 가능)
- Q2. “희망 구매방식은 무엇인가요?”
  - 일시불 / 할부 / 리스·렌트 / 아직 모르겠음(추천)

### 5.3 구매방식별 추가 질문(점진적)
- 한 번에 1~2개씩만 묻는다(이탈 방지).
- 언제든 “현재 정보로 결과 보기” 버튼 제공 가능(단, 결과는 확정값만).

#### (A) 일시불 추가 슬롯
- 카드 결제 가능 여부 (Y/N)
- 선호 카드사(선택, 없으면 전체 탐색)

#### (B) 할부 추가 슬롯
- 할부 유형: 카드/캐피탈/무관
- 기간(개월): 36/48/60 등
- (선택) 월 납입 상한
- (필요 시) 신용 구간 입력(초간단): 상/중/하/모름

#### (C) 리스·렌트 추가 슬롯
- 목적: 반납/인수 (탭)
- 기간(개월): 36/48/60 등
- 개인/법인
- 주행거리(예: 1만/2만/3만 km/년)
- 정비 포함 여부
- 보험 포함 여부
- 초기 비용 선호(0원/일부 가능) + 보증금/선납금(가능하면)

#### (D) 구매방식 미정(추천)
- 3문항 추천:
  1) 소유가 중요? (Y/N)
  2) 월 부담 낮추기 중요? (Y/N)
  3) 초기비용 0원 선호? (Y/N)
- 추천 후에도 상단 탭으로 다른 방식 비교 가능

---

## 6. 결과 화면(UI) Spec

### 6.1 공통 구조
- 상단 탭: [일시불] [할부] [리스·렌트]
- 리스·렌트 서브탭: [만기 반납] [만기 인수]
- 각 탭마다 **Top 3 카드** 노출 (확정)
- 결과 상단에 **정확도(%)** 표시 (확정)
- 결과 하단에 토글:
  - “추가 정보를 알려주시면 더 저렴한 가격의 견적이 있을 수도 있어요”
  - 펼치면 “비어있는 슬롯”을 선택형으로 제시 → 질문 플로우로 진입

### 6.2 결과 카드(Top 3) 필수 필드
- 순위(1/2/3)
- 제공처(회사/상품명)
- 핵심 KPI (방식별)
- 조건 요약 (기간/카드사/보증금/선납/주행거리/정비/보험 등)
- 프로모션 적용 기간
- 포함/미포함(신뢰용):
  - 세금/취등록/등록/채권/탁송/보험/정비 등 (해당 방식에 맞게)

### 6.3 CTA (항상 고정)
- Primary: **[계약금 결제하기]**
- Secondary: **[상담받기]**
- 두 버튼 모두 플랫폼 API 호출로 연결

---

## 7. 정확도(%) 산출 규칙 (MVP용 명확한 규칙)
- 목적: 유저 유도/진행률 표시 (정량화)
- 예시(권장):
  - 공통(예산 + 구매방식) 충족: 40%
  - 구매방식별 필수 슬롯 충족: +30%
  - 선택 슬롯(기간/카드사/신용구간/주행거리/정비/보험/보증금/선납 등) 각 +5~10%
  - 상한: 100%

※ 정확도는 “추정 금액 허용”을 의미하지 않는다.  
정확도가 낮아도 결과는 확정값만 노출.

---

## 8. 슬롯(변수) 설계 (TypeScript)

### 8.1 공통
```ts
type PurchaseMode = "cash" | "installment" | "lease_rent" | "unknown";

interface VehicleContext {
  vehicleId: string;
  vehicleName: string;
  trimId?: string;
  msrp: number; // 옵션 포함 확정 차량가(SSOT)
}

interface CommonSlots {
  budgetCashAvailable?: number; // 즉시 투입 가능 현금(모르면 undefined)
  purchaseMode: PurchaseMode;
  discountOrTaxExemption?: number; // 할인/면세(일시불 캐시백 계산에 사용)
}

### 8.2 일시불
interface CashSlots {
  cardPaymentPossible?: boolean;
  preferredCardCompany?: string; // 없으면 "ALL"
}

### 8.3 할부
type InstallmentType = "card" | "capital" | "any";
type CreditBand = "high" | "mid" | "low" | "unknown";

interface InstallmentSlots {
  installmentType?: InstallmentType;
  termMonths?: 24 | 36 | 48 | 60 | 72;
  monthlyBudgetCeiling?: number;
  creditBand?: CreditBand;
  sortPreference?: "apr" | "monthly"; // 금리/월납 정렬
}

### 8.4 리스/렌트
type LeaseIntent = "return" | "buyout";
type YesNo = "yes" | "no";

interface LeaseRentSlots {
  intent?: LeaseIntent;
  termMonths?: 24 | 36 | 48 | 60;
  customerType?: "individual" | "corporate";

  annualMileageKm?: 10000 | 15000 | 20000 | 30000; // 예시
  maintenanceIncluded?: YesNo;
  insuranceIncluded?: YesNo;

  upfrontPreference?: "zero" | "some";
  depositAmount?: number;
  prepaymentAmount?: number;
}

## 9. 견적 탐색/랭킹 로직 (서버 권장, 프론트는 표시)

###9.1 출력 포맷(공통)
- 탭별로 Top 3 배열 반환
- 각항목은 반드시 근거(데이터 id/기간/조건)를 포함
interface QuoteResultBase {
  providerName: string;
  productName?: string;
  promoStart?: string; // ISO date
  promoEnd?: string;   // ISO date
  includes?: string[]; // 포함 항목 라벨
  excludes?: string[]; // 미포함 항목 라벨
  conditionsSummary: string; // 짧은 문자열 요약
  traceId: string; // 데이터 추적용
}

interface CashQuoteResult extends QuoteResultBase {
  autoCashbackRate: number;   // 0.019 형태 또는 1.9%
  autoCashbackAmount: number; // 원
}

interface InstallmentQuoteResult extends QuoteResultBase {
  apr: number;           // %
  monthlyPayment: number;
  totalInterest?: number;
  maxEligibleAmount?: number;
}

interface LeaseRentQuoteResult extends QuoteResultBase {
  monthlyFee: number;
  buyoutPrice?: number; // intent=buyout일 때 필수
  totalCost?: number;   // intent=buyout일 때 필수
}

###9.2 정렬(확정)

- 일시불: autoCashbackAmount 내림차순

- 할부(기본): apr 오름차순 (동률이면 monthlyPayment 오름차순)

- 할부(옵션): monthlyPayment 오름차순 (동률이면 apr 오름차순)

- 리스/렌트(반납): monthlyFee 오름차순

- 리스/렌트(인수): totalCost 오름차순

### 9.3 추정 금지 처리

- 필요한 슬롯이 없어서 결과가 확정되지 않으면:

  - 해당 견적은 결과 목록에서 제외

  - “추가 정보를 입력하면 더 많은/더 저렴한 견적을 찾을 수 있어요” 토글로 유도

## 10. API 계약 (프론트 ↔ 서버, 플랫폼 연동)

### 10.1 견적 조회 API (권장)

- POST /api/quotes/search

- Request:
{
  "vehicleContext": { "vehicleId": "...", "msrp": 123456789, "vehicleName": "..." },
  "commonSlots": { "budgetCashAvailable": 10000000, "purchaseMode": "installment", "discountOrTaxExemption": 0 },
  "cashSlots": { "cardPaymentPossible": true, "preferredCardCompany": "ALL" },
  "installmentSlots": { "installmentType": "any", "termMonths": 60, "creditBand": "mid", "sortPreference": "apr" },
  "leaseRentSlots": { "intent": "return", "termMonths": 48, "customerType": "individual", "annualMileageKm": 20000, "maintenanceIncluded": "yes", "insuranceIncluded": "no" }
}

- Response:
{
  "accuracy": 72,
  "cashTop3": [],
  "installmentTop3": [],
  "leaseRentReturnTop3": [],
  "leaseRentBuyoutTop3": [],
  "missingSlots": ["installmentSlots.creditBand", "leaseRentSlots.depositAmount"]
}

### 10.2 계약금 결제 API (플랫폼 제공 가정)

- POST /api/checkout/deposit

- Request: vehicleId, 선택한 견적 traceId, 유저 식별 정보(플랫폼 세션 기반)

- Response: 결제 진행 URL 또는 결제 상태

### 10.3 상담받기 API (플랫폼 제공 가정)

- POST /api/consult/request

- Request: vehicleId, 현재 슬롯 요약, 선택한 견적 traceId(optional)

- Response: 상담 접수 완료 + 상담 채널 안내

## 11. MVP 확정 범위 (YES 확정)

- 구매방식: 일시불 / 할부 / 리스·렌트(반납/인수) 전부 포함

- 결과 개수: 구매방식별 Top 3 고정

- 정확도(%): 결과 화면 상단 노출

- 리스·렌트 레버: 주행거리/정비/보험 포함 여부 MVP부터 포함

- CTA: [계약금 결제하기] + [상담받기] 항상 고정

## 12. 후속 확장 포인트 (v2+)

- 사용자 “추가 질문 선택” UX 고도화(월납↓/초기비용↓/총비용↓ 등 목표 기반)

- 카드 비교(2개 견적 비교)

- 프로모션 수집 자동화(스크래핑/ETL) + 관리자 검수 플로우

- 신용도 입력 정교화(단, 개인정보/민감도 고려하여 단계적 도입)
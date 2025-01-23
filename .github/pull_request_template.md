## 과제 체크포인트

### 기본과제

#### 목표 : 전역상태관리를 이용한 적절한 분리와 계층에 대한 이해를 통한 FSD 폴더 구조 적용하기
- 전역상태관리를 사용해서 상태를 분리하고 관리하는 방법에 대한 이해
- Context API, Jotai, Zustand 등 상태관리 라이브러리 사용하기
- FSD(Feature-Sliced Design)에 대한 이해
- FSD를 통한 관심사의 분리에 대한 이해
- 단일책임과 역할이란 무엇인가?
- 관심사를 하나만 가지고 있는가?
- 어디에 무엇을 넣어야 하는가?

#### 체크포인트
- [ ] 전역상태관리를 사용해서 상태를 분리하고 관리했나요?
- [ ] Props Drilling을 최소화했나요?
- [ ] shared 공통 컴포넌트를 분리했나요?
- [ ] shared 공통 로직을 분리했나요?
- [ ] entities를 중심으로 type을 정의하고 model을 분리했나요?
- [ ] entities를 중심으로 ui를 분리했나요?
- [ ] entities를 중심으로 api를 분리했나요?
- [ ] feature를 중심으로 사용자행동(이벤트 처리)를 분리했나요?
- [ ] feature를 중심으로 ui를 분리했나요?
- [ ] feature를 중심으로 api를 분리했나요?
- [ ] widget을 중심으로 데이터를 재사용가능한 형태로 분리했나요?


### 심화과제

#### 목표: 서버상태관리 도구인 TanstackQuery를 이용하여 비동기코드를 선언적인 함수형 프로그래밍으로 작성하기 

- TanstackQuery의 사용법에 대한 이해
- TanstackQuery를 이용한 비동기 코드 작성에 대한 이해
- 비동기 코드를 선언적인 함수형 프로그래밍으로 작성하는 방법에 대한 이해

#### 체크포인트

- [ ] 모든 API 호출이 TanStack Query의 useQuery와 useMutation으로 대체되었는가?
- [ ] 쿼리 키가 적절히 설정되었는가?
- [ ] fetch와 useState가 아닌 선언적인 함수형 프로그래밍이 적절히 적용되었는가?
- [ ] 캐싱과 리프레시 전략이 올바르게 구현되었는가?


## 과제 셀프회고
### 과제를 시작하면서

이번 발제를 들으면서 느낀 것은

**FSD 아키텍처는 대규모 프로젝트에서 그 힘을 발휘하는 것 같은데
소규모 프로젝트에서는 FSD의 장점이 어떻게 적용하면 좋을까?** 라는 질문으로 시작하였다

프로젝트가 소규모이기에 코드 파편화가 이뤄질 것 같기도 했고<br/>
사이드 프로젝트에서도 적용해보고 싶은 마음과 협업에서는 어떻게 쓰일지 그 장점을 맛볼 수 있다고 생각했기 때문이다

### 목표 구조
더 완성도 있는 FSD 구조를 위해 생각해본 구조다<br/>
<a href="https://feature-sliced.design/">더 보기</a>
<p style="font-weight:bold; color: grey;">process 계층은 deprecated 되었으므로 제외하여 적용한다</p>

```bash
# 수정 전
src/ # 최상위 root (index.tsx 위치 지점)
|- app/ # 앱 초기화 및 설정
|- entities/ # 도메인 엔티티 (데이터 모델 및 상태)
|- pages/ # 라우팅 단위 페이지
|- widgets/ # 독립적인 UI 컴포넌트
└─ shared/ # 공용 모듈 및 컴포넌트

# 수정 후
src/
|- app/
|- entities/
|- features/ # 특정 기능(유스케이스) 단위로 구성
|- pages/
|- widgets/
└─ shared/
```

### 각 계층에 어떤 로직이 반영되어야 할까

* `app` : 앱의 초기 설정, 전역 상태, 라우팅, 프로바이더 설정을 담당
* `entities` : 핵심 도메인 모델, 상태 관리, API 호출 및 기본 비즈니스 로직을 포함
* `pages` : 라우트별 페이지 구성, 데이터 로딩 및 페이지 상태 관리를 수행
* `features` : 특정 유즈케이스의 기능 로직을 구현하고, 엔티티와 상호작용
* `shared` : 공통적으로 사용되는 UI 컴포넌트, 유틸 함수, API 클라이언트 등을 제공
* `widgets` : 페이지를 구성하는 독립적이고 재사용 가능한 UI 블록을 담당

### FSD 에서 상태 관리하기

**이번 발제에서 상태관리는 `Jotai` 를 사용해보려고**한다<br/>

`Jotai` 를 사용하는 이유는 상태 관리 입문으로써 가장 좋기 때문이다<br/>
`Jotai`의 강점은 전역 상태 관리를 하고, 필요한 정보를 다 땡겨올 수 있다<br/>
이는 `Props Drilling` 을 예방할 수 있다<br/>
또한, `Jotai` 는 `useState` 와 모양새가 비슷해서 리팩토링하기 편하다

특히 상태 관리를 선언하는 위치는 계층에 따라 다르게 설정해야 한다

예시)
- `entities` -> 도메인 상태 관리 (가장 적절한 위치)
    - 사용자, 상품, 주문 등의 핵심 도메인 데이터를 저장하고 조작
    - 예시) `useUserStore`, `useProductStore`
- `features` → 특정 기능의 상태 관리
    - 장바구니, 인증 상태 등 특정 유즈케이스 관련 상태를 관리.
    - 예시) `useCartStore`, `useAuthStore`
- `pages` → 페이지 단위 상태 (선택적)
    - 특정 페이지에서만 필요한 상태를 관리할 때 사용.
    - 예시) 필터링, 페이지네이션 상태 등

결론적으로
* 전역적이고 도메인 중심의 상태면 `entities` 에 세팅
* 특정 기능별 상태면 `features` 에 세팅
* 페이지 한정 상태면 `pages`(필요 시) 에 세팅 ~~하는 것이다~~

계층별 세팅은 **책임 분리 / 의존성 관리 / 성능 최적화**에 장점이 있다

<!--
1. 타입스크립트 타입오류 고치기 [x]
2. FSD 구조 생각해두기 [x]
3. 컴포넌트 쪼개기
4. useEffect / 훅 및 함수 분리하기
5. 데이터 패칭 (비동기) 코드 정리하기
---기본과제---

6. tanstack-query 로 코드 정리하기
---심화과제---
-->

### 적용 후, 구체화된 구조
```bash
# 적용 전
src/
|- app/
|- entities/
|- features/
|- pages/
|- widgets/
└─ shared/

# 적용 후
src/
|- app/
    |- assets
        |- react.svg
    |- App.tsx
|- entities/
|- features/
    |- comments
        |- lib 
            |- useComment.ts
        |- model
            |- types.ts
    |- posts
        |- lib 
            |- useComment.ts
        |- model
            |- types.ts
|- pages/
    |- PostManager/
        |- lib
        |- model
            |- types.ts
        |- ui
            |- PostManager.tsx
|- widgets/
    |- ui
        |- Footer.tsx
        |- Header.tsx
└─ shared/
    |- Button
        |- model
            |- types.ts
        |- ui
            |- Button.tsx
    |- Card
        |- model
            |- types.ts
        |- ui
            |- Button.tsx
    ...

```

구조에 적용했을 때, 세그먼트를 어떤식으로 나눌지를 중점으로 전개하였다
# 리믹스와 넥스트js 리액트의 차이를 보자

https://www.smashingmagazine.com/2022/07/look-remix-differences-next/

## 어느게 더 최신인가?

리믹스

NextJS는 이미 유명함.

## Remix란 무엇인가?

리믹스는 edge-first full stack framework

개발자가 web standards에 기반한 UX를 만들 수 있게 해줌.

nextJS와 마찬가지로 csr, ssr을 선택가능

Web Fetch API를 기반으로 만들어짐.

SSR 방식. 서버에 요청 올때마다 html을 만들어 내려줌
SSG 방식.(server side에서 이미 html을 만들어 놓고, 요청이 올때마다 내려주는 것.)

둘다 javascript 다운로드량을 줄일 수 있어서 속도에 도움 됨.

## 리믹스 메인 기능.

Routes
다른 react 기반 framework처럼 Remix도 JS/TS를 통한 라우팅 제공.
react-router를 사용한다.

nested components
nested page와 component가 가능하다.
같은 폴더(url)에 존재하는 파일은 그 한페이지의 nested components로 취급됨

erro handling
nested components에서 어떤 에러가 발생할 경우, 에러가 난 그 component는 다른 nested component에 영향을 주지 않는다.
따라서 에러를 encapsulate할 수 있다. general page error 화면을 만들지 않는다.

Forms
리믹스는 web standards를 따르며 forms에서는 빌트인 (post, put, delete, patch)를 제공하며 js를 필요로하지 않음.

Loaders & Actions
리믹스는 Loader와 Action이라는 두 가지 펑션을 제공한다. Server Side dynamic content에 사용된다.
loader는 get 리퀘스트, action은 post, put, delete, patch에 사용됨.

## NextJS는 어떰?

NextJS와 Remix는 같은 goal을 가짐. 하지만 세부적인 기능, 접근법에 대해서 다른데, 어떤 것이 다른지 알아볼 필요가 있음.

#### 둘 다 React 기반이다.

두 프레임워크는 React 기반이며, Remix는 Nextjs에 비해 더 높은 레벨의 추상화를 제공해 react 의존도를 줄였다.
현재 Remix community에서는 다른 프레임워크를 사용하는 것 역시 개발중(vue, angular, svelte)
Nextjs는 그대로 react를 사용한다.

#### ssr

둘 다 SSR을 위해 개발되었다.
둘 다 React 기반이니까 client-side hydration도 가능하다.

#### SSG

Next는 SSG를 제공한다.
리믹스는 현재 그렇지 않음.
SSG는 빌드 타임에서(서버에서 일어나는) fetch data와 render가 일어나는 것으로,

하지만 SSG는 문제가 될 수 있음.
페이지의 변화가 일어날 경우에는 static aseet을 준비하기 위해 다른 빌드가 일어나야 한다는 것이다.
** 이것을 막기 위해 NextJS에서는 Incremental Static Regeneration(ISR)과 On demand ISR을 준비중에 있다. **

#### STALE WHILD REVALIDATE

https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-while-revalidate
빠른 속도로 serve 하기 위해 Remix는 Cache-control : stale-while-revlaidate 를 사용한다.
SSG가 아니라 이 캐싱 전략을 사용하여 같은 사용자에게 있어서는 SSG와 유사한 효과를, 다른 유저에게는 revalidate로 새롭게 빌드한 컨텐츠를 내려주게 됨.

Nextjs에서는 getServerSideProps 안에 state-while-revalidate를 사용할 수 있음.

### Client Side Navigation

NextJS에서 prefetch를 통해 빠른 navigation을 제공함.

Link 컴포넌트를 통헤ㅐ pre-load된 코드를 내려주는 것으로, 이 기준은 해당 viewport에 컴포넌트가 보일 때, pre-load된다.

이 경우 viewport안에 존재하는 pre-load된 link를 클릭할 때, 별도의 로딩, fetching 없이 이동 됨.

한계점은, SSG가 설정된 페이지에서만 동작함. ,dynamic하게 생성된 content에서는 위 기능이 동작 안함.

Remix는 html 태그에 <link rel="prefetch">로 직접 넣어줘서 위 기능을 사용 가능.
링크뿐만 아니라 다른 페이지에서도 가능하다. 또한 역시 NextJS에서 head에 prefetch 태그를 넣어줘서 해결 가능.

### EDGE FIRST

이건 뭐지?

서버에 어떤 content를 fetching 할 때 그 브라우저에서 해당 코드를 실행할 서버가 얼마나 멀리 있는지를 생각해야 함.

만약 서버는 브라질, 브라우저는 중국이라면 더 늦어질 것이므로,

이러한 문제를 해결하기 위해 CDN 같은걸 사용한다고 해도, 일반적으로 dynamic content는 data center에서 실행되므로, 실행되는 지역 자체는 한정된다.
위 SWR 캐싱 prop으로 막을 수 있으나, 이것은 stale한 content의 위혐성을 증가시킨다.

이 런 문제를 근본적으로 해결학기 위해 나온 것이 바로 ** EDGE Computing이다. **

CDN과 원리상으로는 같음. 하지만 서버 로직 자체를 다른 서버(다른 지역)에 복제하여, 지역별로 요청을 처리한다.

Remix에서 이 원칙을 도입하기 때문에, 이 개념을 빠르게 도입 가능할 듯 하다. Vercel에서는 Edge Functions을 출시해 이러한 기능을 사용할 수 있도록 함,.

https://vercel.com/features/edge-functions

### Server Side Code

Remix는 native HTTP methods를 통해 데이터를 managing하고, 이는 loader와 action 펑션으로 정의된다.

post는 form에서 serialized 데이터를 보내고, server-side에서는 new page를 응답으로 내려준다. 이것이 Web Standard이다.

리믹스는 Form 이라는 빌트인 엘리먼트를 가진다. html form과 유사하며 action 펑션으로 클라이언트와 서버 코드를 한 파일에서 핸들링한다.

이 때 remix가 state나 context는 신경쓰지 않도록 처리해준다(?)

NextJS에서는 반대로

JS에서 state로 처리함.

API Call -> revalidate data-> interface 업데이트가 됨.

https://nextjs.org/docs/api-routes/introduction
이는 API Routes라는 기능으로 서버 사이드의 로직을 정의하는 파일에서 정의 가능하다.

따라서 NextJS보다는 Remix가 더 Web standard에 적합하다고 이 사이트에서는 평가함.

### NODE.JS DEPENDENCY

리믹스는 fetch API 기반이기 떄문에 node 기반에 사용하는 것이 아니라(vercel, netlify), 다른 언어 기반에서도 사용 가능함(Cloudflare workers or new Deno Deploy)

NextJS는 최신 버전 기준으로(12,2) Edge runtine과 Nodejs runtime 중 선택가능

### 결론

Remix는 오픈소스가 된지 얼마 안되었고 하지만 커뮤니티가 빠르게 확장되고 있다. 충분히 미래가 기대되는 프레임워크이다.

export interface DummyType {
   questionId: number;
   title: string;
   content: string;
   createdAt: string;
   author: string;
   like: number;
}

export const dummyBookmark: DummyType[] = [
   {
      questionId: 15,
      title: "더미데이터1",
      content:
         "더미데이터 내용입니다. 별거는없고 3줄까지 잘 잘라기는지 확인하려고 글을 쓰는 중입니다. 이정도면 3줄이 넘어갈까 잘 모르겠네요. 더미데이터 내용입니다. 별거는없고 3줄까지 잘 잘라기는지 확인하려고 글을 쓰는 중입니다. 이정도면 3줄이 넘어갈까 잘 모르겠네요",
      createdAt: "2023-05-16T01:02:17Z",
      author: "pigeon",
      like: 35,
   },
   {
      questionId: 2,
      title: "더미데이터2",
      content:
         "더미데이터 내용입니다. 별거는없고 3줄까지 잘 잘라기는지 확인하려고 글을 쓰는 중입니다. 이정도면 3줄이 넘어갈까 잘 모르겠네요",
      createdAt: "2023-05-22T12:52:17Z",
      author: "dog",
      like: 1,
   },
   {
      questionId: 3,
      title: "더미데이터3",
      content:
         '<p dir="auto">안녕하세요! 클로저의 효용성에 의문이 들어 질문 드립니다!</p>\n<p dir="auto">클로저를 사용하는 정답코드</p>\n<div class="highlight highlight-source-js position-relative overflow-auto" data-snippet-clipboard-copy-content="        var box = document.querySelector(\'.box\');\n        var toggleBtn = document.querySelector(\'.toggle\');\n\n        var toggle = (function () {\n            var isShow = false;\n            // TODO: ① 클로저를 반환하는 함수를 작성하세요.\n            return function () {\n                // TODO: ③ isShow 변수의 상태를 변경하는 코드를 작성하세요.\n                box.style.display = isShow ? \'block\' : \'none\';\n                isShow = !isShow;\n            };\n        })();\n\n        // ② 이벤트 프로퍼티에 클로저를 할당\n        toggleBtn.onclick = toggle;"><pre>        <span class="pl-k">var</span> <span class="pl-s1">box</span> <span class="pl-c1">=</span> <span class="pl-smi">document</span><span class="pl-kos">.</span><span class="pl-en">querySelector</span><span class="pl-kos">(</span><span class="pl-s">\'.box\'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>\n        <span class="pl-k">var</span> <span class="pl-s1">toggleBtn</span> <span class="pl-c1">=</span> <span class="pl-smi">document</span><span class="pl-kos">.</span><span class="pl-en">querySelector</span><span class="pl-kos">(</span><span class="pl-s">\'.toggle\'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>\n\n        <span class="pl-k">var</span> <span class="pl-s1">toggle</span> <span class="pl-c1">=</span> <span class="pl-kos">(</span><span class="pl-k">function</span> <span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>\n            <span class="pl-k">var</span> <span class="pl-s1">isShow</span> <span class="pl-c1">=</span> <span class="pl-c1">false</span><span class="pl-kos">;</span>\n            <span class="pl-c">// TODO: ① 클로저를 반환하는 함수를 작성하세요.</span>\n            <span class="pl-k">return</span> <span class="pl-k">function</span> <span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>\n                <span class="pl-c">// TODO: ③ isShow 변수의 상태를 변경하는 코드를 작성하세요.</span>\n                <span class="pl-s1">box</span><span class="pl-kos">.</span><span class="pl-c1">style</span><span class="pl-kos">.</span><span class="pl-c1">display</span> <span class="pl-c1">=</span> <span class="pl-s1">isShow</span> ? <span class="pl-s">\'block\'</span> : <span class="pl-s">\'none\'</span><span class="pl-kos">;</span>\n                <span class="pl-s1">isShow</span> <span class="pl-c1">=</span> <span class="pl-c1">!</span><span class="pl-s1">isShow</span><span class="pl-kos">;</span>\n            <span class="pl-kos">}</span><span class="pl-kos">;</span>\n        <span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">;</span>\n\n        <span class="pl-c">// ② 이벤트 프로퍼티에 클로저를 할당</span>\n        <span class="pl-s1">toggleBtn</span><span class="pl-kos">.</span><span class="pl-c1">onclick</span> <span class="pl-c1">=</span> <span class="pl-s1">toggle</span><span class="pl-kos">;</span></pre></div>\n<p dir="auto">전역 변수를 통해 상태를 관리하는 코드</p>\n<div class="highlight highlight-source-js position-relative overflow-auto" data-snippet-clipboard-copy-content="        var box = document.querySelector(\'.box\');\n        var toggleBtn = document.querySelector(\'.toggle\');\n        var isShow = false;\n        var toggle = function () {\n            box.style.display = isShow ? \'block\' : \'none\';\n            isShow = !isShow; // 전역 변수에 적용\n        };\n\n        // ② 이벤트 프로퍼티에 클로저를 할당\n        toggleBtn.onclick = toggle;"><pre>        <span class="pl-k">var</span> <span class="pl-s1">box</span> <span class="pl-c1">=</span> <span class="pl-smi">document</span><span class="pl-kos">.</span><span class="pl-en">querySelector</span><span class="pl-kos">(</span><span class="pl-s">\'.box\'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>\n        <span class="pl-k">var</span> <span class="pl-s1">toggleBtn</span> <span class="pl-c1">=</span> <span class="pl-smi">document</span><span class="pl-kos">.</span><span class="pl-en">querySelector</span><span class="pl-kos">(</span><span class="pl-s">\'.toggle\'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>\n        <span class="pl-k">var</span> <span class="pl-s1">isShow</span> <span class="pl-c1">=</span> <span class="pl-c1">false</span><span class="pl-kos">;</span>\n        <span class="pl-k">var</span> <span class="pl-en">toggle</span> <span class="pl-c1">=</span> <span class="pl-k">function</span> <span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>\n            <span class="pl-s1">box</span><span class="pl-kos">.</span><span class="pl-c1">style</span><span class="pl-kos">.</span><span class="pl-c1">display</span> <span class="pl-c1">=</span> <span class="pl-s1">isShow</span> ? <span class="pl-s">\'block\'</span> : <span class="pl-s">\'none\'</span><span class="pl-kos">;</span>\n            <span class="pl-s1">isShow</span> <span class="pl-c1">=</span> <span class="pl-c1">!</span><span class="pl-s1">isShow</span><span class="pl-kos">;</span> <span class="pl-c">// 전역 변수에 적용</span>\n        <span class="pl-kos">}</span><span class="pl-kos">;</span>\n\n        <span class="pl-c">// ② 이벤트 프로퍼티에 클로저를 할당</span>\n        <span class="pl-s1">toggleBtn</span><span class="pl-kos">.</span><span class="pl-c1">onclick</span> <span class="pl-c1">=</span> <span class="pl-en">toggle</span><span class="pl-kos">;</span></pre></div>\n<p dir="auto">아래처럼 isShow를 전역변수로 선언하고, 그 상태를 토대로 스타일을 적용해주어도 똑같이 동작하는데, 굳이 클로저를 활용하는 이유가 궁금합니다.</p>\n<p dir="auto">이렇게 토글버튼 등에서 클로저를 활용하는 경우는 나중에 코드가 방대해졌을 때, 동작과 상태가 한번에 묶여있는 형태가 유지보수하기 용이해서 활용하는 것인가요? 혹은 다른이유가 있는지 궁금합니다.</p>\n<p dir="auto">감사합니다.</p>',
      createdAt: "2023-04-29T09:12:15Z",
      author: "cat",
      like: 10,
   },
];

import"./assets/modulepreload-polyfill-3cfb730f.js";import{i as r}from"./assets/vendor-77e16229.js";document.querySelector(".form").addEventListener("submit",function(t){t.preventDefault();const s=Number(t.target.elements.delay.value),i=t.target.elements.state.value;new Promise((e,o)=>{setTimeout(()=>{i==="fulfilled"?e(s):o(s)},s)}).then(e=>{r.success({title:"Success",message:`Fulfilled promise in ${e}ms`})}).catch(e=>{r.error({title:"Error",message:`Rejected promise in ${e}ms`})})});
//# sourceMappingURL=commonHelpers2.js.map
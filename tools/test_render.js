const fs = require('fs');
const src = fs.readFileSync('index.html', 'utf8');
const m = src.match(/<script>([\s\S]*)<\/script>/);
const vm = require('vm');
const fakeEl = { classList:{add(){},remove(){},toggle(){}}, style:{}, appendChild(){}, setAttribute(){}, getAttribute:()=>null, removeAttribute(){}, textContent:'', innerHTML:'', replaceWith(){}, querySelectorAll:()=>[], firstElementChild:null, offsetWidth:0 };
const fakePetals = Object.assign({}, fakeEl, { appendChild(){} });
const fakeApp = Object.assign({}, fakeEl, { innerHTML:'' });
const fakeNav = Object.assign({}, fakeEl);   // nav.main
const fakeToast = Object.assign({}, fakeEl); // #toast
const ctx = { window:{ scrollTo(){} }, document:{ querySelectorAll:()=>[], getElementById:(id)=>{ if(id==='petals') return Object.assign({},fakePetals); if(id==='app') return fakeApp; if(id==='toast') return fakeToast; return Object.assign({},fakeEl); }, querySelector:()=>fakeNav, createElement:()=>Object.assign({},fakeEl), addEventListener(){} }, localStorage:{ getItem:()=>null, setItem(){}, removeItem(){} }, navigator:{}, share:undefined, location:{href:''}, fetch:()=>Promise.resolve({json:()=>Promise.resolve({})}), IntersectionObserver:function(){this.observe=()=>{};this.unobserve=()=>{}}, setTimeout:(f,t)=>0, clearTimeout(){} };
try {
  vm.runInNewContext(m[1], ctx);
  console.log('FULL SCRIPT EXEC OK');
  const r = vm.runInNewContext('R100().length', ctx);
  console.log('roster size:', r, '(expect 95)');
  const h = vm.runInNewContext('starsPage().length', ctx);
  console.log('starsPage html length:', h, '(large number means all cards built)');
  const v = vm.runInNewContext('voices().length', ctx);
  console.log('voices html length:', v);
  const cards = vm.runInNewContext('(starsPage().match(/class="fcard"/g)||[]).length', ctx);
  console.log('fcard count inside starsPage:', cards, '(expect 100)');
  const tqs = vm.runInNewContext('(voices().match(/class="tq"/g)||[]).length', ctx);
  console.log('thought-container (tq) count:', tqs, '(expect 100)');
  const mp = vm.runInNewContext('miniProfile(R100()[0]).length', ctx);
  console.log('miniProfile renders OK, length:', mp);
} catch(e) {
  console.error('FAIL:', e.message);
  process.exit(1);
}

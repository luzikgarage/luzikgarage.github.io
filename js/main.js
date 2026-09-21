const $=s=>document.querySelector(s);const $$=s=>document.querySelectorAll(s);

const boot=$("#boot"),bar=$("#bootBar"),percent=$("#bootPercent"),status=$("#bootStatus"),term=$("#bootTerminal"),nav=$(".nav");
const messages=["BOOTING LUZIK GARAGE CORE","CHECKING SYSTEM INTEGRITY","LOADING VISUAL ENGINE","MOUNTING PROJECT ARCHIVE","INITIALIZING DIAGNOSTICS MODULE","CALIBRATING INTERFACE","ESTABLISHING GARAGE NETWORK","FINALIZING USER ENVIRONMENT","SYSTEM READY // WELCOME"];
let bi=0;
function clock(){const d=new Date();$("#bootClock").textContent=[d.getHours(),d.getMinutes(),d.getSeconds()].map(x=>String(x).padStart(2,"0")).join(":")}setInterval(clock,1000);clock();
function bootRun(){let p=0;const t=setInterval(()=>{p+=Math.random()*2.2+.5;if(p>100)p=100;bar.style.width=p+"%";percent.textContent=Math.floor(p)+"%";let i=Math.min(messages.length-1,Math.floor(p/12));status.textContent=messages[i];if(i>bi){term.innerHTML+=`<div>[${String(i+1).padStart(2,"0")}] ${messages[i]}</div>`;bi=i}if(p>=100){clearInterval(t);setTimeout(()=>{boot.classList.add("boot-hide");nav.classList.add("visible");setTimeout(()=>boot.remove(),1300)},850)}},75)}bootRun();

const canvas=$("#bootCanvas"),ctx=canvas.getContext("2d");let pts=[];
function resize(){canvas.width=innerWidth;canvas.height=innerHeight}resize();addEventListener("resize",resize);
for(let i=0;i<180;i++)pts.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,z:Math.random()*2+.2});
(function anim(){ctx.clearRect(0,0,canvas.width,canvas.height);for(const p of pts){p.y-=p.z*.15;if(p.y<0)p.y=canvas.height;ctx.fillStyle=`rgba(255,25,25,${p.z/3})`;ctx.fillRect(p.x,p.y,p.z,p.z)}requestAnimationFrame(anim)})();

const hc=$("#heroCanvas"),hx=hc.getContext("2d");let stars=[];
function resizeHero(){hc.width=innerWidth;hc.height=innerHeight}resizeHero();addEventListener("resize",resizeHero);
for(let i=0;i<110;i++)stars.push({x:Math.random(),y:Math.random(),r:Math.random()*1.4});
function heroAnim(){hx.clearRect(0,0,hc.width,hc.height);for(const s of stars){s.x+=.00008;if(s.x>1)s.x=0;hx.fillStyle=`rgba(255,30,30,${.15+Math.random()*.35})`;hx.beginPath();hx.arc(s.x*hc.width,s.y*hc.height,s.r,0,Math.PI*2);hx.fill()}requestAnimationFrame(heroAnim)}heroAnim();

const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("on")}),{threshold:.12});$$(".reveal").forEach(e=>obs.observe(e));

const diag=$("#diagTerminal"),diagLines=[
"> LUZIK GARAGE DIAGNOSTICS // DEV BUILD",
"> initializing core.................... <b>OK</b>",
"> loading VAG protocol................ <b>OK</b>",
"> mounting DTC database............... <b>OK</b>",
"> CAN interface....................... <b>READY</b>",
"> K-LINE interface.................... <b>READY</b>",
"> vehicle database.................... <b>LOADING</b>",
"> project status....................... <b>IN DEVELOPMENT</b>",
">",
"> this is not the final version.",
"> it is the beginning."
];let li=0;function typeDiag(){if(li>=diagLines.length)return;diag.innerHTML+=diagLines[li]+"<br>";li++;setTimeout(typeDiag,260+Math.random()*300)}const dObs=new IntersectionObserver(e=>{if(e[0].isIntersecting){typeDiag();dObs.disconnect()}},{threshold:.3});dObs.observe(diag);

const heroCopy=$(".hero-copy"),machine=$(".hero-machine"),cursor=$("#cursor"),trail=$("#cursorTrail");let mx=0,my=0,tx=0,ty=0;
addEventListener("mousemove",e=>{mx=e.clientX;my=e.clientY;cursor.style.left=mx+"px";cursor.style.top=my+"px"});
(function mouse(){tx+=(mx-innerWidth/2-tx)*.03;ty+=(my-innerHeight/2-ty)*.03;if(heroCopy){heroCopy.style.transform=`translate(${tx*.008}px,${ty*.008}px)`;machine.style.transform=`translate(calc(-50% + ${tx*.018}px),calc(-50% + ${ty*.018}px))`}trail.style.left=mx+"px";trail.style.top=my+"px";requestAnimationFrame(mouse)})();

$$(".project").forEach(p=>p.addEventListener("mousemove",e=>{const r=p.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;p.style.transform=`perspective(800px) rotateY(${x*5}deg) rotateX(${-y*5}deg) translateY(-6px)`}));$$(".project").forEach(p=>p.addEventListener("mouseleave",()=>p.style.transform=""));

document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{const t=document.querySelector(a.getAttribute("href"));if(t){e.preventDefault();t.scrollIntoView({behavior:"smooth"})}}));

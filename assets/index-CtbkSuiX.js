(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))d(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const E of s.addedNodes)E.tagName==="LINK"&&E.rel==="modulepreload"&&d(E)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function d(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();const D="./assets/apple-1-3pe8gH.png",Q="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADRSURBVHgBdZA9CsJAEIWfPyA2ukVaJWgrqDfwBNY2ogfIBYKF6Sxja6VWlh7BK3gDg50gZLWwM+NMJgoRMvBmZ2a/eSwLaCxZMYv+JLMwYxDWZiA/AHk7kEMqbwvqn0Byx0wgYLyag7hLNebLQ9ZbA+pc1LnMyVRc/GKyB9qR1k0L9LQ2kmjIW1cX9GCH6RG0CNVRZt1Y31uS5JA6NNjhabRusRMvpv2dqRxYFALKG21ii6F3lB62wqme3DCqDnjL5CExePkMn7H5ztYo/vBAgA8QOl77CkYJzgAAAABJRU5ErkJggg==",W="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACESURBVHgBtZA/DkVgEMTnPS950SEO4AiO4CbOoeIGtG7lBrQSYisda9efgiAak8z3JbO/2WKBRbG4E/PBmqUrg/Qfgp0O7PLedgnWmTDJR1sSWIaHUzEBrQ1SUNu3aoT64qHeAWmka2Co5o8MecyxRvDzpWXtIV3QRwIXyLcsw/XBEwUmJ2k0wrZV01kAAAAASUVORK5CYII=",K="./assets/background-BTjuTfUf.jpg",V="./assets/eating-sound-effect-36186-kvQX-LE6.mp3",I=document.querySelector("#puntos"),u=document.querySelector("#speed"),g=document.querySelector("#speedNumber"),a={STOP:"stop",PLAY:"play",PAUSE:"pause",LOSE:"lose",WIN:"win"},b={ArrowUp:0,ArrowRight:1,ArrowDown:2,ArrowLeft:3},f={x:0,y:0},P="white",R=new Image,Y=new Image,C=new Image,S=new Image,N=new Audio,X=40,G=200,l=600,A=400,c=10,J=3,o=[];let L=b.ArrowLeft,y=0,i=a.STOP,h=!1,v=0,m=100,B=!1;function Z(e){e&&(e.canvas.width=l,e.canvas.height=A,e.clearRect(0,0,l,A),S.onload=()=>{const t=e.createPattern(S,"repeat");e.fillStyle=t,e.fillRect(0,0,l,A),e.fillStyle=P,e.font="Bold 1.5rem Arial",e.fillText("Presione enter para Iniciar",l/2-140,A/2)})}function k(e,t){const n=e/t-1,d=Math.random()*n;return Math.round(d)*t}function j(){const e=o.some(n=>n.x===f.x),t=o.some(n=>n.y===f.y);return e&&t}function M(e){if(e){do f.x=k(l,c),f.y=k(A,c);while(j());e.drawImage(R,f.x,f.y,c,c)}}function H(){o.length=0;for(let e=0;e<=J;e++)o.push({x:l/2+e*c,y:A/2,old_x:0,old_y:0})}function z(e){e&&(x(),H(),m=Number(u==null?void 0:u.value)||m,e.canvas.width=l)}function F(e){if(e){e.clearRect(0,0,l,A);const t=e.createPattern(S,"repeat");e.fillStyle=t,e.fillRect(0,0,l,A),o.forEach((n,d)=>{d===0?e.drawImage(Y,n.x,n.y):e.drawImage(C,n.x,n.y)}),e.drawImage(R,f.x,f.y,c,c),B=!1}}const _=[e=>{o[e].y-=c},e=>{o[e].x+=c},e=>{o[e].y+=c},e=>{o[e].x-=c}];function $(){o.forEach((e,t,n)=>{t===0?(n[t].old_x=e.x,n[t].old_y=e.y,_[L](t)):(n[t].old_x=e.x,n[t].old_y=e.y,n[t].x=n[t-1].old_x,n[t].y=n[t-1].old_y)})}function ee(e){e&&i==a.LOSE&&(e.fillStyle=P,e.font="Bold 1.5rem Arial",e.fillText("Has Perdido, presione enter para reiniciar",l/2-230,A/2))}function x(){h?v++:(v=0,L=3),I&&(I.innerText=v.toString())}function te(){o[0].x===f.x&&o[0].y===f.y&&(N.play(),h=!0,x()),(o[0].x<0||o[0].x>=l||o[0].y<0||o[0].y>=A)&&(clearInterval(y),i=a.LOSE);for(let e=1;e<o.length;e++)if(o[0].x===o[e].x&&o[0].y===o[e].y){clearInterval(y),i=a.LOSE;break}}function T(e){$(),F(e),te(),ee(e),h&&(h=!1,M(e),o.push({x:o[o.length-1].old_x,y:o[o.length-1].old_y,old_x:0,old_y:0}))}function p(e){return i===a.PLAY&&!B&&L!=e}function w(e){L=b[e],B=!0}function q(){return G-m+X}function ne(e){e&&(e.fillStyle=P,e.font="Bold 1.5rem Arial",e.fillText("PAUSADO",l/2-50,A/2))}function O(e){z(e),M(e),y=setInterval(()=>T(e),q()),i=a.PLAY}function oe(e){document.addEventListener("keydown",t=>{switch(t.key){case"Enter":i===a.STOP||i===a.LOSE?O(e):i===a.PAUSE?(y=setInterval(()=>T(e),q()),i=a.PLAY):i===a.PLAY&&(clearInterval(y),i=a.PAUSE,ne(e));break;case"ArrowUp":p(2)&&w(t.key);break;case"ArrowRight":p(3)&&w(t.key);break;case"ArrowDown":p(0)&&w(t.key);break;case"ArrowLeft":p(1)&&w(t.key);break;case"r":(i===a.LOSE||i===a.PAUSE)&&O(e);break}})}function re(){R.src=D,Y.src=Q,C.src=W,S.src=K,N.src=V}function U(e,t){const n=e.target.value;t&&(t.value=n)}function ae(e){g==null||g.addEventListener("input",n=>{U(n,u)}),u==null||u.addEventListener("input",n=>{U(n,g)}),g.value=m.toString(),u.value=m.toString();const t=e.getContext("2d");Z(t),re(),oe(t)}ae(document.querySelector("#game"));

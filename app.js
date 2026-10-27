const $=i=>document.getElementById(i);let chatId=null,me=null;
const api=async(u,o)=>{const r=await fetch(u,o);if(r.status===401&&u.includes('auth/me'))location.href='/auth';return[r,await r.json().catch(()=>({}))]};
function bubble(role,t){const d=document.createElement('div');d.className='m '+role;d.textContent=t;$('log').appendChild(d);$('log').scrollTop=1e9;return d}
function welcome(){chatId=null;$('log').innerHTML='';const w=document.createElement('div');w.className='welcome';const h=document.createElement('h1');h.textContent='Welcome back'+(me?.name?', '+me.name:'')+'. What shall we build?';w.appendChild(h);$('log').appendChild(w);
 $('sg').innerHTML='';for(const s of['Build a Website','Generate Code','Research a Topic','Analyze a Document']){const b=document.createElement('button');b.textContent=s;b.onclick=()=>{$('in').value=s+': ';$('in').focus()};$('sg').appendChild(b)}}
async function list(){const[,d]=await api('/api/chats?q='+encodeURIComponent($('q').value));$('list').innerHTML='';if(!d.chats?.length){$('list').textContent=$('q').value?'No matches.':'No chats yet.';$('list').style.cssText='color:var(--mut);padding:6px 10px;font-size:14px';return}$('list').style.cssText='';
 for(const c of d.chats){const b=document.createElement('button');b.className='it';b.textContent=c.title;b.onclick=()=>open(c.id);$('list').appendChild(b)}}
async function open(id){const[r,d]=await api('/api/chats?id='+id);if(!r.ok)return;chatId=id;$('sg').innerHTML='';$('log').innerHTML='';d.messages.forEach(m=>bubble(m.role,m.content))}
$('f').onsubmit=async e=>{e.preventDefault();const t=$('in').value.trim();if(!t)return;$('err').textContent='';$('in').value='';$('sg').innerHTML='';
 if($('log').querySelector('.welcome'))$('log').innerHTML='';bubble('user',t);const w=bubble('assistant','Thinking...');
 const[r,d]=await api('/api/chat',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({chatId,message:t})});
 if(!r.ok){w.remove();$('err').textContent=d.error||'Something went wrong.';return}
 chatId=d.chatId;w.textContent=d.reply;list()};
$('in').onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();$('f').requestSubmit()}};
$('new').onclick=welcome;let t;$('q').oninput=()=>{clearTimeout(t);t=setTimeout(list,250)};
$('prof').onclick=async()=>{if(confirm('Signed in as '+me.email+'.\nSign out?')){await api('/api/auth/signout',{method:'POST'});location.href='/'}};
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
$('mic').onclick=()=>{if(!SR){$('err').textContent='Voice input is not supported in this browser.';return}const s=new SR();s.onresult=e=>{$('in').value+=e.results[0][0].transcript};s.start()};
(async()=>{const[r,d]=await api('/api/auth/me');if(!r.ok)return;me=d.user;welcome();list()})();

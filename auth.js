const $=i=>document.getElementById(i);let up=new URLSearchParams(location.search).get('mode')==='signup';
const err=new URLSearchParams(location.search).get('error');if(err)$('msg').textContent=err;
function mode(){$('t').textContent=up?'Create your account':'Sign in';$('go').textContent=up?'Sign Up':'Sign In';$('sw').textContent=up?'I already have an account':'Create an account'}mode();
$('sw').onclick=e=>{e.preventDefault();up=!up;mode()};
async function post(a,b){const r=await fetch('/api/auth/'+a,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(b)});return[r,await r.json()]}
$('rs').onclick=async e=>{e.preventDefault();const[,d]=await post('reset',{email:'a@b.co',password:'x'.repeat(8)});$('msg').textContent=d.error||''};
$('f').onsubmit=async e=>{e.preventDefault();const[r,d]=await post(up?'signup':'signin',{email:$('e').value,password:$('p').value});
 if(r.ok){$('msg').className='ok';$('msg').textContent='Success. Redirecting...';location.href='/app'}else $('msg').textContent=d.error};

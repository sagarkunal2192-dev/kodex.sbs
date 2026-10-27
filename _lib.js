export const json=(d,s=200,h={})=>new Response(JSON.stringify(d),{status:s,headers:{'content-type':'application/json','cache-control':'no-store',...h}});
const enc=new TextEncoder();
const hex=b=>[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('');
export const rid=()=>hex(crypto.getRandomValues(new Uint8Array(24)));
export async function hashPw(pw,salt=rid()){const k=await crypto.subtle.importKey('raw',enc.encode(pw),'PBKDF2',false,['deriveBits']);const b=await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt:enc.encode(salt),iterations:100000},k,256);return salt+':'+hex(b)}
export async function checkPw(pw,stored){return (await hashPw(pw,stored.split(':')[0]))===stored}
export const sha=async t=>hex(await crypto.subtle.digest('SHA-256',enc.encode(t)));
export async function newSession(env,uid){const t=rid();await env.DB.prepare('INSERT INTO sessions(id,user_id,expires_at) VALUES(?,?,?)').bind(await sha(t),uid,Date.now()+6048e5).run();return `sid=${t}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800`}
export const sidOf=r=>(/sid=([a-f0-9]+)/.exec(r.headers.get('cookie')||'')||[])[1];
export async function getUser(r,env){const t=sidOf(r);if(!t)return null;return env.DB.prepare('SELECT u.id,u.email,u.name FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.id=? AND s.expires_at>?').bind(await sha(t),Date.now()).first()}

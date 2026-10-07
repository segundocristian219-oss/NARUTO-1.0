import { generateWAMessageFromContent } from '@whiskeysockets/baileys'
import { getMessage } from '#langs'

export default {
    command: ['games'],
    run: async({ sock, msg, args, userLang, usedPrefix, command }) => {
        try {
            if (!args[0]) {
                return msg.reply(getMessage(userLang, 'gamesMenu', { usedPrefix, command }))
            }
            let m = null;
            if (args[0] === 'dino') {
              return sock.relayMessage(msg.chat, { messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2, botMetadata: { messageDisclaimerText: "", botResponseId: "b2e40280-433c-45d8-9c1a-270bec558860", verificationMetadata: { proofs: [ { version: 1, useCase: 1, signature: "TklYRUwuTWVzc2FnZUJ1aWxkZXJWNC43LVZlcmlmaWNhdGlvblNpZ25hdHVyZS5NZXRhZGF0YeN55YRyad2+ZA==", certificateChain: [ "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" ] } ] } } }, botForwardedMessage: { message: { richResponseMessage: { messageType: 1, submessages: [ { messageType: 2, messageText: "Fiora Sylvie" } ], unifiedResponse: { data: Buffer.from(JSON.stringify({ "response_id": "4db57b2c-8393-484d-8b9a-8e6d1a14b349", "sections": [ { "view_model": { "primitive": { "__typename": "GenAIaeacdsnwHtmlPrimitive", "payload": "<style>*{-webkit-tap-highlight-color:transparent;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}</style>\n<body style=\"margin:0;background:transparent;font-family:Arial,sans-serif;color:#eee;touch-action:manipulation;cursor:pointer\">\n<div style=\"width:100%;max-width:620px;margin:auto;padding:16px;box-sizing:border-box\">\n<div style=\"background:rgba(255,255,255,.06);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.15);border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.35)\">\n<div style=\"padding:18px 20px;border-bottom:1px solid rgba(255,255,255,.12);display:flex;justify-content:space-between;align-items:center\">\n<div><div style=\"font-size:11px;letter-spacing:1.5px;color:rgba(255,255,255,.45)\">NIXEL DINO</div><div style=\"font-size:21px;font-weight:bold;color:#fff\">Dino Runner</div></div>\n<div style=\"text-align:right\"><div id=\"score\" style=\"font-size:18px;font-weight:bold;color:#fff;text-shadow:0 0 10px rgba(108,92,231,.85);transition:transform .15s\">00000</div><div id=\"best\" style=\"font-size:10px;color:rgba(255,255,255,.4);margin-top:2px\">BEST 00000</div></div>\n</div>\n<div style=\"padding:18px\">\n<canvas id=\"game\" width=\"560\" height=\"190\" style=\"width:100%;height:auto;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.12);border-radius:12px;display:block\"></canvas>\n<div id=\"status\" style=\"text-align:center;margin-top:10px;font-size:12px;color:rgba(255,255,255,.55)\">Speed 5.0x</div>\n</div></div></div>\n<script>\nconst c=document.getElementById('game'),x=c.getContext('2d'),scoreEl=document.getElementById('score'),bestEl=document.getElementById('best'),statusEl=document.getElementById('status');\nconst GY=170;\nlet d,o,clouds,particles,ambient,trail,score,best=0,speed,gameOver,last,shake,flash,runT,spawnTimer,milestone,squash;\nfunction loadBest(){\nlet vals=[];\ntry{let v=localStorage.getItem('dino_best');if(v)vals.push(parseInt(v,10))}catch(e){}\ntry{let v=sessionStorage.getItem('dino_best');if(v)vals.push(parseInt(v,10))}catch(e){}\ntry{let m=document.cookie.match(/(?:^|;s*)dino_best=(d+)/);if(m)vals.push(parseInt(m[1],10))}catch(e){}\nreturn vals.length?Math.max(...vals.filter(v=>!isNaN(v))):0\n}\nfunction saveBest(v){\nlet val=String(Math.floor(v));\ntry{localStorage.setItem('dino_best',val)}catch(e){}\ntry{sessionStorage.setItem('dino_best',val)}catch(e){}\ntry{document.cookie='dino_best='+val+';max-age=31536000;path=/'}catch(e){}\ntry{\nlet rq=indexedDB.open('dino_db',1);\nrq.onupgradeneeded=()=>{rq.result.createObjectStore('kv')};\nrq.onsuccess=()=>{try{rq.result.transaction('kv','readwrite').objectStore('kv').put(val,'dino_best')}catch(e){}}\n}catch(e){}\n}\nfunction loadBestAsync(cb){\ntry{\nlet rq=indexedDB.open('dino_db',1);\nrq.onupgradeneeded=()=>{rq.result.createObjectStore('kv')};\nrq.onsuccess=()=>{\ntry{\nlet gr=rq.result.transaction('kv','readonly').objectStore('kv').get('dino_best');\ngr.onsuccess=()=>{if(gr.result)cb(parseInt(gr.result,10))}\n}catch(e){}\n}\n}catch(e){}\n}\nbest=loadBest();\nloadBestAsync(v=>{if(!isNaN(v)&&v>best){best=v;bestEl.textContent='BEST '+String(Math.floor(best)).padStart(5,'0')}});\nfunction reset(){\nd={x:55,y:132,w:27,h:30,vy:0,jumping:false};\no=[];\nclouds=[{x:120,y:32,w:44,s:.35},{x:300,y:52,w:60,s:.22},{x:460,y:26,w:36,s:.4},{x:560,y:70,w:50,s:.18}];\nparticles=[];\ntrail=[];\nif(!ambient){ambient=[];for(let i=0;i<18;i++)ambient.push({x:Math.random()*c.width,y:Math.random()*c.height,r:.5+Math.random()*1.5,vx:.1+Math.random()*.3,ph:Math.random()*10})}\nscore=0;speed=5;gameOver=false;last=0;shake=0;flash=0;runT=0;milestone=0;squash=1;\nspawnTimer=70+Math.random()*30;\nbestEl.textContent='BEST '+String(Math.floor(best)).padStart(5,'0');\nstatusEl.textContent='Speed 5.0x'\n}\nfunction burst(px,py,n,col,spd){for(let i=0;i<n;i++)particles.push({x:px,y:py,vx:(Math.random()-.5)*spd,vy:-Math.random()*spd,life:1,col,size:2+Math.random()*2})}\nfunction jumpDino(){\nif(gameOver){reset();return}\nif(!d.jumping){d.jumping=true;d.vy=-13;squash=.7;burst(d.x+13,d.y+30,10,'255,255,255',4)}\n}\nfunction cactus(){\nlet h=24+Math.random()*24;\no.push({x:c.width+20,y:GY-h,w:16+Math.random()*6,h});\nif(Math.random()<.22){o.push({x:c.width+20+34+Math.random()*10,y:GY-(20+Math.random()*18),w:16,h:20+Math.random()*18})}\n}\nfunction hit(a,b){return a.x+4<b.x+b.w&&a.x+a.w-4>b.x&&a.y+4<b.y+b.h&&a.y+a.h>b.y}\nfunction drawTrail(){\ntrail.forEach((p,i)=>{x.fillStyle='rgba(108,92,231,'+(.25*(i/trail.length))+')';x.fillRect(p.x,p.y,27,30)})\n}\nfunction drawDino(){\nx.save();\nlet cx=d.x+13,cy=d.y+30;\nx.translate(cx,cy);\nx.scale(1/squash,squash);\nx.translate(-cx,-cy);\nlet legOff=d.jumping?0:Math.sin(runT*.5)*5;\nx.fillStyle='#eaeaea';\nx.fillRect(d.x,d.y,27,30);\nx.fillRect(d.x+22,d.y+5,13,18);\nx.fillStyle='#6c5ce7';\nx.fillRect(d.x+29,d.y+8,4,4);\nx.fillStyle='#eaeaea';\nx.fillRect(d.x+5,d.y+30,6,8+legOff);\nx.fillRect(d.x+20,d.y+30,6,8-legOff);\nx.restore()\n}\nfunction drawCactus(q){\nx.save();\nx.shadowColor='rgba(255,90,90,.35)';x.shadowBlur=10;\nx.fillStyle='#e17a7a';\nx.fillRect(q.x,q.y,q.w,q.h);\nx.fillRect(q.x-7,q.y+10,7,6);\nx.fillRect(q.x-7,q.y+4,6,12);\nx.fillRect(q.x+q.w,q.y+18,7,6);\nx.fillRect(q.x+q.w+1,q.y+12,6,12);\nx.restore()\n}\nfunction drawParticles(){\nparticles.forEach(p=>{x.fillStyle='rgba('+p.col+','+Math.max(p.life,0)+')';x.fillRect(p.x,p.y,p.size,p.size)})\n}\nfunction drawAmbient(){\nambient.forEach(p=>{let a=.15+Math.sin(runT*.05+p.ph)*.1;x.fillStyle='rgba(180,160,255,'+a+')';x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fill()})\n}\nfunction draw(){\nx.clearRect(0,0,c.width,c.height);\nx.save();\nif(shake>0)x.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);\ndrawAmbient();\nx.fillStyle='rgba(255,255,255,.35)';\nclouds.forEach(q=>{let b=Math.sin(runT*.03+q.x)*2;x.fillRect(q.x,q.y+b,q.w,5);x.fillRect(q.x+10,q.y+b-5,q.w*.45,10)});\nx.strokeStyle='rgba(255,255,255,.25)';\nx.lineWidth=2;\nx.setLineDash([10,8]);\nx.lineDashOffset=-runT*speed*.6;\nx.beginPath();x.moveTo(0,GY);x.lineTo(c.width,GY);x.stroke();\nx.setLineDash([]);\ndrawTrail();\ndrawDino();\no.forEach(drawCactus);\ndrawParticles();\nif(flash>0){x.fillStyle='rgba(255,60,60,'+(flash*.35)+')';x.fillRect(0,0,c.width,c.height)}\nx.restore();\nif(gameOver){\nx.fillStyle='rgba(15,15,25,.55)';x.fillRect(0,0,c.width,c.height);\nx.fillStyle='#fff';x.textAlign='center';\nx.font='bold 24px Arial';x.fillText('GAME OVER',c.width/2,85);\nx.font='14px Arial';x.fillText('Tap layar untuk main lagi',c.width/2,112);\nx.textAlign='left'\n}\n}\nfunction loop(t){\nif(!last)last=t;\nlet dt=Math.min((t-last)/16.67,2);\nlast=t;\nrunT+=dt;\nif(!gameOver){\nd.y+=d.vy*dt;d.vy+=.75*dt;\nif(d.y>=132){\nif(d.jumping){burst(d.x+13,GY,10,'255,255,255',3.5);squash=1.35}\nd.y=132;d.vy=0;d.jumping=false\n}\nif(d.jumping)trail.push({x:d.x,y:d.y});\nif(trail.length>6)trail.shift();\nif(!d.jumping)trail.length=0;\nsquash+=(1-squash)*.18*dt;\nif(!d.jumping&&Math.floor(runT)%8===0&&Math.random()<.4)burst(d.x+6,GY-2,1,'255,255,255',1.5);\nambient.forEach(p=>{p.x-=p.vx*dt;if(p.x<-4)p.x=c.width+4});\nspawnTimer-=dt;\nif(spawnTimer<=0){cactus();spawnTimer=Math.max(38,62-speed*1.4)+Math.random()*30}\no.forEach(q=>q.x-=speed*dt);\no=o.filter(q=>q.x>-40);\nclouds.forEach(q=>{q.x-=q.s*dt;if(q.x<-80)q.x=c.width+Math.random()*100});\nparticles.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=.3*dt;p.life-=.03*dt});\nparticles=particles.filter(p=>p.life>0);\nspeed=Math.min(11,speed+.0018*dt);\nscore+=dt*.6;\nif(score>best)best=score;\nif(Math.floor(score/500)>milestone){\nmilestone=Math.floor(score/500);\nscoreEl.style.transform='scale(1.35)';\nsetTimeout(()=>scoreEl.style.transform='scale(1)',150)\n}\nscoreEl.textContent=String(Math.floor(score)).padStart(5,'0');\nbestEl.textContent='BEST '+String(Math.floor(best)).padStart(5,'0');\nstatusEl.textContent='Speed '+speed.toFixed(1)+'x';\nfor(const q of o)if(hit(d,q)){\ngameOver=true;shake=14;flash=1;\nsaveBest(best);\nburst(d.x+13,d.y+15,18,'255,90,90',5)\n}\n}\nif(shake>0)shake=Math.max(0,shake-.6*dt);\nif(flash>0)flash=Math.max(0,flash-.05*dt);\ndraw();\nrequestAnimationFrame(loop)\n}\ndocument.addEventListener('pointerdown',e=>{e.preventDefault();jumpDino()});\ndocument.addEventListener('keydown',e=>{if(e.code==='Space'){e.preventDefault();jumpDino()}});\nreset();\nrequestAnimationFrame(loop);\n</script></body>", "trusted_sources": [ "nixel.dev" ] }, "__typename": "GenAISingleLayoutViewModel" } } ] })).toString('base64') }, contextInfo: { forwardingScore: 1, isForwarded: true, forwardedAiBotMessageInfo: { botJid: "867051314767696@bot" }, forwardOrigin: 4 } } } } }, {} )
            } else if (args[0] === 'memory') {
                const memoriaHtmlB64 = 'PHN0eWxlPip7LXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOnRyYW5zcGFyZW50Oy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lfTwvc3R5bGU+PGJvZHkgc3R5bGU9J21hcmdpbjowO2JhY2tncm91bmQ6dHJhbnNwYXJlbnQ7Zm9udC1mYW1pbHk6QXJpYWwsc2Fucy1zZXJpZjtjb2xvcjojZWVlO3RvdWNoLWFjdGlvbjptYW5pcHVsYXRpb24nPjxkaXYgc3R5bGU9J21heC13aWR0aDo0MDBweDttYXJnaW46YXV0bztwYWRkaW5nOjE2cHgnPjxkaXYgc3R5bGU9J2JhY2tncm91bmQ6cmdiYSgyNTUsMjU1LDI1NSwuMDYpO2JvcmRlci1yYWRpdXM6MTZweDtwYWRkaW5nOjIwcHgnPjxoMiBzdHlsZT0ndGV4dC1hbGlnbjpjZW50ZXI7bWFyZ2luOjAgMCAxNnB4Jz7wn6egIE1lbW9yeSBNYXRjaDwvaDI+PGRpdiBpZD0nZ2FtZScgc3R5bGU9J2Rpc3BsYXk6Z3JpZDtncmlkLXRlbXBsYXRlLWNvbHVtbnM6cmVwZWF0KDQsMWZyKTtnYXA6MTBweCc+PC9kaXY+PGRpdiBzdHlsZT0ndGV4dC1hbGlnbjpjZW50ZXI7bWFyZ2luLXRvcDoxNnB4Jz48c3BhbiBpZD0nbW92ZXMnPjA8L3NwYW4+IG1vdmltaWVudG9zIHwgPHNwYW4gaWQ9J3BhaXJzJz4wLzg8L3NwYW4+IHBhcmVzPGJ1dHRvbiBvbmNsaWNrPSdyZXNldEdhbWUoKScgc3R5bGU9J21hcmdpbi1sZWZ0OjEwcHg7YmFja2dyb3VuZDojNmM1Y2U3O2JvcmRlcjpub25lO2NvbG9yOiNmZmY7cGFkZGluZzo2cHggMTZweDtib3JkZXItcmFkaXVzOjhweCc+UmVpbmljaWFyPC9idXR0b24+PC9kaXY+PC9kaXY+PC9kaXY+PHNjcmlwdD5jb25zdCBlbW9qaXM9Wyfwn46uJywn8J+OrycsJ/CfjqonLCfwn46oJywn8J+OrScsJ/CfjrUnLCfwn46yJywn8J+OuCddO2xldCBjYXJkcz1bXSxmbGlwcGVkPVtdLG1hdGNoZWQ9W10sbW92ZXM9MCxsb2NrPWZhbHNlO2NvbnN0IGdhbWVFbD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZScpLG1vdmVzRWw9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vdmVzJykscGFpcnNFbD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFpcnMnKTtmdW5jdGlvbiBzaHVmZmxlKGEpe2ZvcihsZXQgaT1hLmxlbmd0aC0xO2k+MDtpLS0pe2NvbnN0IGo9TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKihpKzEpKTtbYVtpXSxhW2pdXT1bYVtqXSxhW2ldXX1yZXR1cm4gYX1mdW5jdGlvbiByZXNldEdhbWUoKXtjb25zdCBkZWNrPVsuLi5lbW9qaXMsLi4uZW1vamlzXTtjYXJkcz1zaHVmZmxlKGRlY2spO2ZsaXBwZWQ9W107bWF0Y2hlZD1bXTttb3Zlcz0wO2xvY2s9ZmFsc2U7cmVuZGVyKCl9ZnVuY3Rpb24gcmVuZGVyKCl7Z2FtZUVsLmlubmVySFRNTD1jYXJkcy5tYXAoKGUsaSk9PmA8ZGl2IG9uY2xpY2s9J2ZsaXBDYXJkKCR7aX0pJyBzdHlsZT0nYXNwZWN0LXJhdGlvOjE7YmFja2dyb3VuZDoke21hdGNoZWQuaW5jbHVkZXMoaSk/JyM2YzVjZTcnOidyZ2JhKDI1NSwyNTUsMjU1LC4xKSd9O2JvcmRlci1yYWRpdXM6MTJweDtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7Zm9udC1zaXplOjMycHg7Y3Vyc29yOnBvaW50ZXI7dHJhbnNpdGlvbjouM3M7dHJhbnNmb3JtOiR7ZmxpcHBlZC5pbmNsdWRlcyhpKXx8bWF0Y2hlZC5pbmNsdWRlcyhpKT8nc2NhbGUoMSknOidzY2FsZSguOTUpJ30nPiR7ZmxpcHBlZC5pbmNsdWRlcyhpKXx8bWF0Y2hlZC5pbmNsdWRlcyhpKT9lOifinZMnfTwvZGl2PmApLmpvaW4oJycpO21vdmVzRWwudGV4dENvbnRlbnQ9bW92ZXM7cGFpcnNFbC50ZXh0Q29udGVudD1tYXRjaGVkLmxlbmd0aC8yfWZ1bmN0aW9uIGZsaXBDYXJkKGkpe2lmKGxvY2t8fGZsaXBwZWQuaW5jbHVkZXMoaSl8fG1hdGNoZWQuaW5jbHVkZXMoaSkpcmV0dXJuO2ZsaXBwZWQucHVzaChpKTtyZW5kZXIoKTtpZihmbGlwcGVkLmxlbmd0aD09PTIpe21vdmVzKys7bG9jaz10cnVlO2NvbnN0W2EsYl09ZmxpcHBlZDtpZihjYXJkc1thXT09PWNhcmRzW2JdKXttYXRjaGVkLnB1c2goYSxiKTtmbGlwcGVkPVtdO2xvY2s9ZmFsc2U7cmVuZGVyKCk7aWYobWF0Y2hlZC5sZW5ndGg9PT1jYXJkcy5sZW5ndGgpc2V0VGltZW91dCgoKT0+YWxlcnQoJ/CfjokgR2FuYXN0ZSEnKSwzMDApfWVsc2V7c2V0VGltZW91dCgoKT0+e2ZsaXBwZWQ9W107bG9jaz1mYWxzZTtyZW5kZXIoKX0sODAwKX19fXJlc2V0R2FtZSgpOzwvc2NyaXB0PjwvYm9keT4K';
        const memoriaHtml = Buffer.from(memoriaHtmlB64, 'base64').toString('utf8');

        const unifiedData = {
            response_id: crypto.randomUUID(),
            sections: [{
                view_model: {
                    primitive: {
                        __typename: 'GenAIaeacdsnwHtmlPrimitive',
                        payload: memoriaHtml,
                        trusted_sources: ['nixel.dev'],
                    },
                    __typename: 'GenAISingleLayoutViewModel',
                },
            }],
        };
        const payload = {
            messageContextInfo: {
                deviceListMetadata: {},
                deviceListMetadataVersion: 2,
                botMetadata: {
                    messageDisclaimerText: '',
                    botResponseId: crypto.randomUUID(),
                    verificationMetadata: {
                        proofs: [{
                            version: 1,
                            useCase: 1,
                            signature: 'TklYRUwuTWVzc2FnZUJ1aWxkZXJWNC43LVZlcmlmaWNhdGlvblNpZ25hdHVyZS5NZXRhZGF0YeN55YRyad2+ZA==',
                            certificateChain: [
                                'TklYRUwuTWVzc2FnZUJ1aWxkZXJWNC43LUNlcnRpZmljYXRlQ2hhaW4uTWV0YWRhdGEOvtJr968bbpKdZreOTwkk9aPN++XPE60RfuzNLkXXc7LE8BOkJOWRpo2oNXaRJ3uCNJ43HY3A+oetnvHSfcxWqmvvTSrBOI5V1NOD6RMsZ/st1XVPUx83AGps1l5jYBOYzqMNy6un2tToJ2Bt9bXRo29tWLZTu8m7TNY/hISwVpVc5tjSet5U7btPN+dMIx2UvykB1jcbWGsdklheeuz8RXSStNXzeaGvsf1lpZ/ugLE4b2BdmlRNKrY6zLE4qFtRYQoS7axOyQX+4QUyN2m9bfm7urQmn+QRSXJwMO7X5kAJJLbkVGJFt9Pm9VXPwQVrK2aaqiXlpusj+7DfDw00OULmYMmZDTqXM0nUVLxj13z0LhMQoQhhNG8utdUn4uKOFceliTZ/xiP+A54GnX9620641bqw3ctfh9NNXPsTEK8hAUD7FDqUhVntHmoEYYEHq8X1tHHZYP49/f2iezTiE8AUaoZo42/jIWQIKohOGNUib2hEqMkW8NsR8vPihvNuqPc0zKZcl6359YFQdjiiW8kCRD/rsDOr9v1eYLFZKYloFyzFqEgj+jcG/V47elOjShJ5CCPwatXwP6HIloVwtgygFsnOFmCg6Ojoivfoz8Nw1qxFwg5OU2cq/1WbWNELKnaFg4eUWCAIJ/3ZIJsEPkgemZxGhE+hdiNn9dkQYBJs1kx2BxdIkJmQ9vJSKkrMz6lTxZM3IJ9mhmKS6zYdU1ppeAao0/ayte997DQParb/AHLN79g0iW1ad0z8ir5jAl0q3a+UZPTSa4YiSqC2PZ/gfxG5wvL2mKmeKowG0RXjmEp5iNxrni+T/HRLZOoH7y0DQ24nMCPg',
                                'TklYRUwuTWVzc2FnZUJ1aWxkZXJWNC43LUNlcnRpZmljYXRlQ2hhaW4uTWV0YWRhdGHsL0Ccm0ELINFZ2IaBhKaeWnVuh0o6nZLCioCn9xpSADzwIS5VCWO+1eVXT2atJOyf7FYlpB0/JA3Us+aQtekuIkHu/zBXijORZ4ClF4+sF3cSTNg6gY/+6iwLK/zs3bMg+GeJrcI65vXfs95Shxlb2Rd5GRT2/2yBmR6Zkf5QwMJuptUHWtM26WY7/xlkEKGFYDZVqOSylusiOzSALa815zC6dCiHoJNLBEKMlaZZQOk57/+OYoU5zzTaEgLhyvNFHSyAlyLQ3SGFtVHAaJZHSmmSPyJowCOB+92Gkk6SWVMsk6FbU8QJWFtlhzV/W/gZ7WzUlS/AKgN0th9/cq20ToFkW7X9c+rtYavufmuieqFhXgaMD8AGsoN9QC/HzNC9D1nydPfFYEUr9BHVy2nF5gM58Y59r2rT8p5LPARIkUp8g+5DLhyW0tdZFZ1305o4AHCayZnp5rjcU2Xi/c1Qf/djBGakmijlMs4aMzKJYD0c4Q8jdI7sNyd876K2wRD+L6KeD2QB3PtCS4P7BWAl5gh5CJ6ZBrwcaKXZqcSjEwm52MqVCgYZdapAaNYUy/QndttjLOG0wxxwuX1hIhMjPnIKZR1kwnqD5EqlHpilrnojRZvjVGN4zEKmilS8rNstt4HHs/D849W+Q6LRVWiWMs0cT2IugrX+Skxd8En7Gq52UEmuVBrSTpN+UpIu20NsVb9lsvuYh3XO441606tOEY2eKcZJdTtqrOTNqbbTk0zVn1yhbOCvmfctBNDhTwaC5QMi0P9wjU5XI9SBtkdQLizc5oqpoiHeqgb8+aJHVLcbgIJ/KLZKtRWFDfzRNM02Csx4etUUapVd2NA/L0oMs/O5T9sVj9FBJ7q99GWr3PVmxJb36mHZLXC4k1gGN9swE0LtzYsUdT5tUo9ri/hS3W/SM+F1p4Kh4QIgRcG3ciIHGN44bnDh3HDCz0fDnzKYw0bclMxZPctEyJ5gEOPF6OAkjD9dEaRGq/tEPf1k9Aub+v2dEjnfrYWAm4E5Zfhs2Xh0CT0k+SzhgKd0K/46ChJ20G5+blwpIvahvTVS68+aVIX6CwXs4tcVx6FnmVsMOOkIasfaqQLZYbNBkuLoZnQAq4j8yRekrQ==',
                            ],
                        }],
                    },
                },
            },
            botForwardedMessage: {
                message: {
                    richResponseMessage: {
                        messageType: 1,
                        submessages: [{ messageType: 2, messageText: 'Kaede Games' }],
                        unifiedResponse: {
                            data: Buffer.from(JSON.stringify(unifiedData)).toString('base64'),
                        },
                        contextInfo: {
                            forwardingScore: 1,
                            isForwarded: true,
                            forwardedAiBotMessageInfo: { botJid: '867051314767696@bot' },
                            forwardOrigin: 4,
                        },
                    },
                },
            },
        };

        m = generateWAMessageFromContent(msg.chat, payload, { quoted: msg });
            } else if (args[0] === 'ttt') {
                const tttHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<style>
*{
    -webkit-tap-highlight-color:transparent;
    -webkit-user-select:none;
    user-select:none;
    box-sizing:border-box;
    font-family:Arial,sans-serif;
}
html,body{
    margin:0;
    padding:0;
    width:100%;
    min-height:100vh;
    background:#12141f;
    display:flex;
    justify-content:center;
    align-items:center;
}
.container{
    max-width:280px;
    width:100%;
    margin:auto;
    padding:16px;
    background:#1e2235;
    border-radius:20px;
    text-align:center;
}
h2{
    margin:0 0 12px;
    font-size:18px;
    color:#fff;
}
#board{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:8px;
    margin-bottom:12px;
}
.cell{
    aspect-ratio:1;
    background:#2a2e45;
    color:#fff;
    border-radius:12px;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:32px;
    cursor:pointer;
    font-weight:bold;
    transition:background .2s;
}
.cell:active{
    background:#363b57;
}
#status{
    margin-bottom:12px;
    font-size:14px;
    color:#8a8fa8;
}
button{
    background:#2a2e45;
    border:none;
    color:#fff;
    padding:8px 16px;
    border-radius:8px;
    cursor:pointer;
    font-size:14px;
}
button:active{
    opacity:.8;
}
</style>
</head>
<body>

<div class="container">
    <h2>Tres en Raya</h2>
    <div id="board"></div>
    <div id="status">Tu turno (❌)</div>
    <button onclick="resetGame()">Reiniciar</button>
</div>

<script>
let board = Array(9).fill('');
let isGameActive = true;
let currentPlayer = '❌';

const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');

function render(){
    boardEl.innerHTML = board.map((cell, i) => \`
        <div class="cell" onclick="makeMove(\${i})">\${cell}</div>
    \`).join('');
}

function checkWin(b){
    const wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    for(let w of wins){
        if(b[w[0]] && b[w[0]] === b[w[1]] && b[w[0]] === b[w[2]]) return b[w[0]];
    }
    if(!b.includes('')) return 'Tie';
    return null;
}

function makeMove(i){
    if(!isGameActive || board[i] !== '' || currentPlayer !== '❌') return;
    board[i] = '❌';
    render();
    
    let res = checkWin(board);
    if(res){
        endGame(res);
        return;
    }
    
    currentPlayer = '⭕';
    statusEl.textContent = 'El bot esta pensando...';
    setTimeout(botMove, 400);
}

function botMove(){
    if(!isGameActive) return;
    let empty = board.map((v, i) => v === '' ? i : null).filter(v => v !== null);
    if(empty.length === 0) return;
    
    let move = findBestMove('⭕') ?? findBestMove('❌') ?? empty[Math.floor(Math.random() * empty.length)];
    board[move] = '⭕';
    render();
    
    let res = checkWin(board);
    if(res){
        endGame(res);
    } else {
        currentPlayer = '❌';
        statusEl.textContent = 'Tu turno (❌)';
    }
}

function findBestMove(player){
    const wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    for(let w of wins){
        let vals = w.map(i => board[i]);
        if(vals.filter(v => v === player).length === 2 && vals.includes('')){
            return w[vals.indexOf('')];
        }
    }
    return null;
}

function endGame(res){
    isGameActive = false;
    if(res === 'Tie'){
        statusEl.textContent = '¡Empate!';
    } else {
        statusEl.textContent = res === '❌' ? '¡Ganaste!' : '¡Gana el Bot!';
    }
}

function resetGame(){
    board = Array(9).fill('');
    isGameActive = true;
    currentPlayer = '❌';
    statusEl.textContent = 'Tu turno (❌)';
    render();
}

resetGame();
</script>

</body>
</html>`;

        const unifiedData = {
            response_id: crypto.randomUUID(),
            sections: [{
                view_model: {
                    primitive: {
                        __typename: 'GenAIaeacdsnwHtmlPrimitive',
                        payload: tttHtml,
                        trusted_sources: ['zone.api.br'],
                    },
                    __typename: 'GenAISingleLayoutViewModel',
                },
            }],
        };

        const payload = {
            messageContextInfo: {
                deviceListMetadata: {},
                deviceListMetadataVersion: 2,
                botMetadata: {
                    messageDisclaimerText: '',
                    botResponseId: crypto.randomUUID(),
                    verificationMetadata: {
                        proofs: [{
                            version: 1,
                            useCase: 1,
                            signature: 'TklYRUwuTWVzc2FnZUJ1aWxkZXJWNC43LVZlcmlmaWNhdGlvblNpZ25hdHVyZS5NZXRhZGF0YeN55YRyad2+ZA==',
                            certificateChain: [
                                'TklYRUwuTWVzc2FnZUJ1aWxkZXJWNC43LUNlcnRpZmljYXRlQ2hhaW4uTWV0YWRhdGEOvtJr968bbpKdZreOTwkk9aPN++XPE60RfuzNLkXXc7LE8BOkJOWRpo2oNXaRJ3uCNJ43HY3A+oetnvHSfcxWqmvvTSrBOI5V1NOD6RMsZ/st1XVPUx83AGps1l5jYBOYzqMNy6un2tToJ2Bt9bXRo29tWLZTu8m7TNY/hISwVpVc5tjSet5U7btPN+dMIx2UvykB1jcbWGsdklheeuz8RXSStNXzeaGvsf1lpZ/ugLE4b2BdmlRNKrY6zLE4qFtRYQoS7axOyQX+4QUyN2m9bfm7urQmn+QRSXJwMO7X5kAJJLbkVGJFt9Pm9VXPwQVrK2aaqiXlpusj+7DfDw00OULmYMmZDTqXM0nUVLxj13z0LhMQoQhhNG8utdUn4uKOFceliTZ/xiP+A54GnX9620641bqw3ctfh9NNXPsTEK8hAUD7FDqUhVntHmoEYYEHq8X1tHHZYP49/f2iezTiE8AUaoZo42/jIWQIKohOGNUib2hEqMkW8NsR8vPihvNuqPc0zKZcl6359YFQdjiiW8kCRD/rsDOr9v1eYLFZKYloFyzFqEgj+jcG/V47elOjShJ5CCPwatXwP6HIloVwtgygFsnOFmCg6Ojoivfoz8Nw1qxFwg5OU2cq/1WbWNELKnaFg4eUWCAIJ/3ZIJsEPkgemZxGhE+hdiNn9dkQYBJs1kx2BxdIkJmQ9vJSKkrMz6lTxZM3IJ9mhmKS6zYdU1ppeAao0/ayte997DQParb/AHLN79g0iW1ad0z8ir5jAl0q3a+UZPTSa4YiSqC2PZ/gfxG5wvL2mKmeKowG0RXjmEp5iNxrni+T/HRLZOoH7y0DQ24nMCPg',
                                'TklYRUwuTWVzc2FnZUJ1aWxkZXJWNC43LUNlcnRpZmljYXRlQ2hhaW4uTWV0YWRhdGHsL0Ccm0ELINFZ2IaBhKaeWnVuh0o6nZLCioCn9xpSADzwIS5VCWO+1eVXT2atJOyf7FYlpB0/JA3Us+aQtekuIkHu/zBXijORZ4ClF4+sF3cSTNg6gY/+6iwLK/zs3bMg+GeJrcI65vXfs95Shxlb2Rd5GRT2/2yBmR6Zkf5QwMJuptUHWtM26WY7/xlkEKGFYDZVqOSylusiOzSALa815zC6dCiHoJNLBEKMlaZZQOk57/+OYoU5zzTaEgLhyvNFHSyAlyLQ3SGFtVHAaJZHSmmSPyJowCOB+92Gkk6SWVMsk6FbU8QJWFtlhzV/W/gZ7WzUlS/AKgN0th9/cq20ToFkW7X9c+rtYavufmuieqFhXgaMD8AGsoN9QC/HzNC9D1nydPfFYEUr9BHVy2nF5gM58Y59r2rT8p5LPARIkUp8g+5DLhyW0tdZFZ1305o4AHCayZnp5rjcU2Xi/c1Qf/djBGakmijlMs4aMzKJYD0c4Q8jdI7sNyd876K2wRD+L6KeD2QB3PtCS4P7BWAl5gh5CJ6ZBrwcaKXZqcSjEwm52MqVCgYZdapAaNYUy/QndttjLOG0wxxwuX1hIhMjPnIKZR1kwnqD5EqlHpilrnojRZvjVGN4zEKmilS8rNstt4HHs/D849W+Q6LRVWiWMs0cT2IugrX+Skxd8En7Gq52UEmuVBrSTpN+UpIu20NsVb9lsvuYh3XO441606tOEY2eKcZJdTtqrOTNqbbTk0zVn1yhbOCvmfctBNDhTwaC5QMi0P9wjU5XI9SBtkdQLizc5oqpoiHeqgb8+aJHVLcbgIJ/KLZKtRWFDfzRNM02Csx4etUUapVd2NA/L0oMs/O5T9sVj9FBJ7q99GWr3PVmxJb36mHZLXC4k1gGN9swE0LtzYsUdT5tUo9ri/hS3W/SM+F1p4Kh4QIgRcG3ciIHGN44bnDh3HDCz0fDnzKYw0bclMxZPctEyJ5gEOPF6OAkjD9dEaRGq/tEPf1k9Aub+v2dEjnfrYWAm4E5Zfhs2Xh0CT0k+SzhgKd0K/46ChJ20G5+blwpIvahvTVS68+aVIX6CwXs4tcVx6FnmVsMOOkIasfaqQLZYbNBkuLoZnQAq4j8yRekrQ==',
                            ],
                        }],
                    },
                },
            },
            botForwardedMessage: {
                message: {
                    richResponseMessage: {
                        messageType: 1,
                        submessages: [{ messageType: 2, messageText: 'TicTacToe' }],
                        unifiedResponse: {
                            data: Buffer.from(JSON.stringify(unifiedData)).toString('base64'),
                        },
                        contextInfo: {
                            forwardingScore: 1,
                            isForwarded: true,
                            forwardedAiBotMessageInfo: { botJid: '867051314767696@bot' },
                            forwardOrigin: 4,
                        },
                    },
                },
            },
        };

        m = generateWAMessageFromContent(msg.chat, payload, { quoted: msg });
            } else if (args[0] === 'dino2') {
                const dinoHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<style>
*{
    -webkit-tap-highlight-color:transparent;
    -webkit-user-select:none;
    user-select:none;
    box-sizing:border-box;
}

html,body{
    margin:0;
    padding:0;
    width:100%;
    min-height:100%;
    overflow:hidden;
    background:#fff;
}

body{
    display:flex;
    justify-content:center;
    align-items:flex-start;
    padding:10px;
}

canvas{
    display:block;
    width:100%;
    max-width:600px;
    height:auto;
    background:#fff;
    image-rendering:pixelated;
    image-rendering:crisp-edges;
    transition:filter .3s;
    touch-action:none;
}
</style>
</head>

<body>

<canvas id="c" width="600" height="150"></canvas>

<img
id="sprite"
style="display:none"
src="data:image/png;base64,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">

<script>
(function(){

'use strict';

const cv = document.getElementById('c');
const x = cv.getContext('2d', { alpha:false });
const sprite = document.getElementById('sprite');

x.imageSmoothingEnabled = false;

const W = 600;
const H = 150;
const GROUND_LINE = 127;

const TREX = {
    x: 848,
    y: 2,
    w: 44,
    h: 47,
    wDuck: 59,
    hDuck: 25
};

const GROUND_Y = H - TREX.h - 10;
const GROUND_Y_DUCK = H - TREX.hDuck - 10;

const CACTUS_SMALL = {
    x: 228,
    y: 2,
    w: 17,
    h: 35,
    groundY: 105
};

const CACTUS_LARGE = {
    x: 332,
    y: 2,
    w: 25,
    h: 50,
    groundY: 90
};

const PTERO = {
    x: 134,
    y: 2,
    w: 46,
    h: 40,
    ys: [100,75,50]
};

const CLOUD = {
    x: 86,
    y: 2,
    w: 46,
    h: 14
};

let night = false;
let distSinceInvert = 0;

let dino;
let obstacles;
let clouds;
let groundOffset;
let speed;
let score;
let hi = 0;
let gameOver;
let started;
let last = 0;
let spawnTimer;

function reset(){

    dino = {
        x:40,
        duck:false,
        y:GROUND_Y,
        vy:0,
        onGround:true,
        runFrame:0,
        runTimer:0
    };

    obstacles = [];

    clouds = [
        {x:200,y:30},
        {x:420,y:45},
        {x:560,y:20}
    ];

    groundOffset = 0;
    speed = 6;
    score = 0;
    gameOver = false;
    started = false;
    last = 0;
    night = false;
    distSinceInvert = 0;
    spawnTimer = 60;
}

function jump(){

    if(gameOver){
        reset();
        started = true;
        return;
    }

    started = true;

    if(dino.onGround && !dino.duck){
        dino.vy = -10;
        dino.onGround = false;
    }
}

function setDuck(v){

    if(!dino.onGround) return;

    dino.duck = v;
    dino.y = v ? GROUND_Y_DUCK : GROUND_Y;
}

document.addEventListener('keydown',function(e){

    if(e.code === 'Space' || e.code === 'ArrowUp'){
        e.preventDefault();
        jump();
    }

    if(e.code === 'ArrowDown'){
        e.preventDefault();
        setDuck(true);
    }

});

document.addEventListener('keyup',function(e){

    if(e.code === 'ArrowDown'){
        e.preventDefault();
        setDuck(false);
    }

});

document.body.addEventListener('pointerdown',function(e){

    e.preventDefault();
    jump();

},{passive:false});

function spawnObstacle(){

    const r = Math.random();

    if(r < .35){

        obstacles.push({
            type:'cs',
            x:W,
            w:CACTUS_SMALL.w,
            h:CACTUS_SMALL.h,
            y:CACTUS_SMALL.groundY
        });

    }else if(r < .70){

        obstacles.push({
            type:'cl',
            x:W,
            w:CACTUS_LARGE.w,
            h:CACTUS_LARGE.h,
            y:CACTUS_LARGE.groundY
        });

    }else{

        const y =
            PTERO.ys[
                Math.floor(Math.random()*PTERO.ys.length)
            ];

        obstacles.push({
            type:'pt',
            x:W,
            w:PTERO.w,
            h:PTERO.h,
            y:y,
            frame:0,
            frameTimer:0
        });

    }
}

function hit(a,b){

    return (
        a.x + 6 < b.x + b.w - 4 &&
        a.x + a.w - 6 > b.x + 4 &&
        a.y + 6 < b.y + b.h - 4 &&
        a.y + a.h - 6 > b.y + 4
    );

}

function drawDino(){

    let sx,sy,sw,sh;

    if(dino.duck){

        sw = TREX.wDuck;
        sh = TREX.hDuck;

        sx =
            TREX.x +
            (dino.onGround
                ? [264,323][Math.floor(dino.runFrame)%2]
                : 264);

        sy = TREX.y;

    }else if(!dino.onGround){

        sw = TREX.w;
        sh = TREX.h;
        sx = TREX.x;
        sy = TREX.y;

    }else{

        sw = TREX.w;
        sh = TREX.h;

        sx =
            started
                ? TREX.x + [88,132][Math.floor(dino.runFrame)%2]
                : TREX.x;

        sy = TREX.y;
    }

    x.drawImage(
        sprite,
        sx,sy,sw,sh,
        dino.x,dino.y,sw,sh
    );
}

function drawObstacle(o){

    if(o.type === 'cs'){

        x.drawImage(
            sprite,
            CACTUS_SMALL.x,
            CACTUS_SMALL.y,
            o.w,
            o.h,
            o.x,
            o.y,
            o.w,
            o.h
        );

    }else if(o.type === 'cl'){

        x.drawImage(
            sprite,
            CACTUS_LARGE.x,
            CACTUS_LARGE.y,
            o.w,
            o.h,
            o.x,
            o.y,
            o.w,
            o.h
        );

    }else{

        const fx =
            PTERO.x +
            (Math.floor(o.frame)%2)*PTERO.w;

        x.drawImage(
            sprite,
            fx,
            PTERO.y,
            o.w,
            o.h,
            o.x,
            o.y,
            o.w,
            o.h
        );
    }
}

function drawGround(){

    x.strokeStyle = '#535353';
    x.lineWidth = 2;

    x.setLineDash([2,6]);
    x.lineDashOffset = -groundOffset;

    x.beginPath();
    x.moveTo(0,GROUND_LINE);
    x.lineTo(W,GROUND_LINE);
    x.stroke();

    x.setLineDash([]);
}

function drawClouds(){

    clouds.forEach(function(c){

        x.drawImage(
            sprite,
            CLOUD.x,
            CLOUD.y,
            CLOUD.w,
            CLOUD.h,
            c.x,
            c.y,
            CLOUD.w,
            CLOUD.h
        );

    });
}

function drawScore(){

    x.fillStyle = '#535353';
    x.font = '16px monospace';
    x.textAlign = 'right';

    const s =
        String(Math.floor(score)).padStart(5,'0');

    const h =
        String(Math.floor(hi)).padStart(5,'0');

    x.fillText(
        hi > 0
            ? 'HI ' + h + '   ' + s
            : s,
        W - 10,
        22
    );

    x.textAlign = 'left';
}

function drawMessage(){

    x.fillStyle = '#535353';
    x.textAlign = 'center';

    if(gameOver){

        x.font = 'bold 18px monospace';
        x.fillText(
            'GAME OVER',
            W/2,
            55
        );

        x.font = '12px monospace';

        x.fillText(
            'toque ou espaço pra reiniciar',
            W/2,
            75
        );

    }else if(!started){

        x.font = '13px monospace';

        x.fillText(
            'toque na tela ou espaço pra começar',
            W/2,
            60
        );
    }

    x.textAlign = 'left';
}

function loop(t){

    if(!last) last = t;

    const dt =
        Math.min((t-last)/16.67,2);

    last = t;

    x.setTransform(1,0,0,1,0,0);

    x.fillStyle = '#fff';
    x.fillRect(0,0,W,H);

    drawClouds();

    if(started && !gameOver){

        groundOffset += speed*dt;

        dino.runTimer += dt;

        if(dino.runTimer > 5){

            dino.runFrame++;
            dino.runTimer = 0;
        }

        dino.vy += .6*dt;
        dino.y += dino.vy*dt;

        const floorY =
            dino.duck
                ? GROUND_Y_DUCK
                : GROUND_Y;

        if(dino.y >= floorY){

            dino.y = floorY;
            dino.vy = 0;
            dino.onGround = true;
        }

        clouds.forEach(function(c){

            c.x -= speed*.15*dt;

            if(c.x < -50){
                c.x = W + Math.random()*100;
            }

        });

        spawnTimer -= dt;

        if(spawnTimer <= 0){

            spawnObstacle();

            spawnTimer =
                Math.max(35,75-speed*2.2)
                + Math.random()*35;
        }

        obstacles.forEach(function(o){

            o.x -= speed*dt;

            if(o.type === 'pt'){

                o.frameTimer += dt;

                if(o.frameTimer > 12){

                    o.frame++;
                    o.frameTimer = 0;
                }
            }

        });

        obstacles =
            obstacles.filter(function(o){
                return o.x > -60;
            });

        speed =
            Math.min(
                13,
                speed + .0025*dt
            );

        score += dt*.12;

        if(score > hi){
            hi = score;
        }

        distSinceInvert += dt;

        if(distSinceInvert > 350){

            distSinceInvert = 0;
            night = !night;
        }

        const db = {
            x:dino.x,
            y:dino.y,
            w:dino.duck
                ? TREX.wDuck
                : TREX.w,
            h:dino.duck
                ? TREX.hDuck
                : TREX.h
        };

        for(const o of obstacles){

            if(hit(db,o)){

                gameOver = true;
                break;
            }
        }
    }

    drawGround();

    obstacles.forEach(drawObstacle);

    drawDino();

    drawScore();

    drawMessage();

    cv.style.filter =
        night
            ? 'invert(1)'
            : 'none';

    requestAnimationFrame(loop);
}

function start(){

    reset();

    x.fillStyle = '#fff';
    x.fillRect(0,0,W,H);

    drawGround();
    drawDino();
    drawScore();
    drawMessage();

    requestAnimationFrame(loop);
}

if(sprite.complete && sprite.naturalWidth > 0){

    start();

}else{

    sprite.onload = start;

    sprite.onerror = function(){

        x.fillStyle = '#fff';
        x.fillRect(0,0,W,H);

        x.fillStyle = '#535353';
        x.font = '13px monospace';
        x.textAlign = 'center';

        x.fillText(
            'Erro ao carregar o sprite',
            W/2,
            H/2
        );
    };
}

})();
</script>

</body>
</html>`;

        const unifiedData = {
            response_id: crypto.randomUUID(),
            sections: [{
                view_model: {
                    primitive: {
                        __typename: 'GenAIaeacdsnwHtmlPrimitive',
                        payload: dinoHtml,
                        trusted_sources: ['zone.api.br'],
                    },
                    __typename: 'GenAISingleLayoutViewModel',
                },
            }],
        };
        const payload = {
            messageContextInfo: {
                deviceListMetadata: {},
                deviceListMetadataVersion: 2,
                botMetadata: {
                    messageDisclaimerText: '',
                    botResponseId: crypto.randomUUID(),
                    verificationMetadata: {
                        proofs: [{
                            version: 1,
                            useCase: 1,
                            signature: 'TklYRUwuTWVzc2FnZUJ1aWxkZXJWNC43LVZlcmlmaWNhdGlvblNpZ25hdHVyZS5NZXRhZGF0YeN55YRyad2+ZA==',
                            certificateChain: [
                                'TklYRUwuTWVzc2FnZUJ1aWxkZXJWNC43LUNlcnRpZmljYXRlQ2hhaW4uTWV0YWRhdGEOvtJr968bbpKdZreOTwkk9aPN++XPE60RfuzNLkXXc7LE8BOkJOWRpo2oNXaRJ3uCNJ43HY3A+oetnvHSfcxWqmvvTSrBOI5V1NOD6RMsZ/st1XVPUx83AGps1l5jYBOYzqMNy6un2tToJ2Bt9bXRo29tWLZTu8m7TNY/hISwVpVc5tjSet5U7btPN+dMIx2UvykB1jcbWGsdklheeuz8RXSStNXzeaGvsf1lpZ/ugLE4b2BdmlRNKrY6zLE4qFtRYQoS7axOyQX+4QUyN2m9bfm7urQmn+QRSXJwMO7X5kAJJLbkVGJFt9Pm9VXPwQVrK2aaqiXlpusj+7DfDw00OULmYMmZDTqXM0nUVLxj13z0LhMQoQhhNG8utdUn4uKOFceliTZ/xiP+A54GnX9620641bqw3ctfh9NNXPsTEK8hAUD7FDqUhVntHmoEYYEHq8X1tHHZYP49/f2iezTiE8AUaoZo42/jIWQIKohOGNUib2hEqMkW8NsR8vPihvNuqPc0zKZcl6359YFQdjiiW8kCRD/rsDOr9v1eYLFZKYloFyzFqEgj+jcG/V47elOjShJ5CCPwatXwP6HIloVwtgygFsnOFmCg6Ojoivfoz8Nw1qxFwg5OU2cq/1WbWNELKnaFg4eUWCAIJ/3ZIJsEPkgemZxGhE+hdiNn9dkQYBJs1kx2BxdIkJmQ9vJSKkrMz6lTxZM3IJ9mhmKS6zYdU1ppeAao0/ayte997DQParb/AHLN79g0iW1ad0z8ir5jAl0q3a+UZPTSa4YiSqC2PZ/gfxG5wvL2mKmeKowG0RXjmEp5iNxrni+T/HRLZOoH7y0DQ24nMCPg',
                                'TklYRUwuTWVzc2FnZUJ1aWxkZXJWNC43LUNlcnRpZmljYXRlQ2hhaW4uTWV0YWRhdGHsL0Ccm0ELINFZ2IaBhKaeWnVuh0o6nZLCioCn9xpSADzwIS5VCWO+1eVXT2atJOyf7FYlpB0/JA3Us+aQtekuIkHu/zBXijORZ4ClF4+sF3cSTNg6gY/+6iwLK/zs3bMg+GeJrcI65vXfs95Shxlb2Rd5GRT2/2yBmR6Zkf5QwMJuptUHWtM26WY7/xlkEKGFYDZVqOSylusiOzSALa815zC6dCiHoJNLBEKMlaZZQOk57/+OYoU5zzTaEgLhyvNFHSyAlyLQ3SGFtVHAaJZHSmmSPyJowCOB+92Gkk6SWVMsk6FbU8QJWFtlhzV/W/gZ7WzUlS/AKgN0th9/cq20ToFkW7X9c+rtYavufmuieqFhXgaMD8AGsoN9QC/HzNC9D1nydPfFYEUr9BHVy2nF5gM58Y59r2rT8p5LPARIkUp8g+5DLhyW0tdZFZ1305o4AHCayZnp5rjcU2Xi/c1Qf/djBGakmijlMs4aMzKJYD0c4Q8jdI7sNyd876K2wRD+L6KeD2QB3PtCS4P7BWAl5gh5CJ6ZBrwcaKXZqcSjEwm52MqVCgYZdapAaNYUy/QndttjLOG0wxxwuX1hIhMjPnIKZR1kwnqD5EqlHpilrnojRZvjVGN4zEKmilS8rNstt4HHs/D849W+Q6LRVWiWMs0cT2IugrX+Skxd8En7Gq52UEmuVBrSTpN+UpIu20NsVb9lsvuYh3XO441606tOEY2eKcZJdTtqrOTNqbbTk0zVn1yhbOCvmfctBNDhTwaC5QMi0P9wjU5XI9SBtkdQLizc5oqpoiHeqgb8+aJHVLcbgIJ/KLZKtRWFDfzRNM02Csx4etUUapVd2NA/L0oMs/O5T9sVj9FBJ7q99GWr3PVmxJb36mHZLXC4k1gGN9swE0LtzYsUdT5tUo9ri/hS3W/SM+F1p4Kh4QIgRcG3ciIHGN44bnDh3HDCz0fDnzKYw0bclMxZPctEyJ5gEOPF6OAkjD9dEaRGq/tEPf1k9Aub+v2dEjnfrYWAm4E5Zfhs2Xh0CT0k+SzhgKd0K/46ChJ20G5+blwpIvahvTVS68+aVIX6CwXs4tcVx6FnmVsMOOkIasfaqQLZYbNBkuLoZnQAq4j8yRekrQ==',
                            ],
                        }],
                    },
                },
            },
            botForwardedMessage: {
                message: {
                    richResponseMessage: {
                        messageType: 1,
                        submessages: [{ messageType: 2, messageText: 'Dino' }],
                        unifiedResponse: {
                            data: Buffer.from(JSON.stringify(unifiedData)).toString('base64'),
                        },
                        contextInfo: {
                            forwardingScore: 1,
                            isForwarded: true,
                            forwardedAiBotMessageInfo: { botJid: '867051314767696@bot' },
                            forwardOrigin: 4,
                        },
                    },
                },
            },
        };

        m = generateWAMessageFromContent(msg.chat, payload, { quoted: msg });
            } else if (args[0] === 'snake') {
                const snakeHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<style>
*{
    -webkit-tap-highlight-color:transparent;
    -webkit-user-select:none;
    user-select:none;
    box-sizing:border-box;
    font-family:Arial,sans-serif;
}
html,body{
    margin:0;
    padding:0;
    width:100%;
    min-height:100vh;
    background:#12141f;
    display:flex;
    justify-content:center;
    align-items:center;
}
.container{
    max-width:320px;
    width:100%;
    margin:auto;
    padding:16px;
    background:#1e2235;
    border-radius:20px;
    text-align:center;
}
h2{
    margin:0 0 8px;
    font-size:18px;
    color:#fff;
}
#score{
    margin-bottom:8px;
    font-size:14px;
    color:#8a8fa8;
}
canvas{
    background:#12141f;
    border-radius:12px;
    display:block;
    margin:0 auto 12px;
    box-shadow:inset 0 0 10px rgba(0,0,0,0.5);
}
.controls{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:6px;
    max-width:180px;
    margin:0 auto 12px;
}
.controls button{
    background:#2a2e45;
    border:none;
    color:#fff;
    padding:12px;
    border-radius:8px;
    font-size:16px;
    cursor:pointer;
}
.controls button:active{
    background:#363b57;
}
.btn-action{
    background:#6c5ce7;
    border:none;
    color:#fff;
    padding:8px 16px;
    border-radius:8px;
    cursor:pointer;
    font-size:14px;
}
.btn-action:active{
    opacity:.8;
}
</style>
</head>
<body>

<div class="container">
    <h2>Kaede Games</h2>
    <div id="score">Puntuación: 0</div>
    <canvas id="gameCanvas" width="280" height="280"></canvas>
    <div class="controls">
        <div></div>
        <button onclick="changeDir('UP')">⬆️</button>
        <div></div>
        <button onclick="changeDir('LEFT')">⬅️</button>
        <button onclick="changeDir('DOWN')">⬇️</button>
        <button onclick="changeDir('RIGHT')">➡️</button>
    </div>
    <button class="btn-action" onclick="resetGame()">Reiniciar</button>
</div>

<script>
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');

const gridSize = 14;
const tileCount = canvas.width / gridSize;

let snake = [];
let food = {x: 0, y: 0};
let dx = 1;
let dy = 0;
let score = 0;
let gameInterval = null;
let isGameOver = false;

function resetGame(){
    snake = [
        {x: 10, y: 10},
        {x: 9, y: 10},
        {x: 8, y: 10}
    ];
    dx = 1;
    dy = 0;
    score = 0;
    scoreEl.textContent = 'Puntuación: ' + score;
    isGameOver = false;
    spawnFood();
    if(gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 120);
}

function spawnFood(){
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
    // Evitar que la comida aparezca sobre la serpiente
    snake.forEach(part => {
        if(part.x === food.x && part.y === food.y){
            spawnFood();
        }
    });
}

function changeDir(dir){
    if(dir === 'UP' && dy === 0){ dx = 0; dy = -1; }
    if(dir === 'DOWN' && dy === 0){ dx = 0; dy = 1; }
    if(dir === 'LEFT' && dx === 0){ dx = -1; dy = 0; }
    if(dir === 'RIGHT' && dx === 0){ dx = 1; dy = 0; }
}

function gameLoop(){
    if(isGameOver) return;

    // Mover la cabeza
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};

    // Colisiones con las paredes
    if(head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount){
        endGame();
        return;
    }

    // Colisión consigo misma
    for(let i = 0; i < snake.length; i++){
        if(head.x === snake[i].x && head.y === snake[i].y){
            endGame();
            return;
        }
    }

    snake.unshift(head);

    // Comer manzana
    if(head.x === food.x && head.y === food.y){
        score += 10;
        scoreEl.textContent = 'Puntuación: ' + score;
        spawnFood();
    } else {
        snake.pop();
    }

    draw();
}

function draw(){
    // Limpiar canvas
    ctx.fillStyle = '#12141f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujar comida
    ctx.fillStyle = '#ff5252';
    ctx.beginPath();
    ctx.arc((food.x * gridSize) + gridSize/2, (food.y * gridSize) + gridSize/2, gridSize/2 - 2, 0, Math.PI * 2);
    ctx.fill();

    // Dibujar serpiente
    snake.forEach((part, index) => {
        ctx.fillStyle = index === 0 ? '#6c5ce7' : '#a29bfe';
        ctx.fillRect(part.x * gridSize + 1, part.y * gridSize + 1, gridSize - 2, gridSize - 2);
    });
}

function endGame(){
    isGameOver = true;
    clearInterval(gameInterval);
    scoreEl.textContent = '¡Game Over! Puntuación: ' + score;
}

resetGame();
</script>

</body>
</html>`;

        const unifiedData = {
            response_id: crypto.randomUUID(),
            sections: [{
                view_model: {
                    primitive: {
                        __typename: 'GenAIaeacdsnwHtmlPrimitive',
                        payload: snakeHtml,
                        trusted_sources: ['zone.api.br'],
                    },
                    __typename: 'GenAISingleLayoutViewModel',
                },
            }],
        };

        const payload = {
            messageContextInfo: {
                deviceListMetadata: {},
                deviceListMetadataVersion: 2,
                botMetadata: {
                    messageDisclaimerText: '',
                    botResponseId: crypto.randomUUID(),
                    verificationMetadata: {
                        proofs: [{
                            version: 1,
                            useCase: 1,
                            signature: 'TklYRUwuTWVzc2FnZUJ1aWxkZXJWNC43LVZlcmlmaWNhdGlvblNpZ25hdHVyZS5NZXRhZGF0YeN55YRyad2+ZA==',
                            certificateChain: [
                                'TklYRUwuTWVzc2FnZUJ1aWxkZXJWNC43LUNlcnRpZmljYXRlQ2hhaW4uTWV0YWRhdGEOvtJr968bbpKdZreOTwkk9aPN++XPE60RfuzNLkXXc7LE8BOkJOWRpo2oNXaRJ3uCNJ43HY3A+oetnvHSfcxWqmvvTSrBOI5V1NOD6RMsZ/st1XVPUx83AGps1l5jYBOYzqMNy6un2tToJ2Bt9bXRo29tWLZTu8m7TNY/hISwVpVc5tjSet5U7btPN+dMIx2UvykB1jcbWGsdklheeuz8RXSStNXzeaGvsf1lpZ/ugLE4b2BdmlRNKrY6zLE4qFtRYQoS7axOyQX+4QUyN2m9bfm7urQmn+QRSXJwMO7X5kAJJLbkVGJFt9Pm9VXPwQVrK2aaqiXlpusj+7DfDw00OULmYMmZDTqXM0nUVLxj13z0LhMQoQhhNG8utdUn4uKOFceliTZ/xiP+A54GnX9620641bqw3ctfh9NNXPsTEK8hAUD7FDqUhVntHmoEYYEHq8X1tHHZYP49/f2iezTiE8AUaoZo42/jIWQIKohOGNUib2hEqMkW8NsR8vPihvNuqPc0zKZcl6359YFQdjiiW8kCRD/rsDOr9v1eYLFZKYloFyzFqEgj+jcG/V47elOjShJ5CCPwatXwP6HIloVwtgygFsnOFmCg6Ojoivfoz8Nw1qxFwg5OU2cq/1WbWNELKnaFg4eUWCAIJ/3ZIJsEPkgemZxGhE+hdiNn9dkQYBJs1kx2BxdIkJmQ9vJSKkrMz6lTxZM3IJ9mhmKS6zYdU1ppeAao0/ayte997DQParb/AHLN79g0iW1ad0z8ir5jAl0q3a+UZPTSa4YiSqC2PZ/gfxG5wvL2mKmeKowG0RXjmEp5iNxrni+T/HRLZOoH7y0DQ24nMCPg',
                                'TklYRUwuTWVzc2FnZUJ1aWxkZXJWNC43LUNlcnRpZmljYXRlQ2hhaW4uTWV0YWRhdGHsL0Ccm0ELINFZ2IaBhKaeWnVuh0o6nZLCioCn9xpSADzwIS5VCWO+1eVXT2atJOyf7FYlpB0/JA3Us+aQtekuIkHu/zBXijORZ4ClF4+sF3cSTNg6gY/+6iwLK/zs3bMg+GeJrcI65vXfs95Shxlb2Rd5GRT2/2yBmR6Zkf5QwMJuptUHWtM26WY7/xlkEKGFYDZVqOSylusiOzSALa815zC6dCiHoJNLBEKMlaZZQOk57/+OYoU5zzTaEgLhyvNFHSyAlyLQ3SGFtVHAaJZHSmmSPyJowCOB+92Gkk6SWVMsk6FbU8QJWFtlhzV/W/gZ7WzUlS/AKgN0th9/cq20ToFkW7X9c+rtYavufmuieqFhXgaMD8AGsoN9QC/HzNC9D1nydPfFYEUr9BHVy2nF5gM58Y59r2rT8p5LPARIkUp8g+5DLhyW0tdZFZ1305o4AHCayZnp5rjcU2Xi/c1Qf/djBGakmijlMs4aMzKJYD0c4Q8jdI7sNyd876K2wRD+L6KeD2QB3PtCS4P7BWAl5gh5CJ6ZBrwcaKXZqcSjEwm52MqVCgYZdapAaNYUy/QndttjLOG0wxxwuX1hIhMjPnIKZR1kwnqD5EqlHpilrnojRZvjVGN4zEKmilS8rNstt4HHs/D849W+Q6LRVWiWMs0cT2IugrX+Skxd8En7Gq52UEmuVBrSTpN+UpIu20NsVb9lsvuYh3XO441606tOEY2eKcZJdTtqrOTNqbbTk0zVn1yhbOCvmfctBNDhTwaC5QMi0P9wjU5XI9SBtkdQLizc5oqpoiHeqgb8+aJHVLcbgIJ/KLZKtRWFDfzRNM02Csx4etUUapVd2NA/L0oMs/O5T9sVj9FBJ7q99GWr3PVmxJb36mHZLXC4k1gGN9swE0LtzYsUdT5tUo9ri/hS3W/SM+F1p4Kh4QIgRcG3ciIHGN44bnDh3HDCz0fDnzKYw0bclMxZPctEyJ5gEOPF6OAkjD9dEaRGq/tEPf1k9Aub+v2dEjnfrYWAm4E5Zfhs2Xh0CT0k+SzhgKd0K/46ChJ20G5+blwpIvahvTVS68+aVIX6CwXs4tcVx6FnmVsMOOkIasfaqQLZYbNBkuLoZnQAq4j8yRekrQ==',
                            ],
                        }],
                    },
                },
            },
            botForwardedMessage: {
                message: {
                    richResponseMessage: {
                        messageType: 1,
                        submessages: [{ messageType: 2, messageText: 'Snake' }],
                        unifiedResponse: {
                            data: Buffer.from(JSON.stringify(unifiedData)).toString('base64'),
                        },
                        contextInfo: {
                            forwardingScore: 1,
                            isForwarded: true,
                            forwardedAiBotMessageInfo: { botJid: '867051314767696@bot' },
                            forwardOrigin: 4,
                        },
                    },
                },
            },
        };

        m = generateWAMessageFromContent(msg.chat, payload, { quoted: msg });
            } else if (args[0] === 'mines') {
                const minesweeperHtml = `<!DOCTYPE html>

<html> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">

<style> @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap'); *{ -webkit-tap-highlight-color:transparent; -webkit-user-select:none; user-select:none; box-sizing:border-box; font-family:'Poppins',sans-serif; } html,body{ margin:0; padding:0; width:100%; min-height:100vh; background:#12141f; display:flex; justify-content:center; align-items:center; } .container{ max-width:320px; width:100%; margin:auto; padding:18px 16px; background:#1e2235; border-radius:20px; box-shadow:0 15px 35px rgba(0,0,0,.5); } /* Encabezado */ .brand{ font-size:11px; color:#777d96; font-weight:600; text-align:center; margin-bottom:12px; } .game-info{ display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px; } .game-title{ color:#fff; font-size:18px; font-weight:600; } .mine-counter{ text-align:right; display:flex; flex-direction:column; align-items:flex-end; line-height:1; } #mineCount{ color:#fff; font-size:20px; font-weight:600; } .mine-label{ color:#777d96; font-size:9px; margin-top:4px; text-transform:uppercase; letter-spacing:.5px; } /* Botones de modo */ .mode-controls{ display:flex; gap:8px; margin-bottom:14px; } .mode-btn{ flex:1; border:none; padding:10px; border-radius:9px; background:#2a2e45; color:#fff; font-size:12px; font-weight:600; cursor:pointer; transition:.15s; } .mode-btn.active{ background:#6c5ce7; } .mode-btn:active{ transform:scale(.97); opacity:.85; } /* Tablero */ .board{ display:grid; grid-template-columns:repeat(8, 1fr); grid-template-rows:repeat(8, 1fr); width:280px; height:280px; margin:0 auto; border-radius:10px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,.4); border:2px solid #2a2e45; background:#12141f; gap:2px; padding:2px; } .cell{ background:#2a2e45; display:flex; justify-content:center; align-items:center; font-size:14px; font-weight:600; cursor:pointer; border-radius:4px; color:#fff; transition:.1s; } .cell:active{ transform:scale(.94); } .cell.revealed{ background:#12141f; } .cell.mine{ background:#ff5252 !important; } .cell[data-val="1"]{ color:#74b9ff; } .cell[data-val="2"]{ color:#55efc4; } .cell[data-val="3"]{ color:#ffeaa7; } .cell[data-val="4"]{ color:#fab1a0; } .cell[data-val="5"]{ color:#ff7675; } .cell[data-val="6"]{ color:#a29bfe; } .cell[data-val="7"]{ color:#fd79a8; } .cell[data-val="8"]{ color:#dfe6e9; } /* Estado */ #status{ margin-top:13px; text-align:center; font-size:10px; color:#777d96; } /* Nueva partida */ .new-game-container{ display:flex; justify-content:center; margin-top:12px; } .new-game-btn{ background:#6c5ce7; border:none; color:#fff; padding:9px 22px; border-radius:9px; cursor:pointer; font-size:12px; font-weight:600; } .new-game-btn:active{ opacity:.8; transform:scale(.97); } </style>

</head>

<body>

<div class="container">

<div class="brand">Kaede Games</div>

<div class="game-info">
    <div class="game-title">Buscaminas</div>

    <div class="mine-counter">
        <span id="mineCount">10</span>
        <span class="mine-label">minas</span>
    </div>
</div>

<div class="mode-controls">
    <button
        class="mode-btn"
        id="flagBtn"
        onclick="setMode('flag')"
    >
        Bandera
    </button>

    <button
        class="mode-btn active"
        id="revealBtn"
        onclick="setMode('reveal')"
    >
        Revelar
    </button>
</div>

<div class="board" id="board"></div>

<div id="status">Toca una casilla para empezar</div>

<div class="new-game-container">
    <button class="new-game-btn" onclick="resetGame()">
        Nueva partida
    </button>
</div>

</div>

<script> const rows = 8; const cols = 8; const minesCount = 10; let board = []; let isGameOver = false; let isFirstClick = true; let currentMode = 'reveal'; const statusEl = document.getElementById('status'); const mineCountEl = document.getElementById('mineCount'); /* ========================= MODOS ========================= */ function setMode(mode){ if(isGameOver) return; currentMode = mode; const flagBtn = document.getElementById('flagBtn'); const revealBtn = document.getElementById('revealBtn'); flagBtn.classList.remove('active'); revealBtn.classList.remove('active'); if(mode === 'flag'){ flagBtn.classList.add('active'); } else { revealBtn.classList.add('active'); } } /* ========================= CONTADOR DE BANDERAS ========================= */ function getFlagsCount(){ let flags = 0; for(let r = 0; r < rows; r++){ for(let c = 0; c < cols; c++){ if(board[r][c].flagged){ flags++; } } } return flags; } function updateMineCounter(){ const flags = getFlagsCount(); const remaining = minesCount - flags; mineCountEl.textContent = remaining; } /* ========================= NUEVA PARTIDA ========================= */ function resetGame(){ board = []; isGameOver = false; isFirstClick = true; currentMode = 'reveal'; document.getElementById('flagBtn').classList.remove('active'); document.getElementById('revealBtn').classList.add('active'); statusEl.textContent = 'Toca una casilla para empezar'; mineCountEl.textContent = minesCount; for(let r = 0; r < rows; r++){ let row = []; for(let c = 0; c < cols; c++){ row.push({ r, c, mine:false, revealed:false, flagged:false, neighborMines:0 }); } board.push(row); } renderBoard(); } /* ========================= GENERAR MINAS ========================= */ function placeMines(firstR, firstC){ let placed = 0; while(placed < minesCount){ const mr = Math.floor(Math.random() * rows); const mc = Math.floor(Math.random() * cols); /* Zona segura de 3x3 alrededor del primer clic */ const isSafeZone = Math.abs(mr - firstR) <= 1 && Math.abs(mc - firstC) <= 1; if( !board[mr][mc].mine && !isSafeZone ){ board[mr][mc].mine = true; placed++; } } calculateNeighbors(); } /* ========================= CALCULAR VECINOS ========================= */ function calculateNeighbors(){ for(let r = 0; r < rows; r++){ for(let c = 0; c < cols; c++){ if(board[r][c].mine) continue; let count = 0; for(let dr = -1; dr <= 1; dr++){ for(let dc = -1; dc <= 1; dc++){ const nr = r + dr; const nc = c + dc; if( nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc].mine ){ count++; } } } board[r][c].neighborMines = count; } } } /* ========================= RENDERIZAR TABLERO ========================= */ function renderBoard(){ const boardEl = document.getElementById('board'); boardEl.innerHTML = ''; for(let r = 0; r < rows; r++){ for(let c = 0; c < cols; c++){ const cellData = board[r][c]; const cellEl = document.createElement('div'); cellEl.className = 'cell'; if(cellData.revealed){ cellEl.classList.add('revealed'); if(cellData.mine){ cellEl.classList.add('mine'); cellEl.textContent = '💣'; } else if(cellData.neighborMines > 0){ cellEl.textContent = cellData.neighborMines; cellEl.setAttribute( 'data-val', cellData.neighborMines ); } } else if(cellData.flagged){ cellEl.textContent = '🚩'; } cellEl.addEventListener( 'click', () => handleCellClick(r, c) ); boardEl.appendChild(cellEl); } } updateMineCounter(); } /* ========================= CLICK EN CASILLA ========================= */ function handleCellClick(r, c){ if(isGameOver) return; const cell = board[r][c]; /* BANDERAS */ if(currentMode === 'flag'){ if(cell.revealed) return; if(!cell.flagged){ const flagsUsed = getFlagsCount(); /* No permitir más de 10 banderas */ if(flagsUsed >= minesCount){ statusEl.textContent = 'No puedes colocar más banderas'; return; } cell.flagged = true; } else { cell.flagged = false; } renderBoard(); return; } /* REVELAR */ if(cell.flagged || cell.revealed) return; /* PRIMER CLICK */ if(isFirstClick){ placeMines(r, c); isFirstClick = false; statusEl.textContent = 'Encuentra las minas'; } /* MINA */ if(cell.mine){ cell.revealed = true; revealAllMines(); isGameOver = true; statusEl.textContent = '¡Game Over!'; renderBoard(); return; } /* REVELAR CASILLA */ revealCell(r, c); checkWinCondition(); renderBoard(); } /* ========================= REVELAR CASILLAS ========================= */ function revealCell(r, c){ const cell = board[r][c]; if( cell.revealed || cell.flagged || cell.mine ){ return; } cell.revealed = true; /* Si no hay minas alrededor, revelar automáticamente las casillas vecinas */ if(cell.neighborMines === 0){ for(let dr = -1; dr <= 1; dr++){ for(let dc = -1; dc <= 1; dc++){ const nr = r + dr; const nc = c + dc; if( nr >= 0 && nr < rows && nc >= 0 && nc < cols ){ if(!board[nr][nc].revealed){ revealCell(nr, nc); } } } } } } /* ========================= REVELAR MINAS ========================= */ function revealAllMines(){ for(let r = 0; r < rows; r++){ for(let c = 0; c < cols; c++){ if(board[r][c].mine){ board[r][c].revealed = true; } } } } /* ========================= CONDICIÓN DE VICTORIA ========================= */ function checkWinCondition(){ for(let r = 0; r < rows; r++){ for(let c = 0; c < cols; c++){ const cell = board[r][c]; if( !cell.mine && !cell.revealed ){ return; } } } isGameOver = true; revealAllMines(); statusEl.textContent = '¡Has ganado!'; } /* ========================= INICIAR ========================= */ resetGame(); </script>

</body> </html>`;

        const unifiedData = {
            response_id: crypto.randomUUID(),
            sections: [{
                view_model: {
                    primitive: {
                        __typename: 'GenAIaeacdsnwHtmlPrimitive',
                        payload: minesweeperHtml,
                        trusted_sources: ['zone.api.br'],
                    },
                    __typename: 'GenAISingleLayoutViewModel',
                },
            }],
        };

        const payload = {
            messageContextInfo: {
                deviceListMetadata: {},
                deviceListMetadataVersion: 2,
                botMetadata: {
                    messageDisclaimerText: '',
                    botResponseId: crypto.randomUUID(),
                    verificationMetadata: {
                        proofs: [{
                            version: 1,
                            useCase: 1,
                            signature: 'TklYRUwuTWVzc2FnZUJ1aWxkZXJWNC43LVZlcmlmaWNhdGlvblNpZ25hdHVyZS5NZXRhZGF0YeN55YRyad2+ZA==',
                            certificateChain: [
                                'TklYRUwuTWVzc2FnZUJ1aWxkZXJWNC43LUNlcnRpZmljYXRlQ2hhaW4uTWV0YWRhdGEOvtJr968bbpKdZreOTwkk9aPN++XPE60RfuzNLkXXc7LE8BOkJOWRpo2oNXaRJ3uCNJ43HY3A+oetnvHSfcxWqmvvTSrBOI5V1NOD6RMsZ/st1XVPUx83AGps1l5jYBOYzqMNy6un2tToJ2Bt9bXRo29tWLZTu8m7TNY/hISwVpVc5tjSet5U7btPN+dMIx2UvykB1jcbWGsdklheeuz8RXSStNXzeaGvsf1lpZ/ugLE4b2BdmlRNKrY6zLE4qFtRYQoS7axOyQX+4QUyN2m9bfm7urQmn+QRSXJwMO7X5kAJJLbkVGJFt9Pm9VXPwQVrK2aaqiXlpusj+7DfDw00OULmYMmZDTqXM0nUVLxj13z0LhMQoQhhNG8utdUn4uKOFceliTZ/xiP+A54GnX9620641bqw3ctfh9NNXPsTEK8hAUD7FDqUhVntHmoEYYEHq8X1tHHZYP49/f2iezTiE8AUaoZo42/jIWQIKohOGNUib2hEqMkW8NsR8vPihvNuqPc0zKZcl6359YFQdjiiW8kCRD/rsDOr9v1eYLFZKYloFyzFqEgj+jcG/V47elOjShJ5CCPwatXwP6HIloVwtgygFsnOFmCg6Ojoivfoz8Nw1qxFwg5OU2cq/1WbWNELKnaFg4eUWCAIJ/3ZIJsEPkgemZxGhE+hdiNn9dkQYBJs1kx2BxdIkJmQ9vJSKkrMz6lTxZM3IJ9mhmKS6zYdU1ppeAao0/ayte997DQParb/AHLN79g0iW1ad0z8ir5jAl0q3a+UZPTSa4YiSqC2PZ/gfxG5wvL2mKmeKowG0RXjmEp5iNxrni+T/HRLZOoH7y0DQ24nMCPg',
                                'TklYRUwuTWVzc2FnZUJ1aWxkZXJWNC43LUNlcnRpZmljYXRlQ2hhaW4uTWV0YWRhdGHsL0Ccm0ELINFZ2IaBhKaeWnVuh0o6nZLCioCn9xpSADzwIS5VCWO+1eVXT2atJOyf7FYlpB0/JA3Us+aQtekuIkHu/zBXijORZ4ClF4+sF3cSTNg6gY/+6iwLK/zs3bMg+GeJrcI65vXfs95Shxlb2Rd5GRT2/2yBmR6Zkf5QwMJuptUHWtM26WY7/xlkEKGFYDZVqOSylusiOzSALa815zC6dCiHoJNLBEKMlaZZQOk57/+OYoU5zzTaEgLhyvNFHSyAlyLQ3SGFtVHAaJZHSmmSPyJowCOB+92Gkk6SWVMsk6FbU8QJWFtlhzV/W/gZ7WzUlS/AKgN0th9/cq20ToFkW7X9c+rtYavufmuieqFhXgaMD8AGsoN9QC/HzNC9D1nydPfFYEUr9BHVy2nF5gM58Y59r2rT8p5LPARIkUp8g+5DLhyW0tdZFZ1305o4AHCayZnp5rjcU2Xi/c1Qf/djBGakmijlMs4aMzKJYD0c4Q8jdI7sNyd876K2wRD+L6KeD2QB3PtCS4P7BWAl5gh5CJ6ZBrwcaKXZqcSjEwm52MqVCgYZdapAaNYUy/QndttjLOG0wxxwuX1hIhMjPnIKZR1kwnqD5EqlHpilrnojRZvjVGN4zEKmilS8rNstt4HHs/D849W+Q6LRVWiWMs0cT2IugrX+Skxd8En7Gq52UEmuVBrSTpN+UpIu20NsVb9lsvuYh3XO441606tOEY2eKcZJdTtqrOTNqbbTk0zVn1yhbOCvmfctBNDhTwaC5QMi0P9wjU5XI9SBtkdQLizc5oqpoiHeqgb8+aJHVLcbgIJ/KLZKtRWFDfzRNM02Csx4etUUapVd2NA/L0oMs/O5T9sVj9FBJ7q99GWr3PVmxJb36mHZLXC4k1gGN9swE0LtzYsUdT5tUo9ri/hS3W/SM+F1p4Kh4QIgRcG3ciIHGN44bnDh3HDCz0fDnzKYw0bclMxZPctEyJ5gEOPF6OAkjD9dEaRGq/tEPf1k9Aub+v2dEjnfrYWAm4E5Zfhs2Xh0CT0k+SzhgKd0K/46ChJ20G5+blwpIvahvTVS68+aVIX6CwXs4tcVx6FnmVsMOOkIasfaqQLZYbNBkuLoZnQAq4j8yRekrQ==',
                            ],
                        }],
                    },
                },
            },
            botForwardedMessage: {
                message: {
                    richResponseMessage: {
                        messageType: 1,
                        submessages: [{ messageType: 2, messageText: 'Buscaminas' }],
                        unifiedResponse: {
                            data: Buffer.from(JSON.stringify(unifiedData)).toString('base64'),
                        },
                        contextInfo: {
                            forwardingScore: 1,
                            isForwarded: true,
                            forwardedAiBotMessageInfo: { botJid: '867051314767696@bot' },
                            forwardOrigin: 4,
                        },
                    },
                },
            },
        };

        m = generateWAMessageFromContent(msg.chat, payload, { quoted: msg });
            } else if (args[0] === 'striker') {
                const strikerHtml = `

<!DOCTYPE html>
<html lang="id">

<head>
   <meta charset="UTF-8">
   <style>
      * {
         -webkit-tap-highlight-color: transparent;
         -webkit-user-select: none;
         user-select: none;
         -webkit-touch-callout: none;
         box-sizing: border-box;
      }

      /* Tombol Gerak Sedang */
      .ctrl-btn {
         flex: 1;
         background: #2a2a2a;
         color: #ffffff;
         border: 1px solid #3a3a3a;
         border-radius: 8px;
         padding: 12px 0;
         font-size: 20px;
         font-weight: bold;
         cursor: pointer;
         box-shadow: 0 4px 12px rgba(0, 0, 0, .3);
         transition: transform .06s, background .1s, border-color .1s;
         display: flex;
         align-items: center;
         justify-content: center;
         touch-action: none;
      }

      .ctrl-btn:active {
         transform: scale(0.96);
         background: #38bdf8;
         color: #0f172a;
         border-color: #38bdf8;
      }
   </style>
</head>

<body
   style="margin:0;background:transparent;font-family:monospace,sans-serif;color:#eee;touch-action:manipulation;cursor:crosshair">
   <div style="width:100%;max-width:620px;margin:auto;padding:12px">

      <!-- Container Utama (#222222) -->
      <div
         style="background:#222222;border:1px solid #333333;border-radius:14px;padding:14px;box-shadow:0 10px 30px rgba(0,0,0,.6)">

         <!-- Header Minimalis -->
         <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;padding:0 2px">
            <div style="font-size:16px;font-weight:900;letter-spacing:1px;color:#ffffff">STRIKER</div>
            <div style="font-size:13px;color:#888888">
               <span id="score" style="color:#ffffff;font-weight:900;font-size:16px">00000</span>
               <span style="margin:0 4px;color:#444">/</span>
               <span id="best">HI 00000</span>
            </div>
         </div>

         <!-- Arena Game Canvas -->
         <canvas id="game" width="560" height="300"
            style="width:100%;height:auto;background:#161616;border:1px solid #2d2d2d;border-radius:10px;display:block"></canvas>

         <!-- Tombol Gerak Kiri & Kanan (Sedang) -->
         <div style="margin-top:10px;display:flex;gap:10px">
            <button id="btnLeft" class="ctrl-btn">◀</button>
            <button id="btnRight" class="ctrl-btn">▶</button>
         </div>

      </div>
   </div>

   <script>
const c = document.getElementById('game')
const x = c.getContext('2d')
const scoreEl = document.getElementById('score')
const bestEl = document.getElementById('best')
const btnLeft = document.getElementById('btnLeft')
const btnRight = document.getElementById('btnRight')

let p, bullets, enemies, shards, particles, stars, score, best = 0, speed, gameOver, last, shake, flash, runT, spawnTimer, shootTimer
let moveLeft = false, moveRight = false

// === SISTEM SUARA (WEB AUDIO API) ===
let actx
function initAudio() {
  if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)()
  if (actx.state === 'suspended') actx.resume()
}
function playTone(freq1, freq2, type, dur, vol = 0.08) {
  if (!actx) return
  try {
    const osc = actx.createOscillator()
    const gain = actx.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(freq1, actx.currentTime)
    if (freq2) osc.frequency.exponentialRampToValueAtTime(freq2, actx.currentTime + dur)
    gain.gain.setValueAtTime(vol, actx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + dur)
    osc.connect(gain)
    gain.connect(actx.destination)
    osc.start()
    osc.stop(actx.currentTime + dur)
  } catch (e) {}
}

const sndShoot = () => playTone(850, 300, 'square', 0.04, 0.04)
const sndHit = () => playTone(300, 80, 'sawtooth', 0.08, 0.08)
const sndExplode = () => playTone(140, 40, 'sawtooth', 0.22, 0.15)
const sndCollect = () => {
  playTone(650, 900, 'sine', 0.05, 0.1)
  setTimeout(() => playTone(900, 1350, 'sine', 0.08, 0.1), 35)
}
const sndOver = () => playTone(180, 25, 'sawtooth', 0.4, 0.25)

// === PERSISTENSI HIGH SCORE ===
function loadBest() {
  let vals = []
  try { let v = localStorage.getItem('stk_best'); if (v) vals.push(parseInt(v, 10)) } catch(e) {}
  try { let v = sessionStorage.getItem('stk_best'); if (v) vals.push(parseInt(v, 10)) } catch(e) {}
  try { let m = document.cookie.match(/(?:^|;s*)stk_best=(d+)/); if (m) vals.push(parseInt(m[1], 10)) } catch(e) {}
  return vals.length ? Math.max(...vals.filter(v => !isNaN(v))) : 0
}

function saveBest(v) {
  let val = String(Math.floor(v))
  try { localStorage.setItem('stk_best', val) } catch(e) {}
  try { sessionStorage.setItem('stk_best', val) } catch(e) {}
  try { document.cookie = 'stk_best=' + val + ';max-age=31536000;path=/' } catch(e) {}
  try {
    let rq = indexedDB.open('stk_db', 1)
    rq.onupgradeneeded = () => rq.result.createObjectStore('kv')
    rq.onsuccess = () => { try { rq.result.transaction('kv', 'readwrite').objectStore('kv').put(val, 'stk_best') } catch(e) {} }
  } catch(e) {}
}

best = loadBest()

function reset() {
  p = { x: c.width / 2, y: 255, w: 22, h: 20, targetX: c.width / 2, triple: 0 }
  bullets = []
  enemies = []
  shards = []
  particles = []
  moveLeft = false
  moveRight = false
  if (!stars) {
    stars = []
    for (let i = 0; i < 35; i++) {
      stars.push({ x: Math.random() * c.width, y: Math.random() * c.height, r: 1 + Math.random() * 1.5, vy: 0.8 + Math.random() * 1.8 })
    }
  }
  score = 0
  speed = 1.0
  gameOver = false
  last = 0
  shake = 0
  flash = 0
  runT = 0
  spawnTimer = 40
  shootTimer = 0
  bestEl.textContent = 'HI ' + String(Math.floor(best)).padStart(5, '0')
}

function burst(px, py, n, col, spd) {
  for (let i = 0; i < n; i++) {
    particles.push({ x: px, y: py, vx: (Math.random() - .5) * spd, vy: (Math.random() - .5) * spd, life: 1, col, size: 2 + Math.random() * 2 })
  }
}

function spawnEnemy() {
  let isBig = Math.random() < 0.25
  let ew = isBig ? 24 : 16
  let eh = isBig ? 24 : 16
  let hp = isBig ? 3 : 1
  enemies.push({
    x: 20 + Math.random() * (c.width - 40 - ew),
    y: -30,
    w: ew,
    h: eh,
    hp: hp,
    maxHp: hp,
    vy: (isBig ? 1.2 : 2.0) + speed * 0.35,
    isBig: isBig,
    ph: Math.random() * 10
  })
}

function drawPlayer() {
  x.save()
  x.translate(p.x, p.y)

  // Api pendorong (thruster)
  x.fillStyle = Math.random() < 0.5 ? '#38bdf8' : '#ffffff'
  x.beginPath()
  x.moveTo(-4, 10)
  x.lineTo(0, 16 + Math.random() * 6)
  x.lineTo(4, 10)
  x.fill()

  // Badan pesawat
  x.fillStyle = '#ffffff'
  x.beginPath()
  x.moveTo(0, -10)
  x.lineTo(11, 10)
  x.lineTo(0, 6)
  x.lineTo(-11, 10)
  x.closePath()
  x.fill()

  // Kokpit
  x.fillStyle = p.triple > 0 ? '#38bdf8' : '#222222'
  x.beginPath()
  x.arc(0, 0, 3, 0, 7)
  x.fill()

  x.restore()
}

function draw() {
  x.clearRect(0, 0, c.width, c.height)
  x.save()
  if (shake > 0) x.translate((Math.random() - .5) * shake, (Math.random() - .5) * shake)

  // Bintang Latar
  stars.forEach(s => {
    x.fillStyle = 'rgba(255,255,255,' + (s.r * 0.25) + ')'
    x.fillRect(s.x, s.y, s.r, s.r)
  })

  // Peluru
  x.fillStyle = '#38bdf8'
  bullets.forEach(b => {
    x.fillRect(b.x - 1.5, b.y - 4, 3, 8)
  })

  // Shards (Kristal Energi)
  shards.forEach(s => {
    x.fillStyle = '#38bdf8'
    let bob = Math.sin(runT * 0.1 + s.x) * 2
    x.fillRect(s.x - 4, s.y + bob - 4, 8, 8)
    x.fillStyle = '#ffffff'
    x.fillRect(s.x - 1.5, s.y + bob - 1.5, 3, 3)
  })

  // Musuh (Enemies)
  enemies.forEach(e => {
    x.fillStyle = e.isBig ? '#e11d48' : '#f43f5e'
    if (e.isBig) {
      x.beginPath()
      x.moveTo(e.x + e.w / 2, e.y)
      x.lineTo(e.x + e.w, e.y + e.h / 2)
      x.lineTo(e.x + e.w / 2, e.y + e.h)
      x.lineTo(e.x, e.y + e.h / 2)
      x.closePath()
      x.fill()
    } else {
      x.fillRect(e.x, e.y, e.w, e.h)
    }

    if (e.hp > 1) {
      x.fillStyle = '#ffffff'
      x.fillRect(e.x + e.w / 2 - 2, e.y + e.h / 2 - 2, 4, 4)
    }
  })

  // Partikel
  particles.forEach(pt => {
    x.fillStyle = 'rgba(' + pt.col + ',' + Math.max(pt.life, 0) + ')'
    x.fillRect(pt.x, pt.y, pt.size, pt.size)
  })

  if (!gameOver) drawPlayer()

  if (flash > 0) {
    x.fillStyle = 'rgba(244,63,94,' + (flash * .4) + ')'
    x.fillRect(0, 0, c.width, c.height)
  }
  x.restore()

  // Layar Game Over
  if (gameOver) {
    x.fillStyle = 'rgba(22,22,22,.85)'
    x.fillRect(0, 0, c.width, c.height)
    x.fillStyle = '#ffffff'
    x.textAlign = 'center'
    x.font = '900 24px monospace'
    x.fillText('OVER', c.width / 2, 135)
    x.font = '13px monospace'
    x.fillStyle = '#888888'
    x.fillText('RETRY', c.width / 2, 165)
    x.textAlign = 'left'
  }
}

function loop(t) {
  if (!last) last = t
  let dt = Math.min((t - last) / 16.67, 2)
  last = t
  runT += dt

  if (!gameOver) {
    // Gerak dari Tombol (Continuous Hold)
    if (moveLeft) p.targetX -= 12 * dt
    if (moveRight) p.targetX += 12 * dt

    // Pergerakan Halus Pesawat
    p.targetX = Math.max(16, Math.min(c.width - 16, p.targetX))
    p.x += (p.targetX - p.x) * 0.35 * dt
    p.x = Math.max(16, Math.min(c.width - 16, p.x))

    if (p.triple > 0) p.triple -= dt

    // Auto Tembak
    shootTimer -= dt
    if (shootTimer <= 0) {
      shootTimer = p.triple > 0 ? 8 : 11
      sndShoot()
      if (p.triple > 0) {
        bullets.push({ x: p.x - 6, y: p.y - 10, vy: -10 })
        bullets.push({ x: p.x + 6, y: p.y - 10, vy: -10 })
        bullets.push({ x: p.x, y: p.y - 12, vy: -10 })
      } else {
        bullets.push({ x: p.x, y: p.y - 10, vy: -9.5 })
      }
    }

    // Bintang Latar
    stars.forEach(s => {
      s.y += s.vy * dt
      if (s.y > c.height) { s.y = 0; s.x = Math.random() * c.width }
    })

    // Peluru
    bullets.forEach(b => { b.y += b.vy * dt })
    bullets = bullets.filter(b => b.y > -20)

    // Spawn Musuh
    spawnTimer -= dt
    if (spawnTimer <= 0) {
      spawnEnemy()
      spawnTimer = Math.max(22, 50 - speed * 10) + Math.random() * 20
    }

    // Update Musuh
    enemies.forEach(e => {
      e.y += e.vy * dt
      if (e.isBig) e.x += Math.sin(runT * 0.08 + e.ph) * 1.2 * dt
    })

    // Update Shards
    shards.forEach(s => { s.y += 1.8 * dt })
    shards.forEach(s => {
      let dist = Math.hypot(p.x - s.x, p.y - s.y)
      if (!s.collected && dist < 20) {
        s.collected = true
        score += 100
        p.triple = 280
        sndCollect()
        burst(s.x, s.y, 8, '56,189,248', 3)
      }
    })
    shards = shards.filter(s => s.y < c.height + 20 && !s.collected)

    // Deteksi Peluru Menabrak Musuh
    bullets.forEach((b) => {
      enemies.forEach((e) => {
        if (b.x > e.x && b.x < e.x + e.w && b.y > e.y && b.y < e.y + e.h) {
          b.hit = true
          e.hp--
          sndHit()
          burst(b.x, b.y, 3, '255,255,255', 2)
          if (e.hp <= 0) {
            e.dead = true
            score += e.isBig ? 150 : 50
            sndExplode()
            shake = 8
            burst(e.x + e.w / 2, e.y + e.h / 2, e.isBig ? 16 : 10, '244,63,94', 4)
            if (Math.random() < 0.35) {
              shards.push({ x: e.x + e.w / 2, y: e.y + e.h / 2, collected: false })
            }
          }
        }
      })
    })
    bullets = bullets.filter(b => !b.hit)
    enemies = enemies.filter(e => !e.dead && e.y < c.height + 40)

    // Deteksi Musuh Menabrak Pesawat
    for (const e of enemies) {
      if (p.x + 8 > e.x && p.x - 8 < e.x + e.w && p.y + 8 > e.y && p.y - 8 < e.y + e.h) {
        gameOver = true
        shake = 18
        flash = 1
        sndOver()
        saveBest(best)
        burst(p.x, p.y, 25, '244,63,94', 6)
        burst(p.x, p.y, 15, '56,189,248', 4)
      }
    }

    // Update Skor
    speed = Math.min(3.5, speed + 0.0008 * dt)
    score += dt * 0.4
    if (score > best) best = score

    scoreEl.textContent = String(Math.floor(score)).padStart(5, '0')
    bestEl.textContent = 'HI ' + String(Math.floor(best)).padStart(5, '0')

    particles.forEach(pt => { pt.x += pt.vx * dt; pt.y += pt.vy * dt; pt.life -= 0.04 * dt })
    particles = particles.filter(pt => pt.life > 0)
  }

  if (shake > 0) shake = Math.max(0, shake - 0.7 * dt)
  if (flash > 0) flash = Math.max(0, flash - 0.05 * dt)

  draw()
  requestAnimationFrame(loop)
}

// === HANDLER TOMBOL GERAK (HOLD & TOUCH FRIENDLY) ===
function bindBtn(btn, onDown, onUp) {
  const start = e => {
    e.preventDefault()
    initAudio()
    if (gameOver) { reset(); return }
    onDown()
  }
  const end = e => {
    e.preventDefault()
    onUp()
  }
  btn.addEventListener('pointerdown', start)
  btn.addEventListener('pointerup', end)
  btn.addEventListener('pointerleave', end)
  btn.addEventListener('pointercancel', end)
}

bindBtn(btnLeft, () => moveLeft = true, () => moveLeft = false)
bindBtn(btnRight, () => moveRight = true, () => moveRight = false)

// Kontrol Langsung Canvas (Geser / Sentuh / Klik)
function setTargetByPos(clientX) {
  initAudio()
  const rect = c.getBoundingClientRect()
  const scale = c.width / rect.width
  p.targetX = (clientX - rect.left) * scale
}

c.addEventListener('pointerdown', e => {
  if (gameOver) { initAudio(); reset(); return }
  setTargetByPos(e.clientX)
})
c.addEventListener('pointermove', e => {
  if (e.buttons > 0 || e.pointerType === 'touch') {
    setTargetByPos(e.clientX)
  }
})

// Kontrol Keyboard (A / D / Panah Kiri / Panah Kanan)
window.addEventListener('keydown', e => {
  initAudio()
  if (gameOver && (e.code === 'Space' || e.code === 'Enter')) { reset(); return }
  if (e.code === 'ArrowLeft' || e.code === 'KeyA') moveLeft = true
  if (e.code === 'ArrowRight' || e.code === 'KeyD') moveRight = true
})
window.addEventListener('keyup', e => {
  if (e.code === 'ArrowLeft' || e.code === 'KeyA') moveLeft = false
  if (e.code === 'ArrowRight' || e.code === 'KeyD') moveRight = false
})

reset()
requestAnimationFrame(loop)
   </script>
</body>

</html>`
                const unifiedData = {
            response_id: crypto.randomUUID(),
            sections: [{
                view_model: {
                    primitive: {
                        __typename: 'GenAIaeacdsnwHtmlPrimitive',
                        payload: strikerHtml,
                        trusted_sources: ['zone.api.br'],
                    },
                    __typename: 'GenAISingleLayoutViewModel',
                },
            }],
        };

        const payload = {
            messageContextInfo: {
                deviceListMetadata: {},
                deviceListMetadataVersion: 2,
                botMetadata: {
                    messageDisclaimerText: '',
                    botResponseId: crypto.randomUUID(),
                    verificationMetadata: {
                        proofs: [{
                            version: 1,
                            useCase: 1,
                            signature: 'TklYRUwuTWVzc2FnZUJ1aWxkZXJWNC43LVZlcmlmaWNhdGlvblNpZ25hdHVyZS5NZXRhZGF0YeN55YRyad2+ZA==',
                            certificateChain: [
                                'TklYRUwuTWVzc2FnZUJ1aWxkZXJWNC43LUNlcnRpZmljYXRlQ2hhaW4uTWV0YWRhdGEOvtJr968bbpKdZreOTwkk9aPN++XPE60RfuzNLkXXc7LE8BOkJOWRpo2oNXaRJ3uCNJ43HY3A+oetnvHSfcxWqmvvTSrBOI5V1NOD6RMsZ/st1XVPUx83AGps1l5jYBOYzqMNy6un2tToJ2Bt9bXRo29tWLZTu8m7TNY/hISwVpVc5tjSet5U7btPN+dMIx2UvykB1jcbWGsdklheeuz8RXSStNXzeaGvsf1lpZ/ugLE4b2BdmlRNKrY6zLE4qFtRYQoS7axOyQX+4QUyN2m9bfm7urQmn+QRSXJwMO7X5kAJJLbkVGJFt9Pm9VXPwQVrK2aaqiXlpusj+7DfDw00OULmYMmZDTqXM0nUVLxj13z0LhMQoQhhNG8utdUn4uKOFceliTZ/xiP+A54GnX9620641bqw3ctfh9NNXPsTEK8hAUD7FDqUhVntHmoEYYEHq8X1tHHZYP49/f2iezTiE8AUaoZo42/jIWQIKohOGNUib2hEqMkW8NsR8vPihvNuqPc0zKZcl6359YFQdjiiW8kCRD/rsDOr9v1eYLFZKYloFyzFqEgj+jcG/V47elOjShJ5CCPwatXwP6HIloVwtgygFsnOFmCg6Ojoivfoz8Nw1qxFwg5OU2cq/1WbWNELKnaFg4eUWCAIJ/3ZIJsEPkgemZxGhE+hdiNn9dkQYBJs1kx2BxdIkJmQ9vJSKkrMz6lTxZM3IJ9mhmKS6zYdU1ppeAao0/ayte997DQParb/AHLN79g0iW1ad0z8ir5jAl0q3a+UZPTSa4YiSqC2PZ/gfxG5wvL2mKmeKowG0RXjmEp5iNxrni+T/HRLZOoH7y0DQ24nMCPg',
                                'TklYRUwuTWVzc2FnZUJ1aWxkZXJWNC43LUNlcnRpZmljYXRlQ2hhaW4uTWV0YWRhdGHsL0Ccm0ELINFZ2IaBhKaeWnVuh0o6nZLCioCn9xpSADzwIS5VCWO+1eVXT2atJOyf7FYlpB0/JA3Us+aQtekuIkHu/zBXijORZ4ClF4+sF3cSTNg6gY/+6iwLK/zs3bMg+GeJrcI65vXfs95Shxlb2Rd5GRT2/2yBmR6Zkf5QwMJuptUHWtM26WY7/xlkEKGFYDZVqOSylusiOzSALa815zC6dCiHoJNLBEKMlaZZQOk57/+OYoU5zzTaEgLhyvNFHSyAlyLQ3SGFtVHAaJZHSmmSPyJowCOB+92Gkk6SWVMsk6FbU8QJWFtlhzV/W/gZ7WzUlS/AKgN0th9/cq20ToFkW7X9c+rtYavufmuieqFhXgaMD8AGsoN9QC/HzNC9D1nydPfFYEUr9BHVy2nF5gM58Y59r2rT8p5LPARIkUp8g+5DLhyW0tdZFZ1305o4AHCayZnp5rjcU2Xi/c1Qf/djBGakmijlMs4aMzKJYD0c4Q8jdI7sNyd876K2wRD+L6KeD2QB3PtCS4P7BWAl5gh5CJ6ZBrwcaKXZqcSjEwm52MqVCgYZdapAaNYUy/QndttjLOG0wxxwuX1hIhMjPnIKZR1kwnqD5EqlHpilrnojRZvjVGN4zEKmilS8rNstt4HHs/D849W+Q6LRVWiWMs0cT2IugrX+Skxd8En7Gq52UEmuVBrSTpN+UpIu20NsVb9lsvuYh3XO441606tOEY2eKcZJdTtqrOTNqbbTk0zVn1yhbOCvmfctBNDhTwaC5QMi0P9wjU5XI9SBtkdQLizc5oqpoiHeqgb8+aJHVLcbgIJ/KLZKtRWFDfzRNM02Csx4etUUapVd2NA/L0oMs/O5T9sVj9FBJ7q99GWr3PVmxJb36mHZLXC4k1gGN9swE0LtzYsUdT5tUo9ri/hS3W/SM+F1p4Kh4QIgRcG3ciIHGN44bnDh3HDCz0fDnzKYw0bclMxZPctEyJ5gEOPF6OAkjD9dEaRGq/tEPf1k9Aub+v2dEjnfrYWAm4E5Zfhs2Xh0CT0k+SzhgKd0K/46ChJ20G5+blwpIvahvTVS68+aVIX6CwXs4tcVx6FnmVsMOOkIasfaqQLZYbNBkuLoZnQAq4j8yRekrQ==',
                            ],
                        }],
                    },
                },
            },
            botForwardedMessage: {
                message: {
                    richResponseMessage: {
                        messageType: 1,
                        submessages: [{ messageType: 2, messageText: 'TicTacToe' }],
                        unifiedResponse: {
                            data: Buffer.from(JSON.stringify(unifiedData)).toString('base64'),
                        },
                        contextInfo: {
                            forwardingScore: 1,
                            isForwarded: true,
                            forwardedAiBotMessageInfo: { botJid: '867051314767696@bot' },
                            forwardOrigin: 4,
                        },
                    },
                },
            },
        };

        m = generateWAMessageFromContent(msg.chat, payload, { quoted: msg });
            } else {   
                return msg.reply('《✧》 Escoga una opcion valida.')
            }
            if (m) {
                return sock.relayMessage(msg.chat, m.message, { messageId: m.key.id });
            }

        } catch (e) {
            await msg.reply(getMessage(userLang, 'commandError', { command, error: e }))
        }
    }
}
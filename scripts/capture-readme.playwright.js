async page => {
 const base='http://127.0.0.1:8766/kelip-wm-state/';
 await page.setViewportSize({width:1280,height:800});
 const counters={flow:0,depth:0,mpc:0};
 async function snap(group){await page.waitForTimeout(180);await page.screenshot({path:'.readme-frames/'+group+'_'+String(counters[group]++).padStart(3,'0')+'.png'});}
 async function ready(){await page.waitForFunction(()=>document.querySelector('#deck').contentWindow?.wmLive?.state().regions===13&&document.querySelector('#loading').style.opacity==='0');await page.waitForTimeout(400);}
 await page.goto(base);await page.waitForTimeout(500);await page.screenshot({path:'.readme-frames/home.png',fullPage:true});
 await page.goto(base+'?v=20261024-nav6#4/18');await ready();
 for(let phase=0;phase<9;phase++){await page.evaluate(k=>document.querySelector('#deck').contentWindow.wmLive.seek(k),phase);await snap('flow');}
 await page.evaluate(()=>document.querySelector('#deck').contentWindow.wmLive.seek(0));await snap('depth');
 await page.frameLocator('#deck').locator('.slide.active button[data-label="训练 · VAE Encoder"]').click();await snap('depth');
 await page.locator('#popupDeep').click();await page.waitForSelector('#mu');await snap('depth');
 await page.locator('.topic-diagram').scrollIntoViewIfNeeded();await snap('depth');
 await page.locator('#submodules').scrollIntoViewIfNeeded();await snap('depth');
 await page.locator('.depth-parent').filter({hasText:'重参数化'}).click();await snap('depth');
 await page.locator('#lab').scrollIntoViewIfNeeded();await page.locator('#mu').fill('1');await snap('depth');
 await page.locator('#returnLink').click();await ready();await snap('depth');
 await page.goto(base+'module.html?id=mpc');await page.locator('#lab').scrollIntoViewIfNeeded();await snap('mpc');
 for(let i=0;i<3;i++){await page.locator('#planNow').click();await snap('mpc');await page.locator('#actNow').click();await snap('mpc');}
 await page.locator('#disturb').click();await snap('mpc');await page.locator('#planNow').click();await snap('mpc');await page.locator('#actNow').click();await snap('mpc');
 await page.goto(base+'library.html?paper=dreamzero');await page.waitForSelector('#paper-dreamzero[open]');await page.waitForTimeout(300);await page.screenshot({path:'.readme-frames/library.png'});
 await page.setViewportSize({width:390,height:844});await page.goto(base+'?v=20261024-nav6#4/18');await ready();await page.screenshot({path:'.readme-frames/mobile.png'});
 return counters;
}

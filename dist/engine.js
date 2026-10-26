export const sum=(xs,key)=>xs.reduce((n,x)=>n+(x[key]||0),0);
export const pct=(a,b)=>b?Math.round(a/b*1000)/10:0;
export const score=r=>r.likelihood*r.impact;
export const overdue=(x,date)=>x.status!=='Closed'&&x.status!=='Complete'&&x.status!=='Attested'&&x.due<date;
export function validate(d){
  const ids=new Set();for(const key of ['risks','controls','findings','monitoring','outcomes','changes','privacy','fincrime','attestations','issues'])for(const x of d[key]){if(ids.has(x.id))throw Error('Duplicate '+x.id);ids.add(x.id);}
  for(const c of d.controls){if(!d.risks.some(r=>r.id===c.riskId)||c.failed>c.tested)throw Error('Invalid control '+c.id);}
  for(const f of d.findings){if(!d.controls.some(c=>c.id===f.controlId))throw Error('Unlinked finding');if(f.status==='Closed'&&(!f.evidence.length||!f.approvedBy||!f.reviewed))throw Error('Unsupported closure');}
  for(const o of d.outcomes)if(o.qaPassed>o.qaTested||o.vulnerableGood>o.vulnerableTested||o.upheld>o.complaints)throw Error('Invalid denominator');return true;
}
export function metrics(d,date=d.meta.asOf){
  const month=date.slice(0,7),rows=d.outcomes.filter(o=>o.month===month);
  const active=d.findings.filter(f=>f.opened<=date&&(!f.closedAt||f.closedAt>date));
  const tested=d.controls.filter(c=>c.date<=date&&c.date.slice(0,7)===month);
  const actions=[...d.findings.filter(f=>f.opened<=date),...d.changes.filter(c=>c.published<=date),...d.privacy,...d.fincrime,...d.attestations,...d.issues];
  return {open:active.length,high:active.filter(f=>f.severity==='High').length,overdue:active.filter(f=>f.due<date).length,allOverdue:actions.filter(x=>overdue(x,date)).length,awaitingEvidenceReview:active.filter(f=>f.status==='Evidence submitted').length,tested:sum(tested,'tested'),failed:sum(tested,'failed'),controlPass:pct(sum(tested,'tested')-sum(tested,'failed'),sum(tested,'tested')),qaTested:sum(rows,'qaTested'),qaPassed:sum(rows,'qaPassed'),qa:pct(sum(rows,'qaPassed'),sum(rows,'qaTested')),complaints:sum(rows,'complaints'),upheld:sum(rows,'upheld'),vulnerableTested:sum(rows,'vulnerableTested'),vulnerableGood:sum(rows,'vulnerableGood'),vulnerable:pct(sum(rows,'vulnerableGood'),sum(rows,'vulnerableTested'))};
}
export function actionQueue(d){return [...d.findings.map(x=>({...x,module:'Monitoring'})),...d.changes.map(x=>({...x,module:'Regulatory change'})),...d.privacy.map(x=>({...x,module:'Privacy'})),...d.fincrime.map(x=>({...x,module:'Financial crime'})),...d.attestations.map(x=>({...x,module:'Governance'})),...d.issues.map(x=>({...x,module:'Governance'}))].filter(x=>!['Closed','Attested'].includes(x.status)).sort((a,b)=>a.due.localeCompare(b.due)||a.id.localeCompare(b.id));}
export function brief(d,period='Monthly'){
  const m=metrics(d),p=metrics(d,d.meta.previousAsOf);const priorities=d.risks.toSorted((a,b)=>score(b)-score(a)).slice(0,3);
  return {title:`${period} compliance oversight briefing`,asOf:d.meta.asOf,status:'Draft — human approval required',method:'Deterministic template • no LLM/API call',sections:[
    {title:'Executive assessment',text:`${m.open} monitoring findings remain open, including ${m.high} high-severity findings. ${m.overdue} monitoring actions are overdue; ${m.allOverdue} overdue items sit across the full action queue. Escalate ownership and recovery dates for review.`,sources:'F01–F08; RC01–RC03; P01–P03; FC01–FC03; AT01–AT02; I01'},
    {title:'What changed since 30 September',text:`Open monitoring findings moved from ${p.open} to ${m.open}. QA pass rate moved from ${p.qa}% to ${m.qa}% (${m.qaPassed}/${m.qaTested} current-period tests). Complaints in the synthetic samples moved from ${p.complaints} to ${m.complaints}. Cohort composition and sample limits must be reviewed before drawing conclusions.`,sources:'Finding opened/closedAt history; O01–O06'},
    {title:'Customer outcomes & emerging themes',text:`Vulnerable-customer good outcomes: ${m.vulnerable}% (${m.vulnerableGood}/${m.vulnerableTested}), compared with ${p.vulnerable}% previously. ${m.upheld} of ${m.complaints} complaints were upheld. Support hand-offs and complaint root-cause consistency warrant targeted review; these are sample signals, not population estimates.`,sources:'O01–O06; F01; F02; F07'},
    {title:'Monitoring priorities',text:`Prioritise ${priorities.map(r=>`${r.name} (${score(r)}/25; ${r.id})`).join('; ')}. Control testing recorded ${m.failed} exceptions across ${m.tested} tests. ${m.awaitingEvidenceReview} finding(s) await evidence review. Agree retest scope and independent challenge before closure.`,sources:'R01–R06; C01–C06; F04; M07–M08'},
    {title:'Governance decisions requested',text:'Confirm recovery dates for overdue items; review potential conduct issue I01; obtain specialist privacy and financial-crime input; validate fictional regulatory interpretations before action. Approve this briefing only after reviewing source registers. No breach, reportability or legal conclusion is automated.',sources:'Action queue; I01; RC01–RC03; AT01–AT02'}]};
}
export function closeFinding(d,id,reviewer,note){const f=d.findings.find(x=>x.id===id);if(!f||f.status!=='Evidence submitted'||!f.evidence.length)throw Error('Closure requires submitted evidence.');if(!f.reviewed)throw Error('Finding requires human validation first.');if(!reviewer.trim()||reviewer.trim().toLowerCase()===f.owner.toLowerCase()||note.trim().length<20)throw Error('Independent reviewer and a rationale of at least 20 characters required.');f.status='Closed';f.approvedBy=reviewer.trim();f.closedAt=d.meta.asOf;return f;}

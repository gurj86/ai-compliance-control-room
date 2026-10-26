import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {metrics,brief,validate,closeFinding,actionQueue,overdue,pct} from '../dist/engine.js';
const seed=JSON.parse(await readFile(new URL('../dist/data.json',import.meta.url)));
test('synthetic fixture is valid and every monitoring finding traces to a risk',()=>assert.equal(validate(seed),true));
test('October metrics reconcile to independently counted fixture totals',()=>{
 const m=metrics(seed);assert.deepEqual(m,{open:6,high:3,overdue:3,allOverdue:5,awaitingEvidenceReview:1,tested:200,failed:27,controlPass:86.5,qaTested:145,qaPassed:126,qa:86.9,complaints:40,upheld:19,vulnerableTested:40,vulnerableGood:30,vulnerable:75});
});
test('previous snapshot respects opening and closure history and sample period',()=>{const m=metrics(seed,'2026-09-30');assert.equal(m.open,3);assert.equal(m.qaPassed,130);assert.equal(m.qa,89.7);assert.equal(m.complaints,32);assert.equal(m.vulnerable,85)});
test('closure blocks missing evidence, unvalidated findings and owner self-approval',()=>{
 const d=structuredClone(seed);assert.throws(()=>closeFinding(d,'F01','Independent reviewer','Sufficient rationale recorded for independent review.'),/evidence/);
 assert.throws(()=>closeFinding(d,'F04','Privacy Lead','Sufficient rationale recorded for independent review.'),/Independent/);
 assert.throws(()=>closeFinding(d,'F04','Other','Too short'),/rationale/);
 d.findings.find(f=>f.id==='F04').reviewed=false;assert.throws(()=>closeFinding(d,'F04','Other','Sufficient rationale for independent review.'),/validation/);
});
test('evidenced independent closure recalculates dashboard and briefing from same state',()=>{
 const d=structuredClone(seed);closeFinding(d,'F04','Demo Independent Reviewer','Additional independent retest completed; scope and limitations reviewed.');
 assert.equal(metrics(d).open,5);assert.equal(metrics(d).overdue,2);assert.equal(metrics(d).allOverdue,4);assert.equal(metrics(d).awaitingEvidenceReview,0);
 assert.match(brief(d).sections[0].text,/5 monitoring findings remain open/);assert.equal(actionQueue(d).some(x=>x.id==='F04'),false);
});
test('all-queue overdue counts reconcile; due today is not overdue',()=>{assert.equal(actionQueue(seed).filter(x=>overdue(x,seed.meta.asOf)).length,5);assert.equal(overdue({status:'Open',due:'2026-10-26'},'2026-10-26'),false);assert.equal(pct(0,0),0)});
test('briefing is a draft with source references and no invented metric values',()=>{const b=brief(seed);assert.match(b.method,/no LLM/);assert.match(b.status,/human approval/);assert.match(b.sections[1].text,/89.7% to 86.9%/);assert.match(b.sections[2].text,/30\/40/);assert.ok(b.sections.every(s=>s.sources));});

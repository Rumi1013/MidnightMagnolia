import test from "node:test";
import assert from "node:assert/strict";
import {
  duplicateKey,
  transitionScore,
  csvRows,
  mergeAchievementSeed,
  migrateState,
  normalizeAchievement,
  normalizeOpportunity,
  filterAchievements,
  listProofGaps,
  extractPostingKeywords,
  analyzeAts,
  validateImport
} from "../app.js";

test("duplicate keys prefer requisition IDs", () => {
  assert.equal(duplicateKey({requisitionId:"REQ-123",company:"A",title:"B",location:"C"}),"req123");
});

test("duplicate keys normalize company, title, and location", () => {
  assert.equal(duplicateKey({company:"Bank of America",title:"Senior BA",location:"Charlotte, NC"}),duplicateKey({company:"BANK-OF-AMERICA",title:"Senior B.A.",location:"Charlotte NC"}));
});

test("transition score rewards coverage and fit", () => {
  const profile={fixedMonthlyObligations:2739.5,monthlyLivingEstimate:1800,monthlyMarginTarget:1000,taxRateEstimate:.27};
  const market={rentReference:1700};
  const low=transitionScore({salaryMax:95000,fitScore:60,relocation:0,signOn:0},profile,market);
  const high=transitionScore({salaryMax:145000,fitScore:90,relocation:5000,signOn:5000},profile,market);
  assert.ok(high>low);
});

test("CSV output escapes quotes and includes evidence IDs", () => {
  const csv = csvRows([{id:"1",company:'A "Co"',title:"Role",evidenceIds:["ACH-001","ACH-004"]}]);
  assert.match(csv,/"A ""Co"""/);
  assert.match(csv,/ACH-001\|ACH-004/);
});

test("achievement migration replaces placeholders, adds new records, and preserves edits", () => {
  const current=[
    {id:"ACH-001",metrics:"Add verified figures"},
    {id:"ACH-002",metrics:"User-confirmed custom metric",supportedClaim:"Keep my claim"},
    {id:"ACH-CUSTOM",metrics:"Custom evidence"}
  ];
  const seeded=[
    {id:"ACH-001",metrics:"$1.1M+ secured",evidenceType:"self-reported",verificationStatus:"needs-verification"},
    {id:"ACH-002",metrics:"Seed metric",supportedClaim:"Seed claim",confidentiality:"excerpt"},
    {id:"ACH-003",metrics:"New evidence"}
  ];
  const merged = mergeAchievementSeed(current,seeded);
  assert.equal(merged.find(r=>r.id==="ACH-001").metrics,"$1.1M+ secured");
  assert.equal(merged.find(r=>r.id==="ACH-002").metrics,"User-confirmed custom metric");
  assert.equal(merged.find(r=>r.id==="ACH-002").supportedClaim,"Keep my claim");
  assert.equal(merged.find(r=>r.id==="ACH-002").confidentiality,"excerpt");
  assert.ok(merged.find(r=>r.id==="ACH-003"));
  assert.ok(merged.find(r=>r.id==="ACH-CUSTOM"));
});

test("migrateState upgrades v1 browser data without dropping opportunities", () => {
  const seed = {
    schemaVersion: 2,
    profile: {salaryTargetMin:1,salaryTargetMax:2,fixedMonthlyObligations:3,weeklyApplicationTarget:4,activeInterviewGoal:5},
    roleLanes: [{id:"business-systems",name:"Business",titles:["BA"]}],
    resumes: [],
    achievements: [{id:"ACH-001",title:"T",summary:"S",evidencePath:"p",metrics:"Add verified figures"}],
    markets: [{id:"charlotte",name:"Charlotte",salaryFloor:1,rentReference:1,employers:[]}],
    opportunities: [],
    interviews: [],
    weeklySprints: [],
    templates: [],
    sources: []
  };
  const raw = {
    schemaVersion: 1,
    profile: {salaryTargetMin:105000,salaryTargetMax:135000,fixedMonthlyObligations:2739.5,weeklyApplicationTarget:10,activeInterviewGoal:3},
    opportunities: [{id:"OPP-0001",company:"Acme",title:"BA",location:"Charlotte, NC",status:"Research",nextAction:"Review",applicationNotes:"keep me"}],
    achievements: [{id:"ACH-001",title:"Old",summary:"Old summary",metrics:"User-confirmed custom metric",evidencePath:"old-path",approved:false}],
    interviews: [],
    templates: [],
    markets: seed.markets
  };
  const migrated = migrateState(raw, seed);
  assert.equal(migrated.schemaVersion, 2);
  assert.equal(migrated.opportunities[0].applicationNotes, "keep me");
  assert.deepEqual(migrated.opportunities[0].evidenceIds, []);
  assert.equal(migrated.achievements.find(a=>a.id==="ACH-001").metrics, "User-confirmed custom metric");
  assert.equal(migrated.achievements.find(a=>a.id==="ACH-001").verificationStatus, "needs-verification");
  assert.ok(Array.isArray(migrated.atsAnalyses));
});

test("normalizeAchievement fills evidence metadata defaults from approved flag", () => {
  const verified = normalizeAchievement({id:"ACH-X",title:"T",summary:"S",evidencePath:"p",approved:true});
  assert.equal(verified.verificationStatus, "verified");
  assert.equal(verified.evidenceType, "authored-work-sample");
  assert.equal(verified.sourcePath, "p");
});

test("filterAchievements supports lane, verification, capability, and use", () => {
  const rows = [
    normalizeAchievement({id:"1",title:"SQL work",summary:"db",evidencePath:"a",categories:["SQL"],targetRoleLanes:["data-reporting"],verificationStatus:"verified",confidentiality:"public",portfolioSuitable:true}),
    normalizeAchievement({id:"2",title:"Funding",summary:"money",evidencePath:"b",categories:["Funding"],targetRoleLanes:["program-operations"],verificationStatus:"needs-verification",confidentiality:"interview-only",portfolioSuitable:false})
  ];
  assert.equal(filterAchievements(rows,{lane:"data-reporting"}).length, 1);
  assert.equal(filterAchievements(rows,{verification:"needs-verification"}).length, 1);
  assert.equal(filterAchievements(rows,{capability:"SQL"}).length, 1);
  assert.equal(filterAchievements(rows,{use:"interview-only"}).length, 1);
  assert.equal(filterAchievements(rows,{use:"public"}).length, 1);
});

test("listProofGaps surfaces corroboration and gap types", () => {
  const gaps = listProofGaps([
    normalizeAchievement({id:"ACH-001",title:"A",summary:"s",evidencePath:"p",verificationStatus:"needs-verification",gapTypes:["attendance-reports"],corroborationNeeded:"Need attendance"}),
    normalizeAchievement({id:"ACH-007",title:"B",summary:"s",evidencePath:"p",verificationStatus:"verified",approved:true,gapTypes:[],corroborationNeeded:""})
  ]);
  assert.equal(gaps.length, 1);
  assert.equal(gaps[0].id, "ACH-001");
  assert.deepEqual(gaps[0].gapTypes, ["attendance-reports"]);
});

test("extractPostingKeywords separates required and preferred sections", () => {
  const text = `Required qualifications:\n- Stakeholder management\n- Program operations\nPreferred:\n- SQL\n- Change adoption`;
  const extracted = extractPostingKeywords(text);
  assert.ok(extracted.required.some(k=>/stakeholder/i.test(k)));
  assert.ok(extracted.preferred.some(k=>/sql/i.test(k)));
});

test("analyzeAts compares one résumé to one posting without inventing universal scores", () => {
  const resume = {id:"RES-001",name:"Flagship",version:"Master",keywords:["Program operations","Stakeholder management"],targetTitles:["Program Manager"],notes:"docx master",filePath:"resume.docx"};
  const opportunity = normalizeOpportunity({
    id:"OPP-0001",
    company:"Acme",
    title:"Program Manager",
    location:"Charlotte, NC",
    status:"Research",
    nextAction:"Apply",
    resumeId:"RES-001",
    postingText:"Required:\n- Stakeholder management\n- Program operations\n- Cloud architecture\nPreferred:\n- SQL\n- Change adoption",
    evidenceIds:["ACH-004"]
  });
  const achievements = [
    normalizeAchievement({id:"ACH-004",title:"SOP design",summary:"process",evidencePath:"x",approved:true,verificationStatus:"verified",categories:["Program operations","Stakeholder management"],supportedClaim:"Program operations and stakeholder management"})
  ];
  const analysis = analyzeAts({resume, opportunity, achievements});
  assert.equal(analysis.resumeId, "RES-001");
  assert.equal(analysis.opportunityId, "OPP-0001");
  assert.equal(analysis.method, "keyword-coverage-v1");
  assert.ok(analysis.analyzedAt);
  assert.ok(analysis.missingRequired.includes("Cloud architecture"));
  assert.ok(analysis.requiredCoveragePct < 100);
  assert.ok(analysis.findings.includes("Required keyword coverage"));
});

test("analyzeAts refuses to invent a score without posting keywords", () => {
  assert.throws(() => analyzeAts({
    resume:{id:"RES-001",keywords:["A"],filePath:"a.docx"},
    opportunity:normalizeOpportunity({id:"OPP-1",company:"A",title:"B",location:"C",status:"Research",nextAction:"x"}),
    achievements:[]
  }), /No universal ATS score/);
});

test("validateImport accepts v1 and v2 and rejects duplicates", () => {
  const base = {
    schemaVersion: 1,
    profile: {},
    markets: [],
    opportunities: [{id:"1",company:"A",title:"B",location:"C"}],
    interviews: [],
    templates: []
  };
  assert.equal(validateImport(base), true);
  assert.equal(validateImport({...base, schemaVersion:2}), true);
  assert.throws(() => validateImport({...base, opportunities:[base.opportunities[0], {...base.opportunities[0], id:"2"}]}), /Duplicate opportunity/);
});

test("opportunity evidence linking survives normalize and migrate", () => {
  const migrated = migrateState({
    schemaVersion: 1,
    profile: {salaryTargetMin:1,salaryTargetMax:2,fixedMonthlyObligations:3,weeklyApplicationTarget:4,activeInterviewGoal:5},
    opportunities: [{id:"OPP-1",company:"A",title:"B",location:"C",status:"Research",nextAction:"x",evidenceIds:["ACH-004","ACH-007"]}],
    interviews: [],
    templates: [],
    markets: [],
    achievements: []
  }, {
    profile: {salaryTargetMin:1,salaryTargetMax:2,fixedMonthlyObligations:3,weeklyApplicationTarget:4,activeInterviewGoal:5},
    achievements: [],
    resumes: [],
    roleLanes: [],
    markets: [],
    opportunities: [],
    interviews: [],
    weeklySprints: [],
    templates: [],
    sources: []
  });
  assert.deepEqual(migrated.opportunities[0].evidenceIds, ["ACH-004","ACH-007"]);
});

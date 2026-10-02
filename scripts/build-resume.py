#!/usr/bin/env python3
"""Render the editable resume with stdlib + existing Playwright/Chromium; no site dependencies.
Default output stays in docs/resume. --publish is blocked while facts need review.
"""
import argparse, html, json, pathlib, shutil, subprocess
ROOT = pathlib.Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--publish', action='store_true')
parser.add_argument('--playwright-module', default='playwright', help='Existing Playwright module specifier or absolute index.mjs path')
args = parser.parse_args()
data = json.loads((ROOT / 'docs/resume/resume.json').read_text())
if args.publish and data['reviewRequired']:
    parser.error('Resolve reviewRequired with Daniel before replacing the public PDF.')
esc = lambda value: html.escape(str(value), quote=True)
def bullets(items):
    return '<ul>' + ''.join('<li>' + esc(x) + '</li>' for x in items) + '</ul>'
parts = []
if data['reviewRequired']:
    parts.append('<div class="review">Review draft — dates and education details await confirmation. Not the public download.</div>')
parts += ['<h1>'+esc(data['name'])+'</h1>', '<div class="positioning">'+esc(data['positioning'])+'</div>', '<div class="role">'+esc(data['currentRole'])+'</div>', '<div class="contact">'+esc(data['contact'])+' · '+ ' '.join('<a href="'+esc(x['url'])+'">'+esc(x['label'])+'</a>' for x in data['links'])+'</div>', '<p class="summary">'+esc(data['summary'])+'</p>', '<h2>Experience</h2>']
for x in data['experience']:
    parts.append('<div class="entry"><div class="row"><span class="title">'+esc(x['organization'])+'</span> · '+esc(x['role'])+'<span class="date">'+esc(x['dates'])+'</span></div>'+bullets(x['bullets'])+'</div>')
parts.append('<h2>Selected projects</h2>')
for x in data['projects']:
    parts.append('<div class="entry"><div class="title"><a href="'+esc(x['url'])+'">'+esc(x['name'])+'</a> <span class="minor">· '+esc(x['descriptor'])+'</span></div>'+bullets(x['bullets'])+'</div>')
parts += ['<h2>Education & research</h2>']
for x in data['education']:
    status = '<div class="status">'+esc(x['status'])+'</div>' if x.get('displayStatus', True) and x['status'] else ''
    parts.append('<div class="education"><div class="row"><span><b>'+esc(x['program'])+'</b> · '+esc(x['institution'])+'</span><span class="date">'+esc(x['dates'])+'</span></div>'+status+'</div>')
parts += ['<p class="research"><b>'+esc(data['researchTitle'])+'</b> · MSc thesis</p>', '<p>'+esc(data['research'])+'</p>', '<h2>Selected learning / credentials</h2>']
registry = {x['id']: x for x in json.loads((ROOT/'data/certifications.json').read_text())}
selected = [registry[x] for x in data['credentialIds']]
assert len(selected) == 7 and len(set(data['credentialIds'])) == 7
parts.append('<div class="credentials">')
for x in selected:
    label = x['name']
    if x['id'] == 'anthropic-mcp-advanced': label = 'MCP: Advanced Topics (Anthropic)'
    if x['id'] == 'microsoft-ai-900': label = 'Microsoft Certified: Azure AI Fundamentals'
    kind = '' if 'Certificate' in label or 'Certified:' in label else ' · '+x['type'].lower()
    parts.append('<span>'+esc(label+kind+' ('+x['completedAt'][:4]+')')+'</span>')
parts.append('</div><p><b>Practice & tools:</b> '+esc(data['skills'])+'</p><p class="specialization"> <b>Specializations · focused study:</b> '+esc(data['specializations'])+'</p>')
assert len(data['specializationSlots']) == 2, 'Preserve exactly two intentional source slots.'
for x in data['specializationSlots']:
    if x['enabled']:
        assert x['title'].strip() and x['detail'].strip() and x['evidence'].strip(), 'Enabled specialization needs confirmed content and evidence.'
        parts.append('<p class="specialization"><b>'+esc(x['title'])+'</b> — '+esc(x['detail'])+'</p>')
rendered = (ROOT/'docs/resume/template.html').read_text().replace('{{content}}','\n'.join(parts))
output_html = ROOT/'docs/resume/Daniel_Rodriguez.review.html'
output_pdf = ROOT/'docs/resume/Daniel_Rodriguez.review.pdf'
output_html.write_text(rendered)
chrome = shutil.which('chromium') or shutil.which('google-chrome')
if not chrome: raise SystemExit('Install/use an existing Chromium executable to generate PDF; no PDF changed.')
renderer = """
const {chromium} = await import(process.argv[1]);
const browser = await chromium.launch({executablePath:process.argv[2],args:['--no-sandbox']});
try {
 const page = await browser.newPage();
 const {readFile} = await import('node:fs/promises');
 await page.setContent(await readFile(process.argv[3], 'utf8'), {waitUntil:'load'});
 await page.pdf({path:process.argv[4],printBackground:true,preferCSSPageSize:true});
} finally { await browser.close(); }
"""
subprocess.run(['node','--input-type=module','-e',renderer,args.playwright_module,chrome,str(output_html),str(output_pdf)],check=True,timeout=60)
if args.publish:
    shutil.copyfile(output_pdf, ROOT/'public/cv/Daniel_Rodriguez.pdf')
print(output_html)
print(output_pdf)

#!/usr/bin/env python3
"""Render the three-row credential gallery from the canonical inventory."""
import html,json,pathlib,re
root=pathlib.Path(__file__).resolve().parents[1]
items={x['id']:x for x in json.loads((root/'data/certifications.json').read_text())}
selected=json.loads((root/'docs/resume/resume.json').read_text())['credentialIds']
rows=[selected[:3],selected[3:5],selected[5:]]
destination='https://www.linkedin.com/in/daniel-steven-rodriguez-sandoval/?isSelfProfile=true'
esc=lambda s:html.escape(s,quote=True)
parts=['<!-- credentials:start -->','<div class="cert-controls"><span>Drag to explore · Select a credential to visit LinkedIn</span><button type="button" class="btn btn-outline" id="cert-pause" aria-pressed="false">Pause credentials</button></div>','<div class="cert-wall" aria-label="Seven selected credentials">']
for i,ids in enumerate(rows):
 parts.append(f'<div class="cert-row" tabindex="0" role="region" aria-label="Credential row {i+1}; use left and right arrow keys"><div class="cert-track" id="cert-track-{i}">')
 for id in ids:
  x=items[id];image=x.get('thumbnail') or x['artifact'];assert image and not image.endswith('.pdf')
  parts.append('<a class="cert-card" data-credential="'+id+'" href="'+esc(destination)+'" target="_blank" rel="noopener"><img src="'+esc(image)+'" alt="'+esc(x['name']+' completion certificate')+'" width="900" height="696" draggable="false"/><span class="cert-title">'+esc(x['name'])+'<small>'+esc(x['issuer']+' · '+x['completedAt'][:4])+'</small></span><span class="cert-open">LinkedIn ↗</span></a>')
 parts.append('</div></div>')
parts+=['</div>','<p class="specialization-areas"><b>Specializations · focused study</b><span>Generative AI · AI Engineering · LLMs &amp; Transformers · RAG &amp; LangChain · Deep Learning · Business Intelligence</span></p>','<!-- credentials:end -->']
p=root/'public/preview.html';s,n=re.subn(r'<!-- credentials:start -->.*?<!-- credentials:end -->','\n'.join(parts),p.read_text(),flags=re.S);assert n==1;p.write_text(s)

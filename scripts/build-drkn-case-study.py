"""Build only DRKN's animated project content and its accessible reading edition.
Run with a Python environment providing BeautifulSoup and Pillow. No global
portfolio bundle, other project or application service is touched.
"""
from pathlib import Path
import json
import html
import hashlib
from bs4 import BeautifulSoup
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
PROJECT=ROOT/'projects/drkn'
ASSETS=ROOT/'assets/projects/drkn'
PUBLIC='/amir/assets/projects/drkn/'
E=html.escape

def main():
 data=json.loads((PROJECT/'case-study.json').read_text())
 source=BeautifulSoup((PROJECT/'index.html').read_text(),'html.parser')
 desc=source.select_one('#project-details-desc');desc.clear()
 intro=source.new_tag('div',attrs={'class':'drkn-case-intro'})
 for text in data['intro']:
  p=source.new_tag('p');p.string=text;intro.append(p)
 link=source.new_tag('a',attrs={'href':'/amir/projects/drkn/read/','data-link-type':'regular','class':'drkn-case-reading-link'});link.string='Read the complete case study';intro.append(link)
 desc.append(intro)
 # Captured inside the project data on SPA transitions, scoped to DRKN only.
 style=source.new_tag('style');style.string='''.drkn-case-intro{font-size:.86em;line-height:1.65}.drkn-case-reading-link{display:inline-block;margin-top:1.2em;color:#ffb26b!important}#project-details:has(.drkn-case-intro) .project-details-item-text{white-space:pre-line;line-height:1.55}''';desc.append(style)
 gallery=source.select_one('#project-details-items-move-container');gallery.clear();seen=set()
 def image(name):
  if name in seen:return
  seen.add(name)
  with Image.open(ASSETS/(name+'.webp')) as im:w,h=im.size
  gallery.append(source.new_tag('div',attrs={'class':'project-details-item is-image','data-type':'image','data-filename':PUBLIC+name,'data-width':str(w),'data-height':str(h),'data-fullscreen':''}))
 image('home')
 for chapter in data['chapters']:
  item=source.new_tag('div',attrs={'class':'project-details-item is-text','data-type':'text','data-font-size':'1.25'})
  text=source.new_tag('div',attrs={'class':'project-details-item-text'});text.string=chapter['eyebrow']+'\n\n'+chapter['paragraphs'][0];item.append(text);gallery.append(item)
  if chapter.get('image'):image(chapter['image'])
 links=source.select_one('#project-details-side-list-links')
 for old in links.select('a[href="/amir/projects/drkn/read/"]'):old.decompose()
 read=source.new_tag('a',attrs={'class':'project-details-side-list-item','href':'/amir/projects/drkn/read/','data-link-type':'regular'});read.string='Full case study';links.append(read)
 (PROJECT/'index.html').write_text(str(source))
 arrow='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg>'
 def figure(name,caption):
  w,h=Image.open(ASSETS/(name+'.webp')).size
  extra=' phone' if name=='mobile-workspace' else ' interface' if name=='desktop-workspace' else ''
  return f'<figure class="case-banner{extra}"><img src="{PUBLIC}{name}.webp" width="{w}" height="{h}" loading="lazy" decoding="async" alt="{E(caption,quote=True)}"><figcaption>{E(caption)}</figcaption></figure>'
 chapters=[]
 for c in data['chapters']:
  paragraphs=''.join('<p>'+E(p)+'</p>' for p in c['paragraphs'])
  picture=figure(c['image'],c['caption']) if c.get('image') and c['image']!='research-banner' else ''
  chapters.append(f'<section class="case-chapter" id="{c["id"]}" aria-labelledby="title-{c["id"]}"><p class="case-eyebrow">{E(c["eyebrow"])}</p><h2 id="title-{c["id"]}">{E(c["title"])}</h2>{paragraphs}{picture}</section>')
 facts=''.join('<div><dt>'+E(k)+'</dt><dd>'+E(v)+'</dd></div>' for k,v in data['facts'])
 navigation=''.join(f'<a href="#{c["id"]}">{E(c["eyebrow"][:2])} · {E(c["title"])}</a>' for c in data['chapters'])
 css_hash=hashlib.sha256((ASSETS/'case-study.css').read_bytes()).hexdigest()[:10]
 page=f'''<!doctype html><html lang="en" dir="ltr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#090c0c"><title>DRKN — Product Design & Engineering Case Study | AMIR</title><meta name="description" content="The full DRKN case study: product direction, visual identity, responsive chat, market-pattern workers, research evidence and a connected Telegram assistant."><link rel="canonical" href="https://drkn.pro/amir/projects/drkn/"><meta property="og:title" content="DRKN — A clearer way to read the market"><meta property="og:image" content="https://drkn.pro{PUBLIC}home.webp"><link rel="icon" href="/favicon.ico"><link rel="stylesheet" href="{PUBLIC}case-study.css?v={css_hash}"></head><body><a class="case-skip" href="#story">Skip to the case study</a><div class="case-wrap"><nav class="case-nav" aria-label="Project navigation"><a href="/amir/"><strong>AMIR<span> / </span></strong></a><div class="case-nav-links"><a href="/amir/projects/drkn/">Animated edition</a><a href="https://drkn.pro/copilot">Open DRKN</a></div></nav><header class="case-hero"><p class="case-eyebrow">SELECTED WORK / PRODUCT DESIGN & ENGINEERING</p><h1><span>DRKN.</span><br>{E(data['headline'])}</h1><p class="case-deck">A connected research workspace and Telegram assistant. From visual identity to the systems behind the screen.</p><div class="case-actions"><a class="case-button primary" href="https://drkn.pro/">Explore the product {arrow}</a><a class="case-button secondary" href="#story">Read the story {arrow}</a></div></header>{figure('research-banner','DRKN — an original visual identity in obsidian, mint and copper.')}<dl class="case-facts">{facts}</dl><main class="case-body" id="story"><aside class="case-index" aria-label="Case study chapters"><p>IN THIS CASE STUDY</p>{navigation}</aside><article class="case-content"><div class="case-intro">{''.join('<p>'+E(p)+'</p>' for p in data['intro'])}</div>{''.join(chapters)}<details class="case-persian" lang="fa" dir="rtl"><summary>خلاصهٔ فارسی پروژه</summary><p>{E(data['persian_summary'])}</p></details><section class="case-ending"><p class="case-eyebrow">EXPLORE THE LIVE PRODUCT</p><h2>Start with a better question.</h2><div class="case-actions"><a class="case-button primary" href="https://drkn.pro/copilot">Open the workspace {arrow}</a><a class="case-button secondary" href="https://drkn.pro/apps/markets">Explore market patterns {arrow}</a></div></section></article></main><footer class="case-footer"><span>DRKN · Product direction, design & engineering by Amir.</span><a href="/amir/projects/">Back to selected work</a></footer></div></body></html>'''
 (PROJECT/'read').mkdir(exist_ok=True);(PROJECT/'read/index.html').write_text(page)
 # Keep the catalog's asset manifest in step with the project gallery.
 catalog=ROOT/'src/data/projects.json';items=json.loads(catalog.read_text())
 for item in items:
  if item['slug']=='drkn':item['assets']=[name+'.webp' for name in sorted(seen)]+['home_depth.webp'];item['description']=data['headline']
 catalog.write_text(json.dumps(items,indent=2)+'\n')
 words=sum(len(p.split()) for p in data['intro'])+sum(len(p.split()) for c in data['chapters'] for p in c['paragraphs'])
 print(f'DRKN case study: {len(data["chapters"])} chapters, {words} English words, {len(seen)} gallery images; animated + reading editions.')

if __name__=='__main__':main()

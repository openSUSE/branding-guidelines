import { elementToSVG } from 'dom-to-svg'

async function inlineSvgImages(svgDocument) {
  const images = [...svgDocument.querySelectorAll('image')]
  for (const img of images) {
    const href = img.getAttribute('xlink:href') || img.getAttribute('href')
    if (!href || href.startsWith('data:')) continue
    try {
      const res = await fetch(href)
      if (!res.ok) throw new Error('HTTP ' + res.status)
      const text = await res.text()
      const parsed = new DOMParser().parseFromString(text, 'image/svg+xml')
      const root = parsed.documentElement
      if (!root || root.nodeName.toLowerCase() !== 'svg') throw new Error('not svg')
      const vb = (root.getAttribute('viewBox') || '0 0 400 400').trim().split(/[ ,]+/).map(Number)
      const x = parseFloat(img.getAttribute('x') || '0')
      const y = parseFloat(img.getAttribute('y') || '0')
      const w = parseFloat(img.getAttribute('width') || String(vb[2]))
      const h = parseFloat(img.getAttribute('height') || String(vb[3]))
      const g = svgDocument.createElementNS('http://www.w3.org/2000/svg', 'g')
      g.setAttribute('transform', `translate(${x} ${y}) scale(${w / vb[2]} ${h / vb[3]})`)
      for (const attr of ['fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin']) {
        if (root.hasAttribute(attr)) g.setAttribute(attr, root.getAttribute(attr))
      }
      for (const child of [...root.childNodes]) {
        const imported = svgDocument.importNode(child, true)
        imported.querySelectorAll && imported.querySelectorAll('[id]').forEach(n => n.removeAttribute('id'))
        if (imported.removeAttribute) imported.removeAttribute('id')
        g.appendChild(imported)
      }
      img.replaceWith(g)
    } catch (e) {
      console.error('inlineSvgImages', href, e)
    }
  }
}

window.__makeEditableSVG = async function (root, meta) {
  try { await Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 4000))]); } catch (e) {}
  root.querySelectorAll('*').forEach(el => {
    if (el.tagName === 'STYLE' || el.tagName === 'SCRIPT') return
    if (getComputedStyle(el).textTransform === 'uppercase') {
      el.childNodes.forEach(n => {
        if (n.nodeType === Node.TEXT_NODE) n.nodeValue = n.nodeValue.toUpperCase()
      })
    }
  })
  const svgDocument = elementToSVG(root)
  svgDocument.querySelectorAll('style').forEach(s => { s.remove() })
  await inlineSvgImages(svgDocument)
  svgDocument.querySelectorAll('tspan').forEach(t => {
    t.removeAttribute('textLength')
    t.removeAttribute('lengthAdjust')
  })
  svgDocument.querySelectorAll('text').forEach(t => {
    const family = (t.getAttribute('font-family') || '').toLowerCase()
    if (family.includes('suse')) t.setAttribute('font-family', 'SUSE')
    else if (family.includes('monospace')) t.setAttribute('font-family', 'Source Code Pro')
  })
  svgDocument.querySelectorAll('[data-tag],[data-z-index]').forEach(el => {
    el.removeAttribute('data-tag')
    el.removeAttribute('data-z-index')
  })
  const svg = svgDocument.documentElement
  svg.setAttribute('width', meta.widthMm + 'mm')
  svg.setAttribute('height', meta.heightMm + 'mm')
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet')
  return new XMLSerializer().serializeToString(svgDocument)
}

window.__writeEditableSVG = async function (root, meta) {
  const svg = await window.__makeEditableSVG(root, meta)
  document.body.innerHTML = svg
  document.title = 'SVG_READY'
}

window.__convertFlyer = async function (meta) {
  let root = null
  for (let i = 0; i < 200; i++) {
    root = document.querySelector('#dc-root > .sc-host > div')
    if (root && root.getBoundingClientRect().width > 0) break
    await new Promise(r => setTimeout(r, 100))
  }
  if (!root) throw new Error('artboard root not found')
  await window.__writeEditableSVG(root, meta)
}

/* Generates data/ahmed.md from data/ahmed.json (the source of truth). Run: bun run data */
import { readFileSync, writeFileSync } from 'node:fs'

type Any = any // the shape is documented by data/ahmed.json itself

const src = new URL('../data/ahmed.json', import.meta.url)
const out = new URL('../data/ahmed.md', import.meta.url)
const d: Any = JSON.parse(readFileSync(src, 'utf8'))

const L: Array<string> = []
const p = (s = '') => L.push(s)
const list = (xs: Array<string> = []) => xs.forEach((x) => p(`- ${x}`))
const join = (xs?: Array<string> | null) =>
  xs && xs.length ? xs.join(' · ') : '—'
const range = (a?: string | null, b?: string | null) =>
  `${a ?? '?'} – ${b === null ? 'present' : (b ?? '?')}`
const link = (l: Any) => (l.url ? `[${l.label}](${l.url})` : l.label)

const { profile: pr, about, principles, experience, projects, skills } = d

p(`# ${pr.name} (${pr.handle})`)
p()
p(
  `<!-- Generated from data/ahmed.json by tools/data-md.ts. Do not edit by hand. Updated ${d.meta.updated}. -->`,
)
p()
p(`> ${pr.headline}`)
p()
const from = d.home.experienceFrom.split('-').map(Number)
const now = new Date()
const years = Math.floor(
  (now.getFullYear() * 12 + now.getMonth() - (from[0] * 12 + from[1] - 1)) / 12,
)
p((pr.intro.chosen ?? pr.intro.current).replace('{years}', String(years)))
p()
p(`- **Role:** ${pr.currentRole.title} @ ${pr.currentRole.company}`)
p(
  `- **Based:** ${pr.location.city}, ${pr.location.country} · ${pr.location.workMode}`,
)
p(`- **Status:** ${pr.availability.note}`)
p(`- **Email:** ${pr.contact.email}`)
p(`- **Site:** ${pr.contact.site}`)
pr.links.forEach((l: Any) => p(`- **${l.id}:** ${link(l)}`))
if (pr.languages)
  p(
    `- **Languages:** ${pr.languages.map((x: Any) => (x.level ? `${x.name} (${x.level}${x.proof ? `, [${x.proof.label}](${x.proof.url})` : ''})` : x.name)).join(', ')}`,
  )
p()

p('## About')
p()
if (about.opener) {
  p(`_${about.opener}_`)
  p()
}
p(about.who)
p()
p('### Journey')
p()
about.journey.forEach((j: Any) => p(`- **${j.when}:** ${j.text}`))
p()
p('### Off the clock')
p()
about.outside.forEach((o: Any) =>
  p(`- **${o.label}:** ${o.url ? `${o.text} (${o.url})` : o.text}`),
)
p()

p('## Principles')
p()
principles.forEach((x: Any, i: number) => {
  p(`### ${i + 1}. ${x.title}`)
  p()
  p(x.text)
  p()
  p(`_Proof:_ ${x.proof}`)
  p()
})

p('## Experience')
p()
experience.forEach((c: Any) => {
  p(`### ${c.name}${c.showOnSite === false ? ' (not shown on site)' : ''}`)
  p()
  p(`${c.location}. ${c.summary}`)
  p()
  c.roles.forEach((r: Any) =>
    p(
      `- **${r.title}**${r.type ? ` (${r.type})` : ''} · ${range(r.start, r.end)}${r.mode ? ` · ${r.mode}` : ''}`,
    ),
  )
  p()
  c.products.forEach((x: Any) => {
    const when = x.start ? ` (${range(x.start, x.end)})` : ''
    p(`#### ${x.name}${when}`)
    p()
    p(x.what)
    p()
    list(x.contributions)
    if (x.context) p(`- _Context:_ ${x.context}`)
    if (x.notMine) p(`- _Not mine:_ ${x.notMine.join(', ')}`)
    p(`- _Stack:_ ${join(x.stack)}`)
    if (x.links?.length) p(`- _Links:_ ${x.links.map(link).join(' · ')}`)
    if (x.learned) p(`- _Learned:_ ${x.learned.join('; ')}`)
    p()
  })
  if (c.highlights.length) {
    p('**Highlights**')
    p()
    list(c.highlights)
    p()
  }
  if (c.learned) {
    p('**What I learned there**')
    p()
    list(c.learned)
    p()
  }
})

const project = (x: Any) => {
  p(`### ${x.name}`)
  p()
  p(`${x.about}`)
  p()
  p(
    `- **Year:** ${x.year} · **Role:** ${x.role} · **Quick fact:** ${x.quickFact}${x.archived ? ' · _archived_' : ''}`,
  )
  if (x.stack) p(`- **Stack:** ${join(x.stack)}`)
  if (x.links?.length) p(`- **Links:** ${x.links.map(link).join(' · ')}`)
  if (x.facts?.length)
    p(
      `- **Facts:** ${x.facts.map((f: Any) => `${f.value} (${f.label})`).join(' · ')}`,
    )
  if (x.shareable) p(`- **Shareable:** ${x.shareable}`)
  p()
  if (x.problem) {
    p(x.problem)
    p()
  }
  if (x.contributions?.length) {
    list(x.contributions)
    p()
  }
}

p('## Work')
p()
p('### Professional')
p()
projects.professional.forEach(project)
p('### Side projects')
p()
projects.side.forEach(project)

p('## Toolbox')
p()
p(`**${skills.main.label}** (${skills.main.note.toLowerCase()})`)
p()
skills.main.groups.forEach((g: Any) => p(`- **${g.label}:** ${join(g.items)}`))
p()
p(`**${skills.used.label}** (${skills.used.note.toLowerCase()})`)
p()
skills.used.groups.forEach((g: Any) => p(`- **${g.label}:** ${join(g.items)}`))
p()
p('**Services**')
p()
d.services.forEach((x: Any) => p(`- **${x.name}:** ${x.text}`))
p()
p('**What I do**')
p()
list(
  skills.capabilities.map((c: Any) => `${c.name} (${c.evidence.join(', ')})`),
)
p()
p('**Daily tools**')
p()
d.tools.forEach((g: Any) => p(`- **${g.label}:** ${join(g.items)}`))
p()

p('## Education')
p()
d.education.degrees.forEach((x: Any) =>
  p(
    `- **${x.degree}**, ${x.school} · ${x.start}–${x.end}${x.showGpa === false ? '' : ` · GPA ${x.gpa}`} · ${x.honors.join(', ')}${x.coursework ? ` · coursework: ${x.coursework.map((c: Any) => link({ label: c.name, url: c.url })).join(', ')}` : ''}`,
  ),
)
p()
p('**Courses**')
p()
d.education.courses.forEach((x: Any) => p(`- ${x.name}, ${x.by} (${x.end})`))
p()
p('**Hackathons**')
p()
d.education.hackathons.forEach((x: Any) =>
  p(`- ${x.name}, ${x.where} (${x.date}): ${x.what}`),
)
p()
if (d.education.awards?.length) {
  p('**Awards**')
  p()
  d.education.awards.forEach((x: Any) =>
    p(
      `- **${x.result}**, ${x.name} (${x.date}): "${x.theme}". ${x.organizers.join(' + ')}, sponsored by ${x.sponsor}. ${x.details} Source: ${link(x.source)}${x.source.live === false ? ' (page removed)' : ''}`,
    ),
  )
  p()
}
p('**Activities**')
p()
d.education.activities.forEach((x: Any) =>
  p(
    `- ${x.name}, ${x.where}${x.date ? ` (${x.date})` : ''}: ${x.what}${x.clubs ? ` (${x.clubs.join('; ')})` : ''}`,
  ),
)
p()

p('## Testimonials')
p()
d.testimonials.forEach((t: Any) => {
  p(`> “${t.full}”`)
  p(`>`)
  p(
    `> — ${t.url ? `[${t.name}](${t.url})` : t.name}, ${t.title} @ ${t.company} (${t.source})`,
  )
  p()
  p(`_Short version (verbatim):_ “${t.excerpt}”`)
  p()
})

if (d.kindWords) {
  const k = d.kindWords
  p('### Kind words')
  p()
  p(`${k.source}. ${k.note}`)
  p()
  k.items.forEach((x: Any) => p(`- “${x.text}” — ${k.by}`))
  p()
}

if (d.open?.length) {
  p('## Open questions')
  p()
  list(d.open)
  p()
}

writeFileSync(out, L.join('\n'))
console.log(`wrote ${out.pathname}`)

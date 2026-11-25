import { useEffect, useMemo, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Check, ChevronDown, Clock3, Menu, Search, X } from 'lucide-react'

const categories = ['All stories', 'Technology', 'Lifestyle', 'Design', 'Culture']
const colors = [
  'from-[#f5c6ae] via-[#e7a18c] to-[#c06d69]', 'from-[#bad3cf] via-[#90b6ae] to-[#608d86]',
  'from-[#ebd69f] via-[#deb879] to-[#b98058]', 'from-[#c9c6e6] via-[#a8a2cf] to-[#7777a6]',
  'from-[#a9c4dc] via-[#7ea2bf] to-[#526f8c]', 'from-[#e2b4bd] via-[#c88191] to-[#96566c]',
  'from-[#c9d4a5] via-[#9faf7c] to-[#6d805b]', 'from-[#edc79f] via-[#d9a373] to-[#b6775b]',
  'from-[#b4d5d2] via-[#85b7b4] to-[#588e8b]', 'from-[#d5c4ad] via-[#bea486] to-[#967a60]',
]
const topics = ['Ideas & innovation', 'Slow living', 'Creative practice', 'Culture & connection', 'The natural world', 'Finding focus', 'Everyday rituals', 'Making things']

function excerpt(text, limit = 112) { return text.length > limit ? `${text.slice(0, limit).trim()}…` : text }

function CoverArt({ index, large = false }) {
  return <div className={`cover-art group relative overflow-hidden bg-gradient-to-br ${colors[index % colors.length]} ${large ? 'h-56 sm:h-72' : 'h-52'}`}>
    <div className="absolute inset-0 opacity-35 mix-blend-soft-light" style={{ backgroundImage: 'radial-gradient(ellipse at 75% 18%,rgba(255,255,255,.9),transparent 32%),radial-gradient(ellipse at 22% 82%,rgba(44,40,53,.45),transparent 39%)' }} />
    <div className="art-orbit art-orbit-one" /><div className="art-orbit art-orbit-two" />
    <div className="absolute inset-0 flex items-center justify-center"><div className="art-shape" /></div>
    <div className="absolute bottom-4 left-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.24em] text-white/80"><span className="h-px w-5 bg-white/80" /> A little perspective</div>
    <div className="absolute right-4 top-4 rounded-full border border-white/40 bg-white/15 px-3 py-1 text-[10px] font-semibold tracking-wide text-white backdrop-blur-sm">FIELD NOTES&nbsp; / &nbsp;0{index + 1}</div>
  </div>
}

function PostCard({ post, index, onOpen }) {
  const topic = topics[(post.id - 1) % topics.length]
  return <article className="post-card group overflow-hidden rounded-2xl border border-[#eae9e5] bg-white">
    <button onClick={() => onOpen(post, index)} className="block w-full text-left" aria-label={`Read ${post.title}`}><CoverArt index={index} /></button>
    <div className="p-5 sm:p-6">
      <div className="mb-3 flex items-center justify-between gap-2"><span className="rounded-full bg-[#f1f1ed] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.13em] text-[#5b6856]">{topic}</span><span className="flex items-center gap-1 text-xs text-[#92918c]"><Clock3 size={13} /> {4 + (post.id % 5)} min read</span></div>
      <h2 className="mb-2 font-display text-[19px] font-bold leading-snug tracking-[-.045em] text-[#252921] transition-colors group-hover:text-[#64765f]">{post.title}</h2>
      <p className="min-h-[60px] text-sm leading-[1.7] text-[#77766f]">{excerpt(post.body)}</p>
      <div className="mt-5 flex items-center justify-between border-t border-[#efeee9] pt-4"><span className="text-xs font-medium text-[#77766f]">A note from our journal</span><button onClick={() => onOpen(post, index)} className="inline-flex items-center gap-1.5 text-xs font-bold text-[#465743] transition-all hover:gap-2.5">Read story <ArrowUpRight size={14} /></button></div>
    </div>
  </article>
}

function PostModal({ post, index, onClose }) {
  useEffect(() => { const closeOnEscape = (event) => event.key === 'Escape' && onClose(); window.addEventListener('keydown', closeOnEscape); document.body.style.overflow = 'hidden'; return () => { window.removeEventListener('keydown', closeOnEscape); document.body.style.overflow = '' } }, [onClose])
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#171914]/55 backdrop-blur-sm sm:items-center sm:p-5" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className="modal-scroll relative max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-[#fffefa] shadow-2xl sm:rounded-3xl" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <button onClick={onClose} aria-label="Close story" className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-[#33372f] shadow-sm backdrop-blur hover:bg-white"><X size={19} /></button>
      <CoverArt index={index} large />
      <div className="px-6 py-7 sm:px-10 sm:py-9"><div className="mb-4 flex items-center gap-3 text-xs text-[#85847c]"><span className="rounded-full bg-[#eef0e8] px-3 py-1.5 font-bold uppercase tracking-[.13em] text-[#596750]">{topics[(post.id - 1) % topics.length]}</span><span>•</span><span>{4 + (post.id % 5)} min read</span></div><h2 id="modal-title" className="mb-4 font-display text-3xl font-extrabold leading-tight tracking-[-.055em] text-[#252921] sm:text-4xl">{post.title}</h2><p className="mb-6 border-b border-[#ecebe5] pb-6 text-sm leading-7 text-[#77766f]">A thoughtful note from our journal, shared to inspire a different way of seeing the everyday.</p><div className="space-y-5 text-[15px] leading-8 text-[#55564f]"><p className="first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-5xl first-letter:font-bold first-letter:leading-[.85] first-letter:text-[#65735d]">{post.body}</p><p>Sometimes the most meaningful shifts begin with a small pause. We make room for new ideas when we notice the details around us and give our curiosity time to grow.</p><p>There is something quietly powerful about looking again. It changes how we understand our routines, how we show up for one another, and how we imagine what comes next.</p></div><div className="mt-8 flex items-center justify-between border-t border-[#ecebe5] pt-5"><div><div className="text-sm font-bold text-[#373b33]">The Thoughtful Journal</div><div className="mt-1 text-xs text-[#92918c]">Stories for a more considered life</div></div><button onClick={onClose} className="inline-flex items-center gap-2 rounded-full bg-[#354431] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#4b6045]">Done <Check size={15} /></button></div></div>
    </section>
  </div>
}

function App() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeCategory, setActiveCategory] = useState('All stories')
  const [search, setSearch] = useState('')
  const [selectedPost, setSelectedPost] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    fetch('https://jsonplaceholder.typicode.com/posts', { signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error('We couldn’t load the stories just now. Please try again.'); return response.json() })
      .then((data) => setPosts(data.slice(0, 10)))
      .catch((reason) => { if (reason.name !== 'AbortError') setError(reason.message || 'Something went wrong while loading stories.') })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [])

  const visiblePosts = useMemo(() => posts.filter((post) => {
    const matchesSearch = `${post.title} ${post.body}`.toLowerCase().includes(search.toLowerCase())
    const categoryIndex = categories.indexOf(activeCategory)
    const matchesCategory = categoryIndex < 2 || (post.id + categoryIndex) % (categoryIndex + 2) !== 0
    return matchesSearch && matchesCategory
  }), [posts, search, activeCategory])

  return <div className="min-h-screen bg-[#f7f8fc] text-[#292d29]">
    <header className="sticky top-0 z-30 border-b border-[#eceef0] bg-[#f7f8fc]/90 backdrop-blur-xl"><div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 sm:px-8">
      <a href="#top" className="flex items-center gap-2.5"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#374633] text-white"><BookOpen size={18} strokeWidth={2.2} /></span><span className="font-display text-lg font-extrabold tracking-[-.07em]">thoughtful<span className="text-[#839178]">.</span></span></a>
      <nav className="hidden items-center gap-8 md:flex"><a href="#stories" className="text-sm font-semibold text-[#41453f] hover:text-[#788a6e]">Stories</a><a href="#about" className="text-sm text-[#797b76] hover:text-[#41453f]">Our journal</a><a href="#footer" className="text-sm text-[#797b76] hover:text-[#41453f]">About</a></nav>
      <div className="flex items-center gap-3"><a href="#stories" className="hidden rounded-full border border-[#dedfda] px-4 py-2 text-xs font-semibold text-[#42463f] transition hover:border-[#788a6e] sm:inline-flex">Explore stories <ArrowUpRight size={14} className="ml-1" /></a><button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e5e6e1] md:hidden">{menuOpen ? <X size={18} /> : <Menu size={18} />}</button></div>
    </div>{menuOpen && <div className="border-t border-[#eceef0] px-6 py-4 md:hidden"><a onClick={() => setMenuOpen(false)} href="#stories" className="block py-2 text-sm">Stories</a><a onClick={() => setMenuOpen(false)} href="#about" className="block py-2 text-sm">Our journal</a><a onClick={() => setMenuOpen(false)} href="#footer" className="block py-2 text-sm">About</a></div>}</header>

    <main id="top"><section className="hero-shell relative overflow-hidden"><div className="pointer-events-none absolute -right-28 -top-24 h-80 w-80 rounded-full bg-[#e1e8dc]/55 blur-3xl"/><div className="pointer-events-none absolute -left-24 bottom-0 h-60 w-60 rounded-full bg-[#e9e9f1]/80 blur-3xl"/>
      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-20"><div className="max-w-3xl"><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e2e5df] bg-white/70 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[.16em] text-[#62705d]"><span className="h-1.5 w-1.5 rounded-full bg-[#90a485]"/> A journal for curious minds</div><h1 className="max-w-[760px] font-display text-[43px] font-extrabold leading-[1.08] tracking-[-.075em] text-[#272c27] sm:text-[62px]">A little more <span className="text-[#77856e]">thoughtful.</span><br className="hidden sm:block"/> A little more <span className="italic">you.</span></h1><p className="mt-6 max-w-[520px] text-[15px] leading-7 text-[#747871] sm:text-base">Ideas, stories, and small reminders to help you see the everyday in a different light.</p><a href="#stories" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#354431] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#4b6045]">Find your next read <ArrowDown size={15} /></a></div>
        <div className="mt-12 grid max-w-3xl grid-cols-3 gap-3 border-t border-[#dfe2dc] pt-6 sm:mt-14 sm:gap-8 sm:pt-7"><div><div className="font-display text-lg font-bold tracking-tight text-[#383d36]">Fresh thinking</div><div className="mt-1 text-xs text-[#858780]">Perspectives to keep</div></div><div><div className="font-display text-lg font-bold tracking-tight text-[#383d36]">Small moments</div><div className="mt-1 text-xs text-[#858780]">Worth slowing down for</div></div><div><div className="font-display text-lg font-bold tracking-tight text-[#383d36]">Your kind of read</div><div className="mt-1 text-xs text-[#858780]">A little room to wander</div></div></div>
      </div></section>

      <section id="stories" className="mx-auto max-w-6xl scroll-mt-20 px-5 pb-24 pt-12 sm:px-8 sm:pt-16"><div className="mb-8 flex flex-col justify-between gap-5 sm:mb-9 sm:flex-row sm:items-end"><div><div className="mb-2 text-[11px] font-bold uppercase tracking-[.19em] text-[#84917a]">A collection of good reads</div><h2 className="font-display text-3xl font-extrabold tracking-[-.06em] text-[#292d29] sm:text-4xl">The journal<span className="text-[#91a187]">.</span></h2><p className="mt-2 text-sm text-[#81837d]">Take a breath. Find a thought worth keeping.</p></div><label className="flex h-11 w-full items-center gap-2.5 rounded-full border border-[#e5e6e1] bg-white px-4 text-[#858780] sm:max-w-[260px]"><Search size={16}/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Find a story..." className="w-full bg-transparent text-sm text-[#33372f] outline-none placeholder:text-[#a1a29c]" /></label></div>
        <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2">{categories.map((category) => <button key={category} onClick={() => setActiveCategory(category)} className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${activeCategory === category ? 'bg-[#354431] text-white' : 'border border-[#e6e7e2] bg-white text-[#747770] hover:border-[#a3ad9b]'}`}>{category}</button>)}<button aria-label="More categories" className="ml-auto hidden shrink-0 rounded-full border border-[#e6e7e2] bg-white p-2 text-[#747770] sm:block"><ChevronDown size={15}/></button></div>
        {loading ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{[0,1,2,3,4,5].map((item) => <div key={item} className="overflow-hidden rounded-2xl border border-[#eae9e5] bg-white"><div className="h-52 animate-pulse bg-[#e9eae5]"/><div className="space-y-3 p-6"><div className="h-4 w-24 animate-pulse rounded bg-[#e9eae5]"/><div className="h-5 w-4/5 animate-pulse rounded bg-[#e9eae5]"/><div className="h-4 w-full animate-pulse rounded bg-[#f0f0ec]"/><div className="h-4 w-3/4 animate-pulse rounded bg-[#f0f0ec]"/></div></div>)}</div> : error ? <div className="rounded-2xl border border-[#eedbd4] bg-[#fff9f6] px-6 py-12 text-center"><p className="font-display text-lg font-bold text-[#4e423d]">That didn’t load as planned.</p><p className="mt-2 text-sm text-[#82766f]">{error}</p><button onClick={() => window.location.reload()} className="mt-5 rounded-full bg-[#354431] px-5 py-2.5 text-sm font-semibold text-white">Try again</button></div> : visiblePosts.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{visiblePosts.map((post) => <PostCard key={post.id} post={post} index={post.id - 1} onOpen={(item, index) => setSelectedPost({ item, index })}/>)}</div> : <div className="rounded-2xl border border-[#eae9e5] bg-white px-6 py-12 text-center"><p className="font-display text-lg font-bold">No stories found</p><p className="mt-2 text-sm text-[#81837d]">Try a different search or explore another topic.</p></div>}
        {!loading && !error && visiblePosts.length > 0 && <div className="mt-12 flex justify-center"><button onClick={() => document.getElementById('stories').scrollIntoView({behavior:'smooth'})} className="inline-flex items-center gap-2 rounded-full border border-[#dfe1da] px-5 py-3 text-sm font-semibold text-[#515b4d] transition hover:border-[#819078] hover:bg-white">You’re all caught up <Check size={15}/></button></div>}
      </section>
      <section id="about" className="border-y border-[#e8e9e5] bg-[#f0f1eb]"><div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-14"><div><span className="text-[11px] font-bold uppercase tracking-[.18em] text-[#7e8d74]">A slower corner of the internet</span><h2 className="mt-2 font-display text-2xl font-extrabold tracking-[-.05em] text-[#343a32]">Good things take a little attention.</h2><p className="mt-2 max-w-lg text-sm leading-6 text-[#797c73]">Thoughtful is a journal about ideas that stick around and moments that make the day feel like your own.</p></div><a href="#stories" className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-bold text-[#4c5848] shadow-sm">Wander through <ArrowRight size={14}/></a></div></section>
    </main>
    <footer id="footer" className="bg-[#30392f] text-white"><div className="mx-auto max-w-6xl px-5 py-10 sm:px-8"><div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-center"><div><a href="#top" className="font-display text-lg font-extrabold tracking-[-.07em]">thoughtful<span className="text-[#a8ba9c]">.</span></a><p className="mt-2 text-xs text-white/55">A small journal for a more considered life.</p></div><nav className="flex gap-5 text-xs text-white/65"><a href="#stories" className="hover:text-white">Stories</a><a href="#about" className="hover:text-white">Our journal</a><a href="#top" className="hover:text-white">Back to top</a></nav></div><div className="mt-8 border-t border-white/10 pt-5 text-[11px] text-white/40">© 2025 Thoughtful Journal. Made for the curious.</div></div></footer>
    {selectedPost && <PostModal post={selectedPost.item} index={selectedPost.index} onClose={() => setSelectedPost(null)} />}
  </div>
}

export default App

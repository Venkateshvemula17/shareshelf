import { useMemo, useState } from 'react'
import {
  ArrowDownUp, ArrowRight, BookOpen, Bookmark, Check, ChevronDown,
  CircleHelp, Clock3, Filter, GraduationCap, Heart, Leaf, LibraryBig,
  MapPin, Menu, MessageCircle, Plus, Search, ShieldCheck, SlidersHorizontal,
  Sparkles, X
} from 'lucide-react'

const initialItems = [
  { id: 1, title: 'Introduction to Algorithms', category: 'Textbooks', subject: 'Computer Science', owner: 'Ananya R.', initials: 'AR', color: 'lilac', condition: 'Good condition', mode: 'Borrow', price: 'Free', location: 'Campus library', time: 'Posted 2h ago', image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=85', description: 'A well-kept algorithms textbook. Some highlighting in the first few chapters.' },
  { id: 2, title: 'DBMS handwritten notes', category: 'Study notes', subject: 'Database Systems', owner: 'Rahul K.', initials: 'RK', color: 'peach', condition: 'Digital PDF', mode: 'Give away', price: 'Free', location: 'Online sharing', time: 'Posted 4h ago', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=85', description: 'Semester notes with normalization, SQL joins, ER diagrams, and important questions.' },
  { id: 3, title: 'Engineering Mathematics I', category: 'Textbooks', subject: 'Mathematics', owner: 'Meera S.', initials: 'MS', color: 'mint', condition: 'Like new', mode: 'Swap', price: 'Exchange', location: 'North campus', time: 'Posted yesterday', image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=85', description: 'Looking to exchange for a basic programming or physics book.' },
  { id: 4, title: 'Clean Code — study copy', category: 'Textbooks', subject: 'Software Development', owner: 'Arjun P.', initials: 'AP', color: 'blue', condition: 'Good condition', mode: 'Lend', price: 'Free', location: 'Student centre', time: 'Posted yesterday', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=85', description: 'Available to lend for two weeks. Please return in the same condition.' },
  { id: 5, title: 'Operating Systems exam pack', category: 'Exam prep', subject: 'Operating Systems', owner: 'Diya N.', initials: 'DN', color: 'yellow', condition: 'PDF + practice set', mode: 'Give away', price: 'Free', location: 'Online sharing', time: 'Posted 2 days ago', image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=85', description: 'Revision notes and practice questions organised by topic.' },
  { id: 6, title: 'Scientific calculator', category: 'Supplies', subject: 'Study supplies', owner: 'Kiran V.', initials: 'KV', color: 'rose', condition: 'Works perfectly', mode: 'Swap', price: 'Exchange', location: 'Main gate', time: 'Posted 3 days ago', image: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=800&q=85', description: 'Works perfectly. Happy to swap for notebooks or a reference book.' },
]

const categories = ['Everything', 'Textbooks', 'Study notes', 'Exam prep', 'Supplies']
const modes = ['All types', 'Borrow', 'Lend', 'Swap', 'Give away']

function App() {
  const [items, setItems] = useState(initialItems)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Everything')
  const [mode, setMode] = useState('All types')
  const [activeNav, setActiveNav] = useState('Discover')
  const [saved, setSaved] = useState([])
  const [modal, setModal] = useState(false)
  const [detail, setDetail] = useState(null)
  const [toast, setToast] = useState('')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [form, setForm] = useState({ title: '', category: 'Textbooks', subject: '', mode: 'Borrow', description: '', location: '' })

  const notify = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2600)
  }

  const visibleItems = useMemo(() => items.filter((item) => {
    const matchesQuery = [item.title, item.subject, item.category, item.owner].join(' ').toLowerCase().includes(query.toLowerCase())
    const matchesCategory = category === 'Everything' || item.category === category
    const matchesMode = mode === 'All types' || item.mode === mode
    const matchesSaved = activeNav !== 'Saved items' || saved.includes(item.id)
    return matchesQuery && matchesCategory && matchesMode && matchesSaved
  }), [items, query, category, mode, activeNav, saved])

  const toggleSaved = (id) => {
    setSaved((current) => current.includes(id) ? current.filter((x) => x !== id) : [...current, id])
    notify(saved.includes(id) ? 'Removed from your saved shelf' : 'Saved to your shelf')
  }

  const submitListing = (event) => {
    event.preventDefault()
    if (!form.title.trim() || !form.subject.trim()) return
    const newItem = {
      ...form, id: Date.now(), owner: 'You', initials: 'VK', color: 'mint',
      condition: 'New listing', price: form.mode === 'Swap' ? 'Exchange' : 'Free',
      location: form.location || 'Location not added', time: 'Just now',
      image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=800&q=85',
    }
    setItems((current) => [newItem, ...current])
    setCategory('Everything')
    setMode('All types')
    setActiveNav('Discover')
    setQuery('')
    setForm({ title: '', category: 'Textbooks', subject: '', mode: 'Borrow', description: '', location: '' })
    setModal(false)
    notify('Your listing was added to this demo!')
  }

  const requestItem = (item) => {
    setDetail(null)
    notify(`Request noted for “${item.title}” — messaging comes next!`)
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileMenu ? 'sidebar-open' : ''}`}>
        <a className="brand" href="#" onClick={(e) => { e.preventDefault(); setActiveNav('Discover') }}>
          <span className="brand-mark"><LibraryBig size={22} strokeWidth={2.4} /></span>
          <span>share<span className="brand-green">shelf</span><small>STUDENT COMMUNITY</small></span>
        </a>
        <div className="workspace-label">YOUR SPACE</div>
        <nav className="side-nav">
          <button className={activeNav === 'Discover' ? 'nav-item active' : 'nav-item'} onClick={() => { setActiveNav('Discover'); setMobileMenu(false) }}><Search size={18} />Discover <span className="nav-arrow">↗</span></button>
          <button className={activeNav === 'My listings' ? 'nav-item active' : 'nav-item'} onClick={() => { setActiveNav('My listings'); setMobileMenu(false); notify('Your personal listings view is coming soon.') }}><BookOpen size={18} />My listings</button>
          <button className={activeNav === 'Requests' ? 'nav-item active' : 'nav-item'} onClick={() => { setActiveNav('Requests'); setMobileMenu(false); notify('Your requests inbox is coming soon.') }}><ArrowDownUp size={18} />Requests <span className="tiny-count">2</span></button>
          <button className={activeNav === 'Saved items' ? 'nav-item active' : 'nav-item'} onClick={() => { setActiveNav('Saved items'); setMobileMenu(false) }}><Bookmark size={18} />Saved items</button>
        </nav>
        <div className="sidebar-spacer" />
        <div className="impact-card">
          <div className="impact-icon"><Leaf size={18} /></div>
          <p className="impact-title">Good things go around.</p>
          <p className="impact-copy">Sharing resources saves money and gives books a second life.</p>
          <div className="impact-stat"><span>♧</span> Small shares, big impact</div>
        </div>
        <div className="profile-row">
          <div className="avatar avatar-green">VK</div>
          <div className="profile-text"><strong>Venkatesh</strong><span>Student member</span></div>
          <ChevronDown size={16} className="muted-icon" />
        </div>
      </aside>

      {mobileMenu && <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setMobileMenu(false)} />}

      <main className="main-area">
        <header className="topbar">
          <button className="icon-button mobile-menu-button" aria-label="Open menu" onClick={() => setMobileMenu(true)}><Menu size={21} /></button>
          <div className="breadcrumbs"><span>Workspace</span><span>/</span><strong>{activeNav}</strong></div>
          <div className="topbar-actions"><span className="community-pill"><span className="online-dot" /> Student community</span><button className="avatar avatar-green top-avatar" aria-label="Profile">VK</button></div>
        </header>

        <div className="page-content">
          <section className="welcome-row">
            <div>
              <div className="eyebrow"><Sparkles size={14} /> THE CAMPUS CIRCULAR ECONOMY</div>
              <h1>{activeNav === 'Saved items' ? 'Your saved shelf.' : 'Find your next' }<br className="title-break" /> <span>{activeNav === 'Saved items' ? 'favourite resource.' : 'good read.'}</span></h1>
              <p className="welcome-copy">Borrow a book, swap your notes, or pass something useful forward.</p>
            </div>
            <button className="primary-button create-button" onClick={() => setModal(true)}><Plus size={18} /> Share a resource</button>
          </section>

          <section className="stats-row">
            <div className="stat-card"><div className="stat-icon stat-lilac"><LibraryBig size={19} /></div><div><span>Resources listed</span><strong>{items.length.toString().padStart(2, '0')}</strong></div><small>in this demo</small></div>
            <div className="stat-card"><div className="stat-icon stat-mint"><ArrowDownUp size={19} /></div><div><span>Ways to share</span><strong>04</strong></div><small>borrow · swap · give</small></div>
            <div className="stat-card"><div className="stat-icon stat-peach"><Heart size={19} /></div><div><span>Your saved shelf</span><strong>{saved.length.toString().padStart(2, '0')}</strong></div><small>keep it close</small></div>
          </section>

          <section className="section-heading">
            <div><h2>Explore the shelf</h2><p>Useful things, shared by students like you.</p></div>
            <button className="text-button" onClick={() => { setCategory('Everything'); setMode('All types'); setQuery(''); setActiveNav('Discover') }}>View all <ArrowRight size={16} /></button>
          </section>

          <section className="filters-panel">
            <div className="search-box"><Search size={18} /><input aria-label="Search resources" placeholder="Search books, notes, subjects..." value={query} onChange={(e) => setQuery(e.target.value)} /><kbd>/</kbd></div>
            <div className="filter-select"><SlidersHorizontal size={16} /><select aria-label="Filter by sharing type" value={mode} onChange={(e) => setMode(e.target.value)}>{modes.map((m) => <option key={m}>{m}</option>)}</select><ChevronDown size={15} /></div>
          </section>

          <div className="category-row" role="tablist" aria-label="Resource categories">
            {categories.map((c) => <button role="tab" aria-selected={category === c} key={c} className={category === c ? 'category-chip selected' : 'category-chip'} onClick={() => setCategory(c)}>{c}</button>)}
            <span className="result-count">{visibleItems.length} resources</span>
          </div>

          <section className="resource-grid">
            {visibleItems.map((item) => (
              <article className="resource-card" key={item.id}>
                <button className="resource-image-button" onClick={() => setDetail(item)} aria-label={`View ${item.title}`}>
                  <img className="resource-image" src={item.image} alt="" loading="lazy" />
                  <span className={`type-tag type-${item.mode.toLowerCase().replace(' ', '-')}`}>{item.mode}</span>
                </button>
                <button className={saved.includes(item.id) ? 'save-button saved' : 'save-button'} onClick={() => toggleSaved(item.id)} aria-label={saved.includes(item.id) ? 'Remove saved item' : 'Save item'}><Heart size={17} fill={saved.includes(item.id) ? 'currentColor' : 'none'} /></button>
                <div className="resource-info">
                  <div className="resource-category">{item.category} <span>·</span> {item.subject}</div>
                  <button className="resource-title" onClick={() => setDetail(item)}>{item.title}</button>
                  <div className="condition-row"><span className={`condition-dot dot-${item.color}`} />{item.condition}</div>
                  <div className="resource-footer"><div className="owner"><span className={`avatar avatar-${item.color}`}>{item.initials}</span><span><strong>{item.owner}</strong><small>{item.time}</small></span></div><span className="price-label">{item.price}</span></div>
                </div>
              </article>
            ))}
            {visibleItems.length === 0 && <div className="empty-state"><div className="empty-icon"><Search size={24} /></div><h3>No resources found</h3><p>Try another search or category, or share the first resource.</p><button className="primary-button" onClick={() => { setQuery(''); setCategory('Everything'); setMode('All types'); setActiveNav('Discover') }}>Clear filters</button></div>}
          </section>

          <section className="bottom-banner"><div className="banner-art"><BookOpen size={31} /><Sparkles size={18} /></div><div><strong>Have something gathering dust?</strong><p>Someone on campus might need exactly what you have.</p></div><button className="banner-button" onClick={() => setModal(true)}>List a resource <ArrowRight size={16} /></button></section>
          <footer className="footer"><span>© 2026 ShareShelf</span><span><ShieldCheck size={14} /> Built for student-to-student sharing</span><button onClick={() => notify('Community guidelines will be added soon.')}><CircleHelp size={14} /> Help & guidelines</button></footer>
        </div>
      </main>

      {modal && <div className="modal-backdrop" onClick={() => setModal(false)}><section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(e) => e.stopPropagation()}>
        <div className="modal-heading"><div><span className="eyebrow">PASS IT FORWARD</span><h2 id="modal-title">Share a resource</h2><p>Give another student a helpful head start.</p></div><button className="icon-button" aria-label="Close dialog" onClick={() => setModal(false)}><X size={20} /></button></div>
        <form className="listing-form" onSubmit={submitListing}>
          <label>Resource name *<input required maxLength={90} placeholder="e.g. Data Structures textbook" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
          <div className="form-two-col"><label>Category<select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>{categories.slice(1).map((c) => <option key={c}>{c}</option>)}</select></label><label>Sharing type<select value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value })}>{modes.slice(1).map((m) => <option key={m}>{m}</option>)}</select></label></div>
          <label>Subject *<input required maxLength={70} placeholder="e.g. Computer Science" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} /></label>
          <label>Short description<textarea rows="3" maxLength={400} placeholder="Condition, edition, topics included..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
          <label>Pickup location or sharing method<input maxLength={90} placeholder="e.g. Library or online PDF" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></label>
          <div className="form-note"><ShieldCheck size={16} /> Meet in a public campus place and never share private account details.</div>
          <div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setModal(false)}>Cancel</button><button type="submit" className="primary-button"><Plus size={17} /> Publish listing</button></div>
        </form>
      </section></div>}

      {detail && <div className="modal-backdrop" onClick={() => setDetail(null)}><section className="detail-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}><button className="icon-button detail-close" aria-label="Close details" onClick={() => setDetail(null)}><X size={20} /></button><img className="detail-image" src={detail.image} alt="" /><div className="detail-content"><span className={`type-tag type-${detail.mode.toLowerCase().replace(' ', '-')}`}>{detail.mode}</span><div className="resource-category detail-category">{detail.category} · {detail.subject}</div><h2>{detail.title}</h2><p>{detail.description || 'A student-shared resource ready for its next chapter.'}</p><div className="detail-meta"><span><MapPin size={16} />{detail.location}</span><span><Clock3 size={16} />{detail.time}</span></div><div className="detail-owner"><span className={`avatar avatar-${detail.color}`}>{detail.initials}</span><span><strong>{detail.owner}</strong><small>Student member</small></span></div><button className="primary-button request-button" onClick={() => requestItem(detail)}><MessageCircle size={17} /> Request this resource</button><p className="demo-note">Demo interaction — requests aren't sent to another user yet.</p></div></section></div>}

      {toast && <div className="toast"><span className="toast-check"><Check size={15} /></span>{toast}</div>}
    </div>
  )
}

export default App
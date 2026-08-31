import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, Check, ChevronDown, Menu, MessageCircle, Search, Send, Sparkles, X } from 'lucide-react'
import { products, categories } from './data/products'

const queryUrl = import.meta.env.VITE_N8N_QUERY_WEBHOOK_URL || ''
const chatUrl = import.meta.env.VITE_N8N_CHAT_WEBHOOK_URL || ''

function Navbar({ onAsk }) {
  const [open, setOpen] = useState(false)
  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }
  return (
    <header className="nav-wrap">
      <nav className="nav">
        <button className="brand" onClick={() => go('home')} aria-label="UrbanNest home">
          <span className="brand-mark">UN</span>
          <span>
            <strong>UrbanNest</strong>
            <small>LIFESTYLE STORE</small>
          </span>
        </button>

        <div className={`nav-links ${open ? 'open' : ''}`}>
          <button onClick={() => go('home')}>Home</button>
          <button onClick={() => go('shop')}>Shop</button>
          <button onClick={() => go('about')}>About</button>
          <button onClick={() => go('contact')}>Contact</button>
          <button className="nav-ai" onClick={onAsk}><Sparkles size={15}/> Ask UrbanNest</button>
        </div>

        <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Open menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>
    </header>
  )
}

function Hero({ onExplore, onAsk }) {
  return (
    <section className="hero section-pad" id="home">
      <div className="hero-copy">
        <div className="eyebrow"><span /> LOCAL FINDS · EVERYDAY JOY</div>
        <h1>Little things.<br/><em>Beautiful living.</em></h1>
        <p className="hero-text">
          Thoughtfully chosen home décor, gifts, stationery and lifestyle essentials
          from your neighborhood store — now just a click away.
        </p>
        <div className="hero-actions">
          <button className="btn btn-dark" onClick={onExplore}>Explore collection <ArrowRight size={17}/></button>
          <button className="text-btn" onClick={onAsk}><MessageCircle size={17}/> Ask our AI</button>
        </div>
        <div className="hero-note">
          <div className="avatar-stack"><span>U</span><span>N</span><span>♡</span></div>
          <span><strong>Local. Personal. Thoughtful.</strong><br/>A little store with a lot of heart.</span>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-image" />
        <div className="hero-card">
          <span>CURATED FOR YOU</span>
          <strong>Objects that make<br/>ordinary days better.</strong>
        </div>
        <div className="hero-badge">EST.<br/><strong>2026</strong></div>
      </div>
    </section>
  )
}

function CategorySection() {
  return (
    <section className="section-pad category-section">
      <div className="section-head">
        <div><span className="eyebrow">EXPLORE</span><h2>Find your little something.</h2></div>
        <p>Useful, beautiful and easy to love.</p>
      </div>
      <div className="category-grid">
        {categories.map(c => (
          <div className="category-card" key={c.name}>
            <span className="category-icon">{c.icon}</span>
            <h3>{c.name}</h3>
            <p>{c.description}</p>
            <ArrowRight size={17}/>
          </div>
        ))}
      </div>
    </section>
  )
}

function ProductCard({ product, onEnquire }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img src={product.image} alt={product.name} />
        <span className="product-category">{product.category}</span>
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-bottom">
          <strong>₹{product.price.toLocaleString('en-IN')}</strong>
          <button onClick={() => onEnquire(product)}>Enquire <ArrowRight size={15}/></button>
        </div>
      </div>
    </article>
  )
}

function Shop({ onEnquire }) {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const filtered = useMemo(() => products.filter(p =>
    (category === 'All' || p.category === category) &&
    `${p.name} ${p.description}`.toLowerCase().includes(search.toLowerCase())
  ), [category, search])

  return (
    <section className="section-pad shop-section" id="shop">
      <div className="section-head shop-head">
        <div><span className="eyebrow">THE COLLECTION</span><h2>Made for everyday living.</h2></div>
        <p>Browse a few of our neighborhood favorites.</p>
      </div>
      <div className="shop-tools">
        <div className="search-box"><Search size={17}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." /></div>
        <div className="filter-row">
          {['All', ...categories.map(c => c.name)].map(c => (
            <button className={category === c ? 'active' : ''} key={c} onClick={() => setCategory(c)}>{c}</button>
          ))}
        </div>
      </div>
      <div className="product-grid">
        {filtered.map(p => <ProductCard key={p.id} product={p} onEnquire={onEnquire}/>)}
      </div>
      {filtered.length === 0 && <div className="empty-state">No products found. Try another search.</div>}
    </section>
  )
}

function About() {
  const points = ['Thoughtfully selected products', 'Fair prices without the fuss', 'Friendly local service', 'Fast answers when you need them']
  return (
    <section className="about-section" id="about">
      <div className="about-image" />
      <div className="about-copy">
        <span className="eyebrow">OUR LITTLE STORY</span>
        <h2>A neighborhood shop, with a digital front door.</h2>
        <p>
          UrbanNest was imagined as the kind of local store you walk into for one thing
          and leave with three little things that make your home, desk or day feel better.
        </p>
        <p>
          We bring that same warm, personal experience online — with curated products,
          quick answers and a simple way to reach our team.
        </p>
        <div className="check-list">
          {points.map(x => <div key={x}><span><Check size={14}/></span>{x}</div>)}
        </div>
      </div>
    </section>
  )
}

function WhyChooseUs() {
  return (
    <section className="section-pad why-section">
      <div className="section-head"><div><span className="eyebrow">WHY URBANNEST</span><h2>Small shop. Big on care.</h2></div></div>
      <div className="why-grid">
        <div><span>01</span><h3>Curated, not crowded.</h3><p>We focus on useful pieces with personality instead of endless shelves of choices.</p></div>
        <div><span>02</span><h3>Prices that feel right.</h3><p>Everyday products selected to give you style without stretching the budget.</p></div>
        <div><span>03</span><h3>Human when it matters.</h3><p>Need help? Ask our AI assistant or send a query directly to the UrbanNest team.</p></div>
      </div>
    </section>
  )
}

function Contact({ selectedProduct }) {
  const [form, setForm] = useState({ name:'', email:'', phone:'', category:'General', message:'' })
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    if (selectedProduct) {
      setForm(f => ({ ...f, category: 'Product enquiry', message: `I would like to know more about: ${selectedProduct.name} (₹${selectedProduct.price}).` }))
      document.getElementById('contact')?.scrollIntoView({ behavior:'smooth' })
    }
  }, [selectedProduct])

  const submit = async e => {
    e.preventDefault()
    if (!queryUrl) { setStatus('missing'); return }
    setStatus('sending')
    try {
      const res = await fetch(queryUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'UrbanNest Website', submittedAt: new Date().toISOString() })
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
      setForm({ name:'', email:'', phone:'', category:'General', message:'' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="contact-section section-pad" id="contact">
      <div className="contact-intro">
        <span className="eyebrow">LET'S TALK</span>
        <h2>Have a question?<br/><em>We're here.</em></h2>
        <p>Ask about a product, delivery, store timings or anything else. Your message goes directly into our n8n-powered workflow.</p>
        <div className="contact-mini"><strong>Store hours</strong><span>Mon–Sat · 10:00 AM–8:30 PM</span></div>
        <div className="contact-mini"><strong>Location</strong><span>Your local UrbanNest store</span></div>
      </div>

      <form className="query-form" onSubmit={submit}>
        <div className="form-row">
          <label>Name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your name"/></label>
          <label>Email<input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@example.com"/></label>
        </div>
        <div className="form-row">
          <label>Phone <small>optional</small><input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+91"/></label>
          <label>Query type<select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}><option>General</option><option>Product enquiry</option><option>Delivery</option><option>Store information</option><option>Feedback</option></select></label>
        </div>
        <label>Message<textarea required rows="6" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="How can we help?"/></label>
        <button className="btn btn-dark form-submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending...' : <>Send query <Send size={16}/></>}</button>
        {status === 'success' && <div className="form-status success">✓ Thanks! Your query has been sent to UrbanNest.</div>}
        {status === 'error' && <div className="form-status error">We couldn't send that right now. Please check your n8n webhook URL.</div>}
        {status === 'missing' && <div className="form-status error">Add VITE_N8N_QUERY_WEBHOOK_URL to your .env file before testing the form.</div>}
      </form>
    </section>
  )
}

function ChatButton() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open || !chatUrl) return
    let cancelled = false
    import('@n8n/chat').then(({ createChat }) => {
      if (cancelled) return
      createChat({
        webhookUrl: chatUrl,
        mode: 'window',
        target: '#urbannest-chat',
        showWelcomeScreen: true,
        initialMessages: [
          'Hi! 👋 I’m UrbanNest AI.',
          'Ask me about our products, store timings, delivery or how to contact us.'
        ],
        i18n: {
          en: {
            title: 'UrbanNest AI',
            subtitle: 'Your little shopping assistant',
            inputPlaceholder: 'Ask UrbanNest anything...'
          }
        }
      })
    })
    return () => { cancelled = true }
  }, [open])

  return (
    <>
      {open && <div className="chat-overlay" onClick={() => setOpen(false)} />}
      <div className={`chat-shell ${open ? 'chat-open' : ''}`}>
        {open && <div id="urbannest-chat" className="n8n-chat-host" />}
        <button className="chat-fab" onClick={() => setOpen(!open)} aria-label="Open UrbanNest AI">
          {open ? <X /> : <><Sparkles size={20}/><span>Ask AI</span></>}
        </button>
      </div>
      {open && !chatUrl && <div className="chat-config-note">Add VITE_N8N_CHAT_WEBHOOK_URL to .env to connect your n8n chatbot.</div>}
    </>
  )
}

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const scrollShop = () => document.getElementById('shop')?.scrollIntoView({ behavior:'smooth' })

  return (
    <>
      <Navbar onAsk={() => window.dispatchEvent(new Event('open-urbannest-chat'))}/>
      <main>
        <Hero onExplore={scrollShop} onAsk={() => document.querySelector('.chat-fab')?.click()}/>
        <CategorySection />
        <Shop onEnquire={setSelectedProduct}/>
        <WhyChooseUs />
        <About />
        <Contact selectedProduct={selectedProduct}/>
      </main>
      <footer className="footer">
        <div><button className="brand footer-brand" onClick={() => window.scrollTo({top:0,behavior:'smooth'})}><span className="brand-mark">UN</span><span><strong>UrbanNest</strong><small>LIFESTYLE STORE</small></span></button><p>Little things. Beautiful living.</p></div>
        <div className="footer-links"><span>Home</span><span>Shop</span><span>About</span><span>Contact</span></div>
        <div className="footer-copy">© 2026 UrbanNest Lifestyle Store</div>
      </footer>
      <ChatButton />
    </>
  )
}

export default App

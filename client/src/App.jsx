import { useEffect, useState, useRef, useMemo, memo } from "react";
import {
  Sparkles,
  Volume2,
  VolumeX,
  Check,
  Search,
  Layers,
  TrendingDown,
  AlertTriangle,
  LayoutGrid,
  List,
  Cpu,
  Headphones,
  Monitor,
  HardDrive,
  Cable,
  BatteryCharging,
  Wifi,
  Keyboard,
  Package,
  X,
  Zap,
  Tag,
  Store,
  UserPlus,
  LogIn,
  Shield,
  PlusCircle,
  Edit3,
  Trash2,
  Users,
  Phone,
  Mail,
  Lock,
  UserCheck,
  Ban,
  LogOut,
  Image as ImageIcon,
  CheckCircle2,
  ShoppingBag,
  ShoppingCart,
  Star,
  Wallet,
  Percent,
  ArrowLeft,
  Receipt,
  Coins,
  Activity,
} from "lucide-react";
import "./App.css";

const API_BASE = "http://localhost:5000";

const PRESET_IMAGES = [
  {
    label: "Gaming Mouse",
    url: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&auto=format&fit=crop&q=75",
  },
  {
    label: "RGB Klaviatura",
    url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&auto=format&fit=crop&q=75",
  },
  {
    label: "Quloqchin",
    url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=75",
  },
  {
    label: "Monitor",
    url: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&auto=format&fit=crop&q=75",
  },
];

function CategoryIcon({ category, size = 15 }) {
  const cat = (category || "").toLowerCase();
  if (cat.includes("audio")) return <Headphones size={size} />;
  if (cat.includes("monitor")) return <Monitor size={size} />;
  if (cat.includes("xotira")) return <HardDrive size={size} />;
  if (cat.includes("kabel")) return <Cable size={size} />;
  if (cat.includes("quvvat")) return <BatteryCharging size={size} />;
  if (cat.includes("tarmoq")) return <Wifi size={size} />;
  if (cat.includes("periferiya")) return <Keyboard size={size} />;
  if (cat.includes("komponent")) return <Cpu size={size} />;
  if (cat.includes("gadjet")) return <Zap size={size} />;
  return <Package size={size} />;
}

function createFallbackSvg(title = "Mahsulot") {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="280" viewBox="0 0 400 280">
    <rect width="400" height="280" fill="#121824"/>
    <circle cx="200" cy="120" r="45" fill="rgba(122,165,196,0.12)" stroke="#68b694" stroke-width="2"/>
    <text x="200" y="220" fill="#d5dce6" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle">${title
      .slice(0, 26)
      .replace(/[<>&"']/g, "")}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Yengillashtirilgan (CPU < 1%) Sokin Motion Graphics Fon
const MotionGraphicsBackground = memo(function MotionGraphicsBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // 22 ta yengil zarracha — 60 FPS qotmasdan ishlashi uchun
    const particles = Array.from({ length: 22 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.8,
      color:
        Math.random() > 0.5
          ? "rgba(104, 182, 148, 0.4)"
          : "rgba(122, 165, 196, 0.4)",
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 140) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(140, 150, 166, ${(1 - dist / 140) * 0.08})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="motion-bg-container">
      <div className="cyber-grid" />
      <div className="aurora-orb orb-1" />
      <div className="aurora-orb orb-2" />
      <div className="aurora-orb orb-3" />
      <canvas ref={canvasRef} className="motion-canvas" />
    </div>
  );
});

// Memoized Mahsulot Kartasi (Qotmasdan ishlash uchun)
const ProductCard = memo(function ProductCard({
  p,
  onCheckout,
  onOpenSeller,
}) {
  const isCheap = p.price < 100000;
  const isLow = p.count < 6;
  const stockPercent = Math.min(100, Math.round((p.count / 45) * 100));

  return (
    <article className="product-card">
      <div
        className="card-image-box"
        onClick={() => onCheckout(p)}
        style={{ cursor: "pointer" }}
      >
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.currentTarget.src = createFallbackSvg(p.name);
          }}
        />
        <div className="card-image-overlay" />

        <div className="card-top-badges">
          <span className="id-pill">#{p.id}</span>
          <span className={`tier-pill ${isCheap ? "tier-cheap" : "tier-pro"}`}>
            {isCheap ? (
              <>
                <Tag size={11} /> &lt; 100 ming
              </>
            ) : (
              <>
                <Sparkles size={11} /> Premium
              </>
            )}
          </span>
        </div>
      </div>

      <div className="card-body">
        <div>
          <div className="cat-tag">
            <CategoryIcon category={p.category} size={13} />
            <span>{p.category || "Texnika"}</span>
          </div>
          <h3 className="product-title">{p.name}</h3>

          <button
            type="button"
            className="seller-mini-link"
            onClick={() => onOpenSeller(p.seller_id || 2)}
            title="Sotuvchi profiliga o'tish"
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Store size={12} />
              {p.shop_name || "TechnoZone"}
            </span>
            <span className="rating-chip">
              <Star size={12} fill="#d9a756" color="#d9a756" />
              {Number(p.seller_rating || 4.85).toFixed(1)}
            </span>
          </button>
        </div>

        <div className="card-footer-meta">
          <div className="price-row">
            <span className={`price-val ${isCheap ? "cheap" : "regular"}`}>
              {p.price.toLocaleString()} so'm
            </span>

            <button
              className="buy-btn"
              disabled={p.count <= 0}
              onClick={() => onCheckout(p)}
            >
              <ShoppingCart size={14} />
              {p.count > 0 ? "Xarid qilish" : "Tugagan"}
            </button>
          </div>

          <div className="stock-row">
            <div className="stock-progress-track">
              <div
                className="stock-progress-bar"
                style={{
                  width: `${stockPercent}%`,
                  background: isLow ? "#a84a54" : "#3b946e",
                }}
              />
            </div>
            <span className={`stock-label ${isLow ? "low" : "ok"}`}>
              {p.count} dona {isLow ? "• Kam!" : ""}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
});

export default function App() {
  const [activePage, setActivePage] = useState("store");

  const [allProducts, setAllProducts] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [ordersData, setOrdersData] = useState({
    orders: [],
    stats: {
      totalTurnover: 0,
      platformRevenue: 0,
      sellersNetIncome: 0,
      totalOrders: 0,
    },
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [viewedSellerId, setViewedSellerId] = useState(null);
  const [pingMs, setPingMs] = useState(2);

  // Filtr, Qidiruv va Sahifalash (500 ta mahsulot qotmasligi uchun)
  const [filter, setFilter] = useState("all"); // 'all' | 'cheap' | 'low-stock'
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("id-asc");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(24);
  const [adminPage, setAdminPage] = useState(1);

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [toast, setToast] = useState(null);

  // Xarid / To'lov oynasi holatlari
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const [buyQuantity, setBuyQuantity] = useState(1);
  const [buyerName, setBuyerName] = useState("");
  const [paidAmount, setPaidAmount] = useState("");

  // Sotuvchi Registratsiya / Login holatlari
  const [authMode, setAuthMode] = useState("register");
  const [regForm, setRegForm] = useState({
    full_name: "",
    shop_name: "",
    phone: "+998 ",
    email: "",
    password: "",
  });
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  // Admin Panel holatlari
  const [adminTab, setAdminTab] = useState("products");
  const [editingId, setEditingId] = useState(null);
  const [prodForm, setProdForm] = useState({
    name: "",
    category: "Aksessuarlar",
    price: "",
    count: "",
    image: PRESET_IMAGES[0].url,
    seller_id: 2,
  });

  const audioCtxRef = useRef(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // Web Audio API (Click ovozi)
  const playSound = (type = "click") => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === "tab") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(480, now);
        osc.frequency.exponentialRampToValueAtTime(740, now + 0.065);
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.075);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === "card") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(360, now);
        osc.frequency.exponentialRampToValueAtTime(620, now + 0.055);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.start(now);
        osc.stop(now + 0.065);
      } else if (type === "success") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(783.99, now + 0.065);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.17);
        osc.start(now);
        osc.stop(now + 0.18);
      } else {
        osc.type = "sine";
        osc.frequency.setValueAtTime(580, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
        osc.start(now);
        osc.stop(now + 0.05);
      }
    } catch {
      // ignore audio context restrictions
    }
  };

  // Real-time Ping o'lchagich (ms)
  const measurePing = async () => {
    try {
      const t0 = performance.now();
      await fetch(`${API_BASE}/ping`);
      const dt = Math.max(1, Math.round(performance.now() - t0));
      setPingMs(dt);
    } catch {
      // ignore
    }
  };

  const fetchAllData = async () => {
    try {
      const t0 = performance.now();
      const [prodRes, sellRes, ordRes] = await Promise.all([
        fetch(`${API_BASE}/products`),
        fetch(`${API_BASE}/sellers`),
        fetch(`${API_BASE}/orders`),
      ]);
      const dt = Math.max(1, Math.round((performance.now() - t0) / 3));
      setPingMs(dt);

      const prodData = await prodRes.json();
      const sellData = await sellRes.json();
      const ordJson = await ordRes.json();
      if (Array.isArray(prodData)) setAllProducts(prodData);
      if (Array.isArray(sellData)) {
        setSellers(sellData);
        if (currentUser) {
          const updatedMe = sellData.find((s) => s.id === currentUser.id);
          if (updatedMe) setCurrentUser(updatedMe);
        }
      }
      if (ordJson && ordJson.stats) setOrdersData(ordJson);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(measurePing, 5000);
    return () => clearInterval(interval);
  }, []);

  // Filtrni 0ms kechikish bilan xotirada almashtirish
  const switchFilter = (type) => {
    playSound("tab");
    setFilter(type);
    setCurrentPage(1);
  };

  const openSellerProfile = (sellerId) => {
    playSound("tab");
    setViewedSellerId(Number(sellerId));
    setActivePage("seller-profile");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openCheckoutModal = (product) => {
    playSound("card");
    setCheckoutProduct(product);
    setBuyQuantity(1);
    setPaidAmount(String(product.price));
  };

  // Xaridni va To'lovni tasdiqlash
  const handleConfirmPurchase = async (e) => {
    e.preventDefault();
    if (!checkoutProduct) return;

    const totalRequired = checkoutProduct.price * buyQuantity;
    const entered = Number(paidAmount);

    if (isNaN(entered) || entered < totalRequired) {
      playSound("click");
      showToast(
        `❌ Kiritilgan summa yetarli emas! Kerakli summa: ${totalRequired.toLocaleString()} so'm`
      );
      return;
    }

    const res = await fetch(`${API_BASE}/orders/buy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: checkoutProduct.id,
        quantity: buyQuantity,
        paid_amount: entered,
        buyer_name: buyerName || "Xaridor",
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      showToast(`❌ ${data.error}`);
      return;
    }

    playSound("success");
    const ord = data.order;
    showToast(
      `✅ Xarid bajarildi! Sotuvchiga: ${Number(
        ord.seller_earning
      ).toLocaleString()} so'm (95%), Sayt komissiyasi: ${Number(
        ord.commission_amount
      ).toLocaleString()} so'm (5%)`
    );

    setCheckoutProduct(null);
    await fetchAllData();
  };

  const handleRateSeller = async (sellerId, stars) => {
    playSound("success");
    const res = await fetch(`${API_BASE}/sellers/${sellerId}/rate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stars }),
    });
    if (res.ok) {
      showToast(`⭐ Siz sotuvchini ${stars} yulduz bilan baholadingiz!`);
      await fetchAllData();
    }
  };

  const handleRegisterSeller = async (e) => {
    e.preventDefault();
    playSound("success");
    const res = await fetch(`${API_BASE}/sellers/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(regForm),
    });
    const data = await res.json();
    if (!res.ok) {
      showToast(`❌ Xatolik: ${data.error}`);
      return;
    }
    setCurrentUser(data);
    setProdForm((prev) => ({ ...prev, seller_id: data.id }));
    setRegForm({
      full_name: "",
      shop_name: "",
      phone: "+998 ",
      email: "",
      password: "",
    });
    await fetchAllData();
    showToast(
      `🎉 Tabriklaymiz, ${data.full_name}! Do'koningiz ro'yxatdan o'tdi.`
    );
    setActivePage("admin");
  };

  const handleLoginSeller = async (e, customCreds = null) => {
    if (e) e.preventDefault();
    playSound("success");
    const payload = customCreds || loginForm;
    const res = await fetch(`${API_BASE}/sellers/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      showToast(`❌ Xatolik: ${data.error}`);
      return;
    }
    setCurrentUser(data);
    setProdForm((prev) => ({ ...prev, seller_id: data.id }));
    showToast(`✅ Xush kelibsiz, ${data.full_name} (${data.shop_name})!`);
    setActivePage("admin");
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    playSound("success");

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `${API_BASE}/products/${editingId}`
      : `${API_BASE}/products`;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...prodForm,
        price: Number(prodForm.price),
        count: Number(prodForm.count),
        seller_id: Number(prodForm.seller_id) || currentUser?.id || 2,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      showToast(`❌ ${data.error}`);
      return;
    }

    showToast(
      editingId
        ? `✅ Mahsulot muvaffaqiyatli yangilandi!`
        : `✅ Yangi mahsulot savdoga qo'shildi!`
    );

    setEditingId(null);
    setProdForm({
      name: "",
      category: "Aksessuarlar",
      price: "",
      count: "",
      image: PRESET_IMAGES[0].url,
      seller_id: currentUser?.id || 2,
    });
    await fetchAllData();
  };

  const handleQuickStock = async (prod, delta) => {
    playSound("click");
    const newCount = Math.max(0, prod.count + delta);
    await fetch(`${API_BASE}/products/${prod.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...prod, count: newCount }),
    });
    await fetchAllData();
  };

  const handleDeleteProduct = async (id, name) => {
    playSound("tab");
    await fetch(`${API_BASE}/products/${id}`, { method: "DELETE" });
    showToast(`🗑️ "${name}" ro'yxatdan o'chirildi.`);
    await fetchAllData();
  };

  const handleToggleSellerStatus = async (seller) => {
    playSound("click");
    const nextStatus = seller.status === "active" ? "blocked" : "active";
    await fetch(`${API_BASE}/sellers/${seller.id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });
    showToast(`🔄 ${seller.full_name} holati yangilandi.`);
    await fetchAllData();
  };

  const handleDeleteSeller = async (id, name) => {
    playSound("tab");
    await fetch(`${API_BASE}/sellers/${id}`, { method: "DELETE" });
    showToast(`🗑️ Sotuvchi "${name}" o'chirildi.`);
    await fetchAllData();
  };

  // Mavjud toifalar
  const categories = useMemo(() => {
    const set = new Set(allProducts.map((p) => p.category).filter(Boolean));
    return ["Barchasi", ...Array.from(set)];
  }, [allProducts]);

  // 500 ta mahsulotni xotirada < 0.2ms ichida filtrlash va saralash
  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allProducts
      .filter((p) => {
        if (filter === "cheap" && p.price >= 100000) return false;
        if (filter === "low-stock" && p.count >= 6) return false;
        if (
          selectedCategory !== "Barchasi" &&
          p.category !== selectedCategory
        ) {
          return false;
        }
        if (q) {
          return (
            p.name.toLowerCase().includes(q) ||
            (p.category || "").toLowerCase().includes(q) ||
            (p.shop_name || "").toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "count-asc") return a.count - b.count;
        return a.id - b.id;
      });
  }, [allProducts, filter, selectedCategory, search, sortBy]);

  // Sahifalangan mahsulotlar (DOM qotmasligi uchun)
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProducts = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, safePage, pageSize]);

  // Admin jadvali uchun sahifalash
  const adminPageSize = 25;
  const adminTotalPages = Math.max(
    1,
    Math.ceil(allProducts.length / adminPageSize)
  );
  const adminPaginatedProducts = useMemo(() => {
    const start = (adminPage - 1) * adminPageSize;
    return allProducts.slice(start, start + adminPageSize);
  }, [allProducts, adminPage]);

  const viewedSeller = useMemo(
    () => sellers.find((s) => s.id === Number(viewedSellerId)) || sellers[0],
    [sellers, viewedSellerId]
  );

  const viewedSellerProducts = useMemo(
    () =>
      allProducts.filter(
        (p) => Number(p.seller_id) === Number(viewedSeller?.id)
      ),
    [allProducts, viewedSeller]
  );

  const cheapCount = useMemo(
    () => allProducts.filter((p) => p.price < 100000).length,
    [allProducts]
  );
  const lowStockCount = useMemo(
    () => allProducts.filter((p) => p.count < 6).length,
    [allProducts]
  );
  const totalStock = useMemo(
    () => allProducts.reduce((acc, p) => acc + p.count, 0),
    [allProducts]
  );

  return (
    <>
      <MotionGraphicsBackground />

      {toast && (
        <div className="toast-alert">
          <CheckCircle2 size={18} color="#68b694" />
          <span>{toast}</span>
        </div>
      )}

      <div className="app-shell">
        {/* Top Header */}
        <header className="glass-header">
          <div
            className="brand-cluster"
            onClick={() => {
              playSound("tab");
              setActivePage("store");
            }}
          >
            <div className="brand-logo-wrap">
              <ShoppingBag size={23} />
            </div>
            <div className="brand-text">
              <h1>UzTech Market</h1>
              <p>Elektronika va aksessuarlar savdo platformasi</p>
            </div>
          </div>

          {/* Main Navigation */}
          <div className="main-nav-tabs">
            <button
              className={`main-nav-btn ${
                activePage === "store" ? "active-nav" : ""
              }`}
              onClick={() => {
                playSound("tab");
                setActivePage("store");
              }}
            >
              <Store size={15} />
              Do'kon ({allProducts.length})
            </button>

            <button
              className={`main-nav-btn ${
                activePage === "sellers" || activePage === "seller-profile"
                  ? "active-nav"
                  : ""
              }`}
              onClick={() => {
                playSound("tab");
                setActivePage("sellers");
              }}
            >
              <Users size={15} />
              Sotuvchilar ({sellers.length})
            </button>

            <button
              className={`main-nav-btn ${
                activePage === "auth" ? "active-nav" : ""
              }`}
              onClick={() => {
                playSound("tab");
                setActivePage("auth");
              }}
            >
              <UserPlus size={15} />
              Hamkor bo'lish
            </button>

            <button
              className={`main-nav-btn ${
                activePage === "admin" ? "active-admin" : ""
              }`}
              onClick={() => {
                playSound("tab");
                setActivePage("admin");
              }}
            >
              <Shield size={15} />
              Boshqaruv Paneli
            </button>
          </div>

          <div className="header-actions">
            {/* Live Ping (ms) Badge */}
            <div
              className="ping-badge"
              onClick={measurePing}
              style={{ cursor: "pointer" }}
              title="Server tezligi (Ping)"
            >
              <span className="ping-dot" />
              <Activity size={13} />
              <span>Ping: {pingMs} ms</span>
            </div>

            {currentUser && (
              <div className="user-profile-badge">
                <UserCheck size={15} />
                <span>
                  {currentUser.shop_name} •{" "}
                  {Number(currentUser.balance || 0).toLocaleString()} so'm
                </span>
                <button
                  onClick={() => {
                    playSound("click");
                    setCurrentUser(null);
                    showToast("Profilingizdan chiqildi");
                  }}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#d47a84",
                    cursor: "pointer",
                    display: "inline-flex",
                    marginLeft: 4,
                  }}
                  title="Chiqish"
                >
                  <LogOut size={14} />
                </button>
              </div>
            )}

            <button
              className={`action-chip ${soundEnabled ? "active-sound" : ""}`}
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                if (next) playSound("success");
              }}
            >
              {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
              {soundEnabled ? "Ovoz ON" : "Ovoz OFF"}
            </button>
          </div>
        </header>

        {/* =========================================================
            1. SOTUVCHILAR RO'YXATI SAHIFASI
           ========================================================= */}
        {activePage === "sellers" && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ fontSize: 21, fontWeight: 700 }}>
                Platforma Sotuvchilari va Ishchilari
              </h2>
              <p
                style={{
                  fontSize: 13.5,
                  color: "var(--text-secondary)",
                  marginTop: 4,
                }}
              >
                Istalgan sotuvchi profiliga kirib, uning mahsulotlarini
                ko'rishingiz va baho berishingiz mumkin
              </p>
            </div>

            <div className="sellers-grid">
              {sellers.map((s) => (
                <div
                  key={s.id}
                  className="seller-profile-card"
                  onClick={() => openSellerProfile(s.id)}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 12 }}
                    >
                      <div className="seller-avatar">
                        {s.shop_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 style={{ fontSize: 16, fontWeight: 700 }}>
                          {s.shop_name}
                        </h3>
                        <span
                          style={{
                            fontSize: 12.5,
                            color: "var(--text-secondary)",
                          }}
                        >
                          {s.full_name}
                        </span>
                      </div>
                    </div>

                    <div className="rating-chip">
                      <Star size={14} fill="#d9a756" color="#d9a756" />
                      <span>{Number(s.rating).toFixed(2)}</span>
                      <span
                        style={{ color: "var(--text-muted)", fontWeight: 500 }}
                      >
                        ({s.rating_count})
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 10,
                      padding: "12px",
                      borderRadius: 12,
                      background: "#0d1118",
                      border: "1px solid var(--border-subtle)",
                    }}
                  >
                    <div>
                      <span
                        style={{ fontSize: 11, color: "var(--text-muted)" }}
                      >
                        Mahsulotlari
                      </span>
                      <strong
                        style={{
                          display: "block",
                          fontSize: 14.5,
                          marginTop: 2,
                        }}
                      >
                        {s.products_count || 0} xil
                      </strong>
                    </div>
                    <div>
                      <span
                        style={{ fontSize: 11, color: "var(--text-muted)" }}
                      >
                        Sotilgan tovarlar
                      </span>
                      <strong
                        style={{
                          display: "block",
                          fontSize: 14.5,
                          marginTop: 2,
                          color: "var(--accent-sage-soft)",
                        }}
                      >
                        {s.total_sales || 0} dona
                      </strong>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: 12.5,
                      color: "var(--text-secondary)",
                    }}
                  >
                    <span>📞 {s.phone}</span>
                    <span
                      style={{
                        color: "var(--accent-slate-soft)",
                        fontWeight: 600,
                      }}
                    >
                      Profilga kirish →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================
            2. SOTUVCHI SHAXSIY PROFILI VA UNING MAHSULOTLARI
           ========================================================= */}
        {activePage === "seller-profile" && viewedSeller && (
          <div>
            <button
              className="action-chip"
              style={{ marginBottom: 16 }}
              onClick={() => {
                playSound("click");
                setActivePage("sellers");
              }}
            >
              <ArrowLeft size={15} />
              Barcha sotuvchilarga qaytish
            </button>

            <div className="seller-hero-banner">
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div
                  className="seller-avatar"
                  style={{ width: 64, height: 64, fontSize: 24 }}
                >
                  {viewedSeller.shop_name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <h2 style={{ fontSize: 22 }}>{viewedSeller.shop_name}</h2>
                    <span className="tier-pill tier-cheap">✓ Tasdiqlangan</span>
                  </div>
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: 13.5,
                      marginTop: 4,
                    }}
                  >
                    Mas'ul sotuvchi: <strong>{viewedSeller.full_name}</strong> •
                    Tel: {viewedSeller.phone}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      marginTop: 10,
                      flexWrap: "wrap",
                    }}
                  >
                    <div className="rating-chip" style={{ fontSize: 14 }}>
                      <Star size={16} fill="#d9a756" color="#d9a756" />
                      <span>
                        {Number(viewedSeller.rating).toFixed(2)} reyting
                      </span>
                      <span style={{ color: "var(--text-secondary)" }}>
                        ({viewedSeller.rating_count} ta baho)
                      </span>
                    </div>
                    <span
                      style={{ fontSize: 13, color: "var(--text-secondary)" }}
                    >
                      • Jami sotuvlar:{" "}
                      <strong>{viewedSeller.total_sales} dona</strong>
                    </span>
                    <span
                      style={{ fontSize: 13, color: "var(--accent-sage-soft)" }}
                    >
                      • Ishchi sof daromadi (95%):{" "}
                      <strong>
                        {Number(viewedSeller.balance || 0).toLocaleString()}{" "}
                        so'm
                      </strong>
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--text-secondary)",
                    marginBottom: 6,
                  }}
                >
                  Sotuvchi xizmatini baholang:
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className="star-btn"
                      onClick={() => handleRateSeller(viewedSeller.id, star)}
                    >
                      <Star size={13} fill="#d9a756" color="#d9a756" />
                      {star}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <h3 style={{ fontSize: 17, marginBottom: 16 }}>
              {viewedSeller.shop_name} tomonidan joylangan mahsulotlar (
              {viewedSellerProducts.length} ta)
            </h3>

            <section className="products-bento-grid">
              {viewedSellerProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  p={p}
                  onCheckout={openCheckoutModal}
                  onOpenSeller={openSellerProfile}
                />
              ))}
            </section>
          </div>
        )}

        {/* =========================================================
            3. SOTUVCHI REGISTRATSIYASI VA KIRISH SAHIFASI
           ========================================================= */}
        {activePage === "auth" && (
          <div className="auth-portal-grid">
            <div className="glass-panel">
              <div className="auth-mode-switch">
                <button
                  className={`auth-switch-btn ${
                    authMode === "register" ? "active" : ""
                  }`}
                  onClick={() => {
                    playSound("tab");
                    setAuthMode("register");
                  }}
                >
                  <UserPlus size={15} />
                  Yangi Sotuvchi Ro'yxatdan O'tish
                </button>
                <button
                  className={`auth-switch-btn ${
                    authMode === "login" ? "active" : ""
                  }`}
                  onClick={() => {
                    playSound("tab");
                    setAuthMode("login");
                  }}
                >
                  <LogIn size={15} />
                  Shaxsiy Kabinetga Kirish
                </button>
              </div>

              {authMode === "register" ? (
                <form onSubmit={handleRegisterSeller}>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>
                        <Users size={14} /> Ism va Familiya
                      </label>
                      <input
                        type="text"
                        required
                        className="pro-input"
                        placeholder="Masalan: Jasur Aliyev"
                        value={regForm.full_name}
                        onChange={(e) =>
                          setRegForm({ ...regForm, full_name: e.target.value })
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <Store size={14} /> Do'kon Nomi
                      </label>
                      <input
                        type="text"
                        required
                        className="pro-input"
                        placeholder="Masalan: Galaxy Tech Shop"
                        value={regForm.shop_name}
                        onChange={(e) =>
                          setRegForm({ ...regForm, shop_name: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>
                        <Phone size={14} /> Telefon raqam
                      </label>
                      <input
                        type="text"
                        required
                        className="pro-input"
                        placeholder="+998 90 123-45-67"
                        value={regForm.phone}
                        onChange={(e) =>
                          setRegForm({ ...regForm, phone: e.target.value })
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <Mail size={14} /> Email manzili
                      </label>
                      <input
                        type="email"
                        required
                        className="pro-input"
                        placeholder="seller@dokon.uz"
                        value={regForm.email}
                        onChange={(e) =>
                          setRegForm({ ...regForm, email: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      <Lock size={14} /> Maxfiy parol
                    </label>
                    <input
                      type="password"
                      required
                      className="pro-input"
                      placeholder="Kamida 6 ta belgi..."
                      value={regForm.password}
                      onChange={(e) =>
                        setRegForm({ ...regForm, password: e.target.value })
                      }
                    />
                  </div>

                  <button type="submit" className="primary-submit-btn">
                    <UserPlus size={17} />
                    Sotuvchi sifatida ro'yxatdan o'tish
                  </button>
                </form>
              ) : (
                <form onSubmit={handleLoginSeller}>
                  <div className="form-group">
                    <label>
                      <Mail size={14} /> Email manzili
                    </label>
                    <input
                      type="email"
                      required
                      className="pro-input"
                      placeholder="admin@shop.uz yoki sardor@techno.uz"
                      value={loginForm.email}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <Lock size={14} /> Parol
                    </label>
                    <input
                      type="password"
                      required
                      className="pro-input"
                      placeholder="••••••••"
                      value={loginForm.password}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, password: e.target.value })
                      }
                    />
                  </div>

                  <button type="submit" className="primary-submit-btn">
                    <LogIn size={17} />
                    Tizimga kirish
                  </button>
                </form>
              )}

              <div className="demo-login-box">
                <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                  Tezkor kirish uchun tayyor profillar:
                </span>
                <div className="demo-btn-row">
                  <button
                    type="button"
                    className="demo-btn"
                    onClick={() =>
                      handleLoginSeller(null, {
                        email: "admin@shop.uz",
                        password: "admin123",
                      })
                    }
                  >
                    <Shield size={14} color="#7aa5c4" />
                    Bosh Admin
                  </button>
                  <button
                    type="button"
                    className="demo-btn"
                    onClick={() =>
                      handleLoginSeller(null, {
                        email: "sardor@techno.uz",
                        password: "123456",
                      })
                    }
                  >
                    <Store size={14} color="#68b694" />
                    Sotuvchi (TechnoZone)
                  </button>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div className="glass-panel">
                <h3
                  style={{
                    fontSize: 16,
                    marginBottom: 12,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Wallet size={18} color="#68b694" />
                  Avtomatik Daromad va Komissiya Tizimi
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                  }}
                >
                  Mijoz sizning mahsulotingizni sotib olganda to'lov summasi
                  avtomatik tarzda hisoblanadi:
                </p>
                <div className="commission-breakdown" style={{ marginTop: 12 }}>
                  <div className="breakdown-row">
                    <span>Sotuvchi (Ishchi) sof ulushi:</span>
                    <strong style={{ color: "var(--accent-sage-soft)" }}>
                      95% (Avtomatik balansga)
                    </strong>
                  </div>
                  <div className="breakdown-row">
                    <span>Platforma xizmat komissiyasi:</span>
                    <strong style={{ color: "var(--accent-amber-soft)" }}>
                      5% (Sayt daromadiga)
                    </strong>
                  </div>
                </div>
              </div>

              <div className="glass-panel">
                <h3
                  style={{
                    fontSize: 15.5,
                    marginBottom: 12,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Users size={17} color="#7aa5c4" />
                  Faol Sotuvchilar ({sellers.length} ta)
                </h3>

                <div
                  style={{ display: "flex", flexDirection: "column", gap: 9 }}
                >
                  {sellers.slice(0, 5).map((s) => (
                    <div
                      key={s.id}
                      onClick={() => openSellerProfile(s.id)}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px 13px",
                        borderRadius: 11,
                        background: "#0d1118",
                        border: "1px solid var(--border-subtle)",
                        cursor: "pointer",
                      }}
                    >
                      <div>
                        <strong style={{ fontSize: 13.5 }}>{s.shop_name}</strong>
                        <div
                          style={{
                            fontSize: 12,
                            color: "var(--text-secondary)",
                          }}
                        >
                          {s.full_name} • Daromad:{" "}
                          <span style={{ color: "var(--accent-sage-soft)" }}>
                            {Number(s.balance || 0).toLocaleString()} so'm
                          </span>
                        </div>
                      </div>
                      <div className="rating-chip">
                        <Star size={13} fill="#d9a756" color="#d9a756" />
                        {Number(s.rating).toFixed(1)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            4. ADMIN VA MOLIYA BOSHQARUV PANELI
           ========================================================= */}
        {activePage === "admin" && (
          <div>
            <section className="kpi-grid">
              <div className="kpi-card">
                <div className="kpi-meta">
                  <span>Jami Savdo Aylanmasi (100%)</span>
                  <h2>
                    {ordersData.stats.totalTurnover.toLocaleString()} so'm
                  </h2>
                  <small>
                    Jami {ordersData.stats.totalOrders} ta muvaffaqiyatli xarid
                  </small>
                </div>
                <div
                  className="kpi-icon-orb"
                  style={{
                    background: "rgba(122, 165, 196, 0.12)",
                    color: "#7aa5c4",
                  }}
                >
                  <Coins size={22} />
                </div>
              </div>

              <div className="kpi-card selected-kpi">
                <div className="kpi-meta">
                  <span>Sayt Sof Daromadi (5% Komissiya)</span>
                  <h2 style={{ color: "var(--accent-amber-soft)" }}>
                    {ordersData.stats.platformRevenue.toLocaleString()} so'm
                  </h2>
                  <small>Har bir sotuvdan 5% avtomatik ushlanadi</small>
                </div>
                <div
                  className="kpi-icon-orb"
                  style={{
                    background: "rgba(217, 167, 86, 0.14)",
                    color: "#d9a756",
                  }}
                >
                  <Percent size={22} />
                </div>
              </div>

              <div className="kpi-card">
                <div className="kpi-meta">
                  <span>Ishchilar Sof Daromadi (95%)</span>
                  <h2 style={{ color: "var(--accent-sage-soft)" }}>
                    {ordersData.stats.sellersNetIncome.toLocaleString()} so'm
                  </h2>
                  <small>Sotuvchilar balansiga o'tkazilgan</small>
                </div>
                <div
                  className="kpi-icon-orb"
                  style={{
                    background: "rgba(104, 182, 148, 0.14)",
                    color: "#68b694",
                  }}
                >
                  <Wallet size={22} />
                </div>
              </div>
            </section>

            <div className="admin-subtabs">
              <button
                className={`admin-subtab-btn ${
                  adminTab === "products" ? "active" : ""
                }`}
                onClick={() => {
                  playSound("tab");
                  setAdminTab("products");
                }}
              >
                <Package size={15} />
                Mahsulotlarni Boshqarish ({allProducts.length})
              </button>

              <button
                className={`admin-subtab-btn ${
                  adminTab === "sellers" ? "active" : ""
                }`}
                onClick={() => {
                  playSound("tab");
                  setAdminTab("sellers");
                }}
              >
                <Users size={15} />
                Ishchilar va Daromadlar ({sellers.length})
              </button>

              <button
                className={`admin-subtab-btn ${
                  adminTab === "orders" ? "active" : ""
                }`}
                onClick={() => {
                  playSound("tab");
                  setAdminTab("orders");
                }}
              >
                <Receipt size={15} />
                To'lovlar va Komissiya Tarixi ({ordersData.orders.length})
              </button>
            </div>

            {adminTab === "products" && (
              <div className="admin-split-layout">
                <div className="glass-panel">
                  <h3
                    style={{
                      fontSize: 16,
                      marginBottom: 16,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    {editingId ? (
                      <>
                        <Edit3 size={17} color="#d9a756" />
                        Mahsulot #{editingId} ni Tahrirlash
                      </>
                    ) : (
                      <>
                        <PlusCircle size={17} color="#68b694" />
                        Yangi Mahsulot Qo'shish
                      </>
                    )}
                  </h3>

                  <form onSubmit={handleSaveProduct}>
                    <div className="form-group">
                      <label>Mas'ul Sotuvchi (Do'kon)</label>
                      <select
                        className="pro-input"
                        value={prodForm.seller_id}
                        onChange={(e) =>
                          setProdForm({ ...prodForm, seller_id: e.target.value })
                        }
                      >
                        {sellers.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.shop_name} ({s.full_name})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Mahsulot nomi</label>
                      <input
                        type="text"
                        required
                        className="pro-input"
                        placeholder="Masalan: Razer Viper Mini"
                        value={prodForm.name}
                        onChange={(e) =>
                          setProdForm({ ...prodForm, name: e.target.value })
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label>Toifa (Kategoriya)</label>
                      <select
                        className="pro-input"
                        value={prodForm.category}
                        onChange={(e) =>
                          setProdForm({ ...prodForm, category: e.target.value })
                        }
                      >
                        <option value="Aksessuarlar">Aksessuarlar</option>
                        <option value="Periferiya">Periferiya</option>
                        <option value="Audio">Audio</option>
                        <option value="Monitorlar">Monitorlar</option>
                        <option value="Xotira">Xotira</option>
                        <option value="Kabellar">Kabellar</option>
                        <option value="Quvvatlagich">Quvvatlagich</option>
                        <option value="Tarmoq">Tarmoq</option>
                        <option value="Gadjetlar">Gadjetlar</option>
                        <option value="Komponentlar">Komponentlar</option>
                      </select>
                    </div>

                    <div className="form-grid-2">
                      <div className="form-group">
                        <label>Narxi (so'm)</label>
                        <input
                          type="number"
                          required
                          className="pro-input"
                          placeholder="75000"
                          value={prodForm.price}
                          onChange={(e) =>
                            setProdForm({ ...prodForm, price: e.target.value })
                          }
                        />
                      </div>

                      <div className="form-group">
                        <label>Ombordagi soni</label>
                        <input
                          type="number"
                          required
                          className="pro-input"
                          placeholder="15"
                          value={prodForm.count}
                          onChange={(e) =>
                            setProdForm({ ...prodForm, count: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>
                        <ImageIcon size={14} /> Rasm URL manzili
                      </label>
                      <input
                        type="text"
                        className="pro-input"
                        placeholder="https://images.unsplash.com/..."
                        value={prodForm.image}
                        onChange={(e) =>
                          setProdForm({ ...prodForm, image: e.target.value })
                        }
                      />
                      <div
                        style={{
                          display: "flex",
                          gap: 6,
                          flexWrap: "wrap",
                          marginTop: 6,
                        }}
                      >
                        {PRESET_IMAGES.map((img) => (
                          <button
                            key={img.label}
                            type="button"
                            className="mini-action-btn"
                            onClick={() => {
                              playSound("click");
                              setProdForm({ ...prodForm, image: img.url });
                            }}
                          >
                            {img.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button type="submit" className="primary-submit-btn">
                      {editingId ? (
                        <>
                          <Check size={17} /> O'zgarishlarni Saqlash
                        </>
                      ) : (
                        <>
                          <PlusCircle size={17} /> Savdoga Qo'shish
                        </>
                      )}
                    </button>

                    {editingId && (
                      <button
                        type="button"
                        className="demo-btn"
                        style={{ width: "100%", marginTop: 10 }}
                        onClick={() => {
                          setEditingId(null);
                          setProdForm({
                            name: "",
                            category: "Aksessuarlar",
                            price: "",
                            count: "",
                            image: PRESET_IMAGES[0].url,
                            seller_id: currentUser?.id || 2,
                          });
                        }}
                      >
                        Bekor qilish
                      </button>
                    )}
                  </form>
                </div>

                <div>
                  <div className="pro-table-container">
                    <table className="pro-table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Mahsulot va Sotuvchi</th>
                          <th>Narxi</th>
                          <th>Qoldiq (+ / -)</th>
                          <th>Amallar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {adminPaginatedProducts.map((p) => (
                          <tr key={p.id}>
                            <td>
                              <span className="id-pill">#{p.id}</span>
                            </td>
                            <td>
                              <div className="table-prod-cell">
                                <img
                                  src={p.image}
                                  alt={p.name}
                                  loading="lazy"
                                  className="table-thumb"
                                  onError={(e) => {
                                    e.currentTarget.src = createFallbackSvg(
                                      p.name
                                    );
                                  }}
                                />
                                <div>
                                  <strong>{p.name}</strong>
                                  <div
                                    style={{
                                      fontSize: 12,
                                      color: "var(--text-secondary)",
                                    }}
                                  >
                                    {p.shop_name} • {p.category}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span
                                className={`price-val ${
                                  p.price < 100000 ? "cheap" : "regular"
                                }`}
                                style={{ fontSize: 14 }}
                              >
                                {p.price.toLocaleString()} so'm
                              </span>
                            </td>
                            <td>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 8,
                                }}
                              >
                                <button
                                  className="mini-action-btn"
                                  onClick={() => handleQuickStock(p, -1)}
                                >
                                  -
                                </button>
                                <strong
                                  style={{
                                    minWidth: 26,
                                    textAlign: "center",
                                    color:
                                      p.count < 6
                                        ? "var(--accent-rose-soft)"
                                        : "var(--text-primary)",
                                  }}
                                >
                                  {p.count}
                                </strong>
                                <button
                                  className="mini-action-btn"
                                  onClick={() => handleQuickStock(p, 1)}
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td>
                              <div style={{ display: "flex", gap: 8 }}>
                                <button
                                  className="mini-action-btn"
                                  onClick={() => {
                                    playSound("click");
                                    setEditingId(p.id);
                                    setProdForm({
                                      name: p.name,
                                      category: p.category || "Aksessuarlar",
                                      price: p.price,
                                      count: p.count,
                                      image: p.image,
                                      seller_id: p.seller_id || 2,
                                    });
                                  }}
                                >
                                  <Edit3 size={13} /> Tahrir
                                </button>
                                <button
                                  className="mini-action-btn danger"
                                  onClick={() =>
                                    handleDeleteProduct(p.id, p.name)
                                  }
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Admin Pagination */}
                  <div className="pagination-bar">
                    <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                      Sahifa {adminPage} / {adminTotalPages} (Jami{" "}
                      {allProducts.length} ta mahsulot)
                    </span>
                    <div className="page-btn-group">
                      <button
                        className="page-btn"
                        disabled={adminPage <= 1}
                        onClick={() => {
                          playSound("click");
                          setAdminPage((p) => Math.max(1, p - 1));
                        }}
                      >
                        ← Oldingi
                      </button>
                      <button
                        className="page-btn"
                        disabled={adminPage >= adminTotalPages}
                        onClick={() => {
                          playSound("click");
                          setAdminPage((p) =>
                            Math.min(adminTotalPages, p + 1)
                          );
                        }}
                      >
                        Keyingi →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {adminTab === "sellers" && (
              <div className="pro-table-container">
                <table className="pro-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Sotuvchi (Ishchi)</th>
                      <th>Do'kon Nomi</th>
                      <th>Reyting</th>
                      <th>Sotilgan</th>
                      <th>Sof Daromadi (95%)</th>
                      <th>Holati</th>
                      <th>Boshqarish</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sellers.map((s) => (
                      <tr key={s.id}>
                        <td>
                          <span className="id-pill">#{s.id}</span>
                        </td>
                        <td>
                          <strong>{s.full_name}</strong>
                          <div
                            style={{
                              fontSize: 12,
                              color: "var(--text-secondary)",
                            }}
                          >
                            {s.phone}
                          </div>
                        </td>
                        <td>
                          <span
                            onClick={() => openSellerProfile(s.id)}
                            style={{
                              color: "var(--accent-slate-soft)",
                              fontWeight: 600,
                              cursor: "pointer",
                              textDecoration: "underline",
                            }}
                          >
                            {s.shop_name}
                          </span>
                        </td>
                        <td>
                          <div className="rating-chip">
                            <Star size={13} fill="#d9a756" color="#d9a756" />
                            {Number(s.rating).toFixed(2)} ({s.rating_count})
                          </div>
                        </td>
                        <td>
                          <strong>{s.total_sales || 0} dona</strong>
                        </td>
                        <td>
                          <strong style={{ color: "var(--accent-sage-soft)" }}>
                            {Number(s.balance || 0).toLocaleString()} so'm
                          </strong>
                        </td>
                        <td>
                          <span
                            className={`tier-pill ${
                              s.status === "active" ? "tier-cheap" : "tier-pro"
                            }`}
                          >
                            {s.status === "active" ? "Faol" : "Bloklangan"}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: "flex", gap: 8 }}>
                            <button
                              className="mini-action-btn"
                              onClick={() => handleToggleSellerStatus(s)}
                            >
                              <Ban size={13} />
                              {s.status === "active"
                                ? "Bloklash"
                                : "Faollashtirish"}
                            </button>
                            {s.role !== "admin" && (
                              <button
                                className="mini-action-btn danger"
                                onClick={() =>
                                  handleDeleteSeller(s.id, s.full_name)
                                }
                              >
                                <Trash2 size={13} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {adminTab === "orders" && (
              <div className="pro-table-container">
                <table className="pro-table">
                  <thead>
                    <tr>
                      <th>Chek #</th>
                      <th>Mijoz</th>
                      <th>Mahsulot</th>
                      <th>Sotuvchi (Do'kon)</th>
                      <th>Soni</th>
                      <th>Jami To'lov (100%)</th>
                      <th>Sayt Komissiyasi (5%)</th>
                      <th>Ishchi Daromadi (95%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordersData.orders.length === 0 ? (
                      <tr>
                        <td
                          colSpan="8"
                          style={{
                            textAlign: "center",
                            padding: 32,
                            color: "var(--text-secondary)",
                          }}
                        >
                          Hozircha xaridlar amalga oshirilmagan. Do'kon
                          bo'limidan mahsulot xarid qilib sinab ko'ring!
                        </td>
                      </tr>
                    ) : (
                      ordersData.orders.map((ord) => (
                        <tr key={ord.id}>
                          <td>
                            <span className="id-pill">#{ord.id}</span>
                          </td>
                          <td>
                            <strong>{ord.buyer_name}</strong>
                          </td>
                          <td>{ord.product_name}</td>
                          <td>
                            <span style={{ color: "var(--accent-slate-soft)" }}>
                              {ord.shop_name}
                            </span>
                          </td>
                          <td>{ord.quantity} dona</td>
                          <td>
                            <strong>
                              {Number(ord.total_amount).toLocaleString()} so'm
                            </strong>
                          </td>
                          <td>
                            <strong
                              style={{ color: "var(--accent-amber-soft)" }}
                            >
                              +{Number(ord.commission_amount).toLocaleString()}{" "}
                              so'm
                            </strong>
                          </td>
                          <td>
                            <strong
                              style={{ color: "var(--accent-sage-soft)" }}
                            >
                              +{Number(ord.seller_earning).toLocaleString()}{" "}
                              so'm
                            </strong>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* =========================================================
            5. ASOSIY DO'KON VITRINASI (500 TA MAHSULOT, TEZKOR PAGINATION)
           ========================================================= */}
        {activePage === "store" && (
          <>
            <section className="kpi-grid">
              <div
                className={`kpi-card ${filter === "all" ? "selected-kpi" : ""}`}
                onClick={() => switchFilter("all")}
              >
                <div className="kpi-meta">
                  <span>Jami Mahsulotlar</span>
                  <h2>{allProducts.length || 500} ta</h2>
                  <small>Omborda {totalStock.toLocaleString()} dona mavjud</small>
                </div>
                <div
                  className="kpi-icon-orb"
                  style={{
                    background: "rgba(122, 165, 196, 0.12)",
                    color: "#7aa5c4",
                  }}
                >
                  <Layers size={22} />
                </div>
              </div>

              <div
                className={`kpi-card ${
                  filter === "cheap" ? "selected-kpi" : ""
                }`}
                onClick={() => switchFilter("cheap")}
              >
                <div className="kpi-meta">
                  <span>100 mingdan arzon</span>
                  <h2 style={{ color: "var(--accent-sage-soft)" }}>
                    {cheapCount} ta
                  </h2>
                  <small>Hamyonbop mahsulotlar</small>
                </div>
                <div
                  className="kpi-icon-orb"
                  style={{
                    background: "rgba(104, 182, 148, 0.14)",
                    color: "#68b694",
                  }}
                >
                  <TrendingDown size={22} />
                </div>
              </div>

              <div
                className="kpi-card"
                onClick={() => {
                  playSound("tab");
                  setActivePage("sellers");
                }}
              >
                <div className="kpi-meta">
                  <span>Ishchilar Daromadi (95%)</span>
                  <h2 style={{ color: "var(--accent-sage-soft)" }}>
                    {ordersData.stats.sellersNetIncome.toLocaleString()} so'm
                  </h2>
                  <small>{sellers.length} ta faol sotuvchi profili →</small>
                </div>
                <div
                  className="kpi-icon-orb"
                  style={{
                    background: "rgba(104, 182, 148, 0.14)",
                    color: "#68b694",
                  }}
                >
                  <Wallet size={22} />
                </div>
              </div>

              <div
                className="kpi-card"
                onClick={() => {
                  playSound("tab");
                  setActivePage("admin");
                  setAdminTab("orders");
                }}
              >
                <div className="kpi-meta">
                  <span>Sayt Daromadi (5% Komissiya)</span>
                  <h2 style={{ color: "var(--accent-amber-soft)" }}>
                    {ordersData.stats.platformRevenue.toLocaleString()} so'm
                  </h2>
                  <small>
                    Jami xaridlar: {ordersData.stats.totalOrders} ta
                  </small>
                </div>
                <div
                  className="kpi-icon-orb"
                  style={{
                    background: "rgba(217, 167, 86, 0.14)",
                    color: "#d9a756",
                  }}
                >
                  <Percent size={22} />
                </div>
              </div>
            </section>

            <section className="controls-panel">
              <div className="primary-toolbar">
                <div className="sql-filter-group">
                  <button
                    className={`sql-tab ${filter === "all" ? "tab-all" : ""}`}
                    onClick={() => switchFilter("all")}
                  >
                    <Layers size={15} />
                    Barcha mahsulotlar ({allProducts.length})
                  </button>

                  <button
                    className={`sql-tab ${
                      filter === "cheap" ? "tab-cheap" : ""
                    }`}
                    onClick={() => switchFilter("cheap")}
                  >
                    <TrendingDown size={15} />
                    100 000 so'mdan arzonlar ({cheapCount})
                  </button>

                  <button
                    className={`sql-tab ${
                      filter === "low-stock" ? "tab-low" : ""
                    }`}
                    onClick={() => switchFilter("low-stock")}
                  >
                    <AlertTriangle size={15} />
                    Kam qolganlar ({lowStockCount})
                  </button>
                </div>

                <div className="search-sort-cluster">
                  <div className="search-field-wrap">
                    <Search size={15} className="search-field-icon" />
                    <input
                      type="text"
                      className="search-field"
                      placeholder="500 ta mahsulot ichidan tezkor qidiruv..."
                      value={search}
                      onClick={() => playSound("click")}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                      }}
                    />
                  </div>

                  <select
                    className="sort-select"
                    value={sortBy}
                    onChange={(e) => {
                      playSound("click");
                      setSortBy(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="id-asc">Tartib: Standart</option>
                    <option value="price-asc">Narx: Arzondan qimmatga</option>
                    <option value="price-desc">Narx: Qimmatdan arzonga</option>
                    <option value="count-asc">Qoldiq: Kam qolganlar</option>
                  </select>

                  <select
                    className="sort-select"
                    value={pageSize}
                    onChange={(e) => {
                      playSound("click");
                      setPageSize(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    title="Sahifadagi mahsulotlar soni"
                  >
                    <option value={24}>Sahifada: 24 ta</option>
                    <option value={48}>Sahifada: 48 ta</option>
                    <option value={100}>Sahifada: 100 ta</option>
                    <option value={500}>Barchasi: 500 ta</option>
                  </select>

                  <div className="view-switcher">
                    <button
                      className={`view-btn ${
                        viewMode === "grid" ? "active" : ""
                      }`}
                      onClick={() => {
                        playSound("click");
                        setViewMode("grid");
                      }}
                    >
                      <LayoutGrid size={14} />
                      Karta
                    </button>
                    <button
                      className={`view-btn ${
                        viewMode === "table" ? "active" : ""
                      }`}
                      onClick={() => {
                        playSound("click");
                        setViewMode("table");
                      }}
                    >
                      <List size={14} />
                      Jadval
                    </button>
                  </div>
                </div>
              </div>

              <div className="category-strip">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`cat-pill ${
                      selectedCategory === cat ? "active" : ""
                    }`}
                    onClick={() => {
                      playSound("click");
                      setSelectedCategory(cat);
                      setCurrentPage(1);
                    }}
                  >
                    {cat === "Barchasi" ? (
                      <Sparkles size={13} />
                    ) : (
                      <CategoryIcon category={cat} size={13} />
                    )}
                    {cat}
                  </button>
                ))}
              </div>
            </section>

            {/* Mahsulot Kartalari yoki Jadvali */}
            {viewMode === "grid" ? (
              <section className="products-bento-grid">
                {paginatedProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    p={p}
                    onCheckout={openCheckoutModal}
                    onOpenSeller={openSellerProfile}
                  />
                ))}
              </section>
            ) : (
              <section className="pro-table-container">
                <table className="pro-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Mahsulot</th>
                      <th>Sotuvchi va Reyting</th>
                      <th>Narxi (UZS)</th>
                      <th>Qoldiq</th>
                      <th>Xarid</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedProducts.map((p) => {
                      const isCheap = p.price < 100000;
                      const isLow = p.count < 6;
                      return (
                        <tr key={p.id}>
                          <td>
                            <span className="id-pill">#{p.id}</span>
                          </td>
                          <td>
                            <div className="table-prod-cell">
                              <img
                                src={p.image}
                                alt={p.name}
                                loading="lazy"
                                className="table-thumb"
                                onError={(e) => {
                                  e.currentTarget.src = createFallbackSvg(
                                    p.name
                                  );
                                }}
                              />
                              <div>
                                <strong>{p.name}</strong>
                                <div
                                  style={{
                                    fontSize: 12,
                                    color: "var(--text-secondary)",
                                  }}
                                >
                                  {p.category}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div
                              onClick={() =>
                                openSellerProfile(p.seller_id || 2)
                              }
                              style={{
                                cursor: "pointer",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                              }}
                            >
                              <span
                                style={{
                                  color: "var(--accent-slate-soft)",
                                  fontWeight: 600,
                                }}
                              >
                                {p.shop_name}
                              </span>
                              <span className="rating-chip">
                                <Star
                                  size={12}
                                  fill="#d9a756"
                                  color="#d9a756"
                                />
                                {Number(p.seller_rating || 4.85).toFixed(1)}
                              </span>
                            </div>
                          </td>
                          <td>
                            <span
                              className={`price-val ${
                                isCheap ? "cheap" : "regular"
                              }`}
                              style={{ fontSize: 15 }}
                            >
                              {p.price.toLocaleString()} so'm
                            </span>
                          </td>
                          <td>
                            <span
                              className={`stock-label ${isLow ? "low" : "ok"}`}
                            >
                              {p.count} dona
                            </span>
                          </td>
                          <td>
                            <button
                              className="buy-btn"
                              disabled={p.count <= 0}
                              onClick={() => openCheckoutModal(p)}
                            >
                              <ShoppingCart size={14} />
                              Xarid qilish
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </section>
            )}

            {/* Tezkor Sahifalash Paneli */}
            {totalPages > 1 && (
              <div className="pagination-bar">
                <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                  Jami <strong>{filteredProducts.length}</strong> ta mahsulotdan{" "}
                  <strong>
                    {(safePage - 1) * pageSize + 1}–
                    {Math.min(safePage * pageSize, filteredProducts.length)}
                  </strong>{" "}
                  ko'rsatilmoqda
                </span>

                <div className="page-btn-group">
                  <button
                    className="page-btn"
                    disabled={safePage <= 1}
                    onClick={() => {
                      playSound("click");
                      setCurrentPage((p) => Math.max(1, p - 1));
                      window.scrollTo({ top: 240, behavior: "smooth" });
                    }}
                  >
                    ← Oldingi
                  </button>

                  {Array.from({ length: Math.min(totalPages, 8) }, (_, idx) => {
                    const pageNum = idx + 1;
                    return (
                      <button
                        key={pageNum}
                        className={`page-btn ${
                          safePage === pageNum ? "active" : ""
                        }`}
                        onClick={() => {
                          playSound("click");
                          setCurrentPage(pageNum);
                          window.scrollTo({ top: 240, behavior: "smooth" });
                        }}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  {totalPages > 8 && (
                    <button
                      className={`page-btn ${
                        safePage === totalPages ? "active" : ""
                      }`}
                      onClick={() => {
                        playSound("click");
                        setCurrentPage(totalPages);
                        window.scrollTo({ top: 240, behavior: "smooth" });
                      }}
                    >
                      ... {totalPages}
                    </button>
                  )}

                  <button
                    className="page-btn"
                    disabled={safePage >= totalPages}
                    onClick={() => {
                      playSound("click");
                      setCurrentPage((p) => Math.min(totalPages, p + 1));
                      window.scrollTo({ top: 240, behavior: "smooth" });
                    }}
                  >
                    Keyingi →
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* =========================================================
            TO'LOV VA XARID QILISH OYNASI
           ========================================================= */}
        {checkoutProduct && (
          <div
            className="modal-backdrop"
            onClick={() => {
              playSound("click");
              setCheckoutProduct(null);
            }}
          >
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="modal-hero">
                <img
                  src={checkoutProduct.image}
                  alt={checkoutProduct.name}
                  onError={(e) => {
                    e.currentTarget.src = createFallbackSvg(
                      checkoutProduct.name
                    );
                  }}
                />
                <button
                  className="modal-close-btn"
                  onClick={() => {
                    playSound("click");
                    setCheckoutProduct(null);
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="modal-content">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span className="cat-tag">
                    <CategoryIcon
                      category={checkoutProduct.category}
                      size={14}
                    />
                    {checkoutProduct.category}
                  </span>
                  <span
                    onClick={() => {
                      const sId = checkoutProduct.seller_id || 2;
                      setCheckoutProduct(null);
                      openSellerProfile(sId);
                    }}
                    style={{
                      fontSize: 12.5,
                      color: "var(--accent-slate-soft)",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <Store size={13} />
                    {checkoutProduct.shop_name} (★{" "}
                    {Number(checkoutProduct.seller_rating || 4.85).toFixed(1)})
                  </span>
                </div>

                <h2 style={{ fontSize: 20, marginTop: 4, marginBottom: 14 }}>
                  {checkoutProduct.name}
                </h2>

                <form onSubmit={handleConfirmPurchase}>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>Xaridor ismi (ixtiyoriy)</label>
                      <input
                        type="text"
                        className="pro-input"
                        placeholder="Ismingiz..."
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        Xarid soni (Max: {checkoutProduct.count} dona)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max={checkoutProduct.count}
                        required
                        className="pro-input"
                        value={buyQuantity}
                        onChange={(e) => {
                          const q = Math.max(
                            1,
                            Math.min(
                              checkoutProduct.count,
                              Number(e.target.value) || 1
                            )
                          );
                          setBuyQuantity(q);
                          setPaidAmount(String(checkoutProduct.price * q));
                        }}
                      />
                    </div>
                  </div>

                  {(() => {
                    const totalReq = checkoutProduct.price * buyQuantity;
                    const siteComm = Math.round(totalReq * 0.05);
                    const sellerNet = totalReq - siteComm;
                    return (
                      <div className="commission-breakdown">
                        <div className="breakdown-row">
                          <span>Donasining narxi:</span>
                          <span>
                            {checkoutProduct.price.toLocaleString()} so'm ×{" "}
                            {buyQuantity} ta
                          </span>
                        </div>
                        <div className="breakdown-row">
                          <span>
                            Sotuvchiga tushadigan sof daromad (95%):
                          </span>
                          <strong style={{ color: "var(--accent-sage-soft)" }}>
                            {sellerNet.toLocaleString()} so'm
                          </strong>
                        </div>
                        <div className="breakdown-row">
                          <span>Sayt komissiyasi (5%):</span>
                          <strong style={{ color: "var(--accent-amber-soft)" }}>
                            {siteComm.toLocaleString()} so'm
                          </strong>
                        </div>
                        <div className="breakdown-row total">
                          <span>To'lanishi kerak bo'lgan summa:</span>
                          <span style={{ color: "var(--accent-sage-soft)" }}>
                            {totalReq.toLocaleString()} so'm
                          </span>
                        </div>
                      </div>
                    );
                  })()}

                  <div className="form-group">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <label>
                        <Wallet size={14} color="#68b694" /> To'lov summasini
                        kiriting (so'm) — Karta kiritish shart emas
                      </label>
                      <button
                        type="button"
                        className="mini-action-btn"
                        onClick={() => {
                          playSound("click");
                          setPaidAmount(
                            String(checkoutProduct.price * buyQuantity)
                          );
                        }}
                      >
                        Aniq summani yozish
                      </button>
                    </div>
                    <input
                      type="number"
                      required
                      className="pro-input"
                      placeholder="To'lov summasini kiriting..."
                      value={paidAmount}
                      onChange={(e) => setPaidAmount(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="primary-submit-btn">
                    <Check size={17} />
                    To'lov qilish va Xaridni yakunlash
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

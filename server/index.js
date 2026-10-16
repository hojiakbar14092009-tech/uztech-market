import express from "express";
import cors from "cors";
import EmbeddedPostgres from "embedded-postgres";
import pg from "pg";

const { Pool } = pg;

const app = express();
app.use(cors());
app.use(express.json());

// 1. Database serverini ishga tushirish (Port: 5432)
const ep = new EmbeddedPostgres({
  port: 5432,
  databaseDir: "./pgdata",
  user: "postgres",
  password: "password",
  persistent: true,
  onLog: () => {},
});

try {
  await ep.start();
  console.log("🐘 Database server ishga tushdi (port: 5432)!");
} catch {
  console.log("🐘 Database ulanishga tayyor.");
}

// 2. Database Pool (yuqori tezlik uchun sozlangan)
const pool = new Pool({
  host: "127.0.0.1",
  port: 5432,
  user: "postgres",
  password: "password",
  database: "postgres",
  max: 20,
  idleTimeoutMillis: 30000,
});

// 500 ta mahsulot generatsiya qilish uchun tayanch ma'lumotlar (optimallashtirilgan rasm o'lchamlari w=400&q=75)
const BASE_CATALOG = [
  { name: "Logitech G102 Gaming Mouse", cat: "Aksessuarlar", basePrice: 85000, img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&auto=format&fit=crop&q=75" },
  { name: "Mexanik Klaviatura RGB K552", cat: "Periferiya", basePrice: 340000, img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&auto=format&fit=crop&q=75" },
  { name: "SanDisk Ultra USB 3.0 Fleshka", cat: "Xotira", basePrice: 55000, img: "https://images.unsplash.com/photo-1618410320928-25228d811631?w=400&auto=format&fit=crop&q=75" },
  { name: "Sony WH-CH520 Simsiz Quloqchin", cat: "Audio", basePrice: 490000, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=75" },
  { name: "LG UltraGear 144Hz Gaming Monitor", cat: "Monitorlar", basePrice: 1650000, img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&auto=format&fit=crop&q=75" },
  { name: "MagSafe Silikon Himoya G'ilofi", cat: "Aksessuarlar", basePrice: 45000, img: "https://images.unsplash.com/photo-1601593346740-925612772716?w=400&auto=format&fit=crop&q=75" },
  { name: "Baseus Type-C Fast Kabel 100W", cat: "Kabellar", basePrice: 38000, img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&auto=format&fit=crop&q=75" },
  { name: "Xiaomi Mi Powerbank 20000mAh", cat: "Quvvatlagich", basePrice: 240000, img: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&auto=format&fit=crop&q=75" },
  { name: "Razer Gigantus Gaming Mousepad", cat: "Aksessuarlar", basePrice: 65000, img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&auto=format&fit=crop&q=75" },
  { name: "Logitech C920 HD Pro Web-kamera", cat: "Periferiya", basePrice: 620000, img: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400&auto=format&fit=crop&q=75" },
  { name: "Kingston Canvas MicroSD Karta", cat: "Xotira", basePrice: 75000, img: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&auto=format&fit=crop&q=75" },
  { name: "Apple AirPods Pro 2 Simsiz", cat: "Audio", basePrice: 2450000, img: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&auto=format&fit=crop&q=75" },
  { name: "UGREEN HDMI 2.1 8K Ultra Kabel", cat: "Kabellar", basePrice: 68000, img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=75" },
  { name: "Noutbuk Sovutgich Stendi RGB", cat: "Aksessuarlar", basePrice: 95000, img: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&auto=format&fit=crop&q=75" },
  { name: "Samsung T7 Portable SSD Xotira", cat: "Xotira", basePrice: 1150000, img: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400&auto=format&fit=crop&q=75" },
  { name: "Anker Nano 20W USB-C Quvvatlagich", cat: "Quvvatlagich", basePrice: 89000, img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&auto=format&fit=crop&q=75" },
  { name: "HyperX QuadCast Studiya Mikrofoni", cat: "Audio", basePrice: 1350000, img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&auto=format&fit=crop&q=75" },
  { name: "Smartfon Alyuminiy Stol Tutqichi", cat: "Aksessuarlar", basePrice: 42000, img: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&auto=format&fit=crop&q=75" },
  { name: "TP-Link Archer AX23 Wi-Fi 6 Router", cat: "Tarmoq", basePrice: 580000, img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&auto=format&fit=crop&q=75" },
  { name: "Bluetooth 5.3 Nano USB Adapter", cat: "Tarmoq", basePrice: 35000, img: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=400&auto=format&fit=crop&q=75" },
  { name: "JBL Flip 6 Suvga Chidamli Kalonka", cat: "Audio", basePrice: 1190000, img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&auto=format&fit=crop&q=75" },
  { name: "Ekran Tozalash Sprey To'plami", cat: "Aksessuarlar", basePrice: 28000, img: "https://images.unsplash.com/photo-1585241936939-be4099591252?w=400&auto=format&fit=crop&q=75" },
  { name: "Keychron K2 Wireless Mechanical", cat: "Periferiya", basePrice: 920000, img: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&auto=format&fit=crop&q=75" },
  { name: "Orico 4-Port USB 3.0 Hub", cat: "Periferiya", basePrice: 72000, img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=75" },
  { name: "Samsung Odyssey G5 Curved Monitor", cat: "Monitorlar", basePrice: 2850000, img: "https://images.unsplash.com/photo-1551645120-d70bfe84c826?w=400&auto=format&fit=crop&q=75" },
  { name: "In-Ear Bass Quloqchin (Simli)", cat: "Audio", basePrice: 49000, img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&auto=format&fit=crop&q=75" },
  { name: "Cat6 Gigabit Ethernet LAN Kabel", cat: "Kabellar", basePrice: 32000, img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&auto=format&fit=crop&q=75" },
  { name: "Xiaomi Smart Band Fitness Braslet", cat: "Gadjetlar", basePrice: 390000, img: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&auto=format&fit=crop&q=75" },
  { name: "Stol Ustiga LED Monitor Chirog'i", cat: "Aksessuarlar", basePrice: 98000, img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&auto=format&fit=crop&q=75" },
  { name: "WD My Passport Tashqi HDD", cat: "Xotira", basePrice: 890000, img: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400&auto=format&fit=crop&q=75" },
  { name: "Simsiz Zaryadlash Pad 15W Qi", cat: "Quvvatlagich", basePrice: 79000, img: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=400&auto=format&fit=crop&q=75" },
  { name: "Apple Magic Mouse 2 Space Gray", cat: "Periferiya", basePrice: 960000, img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&auto=format&fit=crop&q=75" },
  { name: "Klaviatura Bilak Yostiqchasi", cat: "Aksessuarlar", basePrice: 58000, img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&auto=format&fit=crop&q=75" },
  { name: "AUX 3.5mm Audio Gold Kabel", cat: "Kabellar", basePrice: 24000, img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&auto=format&fit=crop&q=75" },
  { name: "Razer BlackShark V2 Gaming Headset", cat: "Audio", basePrice: 640000, img: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&auto=format&fit=crop&q=75" },
  { name: "Noutbuk Suv O'tkazmas Ryukzaki", cat: "Aksessuarlar", basePrice: 92000, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format&fit=crop&q=75" },
  { name: "Crucial P3 Plus NVMe M.2 SSD", cat: "Xotira", basePrice: 520000, img: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&auto=format&fit=crop&q=75" },
  { name: "OTG Type-C to USB 3.0 Konverter", cat: "Kabellar", basePrice: 19000, img: "https://images.unsplash.com/photo-1618410320928-25228d811631?w=400&auto=format&fit=crop&q=75" },
  { name: "Asus TUF Gaming 165Hz IPS Monitor", cat: "Monitorlar", basePrice: 1980000, img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&auto=format&fit=crop&q=75" },
  { name: "Smart Wi-Fi Rozetka (Taymerli)", cat: "Gadjetlar", basePrice: 84000, img: "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&auto=format&fit=crop&q=75" },
  { name: "Monitor Kranshteyni (Gas Spring)", cat: "Aksessuarlar", basePrice: 420000, img: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=400&auto=format&fit=crop&q=75" },
  { name: "Termopasta Arctic MX-4 Original", cat: "Komponentlar", basePrice: 64000, img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&auto=format&fit=crop&q=75" },
  { name: "DeepCool AK400 CPU Sovutgichi", cat: "Komponentlar", basePrice: 310000, img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&auto=format&fit=crop&q=75" },
  { name: "Kabel Organayzer Velkro Tasmalar", cat: "Aksessuarlar", basePrice: 22000, img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=75" },
  { name: "Wacom Intuos Grafik Planshet", cat: "Periferiya", basePrice: 780000, img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&auto=format&fit=crop&q=75" },
  { name: "USB Biometrik Barmoq Izi Skaneri", cat: "Gadjetlar", basePrice: 96000, img: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=400&auto=format&fit=crop&q=75" },
  { name: "Corsair Vengeance DDR4 Operativka", cat: "Komponentlar", basePrice: 470000, img: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&auto=format&fit=crop&q=75" },
  { name: "Temperlangan 9H Himoya Oyna", cat: "Aksessuarlar", basePrice: 30000, img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&auto=format&fit=crop&q=75" },
  { name: "Elgato Stream Deck Kontroller", cat: "Periferiya", basePrice: 1120000, img: "https://images.unsplash.com/photo-1526509867162-5b0c0d1b4b33?w=400&auto=format&fit=crop&q=75" },
  { name: "Mini Stol Changyutgichi (USB)", cat: "Gadjetlar", basePrice: 69000, img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&auto=format&fit=crop&q=75" },
];

const SERIES_SUFFIXES = [
  "",
  "Pro",
  "Max",
  "Ultra",
  "Lite",
  "SE",
  "Plus",
  "Gen-2",
  "Elite",
  "Turbo",
];

// Tezkor Xotira Keshi (In-Memory Cache — 0.5ms Ping uchun)
let cachedProducts = null;

async function refreshProductsCache() {
  const result = await pool.query(`
    SELECT 
      p.*,
      COALESCE(s.full_name, 'Sardor Rahimov') AS seller_name,
      COALESCE(s.shop_name, 'TechnoZone Tashkent') AS shop_name,
      COALESCE(s.rating, 4.85) AS seller_rating,
      COALESCE(s.rating_count, 12) AS seller_rating_count
    FROM products p
    LEFT JOIN sellers s ON p.seller_id = s.id
    ORDER BY p.id ASC
  `);
  cachedProducts = result.rows;
  return cachedProducts;
}

async function getProductsFast() {
  if (cachedProducts) return cachedProducts;
  return await refreshProductsCache();
}

// 3. Jadvallar, Indekslar va 500 ta mahsulotni yuklash
async function initDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS sellers (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(255) NOT NULL,
      shop_name VARCHAR(255) NOT NULL,
      phone VARCHAR(60) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(30) DEFAULT 'seller',
      status VARCHAR(30) DEFAULT 'active',
      rating NUMERIC(3,2) DEFAULT 4.80,
      rating_count INTEGER DEFAULT 10,
      balance BIGINT DEFAULT 0,
      total_sales INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const sellerCount = await pool.query("SELECT COUNT(*) as total FROM sellers");
  if (Number(sellerCount.rows[0].total) === 0) {
    await pool.query(`
      INSERT INTO sellers (full_name, shop_name, phone, email, password, role, status, rating, rating_count, balance, total_sales) VALUES
        ('Bosh Administrator', 'UzTech Rasmiy Do''koni', '+998 90 123-45-67', 'admin@shop.uz', 'admin123', 'admin', 'active', 4.95, 42, 0, 0),
        ('Sardor Rahimov', 'TechnoZone Tashkent', '+998 93 555-11-22', 'sardor@techno.uz', '123456', 'seller', 'active', 4.90, 28, 0, 0),
        ('Malika Karimova', 'CyberGear Store', '+998 99 777-88-99', 'malika@cyber.uz', '123456', 'seller', 'active', 4.85, 19, 0, 0),
        ('Javohir Tursunov', 'iStore Accessories', '+998 97 444-33-11', 'javohir@istore.uz', '123456', 'seller', 'active', 4.75, 15, 0, 0);
    `);
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(100) NOT NULL,
      price INTEGER NOT NULL,
      count INTEGER NOT NULL,
      image TEXT NOT NULL,
      seller_id INTEGER DEFAULT 2
    );
  `);

  await pool.query(`
    ALTER TABLE products ADD COLUMN IF NOT EXISTS seller_id INTEGER DEFAULT 2;
  `);

  // 500 ta mahsulot borligini tekshirish, agar kam bo'lsa 500 taga yetkazish (Batch INSERT)
  const countRes = await pool.query("SELECT COUNT(*) as total FROM products");
  const currentTotal = Number(countRes.rows[0].total);

  if (currentTotal < 500) {
    const sellersRows = await pool.query("SELECT id FROM sellers ORDER BY id ASC");
    const sIds = sellersRows.rows.length > 0 ? sellersRows.rows.map((r) => r.id) : [1, 2, 3, 4];

    await pool.query("TRUNCATE TABLE products RESTART IDENTITY;");

    const values = [];
    const params = [];
    let paramIdx = 1;

    for (let i = 0; i < 500; i++) {
      const base = BASE_CATALOG[i % BASE_CATALOG.length];
      const seriesIdx = Math.floor(i / BASE_CATALOG.length);
      const suffix = SERIES_SUFFIXES[seriesIdx] || `v${seriesIdx + 1}`;
      const fullName = suffix ? `${base.name} ${suffix} #${i + 1}` : `${base.name}`;

      // Narxni variatsiya qilish (100 mingdan pastlar va yuqorilar muvozanati)
      let price = base.basePrice;
      if (price < 100000) {
        price = Math.max(15000, Math.min(99000, price + ((i % 7) - 3) * 3000));
      } else {
        price = price + (seriesIdx * 25000);
      }

      // Soni (ba'zilari < 6 kam qolgan, ba'zilari ko'p)
      const count = i % 5 === 0 ? (i % 5) + 1 : ((i * 7) % 45) + 6;
      const sellerId = sIds[i % sIds.length];

      values.push(`($${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++})`);
      params.push(fullName, base.cat, price, count, base.img, sellerId);
    }

    await pool.query(
      `INSERT INTO products (name, category, price, count, image, seller_id) VALUES ${values.join(", ")};`,
      params
    );
    console.log("✅ 500 ta mahsulot bazaga tezkor Batch INSERT orqali yuklandi!");
  }

  // Yuqori tezlik uchun indekslar
  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
    CREATE INDEX IF NOT EXISTS idx_products_count ON products(count);
    CREATE INDEX IF NOT EXISTS idx_products_seller ON products(seller_id);
  `);

  // Orders jadvali
  await pool.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      product_id INTEGER NOT NULL,
      product_name VARCHAR(255) NOT NULL,
      seller_id INTEGER NOT NULL,
      seller_name VARCHAR(255) NOT NULL,
      shop_name VARCHAR(255) NOT NULL,
      buyer_name VARCHAR(255) NOT NULL,
      quantity INTEGER NOT NULL,
      total_amount BIGINT NOT NULL,
      commission_amount BIGINT NOT NULL,
      seller_earning BIGINT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await refreshProductsCache();
}

await initDatabase();

// =========================================================
// ULTRA-FAST PING ENDPOINT
// =========================================================
app.get("/ping", (req, res) => {
  res.json({ ok: true, ts: Date.now() });
});

// =========================================================
// MAHSULOTLAR ENDPOINTLARI (Kesh orqali < 1ms javob)
// =========================================================

app.get("/products", async (req, res) => {
  try {
    const rows = await getProductsFast();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/products/cheap", async (req, res) => {
  try {
    const rows = await getProductsFast();
    res.json(rows.filter((p) => p.price < 100000));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/products/low-stock", async (req, res) => {
  try {
    const rows = await getProductsFast();
    res.json(rows.filter((p) => p.count < 6));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/products", async (req, res) => {
  try {
    const { name, category, price, count, image, seller_id } = req.body;
    if (!name || price === undefined || count === undefined) {
      return res.status(400).json({ error: "Mahsulot nomi, narxi va sonini kiriting!" });
    }
    const defaultImg =
      image && image.trim() !== ""
        ? image.trim()
        : "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=75";

    const result = await pool.query(
      `INSERT INTO products (name, category, price, count, image, seller_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *;`,
      [
        name.trim(),
        category || "Aksessuarlar",
        Number(price),
        Number(count),
        defaultImg,
        Number(seller_id) || 2,
      ]
    );
    await refreshProductsCache();
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, category, price, count, image, seller_id } = req.body;
    const result = await pool.query(
      `UPDATE products
       SET name = $1, category = $2, price = $3, count = $4, image = $5, seller_id = COALESCE($6, seller_id)
       WHERE id = $7
       RETURNING *;`,
      [name, category, Number(price), Number(count), image, seller_id ? Number(seller_id) : null, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Mahsulot topilmadi" });
    }
    await refreshProductsCache();
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await pool.query("DELETE FROM products WHERE id = $1", [id]);
    await refreshProductsCache();
    res.json({ deletedId: id, success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =========================================================
// XARID VA TO'LOV TIZIMI (5% SAYT KOMISSIYASI + 95% SOTUVCHI DAROMADI)
// =========================================================

app.post("/orders/buy", async (req, res) => {
  try {
    const { product_id, quantity = 1, paid_amount, buyer_name = "Mijoz" } = req.body;
    const qty = Math.max(1, Number(quantity));

    const allProds = await getProductsFast();
    const product = allProds.find((p) => p.id === Number(product_id));
    if (!product) {
      return res.status(404).json({ error: "Mahsulot topilmadi!" });
    }

    if (product.count < qty) {
      return res.status(400).json({
        error: `Omborda yetarli mahsulot yo'q! Faqat ${product.count} dona qolgan.`,
      });
    }

    const totalAmount = Number(product.price) * qty;
    const enteredAmount = Number(paid_amount);

    if (isNaN(enteredAmount) || enteredAmount < totalAmount) {
      return res.status(400).json({
        error: `To'lov summasi yetarli emas! Kerakli summa: ${totalAmount.toLocaleString()} so'm.`,
      });
    }

    const commissionAmount = Math.round(totalAmount * 0.05);
    const sellerEarning = totalAmount - commissionAmount;
    const changeAmount = enteredAmount - totalAmount;

    await pool.query("UPDATE products SET count = count - $1 WHERE id = $2", [
      qty,
      product.id,
    ]);

    const sellerId = product.seller_id || 2;
    await pool.query(
      `UPDATE sellers 
       SET balance = COALESCE(balance, 0) + $1,
           total_sales = COALESCE(total_sales, 0) + $2
       WHERE id = $3`,
      [sellerEarning, qty, sellerId]
    );

    const orderRes = await pool.query(
      `INSERT INTO orders 
        (product_id, product_name, seller_id, seller_name, shop_name, buyer_name, quantity, total_amount, commission_amount, seller_earning)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *;`,
      [
        product.id,
        product.name,
        sellerId,
        product.seller_name,
        product.shop_name,
        buyer_name.trim() || "Mijoz",
        qty,
        totalAmount,
        commissionAmount,
        sellerEarning,
      ]
    );

    await refreshProductsCache();

    res.status(201).json({
      order: orderRes.rows[0],
      changeAmount,
      message: "To'lov muvaffaqiyatli amalga oshirildi!",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/orders", async (req, res) => {
  try {
    const ordersRes = await pool.query(
      "SELECT * FROM orders ORDER BY id DESC LIMIT 100"
    );
    const statsRes = await pool.query(`
      SELECT 
        COALESCE(SUM(total_amount), 0) AS total_turnover,
        COALESCE(SUM(commission_amount), 0) AS platform_revenue,
        COALESCE(SUM(seller_earning), 0) AS sellers_net_income,
        COUNT(*) AS total_orders
      FROM orders;
    `);
    const stats = statsRes.rows[0];
    res.json({
      orders: ordersRes.rows,
      stats: {
        totalTurnover: Number(stats.total_turnover),
        platformRevenue: Number(stats.platform_revenue),
        sellersNetIncome: Number(stats.sellers_net_income),
        totalOrders: Number(stats.total_orders),
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =========================================================
// SOTUVCHILAR VA REYTING ENDPOINTLARI
// =========================================================

app.get("/sellers", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        s.id, s.full_name, s.shop_name, s.phone, s.email, s.role, s.status,
        COALESCE(s.rating, 4.85) AS rating,
        COALESCE(s.rating_count, 10) AS rating_count,
        COALESCE(s.balance, 0) AS balance,
        COALESCE(s.total_sales, 0) AS total_sales,
        s.created_at,
        COUNT(p.id) AS products_count
      FROM sellers s
      LEFT JOIN products p ON p.seller_id = s.id
      GROUP BY s.id
      ORDER BY s.balance DESC, s.id ASC
    `);
    res.json(
      result.rows.map((r) => ({
        ...r,
        rating: Number(r.rating),
        rating_count: Number(r.rating_count),
        balance: Number(r.balance),
        total_sales: Number(r.total_sales),
        products_count: Number(r.products_count),
      }))
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/sellers/:id/rate", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const stars = Math.min(5, Math.max(1, Number(req.body.stars || 5)));

    const currentRes = await pool.query(
      "SELECT rating, rating_count FROM sellers WHERE id = $1",
      [id]
    );
    if (currentRes.rows.length === 0) {
      return res.status(404).json({ error: "Sotuvchi topilmadi" });
    }

    const curRating = Number(currentRes.rows[0].rating || 4.8);
    const curCount = Number(currentRes.rows[0].rating_count || 10);
    const newCount = curCount + 1;
    const newRating = ((curRating * curCount + stars) / newCount).toFixed(2);

    const updated = await pool.query(
      `UPDATE sellers 
       SET rating = $1, rating_count = $2 
       WHERE id = $3 
       RETURNING id, full_name, shop_name, rating, rating_count;`,
      [newRating, newCount, id]
    );

    await refreshProductsCache();
    res.json(updated.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/sellers/register", async (req, res) => {
  try {
    const { full_name, shop_name, phone, email, password } = req.body;
    if (!full_name || !shop_name || !phone || !email || !password) {
      return res.status(400).json({ error: "Barcha maydonlarni to'ldiring!" });
    }

    const exists = await pool.query("SELECT id FROM sellers WHERE email = $1", [
      email.trim().toLowerCase(),
    ]);
    if (exists.rows.length > 0) {
      return res
        .status(409)
        .json({ error: "Ushbu Email manzili allaqachon ro'yxatdan o'tgan!" });
    }

    const result = await pool.query(
      `INSERT INTO sellers (full_name, shop_name, phone, email, password, role, status, rating, rating_count, balance, total_sales)
       VALUES ($1, $2, $3, $4, $5, 'seller', 'active', 5.00, 1, 0, 0)
       RETURNING id, full_name, shop_name, phone, email, role, status, rating, rating_count, balance, total_sales, created_at;`,
      [
        full_name.trim(),
        shop_name.trim(),
        phone.trim(),
        email.trim().toLowerCase(),
        password,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/sellers/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query(
      `SELECT id, full_name, shop_name, phone, email, role, status, rating, rating_count, balance, total_sales, created_at
       FROM sellers
       WHERE email = $1 AND password = $2`,
      [(email || "").trim().toLowerCase(), password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Email yoki parol noto'g'ri!" });
    }

    const seller = result.rows[0];
    if (seller.status === "blocked") {
      return res.status(403).json({ error: "Sizning profilingiz bloklangan!" });
    }

    res.json(seller);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/sellers/:id/status", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;
    const result = await pool.query(
      `UPDATE sellers SET status = $1 WHERE id = $2
       RETURNING id, full_name, shop_name, phone, email, role, status, rating, balance, total_sales;`,
      [status, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/sellers/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await pool.query("DELETE FROM sellers WHERE id = $1", [id]);
    res.json({ deletedId: id, success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("🚀 Server: http://localhost:5000 (500 Mahsulot tayyor!)"));
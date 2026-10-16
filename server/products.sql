-- 1. Eski jadvalni yangilash va yangi mahsulotlar jadvalini yaratish
DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL,
    count INTEGER NOT NULL,
    image TEXT NOT NULL
);

-- 2. 50 ta mahsulot qo'shish (rasmlari va toifalari bilan)
INSERT INTO products (name, category, price, count, image) VALUES
  ('Logitech G102 Gaming Mouse', 'Aksessuarlar', 85000, 18, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop&q=80'),
  ('Mexanik Klaviatura RGB K552', 'Periferiya', 340000, 7, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80'),
  ('SanDisk Ultra USB 3.0 32GB', 'Xotira', 55000, 34, 'https://images.unsplash.com/photo-1618410320928-25228d811631?w=600&auto=format&fit=crop&q=80'),
  ('Sony WH-CH520 Simsiz Quloqchin', 'Audio', 490000, 4, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80'),
  ('LG UltraGear 24" 144Hz Monitor', 'Monitorlar', 1650000, 3, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80'),
  ('MagSafe Silikon G''ilof', 'Aksessuarlar', 45000, 40, 'https://images.unsplash.com/photo-1601593346740-925612772716?w=600&auto=format&fit=crop&q=80'),
  ('Baseus Type-C Fast Kabel 100W', 'Kabellar', 38000, 5, 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80'),
  ('Xiaomi Powerbank 20000mAh', 'Quvvatlagich', 240000, 9, 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&auto=format&fit=crop&q=80'),
  ('Razer Gigantus Gaming Mousepad', 'Aksessuarlar', 65000, 22, 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80'),
  ('Logitech C920 HD Pro Web-kamera', 'Periferiya', 620000, 2, 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=600&auto=format&fit=crop&q=80'),
  ('Kingston Canvas MicroSD 64GB', 'Xotira', 75000, 19, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&auto=format&fit=crop&q=80'),
  ('Apple AirPods Pro 2-avlod', 'Audio', 2450000, 4, 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&auto=format&fit=crop&q=80'),
  ('UGREEN HDMI 2.1 4K Kabel 2m', 'Kabellar', 68000, 14, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80'),
  ('Noutbuk Sovutgich Stendi RGB', 'Aksessuarlar', 95000, 11, 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&auto=format&fit=crop&q=80'),
  ('Samsung T7 Portable SSD 1TB', 'Xotira', 1150000, 5, 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=600&auto=format&fit=crop&q=80'),
  ('Anker 20W USB-C Quvvatlagich', 'Quvvatlagich', 89000, 16, 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80'),
  ('HyperX QuadCast Studiya Mikrofoni', 'Audio', 1350000, 3, 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop&q=80'),
  ('Smartfon Stol Tutqichi (Alyuminiy)', 'Aksessuarlar', 42000, 27, 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&auto=format&fit=crop&q=80'),
  ('TP-Link Archer AX23 Wi-Fi 6 Router', 'Tarmoq', 580000, 6, 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&auto=format&fit=crop&q=80'),
  ('Bluetooth 5.3 USB Adapter Dongle', 'Tarmoq', 35000, 31, 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=600&auto=format&fit=crop&q=80'),
  ('JBL Flip 6 Portativ Kalonka', 'Audio', 1190000, 4, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop&q=80'),
  ('Anti-Static Ekran Tozalash To''plami', 'Aksessuarlar', 28000, 45, 'https://images.unsplash.com/photo-1585241936939-be4099591252?w=600&auto=format&fit=crop&q=80'),
  ('Keychron K2 Wireless Mechanical', 'Periferiya', 920000, 3, 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=600&auto=format&fit=crop&q=80'),
  ('Orico 4-Port USB 3.0 Hub', 'Periferiya', 72000, 15, 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80'),
  ('Samsung Odyssey G5 27" Curved', 'Monitorlar', 2850000, 2, 'https://images.unsplash.com/photo-1551645120-d70bfe84c826?w=600&auto=format&fit=crop&q=80'),
  ('In-Ear Bass Quloqchin (Simli)', 'Audio', 49000, 28, 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80'),
  ('Cat6 Gigabit Ethernet LAN Kabel 5m', 'Kabellar', 32000, 38, 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80'),
  ('Xiaomi Mi Smart Band 8', 'Gadjetlar', 390000, 8, 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&auto=format&fit=crop&q=80'),
  ('Stol Ustiga LED Monitor Chirog''i', 'Aksessuarlar', 98000, 5, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80'),
  ('WD My Passport 2TB Tashqi HDD', 'Xotira', 890000, 6, 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=600&auto=format&fit=crop&q=80'),
  ('Simsiz Zaryadlash Pad 15W Qi', 'Quvvatlagich', 79000, 13, 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=600&auto=format&fit=crop&q=80'),
  ('Apple Magic Mouse 2 Space Gray', 'Periferiya', 960000, 3, 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80'),
  ('Klaviatura bilak yostiqchasi (Memory)', 'Aksessuarlar', 58000, 21, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80'),
  ('AUX 3.5mm Audio Gold Kabel 1.5m', 'Kabellar', 24000, 50, 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80'),
  ('Razer BlackShark V2 X Gaming Headset', 'Audio', 640000, 5, 'https://images.unsplash.com/photo-1599669454699-248893623440?w=600&auto=format&fit=crop&q=80'),
  ('Noutbuk uchun Suv O''tkazmas Sumka', 'Aksessuarlar', 92000, 14, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80'),
  ('Crucial P3 Plus 500GB NVMe M.2 SSD', 'Xotira', 520000, 9, 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop&q=80'),
  ('OTG Type-C to USB 3.0 Konverter', 'Kabellar', 19000, 60, 'https://images.unsplash.com/photo-1618410320928-25228d811631?w=600&auto=format&fit=crop&q=80'),
  ('Asus TUF Gaming VG249Q 165Hz', 'Monitorlar', 1980000, 2, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80'),
  ('Smart Wi-Fi Rozetka (Energiya o''lchagich)', 'Gadjetlar', 84000, 17, 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&auto=format&fit=crop&q=80'),
  ('2x Monitor Kranshteyni (Gas Spring)', 'Aksessuarlar', 420000, 4, 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=600&auto=format&fit=crop&q=80'),
  ('Termopasta Arctic MX-4 (4 gramm)', 'Komponentlar', 64000, 25, 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80'),
  ('DeepCool AK400 CPU Cooler', 'Komponentlar', 310000, 6, 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80'),
  ('Kabel Organayzer Velkro Tasmalar', 'Aksessuarlar', 22000, 48, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80'),
  ('Wacom Intuos Grafik Planshet S', 'Periferiya', 780000, 3, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80'),
  ('Barmoq izi o''quvchi USB Biometrik', 'Gadjetlar', 96000, 4, 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=600&auto=format&fit=crop&q=80'),
  ('Corsair Vengeance 16GB DDR4 RAM', 'Komponentlar', 470000, 10, 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=600&auto=format&fit=crop&q=80'),
  ('Temperlangan 9H Himoya Oyna 2.5D', 'Aksessuarlar', 30000, 55, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80'),
  ('Elgato Stream Deck Mini', 'Periferiya', 1120000, 2, 'https://images.unsplash.com/photo-1526509867162-5b0c0d1b4b33?w=600&auto=format&fit=crop&q=80'),
  ('Mini Stol Changyutgichi (Klaviatura)', 'Gadjetlar', 69000, 12, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop&q=80');

-- 3. 100 000 so'mdan past (arzon) mahsulotlarni ko'rsatish
SELECT * FROM products WHERE price < 100000 ORDER BY id ASC;

-- 4. Soni 6 dan kam (tugayotgan) mahsulotlarni ko'rsatish
SELECT * FROM products WHERE count < 6 ORDER BY id ASC;

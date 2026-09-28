import { useState, useEffect } from "react";
import {
  Shield, Menu, X, Phone, Mail, MapPin, ChevronDown, AlertTriangle,
  Globe, Lock, FileText, BookOpen, Users, ArrowRight, Zap, Database,
  Monitor, Scale, Building2, Camera, ExternalLink, CheckCircle,
  Radio, Hash, Search, Eye, AlertCircle, Newspaper
} from "lucide-react";

// ─── Data ───────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "Beranda", id: "beranda" },
  { label: "Profil", id: "profil" },
  { label: "Organisasi", id: "organisasi" },
  { label: "Layanan", id: "layanan" },
  { label: "Edukasi Siber", id: "edukasi" },
  { label: "Hukum", id: "hukum" },
  { label: "Berita", id: "berita" },
  { label: "Media", id: "media" },
  { label: "Kontak", id: "kontak" },
];

const STATS = [
  { value: "2.400+", label: "Laporan Diterima" },
  { value: "1.800+", label: "Kasus Ditangani" },
  { value: "95%", label: "Tingkat Penyelesaian" },
  { value: "38", label: "Kab/Kota Terlayani" },
];

const LAYANAN = [
  {
    icon: AlertTriangle,
    title: "Penerimaan Laporan",
    desc: "Menerima dan memproses laporan kejahatan siber dari masyarakat secara cepat dan terstruktur.",
  },
  {
    icon: Database,
    title: "Digital Forensik",
    desc: "Melakukan investigasi forensik digital terhadap barang bukti elektronik dan perangkat digital.",
  },
  {
    icon: Monitor,
    title: "Analisis Malware",
    desc: "Menganalisis perangkat lunak berbahaya untuk mengidentifikasi sumber dan metode serangan.",
  },
  {
    icon: Shield,
    title: "Koordinasi CSIRT",
    desc: "Berkoordinasi dengan Computer Security Incident Response Team untuk penanganan insiden siber.",
  },
  {
    icon: Eye,
    title: "Patroli Siber",
    desc: "Memantau aktivitas di ruang siber untuk mencegah penyebaran konten ilegal dan kejahatan daring.",
  },
  {
    icon: Users,
    title: "Mediasi Siber",
    desc: "Memfasilitasi penyelesaian sengketa digital antara masyarakat sesuai ketentuan hukum yang berlaku.",
  },
];

const EDUKASI = [
  {
    tag: "Himbauan",
    title: "Waspada Penipuan Online",
    desc: "Kenali modus penipuan belanja daring, transfer rekening fiktif, dan social engineering. Jangan transfer uang ke rekening tidak dikenal.",
    date: "Agustus 2026",
  },
  {
    tag: "Tips Keamanan",
    title: "Lindungi Data Pribadi Anda",
    desc: "Gunakan password unik, aktifkan autentikasi dua faktor, dan jangan bagikan OTP kepada siapapun termasuk yang mengaku petugas.",
    date: "Juli 2026",
  },
  {
    tag: "Edukasi",
    title: "Bahaya Hoaks di Media Sosial",
    desc: "Verifikasi informasi sebelum menyebarkan. Hoaks dapat melanggar UU ITE dan berdampak pidana bagi penyebarnya.",
    date: "Juni 2026",
  },
  {
    tag: "Waspada",
    title: "Modus Phishing Terbaru",
    desc: "Waspadai email dan pesan singkat yang meminta klik tautan mencurigakan. Selalu periksa URL resmi sebelum memasukkan data.",
    date: "Mei 2026",
  },
];

const HUKUM = [
  {
    nomor: "UU No. 1 Tahun 2024",
    judul: "Perubahan Kedua UU ITE",
    pasal: "Pasal 27–45 mengatur tindak pidana siber",
    desc: "Pembaruan regulasi informasi dan transaksi elektronik yang mengatur kejahatan siber, konten ilegal, dan perlindungan data.",
  },
  {
    nomor: "UU No. 27 Tahun 2022",
    judul: "Perlindungan Data Pribadi",
    pasal: "Pasal 65–69 mengatur pidana penyalahgunaan data",
    desc: "Mengatur hak dan kewajiban dalam pengelolaan data pribadi serta sanksi terhadap pelanggaran privasi data.",
  },
  {
    nomor: "KUHP Pasal 362–378",
    judul: "Tindak Pidana Penipuan & Pencurian",
    pasal: "Pasal 362 Pencurian, 378 Penipuan",
    desc: "Ketentuan pidana umum yang diterapkan pada kejahatan siber berupa pencurian data dan penipuan berbasis digital.",
  },
  {
    nomor: "Perpres No. 28 Tahun 2021",
    judul: "Badan Siber dan Sandi Negara",
    pasal: "Mengatur kewenangan BSSN",
    desc: "Regulasi kelembagaan yang mengatur koordinasi penanganan keamanan siber nasional dan peran institusi terkait.",
  },
  {
    nomor: "Perkapolri No. [X] Tahun 20XX",
    judul: "Penyelidikan Kejahatan Siber",
    pasal: "Prosedur penanganan perkara siber",
    desc: "Petunjuk teknis internal Polri tentang prosedur penerimaan, penyelidikan, dan penuntasan perkara kejahatan siber.",
  },
  {
    nomor: "SE Kapolri No. [X] Tahun 20XX",
    judul: "Penanganan Ujaran Kebencian",
    pasal: "Pedoman pelaksanaan",
    desc: "Surat edaran yang mengatur pedoman penegak hukum dalam menangani kasus ujaran kebencian di platform digital.",
  },
];

const BERITA = [
  {
    cat: "Operasi",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=340&fit=crop&auto=format",
    tanggal: "24 Agustus 2026",
    judul: "Ditressiber Ungkap Jaringan Penipuan Online Lintas Provinsi",
    desc: "Tim Ditressiber berhasil membongkar jaringan penipuan daring yang merugikan ratusan korban dengan total kerugian mencapai miliaran rupiah.",
  },
  {
    cat: "Sosialisasi",
    img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=340&fit=crop&auto=format",
    tanggal: "18 Agustus 2026",
    judul: "Sosialisasi Keamanan Siber di Lingkungan Pelajar Jawa Tengah",
    desc: "Kegiatan edukasi keamanan siber menyasar pelajar SMA/SMK di 5 kota besar Jawa Tengah untuk meningkatkan literasi digital generasi muda.",
  },
  {
    cat: "Penangkapan",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=340&fit=crop&auto=format",
    tanggal: "10 Agustus 2026",
    judul: "Pelaku Penyebaran Konten Ilegal Berhasil Diamankan",
    desc: "Seorang tersangka berhasil diamankan atas dugaan penyebaran konten ilegal yang melanggar Undang-Undang Informasi dan Transaksi Elektronik.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Bagaimana cara melaporkan kejahatan siber kepada Ditressiber Polda Jateng?",
    a: "Laporan dapat disampaikan melalui: (1) Datang langsung ke kantor Ditressiber Polda Jateng; (2) Menghubungi hotline pengaduan yang tersedia; (3) Melalui portal pelaporan daring resmi; (4) Mengirim email resmi ke unit pengaduan. Siapkan bukti seperti tangkapan layar, riwayat percakapan, dan data rekening bila ada.",
  },
  {
    q: "Apa saja jenis kejahatan siber yang dapat dilaporkan?",
    a: "Jenis kejahatan yang dapat dilaporkan antara lain: penipuan daring (online fraud), perjudian daring, pornografi, pencemaran nama baik di media sosial, ujaran kebencian (hate speech), peretasan akun, penyebaran hoaks, ancaman/teror siber, dan kejahatan perbankan digital (phishing, skimming, dll).",
  },
  {
    q: "Apakah pelaporan kejahatan siber dikenakan biaya?",
    a: "Tidak. Seluruh layanan penerimaan laporan dan penanganan kejahatan siber oleh Ditressiber Polda Jawa Tengah tidak dikenakan biaya apapun. Harap waspada terhadap pihak yang memungut biaya atas nama kepolisian.",
  },
  {
    q: "Berapa lama proses penanganan laporan kejahatan siber?",
    a: "Setelah laporan diterima dan dinyatakan lengkap, tim kami akan melakukan verifikasi dalam 1×24 jam. Proses penyelidikan selanjutnya bergantung pada kompleksitas kasus. Pelapor akan mendapatkan nomor registrasi untuk memantau perkembangan laporan.",
  },
  {
    q: "Dokumen apa yang perlu disiapkan saat melapor?",
    a: "Dokumen yang perlu disiapkan: (1) KTP/identitas diri; (2) Tangkapan layar (screenshot) bukti kejahatan; (3) Riwayat percakapan atau transaksi; (4) Nomor rekening, nomor telepon, atau akun media sosial pelaku jika diketahui; (5) Surat keterangan dari bank jika terkait penipuan keuangan.",
  },
  {
    q: "Apakah identitas pelapor akan dirahasiakan?",
    a: "Ya. Ditressiber Polda Jawa Tengah menjamin kerahasiaan identitas pelapor sesuai ketentuan perlindungan saksi dan korban yang berlaku. Data pribadi pelapor tidak akan disebarluaskan kepada pihak yang tidak berkepentingan.",
  },
];

const MEDIA_GALLERY = [
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&h=360&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&h=360&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=360&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&h=360&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1521737604593-d46c4ddb5f64?w=500&h=360&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&h=360&fit=crop&auto=format",
];

// ─── SVG Components ──────────────────────────────────────────────────────────

function CyberNetworkSVG() {
  return (
    <svg viewBox="0 0 560 420" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <pattern id="hex" x="0" y="0" width="58" height="50" patternUnits="userSpaceOnUse">
          <path d="M29 1 L57 17 L57 33 L29 49 L1 33 L1 17 Z" fill="none" stroke="rgba(201,165,62,0.12)" strokeWidth="1" />
        </pattern>
        <radialGradient id="shieldGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C9A53E" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#C9A53E" stopOpacity="0" />
        </radialGradient>
        <filter id="blur3">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id="blur8">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      <rect width="560" height="420" fill="url(#hex)" />

      {/* Glow behind shield */}
      <ellipse cx="280" cy="200" rx="110" ry="100" fill="url(#shieldGlow)" />

      {/* Connection lines */}
      {[
        [280, 200, 90, 90], [280, 200, 470, 90], [280, 200, 60, 230],
        [280, 200, 500, 250], [280, 200, 140, 360], [280, 200, 420, 370],
        [90, 90, 470, 90], [60, 230, 140, 360], [500, 250, 420, 370],
        [90, 90, 60, 230], [470, 90, 500, 250],
      ].map(([x1, y1, x2, y2], i) => (
        <line
          key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="rgba(201,165,62,0.3)" strokeWidth="1.2" strokeDasharray="5,5"
        />
      ))}

      {/* Animated pulse ring */}
      <circle cx="280" cy="200" r="75" fill="none" stroke="rgba(201,165,62,0.25)" strokeWidth="1.5">
        <animate attributeName="r" values="75;95;75" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite" />
      </circle>

      {/* Shield body */}
      <path
        d="M280 140 L320 160 L320 196 Q320 236 280 260 Q240 236 240 196 L240 160 Z"
        fill="rgba(13,27,46,0.9)" stroke="#C9A53E" strokeWidth="2.5"
      />
      <path
        d="M280 155 L310 170 L310 196 Q310 228 280 248 Q250 228 250 196 L250 170 Z"
        fill="rgba(201,165,62,0.18)" stroke="rgba(201,165,62,0.5)" strokeWidth="1"
      />
      {/* Checkmark */}
      <path d="M268 200 L275 208 L294 186" stroke="#C9A53E" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {/* Satellite nodes */}
      {[
        [90, 90, "INTEL"], [470, 90, "CSIRT"], [60, 230, "PATROLI"],
        [500, 250, "FORENSIK"], [140, 360, "LAPORAN"], [420, 370, "ANALITIK"],
      ].map(([cx, cy, lbl], i) => (
        <g key={i}>
          <circle cx={+cx} cy={+cy} r="22" fill="rgba(13,27,46,0.92)" stroke="rgba(201,165,62,0.55)" strokeWidth="1.5" />
          <text x={+cx} y={+cy + 4} textAnchor="middle" fill="#C9A53E" fontSize="8.5" fontFamily="JetBrains Mono, monospace" fontWeight="500">
            {lbl as string}
          </text>
        </g>
      ))}

      {/* Floating data dots */}
      {[[165, 140], [390, 155], [200, 300], [370, 300]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="4" fill="rgba(201,165,62,0.5)">
          <animate attributeName="opacity" values="0.5;1;0.5" dur={`${1.5 + i * 0.4}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="h-px w-8 bg-[#C9A53E]" />
      <span className="text-[#C9A53E] text-xs font-mono tracking-[0.18em] uppercase">{children}</span>
      <span className="h-px w-8 bg-[#C9A53E]" />
    </div>
  );
}

function SectionHeading({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2
      className={`font-['Barlow_Condensed'] text-3xl md:text-4xl font-bold tracking-wide ${light ? "text-white" : "text-[#0D1B2E]"}`}
    >
      {children}
    </h2>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[rgba(13,27,46,0.12)] rounded-lg overflow-hidden">
      <button
        className="w-full flex items-start justify-between gap-4 px-6 py-4 text-left bg-white hover:bg-[#F4F7FB] transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-['Barlow'] font-semibold text-[#0D1B2E] text-sm leading-snug">{q}</span>
        <ChevronDown
          className={`w-5 h-5 text-[#C9A53E] flex-shrink-0 mt-0.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-5 pt-1 bg-white border-t border-[rgba(13,27,46,0.08)] text-[#3D5269] text-sm leading-relaxed font-['Barlow']">
          {a}
        </div>
      )}
    </div>
  );
}

function OrgBox({
  title,
  sub,
  top = false,
  image,
}: {
  title: string;
  sub?: string;
  top?: boolean;
  image?: string;
}) {
  return (
    <div
      className={`rounded-lg px-3 py-2.5 text-center min-w-[120px] max-w-[150px] shadow-sm border ${
        top
          ? "bg-[#0D1B2E] border-[#C9A53E] text-white"
          : "bg-white border-[rgba(13,27,46,0.2)] text-[#0D1B2E]"
      }`}
    >
      {image && (
        <img
          src={image}
          alt={title}
          className="w-20 h-25 mx-auto mb-2 object-contain"
        />
      )}

      <div className="font-['Barlow'] font-semibold text-xs leading-tight">
        {title}
      </div>

      {sub && (
        <div className="text-[10px] mt-1 font-['Barlow'] text-[#5A6E87]">
          {sub}
        </div>
      )}
    </div>
  );
}

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar({ onNav }: { onNav: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const nav = (id: string) => {
    onNav(id);
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0D1B2E]/97 shadow-xl backdrop-blur-sm" : "bg-[#0D1B2E]"
      }`}
    >
      {/* Top strip */}
      <div className="border-b border-white/10 py-1.5 px-4 lg:px-8 hidden md:flex items-center justify-between">
        <div className="flex items-center gap-4 text-white/60 text-xs font-['Barlow']">
          <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> (024) [XXX-XXXX]</span>
          <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> [email]@polda-jateng.go.id</span>
        </div>
        <div className="flex items-center gap-2 text-white/50 text-xs font-['Barlow']">
          <Radio className="w-3 h-3" />
          <span>Polda Jawa Tengah — Portal Resmi</span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="flex items-center justify-between px-4 lg:px-8 h-16">
        {/* Logo */}
        <button onClick={() => nav("beranda")} className="flex items-center gap-3 flex-shrink-0">
          <div className="w-15 h-15 rounded-lg bg-[#C9A53E]/20 border border-[#C9A53E]/40 flex items-center justify-center overflow-hidden">
            <img
              src="/logo-ditressiber.png"
              alt="Logo Ditressiber"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-left">
            <div className="font-['Barlow_Condensed'] font-bold text-white text-sm tracking-wide leading-none">
              DITRESSIBER
            </div>
            <div className="text-[#C9A53E] text-[10px] font-['Barlow'] tracking-widest leading-none mt-0.5">
              POLDA JAWA TENGAH
            </div>
          </div>
        </button>

        {/* Desktop links */}
        <div className="hidden xl:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => nav(item.id)}
              className="text-white/80 hover:text-white hover:bg-white/10 px-3 py-2 rounded text-xs font-['Barlow'] font-medium tracking-wide transition-all"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => nav("kontak")}
            className="flex items-center gap-2 bg-[#C9A53E] hover:bg-[#E8C96A] text-[#0D1B2E] font-['Barlow'] font-bold text-xs px-4 py-2.5 rounded-lg transition-all hover:shadow-lg hover:shadow-[#C9A53E]/25 tracking-wide"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Laporkan Kejadian Siber
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="xl:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="xl:hidden bg-[#0A1625] border-t border-white/10 px-4 py-4 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => nav(item.id)}
              className="text-left text-white/80 hover:text-white hover:bg-white/10 px-4 py-2.5 rounded-lg text-sm font-['Barlow'] transition-all"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => nav("kontak")}
            className="mt-2 flex items-center justify-center gap-2 bg-[#C9A53E] text-[#0D1B2E] font-['Barlow'] font-bold text-sm px-4 py-3 rounded-lg"
          >
            <AlertTriangle className="w-4 h-4" />
            Laporkan Kejadian Siber
          </button>
        </div>
      )}
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero({ onNav }: { onNav: (id: string) => void }) {
  return (
    <section
      id="beranda"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #060E1A 0%, #0D1B2E 45%, #122446 100%)" }}
    >
      {/* Background texture dots */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(rgba(201,165,62,0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Gold top line accent */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#C9A53E] to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-36 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#C9A53E]/15 border border-[#C9A53E]/30 rounded-full px-4 py-1.5 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A53E] animate-pulse" />
              <span className="text-[#C9A53E] text-xs font-mono tracking-widest uppercase">
                Portal Resmi — Polda Jawa Tengah
              </span>
            </div>

            <h1 className="font-['Barlow_Condensed'] font-extrabold text-white text-5xl md:text-6xl lg:text-5xl xl:text-6xl leading-[1.05] tracking-wide mb-6">
              BERSAMA MENJAGA
              <br />
              <span className="text-[#C9A53E]">RUANG SIBER</span>
              <br />
              JAWA TENGAH
            </h1>

            <p className="text-white/65 font-['Barlow'] text-base md:text-lg leading-relaxed max-w-xl mb-8">
              Direktorat Reserse Siber Polda Jawa Tengah senantiasa hadir 
              sebagai garda terdepan dalam melindungi masyarakat dari ancaman 
              kejahatan siber, menegakkan hukum di ruang digital, serta membangun 
              ekosistem siber yang aman, terpercaya, dan berintegritas.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onNav("kontak")}
                className="flex items-center gap-2 bg-[#C9A53E] hover:bg-[#E8C96A] text-[#0D1B2E] font-['Barlow'] font-bold px-6 py-3.5 rounded-xl transition-all hover:shadow-xl hover:shadow-[#C9A53E]/30 hover:-translate-y-0.5"
              >
                <AlertTriangle className="w-4 h-4" />
                Laporkan Kejadian Siber
              </button>
              <button
                onClick={() => onNav("profil")}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/18 border border-white/20 text-white font-['Barlow'] font-medium px-6 py-3.5 rounded-xl transition-all hover:-translate-y-0.5"
              >
                Pelajari Lebih Lanjut
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right visual */}
          <div className="relative w-full aspect-[4/3]">
            <CyberNetworkSVG />
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="bg-white/6 border border-white/12 rounded-xl p-5 text-center backdrop-blur-sm"
            >
              <div className="font-['Barlow_Condensed'] font-bold text-[#C9A53E] text-3xl md:text-4xl">{s.value}</div>
              <div className="text-white/60 text-xs font-['Barlow'] mt-1 tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#EEF2F7] to-transparent" />
    </section>
  );
}

// ─── Profil ──────────────────────────────────────────────────────────────────

function ProfilSection() {
  return (
    <section id="profil" className="py-24 bg-[#EEF2F7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel>Profil Institusi</SectionLabel>
            <SectionHeading>Tentang Ditressiber Polda Jateng</SectionHeading>
            <div className="mt-6 space-y-4 text-[#3D5269] font-['Barlow'] leading-relaxed">
              <p>
                Direktorat Reserse Kriminal Siber (Ditressiber) Polda Jawa Tengah adalah satuan
                kerja di bawah Kepolisian Daerah Jawa Tengah yang memiliki tugas pokok dan fungsi
                dalam penyelidikan, penyidikan, dan penanganan tindak pidana di bidang teknologi
                informasi dan komunikasi.
              </p>
              <p>
                Dibentuk sebagai respons terhadap perkembangan kejahatan yang semakin kompleks di
                era digital, Ditressiber berkomitmen untuk memberikan perlindungan terbaik bagi
                masyarakat Jawa Tengah dari berbagai ancaman kejahatan siber, mulai dari penipuan
                daring, peretasan, hoaks, hingga kejahatan konten.
              </p>
              <p>
                Dengan dukungan tenaga ahli digital forensik, analis siber, dan kerja sama
                kelembagaan yang luas, kami hadir sebagai garda terdepan dalam mewujudkan ruang
                siber yang aman, sehat, dan bertanggung jawab.
              </p>
            </div>
          </div>

          {/* Visi Misi */}
          <div className="space-y-4">
            <div className="bg-[#0D1B2E] rounded-2xl p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#C9A53E]/20 border border-[#C9A53E]/40 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-[#C9A53E]" />
                </div>
                <h3 className="font-['Barlow_Condensed'] font-bold text-xl tracking-wide">VISI</h3>
              </div>
              <p className="text-white/75 font-['Barlow'] leading-relaxed text-sm">
                Terwujudnya Direktorat Reserse Kriminal Siber yang profesional, modern, dan terpercaya
                dalam memberantas kejahatan siber demi keamanan masyarakat Jawa Tengah.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[rgba(13,27,46,0.08)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#0D1B2E]/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-[#0D1B2E]" />
                </div>
                <h3 className="font-['Barlow_Condensed'] font-bold text-xl text-[#0D1B2E] tracking-wide">MISI</h3>
              </div>
              <ul className="space-y-2.5 text-[#3D5269] font-['Barlow'] text-sm leading-relaxed">
                {[
                  "Menyelenggarakan penyelidikan dan penyidikan tindak pidana siber secara profesional",
                  "Meningkatkan kemampuan personel dalam bidang teknologi dan digital forensik",
                  "Membangun kemitraan strategis dengan institusi siber nasional dan internasional",
                  "Mengedukasi masyarakat untuk meningkatkan literasi dan kesadaran keamanan siber",
                  "Mewujudkan tata kelola organisasi yang transparan, akuntabel, dan berintegritas",
                ].map((m, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="font-['JetBrains_Mono'] text-[#C9A53E] text-xs mt-0.5 flex-shrink-0">0{i + 1}</span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Tugas & Fungsi */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <SectionLabel>Tugas & Fungsi</SectionLabel>
            <SectionHeading>Kewenangan & Bidang Kerja</SectionHeading>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Search, t: "Penyelidikan Siber", d: "Melaksanakan penyelidikan dan pengumpulan informasi terkait dugaan tindak pidana di ranah siber." },
              { icon: FileText, t: "Penyidikan Perkara", d: "Menyelenggarakan penyidikan perkara tindak pidana siber berdasarkan laporan masyarakat dan hasil penyelidikan." },
              { icon: Database, t: "Forensik Digital", d: "Melakukan analisis dan pemeriksaan forensik terhadap perangkat elektronik sebagai alat bukti." },
              { icon: Globe, t: "Patroli Siber", d: "Memantau dan mendeteksi konten serta aktivitas ilegal di ruang siber secara proaktif." },
              { icon: BookOpen, t: "Edukasi Publik", d: "Melaksanakan kegiatan sosialisasi dan edukasi keamanan siber kepada masyarakat luas." },
              { icon: Users, t: "Koordinasi Lintas Sektor", d: "Berkoordinasi dengan kementerian, lembaga, BSSN, dan mitra internasional dalam penanganan kejahatan siber." },
            ].map(({ icon: Icon, t, d }, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-[rgba(13,27,46,0.08)] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-[#EEF2F7] group-hover:bg-[#C9A53E]/10 flex items-center justify-center mb-4 transition-colors">
                  <Icon className="w-5 h-5 text-[#0D1B2E] group-hover:text-[#C9A53E] transition-colors" />
                </div>
                <h4 className="font-['Barlow'] font-semibold text-[#0D1B2E] mb-2">{t}</h4>
                <p className="text-[#5A6E87] text-sm font-['Barlow'] leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Organisasi ──────────────────────────────────────────────────────────────

function OrgChartSection() {
  return (
    <section id="organisasi" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <SectionLabel>Struktur Organisasi</SectionLabel>
          <SectionHeading>Hierarki & Satuan Kerja</SectionHeading>
          <p className="text-[#5A6E87] font-['Barlow'] mt-3 max-w-xl mx-auto text-sm">
            Nama pejabat bersifat placeholder dan akan diperbarui sesuai data resmi terkini.
          </p>
        </div>

        {/* Org chart */}
        <div className="overflow-x-auto pb-4">
          <div className="min-w-[640px] flex flex-col items-center gap-0">
            {/* Level 1 */}
            <OrgBox
              title="DITRESSIBER"
              sub="Direktur —  WAHYU NUGROHO SETYAWAN, S.I.K. M.PICT.,M.Krim."
            />

            {/* Connector */}
            <div className="w-px h-8 bg-[#C9A53E]/60" />

            {/* Level 2 */}
            <OrgBox title="WADITRESSIBER" sub="Wakil Direktur — [Nama Pejabat]" />

            {/* Connector to level 3 */}
            <div className="w-px h-8 bg-[rgba(13,27,46,0.25)]" />

            {/* Horizontal connector */}
            <div className="relative flex items-start">
              {/* The horizontal bar */}
              <div className="absolute top-0 left-[10%] right-[10%] h-px bg-[rgba(13,27,46,0.2)]" />
              <div className="flex gap-4 md:gap-6 pt-0">
                {[
                  { title: "BAGBINOPSNAL", sub: "Kabag — [Nama]", desc: "Pembinaan Operasional" },
                  { title: "BAGWASSIDIK", sub: "Kabag — [Nama]", desc: "Pengawasan Penyidikan" },
                  { title: "SUBBAGRENMIN", sub: "Kasubbag — [Nama]", desc: "Perencanaan & Administrasi" },
                  { title: "UNIT SIBER", sub: "Kanit — [Nama]", desc: "Penyelidikan Siber" },
                  { title: "UNIT TEKNIS", sub: "Kanit — [Nama]", desc: "Forensik & Teknis" },
                ].map((node, i) => (
                  <div key={i} className="flex flex-col items-center gap-0">
                    <div className="w-px h-8 bg-[rgba(13,27,46,0.2)]" />
                    <div className="bg-[#EEF2F7] border border-[rgba(13,27,46,0.15)] hover:border-[#C9A53E]/60 hover:shadow-md rounded-xl px-3 py-3 text-center min-w-[112px] max-w-[130px] transition-all cursor-default group">
                      <div className="font-['Barlow'] font-bold text-[#0D1B2E] text-[10px] tracking-wide leading-tight group-hover:text-[#C9A53E] transition-colors">
                        {node.title}
                      </div>
                      <div className="text-[#5A6E87] text-[9px] mt-1 font-['Barlow']">{node.sub}</div>
                      <div className="text-[#C9A53E] text-[9px] mt-1 font-['JetBrains_Mono']">{node.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Layanan ─────────────────────────────────────────────────────────────────

function LayananSection() {
  return (
    <section id="layanan" style={{ background: "linear-gradient(160deg, #0D1B2E 0%, #122446 100%)" }} className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <SectionLabel>Layanan Kami</SectionLabel>
          <SectionHeading light>Layanan Siber Ditressiber</SectionHeading>
          <p className="text-white/55 font-['Barlow'] mt-3 max-w-xl mx-auto text-sm">
            Berbagai layanan profesional yang kami sediakan untuk melindungi masyarakat di ruang digital.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {LAYANAN.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={i}
              className="group bg-white/6 hover:bg-white/10 border border-white/10 hover:border-[#C9A53E]/40 rounded-2xl p-6 transition-all hover:-translate-y-1 cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-[#C9A53E]/15 border border-[#C9A53E]/30 flex items-center justify-center mb-5 group-hover:bg-[#C9A53E]/25 transition-colors">
                <Icon className="w-6 h-6 text-[#C9A53E]" />
              </div>
              <h3 className="font-['Barlow'] font-semibold text-white mb-2 text-base">{title}</h3>
              <p className="text-white/55 font-['Barlow'] text-sm leading-relaxed">{desc}</p>
              <div className="mt-4 flex items-center gap-1.5 text-[#C9A53E] text-xs font-['Barlow'] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Selengkapnya <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Edukasi ─────────────────────────────────────────────────────────────────

function EdukasiSection() {
  return (
    <section id="edukasi" className="py-24 bg-[#EEF2F7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <SectionLabel>Edukasi & Himbauan</SectionLabel>
            <SectionHeading>Tips & Waspada Siber</SectionHeading>
          </div>
          <button className="self-start md:self-auto flex items-center gap-2 text-[#0D1B2E] font-['Barlow'] font-medium text-sm border border-[rgba(13,27,46,0.25)] hover:border-[#0D1B2E] rounded-lg px-4 py-2.5 transition-colors">
            Lihat Semua <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {EDUKASI.map((e, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[rgba(13,27,46,0.07)] hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="h-1.5 bg-gradient-to-r from-[#0D1B2E] to-[#1A3A5C]" />
              <div className="p-5">
                <span className="inline-block bg-[#C9A53E]/15 text-[#8B6914] text-[10px] font-['Barlow'] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full mb-3">
                  {e.tag}
                </span>
                <h4 className="font-['Barlow'] font-semibold text-[#0D1B2E] text-sm mb-2 leading-snug">{e.title}</h4>
                <p className="text-[#5A6E87] text-xs font-['Barlow'] leading-relaxed mb-3">{e.desc}</p>
                <div className="text-[#9AAEC2] text-[11px] font-['JetBrains_Mono']">{e.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Hukum ───────────────────────────────────────────────────────────────────

function HukumSection() {
  return (
    <section id="hukum" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <SectionLabel>Dasar Hukum</SectionLabel>
          <SectionHeading>Regulasi & Peraturan Siber</SectionHeading>
          <p className="text-[#5A6E87] font-['Barlow'] mt-3 max-w-xl mx-auto text-sm">
            Landasan hukum yang menjadi dasar penegakan hukum di bidang kejahatan siber di Indonesia.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {HUKUM.map((h, i) => (
            <div key={i} className="group border border-[rgba(13,27,46,0.1)] hover:border-[#C9A53E]/50 rounded-xl p-5 hover:shadow-md transition-all">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-[#0D1B2E] flex items-center justify-center flex-shrink-0">
                  <Scale className="w-4 h-4 text-[#C9A53E]" />
                </div>
                <div>
                  <div className="font-['JetBrains_Mono'] text-[#C9A53E] text-[10px] font-medium mb-0.5">{h.nomor}</div>
                  <h4 className="font-['Barlow'] font-semibold text-[#0D1B2E] text-sm leading-snug">{h.judul}</h4>
                </div>
              </div>
              <div className="bg-[#EEF2F7] rounded-lg px-3 py-1.5 text-[10px] text-[#3D5269] font-['Barlow'] mb-3">{h.pasal}</div>
              <p className="text-[#5A6E87] text-xs font-['Barlow'] leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Berita ──────────────────────────────────────────────────────────────────

function BeritaSection() {
  return (
    <section id="berita" className="py-24 bg-[#EEF2F7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <SectionLabel>Berita & Informasi</SectionLabel>
            <SectionHeading>Berita Terkini</SectionHeading>
          </div>
          <button className="self-start flex items-center gap-2 text-[#0D1B2E] font-['Barlow'] font-medium text-sm border border-[rgba(13,27,46,0.25)] hover:border-[#0D1B2E] rounded-lg px-4 py-2.5 transition-colors">
            Arsip Berita <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {BERITA.map((b, i) => (
            <article key={i} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-[rgba(13,27,46,0.07)] hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="relative h-48 bg-[#1A3A5C] overflow-hidden">
                <img
                  src={b.img}
                  alt={b.judul}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-[#C9A53E] text-[#0D1B2E] text-[10px] font-['Barlow'] font-bold px-2.5 py-1 rounded-full tracking-wide">
                    {b.cat}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2E]/50 to-transparent" />
              </div>
              <div className="p-5">
                <div className="text-[#9AAEC2] text-[11px] font-['JetBrains_Mono'] mb-2">{b.tanggal}</div>
                <h3 className="font-['Barlow'] font-semibold text-[#0D1B2E] text-sm leading-snug mb-2">{b.judul}</h3>
                <p className="text-[#5A6E87] text-xs font-['Barlow'] leading-relaxed mb-4">{b.desc}</p>
                <button className="flex items-center gap-1.5 text-[#0D1B2E] text-xs font-['Barlow'] font-semibold hover:text-[#C9A53E] transition-colors">
                  Baca Selengkapnya <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Media Gallery ───────────────────────────────────────────────────────────

function MediaSection() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="media" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <SectionLabel>Galeri & Media</SectionLabel>
          <SectionHeading>Dokumentasi Kegiatan</SectionHeading>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {MEDIA_GALLERY.map((src, i) => (
            <button
              key={i}
              onClick={() => setSelected(src)}
              className="group relative rounded-xl overflow-hidden bg-[#1A3A5C] aspect-video focus:outline-none focus:ring-2 focus:ring-[#C9A53E]"
            >
              <img
                src={src}
                alt={`Dokumentasi kegiatan ${i + 1}`}
                className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-400"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2E]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <Camera className="w-5 h-5 text-white" />
              </div>
            </button>
          ))}
        </div>

        {/* Lightbox */}
        {selected && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button className="absolute top-4 right-4 text-white/70 hover:text-white">
              <X className="w-8 h-8" />
            </button>
            <img
              src={selected}
              alt="Tampilan penuh"
              className="max-w-full max-h-[85vh] rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        {/* Social Media */}
        <div className="mt-16 bg-[#EEF2F7] rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="font-['Barlow_Condensed'] font-bold text-[#0D1B2E] text-2xl tracking-wide mb-2">Ikuti Kami di Media Sosial</h3>
            <p className="text-[#5A6E87] font-['Barlow'] text-sm">
              Dapatkan informasi, himbauan, dan edukasi keamanan siber terkini.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                platform: "Instagram",
                handle: "@siberpoldajateng",
                url: "https://www.instagram.com/siberpoldajateng/",
                color: "#E1306C",
                bg: "#FDE8F0",
                icon: Hash
              },
              {
                platform: "Twitter / X",
                handle: "@siberjateng",
                url: "https://x.com/siberjateng",
                color: "#1DA1F2",
                bg: "#E8F5FE",
                icon: Radio
              },
              {
                platform: "TikTok",
                handle: "@siberpoldajateng",
                url: "https://www.tiktok.com/@siberpoldajateng",
                color: "#000000",
                bg: "#F2F2F2",
                icon: Monitor
              },
              {
                platform: "Facebook",
                handle: "siberpoldajateng",
                url: "https://www.facebook.com/siberpoldajateng",
                color: "#1877F2",
                bg: "#E8F0FE",
                icon: Globe
              },
            ].map(({ platform, handle, url, color, bg, icon: Icon }, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="bg-white rounded-xl p-4 border border-[rgba(13,27,46,0.08)] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: bg }}
                  >
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>

                  <div>
                    <div className="font-['Barlow'] font-semibold text-[#0D1B2E] text-xs">
                      {platform}
                    </div>
                    <div className="text-[#5A6E87] text-[10px] font-['JetBrains_Mono'] truncate max-w-[110px]">
                      {handle}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

function FAQSection() {
  return (
    <section className="py-24 bg-[#EEF2F7]">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <SectionLabel>Pertanyaan Umum</SectionLabel>
          <SectionHeading>Tanya Jawab (FAQ)</SectionHeading>
          <p className="text-[#5A6E87] font-['Barlow'] mt-3 text-sm">
            Jawaban atas pertanyaan yang paling sering diajukan masyarakat.
          </p>
        </div>
        <div className="space-y-2">
          {FAQ_ITEMS.map((item, i) => <FAQItem key={i} {...item} />)}
        </div>
      </div>
    </section>
  );
}

// ─── Kontak ──────────────────────────────────────────────────────────────────

function KontakSection() {
    const [nama, setNama] = useState("");
    const [telepon, setTelepon] = useState("");
    const [email, setEmail] = useState("");
    const [jenis, setJenis] = useState("");
    const [uraian, setUraian] = useState("");
    const [pesan, setPesan] = useState("");
      return (
    <section id="kontak" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Reporting CTA banner */}
        <div
          className="rounded-2xl p-8 md:p-12 mb-16 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0D1B2E 0%, #1A3A5C 100%)" }}
        >
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: "radial-gradient(rgba(201,165,62,0.6) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-[#C9A53E]" />
                <span className="text-[#C9A53E] text-xs font-mono tracking-widest uppercase">Darurat Siber</span>
              </div>
              <h2 className="font-['Barlow_Condensed'] font-extrabold text-white text-3xl md:text-4xl tracking-wide mb-2">
                Jadi Korban Kejahatan Siber?
              </h2>
              <p className="text-white/65 font-['Barlow'] text-sm max-w-xl">
                Segera laporkan! Semakin cepat dilaporkan, semakin besar peluang penanganannya. Akses layanan resmi untuk mendapatkan bantuan dan penanganan lebih lanjut.
              </p>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <button
                onClick={() => window.open("https://patrolisiber.id/", "_blank")}
                className="flex items-center gap-2 bg-[#C9A53E] hover:bg-[#E8C96A] text-[#0D1B2E] font-['Barlow'] font-bold px-6 py-3.5 rounded-xl transition-all text-sm whitespace-nowrap"
              >
                <AlertTriangle className="w-4 h-4" />
                Lapor Sekarang
              </button>
              <button
                onClick={() => window.open("https://www.ojk.go.id/", "_blank")} 
                className="flex items-center gap-2 bg-white/10 border border-white/20 hover:bg-white/18 text-white font-['Barlow'] font-medium px-6 py-3 rounded-xl transition-all text-sm justify-center">
                <Phone className="w-4 h-4" />
                Kunjungi OJK
              </button>
            </div>
          </div>
        </div>

        {/* Contact info */}
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <SectionLabel>Kontak Kami</SectionLabel>
            <SectionHeading>Informasi Kontak</SectionHeading>
            <p className="text-[#5A6E87] font-['Barlow'] mt-3 mb-8 text-sm leading-relaxed">
              Semua data kontak bersifat placeholder dan akan diperbarui sesuai informasi resmi.
            </p>
            <div className="space-y-5">
              {[
                {
                  icon: MapPin,
                  label: "Alamat Kantor",
                  val: "Jl. Sultan Agung No.103, Gajahmungkur, Kec. Gajahmungkur, Kota Semarang, Jawa Tengah 50232",
                },
                { icon: Globe, label: "Website Polda Jateng", val: "www.polda-jateng.go.id" },
              ].map(({ icon: Icon, label, val }, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#EEF2F7] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#0D1B2E]" />
                  </div>
                  <div>
                    <div className="text-xs text-[#9AAEC2] font-['Barlow'] font-medium mb-0.5">{label}</div>
                    <div className="text-[#0D1B2E] font-['Barlow'] text-sm">{val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer({ onNav }: { onNav: (id: string) => void }) {
  return (
    <footer style={{ background: "linear-gradient(180deg, #0A1625 0%, #060E1A 100%)" }} className="pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#C9A53E]/20 border border-[#C9A53E]/40 flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#C9A53E]" />
              </div>
              <div>
                <div className="font-['Barlow_Condensed'] font-bold text-white text-sm tracking-wide">DITRESSIBER</div>
                <div className="text-[#C9A53E] text-[10px] font-['Barlow'] tracking-widest">POLDA JAWA TENGAH</div>
              </div>
            </div>
            <p className="text-white/45 font-['Barlow'] text-sm leading-relaxed max-w-xs mb-4">
              Direktorat Reserse Kriminal Siber Polda Jawa Tengah — Bersama Menjaga Ruang Siber.
            </p>
            <div className="text-white/30 text-xs font-['JetBrains_Mono']">
              Informasi resmi dan edukasi keamanan ruang digital bagi masyarakat.
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-['Barlow'] font-semibold text-sm mb-4 tracking-wide">Navigasi</h4>
            <ul className="space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNav(item.id)}
                    className="text-white/45 hover:text-[#C9A53E] font-['Barlow'] text-sm transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact summary */}
          <div>
            <h4 className="text-white font-['Barlow'] font-semibold text-sm mb-4 tracking-wide">Hubungi Kami</h4>
            <div className="space-y-3">
              {[
                { icon: MapPin, text: "Semarang, Jawa Tengah" },
                { icon: Globe, text: "www.polda-jateng.go.id" },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-2.5 text-white/45 hover:text-white/70 transition-colors cursor-default">
                  <Icon className="w-3.5 h-3.5 text-[#C9A53E] flex-shrink-0" />
                  <span className="font-['Barlow'] text-xs">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs font-['Barlow']">
            Website resmi Ditressiber Polda Jawa Tengah. Informasi placeholder belum bersifat final.
          </p>
          <div className="flex items-center gap-4">
            <button className="text-white/30 hover:text-white/60 text-xs font-['Barlow'] transition-colors">Kebijakan Privasi</button>
            <span className="text-white/15">|</span>
            <button className="text-white/30 hover:text-white/60 text-xs font-['Barlow'] transition-colors">Syarat & Ketentuan</button>
            <span className="text-white/15">|</span>
            <button className="text-white/30 hover:text-white/60 text-xs font-['Barlow'] transition-colors">Aksesibilitas</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen font-['Barlow'] bg-[#EEF2F7] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <Navbar onNav={scrollTo} />
      <main>
        <Hero onNav={scrollTo} />
        <ProfilSection />
        <OrgChartSection />
        <LayananSection />
        <EdukasiSection />
        <HukumSection />
        <BeritaSection />
        <MediaSection />
        <FAQSection />
        <KontakSection />
      </main>
      <Footer onNav={scrollTo} />
    </div>
  );
}

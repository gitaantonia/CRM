import { FormEvent, useEffect, useMemo, useState } from "react";

type IconName =
  | "home"
  | "calendar"
  | "search"
  | "users"
  | "school"
  | "message"
  | "gift"
  | "briefcase"
  | "heart"
  | "plug"
  | "settings"
  | "bell"
  | "chevron"
  | "menu"
  | "plus"
  | "arrow"
  | "check"
  | "clock"
  | "more"
  | "download"
  | "filter"
  | "trend"
  | "receipt"
  | "star"
  | "close"
  | "command"
  | "logout"
  | "palette"
  | "qr";

const paths: Record<IconName, React.ReactNode> = {
  home: (
    <>
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v10h14V10M9 20v-6h6v6" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M8 3v4m8-4v4M3 10h18" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <path d="M20 8v6m3-3h-6" />
    </>
  ),
  school: (
    <>
      <path d="m2 9 10-5 10 5-10 5L2 9Z" />
      <path d="M6 11v5c3 3 9 3 12 0v-5M22 9v6" />
    </>
  ),
  message: (
    <>
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z" />
      <path d="M8 9h8m-8 4h5" />
    </>
  ),
  gift: (
    <>
      <rect x="3" y="8" width="18" height="13" rx="2" />
      <path d="M12 8v13M3 12h18" />
      <path d="M12 8H7.5a2.5 2.5 0 1 1 2.1-3.9L12 8Zm0 0h4.5a2.5 2.5 0 1 0-2.1-3.9L12 8Z" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="3" />
      <path d="M9 7V5h6v2m-3 4v4M3 12h18" />
    </>
  ),
  heart: (
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.7-7.5 1.1-1.1a5.5 5.5 0 0 0 0-7.8Z" />
  ),
  plug: (
    <>
      <path d="m8 12 4 4m4-12-3 3m7 1-3 3M5 11l8 8-2 2a4 4 0 0 1-6-6l-2-2 2-2Z" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
    </>
  ),
  chevron: <path d="m9 18 6-6-6-6" />,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  plus: <path d="M12 5v14M5 12h14" />,
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  check: <path d="m5 12 4 4L19 6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  more: (
    <>
      <circle cx="5" cy="12" r="1" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12m-5-5 5 5 5-5" />
      <path d="M5 21h14" />
    </>
  ),
  filter: <path d="M4 5h16l-6 7v6l-4 2v-8L4 5Z" />,
  trend: <path d="m3 17 6-6 4 4 8-9m-6 0h6v6" />,
  receipt: <path d="M5 3v18l3-2 4 2 4-2 3 2V3l-3 2-4-2-4 2-3-2Zm4 6h6m-6 4h6" />,
  star: <path d="m12 2 3 6 7 .9-5 4.8 1.2 6.8L12 17l-6.2 3.5L7 13.7 2 9l7-.9L12 2Z" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  command: <path d="M9 6V5a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v14a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V5" />,
  logout: (
    <>
      <path d="M10 17l5-5-5-5m5 5H3" />
      <path d="M13 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
    </>
  ),
  palette: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="8" cy="9" r="1" />
      <circle cx="12" cy="7" r="1" />
      <circle cx="16" cy="9" r="1" />
      <path d="M12 21c-2 0-2-4 1-4h2a4 4 0 0 0 0-8" />
    </>
  ),
  qr: (
    <>
      <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h3v3h-3zM18 18h3v3h-3zM19 13h2M13 20h2" />
    </>
  ),
};

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[name]}
    </svg>
  );
}

type Page =
  | "dashboard"
  | "calendar"
  | "lookup"
  | "customers"
  | "profile"
  | "campus"
  | "pos"
  | "campaigns"
  | "builder"
  | "performance"
  | "rewards"
  | "reviews"
  | "events"
  | "quotation"
  | "partners"
  | "settings"
  | "design"
  | "qr"
  | "login";
const pageTitle: Record<Page, string> = {
  dashboard: "Manager Dashboard",
  calendar: "Kalender Permintaan",
  lookup: "Cari Pelanggan",
  customers: "Customer 360",
  profile: "Profil Pelanggan",
  campus: "Program Kampus",
  pos: "Integrasi POS",
  campaigns: "Kampanye WhatsApp",
  builder: "Campaign Builder",
  performance: "Performa Kampanye",
  rewards: "Reward & Voucher",
  reviews: "Review & Keluhan",
  events: "Event Pipeline",
  quotation: "Kalkulator Penawaran",
  partners: "Direktori Mitra",
  settings: "Pengaturan",
  design: "Design System",
  qr: "Customer QR",
  login: "Masuk",
};

const managerNav = [
  {
    group: "Ringkasan",
    items: [
      ["dashboard", "home", "Dashboard"],
      ["calendar", "calendar", "Kalender Permintaan"],
    ],
  },
  {
    group: "Pelanggan",
    items: [
      ["lookup", "search", "Cari Pelanggan"],
      ["customers", "users", "Customer 360"],
      ["campus", "school", "Program Kampus"],
    ],
  },
  {
    group: "Pertumbuhan",
    items: [
      ["campaigns", "message", "Kampanye WhatsApp"],
      ["rewards", "gift", "Reward & Voucher"],
      ["events", "briefcase", "Event & Mitra"],
    ],
  },
  { group: "Layanan", items: [["reviews", "heart", "Review & Keluhan"]] },
  {
    group: "Sistem",
    items: [
      ["pos", "plug", "Integrasi POS"],
      ["settings", "settings", "Pengaturan"],
    ],
  },
] as { group: string; items: [Page, IconName, string][] }[];

type Role = "Manager" | "Kasir/Barista" | "Marketing" | "Kepala Unit";
type NavGroup = { group: string; items: [Page, IconName, string][] };

const navByRole: Record<Role, NavGroup[]> = {
  Manager: managerNav,
  "Kasir/Barista": [
    {
      group: "Pelanggan",
      items: [
        ["lookup", "search", "Cari Pelanggan"],
        ["campus", "school", "Verifikasi Mahasiswa"],
      ],
    },
    { group: "Layanan", items: [["reviews", "heart", "Review & Keluhan"]] },
  ],
  Marketing: [
    { group: "Ringkasan", items: [["dashboard", "home", "Dashboard"]] },
    { group: "Pelanggan", items: [["customers", "users", "Customer 360"]] },
    {
      group: "Pertumbuhan",
      items: [
        ["campaigns", "message", "Kampanye WhatsApp"],
        ["rewards", "gift", "Reward & Voucher"],
        ["events", "briefcase", "Event & Mitra"],
      ],
    },
  ],
  "Kepala Unit": [
    {
      group: "Ringkasan",
      items: [
        ["dashboard", "home", "Dashboard"],
        ["calendar", "calendar", "Kalender Permintaan"],
      ],
    },
    {
      group: "Pelanggan",
      items: [
        ["customers", "users", "Customer 360"],
        ["campus", "school", "Program Kampus"],
      ],
    },
    {
      group: "Operasional",
      items: [
        ["reviews", "heart", "Review & Keluhan"],
        ["events", "briefcase", "Event Pipeline"],
        ["pos", "plug", "Integrasi POS"],
      ],
    },
  ],
};

const roleProfiles: Record<Role, { name: string; initials: string; unit: string }> = {
  Manager: { name: "Raka Pratama", initials: "RP", unit: "3 unit" },
  "Kasir/Barista": { name: "Ayodia", initials: "AY", unit: "Sudirman" },
  Marketing: { name: "Agna Putri", initials: "AP", unit: "Growth Team" },
  "Kepala Unit": { name: "Han Pradana", initials: "HP", unit: "Sudirman" },
};

const customers = [
  {
    name: "Nadia Putri",
    phone: "0812 4521 9087",
    visits: 28,
    spend: "Rp4.860.000",
    tier: "Gold",
    last: "Hari ini",
    initials: "NP",
    color: "#E6DDF5",
    source: "QR struk",
    campus: "",
    community: false,
    active: true,
    spendValue: 4860000,
  },
  {
    name: "Reza Mahendra",
    phone: "0857 2208 1145",
    visits: 18,
    spend: "Rp2.740.000",
    tier: "Silver",
    last: "Kemarin",
    initials: "RM",
    color: "#F9D9C7",
    source: "Event",
    campus: "",
    community: true,
    active: true,
    spendValue: 2740000,
  },
  {
    name: "Alya Syafira",
    phone: "0813 8872 2301",
    visits: 15,
    spend: "Rp2.125.000",
    tier: "Student",
    last: "18 Jun",
    initials: "AS",
    color: "#F6E8A9",
    source: "Kampus",
    campus: "Universitas Padjadjaran",
    community: false,
    active: true,
    spendValue: 2125000,
  },
  {
    name: "Dimas Saputra",
    phone: "0896 5400 1228",
    visits: 11,
    spend: "Rp1.950.000",
    tier: "Member",
    last: "16 Jun",
    initials: "DS",
    color: "#C7E4D7",
    source: "QR struk",
    campus: "",
    community: true,
    active: false,
    spendValue: 1950000,
  },
  {
    name: "Maya Larasati",
    phone: "0819 7345 8820",
    visits: 9,
    spend: "Rp1.420.000",
    tier: "Member",
    last: "12 Jun",
    initials: "ML",
    color: "#F2BFD0",
    source: "Referensi",
    campus: "",
    community: false,
    active: true,
    spendValue: 1420000,
  },
];

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="brand">
      <img src="/favicon.png" />
      <div className={compact ? "hide-compact" : ""}>
        <strong>Limitless</strong>
        <span>Hub</span>
      </div>
    </div>
  );
}

type MascotPose = "alert" | "happy" | "curious" | "welcome" | "celebration" | "success";

function Mascot({
  pose = "welcome",
  className = "",
  alt,
}: {
  pose?: MascotPose;
  className?: string;
  alt?: string;
}) {
  return (
    <img
      className={`mascot ${className}`}
      src={`/mascot/${pose}.png`}
      alt={alt || `Maskot Limitless pose ${pose}`}
    />
  );
}

function Badge({ children, tone = "lilac" }: { children: React.ReactNode; tone?: string }) {
  return <span className={`badge ${tone}`}>{children}</span>;
}

function notify(title: string, detail = "Aksi berhasil diproses.") {
  window.dispatchEvent(new CustomEvent("limitless:notify", { detail: { title, detail } }));
}

function Button({
  children,
  variant = "primary",
  icon,
  onClick,
  type = "button",
  disabled = false,
}: {
  children: React.ReactNode;
  variant?: string;
  icon?: IconName;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <button
      className={`btn ${variant}`}
      onClick={
        onClick ||
        (type === "button"
          ? () => notify("Siap diproses", "Pilihanmu sudah diterapkan pada tampilan ini.")
          : undefined)
      }
      type={type}
      disabled={disabled}
    >
      {icon && <Icon name={icon} size={17} />}
      <span>{children}</span>
    </button>
  );
}

function Empty({
  title = "Masih kosong? Tenang, kita mulai dari sini.",
  text,
  action,
}: {
  title?: string;
  text?: string;
  action?: string;
}) {
  return (
    <div className="empty">
      <Mascot pose="happy" className="empty-mascot" />
      <h3>{title}</h3>
      {text && <p>{text}</p>}
      {action && <Button icon="plus">{action}</Button>}
    </div>
  );
}

function PageHead({
  eyebrow,
  title,
  desc,
  action,
  actionIcon = "plus",
  onAction,
  children,
}: {
  eyebrow?: string;
  title: string;
  desc: string;
  action?: string;
  actionIcon?: IconName;
  onAction?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div className="page-head">
      <div>
        <span className="eyebrow">{eyebrow || "LIMITLESS HUB"}</span>
        <h1>{title}</h1>
        <p>{desc}</p>
      </div>
      <div className="head-actions">
        {children}
        {action && (
          <Button icon={actionIcon} onClick={onAction}>
            {action}
          </Button>
        )}
      </div>
    </div>
  );
}

function MascotNote({
  children,
  pose = "welcome",
}: {
  children: React.ReactNode;
  pose?: MascotPose;
}) {
  return (
    <div className="mascot-note">
      <Mascot pose={pose} />
      <div>
        <span>LIMITLESS NOTE</span>
        <p>{children}</p>
      </div>
    </div>
  );
}

function Sparkline({ color = "#8d78cf" }: { color?: string }) {
  return (
    <svg className="spark" viewBox="0 0 120 42" preserveAspectRatio="none">
      <path
        d="M0 35 C15 32 17 21 30 25 S48 32 57 18 75 27 84 14 101 18 120 4"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M0 35 C15 32 17 21 30 25 S48 32 57 18 75 27 84 14 101 18 120 4 V42 H0Z"
        fill={color}
        opacity=".08"
      />
    </svg>
  );
}

function Dashboard({ go }: { go: (p: Page) => void }) {
  return (
    <div className="page">
      <PageHead
        eyebrow="RABU, 19 JUNI"
        title="Selamat pagi, Raka."
        desc="Ringkasan operasional Limitless hari ini."
      >
        <select className="select">
          <option>30 hari terakhir</option>
          <option>7 hari terakhir</option>
        </select>
      </PageHead>
      <MascotNote pose="welcome">Hai! Ada beberapa hal yang perlu kamu lirik hari ini.</MascotNote>
      <div className="metrics dashboard-metrics">
        {[
          ["Member aktif", "8.204", "+8,4%", "users"],
          ["Transaksi tertaut", "78,6%", "+5,8%", "plug"],
          ["Repeat rate", "64,8%", "+4,1%", "trend"],
          ["Hampir hilang", "386", "-6,2%", "clock"],
          ["Rating rata-rata", "4,7 / 5", "+0,2", "star"],
          ["Recovery rate", "72,4%", "+8,1%", "heart"],
        ].map((m, i) => (
          <button className="metric" key={m[0]} onClick={() => i === 0 && go("customers")}>
            <div className={`metric-icon c${i}`}>
              <Icon name={m[3] as IconName} />
            </div>
            <span>{m[0]}</span>
            <strong>{m[1]}</strong>
            <small>
              <b>{m[2]}</b> dari periode lalu
            </small>
            <Sparkline
              color={["#8f9ce8", "#79a5cf", "#9a83c7", "#e29aaa", "#e2be56", "#76aa91"][i]}
            />
          </button>
        ))}
      </div>
      <div className="dash-grid">
        <section className="panel span2">
          <div className="panel-head">
            <div>
              <h2>Member vs non-member</h2>
              <p>Komposisi transaksi POS · 12 bulan terakhir</p>
            </div>
            <div className="legend">
              <i />
              Member <i />
              Non-member
            </div>
          </div>
          <div className="chart">
            <div className="ylabels">
              <span>600</span>
              <span>400</span>
              <span>200</span>
              <span>0</span>
            </div>
            <div className="bars">
              {[42, 58, 48, 72, 62, 83, 68, 78, 91, 74, 88, 95].map((v, i) => (
                <div className="bar-col" key={i}>
                  <div className="bar returning" style={{ height: `${v}%` }} />
                  <div className="bar new" style={{ height: `${v * 0.38}%` }} />
                  <span>
                    {
                      [
                        "Jul",
                        "Agu",
                        "Sep",
                        "Okt",
                        "Nov",
                        "Des",
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "Mei",
                        "Jun",
                      ][i]
                    }
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="panel">
          <div className="panel-head">
            <div>
              <h2>Perlu perhatian</h2>
              <p>Prioritas layanan hari ini</p>
            </div>
            <button className="icon-btn">
              <Icon name="more" />
            </button>
          </div>
          <div className="attention">
            <button onClick={() => go("reviews")}>
              <span className="att-icon pink">!</span>
              <div>
                <strong>3 keluhan melewati SLA</strong>
                <small>Perlu eskalasi segera</small>
              </div>
              <Icon name="chevron" />
            </button>
            <button onClick={() => go("campus")}>
              <span className="att-icon yellow">
                <Icon name="school" size={16} />
              </span>
              <div>
                <strong>8 verifikasi mahasiswa</strong>
                <small>Menunggu pemeriksaan staf</small>
              </div>
              <Icon name="chevron" />
            </button>
            <button onClick={() => go("events")}>
              <span className="att-icon lilac">
                <Icon name="briefcase" size={16} />
              </span>
              <div>
                <strong>2 penawaran jatuh tempo</strong>
                <small>Follow-up sebelum 16.00</small>
              </div>
              <Icon name="chevron" />
            </button>
          </div>
        </section>
        <section className="panel span2 dashboard-insight">
          <div className="panel-head">
            <div>
              <h2>Asal member baru</h2>
              <p>1.284 pendaftaran dalam 30 hari terakhir</p>
            </div>
            <Button variant="ghost" onClick={() => go("customers")}>
              Lihat pelanggan
            </Button>
          </div>
          <div className="source-demand">
            <div className="source-list">
              {[
                ["QR struk POS", "54%", "#AEB8F5"],
                ["Program kampus", "24%", "#F2BFD0"],
                ["Event & komunitas", "14%", "#F6E8A9"],
                ["Referensi staf", "8%", "#BFDCCB"],
              ].map((source) => (
                <div key={source[0]}>
                  <span>
                    <i style={{ background: source[2] }} />
                    {source[0]}
                  </span>
                  <div>
                    <i style={{ width: source[1], background: source[2] }} />
                  </div>
                  <b>{source[1]}</b>
                </div>
              ))}
            </div>
            <button className="demand-peek" onClick={() => go("calendar")}>
              <div>
                <span className="eyebrow">KALENDER PERMINTAAN</span>
                <strong>Jumat diperkirakan ramai</strong>
                <small>Berdasarkan perbandingan 12 Jumat sebelumnya</small>
              </div>
              <div className="demand-index">
                <strong>86</strong>
                <span>indeks ramai</span>
              </div>
              <Icon name="arrow" />
            </button>
          </div>
          <div className="outlets compact-outlets">
            {[
              ["Sudirman", "128", "Rp14,8jt", "72%"],
              ["Dago", "96", "Rp10,2jt", "64%"],
              ["Dipatiukur", "84", "Rp8,9jt", "59%"],
            ].map((o, i) => (
              <div className="outlet" key={o[0]}>
                <div>
                  <span className={`dot d${i}`} />
                  <strong>{o[0]}</strong>
                </div>
                <span>{o[1]} transaksi</span>
                <b>{o[2]}</b>
                <div className="progress">
                  <i style={{ width: o[3] }} />
                </div>
                <small>{o[3]} pelanggan kembali</small>
              </div>
            ))}
          </div>
        </section>
        <section className="panel">
          <div className="panel-head">
            <div>
              <h2>Kampanye terbaru</h2>
              <p>Summer Sip — Batch A</p>
            </div>
            <Badge tone="green">Terkirim</Badge>
          </div>
          <div className="donut-row">
            <div className="donut">
              <div>
                <strong>82%</strong>
                <span>Dibaca</span>
              </div>
            </div>
            <div className="donut-stats">
              <p>
                <i className="purple" />
                1.842 <span>Terkirim</span>
              </p>
              <p>
                <i className="pink" />
                1.510 <span>Dibaca</span>
              </p>
              <p>
                <i className="yellow" />
                186 <span>Klik</span>
              </p>
            </div>
          </div>
          <Button variant="soft" onClick={() => go("performance")}>
            Lihat performa <Icon name="arrow" size={16} />
          </Button>
        </section>
      </div>
    </div>
  );
}

function DemandCalendar() {
  const [view, setView] = useState("Bulan");
  const [cursor, setCursor] = useState(new Date(2025, 5, 19));
  const [selected, setSelected] = useState(new Date(2025, 5, 19));
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const shortDays = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
  const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
  const firstDay = (new Date(cursor.getFullYear(), cursor.getMonth(), 1).getDay() + 6) % 7;
  const monthCells = Array.from(
    { length: Math.ceil((firstDay + daysInMonth) / 7) * 7 },
    (_, index) => {
      const day = index - firstDay + 1;
      return day > 0 && day <= daysInMonth
        ? new Date(cursor.getFullYear(), cursor.getMonth(), day)
        : null;
    },
  );
  const weekStart = new Date(cursor);
  weekStart.setDate(cursor.getDate() - ((cursor.getDay() + 6) % 7));
  const weekDays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);
    return date;
  });
  const semesterMonths = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(
      cursor.getFullYear(),
      cursor.getMonth() - (cursor.getMonth() % 6) + index,
      1,
    );
    return date;
  });
  const periodLabel =
    view === "Minggu"
      ? `${weekDays[0].getDate()} ${monthNames[weekDays[0].getMonth()].slice(0, 3)} – ${weekDays[6].getDate()} ${monthNames[weekDays[6].getMonth()].slice(0, 3)} ${weekDays[6].getFullYear()}`
      : view === "Semester"
        ? `${cursor.getMonth() < 6 ? "Semester 1" : "Semester 2"} · ${cursor.getFullYear()}`
        : `${monthNames[cursor.getMonth()]} ${cursor.getFullYear()}`;
  const movePeriod = (direction: number) => {
    const next = new Date(cursor);
    if (view === "Minggu") next.setDate(next.getDate() + direction * 7);
    if (view === "Bulan") next.setMonth(next.getMonth() + direction);
    if (view === "Semester") next.setMonth(next.getMonth() + direction * 6);
    setCursor(next);
    setSelected(next);
  };
  const demandLevel = (date: Date) =>
    date.getDate() % 5 === 0 ? "high" : date.getDate() % 3 === 0 ? "mid" : "normal";
  const isSelected = (date: Date) => date.toDateString() === selected.toDateString();
  return (
    <div className="page">
      <PageHead
        title="Kalender Permintaan"
        desc="Pola permintaan berdasarkan histori transaksi POS, bukan prediksi AI."
        action="Ekspor kalender"
        actionIcon="download"
      />
      <div className="toolbar">
        <div className="segmented">
          {["Minggu", "Bulan", "Semester"].map((x) => (
            <button key={x} className={view === x ? "active" : ""} onClick={() => setView(x)}>
              {x}
            </button>
          ))}
        </div>
        <div className="toolbar-right">
          <button
            className="today-button"
            onClick={() => {
              const today = new Date(2025, 5, 19);
              setCursor(today);
              setSelected(today);
            }}
          >
            Hari ini
          </button>
          <button className="icon-btn" onClick={() => movePeriod(-1)}>
            ‹
          </button>
          <strong className="period-label">{periodLabel}</strong>
          <button className="icon-btn" onClick={() => movePeriod(1)}>
            ›
          </button>
        </div>
      </div>
      <div className="calendar-layout">
        <section className="panel calendar-panel">
          {view !== "Semester" && (
            <div className="week">
              {shortDays.map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>
          )}
          {view === "Bulan" && (
            <div className="month">
              {monthCells.map((date, index) => (
                <button
                  key={index}
                  className={`${date && isSelected(date) ? "selected" : ""} ${date && date.getDay() % 6 === 0 ? "weekend" : ""}`}
                  disabled={!date}
                  onClick={() => date && setSelected(date)}
                >
                  {date && (
                    <>
                      <b>{date.getDate()}</b>
                      {[6, 19, 27].includes(date.getDate()) && (
                        <span className="calendar-event">
                          {date.getDate() === 19 ? "Workshop" : "Kampus"}
                        </span>
                      )}
                      <i className={`heat ${demandLevel(date)}`} />
                      <small>
                        {demandLevel(date) === "high"
                          ? "Ramai"
                          : demandLevel(date) === "mid"
                            ? "Sedang"
                            : "Sepi"}
                      </small>
                    </>
                  )}
                </button>
              ))}
            </div>
          )}
          {view === "Minggu" && (
            <div className="week-view">
              {weekDays.map((date) => (
                <button
                  key={date.toISOString()}
                  className={isSelected(date) ? "selected" : ""}
                  onClick={() => setSelected(date)}
                >
                  <header>
                    <span>{shortDays[(date.getDay() + 6) % 7]}</span>
                    <b>{date.getDate()}</b>
                  </header>
                  <div className={`week-demand ${demandLevel(date)}`}>
                    <strong>
                      {demandLevel(date) === "high"
                        ? "Ramai"
                        : demandLevel(date) === "mid"
                          ? "Sedang"
                          : "Sepi"}
                    </strong>
                    <span>{112 + (date.getDate() % 5) * 18} transaksi</span>
                  </div>
                  {date.getDate() % 3 === 1 && (
                    <div className="week-event">
                      <i />
                      Agenda kampus
                    </div>
                  )}
                  {date.getDate() % 5 === 4 && (
                    <div className="week-event limitless">
                      <i />
                      Event Limitless
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
          {view === "Semester" && (
            <div className="semester-view">
              {semesterMonths.map((month, index) => (
                <button
                  key={month.toISOString()}
                  onClick={() => {
                    setCursor(month);
                    setSelected(month);
                    setView("Bulan");
                  }}
                >
                  <header>
                    <div>
                      <span>{monthNames[month.getMonth()]}</span>
                      <small>{month.getFullYear()}</small>
                    </div>
                    <Badge tone={index === 4 ? "pink" : index % 2 ? "yellow" : "gray"}>
                      {index === 4 ? "Puncak" : index % 2 ? "Sedang" : "Normal"}
                    </Badge>
                  </header>
                  <div className="semester-bars">
                    {[42, 58, 51, 74].map((value, i) => (
                      <i key={i} style={{ height: `${value + index * 3}%` }} />
                    ))}
                  </div>
                  <div className="semester-meta">
                    <span>{index + 2} agenda akademik</span>
                    <span>{(index % 3) + 1} event</span>
                  </div>
                </button>
              ))}
            </div>
          )}
          <div className="calendar-key">
            <span>
              <i className="heat" />
              Normal
            </span>
            <span>
              <i className="heat mid" />
              Sedang
            </span>
            <span>
              <i className="heat high" />
              Ramai
            </span>
            <span>
              <i className="event-key" />
              Event / akademik
            </span>
          </div>
        </section>
        <aside className="panel day-detail">
          <span className="eyebrow">{shortDays[(selected.getDay() + 6) % 7].toUpperCase()}</span>
          <h2>
            {selected.getDate()} {monthNames[selected.getMonth()]}
          </h2>
          <Badge
            tone={
              demandLevel(selected) === "high"
                ? "pink"
                : demandLevel(selected) === "mid"
                  ? "yellow"
                  : "gray"
            }
          >
            {demandLevel(selected) === "high"
              ? "Permintaan tinggi"
              : demandLevel(selected) === "mid"
                ? "Permintaan sedang"
                : "Permintaan rendah"}
          </Badge>
          <div className="detail-stat">
            <span>Rata-rata transaksi</span>
            <strong>
              {demandLevel(selected) === "high"
                ? "184"
                : demandLevel(selected) === "mid"
                  ? "148"
                  : "112"}
            </strong>
            <small>berdasarkan 12 minggu terakhir</small>
          </div>
          <h3>Agenda & konteks</h3>
          <div className="agenda-item">
            <i />
            <div>
              <strong>Workshop RuangKita</strong>
              <small>14.00–17.00 · 30 peserta</small>
            </div>
          </div>
          <div className="agenda-item academic">
            <i />
            <div>
              <strong>Minggu ujian kampus</strong>
              <small>UNPAD & ITB · histori kunjungan +18%</small>
            </div>
          </div>
          <h3>Pola historis per jam</h3>
          {[
            ["08–11", "38%"],
            ["11–15", "78%"],
            ["15–18", "62%"],
            ["18–22", "88%"],
          ].map((x) => (
            <div className="hour" key={x[0]}>
              <span>{x[0]}</span>
              <div>
                <i style={{ width: x[1] }} />
              </div>
              <b>{x[1]}</b>
            </div>
          ))}
          <div className="note">
            Sumber: transaksi POS tersinkronisasi. Data terakhir diperbarui 18 Juni, 23.48.
          </div>
          <div className="ops-recommendation">
            <span className="eyebrow">REKOMENDASI OPERASIONAL</span>
            <p>
              Siapkan <b>+1 staf</b> pukul 14.00–18.00 dan stok susu <b>+16%</b> dari hari biasa.
            </p>
            <small>Rekomendasi berbasis perbandingan historis, bukan prediksi AI.</small>
          </div>
        </aside>
      </div>
    </div>
  );
}

function CustomerTable({ go, segment }: { go: (p: Page) => void; segment: string }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("Terbaru");
  const [advanced, setAdvanced] = useState(false);
  const [tier, setTier] = useState("Semua segmen");
  const filtered = [...customers]
    .filter((c) => c.name.toLowerCase().includes(query.toLowerCase()) || c.phone.includes(query))
    .filter(
      (c) =>
        segment === "Semua pelanggan" ||
        (segment === "Mahasiswa" && c.tier === "Student") ||
        (segment === "QR struk" && c.source === "QR struk") ||
        (segment === "Komunitas" && c.community) ||
        (segment === "Member aktif" && c.active),
    )
    .filter((c) => tier === "Semua segmen" || c.tier === tier)
    .sort((a, b) =>
      sort === "Kunjungan tertinggi"
        ? b.visits - a.visits
        : sort === "Total belanja"
          ? b.spendValue - a.spendValue
          : 0,
    );
  return (
    <>
      <div className="table-tools">
        <div className="searchbox">
          <Icon name="search" />
          <input
            placeholder="Cari nama atau nomor WhatsApp..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button
          variant={advanced ? "soft" : "outline"}
          icon="filter"
          onClick={() => setAdvanced(!advanced)}
        >
          Filter
        </Button>
        <select className="select" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option>Terbaru</option>
          <option>Kunjungan tertinggi</option>
          <option>Total belanja</option>
        </select>
      </div>
      {advanced && (
        <div className="advanced-filters">
          <div>
            <label>Segmen</label>
            <select
              className="select"
              value={tier}
              onChange={(event) => setTier(event.target.value)}
            >
              <option>Semua segmen</option>
              <option>Gold</option>
              <option>Silver</option>
              <option>Student</option>
              <option>Member</option>
            </select>
          </div>
          <div>
            <label>Kampus</label>
            <select className="select">
              <option>Semua kampus</option>
              <option>Universitas Padjadjaran</option>
              <option>Institut Teknologi Bandung</option>
            </select>
          </div>
          <div>
            <label>Sumber</label>
            <select className="select">
              <option>Semua sumber</option>
              <option>QR struk</option>
              <option>Event</option>
              <option>Referensi</option>
            </select>
          </div>
          <button
            onClick={() => {
              setTier("Semua segmen");
              setQuery("");
            }}
          >
            Reset filter
          </button>
        </div>
      )}
      <div className="active-filter-summary">
        <span>
          <b>{filtered.length}</b> pelanggan ditampilkan
        </span>
        <Badge tone="purple">{segment}</Badge>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Pelanggan</th>
              <th>Segmen</th>
              <th>Kunjungan</th>
              <th>Total belanja</th>
              <th>Terakhir datang</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.name} onClick={() => go("profile")}>
                <td>
                  <div className="person">
                    <span style={{ background: c.color }}>{c.initials}</span>
                    <div>
                      <strong>{c.name}</strong>
                      <small>{c.phone}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <Badge
                    tone={c.tier === "Gold" ? "yellow" : c.tier === "Student" ? "purple" : "gray"}
                  >
                    {c.tier}
                  </Badge>
                </td>
                <td>{c.visits}×</td>
                <td>
                  <strong>{c.spend}</strong>
                </td>
                <td>{c.last}</td>
                <td>
                  <button className="icon-btn">
                    <Icon name="chevron" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!filtered.length && (
          <Empty title="Pelanggan tidak ditemukan" text="Coba kata kunci atau filter lain." />
        )}
      </div>
      <div className="pagination">
        <span>
          Menampilkan {filtered.length} dari {customers.length} pelanggan contoh
        </span>
        <div>
          <button disabled>‹</button>
          <button className="active">1</button>
          <button>2</button>
          <button>3</button>
          <button>›</button>
        </div>
      </div>
    </>
  );
}

function Customers({ go }: { go: (p: Page) => void }) {
  const [segment, setSegment] = useState("Semua pelanggan");
  return (
    <div className="page">
      <PageHead
        title="Customer 360"
        desc="Lihat hubungan pelanggan secara utuh, dari transaksi hingga interaksi."
        action="Tambah pelanggan"
        onAction={() => go("lookup")}
      />
      <div className="filter-chips">
        {["Semua pelanggan", "Mahasiswa", "QR struk", "Komunitas", "Member aktif"].map((item) => (
          <button
            key={item}
            className={segment === item ? "active" : ""}
            onClick={() => setSegment(item)}
          >
            {item}
          </button>
        ))}
        <Button variant="outline" icon="download">
          Ekspor
        </Button>
        <Button variant="soft" icon="message">
          Kirim kampanye
        </Button>
      </div>
      <section className="panel flush">
        <div className="summary-strip">
          <div>
            <strong>12.482</strong>
            <span>Total pelanggan</span>
          </div>
          <div>
            <strong>8.204</strong>
            <span>Aktif 90 hari</span>
          </div>
          <div>
            <strong>64,8%</strong>
            <span>Kunjungan ulang</span>
          </div>
          <div>
            <strong>2.941</strong>
            <span>Setuju promosi</span>
          </div>
        </div>
        <CustomerTable go={go} segment={segment} />
      </section>
    </div>
  );
}

function Lookup({ go }: { go: (p: Page) => void }) {
  const [searched, setSearched] = useState(false);
  const [student, setStudent] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const runSearch = () => {
    setLoading(true);
    setSearched(false);
    window.setTimeout(() => {
      setLoading(false);
      setSearched(true);
    }, 450);
  };
  return (
    <div className="page">
      <PageHead
        eyebrow="MODE CEPAT · KASIR & BARISTA"
        title="Cari Pelanggan"
        desc="Temukan member dalam beberapa detik tanpa meninggalkan alur pelayanan."
      />
      <div className="lookup-layout">
        <section className="panel lookup-card">
          <div className="tabs lookup-tabs">
            <button className={!student ? "active" : ""} onClick={() => setStudent(false)}>
              <Icon name="search" />
              Cari pelanggan
            </button>
            <button className={student ? "active" : ""} onClick={() => setStudent(true)}>
              <Icon name="school" />
              Verifikasi mahasiswa
            </button>
          </div>
          {!student ? (
            <div className="lookup-search-flow">
              <div className="lookup-prompt">
                <span className="eyebrow">PENCARIAN CEPAT</span>
                <h2>Siapa yang sedang dilayani?</h2>
                <p>
                  Gunakan nama atau nomor WhatsApp. Nomor akan tetap tersamarkan setelah ditemukan.
                </p>
              </div>
              <div className="lookup-searchbox">
                <Icon name="search" size={22} />
                <input
                  autoFocus
                  placeholder="Ketik nama atau nomor WhatsApp..."
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setSearched(false);
                  }}
                  onKeyDown={(event) => event.key === "Enter" && query && runSearch()}
                />
                {query && (
                  <button
                    onClick={() => {
                      setQuery("");
                      setSearched(false);
                    }}
                  >
                    <Icon name="close" size={16} />
                  </button>
                )}
                <Button onClick={runSearch} disabled={!query || loading}>
                  {loading ? "Mencari..." : "Cari"}
                </Button>
              </div>
              {loading && (
                <div className="lookup-skeleton">
                  <i />
                  <div>
                    <i />
                    <i />
                  </div>
                </div>
              )}
              {searched && (
                <div className="lookup-results">
                  <div className="result-count">
                    <span>1 pelanggan ditemukan</span>
                    <Badge tone="green">Data cocok</Badge>
                  </div>
                  <button className="customer-result" onClick={() => go("profile")}>
                    <span className="avatar big">NP</span>
                    <div className="customer-result-main">
                      <strong>Nadia Putri</strong>
                      <span>0812••••9087 · Gold member</span>
                      <div>
                        <Badge tone="green">Aktif</Badge>
                        <small>Terakhir datang hari ini, 10.42</small>
                      </div>
                    </div>
                    <div className="customer-result-stats">
                      <div>
                        <span>Kunjungan</span>
                        <strong>28×</strong>
                      </div>
                      <div>
                        <span>Total belanja</span>
                        <strong>Rp4,86jt</strong>
                      </div>
                    </div>
                    <Icon name="chevron" />
                  </button>
                  <div className="lookup-actions">
                    <Button variant="outline" onClick={() => setStudent(true)} icon="school">
                      Verifikasi KTM
                    </Button>
                    <Button onClick={() => go("profile")} icon="arrow">
                      Buka profil lengkap
                    </Button>
                  </div>
                </div>
              )}
              {!query && !searched && (
                <div className="recent-lookups">
                  <span>PENCARIAN TERAKHIR</span>
                  {customers.slice(0, 3).map((customer) => (
                    <button
                      key={customer.name}
                      onClick={() => {
                        setQuery(customer.name);
                        setSearched(true);
                      }}
                    >
                      <span className="avatar" style={{ background: customer.color }}>
                        {customer.initials}
                      </span>
                      <div>
                        <strong>{customer.name}</strong>
                        <small>{customer.phone.replace(/(\d{4}) \d{4}/, "$1 ••••")}</small>
                      </div>
                      <Icon name="chevron" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <StudentVerify />
          )}
        </section>
        <aside className="lookup-side">
          <MascotNote pose="curious">Cari siapa hari ini? Aku bantu, deh!</MascotNote>
          <div className="lookup-guide">
            <span className="eyebrow">ALUR AMAN</span>
            {[
              ["1", "Cari identitas", "Nama atau WhatsApp"],
              ["2", "Konfirmasi pelanggan", "Cocokkan nama secara verbal"],
              ["3", "Lanjutkan pelayanan", "Transaksi tetap dicatat di POS"],
            ].map((item) => (
              <div key={item[0]}>
                <span>{item[0]}</span>
                <div>
                  <strong>{item[1]}</strong>
                  <small>{item[2]}</small>
                </div>
              </div>
            ))}
          </div>
          <div className="privacy-note">
            <Icon name="heart" />
            <div>
              <strong>Privasi pelanggan tetap utama</strong>
              <p>Pencarian dicatat sesuai peran dan UU No. 27 Tahun 2022.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function StudentVerify() {
  const [step, setStep] = useState(1);
  return (
    <div>
      <div className="steps">
        {[1, 2, 3].map((x) => (
          <div key={x} className={step >= x ? "done" : ""}>
            <span>{step > x ? <Icon name="check" size={14} /> : x}</span>
            <small>{["Nomor struk", "Cek kartu fisik", "Konfirmasi"][x - 1]}</small>
          </div>
        ))}
      </div>
      {step === 1 && (
        <div className="form-grid">
          <div>
            <label>Nomor struk sekali pakai</label>
            <input className="input" placeholder="LMT-2025-001928" />
          </div>
          <div>
            <label>Nomor WhatsApp</label>
            <input className="input" placeholder="08xx xxxx xxxx" />
          </div>
          <div className="full info">
            Nomor struk divalidasi melalui POS dan hanya dapat digunakan satu kali.
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="verify-box">
          <Icon name="school" size={30} />
          <h3>Periksa kartu mahasiswa fisik</h3>
          <p>Pastikan nama dan masa berlaku terlihat jelas. Foto kartu tidak disimpan.</p>
          <label className="checkbox">
            <input type="checkbox" /> Saya sudah memeriksa kartu fisik asli
          </label>
        </div>
      )}
      {step === 3 && (
        <div className="success-box">
          <span>
            <Icon name="check" />
          </span>
          <h3>Siap mengaktifkan diskon 15%</h3>
          <p>Status berlaku hingga masa verifikasi berakhir dan tercatat atas nama staf.</p>
        </div>
      )}
      <div className="wizard-actions">
        {step > 1 && (
          <Button variant="ghost" onClick={() => setStep(step - 1)}>
            Kembali
          </Button>
        )}
        <Button
          onClick={() =>
            step === 3
              ? notify(
                  "Status mahasiswa aktif",
                  "Diskon 15% sudah aktif dan verifikasi staf tercatat.",
                )
              : setStep(Math.min(3, step + 1))
          }
        >
          {step === 3 ? "Aktifkan status" : "Lanjutkan"}
        </Button>
      </div>
    </div>
  );
}

function Profile() {
  const [tab, setTab] = useState("Ringkasan");
  return (
    <div className="page">
      <div className="profile-hero">
        <div className="profile-main">
          <span className="avatar big">NP</span>
          <div>
            <div className="profile-title">
              <h1>Nadia Putri</h1>
              <Badge tone="yellow">Gold</Badge>
              <Badge tone="green">Aktif</Badge>
            </div>
            <p>0812 4521 9087 · Member sejak 12 Agustus 2023</p>
            <div className="profile-chips">
              <span>
                <Icon name="message" size={14} /> Promo: setuju
              </span>
              <span>
                <Icon name="school" size={14} /> Alumni
              </span>
              <span>
                <Icon name="plug" size={14} /> POS terhubung
              </span>
            </div>
          </div>
        </div>
        <div>
          <Button variant="outline" icon="more">
            Aksi
          </Button>
          <Button icon="message">Kirim pesan</Button>
        </div>
      </div>
      <div className="tabs line">
        {["Ringkasan", "Transaksi", "Reward & voucher", "Persetujuan & privasi", "Aktivitas"].map(
          (x) => (
            <button className={tab === x ? "active" : ""} onClick={() => setTab(x)}>
              {x}
            </button>
          ),
        )}
      </div>
      {tab === "Ringkasan" ? (
        <div className="profile-grid">
          <section>
            <div className="metrics compact">
              <div className="metric">
                <span>Total belanja</span>
                <strong>Rp4.860.000</strong>
                <small>28 transaksi</small>
              </div>
              <div className="metric">
                <span>Rata-rata transaksi</span>
                <strong>Rp173.571</strong>
                <small>+12% dari pelanggan lain</small>
              </div>
              <div className="metric">
                <span>Kunjungan terakhir</span>
                <strong>Hari ini</strong>
                <small>Sudirman · 10.42</small>
              </div>
            </div>
            <div className="panel">
              <div className="panel-head">
                <div>
                  <h2>Riwayat kunjungan</h2>
                  <p>Dari data POS tersinkronisasi</p>
                </div>
              </div>
              <div className="timeline">
                {[
                  ["Hari ini · 10.42", "Sudirman", "Rp168.000"],
                  ["12 Juni · 16.18", "Dago", "Rp94.000"],
                  ["02 Juni · 11.27", "Sudirman", "Rp236.000"],
                ].map((x) => (
                  <div key={x[0]}>
                    <i />
                    <div>
                      <strong>{x[0]}</strong>
                      <small>{x[1]} · 3 item</small>
                    </div>
                    <b>{x[2]}</b>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <aside>
            <div className="panel">
              <h2>Preferensi</h2>
              <dl>
                <div>
                  <dt>Menu favorit</dt>
                  <dd>Sea Salt Latte</dd>
                </div>
                <div>
                  <dt>Outlet utama</dt>
                  <dd>Sudirman</dd>
                </div>
                <div>
                  <dt>Waktu favorit</dt>
                  <dd>10.00–12.00</dd>
                </div>
                <div>
                  <dt>Alergi/catatan</dt>
                  <dd>Oat milk</dd>
                </div>
              </dl>
            </div>
            <div className="panel consent">
              <div>
                <Icon name="heart" />
              </div>
              <h3>Persetujuan tercatat</h3>
              <p>
                Data layanan: 12 Agu 2023
                <br />
                Promo: 14 Jan 2025
              </p>
              <button>Lihat log persetujuan →</button>
            </div>
            <div className="panel staff-note">
              <div className="panel-head">
                <h2>Catatan staf</h2>
                <button className="icon-btn">
                  <Icon name="plus" />
                </button>
              </div>
              <p>Prefer area dekat jendela. Biasanya datang untuk bekerja pada pagi hari.</p>
              <small>Dina · 12 Juni 2025</small>
            </div>
            <div className="panel complaint-mini">
              <div>
                <Badge tone="green">Selesai</Badge>
                <small>02 Mei 2025</small>
              </div>
              <h3>Minuman kurang hangat</h3>
              <p>Ditangani dengan penggantian menu. Pelanggan sudah kembali 4×.</p>
            </div>
          </aside>
        </div>
      ) : (
        <section className="panel">
          <Empty
            title={`Detail ${tab}`}
            text="Gunakan filter periode untuk menelusuri riwayat lengkap pelanggan."
          />
        </section>
      )}
    </div>
  );
}

function Campus() {
  const [tab, setTab] = useState("Analitik");
  const [verifyOpen, setVerifyOpen] = useState(false);
  return (
    <div className="page">
      <PageHead
        title="Program Kampus"
        desc="Kelola verifikasi diskon mahasiswa 15% tanpa menyimpan foto kartu."
        action="Verifikasi mahasiswa"
        onAction={() => setVerifyOpen(true)}
      />
      <div className="metrics compact campus-metrics">
        {[
          ["Menunggu verifikasi", "8", "Perlu pemeriksaan staf"],
          ["Mahasiswa aktif", "1.284", "Status verifikasi berlaku"],
          ["Transaksi mahasiswa", "3.842", "30 hari terakhir"],
          ["Biaya diskon 15%", "Rp18,6jt", "Dari Rp124jt nilai transaksi"],
        ].map((x, i) => (
          <div className="metric" key={x[0]}>
            <div className={`metric-icon c${i}`}>
              <Icon name={i === 0 ? "clock" : i === 1 ? "school" : "calendar"} />
            </div>
            <span>{x[0]}</span>
            <strong>{x[1]}</strong>
            <small>{x[2]}</small>
          </div>
        ))}
      </div>
      <section className="panel flush">
        <div className="tabs line">
          {["Analitik", "Verifikasi", "Mahasiswa aktif", "Riwayat"].map((x) => (
            <button key={x} className={tab === x ? "active" : ""} onClick={() => setTab(x)}>
              {x}
            </button>
          ))}
        </div>
        {tab === "Analitik" ? (
          <div className="campus-analytics">
            <div>
              <div className="panel-head">
                <div>
                  <h2>Performa per kampus</h2>
                  <p>Member aktif dan nilai transaksi 30 hari</p>
                </div>
                <Badge tone="purple">Semester genap</Badge>
              </div>
              {[
                ["Universitas Padjadjaran", "482 member", "Rp48,2jt", "88%"],
                ["Institut Teknologi Bandung", "356 member", "Rp38,6jt", "71%"],
                ["Universitas Pendidikan Indonesia", "274 member", "Rp24,9jt", "55%"],
                ["Universitas Katolik Parahyangan", "172 member", "Rp12,3jt", "36%"],
              ].map((row) => (
                <div className="campus-bar" key={row[0]}>
                  <div>
                    <strong>{row[0]}</strong>
                    <small>{row[1]}</small>
                  </div>
                  <div>
                    <i style={{ width: row[3] }} />
                  </div>
                  <b>{row[2]}</b>
                </div>
              ))}
            </div>
            <aside>
              <span className="eyebrow">INSIGHT KAMPUS</span>
              <h3>Masa ujian mendorong kunjungan sore.</h3>
              <p>Kunjungan mahasiswa naik 18% pada pukul 15.00–19.00 dibanding minggu non-ujian.</p>
              <div className="academic-trend">
                {[32, 44, 40, 58, 74, 69, 84, 62].map((v, i) => (
                  <i key={i} style={{ height: `${v}%` }} />
                ))}
              </div>
              <small>Perbandingan historis 2 semester terakhir</small>
            </aside>
          </div>
        ) : tab === "Verifikasi" ? (
          <div className="queue">
            {[
              ["Alya Syafira", "Universitas Padjadjaran", "Hari ini, 10.24"],
              ["Bagas Priyanto", "Institut Teknologi Bandung", "Hari ini, 09.48"],
              ["Keisha Aulia", "Universitas Pendidikan Indonesia", "Kemarin, 18.12"],
            ].map((x) => (
              <div key={x[0]}>
                <span className="avatar">
                  {x[0]
                    .split(" ")
                    .map((a) => a[0])
                    .join("")}
                </span>
                <div>
                  <strong>{x[0]}</strong>
                  <small>
                    {x[1]} · {x[2]}
                  </small>
                </div>
                <Badge tone="yellow">Menunggu</Badge>
                <Button variant="outline" onClick={() => setVerifyOpen(true)}>
                  Periksa kartu
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <Empty title={tab} text="Data program kampus tersedia sesuai akses outlet Anda." />
        )}
      </section>
      {verifyOpen && (
        <Modal title="Verifikasi mahasiswa" close={() => setVerifyOpen(false)}>
          <div className="verify-person">
            <span className="avatar">AS</span>
            <div>
              <strong>Alya Syafira</strong>
              <small>Universitas Padjadjaran · 0813••••2301</small>
            </div>
          </div>
          <StudentVerify />
        </Modal>
      )}
    </div>
  );
}

function Pos() {
  const [syncing, setSyncing] = useState(false);
  const [tab, setTab] = useState("Riwayat sinkronisasi");
  const [uploaded, setUploaded] = useState(false);
  const sync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 1200);
  };
  return (
    <div className="page">
      <PageHead
        title="Integrasi POS"
        desc="CRM hanya membaca transaksi melalui API atau impor CSV/Excel."
        action={syncing ? "Menyinkronkan..." : "Sinkronkan sekarang"}
        actionIcon="plug"
        onAction={sync}
      />
      <div className="sync-banner">
        <span className={syncing ? "pulse" : ""}>
          <Icon name="check" />
        </span>
        <div>
          <strong>
            {syncing ? "Sinkronisasi sedang berjalan" : "Semua sistem beroperasi normal"}
          </strong>
          <p>Sinkronisasi terakhir hari ini, 10.55 · 1.248 transaksi diproses</p>
        </div>
        <Badge tone="green">API terhubung</Badge>
      </div>
      <div className="cards3">
        {[
          ["Sudirman", "Moka POS", "2 menit lalu"],
          ["Dago", "Moka POS", "4 menit lalu"],
          ["Dipatiukur", "Impor CSV", "Kemarin, 23.48"],
        ].map((x, i) => (
          <section className="panel integration" key={x[0]}>
            <div className="integration-top">
              <span>
                <Icon name="plug" />
              </span>
              <button className="icon-btn">
                <Icon name="more" />
              </button>
            </div>
            <h2>{x[0]}</h2>
            <p>{x[1]}</p>
            <div>
              <span>Status</span>
              <Badge tone="green">Terhubung</Badge>
            </div>
            <div>
              <span>Sinkron terakhir</span>
              <strong>{x[2]}</strong>
            </div>
            <div>
              <span>Transaksi 30 hari</span>
              <strong>{[3842, 2956, 2188][i].toLocaleString("id-ID")}</strong>
            </div>
          </section>
        ))}
      </div>
      <section className="panel pos-workspace">
        <div className="panel-head">
          <div>
            <h2>Data POS ke Limitless Hub</h2>
            <p>Monitor kualitas data, voucher terdeteksi, dan pemetaan kolom</p>
          </div>
          <Button variant="outline" icon="download" onClick={() => setUploaded(true)}>
            Upload CSV / Excel
          </Button>
        </div>
        <div className="pos-quality">
          <div>
            <strong>78,6%</strong>
            <span>Transaksi tertaut</span>
          </div>
          <div>
            <strong>1.284</strong>
            <span>Voucher terdeteksi</span>
          </div>
          <div>
            <strong>14</strong>
            <span>Baris perlu ditinjau</span>
          </div>
          <div>
            <strong>Setiap 15 menit</strong>
            <span>Sinkronisasi otomatis</span>
          </div>
        </div>
        <div className="tabs line">
          {["Riwayat sinkronisasi", "Baris gagal", "Pemetaan kolom"].map((item) => (
            <button
              key={item}
              className={tab === item ? "active" : ""}
              onClick={() => setTab(item)}
            >
              {item}
            </button>
          ))}
        </div>
        {tab === "Riwayat sinkronisasi" ? (
          <div className="simple-list">
            {[
              ["Hari ini, 10.55", "API · Sinkron terjadwal", "1.248 transaksi", "Berhasil"],
              ["Hari ini, 09.55", "API · Sudirman & Dago", "284 transaksi", "Berhasil"],
              ["Kemarin, 23.48", "CSV · Dipatiukur", "468 transaksi", "Berhasil"],
            ].map((x) => (
              <div key={x[0] + x[1]}>
                <span className="status-dot" />
                <strong>{x[0]}</strong>
                <span>{x[1]}</span>
                <span>{x[2]}</span>
                <Badge tone="green">{x[3]}</Badge>
              </div>
            ))}
          </div>
        ) : tab === "Baris gagal" ? (
          <div className="failed-rows">
            <div>
              <code>ROW 184</code>
              <span>Nomor struk duplikat</span>
              <b>LMT-2025-001928</b>
              <Button variant="ghost">Tinjau</Button>
            </div>
            <div>
              <code>ROW 296</code>
              <span>Nomor WhatsApp tidak valid</span>
              <b>+62 812•••</b>
              <Button variant="ghost">Tinjau</Button>
            </div>
          </div>
        ) : (
          <div className="mapping-grid">
            {[
              ["receipt_no", "Nomor struk"],
              ["transaction_date", "Waktu transaksi"],
              ["customer_phone", "Nomor WhatsApp"],
              ["voucher_code", "Kode voucher CRM"],
              ["grand_total", "Nilai transaksi"],
              ["outlet_id", "Unit & outlet"],
            ].map((map) => (
              <div key={map[0]}>
                <code>{map[0]}</code>
                <Icon name="arrow" />
                <select className="select">
                  <option>{map[1]}</option>
                </select>
              </div>
            ))}
          </div>
        )}
      </section>
      {uploaded && <Toast />}
    </div>
  );
}

function Campaigns({ go }: { go: (p: Page) => void }) {
  const [tab, setTab] = useState("Semua");
  return (
    <div className="page">
      <PageHead
        title="Kampanye WhatsApp"
        desc="Pesan relevan, terukur, dan maksimal 2 promosi per pelanggan per bulan."
        action="Buat kampanye"
        onAction={() => go("builder")}
      />
      <div className="stats-row campaign-stats">
        <div>
          <span>Pesan terkirim</span>
          <strong>18.420</strong>
          <small>30 hari terakhir</small>
        </div>
        <div>
          <span>Voucher dipakai</span>
          <strong>1.284</strong>
          <small className="up">+12,8%</small>
        </div>
        <div>
          <span>Nilai transaksi</span>
          <strong>Rp186,4jt</strong>
          <small className="up">+18,2%</small>
        </div>
        <div>
          <span>Hasil per biaya</span>
          <strong>4,8×</strong>
          <small>Setelah biaya diskon</small>
        </div>
      </div>
      <div className="campaign-performance-strip">
        <div>
          <span>Performa 8 minggu</span>
          <strong>Promo bagus, hasilnya juga harus kelihatan!</strong>
        </div>
        {[42, 51, 48, 68, 59, 74, 81, 88].map((v, i) => (
          <i key={i} style={{ height: `${v}%` }} />
        ))}
      </div>
      <section className="panel flush">
        <div className="tabs line">
          {["Semua", "Draf", "Terjadwal", "Terkirim"].map((x) => (
            <button key={x} className={tab === x ? "active" : ""} onClick={() => setTab(x)}>
              {x}
            </button>
          ))}
          <div className="tab-tools">
            <Button variant="outline" icon="filter">
              Filter
            </Button>
          </div>
        </div>
        <div className="campaign-list">
          {[
            ["Summer Sip — Batch A", "Terkirim", "18 Jun 2025", "1.842", "82%", "10,1%"],
            ["Rindu Kopi?", "Terjadwal", "22 Jun 2025", "2.410", "—", "—"],
            ["Voucher Ulang Tahun Juli", "Draf", "Terakhir diedit 2 jam lalu", "386", "—", "—"],
            ["Student Week Dago", "Terkirim", "10 Jun 2025", "928", "78%", "14,8%"],
          ]
            .filter((x) => tab === "Semua" || x[1] === tab)
            .map((x, i) => (
              <button
                key={x[0]}
                className="campaign-row"
                onClick={() => go(x[1] === "Terkirim" ? "performance" : "builder")}
              >
                <span className={`campaign-art a${i}`}>
                  <Icon name="message" />
                </span>
                <div className="campaign-name">
                  <strong>{x[0]}</strong>
                  <small>{x[2]}</small>
                </div>
                <Badge
                  tone={x[1] === "Terkirim" ? "green" : x[1] === "Terjadwal" ? "purple" : "gray"}
                >
                  {x[1]}
                </Badge>
                <div>
                  <small>Penerima</small>
                  <strong>{x[3]}</strong>
                </div>
                <div>
                  <small>Dibaca</small>
                  <strong>{x[4]}</strong>
                </div>
                <div>
                  <small>Konversi</small>
                  <strong>{x[5]}</strong>
                </div>
                <Icon name="chevron" />
              </button>
            ))}
        </div>
      </section>
    </div>
  );
}

function Builder({ go }: { go: (p: Page) => void }) {
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState(
    "Hai {{nama}}, waktunya rehat sejenak. Nikmati Sea Salt Latte favoritmu dan dapatkan bonus 20 poin sampai Minggu ini.",
  );
  return (
    <div className="page">
      <PageHead
        title="Buat kampanye"
        desc="Susun pesan yang relevan dan hormati pilihan pelanggan."
      >
        <Button variant="outline">Simpan draf</Button>
      </PageHead>
      <div className="builder-steps">
        {["Tujuan", "Audiens", "Pesan", "Jadwal"].map((x, i) => (
          <button
            key={x}
            className={step === i + 1 ? "active" : step > i + 1 ? "done" : ""}
            onClick={() => setStep(i + 1)}
          >
            <span>{step > i + 1 ? <Icon name="check" size={14} /> : i + 1}</span>
            {x}
          </button>
        ))}
      </div>
      <div className="builder-layout">
        <section className="panel form-panel">
          {step === 1 && (
            <>
              <span className="eyebrow">LANGKAH 1 DARI 4</span>
              <h2>Apa tujuan kampanye ini?</h2>
              <p>Pilih tujuan utama agar pelaporan lebih mudah dibaca.</p>
              <div className="choice-grid">
                {[
                  ["Kunjungan ulang", "Ajak pelanggan kembali ke outlet", "heart"],
                  ["Promosi menu", "Kenalkan menu atau penawaran", "message"],
                  ["Reward & voucher", "Bagikan manfaat loyalitas", "gift"],
                  ["Informasi layanan", "Kabar operasional non-promosi", "bell"],
                ].map((x, i) => (
                  <button key={x[0]} className={i === 0 ? "selected" : ""}>
                    <span>
                      <Icon name={x[2] as IconName} />
                    </span>
                    <strong>{x[0]}</strong>
                    <small>{x[1]}</small>
                    <i />
                  </button>
                ))}
              </div>
              <label>Nama kampanye</label>
              <input className="input" defaultValue="Rindu Kopi?" />
            </>
          )}
          {step === 2 && (
            <>
              <span className="eyebrow">LANGKAH 2 DARI 4</span>
              <h2>Pilih audiens yang tepat</h2>
              <p>Hanya pelanggan dengan persetujuan promo aktif yang dapat dipilih.</p>
              <div className="filter-builder">
                <select className="select">
                  <option>Kunjungan terakhir</option>
                </select>
                <select className="select">
                  <option>Lebih dari 30 hari</option>
                </select>
                <Button variant="outline" icon="plus">
                  Tambah kondisi
                </Button>
              </div>
              <div className="audience-total">
                <strong>2.410</strong>
                <span>pelanggan memenuhi kriteria</span>
                <small>0 pelanggan melewati batas 2 pesan/bulan</small>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <span className="eyebrow">LANGKAH 3 DARI 4</span>
              <h2>Tulis pesan</h2>
              <p>Buat singkat, hangat, dan jelas.</p>
              <label>Isi pesan WhatsApp</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={500}
              />
              <div className="char-count">
                <button>{"{{nama}}"}</button>
                <span>{message.length}/500</span>
              </div>
              <div className="info">Tautan berhenti menerima promo akan ditambahkan otomatis.</div>
              <div className="form-grid">
                <div>
                  <label>Kode voucher</label>
                  <input className="input" defaultValue="SUMMERSIP20" />
                </div>
                <div>
                  <label>Masa berlaku</label>
                  <input className="input" type="date" defaultValue="2025-06-30" />
                </div>
              </div>
            </>
          )}
          {step === 4 && (
            <>
              <span className="eyebrow">LANGKAH 4 DARI 4</span>
              <h2>Tentukan jadwal</h2>
              <p>Pilih waktu kirim yang nyaman untuk pelanggan.</p>
              <div className="form-grid">
                <div>
                  <label>Tanggal kirim</label>
                  <input className="input" type="date" defaultValue="2025-06-22" />
                </div>
                <div>
                  <label>Waktu</label>
                  <input className="input" type="time" defaultValue="10:30" />
                </div>
                <div className="full">
                  <label className="radio">
                    <input type="radio" defaultChecked /> Kirim sesuai zona waktu outlet utama
                  </label>
                </div>
              </div>
              <div className="review-box">
                <strong>Siap dijadwalkan</strong>
                <span>2.410 penerima · Minggu, 22 Juni pukul 10.30</span>
              </div>
            </>
          )}
          <div className="wizard-actions">
            <Button
              variant="ghost"
              onClick={() => (step > 1 ? setStep(step - 1) : go("campaigns"))}
            >
              Kembali
            </Button>
            <Button
              onClick={() => {
                if (step < 4) setStep(step + 1);
                else {
                  notify(
                    "Kampanye berhasil dijadwalkan",
                    "Rindu Kopi? akan dikirim 22 Juni pukul 10.30.",
                  );
                  go("campaigns");
                }
              }}
            >
              {step === 4 ? "Jadwalkan kampanye" : "Lanjutkan"}
            </Button>
          </div>
        </section>
        <aside className="phone-preview">
          <span>Pratinjau</span>
          <div className="phone">
            <div className="phone-top">
              <i />
              <strong>Limitless Cafe</strong>
              <small>business account</small>
            </div>
            <div className="chat">
              <div>
                {message}
                <small>10.30 ✓✓</small>
              </div>
              <button>Berhenti menerima promo</button>
            </div>
          </div>
          <MascotNote pose="alert">Jangan sampai salah sasaran, ya!</MascotNote>
        </aside>
      </div>
    </div>
  );
}

function Performance() {
  return (
    <div className="page">
      <PageHead
        eyebrow="KAMPANYE TERKIRIM"
        title="Summer Sip — Batch A"
        desc="Dikirim 18 Juni 2025, 10.30 · Unit terpilih"
        action="Unduh laporan"
        actionIcon="download"
      />
      <div className="metrics compact">
        {[
          ["Terkirim", "1.842", "99,2%"],
          ["Dibaca", "1.510", "82,0%"],
          ["Klik voucher", "186", "10,1%"],
          ["Ditukar di POS", "94", "5,1%"],
        ].map((x, i) => (
          <div className="metric" key={x[0]}>
            <div className={`metric-icon c${i}`}>
              <Icon name={["message", "check", "gift", "receipt"][i] as IconName} />
            </div>
            <span>{x[0]}</span>
            <strong>{x[1]}</strong>
            <small>{x[2]} dari target</small>
          </div>
        ))}
      </div>
      <section className="panel campaign-funnel">
        <div>
          <span className="eyebrow">CORONG KAMPANYE</span>
          <div className="funnel-steps">
            {[
              ["Terkirim", "1.842", "100%"],
              ["Dibaca", "1.510", "82%"],
              ["Voucher digunakan", "94", "5,1%"],
              ["Pelanggan kembali", "72", "3,9%"],
            ].map((item, i) => (
              <div key={item[0]} style={{ width: `${100 - i * 13}%` }}>
                <span>{item[0]}</span>
                <strong>{item[1]}</strong>
                <b>{item[2]}</b>
              </div>
            ))}
          </div>
        </div>
        <aside>
          <span className="eyebrow">HASIL BISNIS</span>
          <div>
            <span>Nilai transaksi</span>
            <strong>Rp28,4jt</strong>
          </div>
          <div>
            <span>Biaya diskon</span>
            <strong>Rp5,9jt</strong>
          </div>
          <div className="roi-result">
            <span>Hasil per biaya</span>
            <strong>4,8×</strong>
          </div>
          <p>
            <b>Rumus:</b> nilai transaksi tertaut ÷ biaya diskon. Hanya transaksi dengan voucher
            kampanye yang digunakan di POS.
          </p>
        </aside>
      </section>
      <div className="dash-grid">
        <section className="panel span2">
          <div className="panel-head">
            <div>
              <h2>Aktivitas 48 jam</h2>
              <p>Interaksi setelah pesan terkirim</p>
            </div>
            <div className="legend">
              <i />
              Dibaca <i />
              Klik
            </div>
          </div>
          <div className="line-chart">
            <svg viewBox="0 0 700 240" preserveAspectRatio="none">
              <path
                d="M0 210 C80 205 100 120 180 110 S270 55 350 65 470 45 520 40 620 34 700 28"
                stroke="#8e82d3"
                strokeWidth="4"
                fill="none"
              />
              <path
                d="M0 220 C100 215 150 195 230 200 S350 165 430 175 560 145 700 135"
                stroke="#e6a2b6"
                strokeWidth="3"
                fill="none"
              />
            </svg>
            <div>
              <span>0 jam</span>
              <span>12 jam</span>
              <span>24 jam</span>
              <span>36 jam</span>
              <span>48 jam</span>
            </div>
          </div>
        </section>
        <section className="panel">
          <h2>Konversi per outlet</h2>
          {[
            ["Sudirman", "42", "7,2%"],
            ["Dago", "31", "5,0%"],
            ["Dipatiukur", "21", "3,8%"],
          ].map((x, i) => (
            <div className="conversion" key={x[0]}>
              <span className={`dot d${i}`} />
              <div>
                <strong>{x[0]}</strong>
                <small>{x[1]} penukaran</small>
              </div>
              <b>{x[2]}</b>
            </div>
          ))}
          <div className="note">Penukaran dilacak saat voucher digunakan di POS.</div>
        </section>
      </div>
    </div>
  );
}

function Rewards() {
  const [modal, setModal] = useState(false);
  return (
    <div className="page">
      <PageHead
        title="Reward & Voucher"
        desc="Kelola manfaat loyalitas dan pantau penukaran yang tersinkronisasi POS."
        action="Buat voucher"
        onAction={() => setModal(true)}
      />
      <div className="metrics compact">
        {[
          ["Voucher aktif", "14", "4 berakhir bulan ini"],
          ["Diterbitkan", "8.420", "Bulan ini"],
          ["Ditukar", "1.284", "15,2% redemption"],
          ["Poin beredar", "2,8jt", "Di 8.204 member"],
        ].map((x, i) => (
          <div className="metric" key={x[0]}>
            <span>{x[0]}</span>
            <strong>{x[1]}</strong>
            <small>{x[2]}</small>
            <Sparkline color={["#9a83c7", "#e29aaa", "#dfbb45", "#76aa91"][i]} />
          </div>
        ))}
      </div>
      <div className="voucher-grid">
        {[
          ["FREE LATTE", "Gratis 1 Latte", "450 poin", "#C7B8EA"],
          ["BDAY25", "Diskon 25% Ulang Tahun", "Otomatis", "#F2BFD0"],
          ["STUDY15", "Diskon Mahasiswa 15%", "Status aktif", "#F6E8A9"],
        ].map((x, i) => (
          <article
            key={x[0]}
            className="voucher"
            style={{ "--vcolor": x[3] } as React.CSSProperties}
          >
            <div className="voucher-top">
              <span>
                <Icon name="gift" />
              </span>
              <Badge tone={i === 2 ? "yellow" : "green"}>Aktif</Badge>
            </div>
            <h2>{x[1]}</h2>
            <code>{x[0]}</code>
            <div>
              <span>Biaya</span>
              <strong>{x[2]}</strong>
            </div>
            <div>
              <span>Penerima</span>
              <strong>{i === 0 ? "Gold & Silver" : i === 1 ? "Ulang tahun" : "Mahasiswa"}</strong>
            </div>
            <div>
              <span>Penerbit</span>
              <strong>Raka · Manager</strong>
            </div>
            <div>
              <span>Ditukar</span>
              <strong>{[328, 186, 940][i]}×</strong>
            </div>
            <div className="voucher-foot">
              <span>Berlaku s.d. 30 Jun 2025</span>
              <button>
                <Icon name="more" />
              </button>
            </div>
          </article>
        ))}
      </div>
      {modal && (
        <Modal title="Buat voucher baru" close={() => setModal(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setModal(false);
              notify(
                "Voucher berhasil diterbitkan",
                "Voucher baru siap dilacak saat digunakan di POS.",
              );
            }}
          >
            <label>Nama voucher</label>
            <input className="input" required placeholder="Contoh: Bonus Latte Jumat" />
            <label>Kode voucher</label>
            <input className="input" required placeholder="JUMATCERIA" />
            <div className="form-grid">
              <div>
                <label>Jenis</label>
                <select className="select">
                  <option>Diskon nominal</option>
                  <option>Produk gratis</option>
                </select>
              </div>
              <div>
                <label>Nilai</label>
                <input className="input" placeholder="Rp25.000" />
              </div>
            </div>
            <div className="modal-actions">
              <Button variant="ghost" onClick={() => setModal(false)}>
                Batal
              </Button>
              <Button type="submit">Simpan voucher</Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

function Reviews() {
  const initialIssues = [
    {
      id: 1,
      title: "Pesanan terlalu lama",
      name: "Fikri Ramadhan",
      rating: 2,
      time: "1j 24m",
      unit: "Sudirman",
      priority: "Kritis",
      status: "Terbuka",
    },
    {
      id: 2,
      title: "Minuman kurang sesuai",
      name: "Maya Larasati",
      rating: 3,
      time: "42m",
      unit: "Dago",
      priority: "Tinggi",
      status: "Diproses",
    },
    {
      id: 3,
      title: "Meja kurang bersih",
      name: "Nadia Putri",
      rating: 2,
      time: "2j 10m",
      unit: "Sudirman",
      priority: "Tinggi",
      status: "Diproses",
    },
    {
      id: 4,
      title: "Voucher gagal dipakai",
      name: "Reza Mahendra",
      rating: 1,
      time: "Kemarin",
      unit: "Dipatiukur",
      priority: "Kritis",
      status: "Terbuka",
    },
  ];
  const [issues, setIssues] = useState(initialIssues);
  const [selectedId, setSelectedId] = useState(1);
  const [filter, setFilter] = useState("Semua");
  const [query, setQuery] = useState("");
  const [resolution, setResolution] = useState("Voucher 20%");
  const [resolved, setResolved] = useState(false);
  const [flowStep, setFlowStep] = useState(2);
  const [createOpen, setCreateOpen] = useState(false);
  const [response, setResponse] = useState(
    "Halo Kak, maaf ya atas pengalaman yang kurang nyaman hari ini. Kami sudah meneruskan detailnya ke kepala unit dan ingin memperbaiki pengalaman Kakak.",
  );
  const selected = issues.find((issue) => issue.id === selectedId) || issues[0];
  const advanceComplaint = () => {
    if (flowStep < 4) {
      const next = flowStep + 1;
      setFlowStep(next);
      setIssues((items) =>
        items.map((item) => (item.id === selected.id ? { ...item, status: "Diproses" } : item)),
      );
      notify(
        "Tahap keluhan diperbarui",
        `Keluhan masuk ke tahap ${["Monitoring", "Identifikasi", "Minta maaf", "Kompensasi", "Tindak lanjut"][next]}.`,
      );
    } else {
      setResolved(true);
      setIssues((items) =>
        items.map((item) => (item.id === selected.id ? { ...item, status: "Selesai" } : item)),
      );
      notify(
        "Keluhan selesai",
        "Recovery tetap dipantau melalui voucher dan transaksi POS berikutnya.",
      );
    }
  };
  return (
    <div className="page wide">
      <PageHead
        title="Review & Keluhan"
        desc="Selesaikan isu pelanggan dengan alur yang jelas dan tepat waktu."
        action="Catat keluhan"
        onAction={() => setCreateOpen(true)}
      />
      <div className="review-summary">
        <div>
          <span>Rating hari ini</span>
          <strong>
            4,7 <Icon name="star" />
          </strong>
          <small>128 ulasan</small>
        </div>
        <div className="alert">
          <Mascot pose="alert" className="alert-mascot" />
          <div>
            <strong>3 keluhan melewati SLA</strong>
            <small>Diteruskan ke kepala unit untuk eskalasi</small>
          </div>
          <Button variant="outline" onClick={() => setFilter("Terbuka")}>
            Lihat prioritas
          </Button>
        </div>
      </div>
      <div className="complaint-workspace">
        <aside className="complaint-inbox">
          <div className="complaint-filters">
            {["Semua", "Terbuka", "Diproses", "Selesai"].map((item) => (
              <button
                key={item}
                className={filter === item ? "active" : ""}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="complaint-search">
            <Icon name="search" />
            <input
              placeholder="Cari keluhan atau pelanggan..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          {issues
            .filter(
              (item) =>
                (filter === "Semua" || item.status === filter) &&
                `${item.title} ${item.name}`.toLowerCase().includes(query.toLowerCase()),
            )
            .map((item) => (
              <button
                key={item.id}
                className={`complaint-item ${selected.id === item.id ? "active" : ""}`}
                onClick={() => {
                  setSelectedId(item.id);
                  setResolved(false);
                  setFlowStep(item.status === "Terbuka" ? 1 : item.status === "Selesai" ? 4 : 2);
                }}
              >
                <div>
                  <Badge tone={item.priority === "Kritis" ? "pink" : "yellow"}>
                    {item.priority}
                  </Badge>
                  <span>{item.time}</span>
                </div>
                <strong>{item.title}</strong>
                <p>
                  {item.name} · {item.unit}
                </p>
                <footer>
                  <span>
                    {Array.from({ length: 5 }, (_, i) => (
                      <i key={i} className={i < item.rating ? "filled" : ""}>
                        ★
                      </i>
                    ))}
                  </span>
                  <Badge tone="gray">{item.status}</Badge>
                </footer>
              </button>
            ))}
        </aside>
        <section className="complaint-detail">
          <header>
            <div>
              <span className="eyebrow">KELUHAN #LMT-24061</span>
              <h2>{selected.title}</h2>
              <p>
                {selected.name} · {selected.unit} · Hari ini, 09.31
              </p>
            </div>
            <div>
              <Badge tone="pink">Tenggat 36 menit</Badge>
              <button className="icon-btn">
                <Icon name="more" />
              </button>
            </div>
          </header>
          <div className="service-flow">
            {["Monitoring", "Identifikasi", "Minta maaf", "Kompensasi", "Tindak lanjut"].map(
              (step, i) => (
                <div key={step} className={i < flowStep ? "done" : i === flowStep ? "active" : ""}>
                  <span>{i < flowStep ? <Icon name="check" size={13} /> : i + 1}</span>
                  <small>{step}</small>
                </div>
              ),
            )}
          </div>
          <div className="customer-message">
            <span className="avatar">
              {selected.name
                .split(" ")
                .map((name) => name[0])
                .join("")
                .slice(0, 2)}
            </span>
            <div>
              <strong>“{selected.title}.”</strong>
              <p>
                Pesanan baru datang setelah dua kali menanyakan ke staf. Semoga bisa lebih cepat
                lain kali.
              </p>
            </div>
          </div>
          <div className="complaint-columns">
            <div>
              <h3>Respons & permintaan maaf</h3>
              <textarea value={response} onChange={(event) => setResponse(event.target.value)} />
              <button
                className="template-link"
                onClick={() =>
                  setResponse(
                    `Halo Kak ${selected.name.split(" ")[0]}, maaf ya atas ${selected.title.toLowerCase()} yang membuat kunjungan hari ini kurang nyaman. Tim ${selected.unit} sudah menerima laporan ini dan akan menindaklanjutinya.`,
                  )
                }
              >
                Gunakan template permintaan maaf
              </button>
            </div>
            <div>
              <h3>Pilih kompensasi</h3>
              {["Voucher 20%", "Voucher 32%", "Penggantian menu"].map((item) => (
                <label
                  key={item}
                  className={`resolution-option ${resolution === item ? "selected" : ""}`}
                >
                  <input
                    type="radio"
                    name="resolution"
                    checked={resolution === item}
                    onChange={() => setResolution(item)}
                  />
                  <span>
                    <strong>{item}</strong>
                    <small>
                      {item === "Voucher 32%"
                        ? "Butuh persetujuan manajer"
                        : item === "Penggantian menu"
                          ? "Ditandai pada POS"
                          : "Sesuai kebijakan standar"}
                    </small>
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="recovery-tracking">
            <div>
              <span>Voucher digunakan</span>
              <strong>Belum</strong>
            </div>
            <div>
              <span>Pelanggan kembali</span>
              <strong>Belum terdeteksi</strong>
            </div>
            <div>
              <span>Eskalasi</span>
              <strong>Kepala unit Sudirman</strong>
            </div>
          </div>
          <footer>
            <Button
              variant="outline"
              onClick={() =>
                notify(
                  "Keluhan dieskalasi",
                  `Manager dan kepala unit ${selected.unit} sudah menerima notifikasi.`,
                )
              }
            >
              Eskalasi ke manajer
            </Button>
            <Button onClick={advanceComplaint}>
              {resolved
                ? "Keluhan selesai"
                : flowStep === 4
                  ? "Selesaikan keluhan"
                  : "Simpan & lanjut tahap"}
            </Button>
          </footer>
        </section>
      </div>
      {createOpen && (
        <Modal title="Catat keluhan baru" close={() => setCreateOpen(false)}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setCreateOpen(false);
              notify("Keluhan berhasil dicatat", "Keluhan baru masuk ke tahap monitoring.");
            }}
          >
            <label>Nama atau nomor pelanggan</label>
            <input className="input" required placeholder="Cari pelanggan..." />
            <label>Ringkasan keluhan</label>
            <input className="input" required placeholder="Contoh: Waktu tunggu terlalu lama" />
            <div className="form-grid">
              <div>
                <label>Prioritas</label>
                <select className="select">
                  <option>Normal</option>
                  <option>Tinggi</option>
                  <option>Kritis</option>
                </select>
              </div>
              <div>
                <label>Unit terkait</label>
                <select className="select">
                  <option>Sudirman</option>
                  <option>Dago</option>
                  <option>Dipatiukur</option>
                </select>
              </div>
            </div>
            <div className="modal-actions">
              <Button variant="ghost" onClick={() => setCreateOpen(false)}>
                Batal
              </Button>
              <Button type="submit">Catat keluhan</Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

function Events({ go }: { go: (p: Page) => void }) {
  const stages = ["Inquiry", "Offer", "Negotiation", "Deal", "Executed", "Follow-up"];
  const [filter, setFilter] = useState("Sudirman");
  const [deals, setDeals] = useState([
    {
      id: 1,
      name: "Gathering Arunika Co.",
      date: "22 Jun",
      pax: "45 pax",
      value: "Rp8,5jt",
      stage: 0,
      type: "Corporate",
    },
    {
      id: 2,
      name: "Workshop RuangKita",
      date: "27 Jun",
      pax: "30 pax",
      value: "Rp5,4jt",
      stage: 1,
      type: "Komunitas",
    },
    {
      id: 3,
      name: "Campus Connect ITB",
      date: "5 Jul",
      pax: "120 pax",
      value: "Rp21jt",
      stage: 2,
      type: "Kampus",
    },
    {
      id: 4,
      name: "Media Night Atlas",
      date: "12 Jul",
      pax: "60 pax",
      value: "Rp14jt",
      stage: 3,
      type: "Brand",
    },
    {
      id: 5,
      name: "Komunitas Baca",
      date: "14 Jun",
      pax: "25 pax",
      value: "Rp4,2jt",
      stage: 4,
      type: "Komunitas",
    },
    {
      id: 6,
      name: "Karya Nusantara",
      date: "10 Jun",
      pax: "40 pax",
      value: "Rp7,8jt",
      stage: 5,
      type: "Corporate",
    },
  ]);
  const moveDeal = (id: number, stage: number) =>
    setDeals(deals.map((deal) => (deal.id === id ? { ...deal, stage } : deal)));
  return (
    <div className="page wide">
      <PageHead
        title="Event Pipeline"
        desc="Pantau peluang event dari inquiry hingga follow-up."
        action="Tambah inquiry"
      />
      <div className="pipeline-bar">
        <div>
          <span>Potensi nilai</span>
          <strong>Rp84,6jt</strong>
        </div>
        <div>
          <span>Deal bulan ini</span>
          <strong>8 event</strong>
        </div>
        <div>
          <span>Conversion rate</span>
          <strong>38%</strong>
        </div>
        <select className="select" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option>Sudirman</option>
        </select>
        <Button variant="outline" onClick={() => go("quotation")}>
          Kalkulator penawaran
        </Button>
      </div>
      <div className="event-board">
        {stages.map((s, si) => (
          <section
            key={s}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => moveDeal(Number(event.dataTransfer.getData("deal")), si)}
          >
            <header>
              <span>{s}</span>
              <b>{deals.filter((x) => x.stage === si).length}</b>
            </header>
            {deals
              .filter((x) => x.stage === si)
              .map((x) => (
                <article
                  key={x.id}
                  draggable
                  onDragStart={(event) => event.dataTransfer.setData("deal", String(x.id))}
                  onDoubleClick={() => go("quotation")}
                >
                  <div className="event-card-meta">
                    <Badge tone={si >= 3 ? "green" : si === 2 ? "yellow" : "purple"}>
                      {x.type}
                    </Badge>
                    <span>{x.pax}</span>
                  </div>
                  <h3>{x.name}</h3>
                  <p>
                    <Icon name="calendar" size={14} />
                    {x.date}
                  </p>
                  <footer>
                    <strong>{x.value}</strong>
                    <button>
                      <Icon name="more" />
                    </button>
                  </footer>
                </article>
              ))}
          </section>
        ))}
      </div>
      <div className="link-row">
        <span>Butuh kontak vendor atau komunitas?</span>
        <Button variant="soft" onClick={() => go("partners")}>
          Buka direktori mitra <Icon name="arrow" />
        </Button>
      </div>
    </div>
  );
}

function Quotation() {
  const [pax, setPax] = useState(45);
  const [price, setPrice] = useState(185000);
  const [area, setArea] = useState("Semi-private");
  const [facility, setFacility] = useState(true);
  const [saved, setSaved] = useState(false);
  const subtotal = pax * price,
    service = subtotal * 0.05,
    facilityFee = facility ? 750000 : 0,
    total = subtotal + service + facilityFee,
    deposit = total * 0.3;
  const valid = pax >= 20;
  return (
    <div className="page">
      <PageHead
        eyebrow="EVENT / ARUNIKA CO."
        title="Gathering Arunika Co."
        desc="Hitung dulu biayanya, jangan sampai boncos! · Penawaran #EV-24018"
        action="Ekspor PDF"
        actionIcon="download"
      />
      <div className="event-progress">
        {["Inquiry", "Penawaran", "Negosiasi", "Deal", "Terlaksana", "Follow-up"].map((item, i) => (
          <div key={item} className={i < 1 ? "done" : i === 1 ? "active" : ""}>
            <span>{i < 1 ? <Icon name="check" size={13} /> : i + 1}</span>
            <small>{item}</small>
          </div>
        ))}
      </div>
      <div className="quote-layout">
        <section className="panel form-panel">
          <div className="client-strip">
            <span className="avatar">AC</span>
            <div>
              <strong>Arunika Company</strong>
              <small>Nabila Putri · 0812••••7781 · Corporate</small>
            </div>
            <Button variant="ghost" icon="message">
              Hubungi PIC
            </Button>
          </div>
          <h2>Detail event & paket</h2>
          <p>Validasi minimum peserta, pesanan, dan area secara otomatis.</p>
          <div className="form-grid">
            <div className="full">
              <label>Nama event</label>
              <input className="input" defaultValue="Gathering Arunika Co." />
            </div>
            <div>
              <label>Jumlah peserta</label>
              <input
                className={`input ${!valid ? "invalid" : ""}`}
                type="number"
                value={pax}
                onChange={(e) => setPax(+e.target.value)}
              />
              {!valid && <small className="error">Minimum 20 peserta untuk paket event.</small>}
            </div>
            <div>
              <label>Harga per pax</label>
              <input
                className="input"
                type="number"
                value={price}
                onChange={(e) => setPrice(+e.target.value)}
              />
            </div>
            <div>
              <label>Area</label>
              <select className="select" value={area} onChange={(e) => setArea(e.target.value)}>
                <option>Semi-private</option>
                <option>Full venue</option>
                <option>Outdoor</option>
              </select>
            </div>
            <div>
              <label>Tanggal & jam</label>
              <input className="input" value="22 Jun 2025 · 18.30" readOnly />
            </div>
            <div>
              <label>Outlet</label>
              <select className="select">
                <option>Limitless Sudirman</option>
                <option>Limitless Dago</option>
              </select>
            </div>
            <div>
              <label>Tambahan fasilitas</label>
              <label className="facility-toggle">
                <input
                  type="checkbox"
                  checked={facility}
                  onChange={(e) => setFacility(e.target.checked)}
                />
                <span>Sound system & proyektor</span>
                <b>Rp750.000</b>
              </label>
            </div>
          </div>
          <div className="validation-list">
            <p className={valid ? "ok" : ""}>
              <Icon name={valid ? "check" : "close"} /> Minimum 20 peserta
            </p>
            <p className="ok">
              <Icon name="check" /> Minimum order Rp3.500.000
            </p>
            <p className="ok">
              <Icon name="check" /> Kapasitas area sesuai
            </p>
          </div>
        </section>
        <aside className="quote-paper">
          <div className="quote-brand">
            <Logo />
            <Badge tone="gray">DRAF</Badge>
          </div>
          <h2>Ringkasan penawaran</h2>
          <div className="quote-customer">
            <strong>Gathering Arunika Co.</strong>
            <span>22 Juni 2025 · {pax} peserta</span>
            <span>Limitless Sudirman · {area}</span>
          </div>
          <div className="quote-lines">
            <div>
              <span>
                {pax} pax × {rupiah(price)}
              </span>
              <b>{rupiah(subtotal)}</b>
            </div>
            <div>
              <span>Biaya layanan 5%</span>
              <b>{rupiah(service)}</b>
            </div>
            {facility && (
              <div>
                <span>Sound system & proyektor</span>
                <b>{rupiah(facilityFee)}</b>
              </div>
            )}
            <div className="total">
              <span>Total</span>
              <b>{rupiah(total)}</b>
            </div>
            <div className="deposit">
              <span>Deposit 30%</span>
              <b>{rupiah(deposit)}</b>
            </div>
          </div>
          <small>Penawaran berlaku 7 hari. Jadwal dikunci setelah deposit diterima.</small>
          <Button disabled={!valid} onClick={() => setSaved(true)}>
            {saved ? "Yay! Berhasil disimpan!" : "Simpan penawaran"}
          </Button>
          <div className="followup-reminder">
            <Icon name="bell" />
            <div>
              <strong>Follow-up berikutnya</strong>
              <span>Besok, 10.00 · Konfirmasi paket & DP</span>
            </div>
          </div>
        </aside>
      </div>
      <section className="panel event-activity">
        <div className="panel-head">
          <div>
            <h2>Activity timeline</h2>
            <p>Perubahan penawaran dan komunikasi dengan klien</p>
          </div>
          <Button variant="outline" icon="plus">
            Tambah catatan
          </Button>
        </div>
        {[
          ["Hari ini, 11.20", "Raka memperbarui jumlah peserta dari 40 menjadi 45."],
          ["Hari ini, 09.14", "Nabila meminta tambahan proyektor dan sound system."],
          ["18 Jun, 16.42", "Penawaran awal dikirim melalui WhatsApp."],
        ].map((item) => (
          <div key={item[0]}>
            <i />
            <time>{item[0]}</time>
            <p>{item[1]}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

function rupiah(v: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(v);
}

function Partners() {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<string[] | null>(null);
  const data = [
    ["Kopi Keliling Bandung", "Vendor kopi", "Bandung", "12 kolaborasi", "KK"],
    ["RuangKita Creative", "Komunitas", "Bandung", "8 event", "RK"],
    ["Arunika Eventworks", "Event organizer", "Jakarta", "6 event", "AE"],
    ["Campus Connect ITB", "Kampus", "Bandung", "14 event", "CC"],
    ["Kembang Pagi Studio", "Fotografi", "Bandung", "4 kolaborasi", "KP"],
    ["Nada Senja", "Musisi", "Bandung", "9 event", "NS"],
  ];
  return (
    <div className="page">
      <PageHead
        title="Direktori Mitra"
        desc="Kontak vendor, komunitas, kampus, dan kolaborator tepercaya."
        action="Tambah mitra"
      />
      <div className="table-tools">
        <div className="searchbox">
          <Icon name="search" />
          <input
            placeholder="Cari nama atau kategori mitra..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <Button variant="outline" icon="filter">
          Kategori
        </Button>
      </div>
      <div className="partner-grid">
        {data
          .filter((x) => x.join(" ").toLowerCase().includes(q.toLowerCase()))
          .map((x, i) => (
            <article className="panel partner" key={x[0]} onClick={() => setSelected(x)}>
              <div className={`partner-logo p${i}`}>{x[4]}</div>
              <button className="icon-btn">
                <Icon name="more" />
              </button>
              <h2>{x[0]}</h2>
              <Badge tone="gray">{x[1]}</Badge>
              <p>
                {x[2]} · {x[3]}
              </p>
              <div>
                <button>
                  <Icon name="message" /> Hubungi
                </button>
                <button onClick={() => setSelected(x)}>
                  Lihat profil <Icon name="chevron" />
                </button>
              </div>
            </article>
          ))}
      </div>
      {selected && (
        <div className="drawer-backdrop" onMouseDown={() => setSelected(null)}>
          <aside className="partner-drawer" onMouseDown={(event) => event.stopPropagation()}>
            <header>
              <span className="partner-logo">{selected[4]}</span>
              <button className="icon-btn" onClick={() => setSelected(null)}>
                <Icon name="close" />
              </button>
            </header>
            <Badge tone="green">Mitra aktif</Badge>
            <h2>{selected[0]}</h2>
            <p>
              {selected[1]} · {selected[2]}
            </p>
            <div className="partner-kpis">
              <div>
                <strong>12</strong>
                <span>Acara bersama</span>
              </div>
              <div>
                <strong>Rp86,4jt</strong>
                <span>Nilai kerja sama</span>
              </div>
              <div>
                <strong>428</strong>
                <span>Member baru</span>
              </div>
            </div>
            <h3>Kontak PIC</h3>
            <div className="pic-card">
              <span className="avatar">NA</span>
              <div>
                <strong>Nadia Ananta</strong>
                <small>Partnership Lead · 0812••••8124</small>
              </div>
              <Button variant="soft" icon="message">
                Hubungi
              </Button>
            </div>
            <h3>Riwayat kolaborasi</h3>
            {[
              ["Campus Creative Week", "14 Mei 2025", "186 member baru"],
              ["Sunday Community Ride", "02 Mar 2025", "94 member baru"],
              ["Limitless Workshop", "18 Jan 2025", "72 member baru"],
            ].map((item) => (
              <div className="collab-row" key={item[0]}>
                <i />
                <div>
                  <strong>{item[0]}</strong>
                  <small>{item[1]}</small>
                </div>
                <Badge tone="purple">{item[2]}</Badge>
              </div>
            ))}
          </aside>
        </div>
      )}
    </div>
  );
}

function Settings({ go }: { go: (p: Page) => void }) {
  const [section, setSection] = useState("Kebijakan");
  const [toast, setToast] = useState(false);
  const [dialog, setDialog] = useState<"staff" | "outlet" | "deletion" | null>(null);
  const sections = [
    "Kebijakan",
    "Staf & Peran",
    "Unit & Outlet",
    "Privasi & Data",
    "Log Perubahan",
  ];
  return (
    <div className="page">
      <PageHead
        title="Pengaturan"
        desc="Atur workspace, hak akses, dan kebijakan data Limitless Hub."
      />
      <div className="settings-layout">
        <aside className="settings-nav">
          {sections.map((x) => (
            <button key={x} className={section === x ? "active" : ""} onClick={() => setSection(x)}>
              {x}
              <Icon name="chevron" />
            </button>
          ))}
          <hr />
          <button onClick={() => go("design")}>
            <Icon name="palette" />
            Design System
          </button>
          <button onClick={() => go("qr")}>
            <Icon name="qr" />
            Customer QR Mobile
          </button>
        </aside>
        <section className="panel settings-content">
          <span className="eyebrow">PENGATURAN WORKSPACE</span>
          <h2>{section}</h2>
          <p>Kelola informasi dan preferensi yang berlaku untuk workspace Anda.</p>
          {section === "Kebijakan" ? (
            <form
              onSubmit={(e: FormEvent) => {
                e.preventDefault();
                setToast(true);
                setTimeout(() => setToast(false), 2500);
              }}
            >
              <div className="form-grid">
                <div>
                  <label>Kompensasi standar</label>
                  <select className="select">
                    <option>Voucher 20%</option>
                    <option>Penggantian menu</option>
                  </select>
                </div>
                <div>
                  <label>Kompensasi dengan persetujuan</label>
                  <select className="select">
                    <option>Voucher 32%</option>
                  </select>
                </div>
                <div>
                  <label>Ambang “hampir hilang”</label>
                  <div className="number-control">
                    <input className="input" defaultValue="45" />
                    <span>hari</span>
                  </div>
                </div>
                <div>
                  <label>Batas pesan WhatsApp</label>
                  <div className="number-control">
                    <input className="input" defaultValue="2" />
                    <span>pesan / bulan</span>
                  </div>
                </div>
                <div className="full policy-row">
                  <div>
                    <strong>Verifikasi mahasiswa fisik</strong>
                    <p>Diskon 15% aktif setelah staf memeriksa KTM asli. Foto tidak disimpan.</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <i />
                  </label>
                </div>
                <div className="full policy-row">
                  <div>
                    <strong>Eskalasi keluhan otomatis</strong>
                    <p>Teruskan ke kepala unit saat tenggat layanan terlewati.</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <i />
                  </label>
                </div>
              </div>
              <div className="save-row">
                <Button type="submit">Simpan perubahan</Button>
              </div>
            </form>
          ) : section === "Staf & Peran" ? (
            <div>
              <div className="settings-section-head">
                <div>
                  <strong>3 anggota tim aktif</strong>
                  <span>Akses dibatasi berdasarkan peran dan unit.</span>
                </div>
                <Button icon="plus" onClick={() => setDialog("staff")}>
                  Tambah staf
                </Button>
              </div>
              <div className="role-list">
                {[
                  ["Raka Pratama", "Manager", "Sudirman · Dago · Dipatiukur"],
                  ["Dina Maharani", "Customer Experience", "Sudirman"],
                  ["Adit Nugraha", "Staff", "Dago"],
                ].map((x) => (
                  <div key={x[0]}>
                    <span className="avatar">
                      {x[0]
                        .split(" ")
                        .map((a) => a[0])
                        .join("")}
                    </span>
                    <div>
                      <strong>{x[0]}</strong>
                      <small>{x[2]} · Aktif hari ini</small>
                    </div>
                    <Badge tone="gray">{x[1]}</Badge>
                    <select
                      className="role-select"
                      defaultValue={x[1]}
                      onChange={() =>
                        notify("Peran diperbarui", `Akses ${x[0]} sudah disesuaikan.`)
                      }
                    >
                      <option>Manager</option>
                      <option>Customer Experience</option>
                      <option>Staff</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          ) : section === "Unit & Outlet" ? (
            <div className="outlet-settings">
              <div className="settings-section-head">
                <div>
                  <strong>3 unit terhubung</strong>
                  <span>Setiap unit memiliki sumber POS dan kepala unit sendiri.</span>
                </div>
                <Button icon="plus" onClick={() => setDialog("outlet")}>
                  Tambah unit
                </Button>
              </div>
              {[
                ["Sudirman", "SDR-01", "Raka Pratama", "Moka POS", "Aktif"],
                ["Dago", "DGO-02", "Adit Nugraha", "Moka POS", "Aktif"],
                ["Dipatiukur", "DPT-03", "Dina Maharani", "CSV terjadwal", "Aktif"],
              ].map((unit) => (
                <div className="outlet-setting-row" key={unit[0]}>
                  <span className="outlet-mark">{unit[0][0]}</span>
                  <div>
                    <strong>Limitless {unit[0]}</strong>
                    <small>
                      {unit[1]} · Kepala unit: {unit[2]}
                    </small>
                  </div>
                  <div>
                    <span>Sumber transaksi</span>
                    <b>{unit[3]}</b>
                  </div>
                  <Badge tone="green">{unit[4]}</Badge>
                  <Button
                    variant="outline"
                    onClick={() =>
                      notify(`Unit ${unit[0]} dibuka`, "Konfigurasi unit siap diedit.")
                    }
                  >
                    Kelola
                  </Button>
                </div>
              ))}
            </div>
          ) : section === "Privasi & Data" ? (
            <div className="privacy-settings">
              <div>
                <span>
                  <Icon name="heart" />
                </span>
                <div>
                  <strong>Persetujuan layanan & promo</strong>
                  <p>Dicatat terpisah, lengkap dengan waktu dan sumber.</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() =>
                    notify(
                      "Log persetujuan dibuka",
                      "Filter berdasarkan pelanggan, sumber, dan tanggal tersedia.",
                    )
                  }
                >
                  Kelola
                </Button>
              </div>
              <div>
                <span>
                  <Icon name="receipt" />
                </span>
                <div>
                  <strong>Permintaan penghapusan data</strong>
                  <p>2 permintaan menunggu tinjauan petugas privasi.</p>
                </div>
                <Button variant="outline" onClick={() => setDialog("deletion")}>
                  Tinjau
                </Button>
              </div>
              <div>
                <span>
                  <Icon name="settings" />
                </span>
                <div>
                  <strong>Retensi & ekspor data</strong>
                  <p>Ekspor hanya tersedia untuk Manager dan petugas privasi.</p>
                </div>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <i />
                </label>
              </div>
              <div className="privacy-law">
                <strong>UU No. 27 Tahun 2022</strong>
                <p>
                  Hak akses, log persetujuan, koreksi, ekspor, dan penghapusan data tercatat di
                  workspace.
                </p>
              </div>
            </div>
          ) : section === "Log Perubahan" ? (
            <div className="change-log">
              <div className="settings-section-head">
                <div>
                  <strong>Aktivitas terbaru</strong>
                  <span>Jejak audit tidak dapat diubah oleh staf.</span>
                </div>
                <Button variant="outline" icon="download">
                  Ekspor log
                </Button>
              </div>
              {[
                [
                  "Hari ini, 11.42",
                  "Raka Pratama",
                  "Mengubah batas pesan WhatsApp menjadi 2/bulan",
                  "Kebijakan",
                ],
                [
                  "Hari ini, 10.18",
                  "Dina Maharani",
                  "Menyelesaikan permintaan penghapusan #PD-028",
                  "Privasi",
                ],
                [
                  "Kemarin, 17.05",
                  "Raka Pratama",
                  "Menambahkan akses unit Dago untuk Adit",
                  "Akses",
                ],
                ["18 Jun, 09.24", "Sistem", "Sinkronisasi kebijakan kompensasi ke unit", "Sistem"],
              ].map((log) => (
                <div key={log[0] + log[1]}>
                  <span className="status-dot" />
                  <time>{log[0]}</time>
                  <div>
                    <strong>{log[1]}</strong>
                    <p>{log[2]}</p>
                  </div>
                  <Badge tone="gray">{log[3]}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <div />
          )}
        </section>
      </div>
      {toast && <Toast />}
      {dialog === "staff" && (
        <Modal title="Tambah anggota tim" close={() => setDialog(null)}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setDialog(null);
              notify("Undangan staf dikirim", "Akses aktif setelah staf menerima undangan.");
            }}
          >
            <label>Nama staf</label>
            <input className="input" required placeholder="Nama lengkap" />
            <label>Email atau nomor staf</label>
            <input className="input" required placeholder="nama@limitless.cafe" />
            <div className="form-grid">
              <div>
                <label>Peran</label>
                <select className="select">
                  <option>Staff</option>
                  <option>Customer Experience</option>
                  <option>Manager</option>
                </select>
              </div>
              <div>
                <label>Unit</label>
                <select className="select">
                  <option>Sudirman</option>
                  <option>Dago</option>
                  <option>Dipatiukur</option>
                </select>
              </div>
            </div>
            <div className="modal-actions">
              <Button variant="ghost" onClick={() => setDialog(null)}>
                Batal
              </Button>
              <Button type="submit">Kirim undangan</Button>
            </div>
          </form>
        </Modal>
      )}
      {dialog === "outlet" && (
        <Modal title="Tambah unit" close={() => setDialog(null)}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setDialog(null);
              notify("Unit berhasil ditambahkan", "Hubungkan POS untuk mulai membaca transaksi.");
            }}
          >
            <label>Nama unit</label>
            <input className="input" required placeholder="Contoh: Buah Batu" />
            <label>Kode unit</label>
            <input className="input" required placeholder="BBT-04" />
            <label>Kepala unit</label>
            <select className="select">
              <option>Raka Pratama</option>
              <option>Dina Maharani</option>
            </select>
            <div className="modal-actions">
              <Button variant="ghost" onClick={() => setDialog(null)}>
                Batal
              </Button>
              <Button type="submit">Tambah unit</Button>
            </div>
          </form>
        </Modal>
      )}
      {dialog === "deletion" && (
        <Modal title="Permintaan penghapusan data" close={() => setDialog(null)}>
          <div className="deletion-request">
            <Badge tone="yellow">Menunggu tinjauan</Badge>
            <h3>#PD-028 · Maya Larasati</h3>
            <p>
              Diminta 18 Juni 2025 melalui halaman member. Pastikan kewajiban penyimpanan transaksi
              POS telah diperiksa.
            </p>
            <div>
              <span>Data CRM</span>
              <strong>Profil, consent, preferensi</strong>
            </div>
            <div>
              <span>Data POS</span>
              <strong>Tidak dihapus oleh CRM</strong>
            </div>
          </div>
          <div className="modal-actions">
            <Button variant="ghost" onClick={() => setDialog(null)}>
              Tunda
            </Button>
            <Button
              onClick={() => {
                setDialog(null);
                notify(
                  "Permintaan disetujui",
                  "Proses penghapusan CRM dicatat pada log perubahan.",
                );
              }}
            >
              Setujui penghapusan
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function DesignSystem() {
  return (
    <div className="page">
      <PageHead
        title="Design System"
        desc="Fondasi visual Limitless Hub — playful, hangat, dan profesional."
      />
      <section className="ds-hero">
        <Logo />
        <div>
          <span>PLAYFUL PROFESSIONAL</span>
          <h2>
            Friendly by nature.
            <br />
            Focused by design.
          </h2>
          <p>Pastel hadir sebagai aksen untuk mengarahkan perhatian, bukan memenuhi halaman.</p>
        </div>
      </section>
      <div className="ds-grid">
        <section className="panel">
          <span className="eyebrow">01 · WARNA</span>
          <h2>Brand palette</h2>
          <div className="swatches">
            {[
              ["Periwinkle", "#AEB8F5"],
              ["Lavender", "#C7B8EA"],
              ["Lilac", "#E6DDF5"],
              ["Pink", "#F2BFD0"],
              ["Peach", "#F9D9C7"],
              ["Butter", "#F6E8A9"],
              ["Plum", "#393344"],
              ["Cream", "#F8F6F1"],
            ].map((x) => (
              <div key={x[0]}>
                <i style={{ background: x[1] }} />
                <strong>{x[0]}</strong>
                <code>{x[1]}</code>
              </div>
            ))}
          </div>
        </section>
        <section className="panel type-demo">
          <span className="eyebrow">02 · TIPOGRAFI</span>
          <h2>Clear, warm hierarchy</h2>
          <div>
            <h1>Heading 01</h1>
            <h2>Heading 02</h2>
            <h3>Heading 03</h3>
            <p>Body — Informasi terasa ringan dan mudah dipindai oleh tim operasional.</p>
            <small>CAPTION / METADATA</small>
          </div>
        </section>
        <section className="panel">
          <span className="eyebrow">03 · KOMPONEN</span>
          <h2>Actions & status</h2>
          <div className="component-demo">
            <Button>Primary action</Button>
            <Button variant="outline">Secondary</Button>
            <Button variant="soft">Soft action</Button>
            <div>
              <Badge tone="green">Berhasil</Badge>
              <Badge tone="yellow">Menunggu</Badge>
              <Badge tone="pink">Perlu perhatian</Badge>
            </div>
            <input className="input" placeholder="Input field" />
          </div>
        </section>
        <section className="panel">
          <span className="eyebrow">04 · PRINSIP</span>
          <h2>Built for clarity</h2>
          <div className="principles">
            {[
              ["01", "Pastel as signal", "Warna membantu, bukan mendominasi."],
              ["02", "Warm clarity", "Bahasa natural dan informasi ringkas."],
              ["03", "Real feedback", "Setiap aksi punya state yang jelas."],
            ].map((x) => (
              <div key={x[0]}>
                <span>{x[0]}</span>
                <div>
                  <strong>{x[1]}</strong>
                  <p>{x[2]}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="panel mascot-system">
          <span className="eyebrow">05 · BRAND PERSONALITY</span>
          <h2>Mascot usage system</h2>
          <p>
            Aset asli digunakan apa adanya. Konteks dibangun melalui ukuran, posisi, dan speech
            bubble.
          </p>
          <div>
            {[
              ["Welcome", "welcome"],
              ["Happy", "happy"],
              ["Curious", "curious"],
              ["Alert", "alert"],
              ["Success", "success"],
              ["Celebration", "celebration"],
            ].map(([label, pose]) => (
              <div key={label}>
                <Mascot pose={pose as MascotPose} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="panel icon-system">
          <span className="eyebrow">06 · ICON & FEEDBACK</span>
          <h2>Consistent interaction language</h2>
          <div>
            {(
              [
                "home",
                "users",
                "message",
                "gift",
                "heart",
                "calendar",
                "settings",
                "bell",
              ] as IconName[]
            ).map((item) => (
              <button key={item} title={item}>
                <Icon name={item} />
                <span>{item}</span>
              </button>
            ))}
          </div>
          <div className="skeleton-demo">
            <i />
            <i />
            <i />
          </div>
          <small>Hover icon untuk tooltip. Skeleton digunakan saat data sedang dimuat.</small>
        </section>
      </div>
    </div>
  );
}

function QRPage() {
  const [step, setStep] = useState(1);
  const [receipt, setReceipt] = useState("");
  const [mode, setMode] = useState<"member" | "feedback">("member");
  const [rating, setRating] = useState(0);
  const [feedbackSent, setFeedbackSent] = useState(false);
  return (
    <div className="mobile-page">
      <div className="mobile-shell">
        <header>
          <Logo />
          <button className="icon-btn">
            <Icon name="more" />
          </button>
        </header>
        <div className="mobile-progress">
          <i style={{ width: mode === "feedback" ? "100%" : `${step * 20}%` }} />
        </div>
        {step === 1 && mode === "member" && (
          <main>
            <div className="member-welcome">
              <Mascot pose="welcome" />
              <div>
                <span className="eyebrow">LIMITLESS MEMBER</span>
                <h1>Hai! Mau mulai dari mana?</h1>
                <p>Jadi member atau ceritakan pengalamanmu hari ini.</p>
              </div>
            </div>
            <div className="mobile-mode">
              <button className="active">
                <Icon name="users" />
                <strong>Daftar member</strong>
                <span>Kumpulkan reward & kenali benefitmu</span>
              </button>
              <button onClick={() => setMode("feedback")}>
                <Icon name="heart" />
                <strong>Beri masukan</strong>
                <span>Cuma butuh sekitar satu menit</span>
              </button>
            </div>
            <label>Nomor struk POS</label>
            <input
              className="input"
              placeholder="LMT-2025-XXXXXX"
              value={receipt}
              onChange={(e) => setReceipt(e.target.value)}
            />
            <Button disabled={!receipt} onClick={() => setStep(2)}>
              Lanjutkan <Icon name="arrow" />
            </Button>
            <small>
              Nomor struk hanya dapat digunakan sekali. QR meja hanya dapat membuka feedback.
            </small>
          </main>
        )}
        {step === 2 && mode === "member" && (
          <main>
            <button className="back" onClick={() => setStep(1)}>
              ← Kembali
            </button>
            <span className="eyebrow">DATA DIRI · 2 DARI 5</span>
            <h1>Kenalan dulu, yuk.</h1>
            <p>Kami pakai data ini hanya untuk layanan member.</p>
            <label>Nama lengkap</label>
            <input className="input" defaultValue="Nadia Putri" />
            <label>Nomor WhatsApp</label>
            <input className="input" defaultValue="0812 4521 9087" />
            <label>Sumber mengenal Limitless</label>
            <select className="select">
              <option>QR pada struk</option>
              <option>Teman</option>
              <option>Kampus</option>
              <option>Event</option>
            </select>
            <Button onClick={() => setStep(3)}>
              Kirim OTP <Icon name="arrow" />
            </Button>
          </main>
        )}
        {step === 3 && mode === "member" && (
          <main>
            <button className="back" onClick={() => setStep(2)}>
              ← Kembali
            </button>
            <span className="eyebrow">VERIFIKASI WHATSAPP · 3 DARI 5</span>
            <h1>Cek pesan kamu.</h1>
            <p>Kami mengirim kode 6 digit ke 0812••••9087.</p>
            <div className="otp">
              {Array.from({ length: 6 }).map((_, i) => (
                <input key={i} maxLength={1} defaultValue={i < 4 ? String(i + 2) : ""} />
              ))}
            </div>
            <Button onClick={() => setStep(4)}>Verifikasi</Button>
            <small>Satu nomor WhatsApp hanya dapat digunakan untuk satu member.</small>
          </main>
        )}
        {step === 4 && mode === "member" && (
          <main>
            <button className="back" onClick={() => setStep(3)}>
              ← Kembali
            </button>
            <span className="eyebrow">PREFERENSI · 4 DARI 5</span>
            <h1>Sedikit lagi.</h1>
            <label className="student-choice">
              <input type="checkbox" />
              <span>
                <strong>Saya mahasiswa</strong>
                <small>
                  Diskon 15% aktif setelah KTM fisik diverifikasi staf. Foto tidak disimpan.
                </small>
              </span>
            </label>
            <label>Kampus</label>
            <select className="select">
              <option>Pilih kampus</option>
              <option>Universitas Padjadjaran</option>
              <option>Institut Teknologi Bandung</option>
            </select>
            <div className="consent-mobile">
              <label>
                <input type="checkbox" defaultChecked />
                <span>
                  <strong>Persetujuan data layanan</strong>
                  <small>Wajib untuk membuat dan mengelola akun member.</small>
                </span>
              </label>
              <label>
                <input type="checkbox" />
                <span>
                  <strong>Mau menerima promo WhatsApp</strong>
                  <small>Opsional, maksimal 2 pesan per bulan. Bisa dihentikan kapan saja.</small>
                </span>
              </label>
            </div>
            <Button onClick={() => setStep(5)}>Buat akun member</Button>
          </main>
        )}
        {step === 5 && mode === "member" && (
          <main className="qr-success">
            <Mascot pose="celebration" className="qr-success-mascot" />
            <h1>Yay, kamu berhasil!</h1>
            <p>Member Limitless kamu sudah aktif. Tunjukkan QR ini saat transaksi berikutnya.</p>
            <div className="fake-qr">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <strong>Nadia Putri</strong>
            <small>Member ID · LMT-28492</small>
            <div className="reward-progress">
              <div>
                <span>Reward berikutnya</span>
                <strong>Gratis Sea Salt Latte</strong>
              </div>
              <div>
                <i style={{ width: "68%" }} />
              </div>
              <small>340 / 500 poin</small>
            </div>
            <Badge tone="yellow">Verifikasi mahasiswa menunggu staf</Badge>
            <Button variant="soft">Simpan ke galeri</Button>
            <button
              className="text-button"
              onClick={() => {
                setMode("feedback");
                setRating(0);
              }}
            >
              Beri masukan kunjungan ini
            </button>
          </main>
        )}
        {mode === "feedback" && (
          <main className="feedback-mobile">
            <button
              className="back"
              onClick={() => {
                setMode("member");
                setStep(1);
              }}
            >
              ← Kembali
            </button>
            {feedbackSent ? (
              <div className="feedback-success">
                <Mascot pose="success" className="feedback-success-mascot" />
                <h1>Terima kasih sudah cerita.</h1>
                <p>
                  Masukanmu sudah masuk ke tim outlet. Satu respons baik bisa bikin semuanya lebih
                  nyaman.
                </p>
                <Button
                  variant="soft"
                  onClick={() => {
                    setFeedbackSent(false);
                    setMode("member");
                    setStep(5);
                  }}
                >
                  Kembali ke member
                </Button>
              </div>
            ) : (
              <>
                <span className="eyebrow">CERITAKAN KUNJUNGANMU</span>
                <h1>Gimana pengalamanmu?</h1>
                <p>Masukanmu dibaca langsung oleh tim outlet.</p>
                <div className="rating-picker">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      key={score}
                      className={rating >= score ? "active" : ""}
                      onClick={() => setRating(score)}
                    >
                      ★<span>{score}</span>
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <>
                    <label>
                      {rating <= 3 ? "Apa yang bikin kurang nyaman?" : "Apa yang paling kamu suka?"}
                    </label>
                    <div className="feedback-chips">
                      {["Rasa menu", "Waktu tunggu", "Pelayanan", "Kebersihan", "Suasana"].map(
                        (item) => (
                          <button key={item}>{item}</button>
                        ),
                      )}
                    </div>
                    <textarea placeholder="Ceritakan sedikit, supaya kami bisa menindaklanjuti..." />
                    {rating <= 3 && (
                      <div className="empathy-note">
                        <Mascot pose="alert" />
                        <p>
                          Ups, ada yang kurang nyaman. Terima kasih sudah cerita—tim kami akan
                          berusaha membereskannya.
                        </p>
                      </div>
                    )}
                    <Button onClick={() => setFeedbackSent(true)}>Kirim masukan</Button>
                  </>
                )}
              </>
            )}
          </main>
        )}
        <footer>Privasi · Bantuan · © 2025 Limitless</footer>
      </div>
    </div>
  );
}

function Login({ go }: { go: (p: Page) => void }) {
  const [loading, setLoading] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => go("dashboard"), 700);
  };
  return (
    <div className="login-page">
      <aside>
        <Logo />
        <div>
          <span>LIMITLESS HUB</span>
          <h1>
            Hubungan yang hangat,
            <br />
            dimulai dari data
            <br />
            yang bermakna.
          </h1>
          <p>
            Satu tempat untuk memahami pelanggan, menjaga pengalaman, dan menumbuhkan komunitas
            cafe.
          </p>
        </div>
        <Mascot pose="happy" className="login-mascot" />
        <div className="login-quote">
          <Mascot pose="welcome" />
          <p>“Hai, tim! Hari ini kita bikin pelanggan merasa lebih dikenal.”</p>
        </div>
      </aside>
      <main>
        <form onSubmit={submit}>
          <span className="eyebrow">SELAMAT DATANG KEMBALI</span>
          <h2>Masuk ke workspace</h2>
          <p>Gunakan akun tim Limitless untuk melanjutkan.</p>
          <label>Email kerja</label>
          <input className="input" type="email" required defaultValue="manager@limitless.cafe" />
          <div className="password-label">
            <label>Password</label>
            <button type="button">Lupa password?</button>
          </div>
          <input className="input" type="password" required defaultValue="limitless123" />
          <label className="checkbox">
            <input type="checkbox" defaultChecked /> Ingat saya di perangkat ini
          </label>
          <Button type="submit">{loading ? "Memeriksa akun..." : "Masuk ke Limitless Hub"}</Button>
          <small>Akses dilindungi dan dicatat sesuai peran pengguna.</small>
        </form>
      </main>
    </div>
  );
}

function Modal({
  title,
  close,
  children,
}: {
  title: string;
  close: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="modal-backdrop" onMouseDown={close}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <header>
          <h2>{title}</h2>
          <button onClick={close}>
            <Icon name="close" />
          </button>
        </header>
        {children}
      </div>
    </div>
  );
}
function Toast({
  title = "Yay! Berhasil disimpan!",
  detail = "Perubahan sudah diterapkan.",
}: {
  title?: string;
  detail?: string;
}) {
  return (
    <div className="toast">
      <Mascot pose="success" className="toast-mascot" />
      <div>
        <strong>{title}</strong>
        <small>{detail}</small>
      </div>
    </div>
  );
}

function Shell() {
  const [page, setPage] = useState<Page>("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [command, setCommand] = useState(false);
  const [notifs, setNotifs] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [roleMenu, setRoleMenu] = useState(false);
  const [role, setRole] = useState<Role>("Manager");
  const [commandQuery, setCommandQuery] = useState("");
  const [toast, setToast] = useState<{ title: string; detail: string } | null>(null);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommand(true);
      }
      if (event.key === "Escape") {
        setCommand(false);
        setNotifs(false);
        setProfileMenu(false);
        setRoleMenu(false);
      }
    };
    const onNotify = (event: Event) => {
      const message = (event as CustomEvent<{ title: string; detail: string }>).detail;
      setToast(message);
      window.setTimeout(() => setToast(null), 2800);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("limitless:notify", onNotify);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("limitless:notify", onNotify);
    };
  }, []);
  const go = (p: Page) => {
    setPage(p);
    setMobile(false);
    setCommand(false);
    setCommandQuery("");
    setNotifs(false);
    setProfileMenu(false);
    setRoleMenu(false);
    window.scrollTo(0, 0);
  };
  const currentNav = navByRole[role];
  const currentProfile = roleProfiles[role];
  const changeRole = (nextRole: Role) => {
    setRole(nextRole);
    setRoleMenu(false);
    const firstPage = navByRole[nextRole][0].items[0][0];
    go(firstPage);
    notify(`Mode ${nextRole} aktif`, "Menu sidebar sudah disesuaikan dengan hak akses role.");
  };
  const pageComponent: Record<Page, React.ReactNode> = {
    dashboard: <Dashboard go={go} />,
    calendar: <DemandCalendar />,
    lookup: <Lookup go={go} />,
    customers: <Customers go={go} />,
    profile: <Profile />,
    campus: <Campus />,
    pos: <Pos />,
    campaigns: <Campaigns go={go} />,
    builder: <Builder go={go} />,
    performance: <Performance />,
    rewards: <Rewards />,
    reviews: <Reviews />,
    events: <Events go={go} />,
    quotation: <Quotation />,
    partners: <Partners />,
    settings: <Settings go={go} />,
    design: <DesignSystem />,
    qr: <QRPage />,
    login: <Login go={go} />,
  };
  if (page === "login" || page === "qr") return <>{pageComponent[page]}</>;
  return (
    <div className={`app-shell ${collapsed ? "collapsed" : ""}`}>
      <aside className={`sidebar ${mobile ? "mobile-open" : ""}`}>
        <div className="side-head">
          <Logo compact={collapsed} />
          <button className="collapse" onClick={() => setCollapsed(!collapsed)}>
            <Icon name="chevron" />
          </button>
        </div>
        <nav>
          {currentNav.map((g) => (
            <div className="nav-group" key={g.group}>
              <span>{g.group}</span>
              {g.items.map((x) => (
                <button
                  key={x[0]}
                  className={
                    page === x[0] ||
                    (page === "profile" && x[0] === "customers") ||
                    (["builder", "performance"].includes(page) && x[0] === "campaigns") ||
                    (["quotation", "partners"].includes(page) && x[0] === "events")
                      ? "active"
                      : ""
                  }
                  onClick={() => go(x[0])}
                >
                  <Icon name={x[1]} />
                  <b>{x[2]}</b>
                  {x[0] === "reviews" && <i>3</i>}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div className="sidebar-foot">
          {roleMenu && (
            <div className="sidebar-role-menu">
              <small>GANTI ROLE</small>
              {(Object.keys(roleProfiles) as Role[]).map((item) => (
                <button
                  key={item}
                  className={role === item ? "active" : ""}
                  onClick={() => changeRole(item)}
                >
                  <span>{roleProfiles[item].initials}</span>
                  <div>
                    <strong>{roleProfiles[item].name}</strong>
                    <small>{item}</small>
                  </div>
                  {role === item && <Icon name="check" size={14} />}
                </button>
              ))}
            </div>
          )}
          <div className="support sidebar-profile" onClick={() => setRoleMenu(!roleMenu)}>
            <span>{currentProfile.initials}</span>
            <div>
              <strong>{currentProfile.name}</strong>
              <small>
                {role} · {currentProfile.unit}
              </small>
            </div>
            <Icon name="chevron" size={15} />
          </div>
        </div>
      </aside>
      <div className="shell-main">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobile(!mobile)}>
            <Icon name="menu" />
          </button>
          <div className="breadcrumb">
            <span>Limitless Hub</span>
            <Icon name="chevron" size={14} />
            <strong>{pageTitle[page]}</strong>
          </div>
          <button className="global-search" onClick={() => setCommand(true)}>
            <Icon name="search" />
            <span>Cari pelanggan, kampanye, atau halaman...</span>
            <kbd>Ctrl K</kbd>
          </button>
          <div className="top-actions">
            <button className="sync" onClick={() => go("pos")}>
              <i />
              POS tersinkron
            </button>
            <select
              className="outlet-select"
              onChange={(event) =>
                notify(
                  `Outlet ${event.target.value} aktif`,
                  "Seluruh data halaman sudah disesuaikan.",
                )
              }
            >
              <option>Sudirman</option>
              <option>Dago</option>
            </select>
            <div className="pop-wrap">
              <button className="icon-btn notification" onClick={() => setNotifs(!notifs)}>
                <Icon name="bell" />
                <i />
              </button>
              {notifs && (
                <div className="popover notifications">
                  <header>
                    <strong>Notifikasi</strong>
                    <Badge tone="pink">3 baru</Badge>
                  </header>
                  <button onClick={() => go("reviews")}>
                    <span className="att-icon pink">!</span>
                    <div>
                      <strong>Keluhan melewati SLA</strong>
                      <small>3 keluhan perlu eskalasi</small>
                    </div>
                  </button>
                  <button onClick={() => go("campus")}>
                    <span className="att-icon yellow">
                      <Icon name="school" size={14} />
                    </span>
                    <div>
                      <strong>Verifikasi menunggu</strong>
                      <small>8 kartu perlu diperiksa</small>
                    </div>
                  </button>
                </div>
              )}
            </div>
            <div className="pop-wrap">
              <button className="profile-button" onClick={() => setProfileMenu(!profileMenu)}>
                <span>{currentProfile.initials}</span>
                <div>
                  <strong>{currentProfile.name}</strong>
                  <small>{role}</small>
                </div>
                <Icon name="chevron" size={14} />
              </button>
              {profileMenu && (
                <div className="popover profile-pop">
                  <button onClick={() => go("settings")}>
                    <Icon name="settings" />
                    Pengaturan akun
                  </button>
                  <button onClick={() => go("login")}>
                    <Icon name="logout" />
                    Keluar
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        <main key={page} className="content page-enter">
          {pageComponent[page]}
        </main>
      </div>
      {mobile && <button className="mobile-overlay" onClick={() => setMobile(false)} />}
      {command && (
        <div className="command-backdrop" onMouseDown={() => setCommand(false)}>
          <div className="command" onMouseDown={(e) => e.stopPropagation()}>
            <div>
              <Icon name="search" />
              <input
                autoFocus
                placeholder="Cari halaman atau fitur..."
                value={commandQuery}
                onChange={(event) => setCommandQuery(event.target.value)}
              />
              <kbd>ESC</kbd>
            </div>
            <span>HALAMAN</span>
            {currentNav
              .flatMap((group) => group.items)
              .filter((item) => item[2].toLowerCase().includes(commandQuery.toLowerCase()))
              .map((item) => {
                const x = item[0];
                return (
                  <button key={x} onClick={() => go(x)}>
                    <Icon
                      name={
                        x === "calendar"
                          ? "calendar"
                          : x === "customers"
                            ? "users"
                            : x === "campaigns"
                              ? "message"
                              : "arrow"
                      }
                    />
                    <div>
                      <strong>{pageTitle[x]}</strong>
                      <small>Buka halaman</small>
                    </div>
                    <kbd>↵</kbd>
                  </button>
                );
              })}
          </div>
        </div>
      )}
      {toast && <Toast title={toast.title} detail={toast.detail} />}
    </div>
  );
}

export default function App() {
  return <Shell />;
}

// Content spine for the F[LÓVE]RS clone — verbatim Czech copy extracted from the live site.
// Editing copy here keeps layout/motion untouched.

export const site = {
  phone: "+420 774 594 470",
  phoneHref: "tel:+420774594470",
  instagram: "@flowers_prague",
  instagramHref: "https://www.instagram.com/flowers_prague/",
  mapsHref: "https://maps.google.com/?cid=14531505238062618007",
  mapEmbed:
    "https://www.google.com/maps?cid=14531505238062618007&output=embed",
  addressShort: "Husitská 28, Žižkov",
  hoursShort: "Otevřeno denně 10:00-18:30",
  topStrip: "Květinářství · Husitská 28, Žižkov · Praha 3",
};

export const nav = [
  { label: "Příběh", href: "#pribeh" },
  { label: "Kolekce", href: "#kolekce" },
  { label: "Galerie", href: "#galerie" },
  { label: "Služby", href: "#sluzby" },
  { label: "Recenze", href: "#recenze" },
  { label: "Kontakt", href: "#kontakt" },
];

export const hero = {
  eyebrow: "Květinářství · Žižkov, Praha 3",
  headlineTop: "Květiny, které řeknou",
  headlineAccent: "víc než slova.",
  body:
    "Autorské kytice a květinové boxy vázané s láskou v srdci Žižkova. Každý den čerstvé, každá kompozice originál. Rozvoz po celé Praze.",
  ratingStrong: "4,9 z 5",
  ratingRest: "432 recenzí na Googlu",
  image: { src: "/images/instagram2.jpg", alt: "Kytice pivoněk od F[LÓVE]RS na letní louce" },
  imageSmall: { src: "/images/gmaps7.jpg", alt: "Jarní kytice v pražské uličce" },
};

export const marqueeItems = [
  "Autorské kytice",
  "Květinové boxy",
  "Svatby & eventy",
  "Rozvoz po Praze",
  "Sezónní květiny",
  "Made with love",
];

export const story = {
  eyebrow: "Náš příběh",
  headline: ["Vázáno s láskou", "v srdci Žižkova"],
  paragraphs: [
    "F[LÓVE]RS je malé květinářství na Husitské ulici, kde každou kytici vážeme ručně a s péčí o detail. Nepracujeme podle šablon, každá kompozice vzniká jako originál, přesně podle příležitosti i podle vás.",
    "Naše floristky, v čele s Liubov, vám poradí s výběrem, sladí barvy i náladu a domluví se s vámi česky, anglicky nebo rusky. Objednáte pohodlně přes Instagram i telefon a my doručíme kamkoli v Praze.",
  ],
  quote: "„Čerstvě, krásně a přesně podle vašich představ.“",
  image: { src: "/images/gmaps2.jpg", alt: "Kytice bílých pivoněk zabalená ve fLOVErs" },
  badge: { value: "24k+", label: "sledujících" },
  stats: [
    { value: "4,9★", label: "hodnocení" },
    { value: "432", label: "recenzí" },
    { value: "7 dní", label: "v týdnu" },
  ],
};

export const collection = {
  eyebrow: "Autorská kolekce",
  headlinePrefix: "Signature kytice ",
  body:
    "Naše nejoblíbenější kompozice, které se objevují na Instagramu. Každou vytvoříme čerstvou přesně pro vás, jako inspiraci nebo na míru.",
  cards: [
    {
      name: "Pure Elegance",
      desc: "Celobílá kompozice v boxu, růže, chryzantémy a eukalyptus. Nadčasová, slavnostní.",
      image: { src: "/images/instagram1.jpg", alt: "Kytice Pure Elegance od F[LÓVE]RS" },
    },
    {
      name: "June Embrace",
      desc: "Něžné odstíny pudrové a smetanové, pivoňky a kaly. Letní, romantická kytice.",
      image: { src: "/images/instagram3.jpg", alt: "Kytice June Embrace od F[LÓVE]RS" },
    },
    {
      name: "Berry Sorbet",
      desc: "Sytá paleta růžové a fialové v sametovém boxu. Odvážná a plná energie.",
      image: { src: "/images/instagram6.jpg", alt: "Kytice Berry Sorbet od F[LÓVE]RS" },
    },
    {
      name: "Neon Jungle",
      desc: "Architektonická kompozice s gerberami a celosií. Pro toho, kdo má rád výraznost.",
      image: { src: "/images/instagram4.jpg", alt: "Kytice Neon Jungle od F[LÓVE]RS" },
    },
  ],
};

export const gallery = {
  eyebrow: "Galerie",
  headline: "Z naší dílny",
  link: "@flowers_prague →",
  images: [
    { src: "/images/gmaps3.jpg", alt: "Kytice od F[LÓVE]RS 1" },
    { src: "/images/gmaps4.jpg", alt: "Kytice od F[LÓVE]RS 2" },
    { src: "/images/gmaps5.jpg", alt: "Kytice od F[LÓVE]RS 3" },
    { src: "/images/gmaps6.jpg", alt: "Kytice od F[LÓVE]RS 4" },
    { src: "/images/gmaps10.jpg", alt: "Kytice od F[LÓVE]RS 5" },
    { src: "/images/gmaps1.jpg", alt: "Kytice od F[LÓVE]RS 6" },
  ],
};

// icon key → component in icons.tsx
export const services = {
  eyebrow: "Co nabízíme",
  headline: "Floristika pro každou příležitost",
  cards: [
    {
      icon: "flower",
      title: "Autorské kytice",
      desc: "Sezónní kytice vázané ručně podle vašich představ. Pivoňky, tulipány, zahradní růže i hortenzie.",
    },
    {
      icon: "box",
      title: "Květinové boxy",
      desc: "Naše signature boxy v sametu i papíře, aranžované do posledního detailu. Ideální dárek.",
    },
    {
      icon: "heart",
      title: "Svatby a eventy",
      desc: "Květinová výzdoba svateb, oslav a firemních akcí. Od kytice pro nevěstu po celý prostor.",
    },
    {
      icon: "truck",
      title: "Rozvoz po Praze",
      desc: "Doručíme kamkoli v Praze, včetně letiště. Elegantní balení a spolehlivé dodání na čas.",
    },
    {
      icon: "chat",
      title: "Online objednávky",
      desc: "Objednávejte přes Instagram nebo telefon, v češtině, angličtině i rusky. Platba i přes PayPal.",
    },
    {
      icon: "leaf",
      title: "Sezónní květiny",
      desc: "Vždy čerstvé květiny podle ročního období. Poradíme s výběrem i s péčí o kytici doma.",
    },
  ] as const,
};

export const delivery = {
  eyebrow: "Rozvoz",
  headline: ["Doručíme kamkoli", "v Praze. I na letiště."],
  body:
    "Ať potřebujete překvapit blízkého v centru, nebo přivítat návštěvu přímo na letišti, kytici doručíme čerstvou a elegantně zabalenou, spolehlivě a na čas. Objednat můžete i ze zahraničí přes Instagram.",
  stats: [
    { value: "Denně", label: "10:00-18:30" },
    { value: "Rozvoz", label: "po celé Praze" },
    { value: "Platba", label: "hotově i PayPal" },
  ],
  bgImage: { src: "/images/gmaps8.jpg", alt: "Kytice nad pražskými střechami" },
  image: { src: "/images/gmaps9.jpg", alt: "Doručení kytice na letiště Praha" },
};

export const reviews = {
  eyebrow: "Recenze",
  headline: "Co říkají naši zákazníci",
  ratingStrong: "4,9 z 5",
  ratingRest: "432 recenzí na Googlu",
  items: [
    {
      quote:
        "Vždy, když jsem sháněl krásnou kytici dle vlastních představ, mi milé floristky v fLOVErs s velkou ochotou, spolehlivostí a profesionalitou pomohly. Online komunikace s nimi je bezvadná.",
      name: "David Pham",
      source: "Google · recenze",
    },
    {
      quote:
        "Kupuji pořad (oslava, svátek apod.). Rychle, skvěle bez komplikace. Široký výběr květin, jejich kombinace a dekorace. Vše na jedničku, pět hvězdiček!",
      name: "Christopher Russos",
      source: "Google · recenze",
    },
    {
      quote:
        "Skvělý zákaznický servis! Měla jsem malou komplikaci s objednávkou, ale všechno bylo velmi rychle napraveno a vyřešeno. Moc si cením tohoto přístupu.",
      name: "Rufina Tsybyktarova",
      source: "Google · recenze",
    },
    {
      quote:
        "I reached out on their Instagram from Croatia and Liubov replied in English. She gave me wonderful choices for my budget, and within a couple of hours my girlfriend in Prague received her gorgeous bouquet. The Wow factor.",
      name: "Shawn Sexton",
      source: "Google · international guest",
    },
    {
      quote:
        "The best and the most professional flower shop in Prague. I am ordering flowers from them for 4 years now, it is always fresh, beautifully arranged and exactly what I want.",
      name: "Tamara Radunovic",
      source: "Google · international guest",
    },
    {
      quote:
        "The arrangements were absolutely beautiful, fresh, vibrant, and exactly like the photos. Delivery was smooth and on time, and the packaging was elegant. Everything arrived in perfect condition.",
      name: "Dana Samelyuk",
      source: "Google · international guest",
    },
  ],
};

export const contact = {
  eyebrow: "Kontakt",
  headline: "Objednejte si kytici",
  body:
    "Napište nám, co potřebujete, a my se vám co nejdříve ozveme. Nejrychleji nás zastihnete telefonicky nebo na Instagramu.",
  cards: [
    { label: "Telefon", value: "+420 774 594 470", href: "tel:+420774594470" },
    { label: "Instagram", value: "@flowers_prague", href: "https://www.instagram.com/flowers_prague/" },
    { label: "Adresa", value: "Husitská 28, Žižkov", href: "https://maps.google.com/?cid=14531505238062618007" },
  ],
  form: {
    name: "Jméno",
    phone: "Telefon",
    email: "E-mail",
    message: "Jakou kytici si představujete? (příležitost, barvy, rozpočet, termín)",
    submit: "Odeslat poptávku",
  },
  hoursTitle: "Otevírací doba",
  hoursBadge: "Otevřeno denně",
  hours: [
    { day: "Pondělí", time: "10:00-18:30" },
    { day: "Úterý", time: "10:00-18:30" },
    { day: "Středa", time: "10:00-18:30" },
    { day: "Čtvrtek", time: "10:00-18:30" },
    { day: "Pátek", time: "10:00-18:30" },
    { day: "Sobota", time: "10:00-18:30" },
    { day: "Neděle", time: "10:00-18:30" },
  ],
};

export const footer = {
  blurb:
    "Květinářství v srdci Žižkova. Autorské kytice a květinové boxy vázané s láskou. Rozvoz po celé Praze.",
  madeWithLove: "Made with love ♥",
  contactLinks: [
    { label: "+420 774 594 470", href: "tel:+420774594470" },
    { label: "@flowers_prague", href: "https://www.instagram.com/flowers_prague/" },
  ],
  address: ["Husitská 1251/28", "Žižkov, Praha 3", "130 00"],
  hours: ["Po-Ne", "10:00-18:30"],
  copyright: "© 2026 Květinářství fLOVErs · Žižkov, Praha 3",
  credit: "Ukázkový web navrhl",
  creditName: "Klaudius",
};

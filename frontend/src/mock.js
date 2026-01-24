// Mock data for Upxero website – updated concept (Website + Online Ordering + WhatsApp Assistant)

export const testimonials = [
  {
    id: 1,
    name: "Marc Janssens",
    business: "Brasserie De Gouden Leeuw",
    location: "Antwerpen",
    image: "https://images.unsplash.com/photo-1643834776503-891726ed42c6?crop=entropy&cs=srgb&fm=jpg&q=85",
    text: "Sinds we met Upxero werken, krijgen we meer online bestellingen én veel minder telefoontjes. Klanten worden automatisch via WhatsApp geholpen en bestellen direct via onze website. Dat scheelt enorm tijdens de service.",
    rating: 5
  },
  {
    id: 2,
    name: "Sophie Vermeulen",
    business: "Pizzeria La Stella",
    location: "Gent",
    image: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg",
    text: "De combinatie van online bestellen en de WhatsApp-assistent is ideaal. Klanten stellen minder vragen en bestellen sneller. Alles ziet er professioneel uit en wij hoeven zelf niets te beheren.",
    rating: 5
  },
  {
    id: 3,
    name: "Dirk Peeters",
    business: "Frituur 't Hoekske",
    location: "Leuven",
    image: "https://images.unsplash.com/photo-1512485800893-b08ec1ea59b1?crop=entropy&cs=srgb&fm=jpg&q=85",
    text: "Vroeger stond de telefoon constant roodgloeiend. Nu stuurt WhatsApp klanten automatisch door naar de bestelpagina. Minder fouten, minder stress en meer controle over onze bestellingen.",
    rating: 5
  }
];

export const faqs = [
  {
    id: 1,
    question: "Moet ik commissie betalen per bestelling?",
    answer: "Nee. U betaalt een vast maandbedrag. Alle bestellingen via uw website zijn volledig commissievrij."
  },
  {
    id: 2,
    question: "Wat doet de WhatsApp-assistent precies?",
    answer: "De WhatsApp-assistent beantwoordt automatisch veelgestelde vragen en begeleidt klanten naar uw online bestelpagina. Bestellingen zelf verlopen altijd via uw website. Normaal gebruik is inbegrepen."
  },
  {
    id: 3,
    question: "Neemt de WhatsApp-assistent bestellingen aan?",
    answer: "Nee. De assistent neemt geen bestellingen aan, maar stuurt klanten altijd door naar het online bestelsysteem. Zo vermijdt u fouten en misverstanden."
  },
  {
    id: 4,
    question: "Heb ik technische kennis nodig?",
    answer: "Helemaal niet. Wij regelen alles: website, online bestellen, WhatsApp-flow, hosting, updates en support."
  },
  {
    id: 5,
    question: "Kan ik mijn menu of openingstijden aanpassen?",
    answer: "Ja. U kunt uw menu, prijzen en openingstijden eenvoudig aanpassen wanneer u dat wilt."
  },
  {
    id: 6,
    question: "Hoe snel kan ik live gaan?",
    answer: "In de meeste gevallen kunnen we binnen 1 à 2 weken live gaan, inclusief website, menu en WhatsApp-assistent."
  },
  {
    id: 7,
    question: "Op welke toestellen werkt het systeem?",
    answer: "Alles werkt perfect op smartphone, tablet en desktop. Uw website en bestelpagina zijn volledig mobile-first."
  },
  {
    id: 8,
    question: "Kan ik opzeggen wanneer ik wil?",
    answer: "Ja. Er geldt een minimumduur van 6 maanden. Daarna is het contract maandelijks opzegbaar."
  }
];

export const services = [
  {
    id: 1,
    title: "Professionele Horeca Website",
    description: "Een snelle, mobile-first website die uw restaurant professioneel presenteert en bezoekers omzet in bestellingen.",
    icon: "Globe",
    image: "https://images.pexels.com/photos/12935074/pexels-photo-12935074.jpeg"
  },
  {
    id: 2,
    title: "Online Bestellen Zonder Commissie",
    description: "Directe bestellingen via uw eigen website voor afhaling en takeaway. Geen tussenpartijen, geen kosten per bestelling.",
    icon: "ShoppingCart",
    image: "https://images.pexels.com/photos/12935041/pexels-photo-12935041.jpeg"
  },
  {
    id: 3,
    title: "Slimme WhatsApp Assistent",
    description: "Beantwoordt automatisch vragen van klanten en stuurt hen door naar uw online bestelpagina. Minder telefoons, meer rust.",
    icon: "MessageCircle",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3"
  },
  {
    id: 4,
    title: "Volledig Beheerde Oplossing",
    description: "Hosting, updates, onderhoud en support inbegrepen. U focust op uw zaak, wij doen de rest.",
    icon: "Settings",
    image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9"
  }
];

export const benefits = [
  {
    id: 1,
    title: "0% Commissie",
    description: "U behoudt 100% van uw omzet. Geen commissies per bestelling, enkel een vast maandbedrag.",
    icon: "TrendingUp",
    image: "https://images.pexels.com/photos/12935048/pexels-photo-12935048.jpeg"
  },
  {
    id: 2,
    title: "Minder Telefoons, Minder Fouten",
    description: "Klanten krijgen automatisch antwoorden via WhatsApp en bestellen zelf online. Minder onderbrekingen tijdens de service.",
    icon: "PhoneOff",
    image: "https://images.pexels.com/photos/9461799/pexels-photo-9461799.jpeg"
  },
  {
    id: 3,
    title: "Meer Directe Bestellingen",
    description: "Klanten bestellen rechtstreeks bij u via uw website. Meer controle, meer marge en meer herhaalbestellingen.",
    icon: "Target",
    image: "https://images.pexels.com/photos/6605239/pexels-photo-6605239.jpeg"
  }
];

export const pricingPlans = [
  {
    id: 1,
    name: "Start",
    price: "29",
    period: "maand",
    setupPrice: 99,
    description: "Voor restaurants die al een website hebben.",
    features: [
      "Online bestelsysteem (afhaling & takeaway)",
      "WhatsApp bestel-assistent",
      "Menu setup & integratie",
      "Hosting, updates & beveiliging",
      "Email support"
    ],
    popular: false
  },
  {
    id: 2,
    name: "Grow",
    price: "49",
    period: "maand",
    setupPrice: 199,
    description: "Complete oplossing voor moderne horecazaken.",
    features: [
      "Professionele horeca website",
      "Online bestelsysteem",
      "WhatsApp bestel-assistent",
      "Menu setup",
      "Hosting, updates & beveiliging",
      "Email support"
    ],
    popular: true
  },
  {
    id: 3,
    name: "Boost",
    price: "79",
    period: "maand",
    setupPrice: 249,
    description: "Voor restaurants die sneller willen groeien.",
    features: [
      "Alles uit Grow",
      "Conversie-optimalisatie",
      "Google Business integratie",
      "Rapportage & optimalisatie",
      "Prioriteit support"
    ],
    popular: false
  }
];

export const stats = [
  { label: "Tevreden Restaurants", value: "150+", icon: "Users" },
  { label: "Bestellingen per Maand", value: "25.000+", icon: "ShoppingBag" },
  { label: "Minder Telefonische Bestellingen", value: "−60%", icon: "PhoneOff" },
  { label: "Support Responstijd", value: "<2u", icon: "Clock" }
];


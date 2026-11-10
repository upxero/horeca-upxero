// Display data for website packages and shared content. Historical testimonials remain unused.

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

export const getFaqs = (t) => [
  { id: 1, question: t("content:standaloneQuestion"), answer: t("content:standaloneAnswer") },
  { id: 2, question: t("content:proQuestion"), answer: t("content:proAnswer") },
  { id: 3, question: t("content:upgradeQuestion"), answer: t("content:upgradeAnswer") },
  { id: 4, question: t("content:proUpgradeQuestion"), answer: t("content:proUpgradeAnswer") },
  { id: 5, question: t("content:doINeedTechnicalKnowledge"), answer: t("content:noWeHandleEverythingForYouWebsiteOnline") },
  { id: 6, question: t("content:canIChangeMyMenuPricesOrOpening"), answer: t("content:yesYouCanEasilyUpdateYourMenuPrices") },
  { id: 7, question: t("content:howQuicklyCanMyRestaurantGoLive"), answer: t("content:inMostCasesWeCanGoLiveWithin") },
  { id: 8, question: t("content:whichDevicesDoesTheSystemWorkOn"), answer: t("content:everythingWorksOnSmartphonesTabletsAndDesktopsYour") },
  { id: 9, question: t("content:canICancelWheneverIWant"), answer: t("content:yesThereIsAMinimumTermOf6") },
  { id: 10, question: t("content:onlinePaymentQuestion"), answer: t("content:onlinePaymentAnswer") },
  { id: 11, question: t('content:pageQuestion'), answer: t('content:pageCounting') },
  { id: 12, question: t('content:domainQuestion'), answer: t('content:domainDetails') },
  { id: 13, question: t('content:emailQuestion'), answer: t('content:emailDetails') },
  { id: 14, question: t('content:changesQuestion'), answer: t('content:changesDetails') }
];

export const getServices = (t) => [
  { id: 1, title: t("content:professionalHospitalityWebsite"), description: t("content:aFastMobileFirstWebsiteThatPresentsYour"), icon: "Globe", image: "https://images.pexels.com/photos/12935074/pexels-photo-12935074.jpeg" },
  { id: 2, title: t("content:orderingServiceTitle"), description: t("content:orderingServiceDescription"), icon: "ShoppingCart", image: "https://images.pexels.com/photos/12935041/pexels-photo-12935041.jpeg" },
  { id: 3, title: t("content:maintenanceServiceTitle"), description: t("content:maintenanceServiceDescription"), icon: "Settings", image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9" }
];

export const getBenefits = (t) => [
  { id: 1, title: t("content:benefitWebsiteTitle"), description: t("content:benefitWebsiteDescription"), icon: "TrendingUp", image: "https://images.pexels.com/photos/12935048/pexels-photo-12935048.jpeg" },
  { id: 2, title: t("content:benefitHostingTitle"), description: t("content:benefitHostingDescription"), icon: "TrendingUp", image: "https://images.pexels.com/photos/9461799/pexels-photo-9461799.jpeg" },
  { id: 3, title: t("content:benefitMaintenanceTitle"), description: t("content:benefitMaintenanceDescription"), icon: "TrendingUp", image: "https://images.pexels.com/photos/6605239/pexels-photo-6605239.jpeg" },
  { id: 4, title: t("content:benefitOrderingTitle"), description: t("content:benefitOrderingDescription"), icon: "TrendingUp", image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg" }
];

export const getPricingPlans = (t) => [
  { id: 1, name: 'Start', price: '19', setupPrice: 100, popular: false,
    featureKeys: ['orderingFreeAvailable', 'basicIntegration', 'setupAssistance', 'emailSupport', 'startExclusion', 'orderingProNotIncluded'] },
  { id: 2, name: 'Grow', price: '29', setupPrice: 200, popular: true,
    featureKeys: ['fivePages', 'orderingProIncluded', 'domainAllowance', 'twoEmails', 'hostingUpdatesSecurity', 'websiteMaintenance', 'technicalSeo', 'emailSupport', 'basicIntegration'] },
  { id: 3, name: 'Boost', price: '49', setupPrice: 250, popular: false,
    featureKeys: ['everythingGrow', 'tenPages', 'fiveEmails', 'prioritySupport', 'monthlyChanges', 'orderingProIncluded'] },
].map(plan => ({ ...plan, period: t('content:month'),
  description: t('content:website' + plan.name + 'Description'),
  features: plan.featureKeys.map(key => t('content:' + key)),
}));

export const getStats = (t) => [
  { label: t("content:startMonthly"), value: "€19", icon: "Users" },
  { label: t("content:growMonthly"), value: "€29", icon: "ShoppingBag" },
  { label: t("content:boostMonthly"), value: "€49", icon: "Globe" },
  { label: t("content:orderingFreeMonthly"), value: "€0", icon: "Clock" }
];


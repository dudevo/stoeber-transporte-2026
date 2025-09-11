import { StaticImageData } from "next/image";

// Import images for products (using existing assets)
import UmzugImage from "../assets/images/umzug_verpackung.jpg";
import LagerImage from "../assets/images/umzug_lagerung.jpg";
import TransportImage from "../assets/images/transporte.jpg";
import ExpressImage from "../assets/images/express-logistik.jpg";
import LiftImage from "../assets/images/umzugslift-start.jpg";

export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number; // For sale items
  image: StaticImageData;
  category: string;
  inStock: boolean;
  stockCount?: number;
  sku: string;
  rating?: number;
  reviewCount?: number;
  features?: string[];
  specifications?: { [key: string]: string };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export const productCategories = [
  { id: 'all', name: 'Alle Produkte' },
  { id: 'verpackung', name: 'Verpackungsmaterial' },
  { id: 'zubehoer', name: 'Umzugszubehör' },
  { id: 'services', name: 'Service-Pakete' },
  { id: 'miete', name: 'Miete & Leasing' },
];

export const shopProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Umzugskartons Set (20 Stück)',
    description: 'Hochwertige Umzugskartons aus stabiler 2-welliger Pappe. Ideal für den sicheren Transport Ihrer Gegenstände. Die Kartons sind einfach aufzubauen und verfügen über praktische Tragegriffe.',
    shortDescription: 'Stabile Umzugskartons für sicheren Transport',
    price: 29.99,
    originalPrice: 34.99,
    image: UmzugImage,
    category: 'verpackung',
    inStock: true,
    stockCount: 50,
    sku: 'BOX-PREM-20',
    rating: 4.8,
    reviewCount: 127,
    features: [
      '2-wellige Pappe für extra Stabilität',
      'Einfacher Aufbau ohne Kleber',
      'Praktische Tragegriffe',
      'Umweltfreundlich und recyclebar'
    ],
    specifications: {
      'Abmessungen': '40 x 30 x 30 cm',
      'Material': '2-wellige Pappe',
      'Tragkraft': 'bis 20 kg',
      'Inhalt': '20 Kartons'
    }
  },
  {
    id: '2',
    name: 'Luftpolsterfolie 100m Rolle',
    description: 'Hochwertige Luftpolsterfolie für den optimalen Schutz empfindlicher Gegenstände beim Transport. Die Folie ist reißfest und bietet excellenten Stoßschutz.',
    shortDescription: 'Professioneller Schutz für empfindliche Gegenstände',
    price: 19.99,
    image: TransportImage,
    category: 'verpackung',
    inStock: true,
    stockCount: 30,
    sku: 'BUBBLE-100',
    rating: 4.6,
    reviewCount: 89,
    features: [
      'Reißfeste Qualität',
      'Excellenter Stoßschutz',
      '100m Rolle',
      'Einfache Handhabung'
    ],
    specifications: {
      'Länge': '100 m',
      'Breite': '50 cm',
      'Blasengröße': '10 mm',
      'Material': 'PE-Folie'
    }
  },
  {
    id: '3',
    name: 'Möbellift Service - Tagespauschale',
    description: 'Professioneller Möbellift-Service für Ihren Umzug. Inkl. erfahrener Bedienung und Transport bis 5. Etage. Ideal für schwere Möbel und enge Treppenhäuser.',
    shortDescription: 'Möbellift mit professioneller Bedienung',
    price: 299.00,
    image: LiftImage,
    category: 'services',
    inStock: true,
    stockCount: 5,
    sku: 'LIFT-DAY',
    rating: 4.9,
    reviewCount: 34,
    features: [
      'Professionelle Bedienung inklusiv',
      'Transport bis 5. Etage',
      'Für Lasten bis 500 kg',
      'Versicherungsschutz enthalten'
    ],
    specifications: {
      'Maximale Höhe': '25 m',
      'Maximale Last': '500 kg',
      'Korb-Abmessungen': '1,2 x 2,0 m',
      'Mindestmietdauer': '4 Stunden'
    }
  },
  {
    id: '4',
    name: 'Express-Lagerung 1 Monat (10m²)',
    description: 'Sichere und klimatisierte Lagerung für Ihre Möbel und Gegenstände. 24/7 Überwachung und Zugriff nach Terminvereinbarung.',
    shortDescription: 'Klimatisierte Lagerung mit 24/7 Sicherheit',
    price: 89.00,
    image: LagerImage,
    category: 'services',
    inStock: true,
    stockCount: 12,
    sku: 'STORAGE-10',
    rating: 4.7,
    reviewCount: 67,
    features: [
      'Klimatisiert und trocken',
      '24/7 Videoüberwachung',
      'Flexibler Zugang',
      'Versicherungsschutz optional'
    ],
    specifications: {
      'Fläche': '10 m²',
      'Raumhöhe': '2,5 m',
      'Temperatur': '15-20°C',
      'Luftfeuchtigkeit': '45-55%'
    }
  },
  {
    id: '5',
    name: 'Premium Kleiderboxen (5 Stück)',
    description: 'Spezielle Kleiderboxen mit integrierter Kleiderstange. Ihre Kleidung bleibt knitterfrei und gut organisiert während des Umzugs.',
    shortDescription: 'Kleiderboxen mit Kleiderstange',
    price: 49.99,
    image: UmzugImage,
    category: 'verpackung',
    inStock: true,
    stockCount: 25,
    sku: 'CLOTH-BOX-5',
    rating: 4.5,
    reviewCount: 156,
    features: [
      'Integrierte Kleiderstange',
      'Knitterfreier Transport',
      'Stabile Konstruktion',
      'Einfacher Aufbau'
    ],
    specifications: {
      'Abmessungen': '60 x 50 x 100 cm',
      'Stangenlänge': '55 cm',
      'Material': '2-wellige Pappe',
      'Inhalt': '5 Boxen'
    }
  },
  {
    id: '6',
    name: 'Express Transport Service',
    description: 'Schneller und zuverlässiger Express-Transport für eilige Sendungen. Abholung und Zustellung am selben Tag im Dreiländereck.',
    shortDescription: 'Same-Day Express Transport',
    price: 79.00,
    image: ExpressImage,
    category: 'services',
    inStock: true,
    stockCount: 8,
    sku: 'EXPRESS-SAME',
    rating: 4.8,
    reviewCount: 92,
    features: [
      'Same-Day Zustellung',
      'Live-Tracking',
      'Versicherungsschutz',
      'Flexible Abholzeit'
    ],
    specifications: {
      'Liefergebiet': 'Dreiländereck',
      'Maximale Last': '100 kg',
      'Abholung': '8-18 Uhr',
      'Zustellung': 'bis 20 Uhr'
    }
  },
  {
    id: '7',
    name: 'Profi Packpapier 25kg',
    description: 'Umweltfreundliches Packpapier aus recyceltem Material. Ideal zum Einpacken von Geschirr, Büchern und anderen empfindlichen Gegenständen.',
    shortDescription: 'Umweltfreundliches Packpapier',
    price: 24.99,
    image: UmzugImage,
    category: 'verpackung',
    inStock: true,
    stockCount: 40,
    sku: 'PAPER-25KG',
    rating: 4.4,
    reviewCount: 78,
    features: [
      'Aus recyceltem Material',
      'Saugfähig und reißfest',
      '25 kg Paket',
      'Umweltfreundlich'
    ],
    specifications: {
      'Gewicht': '25 kg',
      'Papierdicke': '40 g/m²',
      'Format': '50 x 75 cm',
      'Material': '100% Recycling'
    }
  },
  {
    id: '8',
    name: 'Möbeldecken Set (10 Stück)',
    description: 'Hochwertige Möbeldecken zum Schutz Ihrer Möbel vor Kratzern und Verschmutzung. Waschbar und wiederverwendbar.',
    shortDescription: 'Wiederverwendbare Möbeldecken',
    price: 89.99,
    image: TransportImage,
    category: 'zubehoer',
    inStock: true,
    stockCount: 20,
    sku: 'BLANKET-10',
    rating: 4.6,
    reviewCount: 45,
    features: [
      'Waschbar und wiederverwendbar',
      'Kratzschutz für Möbel',
      'Rutschfeste Unterseite',
      '10 Decken im Set'
    ],
    specifications: {
      'Abmessungen': '150 x 200 cm',
      'Material': 'Baumwolle/Polyester',
      'Dicke': '5 mm',
      'Inhalt': '10 Decken'
    }
  }
];

export function getProductById(id: string): Product | null {
  return shopProducts.find(product => product.id === id) || null;
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') {
    return shopProducts;
  }
  return shopProducts.filter(product => product.category === category);
}

export function getProductsInStock(): Product[] {
  return shopProducts.filter(product => product.inStock);
}

export function getFeaturedProducts(limit: number = 6): Product[] {
  return shopProducts
    .filter(product => product.rating && product.rating >= 4.5)
    .slice(0, limit);
}

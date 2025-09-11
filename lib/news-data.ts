import { StaticImageData } from "next/image";

// Import images for news articles
import ElektroImage from "../assets/images/express-logistik.jpg";
import LagerImage from "../assets/images/umzug_lagerung.jpg";
import SpanienImage from "../assets/images/umzug_spanien_start.jpg";
import DigitalImage from "../assets/images/stoeber-transporte-opt.jpg";
import KarriereImage from "../assets/images/leitbild.jpg";

export interface NewsArticle {
  slug: string;
  title: string;
  teaser: string;
  content: string;
  date: string;
  category: string;
  image: StaticImageData;
  author?: string;
  readTime?: string;
}

export const newsArticles: NewsArticle[] = [
  {
    slug: "neue-elektro-fahrzeugflotte",
    title: "Neue Elektro-Fahrzeugflotte für nachhaltige Transporte",
    teaser: "Stöber Transporte erweitert seine Flotte um umweltfreundliche Elektrofahrzeuge für Stadtlieferungen und kurze Strecken. Ein wichtiger Schritt in Richtung Nachhaltigkeit.",
    content: `
      <p>Stöber Transporte hat einen wichtigen Meilenstein in Sachen Nachhaltigkeit erreicht: Unsere Flotte wurde um moderne Elektrofahrzeuge erweitert, die speziell für Stadtlieferungen und kurze Transportwege eingesetzt werden.</p>
      
      <h2>Umweltfreundlich und effizient</h2>
      <p>Die neuen Elektrofahrzeuge bieten nicht nur eine umweltfreundliche Alternative zu herkömmlichen Diesel-Fahrzeugen, sondern sind auch besonders leise und effizient. Dies kommt vor allem unseren Kunden in dicht besiedelten Stadtgebieten zugute, wo Lärm- und Emissionsreduzierung von großer Bedeutung sind.</p>
      
      <h2>Technische Details</h2>
      <p>Unsere neuen Elektrotransporter verfügen über:</p>
      <ul>
        <li>Reichweite von bis zu 300 km pro Ladung</li>
        <li>Ladekapazität von bis zu 1.500 kg</li>
        <li>Moderne GPS-Tracking-Systeme</li>
        <li>Klimatisierte Laderäume für temperaturempfindliche Güter</li>
      </ul>
      
      <h2>Nachhaltigkeit im Fokus</h2>
      <p>Mit dieser Investition unterstreichen wir unser Engagement für den Umweltschutz und die Reduzierung unseres CO₂-Fußabdrucks. Die Elektrofahrzeuge werden mit 100% Ökostrom geladen und tragen somit zu einer sauberen Transportlösung bei.</p>
      
      <p>Bereits in den ersten Wochen konnten wir eine deutliche Reduzierung der Betriebskosten und eine positive Resonanz unserer Kunden verzeichnen. Die Elektroflotte wird kontinuierlich ausgebaut, um noch mehr nachhaltige Transportlösungen anbieten zu können.</p>
    `,
    date: "2024-03-15",
    category: "Nachhaltigkeit",
    image: ElektroImage,
    author: "Marc Stöber",
    readTime: "3 min"
  },
  {
    slug: "erweiterung-lagerkapazitaeten",
    title: "Erweiterung unserer Lagerkapazitäten",
    teaser: "Aufgrund der steigenden Nachfrage haben wir unsere Lagerkapazitäten um 2.000 m² erweitert. Modernste Lagertechnik sorgt für optimale Bedingungen.",
    content: `
      <p>Die kontinuierlich wachsende Nachfrage nach unseren Lagerdienstleistungen hat uns dazu veranlasst, unsere Lagerkapazitäten erheblich zu erweitern. Mit zusätzlichen 2.000 m² Lagerfläche können wir nun noch mehr Kunden professionelle Lagerlösungen anbieten.</p>
      
      <h2>Modernste Technik</h2>
      <p>Das neue Lager ist mit modernster Technik ausgestattet:</p>
      <ul>
        <li>Automatisierte Regalsysteme für optimale Raumnutzung</li>
        <li>Klimakontrollierte Bereiche für empfindliche Güter</li>
        <li>Digitales Warenwirtschaftssystem mit Echzeit-Tracking</li>
        <li>24/7 Videoüberwachung und Sicherheitssystem</li>
        <li>Brandmeldeanlage nach neuesten Standards</li>
      </ul>
      
      <h2>Flexible Lagerlösungen</h2>
      <p>Unsere erweiterten Lagerkapazitäten ermöglichen es uns, verschiedenste Anforderungen zu erfüllen:</p>
      <ul>
        <li>Kurzzeitlagerung während Umzügen</li>
        <li>Langzeitlagerung für Privatpersonen und Unternehmen</li>
        <li>Temperaturkontrollierte Lagerung</li>
        <li>Dokumentenlagerung mit besonderen Sicherheitsstandards</li>
      </ul>
      
      <h2>Standortvorteil</h2>
      <p>Das erweiterte Lager befindet sich in verkehrsgünstiger Lage und ist sowohl für unsere Fahrzeuge als auch für Kunden gut erreichbar. Die zentrale Lage ermöglicht schnelle Zugriffe und effiziente Logistikprozesse.</p>
      
      <p>Mit dieser Erweiterung stärken wir unsere Position als führender Anbieter für Transport- und Lagerdienstleistungen in der Region und schaffen die Grundlage für weiteres Wachstum.</p>
    `,
    date: "2024-02-28",
    category: "Unternehmen",
    image: LagerImage,
    author: "Team Stöber",
    readTime: "4 min"
  },
  {
    slug: "neue-umzugsroute-spanien",
    title: "Neue regelmäßige Umzugsroute nach Spanien",
    teaser: "Ab sofort bieten wir wöchentliche Transportverbindungen nach Spanien an. Profitieren Sie von unserer Expertise für Auslandsumzüge.",
    content: `
      <p>Aufgrund der großen Nachfrage freuen wir uns, eine neue regelmäßige Umzugsroute nach Spanien anzukündigen. Ab sofort fahren unsere erfahrenen Teams wöchentlich nach Spanien und bieten damit eine zuverlässige und kostengünstige Lösung für Auslandsumzüge.</p>
      
      <h2>Beliebte Ziele in Spanien</h2>
      <p>Unsere neue Route bedient die beliebtesten deutschen Auswandererziele:</p>
      <ul>
        <li>Costa del Sol (Málaga, Marbella, Torremolinos)</li>
        <li>Costa Brava (Barcelona, Girona)</li>
        <li>Balearen (Mallorca, Ibiza)</li>
        <li>Kanarische Inseln (Gran Canaria, Teneriffa)</li>
        <li>Madrid und Valencia</li>
      </ul>
      
      <h2>Spezialisiert auf Auslandsumzüge</h2>
      <p>Unsere Teams sind speziell für internationale Umzüge geschult und verfügen über umfangreiche Erfahrung mit:</p>
      <ul>
        <li>Zollabwicklung und Dokumentation</li>
        <li>Verpackung für lange Transportwege</li>
        <li>Klimaangepasste Behandlung der Güter</li>
        <li>Koordination mit örtlichen Partnern</li>
      </ul>
      
      <h2>Service-Leistungen</h2>
      <p>Unser Rundum-Service für Spanien-Umzüge umfasst:</p>
      <ul>
        <li>Kostenlose Besichtigung und Beratung</li>
        <li>Professionelle Verpackung</li>
        <li>Möbelmontage und -demontage</li>
        <li>Versicherungsschutz</li>
        <li>Unterstützung bei Formalitäten</li>
        <li>Nachbetreuung am Zielort</li>
      </ul>
      
      <h2>Kostenvorteile durch regelmäßige Route</h2>
      <p>Durch die wöchentliche Verbindung können wir Leerfahrten vermeiden und diese Kostenersparnis an unsere Kunden weitergeben. Gleichzeitig garantieren wir flexiblere Terminplanung und kürzere Wartezeiten.</p>
      
      <p>Planen Sie einen Umzug nach Spanien? Kontaktieren Sie uns für ein unverbindliches Beratungsgespräch!</p>
    `,
    date: "2024-02-10",
    category: "Service",
    image: SpanienImage,
    author: "Thomas Müller",
    readTime: "5 min"
  },
  {
    slug: "digitale-auftragsabwicklung",
    title: "Neue digitale Plattform für Auftragsabwicklung",
    teaser: "Unsere neue Online-Plattform macht die Auftragsabwicklung noch einfacher. Von der Anfrage bis zur Abrechnung - alles digital und transparent.",
    content: `
      <p>Wir freuen uns, Ihnen unsere brandneue digitale Plattform für die Auftragsabwicklung vorstellen zu können. Diese innovative Lösung revolutioniert die Art und Weise, wie Sie unsere Dienstleistungen buchen und verfolgen können.</p>
      
      <h2>Einfache Online-Buchung</h2>
      <p>Mit unserer neuen Plattform können Sie:</p>
      <ul>
        <li>Umzüge und Transporte online kalkulieren lassen</li>
        <li>Termine direkt im System buchen</li>
        <li>Zusatzleistungen einfach hinzufügen</li>
        <li>Kostenvoranschläge in Echtzeit erhalten</li>
      </ul>
      
      <h2>Transparente Verfolgung</h2>
      <p>Behalten Sie jederzeit den Überblick über Ihren Auftrag:</p>
      <ul>
        <li>Live-Tracking des Transportfahrzeugs</li>
        <li>Statusupdates in Echtzeit</li>
        <li>Kommunikation direkt über die Plattform</li>
        <li>Fotodokumentation bei Bedarf</li>
      </ul>
      
      <h2>Digitale Dokumentation</h2>
      <p>Alle wichtigen Dokumente sind digital verfügbar:</p>
      <ul>
        <li>Verträge und Auftragsbestätigungen</li>
        <li>Inventarlisten mit Fotos</li>
        <li>Schadensberichte</li>
        <li>Rechnungen und Belege</li>
      </ul>
      
      <h2>Mobile App</h2>
      <p>Zusätzlich zur Web-Plattform bieten wir eine mobile App für iOS und Android. Diese ermöglicht es Ihnen, auch unterwegs auf alle Funktionen zuzugreifen und wichtige Updates zu erhalten.</p>
      
      <h2>Datenschutz und Sicherheit</h2>
      <p>Ihre Daten sind bei uns in sicheren Händen. Die Plattform erfüllt höchste Sicherheitsstandards und ist DSGVO-konform. Alle Übertragungen sind verschlüsselt und werden auf deutschen Servern gespeichert.</p>
      
      <p>Die neue Plattform ist ab sofort verfügbar. Registrieren Sie sich noch heute und erleben Sie, wie einfach und transparent Auftragsabwicklung sein kann!</p>
    `,
    date: "2024-01-20",
    category: "Innovation",
    image: DigitalImage,
    author: "IT-Team Stöber",
    readTime: "4 min"
  },
  {
    slug: "ausbildungsplaetze-2024",
    title: "Ausbildungsplätze 2024 - Jetzt bewerben!",
    teaser: "Wir bilden aus! Für das Jahr 2024 bieten wir wieder Ausbildungsplätze in verschiedenen Bereichen an. Starten Sie Ihre Karriere bei Stöber Transporte.",
    content: `
      <p>Die Zukunft braucht qualifizierten Nachwuchs! Auch in diesem Jahr bietet Stöber Transporte wieder vielfältige Ausbildungsmöglichkeiten für motivierte junge Menschen an. Werden Sie Teil unseres Teams und starten Sie Ihre berufliche Laufbahn in einem zukunftsorientierten Unternehmen.</p>
      
      <h2>Unsere Ausbildungsberufe 2024</h2>
      
      <h3>Berufskraftfahrer/in (m/w/d)</h3>
      <ul>
        <li>Dauer: 3 Jahre</li>
        <li>Führerschein Klasse CE wird vermittelt</li>
        <li>Moderne Fahrzeugflotte</li>
        <li>Nationale und internationale Einsätze</li>
      </ul>
      
      <h3>Kaufmann/frau für Spedition und Logistikdienstleistung (m/w/d)</h3>
      <ul>
        <li>Dauer: 3 Jahre</li>
        <li>Kundenbetreuung und Auftragsabwicklung</li>
        <li>Disposition und Routenplanung</li>
        <li>Controlling und Kalkulation</li>
      </ul>
      
      <h3>Fachlagerist/in (m/w/d)</h3>
      <ul>
        <li>Dauer: 2 Jahre</li>
        <li>Warenwirtschaftssysteme</li>
        <li>Kommissionierung und Verpackung</li>
        <li>Qualitätskontrolle</li>
      </ul>
      
      <h2>Was wir bieten</h2>
      <ul>
        <li><strong>Faire Ausbildungsvergütung:</strong> Übertarifliche Bezahlung</li>
        <li><strong>Moderne Ausstattung:</strong> Neueste Technik und Fahrzeuge</li>
        <li><strong>Erfahrene Ausbilder:</strong> Persönliche Betreuung</li>
        <li><strong>Übernahmechancen:</strong> Beste Aussichten nach der Ausbildung</li>
        <li><strong>Weiterbildung:</strong> Förderung von Zusatzqualifikationen</li>
        <li><strong>Teamgeist:</strong> Kollegiale Arbeitsatmosphäre</li>
      </ul>
      
      <h2>Voraussetzungen</h2>
      <ul>
        <li>Hauptschulabschluss oder höher</li>
        <li>Zuverlässigkeit und Pünktlichkeit</li>
        <li>Teamfähigkeit und Kommunikationsstärke</li>
        <li>Interesse an Logistik und Transport</li>
        <li>Für Berufskraftfahrer: Mindestalter 18 Jahre</li>
      </ul>
      
      <h2>So bewerben Sie sich</h2>
      <p>Senden Sie Ihre vollständigen Bewerbungsunterlagen an:</p>
      <ul>
        <li>E-Mail: bewerbung@stoeber-transporte.de</li>
        <li>Post: Stöber Transporte GmbH, Westtangente 4, 79395 Neuenburg</li>
        <li>Online: Über unser Bewerberportal</li>
      </ul>
      
      <p>Haben Sie Fragen zur Ausbildung? Rufen Sie uns an unter +49 (0)7631 7400600 oder besuchen Sie uns für ein persönliches Gespräch. Wir freuen uns auf Ihre Bewerbung!</p>
    `,
    date: "2024-01-05",
    category: "Karriere",
    image: KarriereImage,
    author: "Personalabteilung",
    readTime: "6 min"
  }
];

export function getArticleBySlug(slug: string): NewsArticle | null {
  return newsArticles.find(article => article.slug === slug) || null;
}

export function getAllArticles(): NewsArticle[] {
  return newsArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getRelatedArticles(currentSlug: string, limit: number = 3): NewsArticle[] {
  return newsArticles
    .filter(article => article.slug !== currentSlug)
    .slice(0, limit);
}

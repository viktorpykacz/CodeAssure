import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface DocFrontmatter {
  title: string;
  description?: string;
  date?: string;
  tags?: string[];
  order?: number;
  author?: string;
  [key: string]: unknown;
}

export interface DocMeta {
  slug: string;
  category: string;
  categoryTitle: string;
  title: string;
  description?: string;
  date?: string;
  tags?: string[];
  order: number;
  readingTimeMinutes: number;
}

export interface DocHeading {
  level: number;
  text: string;
  id: string;
}

export interface DocData extends DocMeta {
  content: string;
  headings: DocHeading[];
}

export interface CategoryInfo {
  slug: string;
  title: string;
  description: string;
  iconName: string;
  docCount: number;
  docs: DocMeta[];
}

const CONTENT_DIR = path.join(process.cwd(), "content");

// Known category titles and descriptions for rich presentation
const CATEGORY_METADATA: Record<
  string,
  { title: string; description: string; iconName: string }
> = {
  testing: {
    title: "Software Testing & QA",
    description: "Zasady testowania, poziomy testów, ISTQB, automatyzacja i najlepsze praktyki inżynierii jakości.",
    iconName: "CheckSquare",
  },
  dotnet: {
    title: ".NET & C# Programming",
    description: "Zaawansowane techniki programowania w C#, architektura .NET, async/await oraz wzorce projektowe.",
    iconName: "Terminal",
  },
  java: {
    title: "Java & JVM Ecosystem",
    description: "Nowoczesna Java (Java 17 - 21+ LTS), architektura JVM, programowanie obiektowe, rekordy, strumienie oraz wątki wirtualne.",
    iconName: "Coffee",
  },
  frontend: {
    title: "Frontend Development",
    description: "Podstawy technologii webowych: semantyczny HTML5, nowoczesny CSS (Flexbox, Grid), architektura stylów oraz biblioteka jQuery.",
    iconName: "Layout",
  },
  "interview-questions": {
    title: "Interview Questions",
    description: "Przygotowanie do rozmów rekrutacyjnych: SOLID, algorytmy, zarządzanie pamięcią i architektura.",
    iconName: "HelpCircle",
  },
  "general-it": {
    title: "General IT Concepts",
    description: "Koncepcje architektoniczne, protokoły sieciowe, bezpieczeństwo oraz podstawy inżynierii oprogramowania.",
    iconName: "Cpu",
  },
  python: {
    title: "Python Programming",
    description: "Architektura CPython, model obiektowy, współbieżność (GIL, asyncio, multiprocessing), zarządzanie pamięcią oraz optymalizacja.",
    iconName: "Terminal",
  },
  "c-cpp": {
    title: "C & C++ Programming",
    description: "Programowanie systemowe i niskopoziomowe: zarządzanie pamięcią, wskaźniki, model pamięci, RAII, szablony, nowoczesny C++ (C++11 do C++23) oraz pytania rekrutacyjne.",
    iconName: "Cpu",
  },
  "ai-ml": {
    title: "AI & Machine Learning",
    description: "Fundamenty uczenia maszynowego (Supervised/Unsupervised), matematyka ML, Deep Learning, sieci neuronowe, architektura Transformerów, MLOps oraz pytania rekrutacyjne.",
    iconName: "Cpu",
  },
};

/**
 * Format raw category folder name into a human-friendly title.
 */
export function formatCategoryTitle(categorySlug: string): string {
  if (CATEGORY_METADATA[categorySlug]) {
    return CATEGORY_METADATA[categorySlug].title;
  }
  return categorySlug
    .replace(/[-_]/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Format category description
 */
export function getCategoryDescription(categorySlug: string): string {
  if (CATEGORY_METADATA[categorySlug]) {
    return CATEGORY_METADATA[categorySlug].description;
  }
  return `Artykuły i materiały z kategorii ${formatCategoryTitle(categorySlug)}.`;
}

/**
 * Get category icon identifier
 */
export function getCategoryIconName(categorySlug: string): string {
  return CATEGORY_METADATA[categorySlug]?.iconName || "Folder";
}

/**
 * Estimates reading time in minutes
 */
function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

/**
 * Extracts H2 and H3 headings from markdown content
 */
export function extractHeadings(markdown: string): DocHeading[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: DocHeading[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim().replace(/[*_`]/g, "");
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    headings.push({ level, text, id });
  }

  return headings;
}

/**
 * Checks if content directory exists
 */
function ensureContentDirExists(): boolean {
  return fs.existsSync(CONTENT_DIR);
}

/**
 * Get all categories with their docs
 */
export async function getAllCategories(): Promise<CategoryInfo[]> {
  if (!ensureContentDirExists()) {
    return [];
  }

  const entries = fs.readdirSync(CONTENT_DIR, { withFileTypes: true });
  const categoryFolders = entries.filter((entry) => entry.isDirectory());

  const categories: CategoryInfo[] = [];

  for (const folder of categoryFolders) {
    const categorySlug = folder.name;
    const docs = await getCategoryDocs(categorySlug);

    if (docs.length > 0) {
      categories.push({
        slug: categorySlug,
        title: formatCategoryTitle(categorySlug),
        description: getCategoryDescription(categorySlug),
        iconName: getCategoryIconName(categorySlug),
        docCount: docs.length,
        docs,
      });
    }
  }

  // Sort categories by predefined priority if available
  const knownOrder = ["testing", "dotnet", "java", "python", "frontend", "interview-questions", "general-it"];
  categories.sort((a, b) => {
    const indexA = knownOrder.indexOf(a.slug);
    const indexB = knownOrder.indexOf(b.slug);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.title.localeCompare(b.title);
  });

  return categories;
}

/**
 * Get all document metadata within a specific category
 */
export async function getCategoryDocs(categorySlug: string): Promise<DocMeta[]> {
  const categoryDir = path.join(CONTENT_DIR, categorySlug);
  if (!fs.existsSync(categoryDir)) {
    return [];
  }

  const files = fs.readdirSync(categoryDir);
  const markdownFiles = files.filter(
    (file) => file.endsWith(".md") || file.endsWith(".mdx")
  );

  const docs: DocMeta[] = [];

  for (const file of markdownFiles) {
    const slug = file.replace(/\.(md|mdx)$/, "");
    const filePath = path.join(categoryDir, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data: frontmatter, content } = matter(fileContent);

    docs.push({
      slug,
      category: categorySlug,
      categoryTitle: formatCategoryTitle(categorySlug),
      title: frontmatter.title || slug.replace(/[-_]/g, " "),
      description: frontmatter.description || "",
      date: frontmatter.date || "",
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
      order: typeof frontmatter.order === "number" ? frontmatter.order : 99,
      readingTimeMinutes: calculateReadingTime(content),
    });
  }

  // Sort by order ascending, then by title
  docs.sort((a, b) => {
    if (a.order !== b.order) {
      return a.order - b.order;
    }
    return a.title.localeCompare(b.title);
  });

  return docs;
}

/**
 * Get all docs flattened across all categories
 */
export async function getAllDocs(): Promise<DocMeta[]> {
  const categories = await getAllCategories();
  return categories.flatMap((cat) => cat.docs);
}

/**
 * Get a specific doc by category and slug
 */
export async function getDocBySlug(
  categorySlug: string,
  slug: string
): Promise<DocData | null> {
  const possibleExtensions = [".md", ".mdx"];
  let filePath: string | null = null;

  for (const ext of possibleExtensions) {
    const candidate = path.join(CONTENT_DIR, categorySlug, `${slug}${ext}`);
    if (fs.existsSync(candidate)) {
      filePath = candidate;
      break;
    }
  }

  if (!filePath) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data: frontmatter, content } = matter(fileContent);

  const headings = extractHeadings(content);
  const readingTimeMinutes = calculateReadingTime(content);

  return {
    slug,
    category: categorySlug,
    categoryTitle: formatCategoryTitle(categorySlug),
    title: frontmatter.title || slug.replace(/[-_]/g, " "),
    description: frontmatter.description || "",
    date: frontmatter.date || "",
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
    order: typeof frontmatter.order === "number" ? frontmatter.order : 99,
    readingTimeMinutes,
    content,
    headings,
  };
}

/**
 * Get paths for static generation (generateStaticParams)
 */
export async function getAllDocPaths(): Promise<
  { category: string; slug: string }[]
> {
  const docs = await getAllDocs();
  return docs.map((doc) => ({
    category: doc.category,
    slug: doc.slug,
  }));
}

/**
 * Get previous and next documents within the same category
 */
export async function getAdjacentDocs(
  categorySlug: string,
  currentSlug: string
): Promise<{ prev: DocMeta | null; next: DocMeta | null }> {
  const docs = await getCategoryDocs(categorySlug);
  const currentIndex = docs.findIndex((d) => d.slug === currentSlug);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  const prev = currentIndex > 0 ? docs[currentIndex - 1] : null;
  const next = currentIndex < docs.length - 1 ? docs[currentIndex + 1] : null;

  return { prev, next };
}

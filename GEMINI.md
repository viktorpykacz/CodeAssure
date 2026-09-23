# CodeAssure — Kontekst Projektu i Reguły dla Agenta (GEMINI.md)

Ten plik definiuje pełny kontekst architektoniczny, stos technologiczny, strukturę bazy wiedzy oraz ścisłe reguły pracy dla asystentów AI (Antigravity CLI / Gemini) w repozytorium **CodeAssure**.

---

## 1. Przegląd i Cel Projektu

**CodeAssure** to nowoczesny, lokalny portal dokumentacji i platforma bazy wiedzy technicznej przeznaczona dla inżynierów oprogramowania, programistów (.NET, Java, Frontend) oraz specjalistów QA. 

Aplikacja dynamicznie skanuje lokalne pliki Markdown, parsuje metadane (YAML Frontmatter), generuje statyczne strony (SSG) oraz prezentuje treści w czytelnym interfejsie z interaktywnymi diagramami Mermaid, podświetlaniem składni kodu, dynamiczną nawigacją, wyszukiwarką i spisem treści.

---

## 2. Stos Technologiczny

* **Framework:** Next.js (App Router, Turbopack)
* **Język:** TypeScript (Strict mode)
* **Styling:** Tailwind CSS z wtyczką `@tailwindcss/typography` (klasa `prose`)
* **Parser Markdown i Metadanych:**
  - `gray-matter`: Parsowanie nagłówków YAML Frontmatter
  - `react-markdown`: Renderowanie struktury AST do komponentów React
  - `remark-gfm`: Wsparcie dla tabel, list zadań i rozszerzeń GitHub Flavored Markdown
  - `rehype-highlight`: Kolorowanie składni bloków kodu
* **Ikony & Wizualizacje:** `lucide-react`, natywne diagramy `mermaid` (renderowane przez dedykowany komponent `MermaidDiagram.tsx`)

---

## 3. ŻELAZNA ZASADA ZARZĄDZANIA PLIKAMI WIEDZY

> [!IMPORTANT]
> **WSZYSTKIE pliki z wiedzą i artykułami MUSZĄ znajdować się w katalogu `/content` i TYLKO TAM.**
> 
> * **Bezwzględny zakaz** tworzenia plików artykułów w katalogu głównym repozytorium, w folderach tymczasowych (np. `interview_guides/`, `docs/`) czy w wewnętrznym katalogu `.gemini/`.
> * Każdy nowy plik markdown z wiedzą **musi** być umieszczony w odpowiednim podfolderze kategorii wewnątrz `/content/`:
>   - `/content/frontend/` — HTML, CSS, JavaScript, TypeScript, frameworki frontendowe.
>   - `/content/dotnet/` — C#, platforma .NET, ASP.NET, async/await, wzorce projektowe.
>   - `/content/java/` — Java, JVM, architektura Spring, wielowątkowość.
>   - `/content/testing/` — QA, ISTQB, automatyzacja, poziomy testów, piramida testów.
>   - `/content/general-it/` — Protokoły sieciowe, Git, systemy rozproszone, Kafka, bazy danych, konteneryzacja.
>   - `/content/interview-questions/` — Pytania przekrojowe, algorytmy, zasady SOLID, wzorce architektoniczne.
>   - *Nowe kategorie:* W razie potrzeby utworzenia nowego obszaru należy stworzyć nowy folder w `/content/<nazwa-kategorii>/`.

---

## 4. Standard i Wymogi Plików Markdown (Frontmatter)

Każdy plik w `/content/<kategoria>/<slug>.md` **musi** rozpoczynać się blokiem YAML Frontmatter o następującej strukturze:

```yaml
---
title: "Tytuł Artykułu — Pełna i Profesjonalna Nazwa"
description: "Zwięzłe (1-2 zdania) streszczenie artykułu wyświetlane na kartach i w wyszukiwarce."
date: "YYYY-MM-DD"
tags: ["Tag1", "Tag2", "Interview", "Kategoria"]
order: 1
---
```

### Wytyczne dotyczące pól:
* `title`: Czytelny, techniczny tytuł (np. *„Git - Niskopoziomowa Architektura, Przepływ Pracy i Pytania Rekrutacyjne”*).
* `description`: Podsumowanie kluczowych tematów i zagadnień poruszanych w dokumencie.
* `date`: Bieżąca data w formacie ISO (`YYYY-MM-DD`).
* `tags`: Lista słów kluczowych ułatwiających indeksowanie i wyszukiwanie w `SearchModal`.
* `order`: Liczba całkowita określająca kolejność wyświetlania artykułu w pasku bocznym (Sidebar) w ramach danej kategorii.

---

## 5. Standard Jakości Treści Artykułów

Tworząc artykuły z wiedzą i pytaniami rekrutacyjnymi:
1. **Głębokie fundamenty i architektura:** Nie poprzestawać na podstawach — omawiać mechanizmy niskopoziomowe (pamięć, cykl życia, wewnętrzne struktury, złożoność obliczeniowa).
2. **Diagramy Mermaid:** Wzbogacać złożone procesy o diagramy blokowe lub sekwencji (`flowchart TD`, `sequenceDiagram`).
3. **Praktyczne przykłady kodu:** Czysty, formatowany kod z komentarzami i objaśnieniami dobrych/złych praktyk.
4. **Sekcja Pytań Rekrutacyjnych (FAQ / Interview Questions):** Każdy artykuł powinien kończyć się dedykowaną sekcją pytań rekrutacyjnych (od pytań koncepcyjnych po pytania typu deep-dive i analizę trudnych przypadków produkcyjnych / troubleshooting).

---

## 6. Architektura Kodu i Struktura Projektu

```
CodeAssure/
├── content/                    <-- JEDYNE MIEJSCE NA ARTYKUŁY I WIEDZĘ
│   ├── dotnet/
│   ├── frontend/
│   ├── general-it/
│   ├── interview-questions/
│   ├── java/
│   └── testing/
├── src/
│   ├── app/
│   │   ├── docs/
│   │   │   ├── [category]/
│   │   │   │   ├── [slug]/     <-- Dynamiczna strona artykułu (/docs/[category]/[slug])
│   │   │   │   └── page.tsx    <-- Lista artykułów w danej kategorii (/docs/[category])
│   │   │   ├── layout.tsx      <-- Układ dokumentacji z Sidebarem i spisem treści
│   │   │   └── page.tsx        <-- Strona główna dokumentacji
│   │   ├── layout.tsx          <-- Główny root layout
│   │   └── page.tsx            <-- Strona powitalna (Landing page z kartami kategorii)
│   ├── components/             <-- Komponenty UI (Sidebar, Navbar, SearchModal, MarkdownRenderer, etc.)
│   └── lib/
│       └── markdown.ts         <-- Silnik parsowania gray-matter, wyciągania nagłówków i czytania plików
├── GEMINI.md                   <-- Ten plik (Reguły i kontekst dla agenta AI)
└── package.json
```

---

## 7. Podstawowe Polecenia Developerskie

* `npm run dev`: Uruchomienie lokalnego serwera deweloperskiego (Next.js Turbopack).
* `npm run build`: Pełna kompilacja projektu, weryfikacja typów TypeScript oraz generowanie statycznych podstron dla wszystkich plików z `/content`.
* `npm run lint`: Uruchomienie reguł ESLint.

---

## 8. Wytyczne dla Agenta podczas Tworzenia Nowych Treści

Gdy użytkownik prosi o przygotowanie wiedzy z nowego obszaru:
1. Zidentyfikuj właściwą kategorię w `/content/` (lub zaproponuj nową, logiczną nazwę folderu wewnątrz `/content/`).
2. Sprawdź najwyższy istniejący parametr `order` w danej kategorii, aby poprawnie ustalić kolejność nowego dokumentu.
3. Utwórz plik markdown bezpośrednio pod ścieżką:
   `content/<kategoria>/<nazwa-zagadnienia>.md`
4. Upewnij się, że plik posiada kompletny nagłówek Frontmatter.
5. Po utworzeniu lub modyfikacji plików zweryfikuj spójność wykonując `npm run build`.

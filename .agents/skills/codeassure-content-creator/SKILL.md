---
name: codeassure-content-creator
description: >-
  Use this skill when the user asks to prepare, write, or generate technical knowledge,
  documentation, or interview questions on any topic (e.g. "przygotuj mi wiedzę z zakresu X",
  "stwórz artykuł o X", "dodaj wiedzę i pytania z X") for the CodeAssure portal.
---

# CodeAssure Content Creator Skill

Ten skill automatyzuje proces przygotowywania kompleksowych, profesjonalnych artykułów technicznych z pytaniami rekrutacyjnymi i publikowania ich bezpośrednio w bazie wiedzy portalu **CodeAssure**.

---

## Żelazna Zasada Lokalizacji Plików

> [!IMPORTANT]
> **WSZYSTKIE pliki artykułów MUSZĄ być zapisywane bezpośrednio w katalogu `content/<kategoria>/<slug>.md` i NIGDZIE INDZIEJ.**
> * Zakaz zapisywania w katalogu głównym projektu, w folderach tymczasowych ani w katalogu `.gemini/`.

---

## Procedura Krok po Kroku

### Krok 1: Dobór Kategorii w `content/`
Przeanalizuj temat podany przez użytkownika i przypisz go do odpowiedniego podfolderu w `content/`:
* `frontend`: HTML, CSS, JavaScript, TypeScript, frameworki (React, Vue, Angular, Svelte), bundlery (Vite, Webpack), standardy Web/DOM, a11y.
* `dotnet`: C#, .NET Runtime (CLR), ASP.NET Core, Entity Framework Core, wielowątkowość, asynchroniczność (async/await), zarządzanie pamięcią w .NET.
* `java`: Java, JVM, Spring Framework / Spring Boot, Hibernate, wielowątkowość (Virtual Threads, ExecutorService), Garbage Collection (G1, ZGC).
* `testing`: Teoria testowania, ISTQB, piramida testów, automatyzacja (Selenium, Playwright, Cypress), testy jednostkowe, integracyjne, wydajnościowe, TDD.
* `general-it`: Protokoły sieciowe (HTTP/HTTPS, gRPC, WebSocket), Git, bazy danych (SQL, NoSQL), systemy kolejkowe i streaming (Kafka, RabbitMQ), konteneryzacja (Docker, Kubernetes), Linux, systemy rozproszone.
* `interview-questions`: Pytania przekrojowe, algorytmy i struktury danych, zasady SOLID, wzorce projektowe GoF, architektura systemowa.
* *Nowa kategoria:* Jeśli temat wyraźnie nie pasuje do powyższych, utwórz nowy podfolder `content/<nazwa-kategorii>/` w notacji `kebab-case`.

---

### Krok 2: Ustalenie Parametru `order` i Nazwy Pliku (`slug.md`)
1. Sprawdź istniejące pliki w wybranym folderze:
   ```powershell
   Get-ChildItem -Path "content/<kategoria>" -Filter "*.md"
   ```
2. Odczytaj wartość `order` w nagłówkach istniejących plików. Nowy plik powinien otrzymać kolejny wolny numer: `order = max(order) + 1`.
3. Dobierz nazwę pliku (`slug.md`) w języku polskim lub angielskim (zgodnie z konwencją danej kategorii), używając formatu `kebab-case` (np. `docker-konteneryzacja.md`, `wielowatkowosc-i-jvm.md`).

---

### Krok 3: Wygenerowanie Nagłówka YAML Frontmatter
Każdy plik musi bezwzględnie rozpoczynać się blokiem Frontmatter:

```yaml
---
title: "Pełny Tytuł Artykułu - Zagadnienia i Pytania Rekrutacyjne"
description: "Zwięzłe (1-2 zdania) streszczenie poruszanych tematów, które wyświetli się na kartach i w wyszukiwarce portalu."
date: "YYYY-MM-DD"
tags: ["Tag1", "Tag2", "Tag3", "Interview", "Kategoria"]
order: 4
---
```

---

### Krok 4: Opracowanie Merytoryczne Treści (Standard CodeAssure)
Artykuł musi być wyczerpujący i trzymać wysoki standard inżynierski:
1. **Wstęp i Architektura:** Wyjaśnienie konceptu, dlaczego dane rozwiązanie powstało i jakie problemy rozwiązuje.
2. **Mechanizmy Niskopoziomowe / Deep Dive:**
   - Wewnętrzna budowa (np. zarządzanie pamięcią, cykl życia, struktury danych, algorytmy, złożoność obliczeniowa).
   - Diagramy Mermaid (`flowchart TD`, `sequenceDiagram`, `stateDiagram-v2`) ilustrujące przepływ danych lub procesy architektoniczne.
3. **Przykłady Kodu:**
   - Czysty, nowoczesny kod z komentarzami.
   - Wskazanie typowych antywzorców i dobrych praktyk (*Good vs Bad practice*).
4. **Sekcja Pytań Rekrutacyjnych (FAQ / Interview Questions):**
   - Poziom Mid (pytania fundamentowe i mechanika działania).
   - Poziom Senior / Lead (trudne niuanse, kompromisy architektoniczne / trade-offs, optymalizacja).
   - **Scenariusze Awaryjne (Troubleshooting Live-fire):** Realne problemy produkcyjne (wycieki pamięci, wąskie gardła, spadki wydajności) wraz z analizą krok po kroku i rozwiązaniem.
5. **Tablica Szybkiej Powtórki (Cheat-Sheet):**
   - Tabela zestawiająca kluczowe pojęcia, parametry i terminy techniczne do powtórzenia tuż przed rozmową.

---

### Krok 5: Zapis i Weryfikacja Kompilacji Portalu
1. Zapisz wygenerowaną treść w docelowej ścieżce:
   `content/<kategoria>/<slug>.md`
2. Uruchom weryfikację budowania projektu w terminalu:
   ```powershell
   npm run build
   ```
3. Upewnij się, że polecenie zakończyło się z kodem 0 oraz że Next.js z sukcesem wygenerował statyczną stronę SSG (np. `/docs/<kategoria>/<slug>`).

---

### Krok 6: Podsumowanie dla Użytkownika
Przedstaw użytkownikowi zwięzłe podsumowanie:
* Bezpośredni link do utworzonego pliku markdown: `[plik.md](file:///sciezka/do/pliku)`.
* Trasa w portalu: `/docs/<kategoria>/<slug>`.
* Główne sekcje merytoryczne i zagadnienia poruszone w artykule.

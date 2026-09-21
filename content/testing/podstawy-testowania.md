---
title: "Podstawy Testowania Oprogramowania - Kompendium Wiedzy (Manual & Auto)"
description: "Kompleksowy przewodnik po fundamentach QA: teoria ISTQB, techniki projektowania testów, cykl życia błędu, narzędzia (DevTools, Postman, SQL), wprowadzenie do automatyzacji oraz ponad 25 kluczowych pytań rekrutacyjnych."
date: "2026-03-16"
tags: ["QA", "Testing", "Manual Testing", "Test Automation", "ISTQB", "Bug Lifecycle", "Interview Questions", "API Testing", "Playwright"]
order: 1
---

## 1. Wprowadzenie i Fundamenty Teoretyczne

Testowanie oprogramowania to nie tylko wyszukiwanie usterek na gotowym produkcie. To proces planowania, analizy, projektowania i realizacji weryfikacji przez cały cykl życia oprogramowania (SDLC – *Software Development Life Cycle*), którego nadrzędnym celem jest minimalizacja ryzyka biznesowego oraz dostarczenie produktu spełniającego oczekiwania użytkowników.

---

### QA vs QC vs Testing – Różnice

W branży pojęcia te bywają mylone, jednak oznaczają różne poziomy odpowiedzialności za jakość:

| Pojęcie | Pełna nazwa | Zakres | Cel | Podejście |
|:---|:---|:---|:---|:---|
| **QA** | *Quality Assurance* (Zapewnienie Jakości) | Procesy, standardy, metodyki w całym zespole | Zapobieganie powstawaniu defektów (*defect prevention*) | Proaktywne (audyty, usprawnianie procesów) |
| **QC** | *Quality Control* (Kontrola Jakości) | Weryfikacja gotowego produktu lub jego części | Wykrywanie usterek w wytworzonym produkcie (*defect detection*) | Reaktywne (sprawdzanie zgodności ze specyfikacją) |
| **Testing** | *Software Testing* (Testowanie) | Wykonywanie testów, analiza wyników, raportowanie | Dostarczenie informacji o stanie faktycznym systemu | Operacyjne (uruchamianie przypadków testowych) |

> **Wskazówka rekrutacyjna:**
> Tester manualny czy automatyzujący najczęściej wykonuje zadania z obszaru **Testing** i **QC**, ale dojrzały inżynier QA dba o to, by błędy w ogóle nie powstawały – np. poprzez analizę wymagań zanim programista napisze choćby jedną linijkę kodu.

---

### Błąd, Defekt i Awaria (Error vs Defect vs Failure)

Według standardu ISTQB precyzyjnie rozróżniamy trzy stany:

```mermaid
flowchart LR
    A["Błąd ludzki\n(Error / Mistake)"] -->|"powoduje powstanie"| B["Defekt w kodzie / dok.\n(Defect / Bug)"]
    B -->|"uruchomienie kodu wywołuje"| C["Awaria systemu\n(Failure)"]
```

1. **Błąd ludzki (Error / Mistake):** Pomyłka popełniona przez człowieka (programistę, analityka biznesowego, architekta), np. pomyłka w operatorze logicznym `>` zamiast `>=`.
2. **Defekt / Usterka (Defect / Bug / Fault):** Manifestacja błędu w artefakcie (kodzie źródłowym, dokumentacji wymagań, konfiguracji bazy danych).
3. **Awaria (Failure):** Odchylenie zachowania działającego systemu od zachowania oczekiwanego, zauważalne dla użytkownika końcowego podczas wykonywania kodu.

> **Ważne:** Nie każdy defekt w kodzie prowadzi do awarii – wadliwy kod może nigdy nie zostać wykonany lub defekt może zostać zamaskowany przez inny fragment logiki.

---

### 7 Zasad Testowania według ISTQB v4.0

Zasady te stanowią fundament inżynierii testów i chronią zespoły przed nierealistycznymi oczekiwaniami:

1. **Testowanie ujawnia usterki, ale nie może dowieść ich braku.**  
   Nawet jeśli 1000 testów zakończy się sukcesem, nie ma gwarancji, że w systemie nie ma już żadnego błędu. Testowanie zmniejsza prawdopodobieństwo wystąpienia awarii, ale nie daje 100% pewności bezbłędności.
2. **Testowanie gruntowne (wyczerpujące) jest niemożliwe.**  
   Przetestowanie wszystkich możliwych kombinacji danych wejściowych, ścieżek wykonania i warunków brzegowych zajęłoby wieczność. Dlatego stosujemy analizę ryzyka oraz techniki projektowania testów.
3. **Wczesne testowanie oszczędza czas i pieniądze (Shift-Left).**  
   Koszt naprawy błędu wykrytego na etapie specyfikacji jest nawet 50–100 razy niższy niż naprawa tego samego błędu na produkcji. Testowanie powinno zacząć się od przeglądu wymagań.
4. **Kumulowanie się defektów (Zasada Pareto 80/20).**  
   Zazwyczaj około 80% defektów koncentruje się w 20% modułów aplikacji (np. moduły o wysokiej złożoności algorytmicznej, częstych zmianach lub słabej architekturze).
5. **Paradoks pestycydów.**  
   Wielokrotne powtarzanie tych samych testów przestaje wykrywać nowe usterki (tak jak insekty uodparniają się na pestycydy). Zestawy testów muszą być stale ewaluowane i rozbudowywane o nowe scenariusze.
6. **Testowanie zależy od kontekstu.**  
   Aplikację bankową testujemy z naciskiem na bezpieczeństwo, precyzję finansową i zgodność z regulacjami prawnymi, natomiast grę mobilną pod kątem płynności animacji, responsywności i intuicyjności UX.
7. **Iluzja braku błędów.**  
   System, w którym naprawiono wszystkie zgłoszone błędy i który w 100% realizuje specyfikację, wciąż może okazać się porażką rynkową, jeśli nie rozwiązuje realnych problemów użytkowników ani nie spełnia ich oczekiwań biznesowych.

---

### Weryfikacja vs Walidacja

- **Weryfikacja (Verification):** *"Czy budujemy produkt poprawnie?"* – sprawdzanie zgodności produktu ze specyfikacją techniczną, planem i standardami (np. review kodu, inspekcja wymagań, testy jednostkowe).
- **Walidacja (Validation):** *"Czy budujemy poprawny produkt?"* – sprawdzanie, czy produkt spełnia rzeczywiste potrzeby klienta i użytkowników w środowisku docelowym (np. testy akceptacyjne UAT, testy beta).

---

## 2. Poziomy i Typy Testowania

Aby testowanie było efektywne, dzielimy je na warstwy architektoniczne oraz kategorie weryfikowanych cech oprogramowania.

---

### Poziomy Testów

```mermaid
flowchart TD
    UAT["4. Testy Akceptacyjne (UAT) - Zgodność z biznesem"]
    System["3. Testy Systemowe (E2E) - Całość systemu"]
    Integration["2. Testy Integracyjne - Interfejsy i moduły"]
    Unit["1. Testy Jednostkowe - Najmniejsze komponenty"]

    Unit --> Integration
    Integration --> System
    System --> UAT
```

#### 1. Testy Jednostkowe (Unit Tests)
- **Co badają:** Najmniejsze testowalne części aplikacji w całkowitej izolacji (pojedyncze funkcje, metody, klasy).
- **Kto wykonuje:** Głównie programiści (z wykorzystaniem frameworków takich jak xUnit, NUnit, Jest, JUnit).
- **Cechy:** Błyskawiczne wykonanie (milisekundy), zależności zewnętrzne są zastępowane atrapami (*Mock*, *Stub*, *Fake*).

#### 2. Testy Integracyjne (Integration Tests)
- **Co badają:** Interakcje i przepływ danych pomiędzy modułami, bazą danych, zewnętrznymi usługami REST/SOAP lub kolejkami (RabbitMQ, Kafka).
- **Kto wykonuje:** Programiści oraz testerzy automatyzujący (często z użyciem kontenerów, np. Testcontainers).

#### 3. Testy Systemowe (System / End-to-End Tests)
- **Co badają:** Zintegrowany, kompletny system pod kątem wymagań funkcjonalnych i niefunkcjonalnych w środowisku zbliżonym do produkcyjnego.
- **Kto wykonuje:** Testerzy manualni oraz inżynierowie automatyzacji (z użyciem Playwright, Cypress, Selenium).

#### 4. Testy Akceptacyjne (UAT - User Acceptance Testing)
- **Co badają:** Gotowość systemu do wdrożenia biznesowego z perspektywy klienta lub użytkowników końcowych.
- **Formy:**
  - **Alfa-testy:** Wykonywane u producenta oprogramowania przez wewnętrznych użytkowników.
  - **Beta-testy:** Wykonywane w środowisku rzeczywistym przez zewnętrznych użytkowników przed oficjalną premierą.

---

### Typy Testów: Funkcjonalne vs Niefunkcjonalne

#### Testy Funkcjonalne
Sprawdzają **co** system robi (funkcje, zachowania, operacje biznesowe):
- **Smoke Tests (Testy dymne):** Szybki zestaw testów weryfikujący, czy kluczowe funkcje builda działają (np. czy aplikacja w ogóle wstaje, czy da się zalogować). Jeśli smoke test nie przechodzi, build jest natychmiast odrzucany.
- **Sanity Tests (Testy poprawnościowe):** Skupione testy sprawdzające, czy konkretna poprawka lub nowa funkcjonalność działa zgodnie z założeniami, bez uruchamiania pełnego zestawu regresji.
- **Regresja (Regression Testing):** Uruchomienie zestawu testów po wprowadzeniu zmian w kodzie, aby upewnić się, że nowe poprawki nie popsuły dotychczas działających funkcjonalności.
- **Retesty (Re-testing / Confirmation Testing):** Uruchomienie konkretnego testu, który wcześniej zakończył się niepowodzeniem, w celu potwierdzenia naprawy zgłoszonego defektu.

> **Różnica: Retest a Test Regresji**
> - **Retest:** Sprawdza wyłącznie, czy błąd XYZ został naprawiony.
> - **Regresja:** Sprawdza, czy naprawa błędu XYZ nie zepsuła innych modułów ABC.

#### Testy Niefunkcjonalne
Sprawdzają **jak** system działa (jakość, wydajność, bezpieczeństwo):
- **Testy wydajnościowe (Performance Testing):**
  - *Load Testing (obciążeniowe):* Zachowanie systemu pod oczekiwanym, standardowym obciążeniem.
  - *Stress Testing (stresowe):* Zachowanie systemu przy obciążeniu przekraczającym limity aż do załamania.
  - *Spike Testing:* Reakcja na gwałtowny, krótkotrwały skok ruchu.
  - *Soak / Endurance Testing:* Długotrwałe działanie pod obciążeniem (wykrywanie wycieków pamięci).
- **Testy bezpieczeństwa (Security Testing):** Wykrywanie podatności (OWASP Top 10, SQL Injection, XSS, CSRF, uprawnienia RBAC).
- **Testy użyteczności (Usability Testing):** Wygoda, ergonomia i intuicyjność interfejsu dla użytkownika.
- **Testy dostępności (Accessibility / a11y):** Zgodność ze standardem WCAG (dostępność dla osób z niepełnosprawnościami).

---

### Metody Testowania: Black-box, White-box, Grey-box

| Metoda | Nazwa | Wiedza o kodzie | Przykłady zastosowania |
|:---|:---|:---|:---|
| **Black-box** | Czarnoskrzynkowa | Brak znajomości wewnętrznej struktury kodu | Testy manualne UI, testy akceptacyjne, testy wymagań |
| **White-box** | Białoskrzynkowa (szklana skrzynka) | Pełny dostęp do kodu źródłowego, architektury i logiki | Testy jednostkowe, analiza pokrycia kodu (*code coverage*) |
| **Grey-box** | Szaroskrzynkowa | Częściowa znajomość wnętrza (np. schemat bazy danych, endpointy API) | Testowanie API ze znajomością bazy SQL, testy integracyjne |

---

## 3. Techniki Projektowania Testów (Test Design Techniques)

Projektowanie testów pozwala uniknąć testowania na oślep i wybrać minimalną liczbę przypadków testowych gwarantujących maksymalne pokrycie ryzyk.

---

### 1. Podział na Klasy Równoważności (Equivalence Partitioning - EP)

Dzielimy dziedzinę danych wejściowych na partycje (klasy), dla których system powinien zachować się identycznie. Wybieramy jednego reprezentanta z każdej klasy.

**Przykład biznesowy:**  
Pole wiek uprawniające do zniżki na bilet do kina:
- Poniżej 18 lat: Zniżka młodzieżowa (50%)
- Od 18 do 65 lat: Bilet standardowy (0%)
- Powyżej 65 lat: Zniżka seniorska (30%)
- Dozwolony zakres wieku: 1 do 120 lat.

| Klasa równoważności | Typ klasy | Wartość testowa (reprezentant) | Oczekiwany rezultat |
|:---|:---|:---|:---|
| Wiek < 1 | Niepoprawna | `0` lub `-5` | Błąd walidacji ("Nieprawidłowy wiek") |
| 1 ≤ Wiek ≤ 17 | Poprawna | `12` | Zniżka 50% |
| 18 ≤ Wiek ≤ 65 | Poprawna | `34` | Bilet standardowy |
| 66 ≤ Wiek ≤ 120 | Poprawna | `72` | Zniżka 30% |
| Wiek > 120 | Niepoprawna | `135` | Błąd walidacji ("Nieprawidłowy wiek") |
| Wartość nieliczbowa | Niepoprawna | `"abc"` | Błąd typu danych |

---

### 2. Analiza Wartości Brzegowych (Boundary Value Analysis - BVA)

Błędy programistyczne najczęściej występują na granicach klas równoważności (np. błąd typu *off-by-one*, użycie `<` zamiast `<=`).

**Zasada 2-punktowa (dla granicy):**
- Wartość brzegowa (*Boundary Value*)
- Wartość tuż za granicą

Dla warunku: **Pole hasła o długości od 8 do 16 znaków**:
- Granica dolna (8 znaków):
  - `7` znaków (tuż pod granicą – odrzucenie)
  - `8` znaków (na granicy – akceptacja)
- Granica górna (16 znaków):
  - `16` znaków (na granicy – akceptacja)
  - `17` znaków (tuż nad granicą – odrzucenie)

```
        Odrzucenie            Akceptacja           Odrzucenie
  [ ... 6 | 7 ] ---------> [ 8 . . . . 16 ] -------> [ 17 | 18 ... ]
           BVA                BVA    BVA                 BVA
```

---

### 3. Tablice Decyzyjne (Decision Tables)

Doskonałe narzędzie, gdy zachowanie systemu zależy od kombinacji wielu warunków logicznych.

**Przykład:** System sklepu internetowego przyznający darmową wysyłkę:
- Warunek 1: Wartość koszyka ≥ 200 PLN?
- Warunek 2: Czy użytkownik ma subskrypcję Premium?
- Warunek 3: Czy dostawa jest na terenie kraju?

| Warunki / Reguły | Reguła 1 | Reguła 2 | Reguła 3 | Reguła 4 |
|:---|:---:|:---:|:---:|:---:|
| Koszyk ≥ 200 PLN | Prawda | Fałsz | Prawda | Fałsz |
| Użytkownik Premium | Dowolne | Prawda | Fałsz | Fałsz |
| Dostawa w kraju | Prawda | Prawda | Fałsz | Prawda |
| **Akcja: Darmowa wysyłka** | **TAK** | **TAK** | **NIE** | **NIE** |

---

### 4. Testowanie Przejść Między Stanami (State Transition Testing)

Stosowane, gdy aplikacja posiada wewnętrzne stany, a wywołanie zdarzenia powoduje przejście do innego stanu.

**Przykład cyklu życia zamówienia:**

```mermaid
stateDiagram-v2
    [*] --> Nowe: Złożenie zamówienia
    Nowe --> Opłacone: Płatność zaksięgowana
    Nowe --> Anulowane: Timeout płatności (15 min)
    Opłacone --> Wysłane: Wydanie kurierowi
    Wysłane --> Doręczone: Odbiór przez klienta
    Doręczone --> [*]
    Anulowane --> [*]
```

**Co testujemy:**
- Wszystkie prawidłowe przejścia (tzw. ścieżki pozytywne).
- Przejścia niedozwolone (ścieżki negatywne), np. czy można zamówienie *Wysłane* cofnąć do stanu *Nowe*?

---

### 5. Techniki Oparte na Doświadczeniu

- **Zgadywanie Błędów (Error Guessing):** Wykorzystanie intuicji, wiedzy domenowej i wcześniejszych wpadek do przewidywania, gdzie programista mógł popełnić błąd (np. wklejenie emoji w pole PESEL, wpisanie spacji przed adresem email, wklejenie 10 000 znaków).
- **Testowanie Eksploracyjne (Exploratory Testing):** Równoczesne uczenie się systemu, projektowanie testów i ich natychmiastowe wykonywanie.
  - Wykonywane w ramach tzw. **Sesji testowych (Session-Based Testing)** z limitem czasowym (np. 60 minut).
  - Posiada cel zdefiniowany w tzw. **Karcie testów (Charter)**, np.: *"Zbadać proces finalizacji zamówienia przy użyciu różnych metod płatności na urządzeniu mobilnym"*.

---

## 4. Praktyczny Warsztat Testera Manualnego

Wiedza teoretyczna jest bezużyteczna bez umiejętności przygotowania czytelnej dokumentacji testowej i technicznej analizy problemów.

---

### Anatomia Idealnego Zgłoszenia Błędu (Bug Report)

Dobre zgłoszenie błędu powinno umożliwiać deweloperowi natychmiastowe odtworzenie usterki bez dopytywania o szczegóły.

```markdown
### [TYTUŁ] [Checkout] Błąd 500 po wybraniu płatności BLIK przy kwocie zamówienia ze spacją

**Środowisko:** Staging v2.14.0, Chrome 124 (macOS Sonoma), Baza danych: PostgreSQL 16
**Użytkownik:** test-user@codeassure.pl (Rola: Regular Customer)
**Dotknięty komponent:** Koszyk i Moduł Płatności (PaymentGatewayService)

**Warunki wstępne (Preconditions):**
1. Użytkownik jest zalogowany w sklepie.
2. W koszyku znajduje się co najmniej jeden produkt.

**Kroki do odtworzenia (Steps to Reproduce):**
1. Przejdź do `/cart` i kliknij "Przejdź do kasy".
2. W kroku dostawy wybierz "Paczkomat InPost".
3. Jako metodę płatności wybierz "BLIK".
4. Wpisz poprawny 6-cyfrowy kod BLIK: `123456`.
5. Kliknij przycisk "Zapłać".

**Rezultat oczekiwany (Expected Result):**
Rozpoczyna się transakcja płatnicza, użytkownik widzi timer oczekiwania na akceptację w aplikacji bankowej.

**Rezultat rzeczywisty (Actual Result):**
Wyświetla się czerwony baner z błędem systemowym "Coś poszło nie tak". W konsoli widoczny błąd HTTP 500 Internal Server Error.

**Załączniki:**
- Zrzut ekranu ekranu z błędem: `screenshot_blik_error.png`
- Wyciąg z Network Tab (HAR): `checkout_network_log.har`
- Fragment błędu z logów serwera:
  `System.FormatException: Input string '1 250,00' was not in a correct format.`
```

---

### Severity (Krytyczność) vs Priority (Priorytet)

Jedno z najczęstszych pytań rekrutacyjnych!

- **Severity (Krytyczność / Dotkliwość):** Techniczny wpływ usterki na działanie systemu (jak bardzo błąd psuje architekturę/dane).
- **Priority (Priorytet biznesowy):** Biznesowa pilność naprawy usterki (jak szybko błąd musi zostać rozwiązany z punktu widzenia firmy).

| Scenariusz | Severity | Priority | Przykład z życia |
|:---|:---:|:---:|:---|
| **Wysokie Severity, Niski Priority** | Krytyczny | Niski | Aplikacja crashuje się tylko wtedy, gdy użytkownik wpisze rok 1900 w starym, archiwalnym raporcie używanym raz na 3 lata przez jednego administratora. |
| **Niskie Severity, Wysoki Priority** | Niski | Wysoki | Na stronie głównej banku lub sklepu internetowego logo firmy jest obrócone do góry nogami lub w haśle reklamowym widnieje wulgarny błąd ortograficzny. |
| **Wysokie Severity, Wysoki Priority** | Krytyczny | Wysoki | Główny przycisk "Zapłać i kupuję" w sklepie e-commerce nie działa dla wszystkich klientów (firma traci tysiące złotych na minutę). |
| **Niskie Severity, Niski Priority** | Niski | Niski | Niewielkie przesunięcie tekstu o 2 piksele w stopce na podstronie polityki prywatności. |

---

### Cykl Życia Defektu (Bug Lifecycle)

```mermaid
stateDiagram-v2
    [*] --> New: Zgłoszenie błędu
    New --> Assigned: Przypisanie do programisty
    New --> Rejected: Odrzucony (np. to jest funkcja)
    Assigned --> In_Progress: Programista naprawia
    In_Progress --> Resolved: Wdrożono poprawkę
    Resolved --> Retesting: Tester weryfikuje poprawkę
    Retesting --> Closed: Błąd nie występuje
    Retesting --> Reopened: Błąd nadal występuje
    Closed --> [*]
    Rejected --> [*]
```

---

### Podstawowe Narzędzia Pracy Testera Manualnego

#### 1. Narzędzia Deweloperskie Przeglądarki (Chrome/Firefox DevTools)
- **Karta Network:**
  - Statusy zapytań HTTP (np. 200, 400, 404, 500).
  - Sprawdzanie nagłówków (*Headers*) oraz przesyłanego ładunku (*Payload/Request Body*).
  - Odpowiedź serwera (*Response* w formacie JSON/HTML).
  - Emulacja wolnego łącza (*Throttling*: Fast 3G, Slow 3G, Offline).
- **Karta Console:** Błędy JavaScript (wyjątki nieschwytane przez aplikację, błędy CORS).
- **Karta Application / Storage:**
  - Pliki cookie (sesje, tokeny autoryzacyjne).
  - `localStorage` oraz `sessionStorage`.
  - Pamięć podręczna i Service Workery.

#### 2. Testowanie API (Postman / cURL)
Tester manualny musi umieć odpytać backend z pominięciem interfejsu graficznego:

```bash
# Przykładowe zapytanie cURL sprawdzające API
curl -X POST https://api.codeassure.pl/v1/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5..." \
  -d '{
    "productId": "prod-987",
    "quantity": 2,
    "discountCode": "PROMO2026"
  }'
```

#### 3. Podstawy SQL dla QA
Weryfikacja danych w bazie to kluczowa umiejętność testera:

```sql
-- 1. Sprawdzenie czy zamówienie zapisało się w bazie z poprawnym statusem
SELECT o.id, o.status, o.total_amount, u.email
FROM orders o
JOIN users u ON o.user_id = u.id
WHERE u.email = 'tester@codeassure.pl'
ORDER BY o.created_at DESC
LIMIT 5;

-- 2. Wyszukanie użytkowników z duplikatem w polu login (wykrywanie anomalii)
SELECT login, COUNT(*) 
FROM users 
GROUP BY login 
HAVING COUNT(*) > 1;
```

---

## 5. Most do Automatyzacji (QA Manual -> QA Automation)

Przejście od testów manualnych do automatycznych to naturalny krok w rozwoju inżyniera jakości. Automatyzacja nie zastępuje myślenia, lecz eliminuje powtarzalną, nużącą pracę.

---

### Kiedy automatyzować, a kiedy NIE automatyzować?

```mermaid
flowchart TD
    Task["Zadanie testowe"] --> IsRepetitive{"Czy jest powtarzalne i krytyczne?"}
    IsRepetitive -->|TAK| IsStable{"Czy UI i logika są stabilne?"}
    IsRepetitive -->|NIE| Manual["Testuj manualnie (np. testy eksploracyjne)"]
    IsStable -->|TAK| Auto["Automatyzuj (Regresja, API, Smoke testy)"]
    IsStable -->|NIE| Manual2["Testuj manualnie (częste zmiany niszczą testy)"]
```

- **Warto automatyzować:**
  - Testy dymne (Smoke tests) uruchamiane na każdym commicie/deployu.
  - Stabilne testy regresji dla kluczowych ścieżek użytkownika (*Happy Path*).
  - Testy API (szybkie, stabilne i niezależne od warstwy wizualnej).
  - Testy wydajnościowe i testy parametryzowane dużymi zbiorami danych (*Data-Driven Testing*).
- **NIE należy automatyzować:**
  - Ekranów o niestabilnym, dynamicznie zmieniającym się interfejsie użytkownika.
  - Testów jednorazowych (*ad-hoc*).
  - Aspektów subiektywnych: wrażeń estetycznych, wygody obsługi (UX).

---

### Dobre Praktyki: Page Object Model (POM)

Wzorzec **Page Object Model** rozdziela logikę testu (asercje i scenariusze) od reprezentacji strony (lokalizatory elementów i metody interakcji).

**Dlaczego to ważne?** Jeśli selektor przycisku logowania zmieni się w kodzie frontendowym, poprawiasz go w **jednym miejscu** (w klasie strony), a nie w 50 różnych testach!

```typescript
// Przykład: Page Object w Playwright (TypeScript)
// plik: pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    // Preferujemy data-testid lub semantyczne role zamiast kruchych selektorów CSS
    this.emailInput = page.getByTestId('login-email-input');
    this.passwordInput = page.getByTestId('login-password-input');
    this.submitButton = page.getByRole('button', { name: /zaloguj się/i });
    this.errorMessage = page.getByTestId('login-error-alert');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, pass: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.submitButton.click();
  }
}
```

```typescript
// Przykład: Czysty test wykorzystujący Page Object
// plik: tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Autentykacja Użytkownika', () => {
  test('powinien wyświetlić komunikat błędu przy błędnym haśle', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.login('jan.kowalski@example.com', 'ZleHaslo123!');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Nieprawidłowe dane logowania');
  });
});
```

---

### Strategia Wyboru Selektorów

Kruchość testów UI (*flakiness*) w 90% wynika ze złego wyboru selektorów. Oto hierarchia preferencji:

1. **`getByTestId('submit-order')`** – Najbardziej stabilny, dedykowany dla testów, nie zmienia się przy refaktorze stylów CSS.
2. **`getByRole('button', { name: 'Kup teraz' })`** – Zgodny z dostępnością (a11y), weryfikuje semantykę HTML.
3. **`getByLabel('Adres email')`** – Świetny dla formularzy.
4. **Klasy CSS / ID (`.btn-primary`, `#submit`)** – Średnio stabilne, łatwo ulegają zmianie przy zmianie biblioteki stylów.
5. **Kruche XPathy (`/html/body/div[2]/div/form/button[1]`)** – **Antywzorzec!** Każda zmiana w strukturze DOM niszczy test.

---

## 6. Zestaw 25+ Kluczowych Pytań Rekrutacyjnych

Przygotowanie do rozmowy kwalifikacyjnej na stanowisko testera (od Juniora do Mida/Seniora). Pytania podzielono na 4 kategorie.

---

### Kategoria A: Teoria Testowania & Standard ISTQB

#### Pytanie 1: Czym różni się Severity od Priority? Podaj przykłady.
> **Odpowiedź:** Severity to techniczny wpływ błędu na działanie systemu (jak bardzo błąd uniemożliwia działanie oprogramowania), definiowany zwykle przez testera. Priority to biznesowa pilność naprawy błędu (jak szybko usterka musi zostać załatwiona dla dobra firmy), ustalana przez Product Ownera/Project Managera.  
> *Przykład wysokie Severity / niski Priority:* Aplikacja ulega awarii przy rzadkiej kombinacji niszowych filtrów raportu rocznego, z którego nikt nie korzysta do grudnia.  
> *Przykład niskie Severity / wysoki Priority:* Literówka w nazwie firmy lub obrócone logo banku na stronie logowania.

#### Pytanie 2: Co to jest testowanie regresji i czym różni się od retestów?
> **Odpowiedź:** Retest (Confirmation Testing) polega na powtórnym wykonaniu testu, który wcześniej oblał, aby sprawdzić, czy konkretny defekt został pomyślnie naprawiony przez programistę. Testowanie regresji polega na uruchomieniu zestawu testów dla innych, nienaprawianych części systemu, aby upewnić się, że nowo wdrożona zmiana nie wywołała nieoczekiwanych skutków ubocznych w działających modułach.

#### Pytanie 3: Jak brzmi paradoks pestycydów i jak z nim walczyć?
> **Odpowiedź:** Jest to 5. zasada ISTQB mówiąca o tym, że jeśli będziemy ciągle wykonywać ten sam zestaw testów, to z czasem przestanie on wykrywać nowe błędy, ponieważ kod uodpornił się na te konkretne scenariusze. Aby temu przeciwdziałać, należy regularnie aktualizować przypadki testowe, dodawać nowe dane, pisać nowe scenariusze oraz łączyć testy zautomatyzowane z sesjami testów eksploracyjnych.

#### Pytanie 4: Czym różni się Smoke Test od Sanity Test?
> **Odpowiedź:** Smoke Test (test dymny) weryfikuje stabilność całego nowego builda – sprawdza podstawowe, krytyczne funkcje ("czy aplikacja w ogóle żyje"). Sanity Test (test poprawności) jest podzbiorem testów regresji, wykonywanym zazwyczaj po otrzymaniu drobnego fixu – skupia się szczegółowo na konkretnym module lub funkcjonalności, aby sprawdzić, czy poprawka działa logicznie przed głębszymi testami.

#### Pytanie 5: Kiedy powinno zakończyć się testowanie oprogramowania?
> **Odpowiedź:** Testowanie z definicji nigdy nie jest wyczerpujące (2. zasada ISTQB). Zakończenie testów następuje po spełnieniu zdefiniowanych wcześniej **Kryteriów Wyjścia (Exit Criteria)**. Mogą one obejmować:
> - Osiągnięcie założonego pokrycia testowego (np. 95% wymagań),
> - Brak otwartych defektów o statusie Critical/Blocker,
> - Wyzerowanie budżetu lub nadejście terminu release'u przy akceptowalnym poziomie ryzyka rezydualnego,
> - Pozytywne zakończenie testów dymnych i krytycznych ścieżek regresji.

#### Pytanie 6: Co to jest testowanie eksploracyjne i czym różni się od testowania ad-hoc?
> **Odpowiedź:** Testowanie ad-hoc to w pełni chaotyczne, nieudokumentowane "klikanie" bez planu i struktury. Testowanie eksploracyjne to ustrukturyzowana technika oparta na doświadczeniu, w której tester równolegle uczy się aplikacji, projektuje testy i je wykonuje. Odbywa się zazwyczaj w ramach sesji czasowych (*time-boxed*), posiada zdefiniowaną Kartę Testów (*Charter*) i kończy się raportem z metrykami z sesji.

#### Pytanie 7: Na czym polega zasada wczesnego testowania (Shift-Left)?
> **Odpowiedź:** Zasada Shift-Left polega na przesunięciu aktywności związanych z zapewnianiem jakości na jak najwcześniejsze fazy projektu (w lewo na osi czasu). Oznacza to testowanie wymagań biznesowych, udział testera w refinementach, statyczną analizę kodu i pisanie testów jednostkowych przed rozpoczęciem kodowania (np. w metodyce TDD), co pozwala wyeliminować defekty zanim trafią do kodu źródłowego.

---

### Kategoria B: Zagadnienia Techniczne, API i Bazy Danych

#### Pytanie 8: Jaka jest różnica między metodami HTTP POST, PUT i PATCH?
> **Odpowiedź:**
> - **POST:** Służy do tworzenia nowego zasobu na serwerze (np. utworzenie nowego zamówienia). Zwykle nie jest idempotentny (wielokrotne wywołanie utworzy wiele zasobów).
> - **PUT:** Służy do całkowitego zastąpienia (podmiany) istniejącego zasobu. Wymaga przesłania pełnego obiektu. Jest idempotentny (wielokrotne wywołanie daje ten sam rezultat).
> - **PATCH:** Służy do częściowej aktualizacji zasobu (np. zmiana samego adresu email użytkownika). Przesyła się tylko modyfikowane pola.

#### Pytanie 9: Czym różni się kod błędu 401 Unauthorized od 403 Forbidden?
> **Odpowiedź:**
> - **401 Unauthorized:** Oznacza brak uwierzytelnienia (brak tożsamości) – użytkownik nie przedstawił poprawnych poświadczeń (np. brak tokena JWT, wygasła sesja, złe hasło). Serwer mówi: *"Nie wiem, kim jesteś"*.
> - **403 Forbidden:** Oznacza brak uprawnień (autoryzacji) – serwer wie, kim jest użytkownik, ale jego rola nie ma prawa dostępu do danego zasobu (np. zwykły użytkownik próbuje wejść do panelu `/admin`). Serwer mówi: *"Wiem kim jesteś, ale nie masz tu wstępu"*.

#### Pytanie 10: Co oznacza kod HTTP 502 Bad Gateway i 504 Gateway Timeout?
> **Odpowiedź:**
> - **502 Bad Gateway:** Serwer pośredniczący (np. NGINX, reverse proxy) otrzymał nieprawidłową odpowiedź od serwera nadrzędnego (np. backendu .NET / Node.js).
> - **504 Gateway Timeout:** Serwer pośredniczący nie doczekał się odpowiedzi od serwera nadrzędnego w określonym czasie (timeout zapytania, np. zawieszona baza danych lub zbyt ciężkie zapytanie).

#### Pytanie 11: Jak tester wykorzystuje DevTools w przeglądarce podczas diagnozowania problemu?
> **Odpowiedź:**
> 1. W zakładce **Network** sprawdza, czy po kliknięciu przycisku poszło zapytanie do API, jaki ma kod statusu (np. 400 vs 500), co zostało wysłane w Payloadzie i co zwrócił serwer.
> 2. W zakładce **Console** weryfikuje błędy skryptów JavaScript (np. `Uncaught TypeError: Cannot read properties of undefined`).
> 3. W zakładce **Application** sprawdza stan ciasteczek (Cookies), LocalStorage (np. zapisany token sesji) oraz unieważnia cache.
> 4. Używa throttlingu sieciowego do sprawdzenia zachowania przy powolnym łączu.

#### Pytanie 12: Czym różni się INNER JOIN od LEFT JOIN w SQL?
> **Odpowiedź:**
> - **INNER JOIN:** Zwraca tylko te rekordy, które mają dopasowanie w obu łączonych tabelach.
> - **LEFT JOIN:** Zwraca wszystkie rekordy z lewej tabeli oraz dopasowane rekordy z prawej tabeli. Jeśli dla rekordu z lewej tabeli nie ma odpowiednika po prawej stronie, kolumny prawej tabeli wypełniane są wartościami `NULL`.

#### Pytanie 13: Jakie zapytanie SQL pozwoli znaleźć zduplikowane rekordy?
> **Odpowiedź:** Używamy klauzuli `GROUP BY` oraz filtru `HAVING COUNT(*) > 1`:
> ```sql
> SELECT email, COUNT(*) as ilosc
> FROM customers
> GROUP BY email
> HAVING COUNT(*) > 1;
> ```

#### Pytanie 14: Czym jest atak SQL Injection i jak tester może go sprawdzić?
> **Odpowiedź:** SQL Injection polega na wstrzyknięciu złośliwego kodu SQL do pól formularza lub parametrów URL z powodu braku sanityzacji danych wejściowych i braku użycia zapytań sparametryzowanych. Tester wprowadza znaki specjalne (np. `' OR '1'='1' --`) i obserwuje, czy system zwrócił błąd bazy danych (co ujawnia podatność) lub czy zalogował bez podania hasła.

---

### Kategoria C: Automatyzacja Testów i Dobre Praktyki

#### Pytanie 15: Co to jest tzw. Flaky Test i jak radzić sobie z niestabilnością testów?
> **Odpowiedź:** *Flaky test* to test, który przy tym samym kodzie źródłowym raz przechodzi pomyślnie, a raz oblewa. Przyczyny i rozwiązania:
> - **Przyczyna: Asynchroniczność i sztywne pauzy (`sleep`).**  
>   *Rozwiązanie:* Stosowanie auto-waitingu i asercji webowych (np. `expect(locator).toBeVisible()` w Playwright zamiast `Thread.sleep()`).
> - **Przyczyna: Współdzielenie stanu / zależności między testami.**  
>   *Rozwiązanie:* Każdy test musi być w pełni niezależny, posiadać własne dane testowe i czyścić po sobie stan.
> - **Przyczyna: Niestabilne selektory.**  
>   *Rozwiązanie:* Używanie `data-testid` zamiast zależnych od wyglądu ścieżek XPath.

#### Pytanie 16: Dlaczego użycie `Thread.sleep()` lub `page.waitForTimeout()` w testach jest antywzorcem?
> **Odpowiedź:** Ponieważ sztywna pauza albo czeka za krótko (gdy serwer odpowiada wolniej z powodu obciążenia, co powoduje fałszywy fail), albo czeka za długo (jeśli operacja zajmuje 50 ms, a czekamy 5 sekund, execution time całego suite rośnie z minut do godzin). Prawidłowym podejściem są **Explicit Waits** / **Dynamic Waits**, które sondują stan DOM i kończą oczekiwanie dokładnie w momencie spełnienia warunku.

#### Pytanie 17: Czym różni się piramida testów od antywzorca "loda rożka" (Ice Cream Cone)?
> **Odpowiedź:** Zdrowa piramida testów (Mike Cohn) zakłada najszerszą bazę szybkich, tanich testów jednostkowych (~70%), umiarkowaną liczbę testów integracyjnych (~20%) oraz mały wierzchołek testów E2E UI (~10%). Antywzorzec odwróconej piramidy polega na posiadaniu niemal wyłącznie testów manualnych i automatycznych UI, co prowadzi do bardzo długich buildów, ogromnych kosztów utrzymania i lawiny niestabilnych testów.

#### Pytanie 18: Na czym polega wzorzec Page Object Model (POM)?
> **Odpowiedź:** POM to wzorzec projektowy w automatyzacji UI, w którym każdy ekran lub komponent aplikacji reprezentowany jest przez osobną klasę. Klasa ta przechowuje selektory elementów i oferuje metody wykonujące akcje biznesowe (np. `login()`, `addItemToCart()`). Testy operują na instancjach tych klas i zawierają asercje, dzięki czemu zmiana wyglądu aplikacji wymaga edycji tylko jednego pliku Page Object.

#### Pytanie 19: Dlaczego testy na poziomie API są zazwyczaj preferowane nad testami UI?
> **Odpowiedź:** Testy API są setki razy szybsze (brak konieczności renderowania przeglądarki, pobierania fontów, skryptów i obrazów), są znacznie stabilniejsze (odporne na zmiany w layoutach i klasach CSS), można je uruchamiać na wcześniejszym etapie budowy systemu (zanim powstanie frontend) oraz precyzyjnie wskazują źródło problemu w logice biznesowej.

#### Pytanie 20: Co to jest CI/CD i jaka jest w nim rola testów automatycznych?
> **Odpowiedź:** CI (*Continuous Integration*) to praktyka częstego scalania kodu do głównego repozytorium wraz z automatycznym budowaniem i uruchamianiem testów. CD (*Continuous Delivery/Deployment*) to automatyzacja wdrażania zmian na środowiska testowe lub produkcyjne. Testy automatyczne pełnią rolę tzw. **Quality Gate** – jeśli testy jednostkowe, API lub smoke testy nie przejdą w pipeline (np. w GitHub Actions), build jest zatrzymywany, a wadliwy kod nie ma szans trafić na produkcję.

---

### Kategoria D: Pytania Sytuacyjne i Behawioralne

#### Pytanie 21: Co robisz, gdy programista odrzuca Twoje zgłoszenie ze słowami "U mnie działa" (Works on my machine)?
> **Odpowiedź:**
> 1. Nie traktuję tego osobiście – zachowuję profesjonalizm i skupiam się na faktach.
> 2. Ponownie weryfikuję kroki na swoim środowisku.
> 3. Porównuję różnice w środowiskach: wersja przeglądarki, wersja builda, konfiguracja bazy danych, uprawnienia konta testowego, stan cache.
> 4. Proponuję krótkie spotkanie (1:1 / screen share) i pokazuję odtworzenie problemu na żywo na moich danych lub sprawdzamy logi serwerowe.
> 5. Uzupełniam ticket o dodatkowe informacje (HAR file, nagranie ekranu, dane testowe).

#### Pytanie 22: Co robisz, gdy zbliża się termin wdrożenia (deadline), a nie ma czasu na wykonanie wszystkich testów?
> **Odpowiedź:**
> 1. Natychmiast eskaluję sytuację do Product Ownera / Project Managera z jasną informacją o ryzykach.
> 2. Stosuję podejście oparte na ryzyku (*Risk-Based Testing*):
>    - Wykonuję testy dla ścieżek krytycznych (*Happy Path*) i kluczowych operacji biznesowych (np. płatności, rejestracja).
>    - Testuję obszary o największej liczbie zmian w ostatnim sprincie.
>    - Odrzucam testy funkcji niszowych i rzadko używanych.
> 3. Przygotowuję zestawienie: co zostało przetestowane, a co pominięto, aby biznes podjął świadomą decyzję o ewentualnym release z zaakceptowanym ryzykiem rezydualnym.

#### Pytanie 23: Co robisz, gdy specyfikacja wymagań jest niepełna lub nieaktualna?
> **Odpowiedź:** Nie czekam biernie. Umawiam rozmowę z analitykiem biznesowym lub Product Ownerem, zadaję konkretne pytania dotyczące przypadków brzegowych i zachowań alternatywnych. Wszystkie uzgodnienia spisuję i dodaję jako komentarz do zadania w systemie zarządzania projektem (np. Jira), aby cały zespół miał jedno źródło prawdy.

#### Pytanie 24: Znalazłeś błąd tuż przed samym wdrożeniem produkcyjnym. Jak postępujesz?
> **Odpowiedź:**
> 1. Szybko oceniam krytyczność (Severity) i prawdopodobieństwo wystąpienia błędu.
> 2. Sprawdzam, czy błąd blokuje krytyczną funkcjonalność biznesową, czy zagraża bezpieczeństwu/danym użytkowników.
> 3. Natychmiast informuję zespół (Tech Lead, Product Owner) na dedykowanym kanale wdrożeniowym.
> 4. Zgłaszam zwięzły ticket z dowodami.
> 5. Decyzja o wstrzymaniu wdrożenia należy do biznesu, ale moją rolą jest przedstawienie konsekwencji wypuszczenia błędu na produkcję.

#### Pytanie 25: Czym różni się defekt krytyczny od blokującego (Blocker vs Critical)?
> **Odpowiedź:**
> - **Blocker:** Uniemożliwia dalsze testowanie aplikacji lub jej głównego modułu (np. błąd 500 uniemożliwia zalogowanie się do aplikacji, przez co żaden inny test nie może zostać wykonany). Zatrzymuje pracę zespołu testowego.
> - **Critical:** Poważna awaria kluczowej funkcji bez możliwości obejścia (*no workaround*), ale aplikacja jako całość działa i inne jej moduły można nadal testować (np. funkcja eksportu raportu do PDF wyrzuca wyjątek).

#### Pytanie 26: Jak radzisz sobie z monotonią przy powtarzalnych testach manualnych?
> **Odpowiedź:** Szukam możliwości optymalizacji: przygotowuję skrypty ułatwiające generowanie danych testowych przez API lub SQL, używam narzędzi do przyspieszania wypełniania formularzy, wplatam techniki testów eksploracyjnych zamiast mechanicznego odtwarzania kroków, a przede wszystkim typuję powtarzalne scenariusze do zautomatyzowania.

---

## 7. Praktyczne Checklisty (Cheat Sheet)

### Checklista Weryfikacji Formularza Webowego (UI Sanity Checklist)

- [ ] **Pola wymagane:** Czy próba wysłania pustego formularza wyświetla czytelne komunikaty walidacyjne pod każdym polem?
- [ ] **Pola numeryczne:** Czy przyjmują litery, znaki specjalne, spacje, wartości ujemne, liczby zmiennoprzecinkowe?
- [ ] **Formaty danych:** Walidacja adresu e-mail (np. `brak_malpy.pl`, `spacja@ domena.pl`), numeru telefonu, kodu pocztowego.
- [ ] **Limity znaków (BVA):** Sprawdzenie minimalnej, maksymalnej oraz przekroczonej o 1 liczby znaków.
- [ ] **Białe znaki (Whitespace):** Czy system automatycznie usuwa zbędne spacje na początku i końcu wprowadzonego tekstu (*trimming*)?
- [ ] **Wklejanie ze schowka:** Czy formularz poprawnie obsługuje wklejenie tekstu z formatowaniem (np. z Worda)?
- [ ] **XSS Injection:** Wpisanie `<script>alert('xss')</script>` lub `"><img src=x onerror=alert(1)>` – czy skrypt nie jest wykonywany w przeglądarce?
- [ ] **Dwukrotne kliknięcie:** Szybkie, podwójne kliknięcie przycisku "Zapisz" / "Zapłać" – czy nie tworzy duplikatu rekordu w bazie danych?
- [ ] **Klawisz Enter:** Czy naciśnięcie klawisza Enter powoduje zatwierdzenie formularza?
- [ ] **Nawigacja tabulatorem:** Czy klawisz Tab przechodzi logicznie od góry do dołu przez kolejne pola formularza?

---

### Ściągawka Kodów Statusu HTTP dla Testera

| Kod HTTP | Klasa | Znaczenie w testach | Typowe przyczyny problemów |
|:---|:---|:---|:---|
| **200 OK** | Sukces | Standardowa odpowiedź dla udanych zapytań GET/PUT. | Wszystko w porządku. |
| **201 Created** | Sukces | Zasób został pomyślnie utworzony (POST). | W nagłówku `Location` powinien być URL do nowego zasobu. |
| **204 No Content** | Sukces | Żądanie wykonane pomyślnie, brak ciała odpowiedzi (DELETE). | Oczekiwane przy usuwaniu zasobów. |
| **400 Bad Request** | Błąd klienta | Błędna składnia JSON, nieprawidłowe typy danych. | Walidacja po stronie backendu odrzuciła payload. |
| **401 Unauthorized** | Błąd klienta | Brak autentykacji (brak lub nieważny token). | Użytkownik nie jest zalogowany. |
| **403 Forbidden** | Błąd klienta | Brak uprawnień do danego zasobu. | Zalogowany użytkownik nie ma roli administratora. |
| **404 Not Found** | Błąd klienta | Zasób lub endpoint nie istnieje. | Literówka w URL lub usunięty rekord z bazy. |
| **409 Conflict** | Błąd klienta | Konflikt stanu zasobu (np. duplikat adresu e-mail). | Próba rejestracji na zajęty login. |
| **422 Unprocessable Entity** | Błąd klienta | Błąd walidacji semantycznej danych wejściowych. | Poprawny format JSON, ale np. ujemna kwota przelewu. |
| **500 Internal Server Error** | Błąd serwera | Nieschwytany wyjątek w kodzie backendowym (*Bug!*). | Błąd w logice programu, null pointer, brak obsługi błędu. |
| **502 Bad Gateway** | Błąd serwera | Serwer proxy nie dogadał się z aplikacją. | Backend leży lub restartuje się. |
| **503 Service Unavailable** | Błąd serwera | Przeciążenie serwera lub przerwa techniczna. | Aplikacja nie wyrabia pod ruchem. |
| **504 Gateway Timeout** | Błąd serwera | Czas oczekiwania na odpowiedź minął. | Zwis na bazie danych lub zewnętrznym API. |

---

## Podsumowanie i Ścieżka Rozwoju

Skuteczny inżynier jakości łączy solidną dyscyplinę analityczną ze zrozumieniem architektury technologicznej. Niezależnie od tego, czy Twoim celem jest testowanie manualne, testy API, automatyzacja UI czy testy wydajnościowe – fundamenty opisane w tym kompendium stanowią uniwersalną bazę Twojej codziennej pracy.

---
title: "Zasady SOLID w Pytaniach Rekrutacyjnych"
description: "Praktyczne omówienie 5 zasad SOLID (SRP, OCP, LSP, ISP, DIP) z przykładami w C#, typowymi pytaniami rekruterów i pułapkami."
date: "2026-03-10"
tags: ["Interview", "SOLID", "OOP", "Architecture", "Design Patterns"]
order: 1
---

# Zasady SOLID w Pytaniach Rekrutacyjnych

Zasady SOLID to zestaw pięciu reguł projektowania obiektowego sformułowanych przez Roberta C. Martina (Uncle Bob), których celem jest tworzenie oprogramowania łatwego w utrzymaniu, testowaniu i rozbudowie.

---

## 1. Single Responsibility Principle (SRP)

> *Klasa powinna mieć tylko jeden powód do zmiany.*

Klasa powinna odpowiadać za jedną konkretną domenę odpowiedzialności. Jeśli klasa generuje fakturę, zapisuje ją w bazie danych i wysyła e-mail z powiadomieniem, łamie SRP.

```csharp
// ❌ ZŁE PODEJŚCIE:
public class InvoiceService
{
    public void CreateInvoice(Invoice invoice)
    {
        // 1. Logika biznesowa
        // 2. Bezpośredni zapis do bazy SQL
        // 3. Wysłanie maila przez SMTP
    }
}

// ✅ POPRAWNE PODEJŚCIE:
public class InvoiceGenerator { ... }
public class InvoiceRepository : IInvoiceRepository { ... }
public class EmailNotificationSender : INotificationSender { ... }
```

---

## 2. Open/Closed Principle (OCP)

> *Elementy oprogramowania powinny być otwarte na rozbudowę, ale zamknięte na modyfikację.*

Nową funkcjonalność należy dodawać poprzez tworzenie nowych klas lub implementacji interfejsów, a nie edytowanie istniejącego, przetestowanego kodu z długimi łańcuchami instrukcji `if / switch`.

---

## 3. Liskov Substitution Principle (LSP)

> *Obiekty w programie powinny być zastępowalne przez instancje ich podtypów bez wpływu na poprawność działania programu.*

Klasyczny przykład naruszenia LSP to kwadrat dziedziczący po prostokącie (`Square : Rectangle`), gdzie zmiana szerokości wpływa niespodziewanie na wysokość.

---

## 4. Interface Segregation Principle (ISP)

> *Wiele dedykowanych interfejsów jest lepszych niż jeden ogólny "gruby" interfejs.*

Klient nie powinien być zmuszany do implementowania metod, których nie używa (np. wyrzucając `throw new NotImplementedException()`).

---

## 5. Dependency Inversion Principle (DIP)

> *Moduły wysokopoziomowe nie powinny zależeć od modułów niskopoziomowych. Oba powinny zależeć od abstrakcji.*

Wstrzykiwanie zależności (Dependency Injection) jest najpopularniejszym mechanizmem realizacji tej zasady w nowoczesnym .NET.

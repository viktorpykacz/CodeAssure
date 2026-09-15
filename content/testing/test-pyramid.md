---
title: "Piramida Testów (Test Pyramid)"
description: "Koncepcja piramidy testów wg Mike'a Cohna - proporcje między testami jednostkowymi, integracyjnymi a E2E oraz anty-wzorzec loda rożka."
date: "2026-03-14"
tags: ["QA", "Architecture", "Test Pyramid", "Best Practices"]
order: 2
---

# Piramida Testów (Test Pyramid)

Piramida testów to model architektoniczny spopularyzowany przez Mike'a Cohna i Martina Fowlera, pomagający zespołom inżynieryjnym w planowaniu zbalansowanej strategii testowania aplikacji.

---

## Struktura Piramidy

Piramida składa się z trzech głównych poziomów (od dołu do góry):

1. **Testy Jednostkowe (Podstawa)**
   - Największa liczba testów (ok. 70%).
   - Czas wykonania liczony w milisekundach.
   - Bardzo tani koszt wytworzenia i utrzymania.
   - Doskonała lokalizacja błędów w konkretnej linijce kodu.

2. **Testy Integracyjne (Środek)**
   - Umiarkowana liczba testów (ok. 20%).
   - Sprawdzają komunikację z bazą danych, kontraktami API czy systemem plików.
   - Wykorzystują kontenery testowe (np. Testcontainers w .NET lub Docker).

3. **Testy UI / End-to-End (Szczyt)**
   - Najmniejsza liczba testów (ok. 10%).
   - Wolne w wykonaniu, wrażliwe na zmiany UI (*flaky tests*).
   - Testują krytyczne ścieżki użytkownika (tzw. Happy Paths).

---

## Porównanie Poziomów

| Cecha | Testy Jednostkowe | Testy Integracyjne | Testy E2E / UI |
|:---|:---|:---|:---|
| **Szybkość** | Błyskawiczna (< 5 ms) | Średnia (100 ms - 2 s) | Wolna (5 s - 60 s+) |
| **Koszt utrzymania** | Bardzo niski | Średni | Wysoki |
| **Izolacja defektu** | Precyzyjna | Modułowa | Trudna do zlokalizowania |
| **Prawdopodobieństwo niestabilności (Flakiness)** | Prawie zerowe | Niskie | Podwyższone |

---

## Antywzorzec: Odwrócona Piramida (Ice Cream Cone)

Częstym błędem w projektach jest odwrócenie proporcji – posiadanie tysięcy niestabilnych testów UI oraz znikomej ilości testów jednostkowych. Prowadzi to do:
- Wielogodzinnych pipeline'ów CI/CD,
- Frustracji deweloperów ciągłymi fałszywymi alarmami,
- Wysokich kosztów utrzymania środowisk testowych.

```csharp
// Przykład asercji FluentAssertions w .NET
[Fact]
public void Order_ShouldBeCalculatedCorrectly()
{
    var order = new Order();
    order.AddItem(new OrderItem("Clean Code Book", 49.99m));
    
    order.TotalAmount.Should().Be(49.99m);
    order.Status.Should().Be(OrderStatus.Draft);
}
```

---
title: "Programowanie Asynchroniczne w C# (async / await)"
description: "Głębokie omówienie słów kluczowych async i await, maszyny stanów generowanej przez kompilator, Task, ValueTask oraz wątków puli ThreadPool."
date: "2026-03-12"
tags: [".NET", "C#", "Async", "Threading", "Performance"]
order: 2
---

# Programowanie Asynchroniczne w C# (async / await)

Programowanie asynchroniczne w platformie .NET opiera się na wzorcu **Task-based Asynchronous Pattern (TAP)**. Pozwala ono na wykonywanie operacji wejścia/wyjścia (I/O-bound) bez blokowania wątków puli (ThreadPool), co drastycznie zwiększa skalowalność aplikacji webowych (np. ASP.NET Core).

---

## I/O-Bound vs CPU-Bound

- **Operacje I/O-bound** (dostęp do bazy danych, zapytań HTTP, odczyt plików): Wątek nie musi oczekiwać na dane. Zwraca kontrolę do puli, dopóki sterownik sprzętowy lub system operacyjny nie powiadomi o nadejściu danych przez porty ukończenia we/wy (I/O Completion Ports).
- **Operacje CPU-bound** (obliczenia matematyczne, kompresja, przetwarzanie obrazu): Wymagają ciągłej pracy procesora i powinny być delegowane do `Task.Run()`.

---

## Podstawowa Składnia

```csharp
public async Task<UserProfile> GetUserProfileAsync(int userId, CancellationToken cancellationToken = default)
{
    using var client = _httpClientFactory.CreateClient();
    
    // Asynchroniczne pobieranie danych bez blokowania wątku
    var response = await client.GetAsync($"https://api.example.com/users/{userId}", cancellationToken);
    response.EnsureSuccessStatusCode();

    var user = await response.Content.ReadFromJsonAsync<UserProfile>(cancellationToken: cancellationToken);
    return user ?? throw new InvalidOperationException("User data not found.");
}
```

---

## Najczęstsze błędy i antywzorce

### 1. `async void` (z wyjątkiem procedur obsługi zdarzeń UI)
Metody `async void` uniemożliwiają wywołującemu przechwycenie wyjątków oraz oczekiwanie na zakończenie zadania. Każdy nieobsłużony błąd spowoduje natychmiastowe zakończenie procesu aplikacji.

### 2. Blokowanie kodu asynchronicznego (`.Result` lub `.Wait()`)
Wywoływanie `.Result` lub `.Wait()` na obiektach `Task` prowadzi do ryzyka **zakleszczenia (deadlock)**, szczególnie w środowiskach z `SynchronizationContext` (np. starsze ASP.NET, WPF, WinForms), oraz do marnowania wątków z puli (*thread starvation*).

### 3. Zapominanie o `CancellationToken`
Zawsze przekazuj token anulowania do wszystkich operacji we/wy, aby zapobiec marnowaniu zasobów serwera po przerwaniu połączenia przez klienta.

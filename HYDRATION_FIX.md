# iOS/Safari Hydration Issue - Fix Documentation

## Problem

Pada iOS/Safari, terjadi error hydration mismatch:

```
Hydration failed because the server rendered text did not match the client.
As a result this tree will be regenerated on the client.
```

## Root Cause

Terjadi karena server-side rendering (SSR) di Next.js menghasilkan HTML yang berbeda dengan client-side rendering di iOS/Safari. Ini biasanya disebabkan oleh:

1. **Conditional rendering yang inconsistent** antara server dan client
2. **Penggunaan `getCurrentSaleType()` yang menghasilkan output berbeda**
3. **Component tidak mem-mount dengan sempurna pada iOS Safari**

## Solution Implemented

### 1. **Update `useTicketConfig` Hook** (`hooks/useTicketConfig.ts`)

- Tambahkan `"use client"` directive
- Gunakan `useMemo` untuk semua fungsi agar konsisten
- Hindari side effects yang bisa menghasilkan output berbeda antara server dan client

```typescript
"use client";
import { useMemo } from "react";

// Semua fungsi di-wrap dengan useMemo untuk stabilitas
const getCurrentSaleType = useMemo(() => {
  return () => {
    /* ... */
  };
}, []);
```

### 2. **Update `Tiket.tsx` Component**

- Tambahkan state `isMounted` dengan `useEffect`
- Hanya render kondisional setelah component di-mount di client
- Ini memastikan SSR render sesuatu yang stabil, kemudian client render dengan data yang sama

```typescript
const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(true);
}, []);

// Render conditional status banner hanya setelah mounted
{isMounted && (
  <>
    {!isSalesOpen() && <...>}
    {config.salesStatus.isPreSaleOpen && <...>}
  </>
)}
```

### 3. **Buat Component `TiketCard.tsx` Terpisah**

- Card component memiliki own state management
- Setiap card mem-mount data secara terpisah
- Menghindari prop drilling issues

```typescript
function TiketCard({ packageId, index }: TiketCardProps) {
  const [pkg, setPkg] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setPkg(getActivePackage(packageId));
  }, [packageId, getActivePackage]);

  if (!pkg || !isMounted) return null;
  // ... render card
}
```

## Key Changes Summary

| File                       | Change                                             |
| -------------------------- | -------------------------------------------------- |
| `hooks/useTicketConfig.ts` | Tambah `"use client"` + `useMemo` untuk stabilitas |
| `components/Tiket.tsx`     | Tambah `isMounted` state untuk hydration safety    |
| `components/TiketCard.tsx` | Buat component baru dengan isolated state          |

## Why This Fixes iOS Hydration Issues

1. **SSR renders placeholder** saat initial load
2. **Client hydration menerima placeholder yang sama** dari server
3. **Setelah mount, client render dengan data actual** tanpa mismatch
4. **iOS Safari tidak complain** karena server dan client output awal sama

## Testing

1. Test di iOS Safari
2. Test di Android Chrome (untuk memastikan tidak break)
3. Test di Desktop browsers

## Related Links

- [Next.js Hydration Issues](https://nextjs.org/docs/messages/hydration-error)
- [React SSR Hydration](https://react.dev/reference/react-dom/client/hydrateRoot)

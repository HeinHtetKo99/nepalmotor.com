# Nepal Motor — Mobile API Reference

Base URL (production):

```
https://www.nepalmotor.com
```

All paths below are relative to that host (e.g. `POST https://www.nepalmotor.com/api/test-drive`).

Native React Native apps do not need CORS. WebViews or Expo web should send a preflight `OPTIONS` request; all listed endpoints support `OPTIONS` with `Access-Control-Allow-Origin: *`.

---

## Admin SMS on successful submit (server-side)

There is **no separate SMS API** for the mobile app to call.

When any form below returns **`{ "ok": true }`** (or `{ "ok": true, "recordId": "...", ... }` for multipart forms), the server automatically sends an admin SMS to **9952024365** and **9852031716** via Sparrow SMS.

Message format:

```
{Form Title} Form has been submitted by {fullName}, {phone} - Nepal Motor
```

| Mobile screen / flow | Admin SMS starts with |
|----------------------|------------------------|
| Exchange to EV | `Exchange to EV Form has been submitted by...` |
| Sell used car | `Sell Used Car Form has been submitted by...` |
| Buy used car | `Buy Used Car Form has been submitted by...` |
| Free test drive | `TestDrive Form has been submitted by...` |
| Become a dealer | `Become a Dealer Form has been submitted by...` |

Requirements for the SMS to fire:

1. Submission succeeds and Airtable record is created.
2. Request includes **`fullName`** and **`phone`** (10-digit Nepal mobile).
3. Server has `SPARROW_SMS_TOKEN` configured (production).

SMS failure does **not** change the HTTP response; the user still gets `ok: true` if Airtable saved.

---

## OTP (phone verification)

Use before submitting forms that require verified phone on the website.

### `POST /api/send-otp`

**Body (JSON)**

```json
{ "phone": "9812345678" }
```

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `phone` | string | yes | 10 digits (non-digits stripped) |

**Success `200`**

```json
{ "success": true, "message": "Verification code sent." }
```

**Error `400` / `502`**

```json
{ "success": false, "message": "..." }
```

### `POST /api/verify-otp`

**Body (JSON)**

```json
{ "phone": "9812345678", "otp": "1234" }
```

| Field | Type | Required |
|-------|------|----------|
| `phone` | string | yes |
| `otp` | string | yes (4 digits) |

**Success `200`**

```json
{ "success": true, "valid": true, "message": "Phone verified." }
```

Invalid code:

```json
{ "success": false, "valid": false, "message": "Incorrect or expired code. Please try again." }
```

### `OPTIONS /api/send-otp` · `OPTIONS /api/verify-otp`

CORS preflight — returns `204`.

---

## 1. Exchange to EV / Sell used car

### `POST /api/vehicle-listings`

Alias (same handler): `POST /api/vehicle-submission`

**Content-Type:** `multipart/form-data`

| Field | Required | Notes |
|-------|----------|-------|
| `fullName` | yes | |
| `phone` | yes | 10 digits |
| `email` | no | |
| `city` | yes | |
| `year` | yes | 4-digit |
| `vehicleType` | yes | |
| `vehicleBrand` | yes | |
| `vehicleModel` | yes | |
| `vehicleColor` | yes | |
| `kmDriven` | yes | |
| `evBrand` | yes | Exchange: user’s EV choice. Sell: send `I need suggestion` |
| `finance` | yes | Sell: send `No` |
| `transmission` | yes | |
| `fuelType` | yes | |
| `accidents` | yes | Sell: send `No` |
| `features` | no | JSON string array, e.g. `["ABS","Airbags"]` |
| `notes` | no | |
| `expectedValuation` | no | Sell only |
| `requestType` | sell only | Set to `Sell Used Car` for sell flow; omit for exchange |
| `documents` | no | Repeatable file field |
| `photos` | no | Repeatable file field |

**Success `200`**

```json
{
  "ok": true,
  "recordId": "recXXXXXXXX",
  "received": { ... },
  "photoUpload": { ... }
}
```

Optional warning (still `ok: true`):

```json
{
  "ok": true,
  "warning": "Saved, but these files could not be uploaded: ..."
}
```

**Error `400` / `502`**

```json
{ "error": "Human-readable message" }
```

### `OPTIONS /api/vehicle-listings` · `OPTIONS /api/vehicle-submission`

CORS preflight — returns `204`.

---

## 2. Buy used car

### `POST /api/buy-used-cars`

**Content-Type:** `application/json`

```json
{
  "fullName": "Ram Sharma",
  "email": "ram@example.com",
  "phone": "9812345678",
  "city": "Kathmandu",
  "vehicleType": "Sedan",
  "vehicleBrand": "Toyota",
  "vehicleModel": "Corolla",
  "vehicleColor": "White",
  "transmission": "Automatic",
  "fuelType": "Petrol",
  "features": ["ABS", "Airbags"],
  "budget": "2500000",
  "finance": "Yes",
  "notes": ""
}
```

| Field | Required | Notes |
|-------|----------|-------|
| `fullName` | yes | |
| `phone` | yes | 10 digits |
| `email` | no | Validated if present |
| `city` | yes | |
| `vehicleType` | yes | |
| `vehicleBrand` | yes | |
| `vehicleModel` | yes | Letters and spaces only |
| `vehicleColor` | yes | |
| `transmission` | yes | |
| `fuelType` | yes | |
| `budget` | yes | Numeric string |
| `finance` | yes | |
| `features` | no | Array or JSON string |
| `notes` | no | |

**Success `200`**

```json
{ "ok": true }
```

→ Triggers admin SMS: **Buy Used Car Form has been submitted by...**

### `OPTIONS /api/buy-used-cars`

CORS preflight — returns `204`.

---

## 3. Free test drive

### `POST /api/test-drive`

**Content-Type:** `application/json`

```json
{
  "fullName": "Ram Sharma",
  "email": "ram@example.com",
  "phone": "9812345678",
  "city": "Kathmandu",
  "vehicleType": "SUV",
  "vehicleBrand": "Hyundai",
  "vehicleModel": "Creta",
  "vehicleColor": "Black",
  "transmission": "Automatic",
  "fuelType": "Diesel",
  "features": [],
  "finance": "No",
  "notes": ""
}
```

Same required fields as buy, except **no `budget`**; **`finance`** is required.

**Success `200`**

```json
{ "ok": true }
```

→ Triggers admin SMS: **TestDrive Form has been submitted by...**

### `OPTIONS /api/test-drive`

CORS preflight — returns `204`.

---

## 4. Become a dealer

### `POST /api/become-a-dealer`

**Option A — multipart/form-data**

| Field | Required |
|-------|----------|
| `fullName` | yes |
| `companyName` | yes |
| `phone` | yes (10 digits) |
| `city` | no (defaults Kathmandu) |
| `email` | no |
| `notes` | no |
| `photos` | no (max 5 files) |

**Option B — application/json**

```json
{
  "fullName": "Ram Sharma",
  "companyName": "ABC Motors",
  "city": "Kathmandu",
  "phone": "9812345678",
  "email": "",
  "notes": "",
  "photos": [
    {
      "name": "shop.jpg",
      "type": "image/jpeg",
      "data": "<base64 or data:image/jpeg;base64,...>"
    }
  ]
}
```

**Success `200`**

```json
{
  "ok": true,
  "recordId": "recXXXXXXXX",
  "received": { ... },
  "photoUpload": { ... }
}
```

→ Triggers admin SMS: **Become a Dealer Form has been submitted by...**

### `OPTIONS /api/become-a-dealer`

CORS preflight — returns `204`.

---

## Example: React Native fetch (test drive)

```javascript
const BASE = "https://www.nepalmotor.com";

async function submitTestDrive(payload) {
  const res = await fetch(`${BASE}/api/test-drive`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Submit failed");
  return data; // { ok: true } — admin SMS sent on server
}
```

## Example: multipart (exchange)

```javascript
const form = new FormData();
form.append("fullName", "Ram Sharma");
form.append("phone", "9812345678");
form.append("city", "Kathmandu");
// ... all required fields
// form.append("requestType", "Sell Used Car"); // sell only

const res = await fetch(`${BASE}/api/vehicle-listings`, {
  method: "POST",
  body: form,
});
```

---

## HTTP status summary

| Status | Meaning |
|--------|---------|
| `200` | Success (`ok: true`) |
| `400` | Validation error (`error` message) |
| `500` | Server config (e.g. missing Airtable env) |
| `502` | Airtable or upstream failure |

---

## Changelog

| Date | Change |
|------|--------|
| 2026-05-28 | Admin SMS on all successful form submits; mobile API doc added |

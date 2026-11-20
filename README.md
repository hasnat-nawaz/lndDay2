# GIKI Lost & Found

A small web app where GIKI students log in, post items they lost or found on campus, browse everyone's posts, mark their own item as returned, and delete their own post.

Built with React + Vite (JavaScript), one plain CSS file, and Supabase.

- `src/frontend/` — the pre-built UI. Not taught.
- `src/backend/` — every Supabase call. This is what students learn.
- `starter/backend/` — the student files with the function bodies removed.

The same commands work on **Windows, macOS and Linux**.

---

## 1. Install Node.js

Install the **LTS** version of Node.js from <https://nodejs.org> (Node 20.19+ or 22.12+). This also installs `npm`.

Check it worked (in Terminal on macOS/Linux, or PowerShell on Windows):

```
node -v
npm -v
```

## 2. Set up Supabase

1. Create a project at <https://supabase.com> (region: Singapore or Mumbai) and save the database password.
2. Go to **Authentication → Sign In / Providers → Email**:
   - turn **off** "Confirm email"
   - keep "Allow new users to sign up" **on**
   - leave CAPTCHA, leaked-password protection and extra password rules **off**
   - do not enable any other provider (Google, GitHub, phone, magic link)
3. Open the **SQL Editor** and run this:

```sql
create table categories (
  id bigint generated always as identity primary key,
  name text not null unique
);

insert into categories (name) values
  ('Electronics'),
  ('Identity Cards & Documents'),
  ('Keys'),
  ('Bags & Wallets'),
  ('Books & Stationery'),
  ('Clothing & Accessories'),
  ('Bottles & Containers'),
  ('Other');

create table items (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) default auth.uid(),
  category_id bigint not null references categories(id),
  type text not null check (type in ('lost', 'found')),
  title text not null,
  description text,
  place text not null,
  contact text,
  is_resolved boolean not null default false,
  created_at timestamptz not null default now()
);
```

4. Then run this too:

```sql
-- Day 2: no access rules yet (security comes on Day 3)
alter table categories disable row level security;
alter table items disable row level security;
```

If you make the tables in the Table Editor instead of SQL, untick **"Enable Row Level Security"** when creating them.

5. Newer Supabase projects don't let the app reach new tables until you allow it. Run this as well (without it you get **"permission denied for table categories"**):

```sql
-- Let logged-in users use the two tables
grant select on categories to authenticated;
grant select, insert, update, delete on items to authenticated;
```

## 3. Connect the app to Supabase

In the project folder, make a copy of `.env.example` called `.env`:

```
cp .env.example .env
```

(This works in Terminal on macOS/Linux and in PowerShell on Windows. You can also just create a file named `.env` in your editor.)

In Supabase, click **Connect → App Frameworks → React → Vite** and paste the `.env` block into your `.env` file as-is. It should look like this:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

If the Connect panel shows a different variable name on the day, update `src/backend/supabaseClient.js` to match.

## 4. Install and run

```
npm install
npm run dev
```

Open the link it prints (usually <http://localhost:5173>).

Check it works: sign up, post an item, mark it returned, delete it.

Stop the app with `Ctrl + C` in the terminal.

---

## For the instructor

### Before the session: give students the empty functions

Copy the starter files over the finished backend files:

```
cp starter/backend/* src/backend/
```

(Works in Terminal on macOS/Linux and in PowerShell on Windows. Or copy the three files by hand.)

`supabaseClient.js` and `session.js` are not in `starter/` because they never change. The app still loads with the starter files and shows the empty state, so students can write each function and watch it start working.

### Demo data

For the demo project, sign up a test user in the app and post 6–8 realistic items, for example:

- Lost — "Casio fx-991ES calculator" — Electronics — "FES lecture hall"
- Found — "Student card – Batch 35" — Identity Cards & Documents — "Library entrance"
- Lost — "Room keys with red keychain" — Keys — "H11"

### Day 3 hook

On Day 2 the UI hides Delete on other people's posts, but the database would still allow it. That gap is the hook for Day 3 security.

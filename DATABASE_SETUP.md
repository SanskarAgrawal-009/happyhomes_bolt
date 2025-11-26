# Database Setup Instructions

## Step 1: Run the SQL Migration

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Open the file `supabase/migrations/001_initial_schema.sql` from your project
5. Copy the entire SQL content
6. Paste it into the Supabase SQL Editor
7. Click **Run** to execute the migration

This will create all the necessary tables, indexes, Row Level Security policies, and triggers.

## Step 2: Create Storage Buckets

1. In your Supabase dashboard, navigate to **Storage** in the left sidebar
2. Click **New Bucket**
3. Create a bucket named `avatars`:
   - Name: `avatars`
   - Public: **Yes** (check the box)
   - Click **Create bucket**
4. Create another bucket named `portfolios`:
   - Name: `portfolios`
   - Public: **Yes** (check the box)
   - Click **Create bucket**

## Step 3: Set Up Storage Policies

After creating the buckets, you need to add storage policies:

1. Click on the `avatars` bucket
2. Go to **Policies** tab
3. Click **New Policy**
4. Create the following policies (you can use the SQL editor for this):

```sql
    -- Avatar images are publicly accessible
    CREATE POLICY "Avatar images are publicly accessible"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'avatars');

    -- Users can upload their own avatar
    CREATE POLICY "Users can upload their own avatar"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'avatars' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

    -- Users can update their own avatar
    CREATE POLICY "Users can update their own avatar"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'avatars' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

    -- Users can delete their own avatar
    CREATE POLICY "Users can delete their own avatar"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'avatars' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );
```

5. Repeat for the `portfolios` bucket:

```sql
-- Portfolio images are publicly accessible
CREATE POLICY "Portfolio images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolios');

-- Users can upload portfolio images
CREATE POLICY "Users can upload portfolio images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'portfolios' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Users can update their portfolio images
CREATE POLICY "Users can update their portfolio images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'portfolios' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Users can delete their portfolio images
CREATE POLICY "Users can delete their portfolio images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'portfolios' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
```

## Step 4: Verify Setup

1. Go to **Table Editor** in Supabase dashboard
2. You should see all these tables:
   - profiles
   - projects
   - portfolios
   - conversations
   - messages
   - contact_submissions

3. Go to **Authentication** > **Policies** to verify RLS is enabled on all tables

## Step 5: Test Authentication

After running `npm install` and `npm run dev`, you can test:

1. Navigate to `/signup`
2. Create a new account
3. Check the **Authentication** > **Users** tab in Supabase to see your new user
4. Check the **Table Editor** > **profiles** table to see your profile data

## Troubleshooting

- If you get "relation does not exist" errors, make sure the SQL migration ran successfully
- If authentication fails, check that your `.env` file has the correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- If file uploads fail, verify that storage buckets are created and set to public

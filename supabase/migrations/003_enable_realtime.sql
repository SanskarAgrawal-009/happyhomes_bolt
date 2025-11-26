-- =====================================================
-- ENABLE REALTIME FOR CHAT TABLES
-- =====================================================
-- This migration enables Supabase Realtime for the messages and conversations tables
-- to support real-time chat functionality without page reloads.

-- IMPORTANT: These SQL commands will NOT work directly in the SQL editor.
-- Realtime must be enabled through the Supabase Dashboard UI.

-- =====================================================
-- INSTRUCTIONS TO ENABLE REALTIME
-- =====================================================

-- 1. Go to your Supabase project dashboard
-- 2. Navigate to Database → Replication
-- 3. Find the "messages" table in the list
-- 4. Toggle the switch to enable replication for "messages"
-- 5. Find the "conversations" table in the list
-- 6. Toggle the switch to enable replication for "conversations"

-- =====================================================
-- VERIFY REALTIME IS ENABLED
-- =====================================================

-- After enabling replication in the dashboard, you can verify it's working by:
-- 1. Opening the Chat page in your application
-- 2. Checking the browser console for "Conversations subscription status: SUBSCRIBED"
-- 3. Testing with two browser windows (see verification plan in implementation_plan.md)

-- =====================================================
-- WHAT THIS ENABLES
-- =====================================================

-- With Realtime enabled on these tables, the application will:
-- - Receive instant updates when new messages are sent
-- - Update conversation list in real-time when messages arrive
-- - Show connection status (Connected/Disconnected)
-- - Provide live chat experience without page refreshes

-- =====================================================
-- TROUBLESHOOTING
-- =====================================================

-- If real-time is not working:
-- 1. Verify replication is enabled in Database → Replication
-- 2. Check browser console for subscription status
-- 3. Ensure RLS policies allow the user to view messages and conversations
-- 4. Try refreshing the page and checking the connection status indicator

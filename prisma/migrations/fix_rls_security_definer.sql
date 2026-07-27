-- ==============================================================================
-- Supabase Security Advisor Fix: Revoke Public Access to rls_auto_enable()
-- ==============================================================================

-- Option A: Revoke RPC execution privileges from public, anon, and authenticated users
-- This prevents signed-in users from invoking administrative security definer functions via /rest/v1/rpc/rls_auto_enable
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC, anon, authenticated;

-- Grant execution only to postgres superuser and service_role if needed internally
GRANT EXECUTE ON FUNCTION public.rls_auto_enable() TO postgres, service_role;

-- Option B (Alternative): If you prefer the function to execute with the caller's privileges instead of elevated superuser rights:
-- ALTER FUNCTION public.rls_auto_enable() SECURITY INVOKER;

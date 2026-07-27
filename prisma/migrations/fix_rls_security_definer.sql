-- ==============================================================================
-- Supabase Security Advisor Fix: Signed-In & Anon SECURITY DEFINER Function Access
-- Function: public.rls_auto_enable()
-- ==============================================================================

-- PERMANENT RECOMMENDED FIX:
-- Convert function from SECURITY DEFINER to SECURITY INVOKER.
-- This ensures the function runs with the calling user's permissions, resolving both signed-in and anon warnings.

ALTER FUNCTION public.rls_auto_enable() SECURITY INVOKER;

-- ALTERNATIVE FIX:
-- Revoke execution permissions from public, signed-in (authenticated), and anon roles:
-- REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC, authenticated, anon;
-- GRANT EXECUTE ON FUNCTION public.rls_auto_enable() TO postgres, service_role;

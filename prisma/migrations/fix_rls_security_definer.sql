-- ==============================================================================
-- Supabase Security Advisor Fix: Revoke Anon & Authenticated Execution
-- Function: public.rls_auto_enable()
-- ==============================================================================

-- 1. Revoke EXECUTE from PUBLIC, anon, and authenticated roles
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM anon;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM authenticated;

-- 2. Grant EXECUTE privileges strictly to postgres superuser and internal service_role
GRANT EXECUTE ON FUNCTION public.rls_auto_enable() TO postgres, service_role;

-- 3. (Optional Alternative) Convert to SECURITY INVOKER:
-- ALTER FUNCTION public.rls_auto_enable() SECURITY INVOKER;

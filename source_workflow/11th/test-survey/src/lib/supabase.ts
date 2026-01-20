import { createClient } from "@supabase/supabase-js";

// 환경변수 검증
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
}

if (!supabaseAnonKey) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

/**
 * 클라이언트용 Supabase 클라이언트 (브라우저)
 * 공개 키(anon key) 사용
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * 서버용 Supabase 클라이언트 (API Routes)
 * 서비스 롤 키 사용 (RLS 우회 가능)
 */
export function getServerSupabaseClient() {
  if (!supabaseServiceRoleKey) {
    throw new Error("Missing env.SUPABASE_SERVICE_ROLE_KEY");
  }
  
  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}



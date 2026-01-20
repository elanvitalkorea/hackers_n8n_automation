import { NextResponse } from 'next/server';

const likesStore = new Map<string, number>();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get('postId');
  
  if (!postId) {
    return NextResponse.json({ error: 'postId is required' }, { status: 400 });
  }
  
  const likes = likesStore.get(postId) || 0;
  
  return NextResponse.json({ 
    postId,
    likes,
    message: '서버에서 좋아요 수를 조회했습니다.'
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { postId } = body;
    
    if (!postId) {
      return NextResponse.json({ error: 'postId is required' }, { status: 400 });
    }
    
    const currentLikes = likesStore.get(postId) || 0;
    const newLikes = currentLikes + 1;
    
    likesStore.set(postId, newLikes);
    
    // 실제 프로젝트에서는 Supabase 등 DB 사용:
    // const { data } = await supabase.from('post_likes').upsert({ post_id: postId, likes: newLikes });
    
    return NextResponse.json({ 
      postId,
      likes: newLikes,
      message: '좋아요가 증가했습니다.'
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

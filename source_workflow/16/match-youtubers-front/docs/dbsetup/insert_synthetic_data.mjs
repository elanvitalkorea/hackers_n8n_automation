// insert_synthetic_data.mjs (합성 데이터 입력 스크립트)
// Usage:
//   1) npm i @supabase/supabase-js openai dotenv
//   2) Create .env from .env.example
//   3) node insert_synthetic_data.mjs

import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import 'dotenv/config';

// Import the dataset (put esm_dataset_100.mjs in the same folder)
import { channelDescriptions, youtubers } from './esm_dataset_100.mjs';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const EMBEDDING_MODEL = process.env.EMBEDDING_MODEL || 'text-embedding-3-small'; // 1536-dim

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY || !OPENAI_API_KEY) {
  console.error('❌ Missing env: SUPABASE_URL / SUPABASE_SERVICE_KEY / OPENAI_API_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// Helper: batch an array
function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function ensureYoutubers() {
  // First, check if youtubers table is empty or missing data
  const { data: existing, error: checkError } = await supabase
    .from('youtubers')
    .select('channel_name')
    .limit(1);
  
  if (checkError) throw checkError;
  
  // If table is empty, insert all youtubers
  if (!existing || existing.length === 0) {
    console.log('📝 Inserting youtubers data...');
    const batches = chunk(youtubers, 50);
    let inserted = 0;
    
    for (const batch of batches) {
      const { error } = await supabase.from('youtubers').insert(batch);
      if (error) throw error;
      inserted += batch.length;
      console.log(`✅ Inserted ${batch.length} youtubers (total ${inserted})`);
    }
  } else {
    console.log('ℹ️  Youtubers table already has data, skipping insert');
  }
  
  // Build map: channel_name -> id
  const { data, error } = await supabase.from('youtubers').select('id, channel_name');
  if (error) throw error;
  const map = new Map(data.map((r) => [r.channel_name, r.id]));
  return map;
}

async function main() {
  console.log('🔎 Ensuring youtubers data exists...');
  const youtuberIdByName = await ensureYoutubers();

  // Build parallel arrays
  const items = channelDescriptions.filter(d => d && d.name && d.content);
  console.log(`🧾 ${items.length} descriptions to embed`);

  const batches = chunk(items, 50); // avoid very large payloads
  let inserted = 0;

  for (const batch of batches) {
    console.log(`➡️ Embedding batch of ${batch.length} ...`);
    const resp = await openai.embeddings.create({
      model: EMBEDDING_MODEL,
      input: batch.map((b) => b.content)
    });

    const docs = [];
    for (let i = 0; i < batch.length; i++) {
      const { name, content } = batch[i];
      const yid = youtuberIdByName.get(name);
      if (!yid) {
        console.warn(`⚠️ Skip "${name}" (not found in youtubers table)`);
        continue;
      }
      const embedding = resp.data[i].embedding;
      docs.push({
        content,
        embedding,
        metadata: { channel_id: yid, channel_name: name }
      });
    }

    if (docs.length) {
      const { error } = await supabase.from('documents').insert(docs);
      if (error) throw error;
      inserted += docs.length;
      console.log(`✅ Inserted ${docs.length} documents (total ${inserted})`);
    }
  }

  console.log('🎉 Done.');
}

main().catch((e) => {
  console.error('❌ Failed:', e);
  process.exit(1);
});

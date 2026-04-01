/**
 * Script to create tables and seed data in Supabase
 * Uses the Supabase Management API via fetch
 * Run: node setup-supabase.mjs
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kwijwrnjluxojbqiwtzu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3aWp3cm5qbHV4b2picWl3dHp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5OTI5NTYsImV4cCI6MjA5MDU2ODk1Nn0.0CmdsYsCkz-ONYzMDCz7I8m7NQrq8aLpiCKJoTsiiag';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test connection first
async function testConnection() {
  console.log('🔍 Testing Supabase connection...');
  
  try {
    // Try to query menu_items - if it works, tables already exist
    const { data, error } = await supabase.from('menu_items').select('id').limit(1);
    
    if (error) {
      if (error.message.includes('does not exist') || error.code === '42P01') {
        console.log('❌ Tables do not exist yet. You need to run the SQL schema in the Supabase SQL Editor.');
        console.log('');
        console.log('📋 Steps:');
        console.log('   1. Go to https://supabase.com/dashboard/project/kwijwrnjluxojbqiwtzu/sql/new');
        console.log('   2. Copy-paste the contents of supabase_schema.sql');
        console.log('   3. Click "Run"');
        console.log('');
        return false;
      }
      console.log('⚠️  Error:', error.message);
      return false;
    }
    
    console.log('✅ Connection successful! Tables exist.');
    
    if (data && data.length > 0) {
      console.log(`   menu_items: has data`);
    } else {
      console.log('   menu_items: empty - will seed data');
      return 'NEEDS_SEED';
    }
    
    return true;
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
    return false;
  }
}

// Seed data if tables exist but are empty
async function seedData() {
  console.log('');
  console.log('🌱 Seeding data...');
  
  // Seed menu items
  const menuItems = [
    {
      name: 'Escalope Parmigiana',
      category: 'viandes',
      description: 'Escalope panée, sauce tomate maison et fromage gratiné, frites et salade',
      price: 42.00,
      price_for_2: 78.00,
      image: '/images/menu/viandes/escalope-parmigiana.jpeg',
      allergens: ['gluten', 'lait', 'œuf'],
      is_favorite: true,
      available: true,
      preparation_time: 25
    },
    {
      name: 'Côtes de Bœuf Confites',
      category: 'viandes',
      description: 'Côtes de bœuf confites 4h, riz, polenta frite et vinaigrette',
      price: 48.00,
      price_for_2: 88.00,
      image: '/images/menu/viandes/costela.jpeg',
      allergens: [],
      is_favorite: true,
      available: true,
      preparation_time: 35
    },
    {
      name: 'Picanha sur Plancha',
      category: 'viandes',
      description: '300g picanha grillée, riz, haricots tropeiro, farofa',
      price: 58.00,
      price_for_2: null,
      image: '/images/placeholder.jpeg',
      allergens: [],
      is_favorite: false,
      available: true,
      preparation_time: 20
    },
    {
      name: 'Poulet Fermier',
      category: 'volailles',
      description: 'Poulet effiloché sauce maison, riz, pommes paille',
      price: 39.00,
      price_for_2: 72.00,
      image: '/images/menu/volailles/frango-caipira.jpeg',
      allergens: ['lait'],
      is_favorite: true,
      available: true,
      preparation_time: 25
    },
    {
      name: 'Poulet Parmigiana',
      category: 'volailles',
      description: 'Poulet pané sauce tomate et fromage fondu',
      price: 38.00,
      price_for_2: null,
      image: '/images/placeholder.jpeg',
      allergens: ['gluten', 'lait', 'œuf'],
      is_favorite: false,
      available: true,
      preparation_time: 25
    }
  ];

  const { data: menuData, error: menuError } = await supabase
    .from('menu_items')
    .insert(menuItems)
    .select();

  if (menuError) {
    console.log('❌ Menu seed error:', menuError.message);
  } else {
    console.log(`✅ Menu items seeded: ${menuData.length} items`);
  }

  // Seed reviews
  const reviews = [
    { customer_name: 'Sophie Martin', rating: 5, comment: 'Cuisine exceptionnelle et service parfait !', approved: true },
    { customer_name: 'Lucas Bernard', rating: 4, comment: 'Très bon restaurant, ambiance chaleureuse.', approved: true }
  ];

  const { data: reviewData, error: reviewError } = await supabase
    .from('reviews')
    .insert(reviews)
    .select();

  if (reviewError) {
    console.log('❌ Reviews seed error:', reviewError.message);
  } else {
    console.log(`✅ Reviews seeded: ${reviewData.length} reviews`);
  }

  console.log('');
  console.log('🎉 Seeding complete!');
}

// Verify all tables
async function verifyTables() {
  console.log('');
  console.log('📊 Verifying all tables...');
  
  const tables = ['menu_items', 'reviews', 'reservations', 'contacts'];
  
  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('id').limit(1);
    
    if (error) {
      console.log(`   ❌ ${table}: ${error.message}`);
    } else {
      const { count } = await supabase.from(table).select('*', { count: 'exact', head: true });
      console.log(`   ✅ ${table}: ${count || 0} rows`);
    }
  }
}

// Main
async function main() {
  const result = await testConnection();
  
  if (result === 'NEEDS_SEED') {
    await seedData();
  } else if (result === true) {
    console.log('   Data already exists - skipping seed');
  }

  if (result) {
    await verifyTables();
  }
}

main().catch(console.error);

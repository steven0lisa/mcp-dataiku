#!/usr/bin/env node

import { DataikuClient } from './dist/dataiku-client.js';

async function testAPI() {
  console.log('🧪 Testing Dataiku MCP API...\n');

  try {
    const client = new DataikuClient();
    console.log('✅ Dataiku client created successfully');

    // Test 1: List projects
    console.log('\n📋 Test 1: Listing projects...');
    try {
      const projects = await client.listProjects();
      console.log(`✅ Found ${projects.length} projects:`);
      projects.forEach(project => {
        console.log(`   - ${project.key}: ${project.name}`);
      });
    } catch (error) {
      console.log(`❌ Error listing projects: ${error.message}`);
    }

    // Test 2: Get connections
    console.log('\n🔗 Test 2: Getting connections...');
    try {
      const connections = await client.getConnections();
      console.log(`✅ Found ${connections.length} connections:`);
      connections.forEach(conn => {
        console.log(`   - ${conn.name}: ${conn.type}`);
      });
    } catch (error) {
      console.log(`❌ Error getting connections: ${error.message}`);
    }

    // Test 3: Code environments
    console.log('\n🐍 Test 3: Getting code environments...');
    try {
      const envs = await client.getCodeEnvironments();
      console.log(`✅ Found ${envs.length} code environments`);
    } catch (error) {
      console.log(`❌ Error getting code environments: ${error.message}`);
    }

    console.log('\n🎉 API testing completed!');

  } catch (error) {
    console.error('💥 Failed to initialize client:', error.message);
    process.exit(1);
  }
}

testAPI().catch(console.error);
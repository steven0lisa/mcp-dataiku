#!/usr/bin/env node

import { DataikuClient } from './dist/dataiku-client.js';

async function testComprehensiveAPI() {
  console.log('🧪 Testing Comprehensive Dataiku MCP API...\n');

  try {
    const client = new DataikuClient();
    console.log('✅ Dataiku client created successfully');

    // Test 1: List projects
    console.log('\n📋 Test 1: Listing projects...');
    try {
      const projects = await client.listProjects();
      console.log(`✅ Found ${projects.length} projects`);

      if (projects.length > 0) {
        const firstProject = projects[0];
        console.log(`   Sample project: ${firstProject.key} - ${firstProject.name}`);

        // Test 2: Get project info
        console.log('\n🔍 Test 2: Getting project details...');
        try {
          const projectInfo = await client.getProject(firstProject.key);
          console.log(`✅ Project ${firstProject.key} info retrieved`);
        } catch (error) {
          console.log(`❌ Error getting project info: ${error.message}`);
        }

        // Test 3: Get project flow
        console.log('\n🌊 Test 3: Getting project flow...');
        try {
          const flow = await client.getProjectFlow(firstProject.key);
          console.log(`✅ Project flow retrieved`);
        } catch (error) {
          console.log(`❌ Error getting project flow: ${error.message}`);
        }

        // Test 4: List datasets
        console.log('\n📊 Test 4: Listing datasets...');
        try {
          const datasets = await client.listDatasets(firstProject.key);
          console.log(`✅ Found ${datasets.length} datasets in ${firstProject.key}`);

          if (datasets.length > 0) {
            const firstDataset = datasets[0];
            console.log(`   Sample dataset: ${firstDataset.name}`);

            // Test 5: Get dataset info
            console.log('\n📈 Test 5: Getting dataset info...');
            try {
              const datasetInfo = await client.getDatasetInfo(firstProject.key, firstDataset.name);
              console.log(`✅ Dataset info retrieved`);
            } catch (error) {
              console.log(`❌ Error getting dataset info: ${error.message}`);
            }
          }
        } catch (error) {
          console.log(`❌ Error listing datasets: ${error.message}`);
        }

        // Test 6: List recipes
        console.log('\n🍳 Test 6: Listing recipes...');
        try {
          const recipes = await client.listRecipes(firstProject.key);
          console.log(`✅ Found ${recipes.length} recipes in ${firstProject.key}`);

          if (recipes.length > 0) {
            const firstRecipe = recipes[0];
            console.log(`   Sample recipe: ${firstRecipe.name}`);
          }
        } catch (error) {
          console.log(`❌ Error listing recipes: ${error.message}`);
        }

        // Test 7: List scenarios
        console.log('\n🎬 Test 7: Listing scenarios...');
        try {
          const scenarios = await client.listScenarios(firstProject.key);
          console.log(`✅ Found ${scenarios.length} scenarios in ${firstProject.key}`);
        } catch (error) {
          console.log(`❌ Error listing scenarios: ${error.message}`);
        }
      }
    } catch (error) {
      console.log(`❌ Error listing projects: ${error.message}`);
    }

    // Test 8: Get code environments
    console.log('\n🐍 Test 8: Getting code environments...');
    try {
      const envs = await client.getCodeEnvironments();
      console.log(`✅ Found ${envs.length} code environments`);
    } catch (error) {
      console.log(`❌ Error getting code environments: ${error.message}`);
    }

    // Test 9: Get connections
    console.log('\n🔗 Test 9: Getting connections...');
    try {
      const connections = await client.getConnections();
      console.log(`✅ Found ${connections.length} connections`);
    } catch (error) {
      console.log(`❌ Error getting connections: ${error.message}`);
    }

    // Test 10: Get recent jobs
    console.log('\n⚡ Test 10: Getting recent jobs...');
    try {
      const jobs = await client.getJobs();
      console.log(`✅ Found ${jobs.length} recent jobs`);
    } catch (error) {
      console.log(`❌ Error getting recent jobs: ${error.message}`);
    }

    console.log('\n🎉 Comprehensive API testing completed!');

  } catch (error) {
    console.error('💥 Failed to initialize client:', error.message);
    process.exit(1);
  }
}

testComprehensiveAPI().catch(console.error);
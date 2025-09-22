#!/bin/bash

# test.sh - Simple test script for mcp-dataiku
# This script validates the build process without running actual tests

set -e  # Exit immediately on error

echo "🧪 Running basic validation tests for mcp-dataiku..."

# 1. Check if TypeScript compilation works
echo "🔍 Checking TypeScript compilation..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ TypeScript compilation failed"
    exit 1
fi

echo "✅ TypeScript compilation successful"

# 2. Check if the built files exist
echo "🔍 Checking built files..."
if [ ! -f "dist/mcp-server.js" ]; then
    echo "❌ MCP server not found in dist/"
    exit 1
fi

if [ ! -f "dist/dataiku-client.js" ]; then
    echo "❌ Dataiku client not found in dist/"
    exit 1
fi

echo "✅ Built files exist"

# 3. Check if package.json is valid
echo "🔍 Validating package.json..."
node -e "require('./package.json')" || {
    echo "❌ package.json is invalid"
    exit 1
}

echo "✅ package.json is valid"

# 4. Check if the main entry point can be loaded
echo "🔍 Testing module loading..."
node -e "
try {
    const server = require('./dist/mcp-server.js');
    console.log('✅ MCP server module loads successfully');
} catch (error) {
    console.error('❌ Failed to load MCP server module:', error.message);
    process.exit(1);
}
"

echo "✅ Module loading test passed"

# 5. Check environment variables
echo "🔍 Checking environment configuration..."
if [ -f "$HOME/.env" ]; then
    echo "✅ Found .env file in home directory"
elif [ -f ".env" ]; then
    echo "✅ Found .env file in project directory"
else
    echo "⚠️  No .env file found, but this is optional for testing"
fi

echo ""
echo "🎉 Basic validation tests completed successfully!"
echo "✅ The project is ready for publishing"
echo ""
echo "Note: This script only validates the build and basic functionality."
echo "For full testing, you would need to:"
echo "1. Set up a Dataiku DSS instance"
echo "2. Configure DSS_HOST and DSS_API_KEY environment variables"
echo "3. Run the comprehensive test suite with actual API calls"
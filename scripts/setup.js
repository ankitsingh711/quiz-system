#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

console.log('🚀 Setting up Personality Quiz App...\n')

// Check if .env.local exists
const envPath = path.join(__dirname, '..', '.env.local')
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env.local from .env.example...')
  const examplePath = path.join(__dirname, '..', '.env.example')
  if (fs.existsSync(examplePath)) {
    fs.copyFileSync(examplePath, envPath)
    console.log('✅ .env.local created! Please update it with your actual values.\n')
  }
}

// Install dependencies
console.log('📦 Installing dependencies...')
try {
  execSync('npm install', { stdio: 'inherit', cwd: path.join(__dirname, '..') })
  console.log('✅ Dependencies installed!\n')
} catch (error) {
  console.error('❌ Error installing dependencies:', error.message)
  process.exit(1)
}

console.log('🎉 Setup complete!')
console.log('\n📋 Next steps:')
console.log('1. Update .env.local with your MongoDB and ZeptoMail credentials')
console.log('2. Run "npm run dev" to start the development server')
console.log('3. Visit http://localhost:3000 to see your app!')
console.log('\n📚 Check README.md for detailed setup instructions.')

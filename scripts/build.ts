import { exec } from 'node:child_process'

import { getFilesAsync } from './getFiles'

const result = await Bun.build({
  entrypoints: (await getFilesAsync('./src')) ?? [],
  outdir: './dist',
  target: 'browser',
  format: 'esm',
  external: ['chrome'], // specify any external imports that should not be bundled
})

if (result.success) {
  console.log('Build succeeded')
  exec('cp ./manifest.json ./dist/manifest.json')
  exec('cp -r ./images ./dist/images')
  exec(`sed -i '' 's/GOOGLE_MAPS_API_KEY/${Bun.env.GOOGLE_MAPS_API_KEY}/g' ./dist/content.js`)
}

if (!result.success) {
  console.error('Build failed')
  for (const message of result.logs) {
    // Bun will pretty print the message object
    console.error(message)
  }
}

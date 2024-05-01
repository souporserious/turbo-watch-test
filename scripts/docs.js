const fs = require('fs')

async function compile() {
  console.log('⏳ Fetching docs...')

  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const allDocs = fs.readdirSync('docs').map((doc) => {
    const contents = fs.readFileSync(`docs/${doc}`, 'utf8')
    return {
      title: contents.slice(0, contents.indexOf('\n')).replace('#', '').trim(),
      slug: doc.replace('.mdx', ''),
    }
  })

  if (!fs.existsSync('.data')) {
    fs.mkdirSync('.data', { recursive: true })
  }

  fs.writeFileSync('.data/allDocs.json', JSON.stringify({ docs: allDocs }))

  console.log('✅ Docs compiled successfully!')
}

function start() {
  compile()

  if (process.env.NODE_ENV === 'production') {
    return
  }

  fs.watch('docs', (_, filename) => {
    console.log(`File changed: ${filename}`)
    compile()
  })
}

start()

const fs = require('fs')

console.log('⏳ fetching docs...')

function start() {
  // read all docs from docs directory
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

  return new Promise((resolve) => setTimeout(resolve, 2000))
}

start().then(() => {
  console.log('✅ docs fetched')
})

module.exports = {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md'
      }
    ],
    '@semantic-release/npm',
    [
      '@semantic-release/github',
      {
        assets: ['dist/**/*.{js,css,map}', 'doc/**/*.md', 'CHANGELOG.md', 'package.json', 'README.md']
      }
    ]
  ]
}

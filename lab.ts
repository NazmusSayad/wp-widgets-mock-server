const { jsonschema2md } = require('@adobe/jsonschema2md')
const schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'My Schema',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      description: 'The name of the person.',
    },
    age: {
      type: 'integer',
      description: 'The age of the person.',
    },
  },
}

const markdown = jsonschema2md(schema, {
  includeReadme: false,
})

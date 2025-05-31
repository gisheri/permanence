import { describe, it, expect } from 'vitest'
import { kebabCase } from './kebabCase'

describe('kebabCase', () => {
  it('should convert spaces to hyphens', () => {
    expect(kebabCase('Hello World')).toBe('hello-world')
    expect(kebabCase('hello world')).toBe('hello-world')
    expect(kebabCase('HELLO WORLD')).toBe('hello-world')
  })

  it('should convert camelCase to kebab-case', () => {
    expect(kebabCase('helloWorld')).toBe('hello-world')
    expect(kebabCase('camelCaseString')).toBe('camel-case-string')
    expect(kebabCase('XMLHttpRequest')).toBe('xml-http-request')
  })

  it('should convert snake_case to kebab-case', () => {
    expect(kebabCase('hello_world')).toBe('hello-world')
    expect(kebabCase('snake_case_string')).toBe('snake-case-string')
    expect(kebabCase('CONSTANT_CASE')).toBe('constant-case')
  })

  it('should handle mixed formats', () => {
    expect(kebabCase('hello_World Test')).toBe('hello-world-test')
    expect(kebabCase('camelCase_snake mixed')).toBe('camel-case-snake-mixed')
    expect(kebabCase('HTML_XML_Parser')).toBe('html-xml-parser')
  })

  it('should handle empty strings', () => {
    expect(kebabCase('')).toBe('')
  })

  it('should handle single characters', () => {
    expect(kebabCase('a')).toBe('a')
    expect(kebabCase('A')).toBe('a')
    expect(kebabCase('Z')).toBe('z')
  })

  it('should handle strings that are already kebab-case', () => {
    expect(kebabCase('hello-world')).toBe('hello-world')
    expect(kebabCase('already-kebab-case')).toBe('already-kebab-case')
  })

  it('should handle multiple consecutive spaces/underscores', () => {
    expect(kebabCase('hello    world')).toBe('hello-world')
    expect(kebabCase('hello___world')).toBe('hello-world')
    expect(kebabCase('hello  _  world')).toBe('hello-world')
  })

  it('should handle leading and trailing spaces/underscores', () => {
    expect(kebabCase(' hello world ')).toBe('hello-world')
    expect(kebabCase('_hello_world_')).toBe('hello-world')
    expect(kebabCase('  hello  world  ')).toBe('hello-world')
  })

  it('should handle numbers and special characters', () => {
    expect(kebabCase('version2API')).toBe('version2-api')
    expect(kebabCase('HTML5Parser')).toBe('html5-parser')
    expect(kebabCase('test123String')).toBe('test123-string')
  })

  it('should handle consecutive uppercase letters', () => {
    expect(kebabCase('HTTPSConnection')).toBe('https-connection')
    expect(kebabCase('XMLParser')).toBe('xml-parser')
    expect(kebabCase('APIKey')).toBe('api-key')
  })
})

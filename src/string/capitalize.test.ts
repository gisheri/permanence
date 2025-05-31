import { describe, it, expect } from 'vitest'
import { capitalize } from './capitalize'

describe('capitalize', () => {
  it('should capitalize the first letter and lowercase the rest', () => {
    expect(capitalize('hello world')).toBe('Hello world')
    expect(capitalize('HELLO WORLD')).toBe('Hello world')
    expect(capitalize('hELLO wORLD')).toBe('Hello world')
  })

  it('should handle single characters', () => {
    expect(capitalize('a')).toBe('A')
    expect(capitalize('A')).toBe('A')
    expect(capitalize('z')).toBe('Z')
  })

  it('should handle empty strings', () => {
    expect(capitalize('')).toBe('')
  })

  it('should handle strings with mixed case', () => {
    expect(capitalize('javaScript')).toBe('Javascript')
    expect(capitalize('HTML')).toBe('Html')
    expect(capitalize('camelCaseString')).toBe('Camelcasestring')
  })

  it('should handle strings with numbers and special characters', () => {
    expect(capitalize('123abc')).toBe('123abc')
    expect(capitalize('hello123')).toBe('Hello123')
    expect(capitalize('!hello world')).toBe('!hello world')
    expect(capitalize('hello-world')).toBe('Hello-world')
  })

  it('should handle whitespace-only strings', () => {
    expect(capitalize(' ')).toBe(' ')
    expect(capitalize('   ')).toBe('   ')
    expect(capitalize('\t')).toBe('\t')
    expect(capitalize('\n')).toBe('\n')
  })

  it('should handle unicode characters', () => {
    expect(capitalize('ñoño')).toBe('Ñoño')
    expect(capitalize('café')).toBe('Café')
    expect(capitalize('naïve')).toBe('Naïve')
  })
})

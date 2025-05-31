# Security Policy

## Supported Versions

We actively support the following versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 0.3.x   | :white_check_mark: |
| 0.2.x   | :white_check_mark: |
| < 0.2   | :x:                |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please report it to us as described below.

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via:
- Email: security@permanence.dev (if you have a domain)
- Or create a private GitHub security advisory

You should receive a response within 48 hours. If the issue is confirmed, we will release a patch as soon as possible depending on complexity.

## Security Measures

This package:
- Has zero runtime dependencies to minimize attack surface
- Uses automated dependency scanning via GitHub's Dependabot
- Implements strict TypeScript checks to prevent common vulnerabilities
- Maintains 100% test coverage to catch potential issues
- Uses automated security scanning in CI/CD pipeline

## Responsible Disclosure

We believe in responsible disclosure and will:
- Acknowledge receipt of your vulnerability report
- Provide an estimated timeline for addressing the vulnerability
- Notify you when the vulnerability is fixed
- Credit you for the discovery (if desired)

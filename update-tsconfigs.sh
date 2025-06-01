#!/bin/bash

# Base configurations for tsconfig.lib.json and tsconfig.spec.json
LIB_CONFIG='{
  "extends": ["./tsconfig.json", "../../tsconfig.base.lib.json"]
}'

SPEC_CONFIG='{
  "extends": ["./tsconfig.json", "../../tsconfig.base.spec.json"]
}'

# List of all packages (excluding capitalize and array which are already done)
PACKAGES=(
  "all" "function" "math" "object" "string" "type" "utility"
  "chunk" "cloneDeep" "compact" "debounce" "flatten" "isNil" 
  "kebabCase" "omit" "pick" "randomInt" "throttle" "union"
)

echo "Updating TypeScript configurations for all packages..."

for package in "${PACKAGES[@]}"; do
  echo "Updating $package..."
  
  # Update tsconfig.lib.json
  echo "$LIB_CONFIG" > "packages/$package/tsconfig.lib.json"
  
  # Update tsconfig.spec.json
  echo "$SPEC_CONFIG" > "packages/$package/tsconfig.spec.json"
done

echo "Done! Updated TypeScript configurations for ${#PACKAGES[@]} packages."

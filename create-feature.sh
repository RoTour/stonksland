#!/bin/sh

mkdir -p src/modules/$1
mkdir -p src/modules/$1/core
mkdir -p src/modules/$1/core/entities
mkdir -p src/modules/$1/core/interfaces
mkdir -p src/modules/$1/adapters
mkdir -p src/modules/$1/adapters/controllers
mkdir -p src/modules/$1/adapters/mappers
mkdir -p src/modules/$1/adapters/repositories
mkdir -p src/modules/$1/adapters/viewmodels
mkdir -p src/modules/$1/usecases
mkdir -p src/modules/$1/_tests
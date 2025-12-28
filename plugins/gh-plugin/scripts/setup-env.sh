#!/bin/bash

# GitHub Plugin Setup Script
# This script helps verify GitHub CLI installation and authentication

echo "🐙 GitHub Plugin Setup"
echo "======================"
echo ""

# Check if gh is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed"
    echo ""
    echo "Please install GitHub CLI:"
    echo ""
    echo "  macOS:    brew install gh"
    echo "  Windows:  winget install GitHub.cli"
    echo "  Linux:    See https://cli.github.com/manual/installation"
    echo ""
    exit 1
fi

# Get gh version
GH_VERSION=$(gh --version | head -n1)
echo "✅ GitHub CLI installed: $GH_VERSION"
echo ""

# Check authentication status
echo "Checking authentication..."
if gh auth status &> /dev/null; then
    echo "✅ Authenticated with GitHub"
    echo ""
    
    # Get user info
    USER=$(gh api user --jq '.login' 2>/dev/null)
    if [ -n "$USER" ]; then
        echo "   Account: @$USER"
    fi
    
    # Get auth details
    gh auth status 2>&1 | grep -E "(Logged in|git operations)" | sed 's/^/   /'
    echo ""
else
    echo "❌ Not authenticated with GitHub"
    echo ""
    echo "Please run:"
    echo "  gh auth login"
    echo ""
    echo "Follow the prompts to authenticate with your GitHub account."
    exit 1
fi

echo "✅ GitHub Plugin is ready to use!"
echo ""
echo "Try these commands:"
echo "  /gh-status         - Check connection"
echo "  /gh-repos          - List your repositories"
echo "  /gh-notifications  - View notifications"
echo ""

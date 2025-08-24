# EcoPoints - Environmental Impact Rewards

A blockchain-based environmental rewards website built on the Constellation Network. Earn EcoPoints for sustainable actions and redeem them for real-world rewards.

## 🌱 Features

- **Dashboard**: Track your environmental impact and achievements
- **Action Recording**: Submit eco-friendly actions (recycling, biking, solar energy use, etc.)
- **Leaderboard**: See top environmental champions
- **Rewards System**: Redeem EcoPoints for sustainable rewards
- **Blockchain Integration**: Connects to Constellation Network metagraph

## 🚀 Getting Started

1. **Prerequisites**: Ensure you have a running Constellation metagraph with:
   - Global L0 node
   - Metagraph L0 node (default: localhost:9200)
   - Currency L1 node (default: localhost:9300)

2. **Run the Website**:
   ```bash
   python3 -m http.server 8085
   ```

3. **Access**: Open your browser to `http://localhost:8085`

## 🏗️ Architecture

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Blockchain**: Constellation Network Tessellation Framework
- **Nodes**: 3-node metagraph (L0 Global, L0 Metagraph, L1 Currency)

## 📁 Files

- `index.html`: Main webpage structure
- `styles.css`: Environmental-themed styling and animations
- `app.js`: Blockchain integration and UI interactions

## 🌐 Blockchain Connection

The website connects to your local metagraph nodes:
- Metagraph L0: `http://localhost:9200`
- Currency L1: `http://localhost:9300`

## 🎯 Environmental Actions Supported

- ♻️ Recycling
- 🚴 Bike Commuting
- 🚌 Public Transport Use
- ☀️ Solar Energy Use
- 🌳 Tree Planting
- 💧 Water Conservation
- 🌱 Composting

## 🏆 Rewards Available

- 🌳 Plant a Tree (500 points)
- ☕ Eco Coffee Voucher (200 points)
- 🚲 Bike Maintenance (300 points)
- 🎫 Public Transit Pass (1000 points)

## 🤖 Built with Claude Code

This project was generated using Claude Code, Anthropic's official CLI for Claude.
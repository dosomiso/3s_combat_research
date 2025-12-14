# 🥋 3S Combat Research System (技擊類競賽即時評分系統)

> A cloud-deployed research version of the 3S Combat System, supporting live scoring and event management for judo, wrestling, and kyc (克拉柔) competitions.  
> This deployment runs on **Railway.app** with a Python Flask backend.

---

## 🌐 Demo Website

🔗 **Public URL (Production):**  
https://3scombatresearch-production.up.railway.app/  
🔒 **Access Password:** `91367**` *(for research demo only)*

---

## 🧠 Project Overview

This project extends the original **3S Hit Competition System** to support academic research and online deployment.  
It enables real-time score submission, event visualization, and result storage through a Flask backend.

### 📦 Main Components
| Folder/File | Description |
|--------------|-------------|
| `app.py` | Main Flask application (production entry point) |
| `test.py` | Local testing script — run `python3 test.py` to preview at `127.0.0.1:5000` |
| `kyc/` | 克拉柔比賽相關模組 |
| `judo/` | 柔道比賽模組 |
| `wrest/` | 角力比賽模組 |

---

## 🧰 Environment Setup

### Local Development
```bash
# Clone repository
git clone https://github.com/leonardo-lin/3s_hit_competition.git
cd 3s_hit_competition

# Install dependencies
pip install -r requirements.txt

# Run locally
python3 test.py
# Then open http://127.0.0.1:5000

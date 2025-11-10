# Dyno - Dashboard

<div align="center">

![Logo](./src/assets/images/logo.png)
![Version](https://img.shields.io/badge/version-1.0.1-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Go Version](https://img.shields.io/badge/react-19.1-4a9dba.svg)
[![Build](https://github.com/RndmCodeGuy20/dyno-fe/actions/workflows/ci.yaml/badge.svg)](https://github.com/rndmcodeguy20/dyno-fe/actions)

**A self-hostable, open-source DuckDNS alternative**

Lightweight dynamic DNS service that lets you manage your DNS records without manual overhead.

[Features](#-features) • [Contributing](#-contributing)

</div>

---

## 🔮 Installation

You can quickly install and run Dyno using a single command. Replace the environment variables with your own values:

```bash
DOMAIN=example.com \
PROVIDER_EMAIL=you@example.com \
PROVIDER_API_KEY=your_cloudflare_key \
POSTGRES_PASSWORD=secure_password \
curl -fsSL sh.rndmcode.in/dyno | bash
```

**Environment Variables:**

- `DOMAIN`: The domain you want to manage (e.g., `example.com`)
- `PROVIDER_EMAIL`: Your Cloudflare account email
- `PROVIDER_API_KEY`: Your Cloudflare API key (with DNS edit permissions)
- `POSTGRES_PASSWORD`: Password for the PostgreSQL database

This script will automatically download and set up Dyno with the provided configuration. After installation, follow the prompts to complete setup and access the dashboard.

## 📖 Overview

Dyno is a self-hosted dynamic DNS service that eliminates the manual overhead of managing DNS records. Bring your own domain and Cloudflare tokens, and let Dyno handle the rest. Perfect for home labs, development environments, and self-hosted infrastructure.

### Why Dyno?

- 🏠 **Self-Hosted**: Complete control over your DNS data
- 🔐 **Secure**: Token-based authentication for all operations
- 🚀 **Fast**: Built with Go for optimal performance
- 🔌 **API-First**: Comprehensive RESTful API for CLI/script automation
- 📦 **Easy Setup**: Docker support with minimal configuration
- 🌐 **Cloudflare Integration**: Currently supports Cloudflare DNS (more providers coming soon)
- 💾 **Persistent Storage**: PostgreSQL database for reliability

---

## ✨ Features

- **Dynamic DNS Updates**: Automatically update your DNS records when your IP changes
- **Multi-User Support**: User authentication and authorization system
- **RESTful API**: Full-featured API for programmatic access
- **Domain Management**: Create, read, update, and delete DNS records
- **IPv4 Support**: Automatic IP detection and DNS record updates
- **CLI-Friendly**: Simple GET endpoints for easy curl-based updates
- **Dashboard Ready**: API designed for web dashboard integration
- **Docker Support**: Easy deployment with Docker and Docker Compose
- **CI/CD Pipeline**: Automated builds and deployments with GitHub Actions

---

## 🛠️ Usage Examples

### Automated IP Updates with Cron

Create a script to update your IP automatically:

```bash
#!/bin/bash
# update-ip.sh
TOKEN="your_auth_token"
DOMAIN="home.yourdomain.com"
DYNO_URL="http://localhost:5010"
curl -s "${DYNO_URL}/api/v1/domain/update?domain=${DOMAIN}&token=${TOKEN}"
```

Add to crontab to run every 5 minutes:

```bash
*/5 * * * * /path/to/update-ip.sh
```

### Python Script

```python
import requests
DYNO_URL = "http://localhost:5010/api/v1"
TOKEN = "your_auth_token"
headers = {"Authorization": f"Bearer {TOKEN}"}
# List domains
response = requests.get(f"{DYNO_URL}/domains", headers=headers)
print(response.json())
# Update domain
response = requests.get(
    f"{DYNO_URL}/domain/update",
    params={"domain": "home.yourdomain.com"},
    headers=headers
)
print(response.json())
```

### PowerShell Script (Windows)

```powershell
$token = "your_auth_token"
$domain = "home.yourdomain.com"
$dynoUrl = "http://localhost:5010"
$headers = @{
    "Authorization" = "Bearer $token"
}
Invoke-RestMethod -Uri "$dynoUrl/api/v1/domain/update?domain=$domain" -Headers $headers
```

---

## 🔒 Security

- **Password Hashing**: Bcrypt with configurable cost
- **Token Authentication**: Secure token-based auth system
- **Input Validation**: Request validation on all endpoints
- **SQL Injection Protection**: Parameterized queries with sqlx
- **Rate Limiting**: Configurable via middleware
- **HTTPS Ready**: Deploy behind reverse proxy (Nginx/Traefik)

### Security Best Practices

1. **Use strong passwords** for database and user accounts
2. **Keep API tokens secure** - never commit them to version control
3. **Run behind a reverse proxy** with HTTPS in production
4. **Regularly update** dependencies and Docker images
5. **Limit database access** to the application only
6. **Use firewall rules** to restrict access to sensitive ports

---

## 🗺️ Roadmap

### Current Version (v0.0.1)

- ✅ Cloudflare DNS integration
- ✅ User authentication and authorization
- ✅ Domain CRUD operations
- ✅ Automatic IP detection
- ✅ RESTful API
- ✅ Docker support
- ✅ CI/CD pipeline

### Upcoming Features

- [ ] **Additional DNS Providers**
  - [ ] Route53 (AWS)
  - [ ] Google Cloud DNS
  - [ ] DigitalOcean DNS
  - [ ] Namecheap
- [ ] **IPv6 Support**
- [ ] **Web Dashboard**
  - [ ] User-friendly interface
  - [ ] Real-time DNS status
  - [ ] Domain management UI
- [ ] **Advanced Features**
  - [ ] Webhook notifications
  - [ ] Multi-domain support per user
  - [ ] DNS record history/audit log
  - [ ] API rate limiting per user
  - [ ] Email notifications
- [ ] **Monitoring**
  - [ ] Prometheus metrics
  - [ ] Health check endpoints
  - [ ] Status page

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Contribution Guidelines

- Follow Go best practices and conventions
- Write tests for new features
- Update documentation as needed
- Keep commits atomic and well-described
- Ensure CI/CD pipeline passes

### Code Style

This project follows standard Go conventions:

- Use `gofmt` for formatting
- Run `go vet` for static analysis
- Follow [Effective Go](https://golang.org/doc/effective_go) guidelines

---

## 🐛 Bug Reports & Feature Requests

Please use GitHub Issues to report bugs or request features:

- **Bug Report**: Describe the issue, steps to reproduce, and expected behavior
- **Feature Request**: Describe the feature and its use case

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
---

## 👨‍💻 Author

**Shantanu Mane**

- Email: [hi@rndmcode.in](mailto:hi@rndmcode.in)
- GitHub: [@rndmcodeguy20](https://github.com/rndmcodeguy20)

---

## 🙏 Acknowledgments

- Inspired by [DuckDNS](https://www.duckdns.org/)
- Built with [Go](https://golang.org/)
- Uses [Cloudflare Go SDK](https://github.com/cloudflare/cloudflare-go)
- Powered by [Chi Router](https://github.com/go-chi/chi)

---

## 📞 Support

If you find this project helpful, please consider:

- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🤝 Contributing code
- 📢 Sharing with others
For questions and support, please open an issue on GitHub.

---
<div align="center">

**Built with ❤️ by the community**

[Report Bug](https://github.com/rndmcodeguy20/dyno/issues/new) • [Request Feature](https://github.com/rndmcodeguy20/dyno/issues)

</div>

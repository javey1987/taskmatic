# Taskmatic MVP 产品方案

> AI 自动化模板平台 — 为小企业主和自由职业者提供的预设 AI 工作流

---

## 一、产品定位

| 项目 | 内容 |
|------|------|
| 产品名 | **Taskmatic** |
| 标语 | *AI automation that just works. No coding. No prompts. Just results.* |
| 目标用户 | 海外小企业主、自由职业者、电商卖家（非技术人员） |
| 核心价值 | 不需要懂 prompt、不需要搭 workflow，选模板填参数就能用 |
| 差异化 | 不做通用 agent builder，做**预制模板 + 一键运行** |

---

## 二、MVP 三个模板

### 模板 1：客户跟进自动化
```
痛点：小企业主卖了产品后忘记跟进，客户流失
功能：客户购买后自动发送感谢信 → 7天后跟进体验 → 30天后请求评价
输入：客户姓名、邮箱、购买产品
输出：预设好的 AI 邮件序列
```

### 模板 2：内容多平台转发
```
痛点：写了一篇博客/录了一期播客，没时间分发到不同平台
功能：输入一篇长文 → 自动生成 Twitter 线程、LinkedIn 文章、Newsletter
输入：文章 URL 或粘贴文字
输出：3 种格式的成品文案，可直接复制发布
```

### 模板 3：周报/月报自动生成
```
痛点：freelancer 每周要花 1 小时写周报给客户
功能：输入这周干了啥（几个关键词/要点）→ AI 生成专业周报
输入：要点列表或自由描述
输出：Markdown 格式的周报，可 PDF 导出
```

---

## 三、定价方案

| 方案 | 价格 | 功能 |
|------|------|------|
| **Free** | $0 | 1 个模板，每月 5 次运行 |
| **Pro** | **$19/月** 或 $190/年（省 2 个月） | 全部 3 个模板，每月 50 次运行，PDF 导出 |
| **Unlimited** | **$39/月** | 全部功能无限次运行，优先支持 |

> LemonSqueezy 审核需要明确的定价，不能写 "联系获取报价" 类模糊方案

---

## 四、MVP 技术栈

```
前端: Next.js + Tailwind CSS + shadcn/ui
部署: Vercel（免费套餐即可）
支付: LemonSqueezy API 接入
AI: OpenAI GPT-4o API（按量计费）
认证: NextAuth.js（邮箱登录 + Google OAuth）
数据库: Supabase（PostgreSQL，免费套餐）
域名: Namecheap + Cloudflare DNS
```

---

## 五、MVP 开发周期（2 周）

| 阶段 | 时间 | 内容 |
|------|------|------|
| Week 1 - Day 1-2 | 🏗️ 搭建 | Next.js 项目 + 认证系统 + 数据库 + LemonSqueezy 接入 |
| Week 1 - Day 3-4 | 🧠 AI 逻辑 | 3 个模板的 prompt 工程 + AI 调用封装 |
| Week 1 - Day 5 | 🎨 Landing Page | 产品介绍页 + 定价页 + 政策页面 |
| Week 2 - Day 1-2 | 🖥️ 用户界面 | 模板运行页面 + 历史记录 + 设置 |
| Week 2 - Day 3-4 | 🔗 集成测试 | LemonSqueezy 支付流程全链路测试 |
| Week 2 - Day 5 | 🚀 上线 | 部署 + 提交 LemonSqueezy 审核 |

---

## 六、LemonSqueezy 审核准备清单

### ✅ Landing Page 必备内容
- [x] 产品名称和简介（说明这是 SaaS 产品）
- [ ] 产品截图或演示（简单 mockup 即可）
- [ ] 清晰的定价方案（$19/$39 固定价格）
- [ ] 注册/开始按钮 CTA
- [x] Footer 链接到三个政策页面（同域名）

### ✅ 三个政策页面（同域名）
- [ ] **Terms of Service（服务条款）**
- [ ] **Privacy Policy（隐私政策）**
- [ ] **Refund Policy（退款政策，≥14天）**

### ✅ 禁止项检查
- ❌ 不涉及加密货币/金融/成人内容/博彩
- ✅ SaaS 产品订阅制，非人力服务

---

## 七、AI 成本估算

```
每个请求约 2000 tokens (输入) + 1000 tokens (输出) = 3000 tokens
GPT-4o mini 价格: $0.15/1M input, $0.6/1M output
单次成本 ≈ 2000 × 0.15/1M + 1000 × 0.6/1M = $0.0009

Pro 用户每月 50 次 → 成本 $0.045
Unlimited 假设 500 次/月 → 成本 $0.45

毛利率: $19 / ($19 + $0.045) ≈ 99.7%
```

---

## 八、下一步

1. ✅ 注册 LemonSqueezy 账户
2. ✅ 购买域名（如 taskmatic.ai 或 taskmatic.io）
3. ⬜ 搭建 Landing Page + 政策页面
4. ⬜ 开发 MVP 核心功能
5. ⬜ 提交 LemonSqueezy 审核
6. ⬜ 上线 + Product Hunt 发布

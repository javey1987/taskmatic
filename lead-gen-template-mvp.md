# Taskmatic 引流模板 — MVP 设计文档

> Taskmatic 第 4 个模板：Social Post Generator / Lead Magnet
> 更新：2026-06-08

---

## 一、模板定位

### 名称
**Social Post Generator**（社交内容自动生成器）

### 标语
*Write once, publish everywhere. AI-powered social content for small business owners.*

### 解决的痛点
- 小企业主知道要发社交内容引流，但**不知道写什么**
- 写了一篇内容，**没时间分发**到多平台
- 每条平台要**调整语气和格式**，太麻烦
- 结果是：**发了几天就断更了**，引流中断

### 核心价值
填一段话 → AI 自动生成 4 个平台的帖子 → 直接复制粘贴就能发

---

## 二、模板输入/输出定义

### 输入字段

| 字段 | 类型 | 占位符 | 说明 |
|------|------|--------|------|
| 业务/产品描述 | textarea | *"Tell us about your business in a few sentences..."* | 核心输入，描述他们做什么 |
| 目标受众 | text | *"e.g. Freelance designers, SaaS founders, local bakery customers"* | 写帖子时针对谁 |
| 本周亮点/内容点 | textarea（可选） | *"Any news, promotions, or content to feature this week?"* | 给 AI 素材，空则 AI 自动写通用内容 |
| 语气风格 | select | Professional / Warm & Friendly / Funny / Inspiring / Bold | 控制输出语气 |
| 平台选择 | multi-select | Twitter/X · LinkedIn · Reddit · Newsletter | 选要生成的平台 |

### 输出

按所选平台分别输出：

**Twitter/X Thread（3-6 条推文）**
- Thread 开头 + 每条推文内容 + CTA
- 每条 ≤ 280 字符
- 带 emoji 和话题标签建议

**LinkedIn 帖子**
- 专业口吻
- 300-500 字
- 带 3-5 个话题标签
- 附带 CTA

**Reddit 帖子**
- 适合 r/SaaS、r/smallbusiness、r/Entrepreneur 等版块
- 附发帖建议（选哪个 subreddit、什么时间发）
- 如果是 Show & Tell 格式，额外生成标题

**Newsletter 摘要**
- 5-8 行，可作为邮件发送
- 简洁、可扫描

---

## 三、模板 Prompt 设计

```markdown
System Prompt:

You are a social media content strategist specializing in helping small business owners
generate leads through organic social content. You understand the tone and format
requirements for each platform.

For the given business description, generate social posts in the user's preferred
tone ({tone}) targeting {audience}.

Rules:
- Each post must include a clear call-to-action
- Keep posts scannable and engaging
- Adapt to each platform's culture (Twitter=concise&conversational,
  LinkedIn=professional&thought-leadership, Reddit=authentic&helpful,
  Newsletter=valuable&scannable)
- Include relevant hashtags where appropriate
- Output in clear sections per platform
- Never use generic advice — make it specific to the business
```

---

## 四、免费引流策略（双重用途）

这个模板本身既是 **Taskmatic 的付费功能**，也是 **Taskmatic 的引流工具**。

### 策略：Free Mini Tool

在首页或独立页面做一个**完全免费的单平台版本**：

```
免费版：生成 1 条 Twitter 帖子（不登录，不付费）
Pro 版：生成全部 4 个平台的帖子 → 引导注册
```

**具体流程：**
1. 用户打开 `taskmatic.tech/free/social-post`
2. 填：业务描述 + 目标受众 → 点击生成
3. 10 秒内出一条 Twitter 帖子（完全免费，无需登录）
4. 页面底部：*"Want posts for LinkedIn, Reddit, and Newsletter too? Sign up for Taskmatic Pro →"*
5. 注册后可使用完整版

### SEO 价值

这个免费工具页面可以 SEO 优化，自然流量会带来持续注册：
- URL: `taskmatic.tech/free/ai-social-media-post-generator`
- Title: *Free AI Social Media Post Generator for Small Businesses*
- Description: *Generate engaging social media posts in seconds. No sign-up required.*
- 这类工具关键词搜索量大（"ai post generator" 等）

---

## 五、技术实现

### 代码改动

**1. store.ts — 添加模板定义**
```typescript
{
  id: 't4',
  slug: 'social-poster',
  name: 'Social Post Generator',
  description: 'Turn one idea into posts for Twitter, LinkedIn, Reddit, and your newsletter.',
  icon: '📱',
  category: 'Lead Generation',
  prompt: `You are a social media content strategist...`,
  fields: JSON.stringify([
    { key: 'businessDescription', label: 'What does your business do?', type: 'textarea', placeholder: 'Tell us about your business in a few sentences...' },
    { key: 'targetAudience', label: 'Target Audience', type: 'text', placeholder: 'e.g. Freelance designers, SaaS founders, local bakery customers' },
    { key: 'weeklyHighlight', label: 'This Week\'s Highlight (optional)', type: 'textarea', placeholder: 'Any news, promotions, or content to feature?' },
    { key: 'tone', label: 'Tone', type: 'select', options: ['Professional', 'Warm & Friendly', 'Funny', 'Inspiring', 'Bold'], default: 'Warm & Friendly' },
    { key: 'platforms', label: 'Platforms', type: 'select', options: ['All platforms', 'Twitter/X only', 'LinkedIn only', 'Reddit only', 'Newsletter only'], default: 'All platforms' }
  ]),
}
```

**2. 免费版路由（无需登录）**
```
GET /api/free/social-post?business=xxx&audience=xxx
→ 只生成 1 条 Twitter 帖子
→ 不计入使用次数
→ 限制：每小时 3 次（防滥用，基于 IP）
```

**3. 免费版页面**
```
app/free/social-post/page.tsx
→ 轻量表单，无需登录
→ 调用 /api/free/social-post
→ 展示结果 + 注册引导
```

**4. 首页模板卡片 — 新增**
在首页 Templates 区域加第 4 张卡片

---

## 六、定价影响

| 方案 | 原内容 | 新内容 |
|------|--------|--------|
| Free | 1 模板，5 次/月 | **全部 4 个模板**，5 次/月 |
| Pro ($19) | 全部 3 模板，50 次/月 | **全部 4 模板**，50 次/月 |
| Unlimited ($39) | 无限次 | 无限次 |

> ⚠️ 建议：不涨价。引流模板拉新用户，留存靠跟进+周报模板。
> 战略：用引流模板把人吸引进来，用其他模板让人留下来付费。

---

## 七、用户流程

```
                     ┌──────────────────┐
                     │  Google / Twitter │
                     │  搜索免费工具     │
                     └────────┬─────────┘
                              ▼
                   ┌──────────────────────┐
                   │ Free Social Post Gen │ ← 免费工具页
                   │ 填 2 个字段 → 生成    │
                   └────────┬─────────────┘
                            ▼
                   ┌──────────────────────┐
                   │ 得到 1 条 Twitter 帖子│ ← 不错，但不够
                   │ "想要更多平台？"      │
                   └────────┬─────────────┘
                            ▼
                   ┌──────────────────────┐
                   │  注册 Taskmatic       │ ← 免费注册
                   │  试用 Pro 功能        │ ← 1 个月免费
                   └────────┬─────────────┘
                            ▼
                   ┌──────────────────────┐
                   │ 用引流模板发帖 → 获客 │ ← 产生价值
                   │ 用跟进模板 → 留存客户 │ ← 看到更多价值
                   │ 用周报模板 → 提升报价 │ ← 值回票价
                   └────────┬─────────────┘
                            ▼
                   ┌──────────────────────┐
                   │    付费 Pro 续费      │
                   └──────────────────────┘
```

---

## 八、开发计划（3 天）

| 天 | 内容 |
|----|------|
| **Day 1** | 在 store.ts 添加模板定义 + 首页添加第 4 张模板卡片 |
| **Day 2** | 免费工具页面（无需登录）+ 免费 API 路由（IP 限频） |
| **Day 3** | 部署 + 测试全流程 + SEO 优化免费页面的 meta tags |

---

## 九、SEO 关键词策略

免费工具页面的 SEO 是引流的关键。目标关键词：

| 关键词 | 搜索意图 | 流量潜力 |
|--------|----------|----------|
| free ai social media post generator | 高 | ⭐⭐⭐⭐⭐ |
| ai post generator for small business | 中 | ⭐⭐⭐⭐ |
| free twitter thread generator | 中 | ⭐⭐⭐⭐ |
| ai content repurposing tool | 中 | ⭐⭐⭐ |
| social media content generator free | 高 | ⭐⭐⭐⭐⭐ |

建议在免费页面内容中自然嵌入这些关键词。

---

## 十、成功指标

| 指标 | MVP 目标值（首月） |
|------|-------------------|
| 免费工具页 UV | 1,000-3,000 |
| 免费工具 → 注册转化率 | 5-10% |
| Social Poster 使用次数（已注册用户） | 200+ |
| 该模板带来的新注册 | 50-150 |

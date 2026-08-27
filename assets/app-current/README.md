# 当前 App UI 素材记录

这些 PNG 由固定模拟器上的 Debug production SwiftUI 路由采集，使用深色系统外观：

- Simulator UDID: `096F0A51-615D-4B83-8433-374F7DE9A986`
- Bundle: `com.zyiszy.PrivateVault.Development`
- Source commit: `8fc42fcfbe7e40bd955d6956bce55bf11569c69c`
- Capture date: 2026-08-27 (UTC)
- Content type: `REAL_APP_UI + SYNTHETIC_TEST_CONTENT`
- Appearance: Dark

| 文件 | Debug route | 说明 |
|---|---|---|
| `vault-media-dark-zh-Hans.png` | `vault.media` | 真实媒体网格 UI；缩略图是 Debug 合成占位内容 |
| `vault-media-landscape-dark-zh-Hans.png` | `vault.media` | 深色媒体网格复采集；用于页面流程展示 |
| `vault-collections-dark-zh-Hans.png` | `vault.collections` | 真实相册集合 UI；内容为测试状态 |
| `settings-innerWithMigration-dark-zh-Hans.png` | `settings -ui-state innerWithMigration` | 真实设置 UI；包括 Face ID 入口，不能替代功能测试证据 |
| `backup-status-dark-zh-Hans.png` | `backup.status` | 真实加密备份状态 UI；未设置位置为测试状态 |
| `migration-confirm-dark-zh-Hans.png` | `migration.confirm` | 真实迁移确认 UI；测试状态，展示双认证提示 |
| `trash-dark-zh-Hans.png` | `trash` | 真实回收站 UI；内容为测试状态 |
| `unlock-dark-zh-Hans.png` | `unlock` | 真实解锁 UI；不代表已配置用户凭据 |
| `import-preflight-dark-zh-Hans.png` | `import.preflight` | 真实导入预检 UI；测试状态 |
| `import-progress-dark-zh-Hans.png` | `import.progress` | 真实导入进度 UI；测试状态 |
| `reports-batch-dark-zh-Hans.png` | `reports.batch` | 真实批次报告 UI；测试状态 |
| `privacy-pending-dark-zh-Hans.png` | `privacy.pending` | 真实隐私确认 UI；测试状态 |
| `photos-picker-landscape-dark-zh-Hans.png` | `system.photosPicker` | 真实照片选择入口；导入风景素材后采集 |
| `settings-zh-Hans.png` | `settings` | REAL_APP_UI，但为空白诊断画面；仅保留审计，不在官网引用 |

网页仅使用带 `-dark-` 的图片，并在图注中明确“当前 Debug production UI / 合成演示内容”。未经授权的照片素材不会被加入页面。

# Freezon / 定格 产品事实基线

审计范围：

- 官网：`/Users/mac/code/local/freezon-site`
- iOS 产品源码：`/Users/mac/code/local/ios-private-photo-vault`
- 审计 commit：`08b36d0438c0c8489a0950ef3e49cc3dcd40bdb6`（2026-08-27）
- 固定模拟器：`096F0A51-615D-4B83-8433-374F7DE9A986`
- Bundle：`com.zyiszy.PrivateVault.Development`

状态定义：`VERIFIED` = 源码实现入口和测试证据相互对应；`PARTIAL` = 有实现或测试，但范围、完成度或用户流程仍有限定；`PLANNED` = 仅规划或路线图；`UNVERIFIED` = 当前没有足够证据；`REJECTED` = 已确认不存在或表述不准确。

## 功能与声明

| 功能或声明 | 状态 | 源码路径 / 实现入口 | 测试证据 | 是否允许官网公开 | 准确可用文案 | 对应真实截图 |
|---|---|---|---|---|---|---|
| Freezon / 定格是面向 iPhone 的私人相册应用 | VERIFIED | `PrivateVault/PrivateVault/App/RootView.swift`；`PrivateVault/PrivateVault/Features/Shared/VaultFeatureStore.swift` | `PrivateVaultUITests/FeatureRoutesUITests.swift` | 是 | “面向 iPhone 的私人相册应用” | 是，`vault-media-dark-zh-Hans.png` |
| 日常相册与私密相册两个 vault 角色 | VERIFIED | `PrivateVault/PrivateVault/Domain/Identifiers.swift`（`VaultRole.outer / inner`）；`PrivateVault/PrivateVault/Features/Shared/VaultFeatureStore.swift` | `PrivateVaultTests/App/VaultFeatureStoreTests.swift` 双层设置与会话测试；`PrivateVaultUITests/FeatureRoutesUITests.swift` | 是，使用用户术语“日常相册 / 私密相册” | “一个入口，分别进入日常相册与私密相册” | 是，`assets/realscreens/` 中包含相册与移动流程真机截图 |
| 两个相册分别使用密码、安全恢复码、密钥与存储身份 | VERIFIED | `PrivateVault/PrivateVault/Security/CredentialActor.swift`（`prepareCredential`、`preparedMaterializationIdentity`）；`PrivateVault/PrivateVault/Security/KeyHierarchy.swift`；`PrivateVault/PrivateVault/Domain/Identifiers.swift` | `PrivateVaultTests/App/VaultFeatureStoreTests.swift` 双层 setup / credential 测试；`PrivateVaultTests/Security/NonEmptyRecoveryTests.swift` | 是，不得把“分别加密”写成“重复加密两次” | “日常相册与私密相册分别设置密码和安全恢复码，并使用各自的加密存储” | 是，`assets/realscreens/` 中有相册与设置相关真机截图 |
| 使用安全恢复码重设对应相册密码并重新进入原有内容 | VERIFIED | `PrivateVault/PrivateVault/Security/CredentialActor.swift`（`recoverNonEmptyLayer`）；`PrivateVault/PrivateVault/Features/Shared/VaultProductionAdapter.swift`（`recoverPassword`）；`PrivateVault/PrivateVault/Features/Unlock/UnlockViews.swift`（`LockRecoveryView`） | `PrivateVaultTests/App/VaultFeatureStoreTests.swift::testProductionCredentialRecoveryEmitsTypedTraceAndRewrapsExactLayer`；`PrivateVaultUITests/SetupUnlockUITests.swift::testBackgroundFromRecoveryReturnsLockedWithoutSensitiveSnapshot` | 是，必须说明本机验证、内容不变且开发者无法代为找回 | “用安全恢复码重设对应相册的密码，原有内容不会因此改变” | 否，当前没有恢复码真机截图 |
| 使用安全恢复码打开对应相册的加密备份并恢复内容 | VERIFIED | `PrivateVault/PrivateVault/Features/Shared/VaultProductionAdapter.swift`（`SetupRestorePreparationWorker.open`）；`PrivateVault/PrivateVault/Operations/SetupRestoreCoordinator.swift`；`PrivateVault/PrivateVault/Backup/RestoreEngine.swift` | `PrivateVaultTests/App/VaultFeatureStoreTests.swift::testSetupRestoreResultPresentsPasswordInStableRouteOrStaysForRetry`；`PrivateVaultTests/Backup/BackupRecoveryContractTests.swift`；`RestoreAndVerificationTests.swift` | 是，必须说明恢复来源是用户持有的加密备份 | “在本机使用安全恢复码打开对应相册的加密备份，并恢复照片和视频” | 是，`assets/realscreens/` 中有加密备份真机截图；当前没有恢复过程截图 |
| Face ID 快速解锁 | VERIFIED | `Security/BiometricAuthenticator.swift`；`Features/Shared/VaultFeatureStore.swift` | `VaultFeatureStoreTests.swift` Face ID / biometric 测试（约 6875、6919、6955、6974、13949 行） | 是，必须限定为系统生物识别能力 | “支持使用 Face ID 解锁（需设备与设置支持）” | 是，`settings-innerWithMigration-dark-zh-Hans.png` |
| 本地加密数据库与媒体存储 | VERIFIED | `Storage/SQLCipherConnection.swift`；`Storage/SQLCipherConnectionRegistry.swift`；`Security/CryptoSuite.swift` | `SQLCipherConnectionTests.swift`、`ProtectedStorageBoundaryTests.swift`、`DatabaseCreationRaceTests.swift` | 是，首页可用准确的“本地加密存储” | “内容保存在设备侧的加密存储中” | 部分，`vault-media-dark-zh-Hans.png`（不展示实现细节） |
| PBKDF2 / HKDF / AES-GCM / SHA-256 密码学组件 | VERIFIED | `Security/PasswordKDF.swift`；`Security/CryptoSuite.swift` | `PasswordKDFTests.swift` 及 Security/Storage 测试 | 否，首页不宣传算法参数 | “采用经过测试的加密组件” | 否 |
| 导入预检、加密处理、进度与批次报告 | VERIFIED | `Operations/ImportCoordinator.swift`；`Features/Import/ImportViews.swift` | `PrivateVaultUITests/ImportReportUITests.swift`（`import.preflight`、`import.progress`、`reports.batch`） | 是 | “导入前先检查，处理过程可查看进度与报告” | 是，`import-preflight-dark-zh-Hans.png`、`import-progress-dark-zh-Hans.png`、`reports-batch-dark-zh-Hans.png` |
| 导入时选择保留原片或成功后清理 | VERIFIED | `Features/Import/ImportViews.swift`（`keepOriginals`、`cleanUpAfterSuccessfulImport`）；`Features/Shared/VaultFeatureStore.swift`；`Operations/SystemPhotoDeletionCoordinator.swift` | `PhysicalMediaFlowUITests.swift::testImportSourceChoicePersistsAcrossRestart`；`PhotoDeletionGateTests.swift`；`VaultFeatureStoreTests.swift` explicit request 测试 | 是，写清先完成加密与完整性检查，再进入清理确认 | “导入时可选择保留系统相册原片，或在导入成功后清理” | 是，`import-sourceChoice-dark-zh-Hans.png`、`systemDeletion-riskConfirmations-dark-zh-Hans.png` |
| 加密备份、恢复与增量备份 | VERIFIED | `Backup/BackupSetWriter.swift`；`Backup/BackupVerificationCoordinator.swift`；`Backup/IncrementalBackupCoordinator.swift`；`Backup/RestoreEngine.swift`；`Features/Backup/BackupViews.swift` | `RestoreAndVerificationTests.swift`、`IncrementalBackupTests.swift`、`BackupRecoveryContractTests.swift`、`BackupSnapshotLeaseTests.swift` | 是，说明由用户在系统“文件”中选择位置 | “加密备份可保存到你选择的‘文件’位置，包括 iCloud Drive，并支持恢复” | 是，`backup-auto-zh-Hans.png`、`backup-status-dark-zh-Hans.png` |
| 通过系统“文件”转移 `.pvb` 加密备份并在另一台 iPhone 恢复 | VERIFIED | `Backup/BackupDestinationPicker.swift` 生成用户持有的 `.pvb` 文件；`Features/Setup/SetupViews.swift` 通过系统文件选择器接收 `.pvb` 并使用备份恢复码验证；AirDrop 由系统“文件”提供 | `BackupRecoveryContractTests.swift`；`SetupUnlockUITests.swift` 备份选择与恢复码输入流程 | 是，必须把隔空投送描述为系统文件传输方式，不宣称 App 内置分享按钮 | “可通过隔空投送等‘文件’方式把 `.pvb` 加密备份带到另一台 iPhone，再用该备份的安全恢复码恢复原片” | 是，`setup-restore-dark-zh-Hans.png` |
| 跨相册迁移与双认证确认流程 | PARTIAL | `Operations/MigrationCoordinator.swift`；`Storage/CrossVaultMigrationCommitter.swift`；`Security/DualVaultMigrationLease.swift` | `MigrationCrashTests.swift`、`DualVaultMigrationLeaseTests.swift`、`VaultFeatureStoreTests.swift` migration 测试 | 可公开为流程存在，不能写“自动重新加密” | “支持在明确认证与确认流程下移动内容” | 是，`migration-confirm-dark-zh-Hans.png` |
| 回收站、恢复和最终删除流程 | VERIFIED | `Features/Trash/TrashView.swift`；`Operations/TrashCoordinator.swift` | `VaultTrashUITests.swift`、`TrashLifecycleTests.swift` | 是 | “删除的内容会经过回收站流程，可按应用内选项恢复或删除” | 是，`trash-dark-zh-Hans.png` |
| 照片、视频、GIF、Live Photo 按原始资源无损导入导出 | VERIFIED | `Photos/PhotoResourceStreamSink.swift`；`Photos/PhotoManifestBuilder.swift`；`Features/Export/PhotoExportProductionBridge.swift`；`Operations/PhotoExportCoordinator.swift`；`Photos/PhotoLibraryWriter.swift` | `PhotoResourceStreamSinkTests.swift` 原始资源字节数与 SHA-256；`PhotoExportCoordinatorTests.swift::testSupportedKindsMapExactResourceTypes`；`ChunkedMediaReaderTests.swift` 加密明文恢复 | 是，限定已验证的媒体类型，不扩展为“所有格式” | “照片、视频、GIF 和实况照片按原始资源无损导入导出，不压缩，不改变原文件” | 是，`assets/realscreens/` 中包含照片、视频与实况照片界面 |
| RAW / ProRAW / 4K HDR 全格式支持 | UNVERIFIED | 当前没有覆盖全部格式的端到端证据 | 无足够测试证据 | 否 | 不公开 | 否 |
| EXIF / GPS 读取或擦除 | UNVERIFIED | 当前审计未找到完整的公开产品流程证据 | 无足够测试证据 | 否 | 不公开 | 否 |
| 后台隐私遮罩与屏幕捕获保护 | VERIFIED | `App/Lifecycle/PrivacyShieldWindowController.swift`；`BackgroundSecurityBarrier.swift`；`ScreenCaptureMonitor.swift`；`App/RootView.swift` | `VaultFeatureStoreTests.swift` privacy snapshot / shield 测试 | 是，避免“绝对防护” | “进入后台或屏幕捕获状态时，界面会隐藏敏感内容” | 当前截图目录未采集遮罩路由 |
| 诊断记录与手动反馈 | PARTIAL | `Features/Shared/VaultFeatureStore.swift` 诊断入口；support/privacy 页面 | `ImportReportUITests.swift` 诊断入口断言 | 是，需说明发送前确认 | “反馈或诊断信息在发送前由你确认” | 否 |
| 媒体自动上传开发者服务器 | VERIFIED（否定声明） | `privacy/index.html`；产品网络边界实现与配置审计 | 隐私政策审计；未发现自动上传服务入口 | 是 | “不会自动上传照片、视频或相册资料到开发者服务器” | 否 |
| 当前生产版本免费使用 | VERIFIED | `PrivateVault/PrivateVault/Commerce/CommerceConfiguration.swift`（`production = .disabled`）；`PrivateVault/PrivateVault/Commerce/CommerceRuntime.swift` | `CommerceModelsTests.swift`、`CommerceRuntimeTests.swift` 验证默认商业模式为 disabled | 是 | “当前免费使用” | 否 |
| 当前无广告与摇一摇打扰 | VERIFIED（否定声明） | App 源码审计未发现广告 SDK、开屏广告或 `CoreMotion` 摇一摇触发逻辑；Commerce 访问策略未启用限制 | 静态搜索与配置审计 | 是 | “没有开屏广告，也没有摇一摇等打扰” | 否 |
| 首批用户永久免费 | POLICY | 产品方在 2026-08-28 确认的首批用户政策；代码仅预留 `earlyAdopterLifetime` 权益模型，当前未配置版本范围 | 不是当前代码能力，不应据此声称已完成自动绑定 | 是，作为产品政策公开 | “首批用户永久免费” | 否 |
| 后续买断制 | PLANNED | Commerce 模块预留 `nonConsumableLifetime` 与 StoreKit 商品配置，但当前没有真实商品 ID 且生产模式 disabled | 无当前上线购买流程证据 | 否，暂不作为当前功能或价格承诺 | 不公开未来价格安排 | 否 |
| SQLCipher 数据库实现 | VERIFIED | `PrivateVault/PrivateVault/Storage/SQLCipherConnection.swift`；`PrivateVault/PrivateVault/Storage/LayerStoreActor.swift` | `PrivateVaultTests/Storage/SQLCipherConnectionTests.swift`；`LayerStoreActorTests.swift` | 不公开算法名，只作为“本机加密存储”的内部证据 | “内容保存在本机加密存储中” | 否 |
| Secure Enclave、硬件级 AES、绝对安全、零泄漏风险 | REJECTED | 没有对应公开承诺证据，且绝对安全表述不适合作为产品承诺 | 无可支持官网绝对化文案的证据 | 否 | 不公开 | 否 |
| 断点续传、局域网点对点迁移 | UNVERIFIED | README / ROADMAP 只能作为线索，未找到完成度证据 | 无足够端到端测试证据 | 否 | 不公开 | 否 |
| App Store 产品链接 | UNVERIFIED | 当前仓库没有有效产品页 URL | 无 | 否 | 待提供真实链接后再加入 | 否 |

## 素材证据

| 素材 | 状态 | 使用规则 |
|---|---|---|
| `assets/app-current/*-dark-zh-Hans.png` | VERIFIED 的真实 App UI；媒体内容为 Debug synthetic test content | 可用于展示当前 UI 结构；必须同时标注深色模式、Debug production UI 与合成内容，不得暗示为真实用户照片 |
| `assets/app-current/settings-zh-Hans.png` | REAL_APP_UI 但为空白诊断画面 | 保留作为审计资料，不在官网引用 |
| `assets/realscreens/` | 用户提供并确认可用于官网的当前真机截图 | 首页优先使用 |
| `assets/screens/` | design-reference | 仅内部设计参考，禁止作为产品截图展示 |
| `assets/photos/` | UNVERIFIED 授权 | 未有授权来源记录，本轮不公开使用 |

## 首页公开范围

首页可展示：双层私密相册产品类别；日常相册与私密相册分别使用密码、安全恢复码和本机加密存储；Face ID 快速解锁日常相册（需设备与设置支持）；安全恢复码在本机验证后重设对应相册密码且不改变原有内容，或打开用户持有的对应加密备份并恢复照片和视频；通过隔空投送等系统“文件”方式把 `.pvb` 加密备份带到另一台 iPhone，再用该备份的安全恢复码恢复原片；照片、视频、GIF 和实况照片按原始资源无损导入导出；导入时选择保留系统相册原片或在导入成功后清理；加密备份保存到用户选择的“文件”位置（包括 iCloud Drive 或其他文件提供器）；回收站与隐私遮罩；系统要求为 iOS 26 或更高版本。算法参数、绝对安全或零泄漏风险、未验证格式、规划能力和无有效地址的 App Store 链接不作为首页承诺。

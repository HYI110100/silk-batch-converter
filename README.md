# 🎵 Silk音频批量转换工具

一个简单高效的批量转换工具，专为将Silk音频文件(.silk)转换为WAV格式设计。

## 📌 项目功能

- 批量转换整个目录下的.silk文件
- 自动处理音频参数转换
- 内置FFmpeg支持，无需额外安装
- 支持Windows/macOS/Linux平台

## 🚀 快速开始

### 基本使用方式

```bash
# 克隆项目
git clone https://github.com/yourusername/silk-batch-converter.git
cd silk-batch-converter

# 安装依赖
npm install

# 运行转换
node src/convert.js

### 前期准备

1. **文件准备**：
   - 将所有.silk音频文件放入`input`目录
   - 确保文件扩展名为`.silk`

2. **目录结构**：
```text
silk-batch-converter/
├── input/       # 存放待转换文件
├── output/      # 输出转换结果
└── src/         # 源代码
```

### 详细使用步骤

1. 将需要转换的.silk文件放入`input`目录
2. 打开终端/命令行，进入项目目录
3. 执行转换命令：
   ```bash
   node src/convert.js
   ```
4. 等待转换完成，结果将保存在`output`目录

### 高级选项

通过修改`src/convert.js`中的配置参数，可以调整转换设置：

```javascript
// 音频参数配置
const config = {
  sampleRate: 24000,   // 采样率(Hz)
  channels: 1,         // 声道数(1=单声道, 2=立体声)
  bitrate: '320k'      // 比特率(音频质量)
};
```

## ⚙️ 技术说明

### 依赖组件

- **必需组件**：
  - Node.js (v14+)
  - npm (v6+)
  
- **内置组件**：
  - FFmpeg (通过ffmpeg-static自动包含)
  - Silk解码器(已包含)

### 转换流程

1. Silk → PCM (使用silk_v3_decoder.exe)
2. PCM → WAV (使用FFmpeg)
3. 自动清理临时文件

#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const ffmpegStatic = require('ffmpeg-static');

// 配置
const config = {
  inputDir: path.join(__dirname, '../input'),
  outputDir: path.join(__dirname, '../output'),
  decoderPath: path.join(__dirname, '../bin/silk_v3_decoder.exe'),
  sampleRate: 24000,
  channels: 1,
  bitrate: '320k'
};

// 确保输出目录存在
fs.ensureDirSync(config.outputDir);

console.log('开始转换 Silk 音频文件...');
console.log(`输入目录: ${config.inputDir}`);
console.log(`输出目录: ${config.outputDir}`);

try {
  const files = fs.readdirSync(config.inputDir).filter(f => f.endsWith('.silk'));

  if (files.length === 0) {
    console.log('没有找到任何 .silk 文件');
    process.exit(0);
  }

  console.log(`找到 ${files.length} 个待转换文件`);

  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    const silkPath = path.join(config.inputDir, file);
    const pcmPath = path.join(config.outputDir, file.replace(/\.silk$/, '.pcm'));
    const wavPath = path.join(config.outputDir, file.replace(/\.silk$/, '.wav'));

    console.log(`[${index + 1}/${files.length}] 正在转换 ${file}`);

    // 1. silk -> pcm
    execSync(`"${config.decoderPath}" "${silkPath}" "${pcmPath}"`, { stdio: 'inherit' });

    // 2. pcm -> wav
    execSync(`"${ffmpegStatic}" -y -f s16le -ar ${config.sampleRate} -ac ${config.channels} -i "${pcmPath}" -b:a ${config.bitrate} "${wavPath}"`, {
      stdio: 'inherit'
    });

    // 3. 删除中间文件
    fs.unlinkSync(pcmPath);

  }

  console.log('\n全部转换完成！');
} catch (error) {
  console.error('发生错误:', error.message);
  process.exit(1);
}
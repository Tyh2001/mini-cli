#!/usr/bin/env node
// 告诉操作系统使用什么命令执行

import { program } from 'commander'
import fs from 'node:fs'
import inquirer from 'inquirer'
import { checkPath, downloadTemp } from './utils.js'

let json = fs.readFileSync('./package.json')
json = JSON.parse(json)

program.version(json.version)

program
  .command('create <projectName>')
  .alias('c')
  .description('创建项目')
  .action((projectName) => {
    console.log(projectName)
    inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: '请输入项目名称',
        default: projectName
      },
      {
        type: 'confirm',
        name: 'isTs',
        message: '是否使用 TypeScript 模板？ '
      }
    ]).then(res => {
      console.log(res)
      if (checkPath(res.projectName)) {
        console.warn('文件夹已存在')
        return
      }

      downloadTemp('master', res.projectName)
    })
  })

program.parse(process.argv)

import fs from 'node:fs'
import ora from 'ora'
import download from 'download-git-repo'

const spinner = ora('下载中...')

/**
 * 检查当前目录是否重复
 * 
 * @param {*} path 
 * @returns 
 */
export const checkPath = (path) => {
  return !!fs.existsSync(path)
}

/**
 * 下载仓库代码
 * 
 * @param {*} branch 分支名
 * @param {*} name 目录名
 * @returns 
 */
export const downloadTemp = (branch, name) => {
  return new Promise((resolve, reject) => {
    spinner.start()
    download(
      `direct:https://github.com/Tyh2001/vitepress-template.git#${branch}`,
      name,
      { clone: true },
      (err) => {
        if (err) reject(err)
        resolve()
        spinner.succeed('下载完成')
      })
  })
}
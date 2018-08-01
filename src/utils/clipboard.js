export default (ctx, text) => {
  console.log(ctx, text)
  ctx.$copyText(text).then((e) => {
    ctx.$message.success('已复制：' + text)
  }, (e) => {
    console.log(e)
    ctx.$message.error('复制失败：' + e.message)
  })
}

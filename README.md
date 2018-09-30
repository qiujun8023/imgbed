# 基于云存储的图床

## 说明

### 支持的云存储

- 又拍云
- 七牛云

### 演示
> [Demo](https://imgbed.qiujun.me/)

## 部署

### 使用 Docker 部署

#### 运行

```bash
docker run --name imgbed -p 8888:80 -d qious/imgbed
```

#### 访问

```
curl http://localhost:8888
```

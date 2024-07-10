# FSD Architecture

## app

최상위 app setting 관리
page routing 관리

## views(pages)

page를 이루는 요소들 관리

## features

특정 기능 관리

## entities

특정 도메인 관리

- user
- wepps
- games
- setting

## shared

공통 컴포넌트, util, api 등등

---

## 야매 vercel 빌드

## 내 개인 레포에 upstream push할거임

### 1. 업스트림 저장소 등록하기 (안 한 경우만)

```bash
git remote add upstream https://github.com/ryxxn/weppstore-fe.git
```

---

```bash
git remote -v
```

이렇게 떠야 함

```bash
origin    https://github.com/yourusername/current-repo.git (fetch)
origin    https://github.com/yourusername/current-repo.git (push)
upstream  https://github.com/username/other-repo.git (fetch)
upstream  https://github.com/username/other-repo.git (push)
```

### 2. 업스트림 푸시 (main)

```bash
git push upstream main
```

# TIL 블로그

[![Build Status](https://travis-ci.com/devgaram/react-project-blog.svg?branch=master)](https://travis-ci.com/devgaram/react-project-blog)

## 프로젝트 소개

[TIL Repository](https://github.com/devgaram/TIL)의 데이터를 컨텐츠로 사용한 개발 블로그  
✨ Heroku로 배포함: [바로 가기](https://react-project-blog.herokuapp.com/)

## 사용한 툴 및 라이브러리

- **ReactJS** - [Create React App](https://github.com/facebook/create-react-app)으로 프로젝트 생성
- **Antd** - React UI library
- **Gulp** - 프로젝트 초반에는 react-project-blog 레파지토리 내에 마크다운 파일들(컨텐츠)가 있었고 이를 파싱 및 HTML 파일 생성을 위해 Gulp를 사용함. 현재는 Github Graphql API를 이용하기 때문에 사용하지 않음
- **Apollo Client** - Github Graphql API 연동을 위해 사용

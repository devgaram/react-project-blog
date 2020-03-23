import { gql } from "apollo-boost";

// 루트 폴더 가져오기(= 카테고리 가져오기)
export const GET_POST_CATEGORIES = gql`
  {
    repository(name: "TIL", owner: "devgaram") {
      categories: object(expression: "master:") {
        ... on Tree {
          entries {
            name
            type
          }
        }
      }
    }
  }
`;

// 해당 폴더의 파일 가져오기
export const GET_POSTS_BY_CATEGORY = gql`
  query getPosts($category: String) {
    repository(name: "TIL", owner: "devgaram") {
      posts: object(expression: $category) {
        ... on Tree {
          entries {
            name
            oid
            type
            content: object {
              ... on Blob {
                text
              }
            }
          }
        }
      }
    }
  }
`;

// 파일 내용 가져오기
export const GET_POST = gql`
  query getPost($path: String) {
    repository(name: "TIL", owner: "devgaram") {
      post: object(expression: $path) {
        ... on Blob {
          oid
          text
        }
      }
    }
  }
`;

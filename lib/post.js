import path from "path";
import * as fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
const postsDirectory = path.join(process.cwd(), "posts");

//mdファイルのデータを取り出す
export const getPostsData = () => {
  // /posts 以下のファイル名を取得する
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // id から ".md" を削除して返す
    const id = fileName.replace(/\.md$/, "");

    // マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // マークダウンのメタデータ部分を解析するために gray-matter を使う
    const matterResult = matter(fileContents);

    // データを id と組み合わせる
    return {
      id,
      ...matterResult.data,
    };
  });
  // 降順にソートする
  return allPostsData;
};

export const getAllPostIds = () => {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
};

export const getPostData = async (id) => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // gray-matter を使ってメタデータ部分を解析する
  const matterResult = matter(fileContents);

  // マークダウンを HTML 文字列に変換するために remark を使う
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // データを id と組み合わせる
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
};

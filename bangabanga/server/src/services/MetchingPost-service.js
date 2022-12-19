import { Sequelize } from "sequelize";
import { MatchingPosts } from "../db/models";
import { QueryTypes } from "sequelize";
import { sequelize } from "../db/index";
// const { sequelize } = require("../db/index");

class MetchingPostService {
  constructor(model) {
    this.MatchingPosts = model;
  }

  //전체 게시글 조회
  async getPosts() {
    const query = `select * from MatchingPost;`;
    const posts = await sequelize.query(query, { type: QueryTypes.SELECT });
    return posts;
  }




//모집 게시글 작성
async postPost(postContent){
    [postContent] = postContent;
    const result = MatchingPosts.create({
        title: postContent.title,
        content: postContent.content,
        matching_location: postContent.matching_location,
        matching_time: postContent.matching_time
    })

}

//모집 게시글 수정
async updatePost(postid,
    patchPost){
[patchPost] = patchPost
   console.log(
    "아이디: ",postid,
    patchPost.title);
   
        MatchingPosts.update({
            title: patchPost.title,
            content: patchPost.content,
            matching_location: patchPost.matching_location,
            matching_time: patchPost.matching_time
        },{
            where: {MatchingPosts_id: postid},
        });
}

//모집 게시글 삭제
async deletePost(postId){
    
    MatchingPosts.destroy({
        where: {MatchingPosts_id : postId}
    })
}


}




const metchingPostService = new MetchingPostService(MatchingPosts);

export { metchingPostService };
 